-- ===========================================================================
-- LOS EJERCICIOS DE LA PLATAFORMA CUENTAN PARA LA NOTA DEL CICLO
-- ===========================================================================
-- Hasta ahora los ejercicios complementarios eran trabajo que no valía nada:
-- el estudiante los hacía o no, y la nota del ciclo salía solo de las dos
-- evaluaciones finales. Eso enseña exactamente lo contrario de lo que se
-- pretende.
--
-- A partir de aquí son una evaluación más, con su peso. Y como es una
-- evaluación como cualquier otra:
--   · el estudiante la ve en su panel, con el desglose ficha por ficha;
--   · el representante la ve en el suyo;
--   · y TÚ la corriges desde panel-docente.html, igual que las demás.
--     No hace falta ninguna pantalla nueva.
--
-- LO QUE MÁS IMPORTA DE TODO ESTO
-- El recálculo NO pisa lo que hayas puesto a mano. Guarda, junto a la nota,
-- cuál fue la nota automática; si al recalcular encuentra que la nota
-- guardada ya no es la automática, entiende que la cambiaste tú y la deja
-- en paz. Puedes recalcular cuantas veces quieras sin miedo.
--
-- CÓMO USAR: pégalo entero. Es seguro repetirlo.
-- Dónde: Supabase → SQL Editor → New query → pegar → Run.
-- Después, cada vez que quieras actualizar la nota:
--   select public.recalcular_nota_ejercicios('A1-OCT2026');
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1) El catálogo de fichas
-- ---------------------------------------------------------------------------
-- La base no puede saber cuántos ejercicios tiene una ficha: eso vive en el
-- sitio, en espace-a1-fiches.js. Y hace falta saberlo, porque si no, quien
-- haga una sola ficha perfecta tendría un 100 %. La nota se calcula sobre
-- TODO lo que se ofreció, no sobre lo que se intentó.
--
-- Si añades una ficha nueva al sitio, añádela también aquí. La prueba
-- pruebas-navegador/catalogo-al-dia.js avisa si se separan.

create table if not exists public.fichas_catalogo (
  clave      text not null,          -- el espacio: 'mt-a1', 'mt-b2'
  ficha      text not null,          -- el id de la ficha
  titulo     text not null,
  ejercicios integer not null check (ejercicios > 0),
  cuenta     boolean not null default true,   -- ¿suma para la nota?
  primary key (clave, ficha)
);

alter table public.fichas_catalogo enable row level security;
drop policy if exists "todos leen el catálogo" on public.fichas_catalogo;
create policy "todos leen el catálogo" on public.fichas_catalogo for select using (true);
drop policy if exists "el docente mantiene el catálogo" on public.fichas_catalogo;
create policy "el docente mantiene el catálogo" on public.fichas_catalogo
  for all using (public.es_docente() or public.es_admin())
  with check (public.es_docente() or public.es_admin());
grant select on public.fichas_catalogo to anon, authenticated;
grant insert, update, delete on public.fichas_catalogo to authenticated;

-- Las fichas del espacio A1.4, tal como están hoy en el sitio.
insert into public.fichas_catalogo (clave, ficha, titulo, ejercicios) values
  ('mt-a1', 'posesivos',        'Mon, ma, mes — les adjectifs possessifs',         6),
  ('mt-a1', 'pronombres',       'Le mien, le tien — les pronoms possessifs',       5),
  ('mt-a1', 'numeros-escribir', 'Écrire les nombres — et les pièges de 70, 80, 90', 5),
  ('mt-a1', 'numeros-oir',      'Entendre les grands nombres',                     5),
  ('mt-a1', 'genero-numero',    'Masculin / féminin, singulier / pluriel',         6),
  ('mt-a1', 'repaso',           'Tout ensemble — le bilan',                        4),
  ('mt-a1', 'passe-compose',    'Le passé composé, étape par étape',              18)
on conflict (clave, ficha)
do update set titulo = excluded.titulo, ejercicios = excluded.ejercicios;


-- ---------------------------------------------------------------------------
-- 2) La evaluación, y el reparto de pesos
-- ---------------------------------------------------------------------------
-- Las dos evaluaciones de cierre ya sumaban 40 + 60 = 100. Al entrar una
-- tercera hay que repartir de nuevo: si no, los pesos suman 120 y la media
-- sale mal. Aquí los ejercicios se llevan un 20 % y las otras dos conservan
-- su proporción (40:60 → 32:48).
--
-- CAMBIA ESTE NÚMERO si quieres otro peso para los deberes.

do $$
declare
  v_peso numeric := 20;        -- ← el peso de los ejercicios, en %
  v_nombre text := 'Exercices complémentaires — travail à la maison';
  -- El plazo, no la última clase: es la fecha que el estudiante y la familia
  -- van a leer en su panel, y tiene que ser la que se les dio.
  v_plazo date := date '2026-11-06';   -- ← el viernes
  v_curso uuid;
  v_resto numeric;
begin
  select g.curso_id into v_curso
    from public.grupos g where g.codigo = 'A1-OCT2026';
  if v_curso is null then
    raise exception 'No existe el grupo A1-OCT2026.';
  end if;

  -- Con «not exists», no con «on conflict do nothing»: la tabla no tiene
  -- índice único sobre (curso_id, nombre), así que «on conflict» no capta
  -- nada y repetir el guion crearía una segunda evaluación. Con dos, los
  -- pesos suman más de 100 y la nota final sale mal sin que nada avise.
  if not exists (select 1 from public.evaluaciones e
                  where e.curso_id = v_curso and e.nombre = v_nombre) then
    insert into public.evaluaciones (curso_id, nombre, descripcion, fecha, ponderacion, nota_maxima)
    values (v_curso, v_nombre,
      'Las fichas de ejercicios de la plataforma. La nota sale de todo lo que '
      'se ofreció durante el ciclo, no solo de lo que se intentó: una ficha sin '
      'empezar cuenta como cero. Se actualiza sola a medida que se trabajan.',
      v_plazo, v_peso, 100);
  end if;

  -- Si ya existía, se le ponen el peso y el plazo de arriba igualmente.
  update public.evaluaciones
     set ponderacion = v_peso, nota_maxima = 100, fecha = v_plazo
   where curso_id = v_curso and nombre = v_nombre;

  -- Y si una versión anterior de este guion llegó a duplicarla, se limpia:
  -- se queda la más antigua, que es la que puede tener notas colgando.
  delete from public.evaluaciones e
   where e.curso_id = v_curso and e.nombre = v_nombre
     and e.id <> (select min(e2.id::text)::uuid from public.evaluaciones e2
                   where e2.curso_id = v_curso and e2.nombre = v_nombre);

  -- El resto se reparte entre las dos de cierre, manteniendo su proporción.
  v_resto := 100 - v_peso;
  update public.evaluaciones set ponderacion = round(v_resto * 0.4)
   where curso_id = v_curso and nombre = 'Évaluation collective (cierre de ciclo)';
  update public.evaluaciones set ponderacion = round(v_resto * 0.6)
   where curso_id = v_curso and nombre = 'Évaluation individuelle (cierre de ciclo)';

  raise notice 'Evaluación de ejercicios creada con un peso del % %%.', v_peso;
end $$;


-- ---------------------------------------------------------------------------
-- 3) El recálculo
-- ---------------------------------------------------------------------------
-- Lee fichas_avance, calcula la nota de cada estudiante y la escribe en
-- «notas» — salvo que la hayas cambiado tú, en cuyo caso no la toca.
--
-- Devuelve un texto con lo que hizo, para verlo de un vistazo.

create or replace function public.recalcular_nota_ejercicios(p_grupo text)
returns table (estudiante text, nota numeric, estado text)
language plpgsql security definer set search_path = public as $$
declare
  v_quien text;
  v_curso uuid;
  v_clave text;
  v_eval uuid;
  r record;
begin
  -- Quién llama, de verdad.
  --
  -- Aquí hay una trampa que casi me cuela: dentro de una función «security
  -- definer», current_user NO es quien llama, es la dueña de la función
  -- (postgres). Comprobar current_user dejaba entrar a cualquiera, incluido
  -- un visitante sin cuenta.
  --
  -- Lo que sí dice quién llama es el ajuste «role», porque PostgREST hace
  -- SET ROLE anon o authenticated antes de ejecutar nada. El Editor SQL no
  -- hace SET ROLE, así que ahí vale «none» y se cae a session_user, que es
  -- postgres. Es la única forma de que el docente pueda recalcular desde el
  -- editor sin abrirle la puerta a la web.
  v_quien := coalesce(nullif(current_setting('role', true), 'none'), session_user);
  if not (public.es_docente() or public.es_admin()
          or v_quien in ('postgres', 'service_role', 'supabase_admin')) then
    raise exception 'Solo el docente puede recalcular las notas. '
                    '(Entras como «%».)', v_quien;
  end if;

  select g.curso_id into v_curso from public.grupos g where g.codigo = p_grupo;
  if v_curso is null then
    raise exception 'No existe el grupo %.', p_grupo;
  end if;

  -- Cada grupo trabaja en su espacio de ejercicios; la clave lo identifica.
  v_clave := case when p_grupo like 'A1%' then 'mt-a1'
                  when p_grupo like 'B2%' then 'mt-b2' end;
  if v_clave is null then
    raise exception 'No sé qué espacio de ejercicios le toca al grupo %.', p_grupo;
  end if;

  select e.id into v_eval from public.evaluaciones e
   where e.curso_id = v_curso
     and e.nombre = 'Exercices complémentaires — travail à la maison';
  if v_eval is null then
    raise exception 'Falta la evaluación de ejercicios. Ejecuta antes el bloque 2.';
  end if;

  for r in
    with
    -- Lo que se ofreció: todas las fichas que cuentan, para todos.
    ofrecido as (
      select i.estudiante_id, c.ficha, c.titulo, c.ejercicios
        from public.inscripciones i
        join public.grupos g on g.id = i.grupo_id and g.codigo = p_grupo
       cross join public.fichas_catalogo c
       where i.estado in ('activa','pendiente') and c.clave = v_clave and c.cuenta
    ),
    -- Lo que hizo cada uno. Se limita a los ejercicios que la ficha tiene de
    -- verdad: si una ficha encogió, el avance viejo no debe inflar la nota.
    hecho as (
      select o.estudiante_id, o.ficha,
             count(fa.ejercicio) as resueltos,
             coalesce(sum(fa.bien), 0)  as bien,
             coalesce(sum(fa.total), 0) as puntos
        from ofrecido o
        left join public.fichas_avance fa
               on fa.estudiante_id = o.estudiante_id
              and fa.clave = v_clave and fa.ficha = o.ficha
              and fa.ejercicio ~ '^[0-9]+$'
              and fa.ejercicio::integer < o.ejercicios
       group by 1, 2
    ),
    -- La nota de cada ficha: el acierto, penalizado por lo que no se hizo.
    -- Una ficha a medias no vale lo mismo que una ficha entera con la misma
    -- proporción de aciertos.
    por_ficha as (
      select o.estudiante_id, o.ficha, o.titulo, o.ejercicios,
             h.resueltos, h.bien, h.puntos,
             case when h.puntos > 0
                  then round(100.0 * h.bien / h.puntos * h.resueltos / o.ejercicios, 1)
                  else 0 end as nota_ficha
        from ofrecido o join hecho h
          on h.estudiante_id = o.estudiante_id and h.ficha = o.ficha
    )
    select p.estudiante_id,
           pr.nombre_completo,
           round(avg(p.nota_ficha), 1) as nota,
           jsonb_build_object(
             'origen', 'automatico',
             'calculado', now(),
             'fichas', jsonb_agg(jsonb_build_object(
                         'ficha', p.ficha, 'titulo', p.titulo,
                         'hechos', p.resueltos, 'de', p.ejercicios,
                         'nota', p.nota_ficha) order by p.titulo)) as detalle,
           string_agg(p.titulo || ': ' || p.nota_ficha || '%'
                      || case when p.resueltos < p.ejercicios
                              then ' (' || p.resueltos || '/' || p.ejercicios || ' hechos)'
                              else '' end,
                      ' · ' order by p.titulo) as resumen
      from por_ficha p
      join public.profiles pr on pr.id = p.estudiante_id
     group by 1, 2
  loop
    -- ¿La tocó el docente? Si la nota guardada ya no coincide con la
    -- automática anterior, es que la cambió a mano: no se pisa.
    if exists (select 1 from public.notas n
                where n.evaluacion_id = v_eval and n.estudiante_id = r.estudiante_id
                  and n.detalle ? 'origen'
                  and n.calificacion is distinct from (n.detalle->>'nota_automatica')::numeric)
    then
      estudiante := r.nombre_completo;
      select n.calificacion into nota from public.notas n
       where n.evaluacion_id = v_eval and n.estudiante_id = r.estudiante_id;
      estado := 'la pusiste tú — no se toca';
      return next;
      continue;
    end if;

    insert into public.notas (evaluacion_id, estudiante_id, calificacion, comentario, detalle)
    values (v_eval, r.estudiante_id, r.nota,
            'Ficha por ficha — ' || r.resumen,
            r.detalle || jsonb_build_object('nota_automatica', r.nota))
    on conflict (evaluacion_id, estudiante_id)
    do update set calificacion = excluded.calificacion,
                  comentario   = excluded.comentario,
                  detalle      = excluded.detalle;

    estudiante := r.nombre_completo;
    nota := r.nota;
    estado := 'calculada';
    return next;
  end loop;
end $$;

-- PostgreSQL concede EXECUTE a PUBLIC en cuanto se crea una función. Sin
-- revocarlo, conceder «to authenticated» no quita nada: anon seguía pudiendo
-- llamarla. Primero se cierra, después se abre a quien toca.
revoke all on function public.recalcular_nota_ejercicios(text) from public;
grant execute on function public.recalcular_nota_ejercicios(text) to authenticated;


-- ---------------------------------------------------------------------------
-- 4) Lo que miras tú: ficha por ficha, quién va por dónde
-- ---------------------------------------------------------------------------

create or replace view public.v_ejercicios_por_ficha as
select g.codigo as grupo,
       pr.nombre_completo as estudiante,
       c.titulo as ficha,
       count(fa.ejercicio) || '/' || c.ejercicios as hechos,
       coalesce(sum(fa.bien), 0) || '/' || coalesce(sum(fa.total), 0) as aciertos,
       case when coalesce(sum(fa.total), 0) > 0
            then round(100.0 * sum(fa.bien) / sum(fa.total)) || ' %'
            else '—' end as acierto,
       case when count(fa.ejercicio) = 0 then 'Sin empezar'
            when count(fa.ejercicio) < c.ejercicios then 'A medias'
            else 'Completa' end as estado
from public.inscripciones i
join public.grupos g   on g.id = i.grupo_id
join public.profiles pr on pr.id = i.estudiante_id
join public.fichas_catalogo c
  on c.clave = case when g.codigo like 'A1%' then 'mt-a1'
                    when g.codigo like 'B2%' then 'mt-b2' end
left join public.fichas_avance fa
       on fa.estudiante_id = i.estudiante_id and fa.clave = c.clave and fa.ficha = c.ficha
      -- El mismo filtro que usa el recálculo: si una ficha encogió, el avance
      -- de un ejercicio que ya no existe no debe contar. Si la vista y el
      -- cálculo no filtraran igual, dirían cosas distintas sobre lo mismo.
      and fa.ejercicio ~ '^[0-9]+$' and fa.ejercicio::integer < c.ejercicios
where i.estado in ('activa','pendiente')
group by g.codigo, pr.nombre_completo, c.titulo, c.ejercicios, c.ficha
order by g.codigo, pr.nombre_completo, c.ficha;

grant select on public.v_ejercicios_por_ficha to authenticated;


-- ---------------------------------------------------------------------------
-- 5) El aviso en el espacio de cada estudiante
-- ---------------------------------------------------------------------------
-- Si una nota aparece sin que nadie la haya anunciado, lo que se aprende es
-- que la plataforma te puede poner un cero por sorpresa. El plazo y el peso
-- van dichos antes, no después.
--
-- Borra por cualquier título anterior de este mismo aviso: ha cambiado de
-- nombre dos veces, y si solo se borrara el actual quedarían varios en la
-- pantalla del estudiante, con plazos distintos.

delete from public.avisos a
 using public.inscripciones i, public.grupos g
 where a.estudiante_id = i.estudiante_id
   and i.grupo_id = g.id and g.codigo = 'A1-OCT2026'
   and (a.titulo like 'Le passé composé %'
     or a.titulo like 'Les exercices %'
     or a.titulo = 'Ejercicios para practicar en casa');

insert into public.avisos (estudiante_id, titulo, mensaje, tipo, desde, hasta)
select distinct i.estudiante_id,
  'Les exercices comptent pour la note — jusqu''au vendredi 6',
  E'Changement important : les fiches d''exercices de la plateforme comptent '
  'maintenant pour la note du cycle. Elles valent 20 % de la note finale.\n\n'
  'Vous avez jusqu''au VENDREDI 6 NOVEMBRE pour faire TOUTES les fiches '
  'de votre espace : les possessifs, les pronoms possessifs, les nombres '
  '(les écrire et les entendre), le masculin/féminin, le bilan et le passé '
  'composé.\n\n'
  'La note se calcule sur tout ce qui a été proposé, pas seulement sur ce que '
  'vous avez ouvert : une fiche jamais commencée compte zéro. Une fiche faite '
  'à moitié ne vaut pas autant qu''une fiche entière.\n\n'
  'TRÈS IMPORTANT : connectez-vous avec VOTRE COMPTE avant de commencer. '
  'Sans cela, votre travail reste dans votre navigateur et je ne le vois pas '
  '— donc il ne compte pas.\n\n'
  'Si une étape ne s''ouvre pas, c''est normal : cliquez sur « Recommencer » '
  'et refaites les exercices en rouge.',
  'importante',
  null::date,
  date '2026-11-30'
from public.inscripciones i
join public.grupos g on g.id = i.grupo_id and g.codigo = 'A1-OCT2026'
where i.estado in ('activa', 'pendiente');


-- ---------------------------------------------------------------------------
-- Comprobación
-- ---------------------------------------------------------------------------

select * from public.recalcular_nota_ejercicios('A1-OCT2026');

select e.nombre, e.ponderacion || ' %' as peso, e.nota_maxima
from public.evaluaciones e
join public.grupos g on g.curso_id = e.curso_id and g.codigo = 'A1-OCT2026'
where e.fecha >= date '2026-11-01'
order by e.fecha;

select * from public.v_ejercicios_por_ficha where grupo = 'A1-OCT2026';
