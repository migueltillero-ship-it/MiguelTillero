# Puesta en marcha con Supabase

Cómo pasar del modo demostración a datos reales. El diseño funcional
está en `DISENO.md`; aquí se explica qué cambia al montarlo sobre
Supabase y qué hay que hacer, en orden.

---

## 1. Qué cambia respecto al diseño original

`DISENO.md` proponía MySQL y un backend Node/Express. Con Supabase ese
backend deja de hacer falta, y conviene entender por qué antes de tocar
nada:

| Pieza del diseño | Con Supabase |
|---|---|
| MySQL 8 | PostgreSQL (`schema-supabase.sql`) |
| Backend Node/Express | PostgREST, que ya expone las tablas como API |
| Endpoints `POST /api/...` | Funciones SQL invocadas por RPC |
| Autenticación propia | Supabase Auth, ya integrado |
| Envío de correos | Edge Function que vacía `notification_log` |
| Control de acceso en el backend | Seguridad por filas (RLS) en la base |

**El punto crítico es el último.** La clave que va en el navegador es
pública: cualquiera puede leerla desde el código fuente de la página.
Lo que impide que un alumno lea los contratos de los demás no es el
JavaScript, son las políticas RLS del esquema. Por eso el archivo las
incluye para todas las tablas y por eso no hay que desactivarlas nunca
"temporalmente para probar".

---

## 2. Lo que hay que hacer en la consola de Supabase

Unos veinte minutos, una sola vez.

1. Crear una cuenta en <https://supabase.com> y un proyecto nuevo.
   Elegir la región más cercana (Este de EE. UU. para México).
   Guardar la contraseña de la base de datos que muestra al crearlo.

2. En **SQL Editor**, pegar y ejecutar entero `schema-supabase.sql`.
   Debe terminar sin errores.

3. En el mismo editor, darse de alta como administrador:

   ```sql
   insert into admins(email) values ('tu-correo@ejemplo.com');
   ```

   Ese correo, y solo ese, podrá registrar asistencia y ver a todos los
   alumnos. Se pueden añadir más filas si mañana hay otro profesor.

4. En **Authentication → Providers**, habilitar `Email` y, si se quiere
   entrar con Google, también `Google`.

5. En **Authentication → URL Configuration**, añadir a *Redirect URLs*
   la dirección del sitio:
   `https://migueltillero-ship-it.github.io/MiguelTillero/`

6. En **Project Settings → API**, copiar dos valores:
   - *Project URL*
   - *anon public key*

   Son los que hay que pegar en `assets/supabase-config.js` (paso 3 de
   la sección siguiente). Ambos son públicos por diseño.

---

## 3. Lo que queda por hacer en el sitio

El portal ya está preparado para esto: las páginas de `estudiantes/` y
`registro/` **no hablan con la base de datos directamente**, solo usan
la interfaz `window.Auth` que define `assets/auth.js`. Se comprobó que
no hay ni una sola llamada a Firestore fuera de ese archivo, así que
cambiar de proveedor no obliga a tocar las páginas.

Pasos pendientes, en orden de dependencia:

1. **Adaptador de autenticación.** Escribir `assets/supabase-auth.js`
   con los mismos diez métodos que hoy expone `assets/auth.js`
   (`iniciar`, `alCambiar`, `conGoogle`, `crearCuenta`, `entrar`,
   `recuperar`, `salir`, `usuario`, `esAdmin`, `mensaje`), conservando
   el modo demostración para que el sitio siga siendo navegable sin
   configuración.

2. **Panel del profesor.** Lista de sesiones del día con los tres
   botones de asistencia. Al marcar *ausencia justificada*, la respuesta
   de `registrar_asistencia()` trae `requires_resolution: true`, y la
   interfaz debe obligar a elegir Flujo A o B antes de continuar.

3. **Panel del alumno.** Una sola llamada a `saldo_contrato()` da todo
   lo que necesita la pantalla: horas totales, consumidas, restantes,
   fecha de fin proyectada y ausencias pendientes de resolver.

4. **Edge Function de correo.** Lee `notification_log` donde `sent_at`
   sea nulo, envía con Resend o Brevo, y marca la fila. Al estar
   desacoplado, un fallo de correo nunca tumba el registro de
   asistencia.

---

## 4. Decisiones que conviene conocer

**El saldo se calcula en la base, no en la aplicación.**
`remaining_hours` es una columna generada y el descuento lo hace un
trigger. Da igual desde dónde se registre la asistencia: el saldo no
puede quedar descuadrado.

**El trigger es simétrico.** Si una asistencia se corrige de *asistió* a
*ausencia justificada*, devuelve las horas. Un descuento que solo supiera
sumar dejaría saldos mal a la primera corrección.

**El Flujo B nunca adelanta la fecha de fin.** El recuento por horas
restantes puede dar una fecha anterior a la proyección vigente si el
calendario original llevaba holgura, lo que significaría que faltar a
clase acorta el paquete. La función toma el mayor de los dos valores, de
modo que el Flujo B solo desplaza hacia adelante o deja igual.

**Las ausencias sin resolver bloquean el calendario.** Mientras haya una
ausencia justificada sin decisión A o B, no se pueden programar clases
nuevas de ese contrato. Es lo que garantiza que el selector no quede
olvidado.

**Ficha y cuenta se enlazan por correo en los dos sentidos.** Unas veces
el profesor crea la ficha antes de que el alumno se registre y otras al
revés; hay un trigger para cada orden.

**El alumno puede corregir su teléfono y su idioma, nada más.** Nombre,
correo y cuenta enlazada solo los cambia el profesor.

---

## 5. Pruebas

`pruebas.sql` levanta el esquema y ejecuta diecisiete comprobaciones,
incluidas las de aislamiento entre alumnos. No necesita Supabase: corre
contra cualquier PostgreSQL 15 o superior, porque simula el esquema
`auth` que Supabase trae de fábrica.

```bash
createdb mt
psql -d mt -v ON_ERROR_STOP=1 -f pruebas.sql
```

Cubren el descuento de horas y su reversión, el bloqueo por ausencias
pendientes, el rechazo de reposiciones fuera de semana, el recálculo y
la auditoría de fechas, el encolado de notificaciones y, sobre todo,
que un alumno no ve los datos de otro ni puede registrar asistencia.

Conviene volver a ejecutarlas cada vez que se toque el esquema, antes de
llevar el cambio a Supabase.
