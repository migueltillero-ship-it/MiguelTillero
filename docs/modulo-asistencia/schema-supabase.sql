-- ============================================================
-- MÓDULO DE CONTROL DE ASISTENCIA Y SALDO DE HORAS
-- Esquema para Supabase (PostgreSQL 15+)
-- Profesor Miguel Tillero — Clases de Francés
--
-- Port del schema.sql original (MySQL) a PostgreSQL, con los
-- cambios que exige trabajar contra Supabase desde un sitio
-- estático:
--
--   · La clave anónima del navegador es PÚBLICA. Quien protege
--     los datos es la seguridad por filas (RLS) de este archivo,
--     no el código de la página. Sin RLS, cualquiera podría leer
--     los contratos de todos los alumnos.
--   · No hace falta el backend Node/Express que sugería el
--     diseño: PostgREST expone las tablas y la lógica de negocio
--     vive en funciones SQL invocables por RPC.
--   · Las notificaciones por correo quedan fuera de la base de
--     datos: el envío lo hace una Edge Function que lee
--     notification_log.
--
-- Ejecutar entero en el editor SQL de Supabase.
-- ============================================================

-- ------------------------------------------------------------
-- 0. TIPOS
-- ------------------------------------------------------------
create type lang_code          as enum ('es', 'en', 'fr');
create type contract_status    as enum ('active', 'completed', 'suspended', 'cancelled');
create type attendance_status  as enum ('scheduled', 'present', 'unjustified_absence',
                                        'justified_absence', 'makeup');
create type resolution_flow    as enum ('A_weekly_makeup', 'B_calendar_shift');
create type recipient_type     as enum ('student', 'teacher');
create type notification_channel as enum ('email', 'sms', 'whatsapp');

-- ------------------------------------------------------------
-- 1. ADMINISTRADORES
--    Quién puede ver y escribir todo. Se compara contra el correo
--    del token de sesión, así que basta con dar de alta el correo.
-- ------------------------------------------------------------
create table admins (
    email       text primary key,
    added_at    timestamptz not null default now()
);

comment on table admins is
    'Correos con acceso total. El resto de cuentas solo ven lo suyo.';

create or replace function es_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
    select exists (
        select 1 from admins
        where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    );
$$;

-- ------------------------------------------------------------
-- 2. ESTUDIANTES
--    auth_user_id enlaza la ficha con la cuenta del portal. Es
--    nulo mientras el alumno no se haya registrado todavía.
-- ------------------------------------------------------------
create table students (
    student_id      bigint generated always as identity primary key,
    auth_user_id    uuid unique references auth.users(id) on delete set null,
    full_name       text not null,
    email           text not null unique,
    phone           text,
    preferred_lang  lang_code not null default 'es',
    created_at      timestamptz not null default now()
);

create index idx_students_auth on students(auth_user_id);

-- ------------------------------------------------------------
-- 3. CONTRATOS / PAQUETES DE HORAS
-- ------------------------------------------------------------
create table student_contracts (
    contract_id             bigint generated always as identity primary key,
    student_id              bigint not null references students(student_id) on delete cascade,
    total_contracted_hours  numeric(6,2) not null check (total_contracted_hours > 0),
    consumed_hours          numeric(6,2) not null default 0 check (consumed_hours >= 0),
    -- Saldo siempre disponible sin recalcular en la aplicación
    remaining_hours         numeric(6,2)
                            generated always as (total_contracted_hours - consumed_hours) stored,
    weekly_frequency        smallint not null default 2 check (weekly_frequency between 1 and 7),
    session_duration_hours  numeric(4,2) not null default 1.0 check (session_duration_hours > 0),
    start_date              date not null,
    projected_end_date      date not null,   -- se recalcula en el Flujo B
    original_end_date       date not null,   -- nunca cambia: es la auditoría
    status                  contract_status not null default 'active',
    created_at              timestamptz not null default now(),
    updated_at              timestamptz not null default now(),
    constraint chk_consumed check (consumed_hours <= total_contracted_hours)
);

create index idx_contracts_student on student_contracts(student_id);

-- En MySQL esto era ON UPDATE CURRENT_TIMESTAMP; aquí es un trigger.
create or replace function tocar_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at := now();
    return new;
end;
$$;

create trigger trg_contracts_updated_at
    before update on student_contracts
    for each row execute function tocar_updated_at();

-- ------------------------------------------------------------
-- 4. SESIONES DE CLASE
-- ------------------------------------------------------------
create table class_sessions (
    session_id              bigint generated always as identity primary key,
    contract_id             bigint not null references student_contracts(contract_id) on delete cascade,
    session_date            timestamptz not null,
    duration_hours          numeric(4,2) not null default 1.0 check (duration_hours > 0),
    attendance_status       attendance_status not null default 'scheduled',
    -- Una sesión 'makeup' apunta a la ausencia justificada que repone
    makeup_of_session_id    bigint references class_sessions(session_id),
    notes                   text,
    recorded_at             timestamptz,
    created_at              timestamptz not null default now()
);

create index idx_sessions_contract_date on class_sessions(contract_id, session_date);
create index idx_sessions_status on class_sessions(attendance_status);

-- ------------------------------------------------------------
-- 5. RESOLUCIÓN DE AUSENCIAS JUSTIFICADAS (selector Flujo A / B)
--    Cada justified_absence debe tener exactamente una resolución.
-- ------------------------------------------------------------
create table absence_resolutions (
    resolution_id       bigint generated always as identity primary key,
    session_id          bigint not null unique references class_sessions(session_id) on delete cascade,
    flow_type           resolution_flow not null,
    makeup_session_id   bigint references class_sessions(session_id),
    previous_end_date   date,
    new_end_date        date,
    resolved_by         text not null,
    resolved_at         timestamptz not null default now(),
    -- Cada flujo rellena sus propias columnas y solo las suyas
    constraint chk_flujo_coherente check (
        (flow_type = 'A_weekly_makeup'
            and makeup_session_id is not null
            and previous_end_date is null and new_end_date is null)
        or
        (flow_type = 'B_calendar_shift'
            and makeup_session_id is null
            and previous_end_date is not null and new_end_date is not null)
    )
);

-- ------------------------------------------------------------
-- 6. BITÁCORA DE NOTIFICACIONES
--    La Edge Function de envío lee las filas con sent_at nulo.
-- ------------------------------------------------------------
create table notification_log (
    notification_id bigint generated always as identity primary key,
    contract_id     bigint not null references student_contracts(contract_id) on delete cascade,
    session_id      bigint references class_sessions(session_id) on delete set null,
    recipient_type  recipient_type not null,
    channel         notification_channel not null,
    template_code   text not null,
    payload_json    jsonb,
    created_at      timestamptz not null default now(),
    sent_at         timestamptz,
    error           text
);

create index idx_notif_pendientes on notification_log(created_at) where sent_at is null;

-- ============================================================
-- LÓGICA DE NEGOCIO
-- ============================================================

-- ------------------------------------------------------------
-- 7. DESCUENTO AUTOMÁTICO DE HORAS
--
--    present / unjustified_absence → descuentan
--    justified_absence             → NO descuenta
--
--    El trigger es simétrico: si una asistencia se corrige (por
--    ejemplo de 'present' a 'justified_absence'), devuelve las
--    horas en lugar de dejar el saldo mal.
-- ------------------------------------------------------------
create or replace function aplicar_descuento_horas()
returns trigger
language plpgsql
as $$
declare
    descontaba boolean;
    descuenta  boolean;
    delta      numeric(6,2) := 0;
begin
    descontaba := (tg_op = 'UPDATE'
                   and old.attendance_status in ('present', 'unjustified_absence'));
    descuenta  := (new.attendance_status in ('present', 'unjustified_absence'));

    if descontaba and not descuenta then
        delta := -old.duration_hours;
    elsif descuenta and not descontaba then
        delta := new.duration_hours;
    elsif descuenta and descontaba and old.duration_hours <> new.duration_hours then
        delta := new.duration_hours - old.duration_hours;
    end if;

    if delta <> 0 then
        update student_contracts
           set consumed_hours = consumed_hours + delta
         where contract_id = new.contract_id;

        -- El paquete se cierra solo cuando se agota el saldo
        update student_contracts
           set status = case when remaining_hours <= 0 then 'completed'::contract_status
                             when status = 'completed' then 'active'::contract_status
                             else status end
         where contract_id = new.contract_id;
    end if;

    if new.attendance_status <> 'scheduled' and new.recorded_at is null then
        new.recorded_at := now();
    end if;

    return new;
end;
$$;

create trigger trg_session_attendance_update
    before update of attendance_status, duration_hours on class_sessions
    for each row execute function aplicar_descuento_horas();

-- ------------------------------------------------------------
-- 8. BLOQUEO POR AUSENCIAS SIN RESOLVER
--
--    Mientras exista una justified_absence sin fila en
--    absence_resolutions, no se pueden programar sesiones nuevas
--    de ese contrato. Así el selector A/B nunca queda pendiente.
--    Las reposiciones del Flujo A sí pueden crearse: son
--    precisamente la resolución.
-- ------------------------------------------------------------
create or replace function bloquear_si_hay_ausencias_pendientes()
returns trigger
language plpgsql
as $$
declare
    pendientes integer;
begin
    if new.attendance_status = 'makeup' then
        return new;
    end if;

    select count(*) into pendientes
      from class_sessions s
      left join absence_resolutions r on r.session_id = s.session_id
     where s.contract_id = new.contract_id
       and s.attendance_status = 'justified_absence'
       and r.resolution_id is null;

    if pendientes > 0 then
        raise exception
            'El contrato % tiene % ausencia(s) justificada(s) sin resolver. '
            'Resuelve el Flujo A o B antes de programar clases nuevas.',
            new.contract_id, pendientes
            using errcode = 'check_violation';
    end if;

    return new;
end;
$$;

create trigger trg_bloqueo_ausencias
    before insert on class_sessions
    for each row execute function bloquear_si_hay_ausencias_pendientes();

-- ------------------------------------------------------------
-- 9. RECÁLCULO DE LA FECHA DE FIN (Flujo B)
--
--    Se recuenta desde las horas que faltan, no sumando días
--    sueltos: así se autocorrige ante varias ausencias, cambios
--    de frecuencia o sesiones de duración distinta.
-- ------------------------------------------------------------
create or replace function recalcular_fecha_fin(p_contract_id bigint)
returns date
language plpgsql
stable
as $$
declare
    c                record;
    horas_restantes  numeric(6,2);
    sesiones_faltan  integer;
    semanas_faltan   integer;
    ultima_impartida date;
    base             date;
begin
    select * into c from student_contracts where contract_id = p_contract_id;
    if not found then
        raise exception 'No existe el contrato %', p_contract_id;
    end if;

    horas_restantes := c.total_contracted_hours - c.consumed_hours;
    if horas_restantes <= 0 then
        return c.projected_end_date;
    end if;

    sesiones_faltan := ceil(horas_restantes / c.session_duration_hours);
    semanas_faltan  := ceil(sesiones_faltan::numeric / c.weekly_frequency);

    select max(session_date)::date into ultima_impartida
      from class_sessions
     where contract_id = p_contract_id
       and attendance_status = 'present';

    base := greatest(coalesce(ultima_impartida, c.start_date), current_date);

    -- El recuento por horas restantes puede dar una fecha ANTERIOR a la
    -- proyección vigente cuando el calendario original llevaba holgura.
    -- Sería absurdo que faltar a clase adelantara el fin del paquete, así
    -- que la fecha nunca retrocede: el Flujo B solo puede desplazar hacia
    -- adelante o dejarla igual.
    return greatest(base + (semanas_faltan * 7), c.projected_end_date);
end;
$$;

-- ------------------------------------------------------------
-- 10. REGISTRAR ASISTENCIA
--     Devuelve si el frontend debe mostrar obligatoriamente el
--     selector de Flujo A / B.
-- ------------------------------------------------------------
create or replace function registrar_asistencia(
    p_session_id bigint,
    p_status     attendance_status
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
    s record;
    c record;
begin
    if not es_admin() then
        raise exception 'Solo el profesor puede registrar asistencia'
            using errcode = 'insufficient_privilege';
    end if;

    if p_status not in ('present', 'unjustified_absence', 'justified_absence') then
        raise exception 'Estado de asistencia no válido: %', p_status;
    end if;

    select * into s from class_sessions where session_id = p_session_id;
    if not found then
        raise exception 'No existe la sesión %', p_session_id;
    end if;

    update class_sessions
       set attendance_status = p_status,
           recorded_at = now()
     where session_id = p_session_id;

    select * into c from student_contracts where contract_id = s.contract_id;

    return jsonb_build_object(
        'requires_resolution', p_status = 'justified_absence',
        'session_id', p_session_id,
        'options', case when p_status = 'justified_absence'
                        then jsonb_build_array('A_weekly_makeup', 'B_calendar_shift')
                        else '[]'::jsonb end,
        'remaining_hours', c.remaining_hours,
        'projected_end_date', c.projected_end_date
    );
end;
$$;

-- ------------------------------------------------------------
-- 11. FLUJO A — reposición dentro de la misma semana
-- ------------------------------------------------------------
create or replace function resolver_ausencia_flujo_a(
    p_session_id      bigint,
    p_makeup_datetime timestamptz
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
    original  record;
    v_makeup  bigint;
begin
    if not es_admin() then
        raise exception 'Solo el profesor puede resolver ausencias'
            using errcode = 'insufficient_privilege';
    end if;

    select * into original from class_sessions where session_id = p_session_id;
    if not found then
        raise exception 'No existe la sesión %', p_session_id;
    end if;
    if original.attendance_status <> 'justified_absence' then
        raise exception 'La sesión % no es una ausencia justificada', p_session_id;
    end if;
    if exists (select 1 from absence_resolutions where session_id = p_session_id) then
        raise exception 'La sesión % ya tiene una resolución', p_session_id;
    end if;

    -- La semana ISO empieza en lunes, que es lo que date_trunc usa
    if date_trunc('week', p_makeup_datetime) <> date_trunc('week', original.session_date) then
        raise exception
            'El Flujo A exige que la reposición caiga en la misma semana que la clase perdida'
            using errcode = 'check_violation';
    end if;

    insert into class_sessions (contract_id, session_date, duration_hours,
                                attendance_status, makeup_of_session_id)
    values (original.contract_id, p_makeup_datetime, original.duration_hours,
            'makeup', p_session_id)
    returning session_id into v_makeup;

    insert into absence_resolutions (session_id, flow_type, makeup_session_id, resolved_by)
    values (p_session_id, 'A_weekly_makeup', v_makeup,
            coalesce(auth.jwt() ->> 'email', 'sistema'));

    perform encolar_notificaciones(original.contract_id, p_session_id,
                                   'FLUJO_A', jsonb_build_object(
                                       'fecha_original',    original.session_date,
                                       'fecha_reposicion',  p_makeup_datetime));

    return jsonb_build_object('flow', 'A_weekly_makeup',
                              'makeup_session_id', v_makeup,
                              'end_date_changed', false);
end;
$$;

-- ------------------------------------------------------------
-- 12. FLUJO B — desplazamiento del calendario
-- ------------------------------------------------------------
create or replace function resolver_ausencia_flujo_b(p_session_id bigint)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
    original    record;
    anterior    date;
    nueva       date;
begin
    if not es_admin() then
        raise exception 'Solo el profesor puede resolver ausencias'
            using errcode = 'insufficient_privilege';
    end if;

    select * into original from class_sessions where session_id = p_session_id;
    if not found then
        raise exception 'No existe la sesión %', p_session_id;
    end if;
    if original.attendance_status <> 'justified_absence' then
        raise exception 'La sesión % no es una ausencia justificada', p_session_id;
    end if;
    if exists (select 1 from absence_resolutions where session_id = p_session_id) then
        raise exception 'La sesión % ya tiene una resolución', p_session_id;
    end if;

    select projected_end_date into anterior
      from student_contracts where contract_id = original.contract_id;

    nueva := recalcular_fecha_fin(original.contract_id);

    update student_contracts
       set projected_end_date = nueva
     where contract_id = original.contract_id;

    insert into absence_resolutions (session_id, flow_type,
                                     previous_end_date, new_end_date, resolved_by)
    values (p_session_id, 'B_calendar_shift', anterior, nueva,
            coalesce(auth.jwt() ->> 'email', 'sistema'));

    perform encolar_notificaciones(original.contract_id, p_session_id,
                                   'FLUJO_B', jsonb_build_object(
                                       'fecha_original',   original.session_date,
                                       'fecha_anterior',   anterior,
                                       'nueva_fecha_fin',  nueva));

    return jsonb_build_object('flow', 'B_calendar_shift',
                              'previous_end_date', anterior,
                              'new_end_date', nueva,
                              'end_date_changed', true);
end;
$$;

-- ------------------------------------------------------------
-- 13. ENCOLADO DE NOTIFICACIONES
--     No envía nada: deja la fila lista para que la Edge Function
--     la recoja. Así un fallo de correo nunca tumba la operación.
-- ------------------------------------------------------------
create or replace function encolar_notificaciones(
    p_contract_id bigint,
    p_session_id  bigint,
    p_prefijo     text,
    p_payload     jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
    datos jsonb;
begin
    select p_payload
        || jsonb_build_object(
             'nombre_estudiante', st.full_name,
             'idioma',            st.preferred_lang,
             'horas_restantes',   c.remaining_hours,
             'horas_totales',     c.total_contracted_hours,
             'fecha_finalizacion', c.projected_end_date)
      into datos
      from student_contracts c
      join students st on st.student_id = c.student_id
     where c.contract_id = p_contract_id;

    insert into notification_log (contract_id, session_id, recipient_type,
                                  channel, template_code, payload_json)
    values (p_contract_id, p_session_id, 'student', 'email',
            p_prefijo || '_STUDENT', datos),
           (p_contract_id, p_session_id, 'teacher', 'email',
            p_prefijo || '_TEACHER', datos);
end;
$$;

-- ------------------------------------------------------------
-- 14. SALDO DEL CONTRATO
--     Una sola llamada para pintar el panel del alumno.
-- ------------------------------------------------------------
create or replace function saldo_contrato(p_contract_id bigint)
returns jsonb
language sql
stable
as $$
    select jsonb_build_object(
        'contract_id',            c.contract_id,
        'total_contracted_hours', c.total_contracted_hours,
        'consumed_hours',         c.consumed_hours,
        'remaining_hours',        c.remaining_hours,
        'start_date',             c.start_date,
        'original_end_date',      c.original_end_date,
        'projected_end_date',     c.projected_end_date,
        'status',                 c.status,
        'pending_resolutions', coalesce((
            select jsonb_agg(jsonb_build_object(
                       'session_id',   s.session_id,
                       'session_date', s.session_date))
              from class_sessions s
              left join absence_resolutions r on r.session_id = s.session_id
             where s.contract_id = c.contract_id
               and s.attendance_status = 'justified_absence'
               and r.resolution_id is null), '[]'::jsonb)
    )
    from student_contracts c
    where c.contract_id = p_contract_id;
$$;

-- ============================================================
-- SEGURIDAD POR FILAS
--
-- Sin esto, la clave anónima del navegador dejaría leer los datos
-- de todos los alumnos. Regla general: el profesor lo ve y lo
-- escribe todo; el alumno solo lee lo suyo y no escribe nada.
-- ============================================================

alter table students            enable row level security;
alter table student_contracts   enable row level security;
alter table class_sessions      enable row level security;
alter table absence_resolutions enable row level security;
alter table notification_log    enable row level security;
alter table admins              enable row level security;

-- Nadie toca la lista de administradores desde el navegador.
-- Se gestiona desde el editor SQL de Supabase.
create policy admins_solo_lectura_propia on admins
    for select using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

-- ── Estudiantes ──
create policy students_admin_todo on students
    for all using (es_admin()) with check (es_admin());

create policy students_ve_su_ficha on students
    for select using (auth_user_id = auth.uid());

-- El alumno puede corregir su teléfono o su idioma, nada más:
-- las columnas sensibles quedan protegidas por el trigger de abajo.
create policy students_edita_su_ficha on students
    for update using (auth_user_id = auth.uid())
              with check (auth_user_id = auth.uid());

create or replace function proteger_campos_estudiante()
returns trigger
language plpgsql
as $$
begin
    if es_admin() then
        return new;
    end if;
    if new.email <> old.email
       or new.full_name <> old.full_name
       or new.auth_user_id is distinct from old.auth_user_id then
        raise exception 'Solo el profesor puede cambiar el nombre, el correo o la cuenta enlazada'
            using errcode = 'insufficient_privilege';
    end if;
    return new;
end;
$$;

create trigger trg_proteger_estudiante
    before update on students
    for each row execute function proteger_campos_estudiante();

-- ── Contratos ──
create policy contracts_admin_todo on student_contracts
    for all using (es_admin()) with check (es_admin());

create policy contracts_ve_los_suyos on student_contracts
    for select using (
        student_id in (select student_id from students where auth_user_id = auth.uid())
    );

-- ── Sesiones ──
create policy sessions_admin_todo on class_sessions
    for all using (es_admin()) with check (es_admin());

create policy sessions_ve_las_suyas on class_sessions
    for select using (
        contract_id in (
            select c.contract_id from student_contracts c
            join students s on s.student_id = c.student_id
            where s.auth_user_id = auth.uid())
    );

-- ── Resoluciones ──
create policy resolutions_admin_todo on absence_resolutions
    for all using (es_admin()) with check (es_admin());

create policy resolutions_ve_las_suyas on absence_resolutions
    for select using (
        session_id in (
            select s.session_id from class_sessions s
            join student_contracts c on c.contract_id = s.contract_id
            join students st on st.student_id = c.student_id
            where st.auth_user_id = auth.uid())
    );

-- ── Notificaciones: solo el profesor ──
create policy notif_admin_todo on notification_log
    for all using (es_admin()) with check (es_admin());

-- ------------------------------------------------------------
-- 15. ENLACE AUTOMÁTICO DE CUENTA
--     Ficha y cuenta del portal se encuentran por el correo, en
--     los dos sentidos, porque el orden real varía: unas veces el
--     profesor crea la ficha antes de que el alumno se registre y
--     otras el alumno se registra antes de tener ficha.
-- ------------------------------------------------------------

-- Sentido 1: se registra alguien que ya tenía ficha
create or replace function enlazar_cuenta_estudiante()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    update students
       set auth_user_id = new.id
     where lower(email) = lower(new.email)
       and auth_user_id is null;
    return new;
end;
$$;

create trigger trg_enlazar_cuenta
    after insert on auth.users
    for each row execute function enlazar_cuenta_estudiante();

-- Sentido 2: se crea la ficha de alguien que ya se había registrado
create or replace function enlazar_ficha_con_cuenta()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
    if new.auth_user_id is null then
        select id into new.auth_user_id
          from auth.users
         where lower(email) = lower(new.email)
         limit 1;
    end if;
    return new;
end;
$$;

create trigger trg_enlazar_ficha
    before insert on students
    for each row execute function enlazar_ficha_con_cuenta();
