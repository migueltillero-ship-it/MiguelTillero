-- Première de «Destination Francophonie au Mexique» — sábado 26 de septiembre de 2026, 18:00
-- Pega esto en Supabase → SQL Editor y pulsa Run. Es seguro repetirlo: no duplica el evento.
insert into public.eventos
  (titulo, descripcion, fecha, hora_inicio, lugar, modalidad, entrada_libre,
   url_accion, texto_accion, destacado, publicado)
select
  'Première de «Destination Francophonie au Mexique»',
  'La Alianza Francesa de San Cristóbal de Las Casas te invita a la première de la proyección del episodio de Destination Francophonie (TV5MONDE) dedicado a México.',
  '2026-09-26', '18:00',
  'Centro de Desarrollo de Capacidades Creativas El Rastro · Blvd. Ignacio Allende 36B, Barrio de San Antonio, San Cristóbal de Las Casas',
  'presencial', true,
  'perfil.html#novedad', 'Ver la invitación', true, true
where not exists (
  select 1 from public.eventos where titulo like 'Première de «Destination Francophonie%'
);
