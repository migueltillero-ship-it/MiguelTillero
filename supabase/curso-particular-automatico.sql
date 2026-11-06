-- ===========================================================================
-- CURSO PARTICULAR AUTOMÁTICO
-- ===========================================================================
-- Quien da clases particulares no pertenece a un grupo, así que en
-- «Estudiantes → Asignar a» no había dónde ponerla. Ahora, al validar a una
-- persona de clase particular, se crea solo un curso con su nombre y un grupo
-- individual (cupo 1), y aparece en esa lista para asignarla.
--
-- Importante: el curso y el grupo nacen CERRADOS. Las políticas dejan que
-- cualquiera, sin sesión, vea los cursos y grupos abiertos; si estuvieran
-- abiertos, el nombre de la estudiante saldría en la web pública. Cerrados,
-- solo los ven el administrador y la propia estudiante cuando está inscrita.
--
-- Qué cuenta como «clase particular»: el formulario de inscripción individual
-- guarda «horas» (el paquete) y/o «horario»; el de grupo no.
--
-- Es seguro repetirlo: no crea dos veces el grupo de la misma persona.
-- ===========================================================================

create or replace function public.crear_curso_particular(p_prospecto uuid)
returns uuid
language plpgsql security definer set search_path = public as $$
declare
  p        record;
  v_est    uuid;
  v_nombre text;
  v_docente uuid;
  v_nivel  text;
  v_curso  uuid;
  v_grupo  uuid;
  v_inicio date;
begin
  select * into p from prospectos where id = p_prospecto;
  if not found then return null; end if;

  -- ¿Es de clase particular?
  if not (coalesce(p.respuestas->>'horas','') <> '' or p.respuestas ? 'horario') then
    return null;
  end if;

  -- Sin cuenta todavía no hay a quién colgarle el grupo; lo retoma el
  -- disparador de profiles cuando se registre.
  select u.id into v_est from auth.users u where lower(u.email) = lower(p.email) limit 1;
  if v_est is null then return null; end if;

  -- Ya tiene su grupo: nada que hacer.
  select g.id into v_grupo from grupos g where g.notas = 'particular:' || v_est limit 1;
  if v_grupo is not null then return v_grupo; end if;

  select coalesce(nullif(pr.nombre_completo,''), p.nombre) into v_nombre
    from profiles pr where pr.id = v_est;
  v_nombre := coalesce(v_nombre, p.nombre);

  select id into v_docente from profiles where role = 'admin' order by created_at limit 1;
  v_nivel := substring(coalesce(p.respuestas->>'nivel','') from '(A0|A1|A2|B1|B2|C1|C2)');
  begin v_inicio := (p.respuestas->>'desde_cuando')::date; exception when others then v_inicio := null; end;

  insert into cursos (docente_id, nombre, nivel, descripcion, fecha_inicio, cupo_maximo, estado)
  values (v_docente, 'Clase particular — ' || v_nombre, v_nivel,
          'Clase particular de ' || v_nombre, v_inicio, 1, 'cerrado')
  returning id into v_curso;

  insert into grupos (codigo, curso_id, docente_id, formato, modalidad, cupo_maximo,
                      fecha_inicio, estado, notas)
  values ('PART-' || left(replace(v_est::text,'-',''), 8), v_curso, v_docente,
          'individual', 'virtual', 1, v_inicio, 'cerrado', 'particular:' || v_est)
  returning id into v_grupo;

  return v_grupo;
end $$;

-- Al validar (o en cualquier etapa posterior) se crea.
create or replace function public.tr_prospecto_curso_particular()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.estado in ('validado','contrato','firmado','pagado') then
    perform public.crear_curso_particular(new.id);
  end if;
  return new;
end $$;

create or replace trigger trg_prospecto_curso_particular
  after insert or update of estado on public.prospectos
  for each row execute function public.tr_prospecto_curso_particular();

-- Si la persona se registra DESPUÉS de haber sido validada, se crea entonces.
create or replace function public.tr_perfil_curso_particular()
returns trigger language plpgsql security definer set search_path = public as $$
declare r record; v_email text;
begin
  select email into v_email from auth.users where id = new.id;
  if v_email is null then return new; end if;
  for r in select id from prospectos
           where lower(email) = lower(v_email)
             and estado in ('validado','contrato','firmado','pagado') loop
    perform public.crear_curso_particular(r.id);
  end loop;
  return new;
end $$;

create or replace trigger trg_perfil_curso_particular
  after insert on public.profiles
  for each row execute function public.tr_perfil_curso_particular();

-- Quienes ya estaban en juego antes de este cambio.
select public.crear_curso_particular(id) from prospectos
 where lower(email) in ('katepetre@hotmail.com','citizenteno@gmail.com','keytovilla@gmail.com');
