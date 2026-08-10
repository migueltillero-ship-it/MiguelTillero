# Módulo de Control de Asistencia y Saldo de Horas

Diseño técnico del sistema de gestión de horas contratadas, asistencias y
compensación de ausencias justificadas para las clases de francés del
profesor Miguel Tillero.

---

## 1. Arquitectura de procesos

### 1.1 Ciclo de vida del contrato

```
[Contrato creado] → total_contracted_hours, start_date, projected_end_date
       │
       ▼
[Sesiones programadas]  (generadas según weekly_frequency)
       │
       ▼
[Registro de asistencia por sesión]
       ├── present ──────────────────► descuenta horas
       ├── unjustified_absence ──────► descuenta horas
       └── justified_absence ────────► NO descuenta → SELECTOR OBLIGATORIO
                                              │
                              ┌───────────────┴───────────────┐
                              ▼                               ▼
                        FLUJO A                          FLUJO B
                  Reposición semanal              Desplazamiento del calendario
                  (misma semana, misma            (projected_end_date se
                   fecha de finalización)          extiende automáticamente)
```

### 1.2 Regla de descuento (trigger)

| `attendance_status`   | ¿Descuenta `consumed_hours`? | Acción adicional |
|-----------------------|------------------------------|------------------|
| `present`             | Sí (+`duration_hours`)       | Cierra contrato si saldo = 0 |
| `unjustified_absence` | Sí (+`duration_hours`)       | — |
| `justified_absence`   | **No**                       | Exige resolución Flujo A o B |
| `makeup` (reposición) | Al marcarse `present`        | Vinculada a la ausencia original |

Implementado en `trg_session_attendance_update` (ver `schema.sql`). El
trigger también revierte el descuento si un registro se corrige de
`present` a `justified_absence`.

### 1.3 Flujo A — Reposición semanal

1. La sesión original queda como `justified_absence` (sin descuento).
2. Se crea una nueva sesión con `attendance_status = 'makeup'` y
   `makeup_of_session_id` apuntando a la original, **dentro de la misma
   semana** (validación en backend).
3. `projected_end_date` **no cambia**.
4. Cuando la reposición se imparte, se marca `present` y ahí se
   descuentan las horas.
5. Se registra en `absence_resolutions` con `flow_type = 'A_weekly_makeup'`.
6. Se envían las plantillas `FLUJO_A_STUDENT` y `FLUJO_A_TEACHER`.

### 1.4 Flujo B — Desplazamiento del calendario

1. La sesión original queda como `justified_absence` (sin descuento).
2. **No** se crea reposición.
3. Se ejecuta el recálculo de `projected_end_date` (§2).
4. Se registra en `absence_resolutions` con `flow_type = 'B_calendar_shift'`,
   guardando `previous_end_date` y `new_end_date` para auditoría.
5. Se envían las plantillas `FLUJO_B_STUDENT` y `FLUJO_B_TEACHER`.

---

## 2. Lógica de backend (pseudocódigo — Node.js/Express sugerido)

### 2.1 Registrar asistencia

```
POST /api/sessions/:sessionId/attendance
Body: { status: 'present' | 'unjustified_absence' | 'justified_absence' }

function recordAttendance(sessionId, status, actor):
    session = db.getSession(sessionId)
    assert session.attendance_status in ('scheduled', 'makeup')

    db.updateSession(sessionId, {
        attendance_status: status,
        recorded_at: now()
    })
    # El trigger SQL descuenta horas automáticamente para
    # present / unjustified_absence.

    if status == 'justified_absence':
        # Respuesta que OBLIGA al frontend a mostrar el selector A/B
        return {
            requires_resolution: true,
            session_id: sessionId,
            options: ['A_weekly_makeup', 'B_calendar_shift']
        }

    return { requires_resolution: false, balance: getBalance(session.contract_id) }
```

### 2.2 Resolver ausencia — Flujo A

```
POST /api/absences/:sessionId/resolve
Body: { flow: 'A', makeup_datetime: '2026-08-14T18:00' }

function resolveFlowA(sessionId, makeupDatetime, actor):
    original = db.getSession(sessionId)
    assert original.attendance_status == 'justified_absence'
    assert not db.resolutionExists(sessionId)   # una sola resolución

    # Validación: la reposición debe caer en la MISMA semana ISO
    assert isoWeek(makeupDatetime) == isoWeek(original.session_date),
        "Flujo A exige reposición dentro de la misma semana"

    makeup = db.createSession({
        contract_id: original.contract_id,
        session_date: makeupDatetime,
        duration_hours: original.duration_hours,
        attendance_status: 'makeup',
        makeup_of_session_id: sessionId
    })

    db.createResolution({
        session_id: sessionId,
        flow_type: 'A_weekly_makeup',
        makeup_session_id: makeup.session_id,
        resolved_by: actor
    })

    notify('FLUJO_A_STUDENT', original)   # §3
    notify('FLUJO_A_TEACHER', original)
```

### 2.3 Resolver ausencia — Flujo B (recálculo automático de fecha)

```
POST /api/absences/:sessionId/resolve
Body: { flow: 'B' }

function resolveFlowB(sessionId, actor):
    original = db.getSession(sessionId)
    contract = db.getContract(original.contract_id)
    assert original.attendance_status == 'justified_absence'
    assert not db.resolutionExists(sessionId)

    previousEnd = contract.projected_end_date
    newEnd = recalculateEndDate(contract)

    db.updateContract(contract.contract_id, { projected_end_date: newEnd })

    db.createResolution({
        session_id: sessionId,
        flow_type: 'B_calendar_shift',
        previous_end_date: previousEnd,
        new_end_date: newEnd,
        resolved_by: actor
    })

    notify('FLUJO_B_STUDENT', original, { new_end_date: newEnd })
    notify('FLUJO_B_TEACHER', original, { new_end_date: newEnd })
```

### 2.4 Algoritmo de recálculo de `projected_end_date`

```
function recalculateEndDate(contract):
    # Horas que faltan por impartir
    remainingHours = contract.total_contracted_hours - contract.consumed_hours

    # Sesiones pendientes necesarias
    sessionsNeeded = ceil(remainingHours / contract.session_duration_hours)

    # Semanas necesarias según la frecuencia semanal contratada
    weeksNeeded = ceil(sessionsNeeded / contract.weekly_frequency)

    # Base: la fecha de la última sesión efectivamente impartida
    # (o hoy, si es posterior)
    lastTaught = db.lastSessionDate(contract.contract_id,
                                    status in ('present'))
    base = max(lastTaught, today())

    return base + weeksNeeded * 7 días
```

Equivalente simplificado cuando cada ausencia justificada desplaza el
calendario exactamente una sesión:

```
projected_end_date = projected_end_date + (7 / weekly_frequency) días
                     redondeado al siguiente día de clase del alumno
```

El algoritmo completo (recuento de horas restantes) es preferible porque
se autocorrige ante múltiples ausencias, cambios de frecuencia o sesiones
de duración distinta.

### 2.5 Consulta de saldo

```
GET /api/contracts/:contractId/balance

→ {
    total_contracted_hours, consumed_hours, remaining_hours,   # columna generada
    start_date, original_end_date, projected_end_date,
    pending_resolutions: [ sesiones justified_absence sin resolución ],
    status
  }
```

**Regla de bloqueo:** mientras exista una `justified_absence` sin fila en
`absence_resolutions`, el sistema impide programar nuevas sesiones del
contrato (garantiza que el selector A/B nunca quede pendiente).

---

## 3. Matriz de comunicaciones y plantillas

Todas las notificaciones se registran en `notification_log` con el
`template_code`, canal y payload interpolado. Idioma según
`students.preferred_lang`.

| Código | Destinatario | Canal | Momento de envío |
|---|---|---|---|
| `FLUJO_A_STUDENT` | Estudiante | Email + SMS | Al confirmar reposición |
| `FLUJO_A_TEACHER` | Profesor | Email | Al confirmar reposición |
| `FLUJO_B_STUDENT` | Estudiante | Email + SMS | Al recalcular fecha |
| `FLUJO_B_TEACHER` | Profesor | Email | Al recalcular fecha |
| `BALANCE_LOW` | Estudiante | Email | Saldo ≤ 2 sesiones |
| `CONTRACT_END` | Ambos | Email | consumed = total (contrato completado) |

### 3.1 Plantilla `FLUJO_A_STUDENT` (ES)

> **Asunto:** Confirmación de reposición de clase — {{fecha_reposicion}}
>
> Hola {{nombre_estudiante}},
>
> Tu clase del {{fecha_original}} fue justificada correctamente y **no se
> descontó de tu saldo de horas**.
>
> Hemos agendado tu clase de reposición para el **{{fecha_reposicion}} a
> las {{hora_reposicion}}**, dentro de la misma semana. Tu fecha de
> finalización del paquete **se mantiene sin cambios**:
> {{fecha_finalizacion}}.
>
> Saldo actual: {{horas_restantes}} h de {{horas_totales}} h.
>
> À bientôt,
> Prof. Miguel Tillero

### 3.2 Plantilla `FLUJO_B_STUDENT` (ES)

> **Asunto:** Actualización de tu calendario de clases
>
> Hola {{nombre_estudiante}},
>
> Tu clase del {{fecha_original}} fue justificada correctamente y **no se
> descontó de tu saldo de horas**.
>
> Como no habrá reposición esta semana, tu calendario se desplaza: la
> nueva fecha estimada de finalización de tu paquete es el
> **{{nueva_fecha_finalizacion}}** (antes: {{fecha_anterior}}).
>
> Conservas íntegras tus {{horas_restantes}} h restantes.
>
> À bientôt,
> Prof. Miguel Tillero

### 3.3 Plantillas para el profesor

> **`FLUJO_A_TEACHER` — Asunto:** Reposición agendada — {{nombre_estudiante}}
>
> Ausencia justificada el {{fecha_original}}. Reposición confirmada:
> {{fecha_reposicion}} {{hora_reposicion}}. Fecha fin sin cambios.
> Saldo del alumno: {{horas_restantes}} h.

> **`FLUJO_B_TEACHER` — Asunto:** Calendario desplazado — {{nombre_estudiante}}
>
> Ausencia justificada el {{fecha_original}} sin reposición.
> Nueva fecha fin: {{nueva_fecha_finalizacion}} (antes {{fecha_anterior}}).
> Saldo del alumno: {{horas_restantes}} h.

---

## 4. Estructura de datos (resumen)

Ver `schema.sql` para el DDL completo.

| Tabla | Propósito |
|---|---|
| `students` | Datos del alumno e idioma preferido para notificaciones |
| `student_contracts` | Paquete de horas: total, consumidas, saldo (columna generada), fechas original y proyectada |
| `class_sessions` | Cada sesión con su `attendance_status`; las reposiciones se enlazan vía `makeup_of_session_id` |
| `absence_resolutions` | Decisión Flujo A/B por cada ausencia justificada (única por sesión); auditoría de fechas |
| `notification_log` | Bitácora de todos los envíos con payload |

### Invariantes del sistema

1. `consumed_hours ≤ total_contracted_hours` (CHECK en BD).
2. Toda `justified_absence` tiene **exactamente una** resolución
   (UNIQUE sobre `absence_resolutions.session_id` + bloqueo en backend).
3. Una sesión `makeup` siempre referencia a su ausencia original.
4. `original_end_date` nunca se modifica; solo `projected_end_date`
   cambia (Flujo B), y cada cambio queda auditado en
   `absence_resolutions`.

---

## 5. Stack sugerido

- **BD:** MySQL 8 / MariaDB (el DDL usa triggers y columnas generadas
  estándar; portable a PostgreSQL con cambios menores).
- **Backend:** Node.js + Express (coherente con el sitio actual en
  JavaScript) o PHP si el hosting es compartido.
- **Notificaciones:** EmailJS ya usado en el sitio para el formulario;
  para volumen mayor, un SMTP transaccional (Brevo, Resend) + Twilio
  para SMS.
- **Frontend admin:** panel simple protegido con autenticación donde el
  profesor registra asistencia; al marcar `justified_absence` el UI
  muestra obligatoriamente el selector Flujo A / Flujo B antes de poder
  continuar.
