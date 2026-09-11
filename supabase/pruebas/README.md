# Pruebas del esquema y de las políticas de seguridad (RLS)

Estas pruebas se ejecutan contra un PostgreSQL local que simula el entorno de
Supabase (esquema `auth`, función `auth.uid()`, roles `anon` y `authenticated`).
Sirven para verificar, antes de tocar la base de datos real, que:

- el docente y el estudiante pueden hacer lo que les corresponde;
- nadie puede hacer lo que no le corresponde;
- las políticas no se llaman en círculo (el error `42P17: infinite recursion`).

## Cómo ejecutarlas

```bash
pg_ctlcluster 16 main start

psql -f 00-simulacion-supabase.sql          # crea la base de prueba
psql -d plataforma_test -f ../schema.sql    # aplica el esquema real
psql -d plataforma_test -f 05-grants-como-supabase.sql
psql -d plataforma_test -f 01-funcional-basico.sql
psql -d plataforma_test -f 02-flujo-completo.sql
psql -d plataforma_test -f 03-seguridad.sql
psql -d plataforma_test -f 04-casos-limite.sql
```

## Qué debe salir

- `01` y `02`: todas las consultas devuelven filas, sin ningún `ERROR`.
- `03`: cada caso marcado "debe dar error" tiene que fallar con
  `new row violates row-level security policy`, y los "debe ser 0 filas"
  tienen que devolver `0`. El último caso (el docente creando un curso)
  sí debe funcionar.
- `04`: promover un rol desde el SQL Editor funciona; el estudiante puede
  editar su nombre y teléfono; un visitante sin cuenta ve los cursos abiertos
  pero no ve perfiles, notas ni inscripciones.
