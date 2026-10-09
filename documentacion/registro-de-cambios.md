# Registro de cambios · septiembre–octubre de 2026

Qué se hizo, cuándo y en qué cambio del historial.

Se omiten los cambios puramente estéticos y las fusiones de ramas; el historial completo está en el repositorio.

**Periodo:** del 7 de septiembre al 3 de octubre de 2026  
**Cambios registrados en total:** 180  
**Cambios sustantivos recogidos aquí:** 146

---

## Fase 1 · El sitio público
*2026-09-07 → 2026-09-10 · 44 cambios*

De una página única a una arquitectura de varias páginas reales. Identidad visual, perfil, servicios, cursos, galería y métodos de pago. Incluye una pérdida de contenido por error propio y su recuperación completa desde el historial.

| Fecha | Cambio | Qué se hizo |
|---|---|---|
| 2026-09-07 | `60c1e39` | Corregir sintaxis del script y definir closeIntro correctamente |
| 2026-09-07 | `fdffc83` | Corregir event triggers en workflow de GitHub Pages |
| 2026-09-07 | `53c7327` | Corregir sintaxis de backticks en galeria y source de video intro |
| 2026-09-07 | `f359d59` | Script duplicado, template literal de galeria y source del video intro |
| 2026-09-07 | `25d0070` | Reestructuracion completa en arquitectura multipagina limpia |
| 2026-09-07 | `ff49c4d` | Poblar perfil.html con contenido real y estructurado |
| 2026-09-07 | `2a9c02e` | Reestructuración completa en arquitectura multipágina desde index(6) |
| 2026-09-07 | `68c32f7` | Restaurar secciones completas de perfil en perfil.html |
| 2026-09-07 | `3526958` | Reposicionar el boton saltar en la esquina superior derecha |
| 2026-09-07 | `6bebc49` | Crear assets/images, sincronizar retratos y depurar recursos duplicados |
| 2026-09-07 | `4d078bb` | Restaurar diseno original y posicion absoluta del boton saltar |
| 2026-09-07 | `5f5af93` | Restaurar diseno original y posicion absoluta del boton saltar |
| 2026-09-07 | `faa06b9` | Reparar sintaxis CSS y restaurar diseño del boton saltar en todo el ecosistema |
| 2026-09-07 | `a901265` | Eliminar video intro de las subpaginas y aplicar sessionStorage en la portada |
| 2026-09-07 | `68f9a62` | Purgar video intro de las subpaginas y habilitar sessionStorage en index |
| 2026-09-07 | `02d7382` | Reconstruccion total desde archivo maestro recuperando contenidos y enlaces |
| 2026-09-07 | `1a61fa1` | Reconstruccion total desde archivo maestro recuperando contenidos reales y enlaces |
| 2026-09-07 | `83b1a8a` | Corregir sintaxis PowerShell y poblar subpaginas con el contenido maestro |
| 2026-09-07 | `a40d556` | Restaurar CSS original borrado por error, forzar video 4k a pantalla completa y ensamblar |
| 2026-09-07 | `04d1b98` | Revertir a SPA original, restaurar enrutador JS nativo y blindar portada |
| 2026-09-07 | `37c9b3f` | Agregar menu completo, limpiar HTML duplicado, formulario de contacto EmailJS y fotos de perfil |
| 2026-09-07 | `cb6517c` | Restaurar mi-espacio, reglamento, reservar y testimonios borrados por error |
| 2026-09-07 | `9f4d3cd` | Agregar menu hamburguesa responsivo en las 8 paginas principales |
| 2026-09-07 | `1f0a2ad` | Conectar navegacion completa: Testimonios, Recursos y Reservar en todas las paginas |
| 2026-09-08 | `fab0040` | Eliminar archivos huerfanos: index maestro viejo y backups sueltos |
| 2026-09-08 | `a29cb0a` | Recuperacion maestra desde Git, SPA original restaurada y estilos 4K inyectados |
| 2026-09-08 | `546d73f` | Restaurar anclajes hash para navegacion SPA y reparar error 404 |
| 2026-09-08 | `c609392` | Restaurar anclajes hash para navegacion SPA y reparar error 404 |
| 2026-09-08 | `64a0613` | Arquitectura maestra SPA restaurada y estabilizada al 100% |
| 2026-09-09 | `c85e3b4` | Sitio completo desde commit estable c609392 |
| 2026-09-09 | `a151908` | Restaurar version original intacta, anadir estilos 4K, musica y SPA |
| 2026-09-09 | `cfe2f49` | Eliminar bucle infinito de imagen rota y corregir enlaces internos; anadir paginas de cursos, examenes y registro |
| 2026-09-09 | `39daa0d` | Quitar videos institucionales de Alianza Francesa y CAVILAM |
| 2026-09-09 | `da596ad` | Completar Mi espacio con las aulas virtuales A1 y B2 |
| 2026-09-09 | `aaad4a6` | Usar video real de Miguel en la seccion "En video" |
| 2026-09-10 | `c9e40d1` | Reemplazar fotos de retrato por las nuevas fotos reales de Miguel |
| 2026-09-10 | `458c324` | Restaurar homogeneizacion visual perdida en index.html |
| 2026-09-10 | `2cf9f00` | Separar el sitio en paginas reales por seccion + arreglos de video, musica y contacto |
| 2026-09-10 | `e19aae5` | Agregar foto de Paris como cabecera de perfil.html |
| 2026-09-10 | `c49e8cb` | Homogeneizar botones secundarios sueltos (CV, testimonio, inscripcion) |
| 2026-09-10 | `efd3e7b` | Agregar el club "Vendredi entre Amis" y enlazarlo desde el pie de pagina |
| 2026-09-10 | `ed072d7` | Tarjetas de cursos/servicios clicables con formulario prellenado y Vendredi entre Amis destacado |
| 2026-09-10 | `237e29c` | Video de transicion entre secciones (una vez por pagina) y boton de vista de escritorio |
| 2026-09-10 | `1cb74bb` | Corregir musica de fondo, limitar video de transicion a 3 usos, reconstruir pagos y eliminar codigo de mantenimiento |

## Fase 2 · Nace la plataforma
*2026-09-11 → 2026-09-11 · 21 cambios*

Base de datos, autenticación y roles. Primer esquema. Primera crisis de seguridad: recursión en las reglas de acceso y tres huecos cerrados el mismo día.

| Fecha | Cambio | Qué se hizo |
|---|---|---|
| 2026-09-11 | `32e5344` | Completar metodos de pago reales en pagos.html |
| 2026-09-11 | `77ff3d3` | Quitar tarjeta de PayPal en pagos.html (no lo usa Miguel) |
| 2026-09-11 | `ce6dee7` | Vincular Vendredi entre Amis al sitio publicado (VendrediEntreAmis) |
| 2026-09-11 | `96e4849` | Añade la fecha de la próxima sesión en la tarjeta de Vendredi entre Amis |
| 2026-09-11 | `729b52c` | Añade base de plataforma docente/estudiantil con Supabase |
| 2026-09-11 | `2ace70a` | Completa la plataforma docente/estudiantil sobre Supabase |
| 2026-09-11 | `d1391ae` | Conecta la plataforma con el proyecto Supabase real |
| 2026-09-11 | `b855f5e` | Corrige orden de creación en schema.sql (tablas antes que políticas) |
| 2026-09-11 | `b76fd56` | Corrige redirecciones absolutas que rompían el login en GitHub Pages |
| 2026-09-11 | `5a63cd2` | Corrige carrera al leer sesión/rol justo tras iniciar sesión |
| 2026-09-11 | `e4dbb36` | Añade diagnóstico detallado cuando falla la lectura del perfil tras iniciar sesión |
| 2026-09-11 | `4550a8f` | Evita depender de getSession() justo tras iniciar sesión |
| 2026-09-11 | `ccf3787` | Añade versión de caché a los scripts compartidos |
| 2026-09-11 | `ec3514f` | Corrige recursión infinita en las políticas RLS y cierra tres huecos de seguridad |
| 2026-09-11 | `d60010b` | Fija la sesión explícitamente tras el login y añade página de diagnóstico |
| 2026-09-11 | `50511c8` | Añade enlace de inscripción por curso |
| 2026-09-11 | `57a540c` | Completar boton flotante Vendredi entre Amis en todas las paginas y arreglar i18n sitewide |
| 2026-09-11 | `b6693c4` | Quita la página de diagnóstico y suma el Módulo 3 de Harleen |
| 2026-09-11 | `90c5f83` | Añade un carrusel de vídeos en inicio y galería |
| 2026-09-11 | `9cf9dab` | Elimina la página de diagnóstico |
| 2026-09-11 | `cf38fcc` | Añade edición de cursos, horario con generación de clases y nueva contraseña |

## Fase 3 · Contenido y confianza
*2026-09-13 → 2026-09-24 · 21 cambios*

Buscadores, carrusel de vídeos, galería profesional y el relato de trayectoria con 19 capítulos verificados uno a uno antes de publicarse.

| Fecha | Cambio | Qué se hizo |
|---|---|---|
| 2026-09-13 | `0e39b2b` | Ronda de correcciones de sitio - hero, perfil, servicios, galeria, contacto, reservar/reglamento |
| 2026-09-15 | `91e4074` | Añade robots.txt y sitemap.xml |
| 2026-09-15 | `0cc287f` | Corrige los textos del carrusel y usa fotogramas reales como póster |
| 2026-09-15 | `d468ea0` | La cortinilla cubre la carga en vez de hacerse esperar |
| 2026-09-15 | `4b66ace` | Comprime 4k.mp4 y deja de descargarlo cuando el intro no se ve |
| 2026-09-15 | `129f373` | Panel docente: inicio "Hoy" y calendario mensual |
| 2026-09-16 | `2bb683e` | Pasa presentacion-1 a H.264, unifica el vídeo duplicado y desbloquea el intro |
| 2026-09-16 | `eda1b48` | Evita que un CDN caído deje páginas muertas |
| 2026-09-16 | `db20e0b` | Recomprime las fotos del sitio: 912 KB menos |
| 2026-09-16 | `8ae88b6` | Saca a un archivo el CSS que estaba copiado en cada página |
| 2026-09-17 | `60ccc4e` | Enlaza el álbum de Google Photos desde la galería |
| 2026-09-18 | `499c8cb` | Añade migración SQL para el Carnet de Voyage de Vendredi entre Amis |
| 2026-09-18 | `42b2823` | Añade tabla y función para bienvenida personalizada del Carnet de Voyage |
| 2026-09-18 | `3e9edf5` | Motor de gestión académica (grupos, pagos, eventos, admin.html) y evento dinámico |
| 2026-09-18 | `5bd39df` | Fase 4 — paneles docente/estudiante adaptados al modelo de grupos |
| 2026-09-21 | `eed80f9` | Blindar el cupo del grupo contra valores vacíos/inválidos |
| 2026-09-22 | `8f52197` | Catálogo de métodos/manuales FLE con progresión por unidades |
| 2026-09-23 | `b6542d7` | Unidades reales de Défi 3 confirmadas |
| 2026-09-23 | `a0f1f91` | Corrige la atribución de Défi 2/3 y agrega Défi 4 y 5 completos |
| 2026-09-24 | `51cd8a6` | Perfil como relato inmersivo con pruebas fotográficas y de video |
| 2026-09-24 | `c5c7a56` | Video de las clases en el inicio y en la galería; ya no aparece como director |

## Fase 4 · El primer ciclo real
*2026-09-25 → 2026-09-25 · 27 cambios*

Ciclo A1.4 con sus doce sesiones. Espacio del estudiante. Datos del representante. Dos huecos de privacidad encontrados y cerrados. Auditoría móvil. La saga del inicio de sesión.

| Fecha | Cambio | Qué se hizo |
|---|---|---|
| 2026-09-25 | `e83b1a3` | 24 fotos editadas en el relato, novedad Destination Francophonie y fondos fotográficos |
| 2026-09-25 | `0d4d417` | Ciclo A1 octubre 2026: plan de 12 sesiones, paso de pago y materiales |
| 2026-09-25 | `1bffbfe` | Álbum completo de la trayectoria, 19 capítulos verificados y más fotos en cada sección |
| 2026-09-25 | `05794bd` | Archivo único para pegar en Supabase de una sola vez |
| 2026-09-25 | `be5ca28` | Video «Mi trayectoria» en el perfil y en la galería de videos |
| 2026-09-25 | `d5b429e` | El rodaje de Destination Francophonie presenta la sede renovada de la Alianza (rol confirmado por Miguel) |
| 2026-09-25 | `159cf99` | Karen Elizabeth (ITAES), Patrick de Bréon (†2026) y la foto de entrevista pasa al video de presentación |
| 2026-09-25 | `e6d607e` | Espacio del estudiante: bienvenida, recorrido y detalles del curso |
| 2026-09-25 | `b3f0fe6` | Romain Nadal (embajador en Venezuela, 2023) y L'Étape Ecuador con el embajador Frédéric Desagneaux |
| 2026-09-25 | `e924c39` | Panel de control del estudiante: repositorio y Mis resultados |
| 2026-09-25 | `0ed2faa` | Maura Carpio (La Salle) y Jaime Casanova (video promocional de la Alianza) |
| 2026-09-25 | `a810d4d` | Gloria Ramos, arquitecta y colaboradora de la Alianza, en la foto del consulado |
| 2026-09-25 | `5b61366` | El login manda a los administradores al panel docente y las consultas siempre llevan el token de la sesión |
| 2026-09-25 | `7cafeec` | Normaliza la dirección del correo de verificación |
| 2026-09-25 | `dc7b476` | Datos del representante y enlaces de clase bajo llave |
| 2026-09-25 | `edf2488` | Auditoría móvil: objetivos táctiles y textos legibles en el teléfono |
| 2026-09-25 | `b967f49` | Evita que el plan B del login invalide la sesión recién creada |
| 2026-09-25 | `233703e` | Invitación a la première de «Destination Francophonie au Mexique» (26 de septiembre, 18:00, El Rastro) |
| 2026-09-25 | `fd65d39` | Un token caducado ya no deja al usuario encerrado fuera de su panel |
| 2026-09-25 | `04d4130` | Fotos reales del rodaje, encuadres sin solapes, miniaturas nuevas del video de clases y botón Vendredi compacto |
| 2026-09-25 | `a4e94f4` | Solo fotos profesionales en la galería y nombres verificados en los pies de foto |
| 2026-09-25 | `6cba028` | No borrar nunca una sesión que todavía es válida |
| 2026-09-25 | `28b56f3` | El diagnóstico dice ahora si el login devolvió sesión o solo usuario |
| 2026-09-25 | `c8de480` | La sesión ya no se pierde si el almacenamiento del navegador falla |
| 2026-09-25 | `6546879` | El login ya no manda al panel si la sesión no quedó guardada |
| 2026-09-25 | `383409c` | Los paneles muestran el error en vez de quedarse en blanco |
| 2026-09-25 | `98cf9da` | El panel deja de rebotar al login cuando la sesión sí es válida |

## Fase 5 · Puesta en marcha
*2026-09-26 → 2026-09-30 · 22 cambios*

Correo propio, plazos de inscripción y de pago separados, material de comunicación y la lista de comprobación del arranque.

| Fecha | Cambio | Qué se hizo |
|---|---|---|
| 2026-09-26 | `4dbd52e` | Consultas para aprobar inscripciones sin pasar por el panel |
| 2026-09-26 | `d6696be` | Entrar al panel sin depender de que el navegador guarde la sesión |
| 2026-09-26 | `8fe2255` | Llevar a su panel a quien entra por la página equivocada |
| 2026-09-26 | `c4d3f2d` | Infografía del ciclo, al día y con lo que faltaba |
| 2026-09-26 | `9dce871` | Guardar los mensajes del ciclo y la guía del correo propio |
| 2026-09-26 | `2dc73ca` | Juan Francisco Coba (Cogiler) y horarios de TV5MONDE en hora de México |
| 2026-09-26 | `61cfa9a` | Inscripción sin curso — la cuenta se crea aunque el grupo no exista y el administrador asigna después |
| 2026-09-27 | `c3810db` | El rol admin entra ahora a admin.html, no a panel-docente.html |
| 2026-09-27 | `03f6bdc` | Botón «Reabrir» para deshacer un «Cerrar» sin pasar por Supabase |
| 2026-09-28 | `bb844d5` | Camino sin dominio para tener el correo funcionando hoy |
| 2026-09-28 | `d95bdbe` | Fotos reales de la conferencia de Meirieu en la UNAE y portada del libro traducido |
| 2026-09-28 | `863eb29` | La música suena una vez y el vídeo manda |
| 2026-09-28 | `bc287c5` | Hay plazo hasta el primer día del ciclo, inclusive |
| 2026-09-29 | `bd9ad59` | Separar el plazo para inscribirse del plazo para pagar |
| 2026-09-29 | `be33bc5` | El mensaje ofrece antes de cobrar |
| 2026-09-28 | `61d7270` | Fecha, hora y lugar exactos de la conferencia de Meirieu, según el volante oficial |
| 2026-09-29 | `ab49716` | Checklist de arranque con los enlaces directos |
| 2026-09-29 | `44e0028` | La dirección buena del SMTP, y qué contraseña va ahí |
| 2026-09-29 | `ea241cd` | Infografía del paso a paso para entrar a la plataforma |
| 2026-09-28 | `cd8570a` | Pagos con Stripe (modo de prueba) — Edge Functions y botón «Cobrar con Stripe» |
| 2026-09-29 | `eb977bc` | Todo el envío en un solo archivo, sin nada que rellenar |
| 2026-09-29 | `c2bf9a4` | Add files via upload |

## Fase 6 · Evaluación, resultados y familias
*2026-10-01 → 2026-10-03 · 11 cambios*

Pagos manuales, publicación de resultados, boletines con enlace privado, baja de estudiante y acceso propio para representantes.

| Fecha | Cambio | Qué se hizo |
|---|---|---|
| 2026-10-01 | `b402d92` | Pagos por transferencia manual (Nu/Albo) en vez de Stripe |
| 2026-10-01 | `5a5fd68` | Agregar Remitly a los datos de pago del estudiante |
| 2026-10-02 | `ab7c7b4` | Resultados A1.4 en «Mis resultados» y envío a representantes |
| 2026-10-02 | `3af8632` | Boletines de resultados con enlace privado para las familias |
| 2026-10-02 | `8614ede` | Guía para pasar la plataforma a dominio propio |
| 2026-10-02 | `bfd597b` | El sitio se queda en GitHub Pages |
| 2026-10-02 | `9ddbc3f` | Dar de baja a un estudiante que se retira |
| 2026-10-02 | `13ac1f0` | Las consultas que hacen falta cada semana, en un solo archivo |
| 2026-10-03 | `d89d44f` | Acceso propio para padres, madres y representantes |
| 2026-10-02 | `86772de` | Lugar y año de la foto del panel «Zona Talentos» (Cuenca, 2021) |
| 2026-10-03 | `ff657fd` | Pedir el correo del representante, en vez de inventárselo |

