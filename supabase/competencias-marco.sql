-- COMPETENCIAS EVALUADAS POR NIVEL (Marco común europeo de referencia, MCER)
-- Una fila por nivel y competencia: un descriptor «Puedo…» y un indicador
-- observable. Nace SIN publicar: solo el docente lo ve hasta que apruebe.
-- Para publicar: update competencias_marco set publicado = true;
-- Dónde: https://supabase.com/dashboard/project/yfrdlzveleevkjqekdoq/sql/new

create table if not exists public.competencias_marco (
  nivel       text not null,
  competencia text not null check (competencia in ('comprension-oral','comprension-escrita','produccion-oral','produccion-escrita')),
  orden       int  not null,
  titulo      text not null,
  descriptor  text not null,
  indicador   text not null,
  publicado   boolean not null default false,
  primary key (nivel, competencia)
);
alter table public.competencias_marco enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename='competencias_marco' and policyname='competencias: se leen las publicadas') then
    create policy "competencias: se leen las publicadas" on public.competencias_marco
      for select to anon, authenticated using (publicado or public.es_docente());
  end if;
  if not exists (select 1 from pg_policies where tablename='competencias_marco' and policyname='competencias: las mantiene el docente') then
    create policy "competencias: las mantiene el docente" on public.competencias_marco
      for all to authenticated using (public.es_docente()) with check (public.es_docente());
  end if;
end $$;
grant select on public.competencias_marco to anon, authenticated;

insert into public.competencias_marco (nivel, competencia, orden, titulo, descriptor, indicador) values
('A1','comprension-oral',1,'Comprensión oral','Puedo reconocer palabras y expresiones muy básicas sobre mí, mi familia y mi entorno cuando me hablan despacio y con claridad.','Entiendo preguntas y consignas sencillas de clase, y los números, horas y fechas dichos con claridad.'),
('A1','comprension-escrita',2,'Comprensión escrita','Puedo comprender palabras conocidas y frases muy sencillas, por ejemplo en carteles, mensajes cortos y tarjetas.','Leo un mensaje corto o un diálogo sencillo y encuentro la información que busco: quién, cuándo, cuánto.'),
('A1','produccion-oral',3,'Producción e interacción oral','Puedo presentarme, preguntar y responder sobre temas muy habituales, y mantener un intercambio sencillo si mi interlocutor habla despacio y me ayuda.','En un diálogo simulado hago y contesto preguntas básicas y me presento con frases ordenadas.'),
('A1','produccion-escrita',4,'Producción escrita','Puedo escribir frases y mensajes cortos y sencillos, y rellenar formularios con mis datos.','Escribo entre cuatro y seis frases sobre mí o sobre mi día, con los tiempos trabajados en el ciclo.'),
('B1','comprension-oral',1,'Comprensión oral','Puedo comprender las ideas principales de un discurso claro sobre temas familiares del trabajo, el estudio o el ocio.','Sigo una conversación o un audio de dos o tres minutos y resumo la idea principal.'),
('B1','comprension-escrita',2,'Comprensión escrita','Puedo comprender textos sencillos sobre temas de mi interés y la descripción de hechos, sentimientos y deseos en cartas personales.','Leo un texto de una página y explico de qué trata y qué opina quien lo escribe.'),
('B1','produccion-oral',3,'Producción e interacción oral','Puedo desenvolverme en la mayoría de las situaciones de un viaje y describir experiencias, planes y opiniones, justificándolos brevemente.','Cuento una experiencia o un plan durante un minuto, con un orden claro y alguna razón.'),
('B1','produccion-escrita',4,'Producción escrita','Puedo escribir textos sencillos y coherentes sobre temas conocidos y cartas personales sobre experiencias e impresiones.','Escribo un texto de unas diez líneas, con conectores, sobre una experiencia o una opinión.'),
('B2','comprension-oral',1,'Comprensión oral','Puedo comprender discursos extensos y seguir argumentos complejos si el tema me es relativamente conocido, y la mayoría de las noticias y programas sobre temas actuales.','Sigo una exposición o una noticia de cinco minutos e identifico la idea central, los argumentos y los ejemplos.'),
('B2','comprension-escrita',2,'Comprensión escrita','Puedo leer artículos e informes sobre problemas actuales en los que el autor adopta una postura, y comprender la prosa literaria contemporánea.','Leo un artículo de opinión y distingo la tesis, los argumentos y la postura del autor.'),
('B2','produccion-oral',3,'Producción e interacción oral','Puedo participar con fluidez y espontaneidad en una conversación con hablantes nativos y presentar descripciones claras y detalladas, defendiendo mi punto de vista.','Debato un tema actual explicando y defendiendo mi opinión con argumentos y ejemplos.'),
('B2','produccion-escrita',4,'Producción escrita','Puedo escribir textos claros y detallados sobre temas de mi interés, y redacciones o informes que defienden o refutan un punto de vista.','Escribo un texto argumentado de entre 150 y 200 palabras, con introducción, argumentos y conclusión.')
on conflict (nivel, competencia) do nothing;
