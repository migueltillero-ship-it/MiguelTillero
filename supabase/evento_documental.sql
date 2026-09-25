-- ===========================================================================
-- Novedad: documental «Destination Francophonie» (TV5MONDE)
-- Pega y ejecuta esto en Supabase → SQL Editor. Es idempotente: si ya existe
-- el evento no lo duplica. Aparece en el popup y en «Próximo evento» del
-- inicio hasta el 3 de octubre de 2026 (después se oculta solo).
-- También puedes crearlo desde admin.html → pestaña Eventos.
-- ===========================================================================

insert into public.eventos
  (titulo, descripcion, fecha, hora_inicio, lugar, modalidad, entrada_libre,
   url_accion, texto_accion, destacado, publicado)
select
  'Documental «Destination Francophonie» en TV5MONDE',
  'Participé en la serie documental de TV5MONDE presentada por Ivan Kabacoff. El episodio «Destination Mexique» se emite el 28 de septiembre y vuelve el sábado 3 de octubre. Horarios según la guía de TV5MONDE Amérique latine.',
  '2026-10-03',
  '23:58',
  'TV5MONDE (televisión)',
  'virtual',
  true,
  'perfil.html#novedad',
  'Ver el detrás de cámaras',
  true,
  true
where not exists (
  select 1 from public.eventos where titulo like 'Documental «Destination Francophonie»%'
);
