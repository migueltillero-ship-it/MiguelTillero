# Lo que falta, con los enlaces

Ciclo **Français A1.4** · primera clase **martes 29 de septiembre, 7:00 p.m.**

Cuatro pasos. Los dos primeros son los que bloquean; los otros dos son
mandar mensajes.

---

## 1 · Conectar el correo en Supabase · ~5 min

### 1a · SMTP

**https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/auth/templates**

> Si esa dirección te da 404, entra por
> **https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq**
> y en el menú izquierdo, bajo **NOTIFICATIONS**, haz clic en **Emails**.
> Es la pantalla correcta: la vi en tu captura.

Busca **SMTP Settings** y activa **Enable Custom SMTP**:

| Campo | Valor |
|---|---|
| Sender email | `migueltillero@gmail.com` |
| Sender name | `Miguel Tillero` |
| Host | `smtp.gmail.com` |
| Port number | `587` |
| Username | `migueltillero@gmail.com` |
| Password | las 16 letras de Google, **sin espacios** |

→ **Save**

*(Si perdiste las 16 letras, se generan otra vez en
https://myaccount.google.com/apppasswords — nombre: `Supabase plataforma`.)*

### 1b · Subir el límite

**https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/auth/rate-limits**

**«Rate limit for sending emails»**: de `2` a **`30`** → **Save**

> Con 2 por hora, si las tres familias se registran la misma tarde, **la
> tercera no recibe su correo.** Este paso no es opcional.

---

## 2 · Probar que el correo llega · ~3 min

Abre una **ventana privada** (Ctrl+Mayús+N) y entra aquí con **otro correo
tuyo**, no el de docente:

**https://migueltillero-ship-it.github.io/MiguelTillero/registro/inscripcion.html?grupo=d3027b35-d65c-4722-9a82-3eacbb175b73&nombre=Prueba**

El correo debe llegar **en menos de un minuto**, de `migueltillero@gmail.com`,
**a la bandeja de entrada**.

- ✅ **Llegó** → sigue al paso 3.
- ❌ **No llegó en dos minutos** → escríbeme qué ves antes de mandar nada.

Después borra esa cuenta de prueba desde
**https://migueltillero-ship-it.github.io/MiguelTillero/panel-docente.html**
→ Cursos → Estudiantes. (Ahí sigue también la inscripción de prueba anterior.)

---

## 3 · Mandar al grupo

**https://chat.whatsapp.com/HQ1m79IBobZ9MJZdMxNz5H**

1. Primero **la imagen** (`infografia-ciclo-a1-oct2026.png`).
2. Después **el texto, en un mensaje aparte** — está en
   `mensaje-whatsapp-ciclo-a1-oct2026.md`, apartado 1.

> Si el paso 1 no te salió y decides mandar igual, añade el párrafo del ⚠️
> que está marcado en ese archivo. Si el correo sí funciona, **no lo pongas**.

---

## 4 · Los tres enlaces, por privado

**Uno a cada familia. Al grupo no van**: cada enlace lleva el nombre dentro.
El texto que los acompaña está en `mensaje-whatsapp-ciclo-a1-oct2026.md`,
apartado 2.

**Isaac** — a Angélica (mamá) y/o Santiago Mena (papá)
```
https://migueltillero-ship-it.github.io/MiguelTillero/registro/inscripcion.html?grupo=d3027b35-d65c-4722-9a82-3eacbb175b73&nombre=Isaac
```

**Ricardo Gadiel**
```
https://migueltillero-ship-it.github.io/MiguelTillero/registro/inscripcion.html?grupo=d3027b35-d65c-4722-9a82-3eacbb175b73&nombre=Ricardo%20Gadiel
```

**Annette**
```
https://migueltillero-ship-it.github.io/MiguelTillero/registro/inscripcion.html?grupo=d3027b35-d65c-4722-9a82-3eacbb175b73&nombre=Annette
```

---

## Mañana, antes de la clase

**https://migueltillero-ship-it.github.io/MiguelTillero/panel-docente.html**

Ahí ves quién se registró y apruebas las inscripciones conforme te vayan
pagando (**Cursos → Estudiantes**). También tienes el calendario, la
planificación de las 12 sesiones y el enlace de la clase.

---

## Esto NO es para hoy

- **`supabase/plazo-inscripcion.sql`** — las fechas de inscripción y pago.
  No bloquea nada; sin correrlo todo funciona igual.
- **El dominio `migueltillero.com`** — cuando haya calma.
