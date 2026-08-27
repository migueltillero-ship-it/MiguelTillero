#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera las páginas de captación por examen y por público.

Son archivos HTML reales, no vistas del enrutador del sitio principal:
existen para que un buscador pueda indexarlas por separado, y un
fragmento de dirección (#delf-b2) no crea una página distinta a ojos de
Google. Cada una lleva su propio título, su descripción, su enlace
canónico y sus datos estructurados.

    python3 herramientas/generar_paginas.py

Escribe en examenes/ y en cursos/. Para cambiar un texto, edítalo aquí
y vuelve a ejecutar: así las diez páginas mantienen la misma estructura.
"""

import os
import html
import json

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://migueltillero-ship-it.github.io/MiguelTillero"
WA = "529673424456"

# ═══════════════════════════════════════════════════════════════
# CONTENIDO
# ═══════════════════════════════════════════════════════════════

EXAMENES = [
    {
        "slug": "delf-a1",
        "sigla": "DELF A1",
        "titulo": "Preparación DELF A1",
        "meta": "Preparación para el DELF A1 con un profesor especialista en FLE. "
                "Estructura del examen, nivel exigido y entrenamiento con simulacros. Clases en línea y en San Cristóbal de Las Casas.",
        "h1": "Preparación <em>DELF A1</em>",
        "entradilla": "El A1 es el primer diploma oficial de francés y el más agradecido de preparar: "
                      "con muy poca lengua ya se aprueba, siempre que sepas exactamente qué te van a pedir. "
                      "Se rinde sobre situaciones cotidianas y elementales, y una vez obtenido no caduca nunca.",
        "horas": "60 – 100 h", "horas_nota": "de clase acumuladas desde cero",
        "puede": "Presentarte, decir dónde vives, pedir algo en una tienda y rellenar un formulario sencillo.",
        "quien": [
            "Quien empieza de cero y quiere una meta concreta en lugar de estudiar sin rumbo.",
            "Familias que necesitan acreditar un primer nivel en un trámite escolar o migratorio.",
            "Estudiantes que van a seguir hasta el B1 o el B2 y prefieren certificar cada escalón.",
        ],
        "preparo": [
            "Reconocer el tipo de tarea antes de leerla entera: en el A1 el formato se repite y saberlo ahorra minutos.",
            "El diálogo de la prueba oral, ensayado hasta que deja de dar miedo: presentación, intercambio de información y juego de rol.",
            "Los números, las horas, las fechas y los precios, que es donde más puntos se pierden en la comprensión oral.",
            "Simulacros completos cronometrados, corregidos con los criterios oficiales.",
        ],
        "faq": [
            ("¿Cuánto tiempo necesito para llegar al A1?",
             "Con dos clases por semana, la mayoría de mis estudiantes se presenta entre los cuatro y los seis meses. "
             "Depende sobre todo de cuánto contacto tengas con el idioma entre clase y clase, no solo de las horas de aula."),
            ("¿Es muy difícil si nunca he estudiado francés?",
             "No. El A1 está diseñado justo para eso. Lo que suele fallar no es el nivel de lengua sino el desconocimiento del formato: "
             "gente que sabe más de lo que el examen pide y aun así pierde puntos por no entender la consigna."),
            ("¿El diploma caduca?",
             "No. El DELF es un diploma del Ministerio francés de Educación y vale de por vida. No hay que renovarlo ni volver a presentarse."),
        ],
    },
    {
        "slug": "delf-a2",
        "sigla": "DELF A2",
        "titulo": "Preparación DELF A2",
        "meta": "Preparación para el DELF A2: estructura de las cuatro pruebas, nivel exigido y simulacros con corrección "
                "según criterios oficiales. Clases de francés en línea y en San Cristóbal de Las Casas.",
        "h1": "Preparación <em>DELF A2</em>",
        "entradilla": "El A2 marca el punto en que dejas de repetir frases hechas y empiezas a arreglártelas solo en lo cotidiano. "
                      "Es el nivel que piden bastantes trámites de integración y el escalón donde conviene asentar la gramática "
                      "antes de que el B1 se vuelva cuesta arriba.",
        "horas": "150 – 200 h", "horas_nota": "de clase acumuladas desde cero",
        "puede": "Desenvolverte en compras, transporte, restaurante y trabajo, y contar tu pasado con frases simples.",
        "quien": [
            "Quien ya tiene una base y necesita certificarla para un expediente.",
            "Estudiantes que van camino del B1 y quieren comprobar dónde están de verdad.",
            "Adultos que preparan una estancia o una mudanza a un país francófono.",
        ],
        "preparo": [
            "Los tiempos del pasado, que es la frontera real entre el A1 y el A2 y donde se decide el aprobado.",
            "La producción escrita en sus dos formatos habituales: el mensaje breve y la carta de descripción o invitación.",
            "El monólogo y el diálogo de la prueba oral, con banco de temas frecuentes y corrección de la pronunciación.",
            "Simulacros completos cronometrados con retroalimentación detallada por competencia.",
        ],
        "faq": [
            ("¿Puedo saltarme el A1 y presentarme directo al A2?",
             "Sí, perfectamente. Cada nivel del DELF es un diploma independiente y no hace falta tener el anterior. "
             "Mucha gente va directa al nivel que le exige su trámite."),
            ("¿Qué pasa si suspendo una de las cuatro pruebas?",
             "El examen se aprueba con 50 puntos sobre 100 en el conjunto, pero hace falta un mínimo de 5 sobre 25 en cada prueba. "
             "Es decir, puedes ir flojo en una si compensas con las otras, pero no puedes dejarla en blanco."),
            ("¿Sirve el A2 para la nacionalidad o la residencia?",
             "Depende del trámite y del año: los niveles exigidos cambian con la normativa. Confirma siempre el requisito vigente "
             "con la institución que te lo pide antes de pagar una inscripción."),
        ],
    },
    {
        "slug": "delf-b1",
        "sigla": "DELF B1",
        "titulo": "Preparación DELF B1",
        "meta": "Preparación para el DELF B1: las cuatro competencias, estrategias por prueba y simulacros completos. "
                "Profesor especialista en FLE, clases en línea y en San Cristóbal de Las Casas.",
        "h1": "Preparación <em>DELF B1</em>",
        "entradilla": "El B1 es el nivel de la autonomía: el punto en que puedes viajar solo por un país francófono, "
                      "defender una opinión y salir de un imprevisto sin que nadie te traduzca. "
                      "También es el escalón donde más gente se estanca, porque exige argumentar y no solo describir.",
        "horas": "350 – 400 h", "horas_nota": "de clase acumuladas desde cero",
        "puede": "Contar experiencias, explicar planes, defender brevemente una opinión y resolver un imprevisto de viaje.",
        "quien": [
            "Quien necesita acreditar autonomía real para estudios, trabajo o un expediente migratorio.",
            "Estudiantes que llevan tiempo en un nivel intermedio y quieren romper el estancamiento.",
            "Profesionales que van a usar el francés en su trabajo sin dedicarse a la lengua.",
        ],
        "preparo": [
            "La argumentación: el B1 ya no premia describir, premia tomar postura y sostenerla con ejemplos.",
            "El ejercicio de interacción oral, que es el que más sorprende: hay que negociar y resolver una situación con el examinador.",
            "Conectores y matices, que son lo que separa un texto de A2 alargado de un texto que de verdad es B1.",
            "Simulacros cronometrados y corrección con los criterios oficiales, prueba por prueba.",
        ],
        "faq": [
            ("¿Cuánto se tarda en pasar del A2 al B1?",
             "Es el salto más largo de toda la escala: suele llevar el doble de tiempo que el anterior. "
             "Conviene contar con un año de trabajo constante, y no es un fracaso que así sea."),
            ("¿Qué diferencia hay entre el DELF B1 y el TCF?",
             "El DELF es un diploma que se aprueba o no y no caduca. El TCF es un test que sitúa tu nivel y vale dos años. "
             "Para estudios y acreditación de por vida, DELF; para trámites migratorios, casi siempre TCF o TEF."),
            ("¿Hay versión para adolescentes?",
             "Sí, el DELF Junior y el DELF Scolaire tienen el mismo nivel y el mismo valor que el Tous Publics, "
             "pero los temas se adaptan a la vida de un adolescente."),
        ],
    },
    {
        "slug": "delf-b2",
        "sigla": "DELF B2",
        "titulo": "Preparación DELF B2",
        "meta": "Preparación para el DELF B2, el nivel que piden las universidades francesas. Estructura de las pruebas, "
                "estrategias de argumentación y simulacros. Clases en línea y en San Cristóbal de Las Casas.",
        "h1": "Preparación <em>DELF B2</em>",
        "entradilla": "El B2 es el diploma más solicitado de toda la escala, porque es el que abre la puerta de las universidades "
                      "francesas y de buena parte de los empleos donde el francés cuenta. Exige argumentar con matices, "
                      "defender una postura ante alguien que te lleva la contraria y escribir textos estructurados.",
        "horas": "500 – 650 h", "horas_nota": "de clase acumuladas desde cero",
        "puede": "Seguir una discusión técnica de tu campo, argumentar con matices y escribir textos claros y estructurados.",
        "quien": [
            "Quien va a solicitar plaza en una universidad francesa: es el nivel exigido en la mayoría de los casos.",
            "Profesionales que necesitan el francés como lengua de trabajo y no como complemento.",
            "Estudiantes que ya se manejan pero cuyo francés sigue sonando a nivel intermedio.",
        ],
        "preparo": [
            "El ensayo argumentado: plan, tesis, contraargumento y cierre. Es la prueba que más se entrena y la que más sube la nota.",
            "La defensa de un punto de vista ante el examinador, que rebate a propósito. Se ensaya hasta que deja de descolocar.",
            "La comprensión oral sobre documentos largos y de registro real, que es donde se pierden más puntos por falta de costumbre.",
            "Simulacros completos en condiciones de examen y corrección detallada según los criterios oficiales.",
        ],
        "faq": [
            ("¿El B2 me exime de la prueba de idioma de la universidad?",
             "En la mayoría de las universidades francesas, sí: el DELF B2 dispensa del test lingüístico de acceso. "
             "Aun así, confirma el requisito concreto con la universidad a la que vas a postular, porque cada una fija sus condiciones."),
            ("¿Cuánto tiempo de preparación específica necesito?",
             "Si ya estás en un B1 sólido, entre tres y seis meses de trabajo dirigido al examen. "
             "Si todavía no lo estás, primero hay que cerrar el B1: presentarse antes de tiempo es la forma más cara de suspender."),
            ("¿Es mejor el DELF B2 o el TCF para estudiar en Francia?",
             "El DELF B2 es un diploma vitalicio y el TCF caduca a los dos años. Si vas a postular más de una vez, o quieres el papel "
             "para siempre, el DELF sale más rentable. El TCF DAP tiene sentido cuando el calendario aprieta."),
        ],
    },
    {
        "slug": "dalf-c1",
        "sigla": "DALF C1",
        "titulo": "Preparación DALF C1",
        "meta": "Preparación para el DALF C1: síntesis de documentos, ensayo argumentado y exposición oral con debate. "
                "Profesor especialista en FLE con clases en línea y en San Cristóbal de Las Casas.",
        "h1": "Preparación <em>DALF C1</em>",
        "entradilla": "El C1 es el nivel del usuario autónomo: usar el francés con soltura en la vida académica y profesional, "
                      "producir textos largos y bien estructurados y captar lo que se dice entre líneas. "
                      "Es lo que piden los posgrados francófonos y los puestos donde el francés es la herramienta de trabajo.",
        "horas": "700 – 900 h", "horas_nota": "de clase acumuladas desde cero",
        "puede": "Manejarte con flexibilidad en lo social, lo académico y lo profesional, y producir textos complejos.",
        "quien": [
            "Candidatos a máster o doctorado en una universidad francófona.",
            "Docentes de francés que necesitan acreditar su propio nivel de lengua.",
            "Profesionales en entornos donde el francés es la lengua de trabajo diaria.",
        ],
        "preparo": [
            "La síntesis de documentos, que es la prueba más técnica del examen: reformular varias fuentes sin copiar y sin opinar.",
            "El ensayo argumentado extenso, con trabajo de plan, de registro y de precisión léxica.",
            "La exposición oral a partir de un dossier y el debate posterior, que se ensaya con el reloj delante.",
            "Corrección fina: en el C1 los puntos se pierden por imprecisión, no por errores gruesos.",
        ],
        "faq": [
            ("¿Puedo presentarme al C1 sin tener el B2?",
             "Sí. Cada diploma es independiente. Pero conviene ser honesto con el punto de partida: el salto del B2 al C1 es grande "
             "y presentarse antes de tiempo sale caro. Una prueba de ubicación conmigo aclara la duda en una sesión."),
            ("¿Qué se evalúa exactamente?",
             "Las cuatro competencias sobre tareas largas y complejas: comprensión oral de documentos extensos, comprensión escrita, "
             "síntesis y ensayo por escrito, y exposición con debate en el oral."),
            ("¿Cuánto tarda la preparación?",
             "Con un B2 sólido de partida, entre seis meses y un año de trabajo dirigido. "
             "La síntesis, en particular, es una técnica que necesita repetición: no se improvisa."),
        ],
    },
    {
        "slug": "dalf-c2",
        "sigla": "DALF C2",
        "titulo": "Preparación DALF C2",
        "meta": "Preparación para el DALF C2, el nivel más alto de la escala del Marco Común Europeo. "
                "Trabajo de estilo, retórica y precisión con un profesor especialista en FLE.",
        "h1": "Preparación <em>DALF C2</em>",
        "entradilla": "El C2 es el techo de la escala. No mide si entiendes el francés —eso ya se da por hecho— sino si lo manejas "
                      "con la precisión, la espontaneidad y el matiz de alguien que se mueve en él sin esfuerzo. "
                      "A este nivel el trabajo ya no es de gramática: es de estilo, de registro y de retórica.",
        "horas": "1 000 h +", "horas_nota": "de clase acumuladas desde cero",
        "puede": "Entender sin esfuerzo casi todo lo que lees y escuchas, y expresarte con precisión y matiz en cualquier situación.",
        "quien": [
            "Traductores e intérpretes que necesitan acreditar el nivel máximo.",
            "Docentes e investigadores que trabajan íntegramente en francés.",
            "Quien ya tiene el C1 y quiere cerrar la escala.",
        ],
        "preparo": [
            "El registro: saber cuándo una expresión correcta es, aun así, la equivocada para la situación.",
            "La síntesis y la reformulación de alto nivel, con fidelidad al sentido y voz propia.",
            "La exposición argumentada larga, con estructura retórica y capacidad de sostener el debate.",
            "Lectura y escucha de material no adaptado, comentada, para afinar el oído a los matices.",
        ],
        "faq": [
            ("¿En qué se diferencia del C1?",
             "El C2 tiene una estructura distinta: no son cuatro pruebas separadas sino dos bloques que combinan comprensión "
             "y producción, uno oral y otro escrito. Y el listón no es la corrección, es la finura."),
            ("¿Vale la pena si ya tengo el C1?",
             "Depende de para qué. Para la mayoría de los trámites académicos y laborales, el C1 basta. "
             "El C2 tiene sentido si trabajas con la lengua misma: traducción, enseñanza, investigación."),
            ("¿Cómo se prepara un nivel así?",
             "Con material real y mucha corrección fina. A este nivel no doy clase de francés: trabajo contigo sobre tus propios "
             "textos y tus propias intervenciones, señalando lo que un nativo culto diría de otra manera."),
        ],
    },
]

PUBLICOS = [
    {
        "slug": "ninos",
        "sigla": "Niños",
        "titulo": "Clases de francés para niños",
        "meta": "Clases de francés para niños de 7 a 11 años: juego, canción y proyectos, con ruta hacia el DELF Prim. "
                "Profesor especialista en FLE en San Cristóbal de Las Casas y en línea.",
        "h1": "Francés para <em>niños</em>",
        "entradilla": "Un niño no aprende un idioma estudiándolo, lo aprende usándolo para algo que le importa. "
                      "Por eso en estas clases se juega, se canta, se cocina y se construye, y el francés es la herramienta "
                      "con la que se hace todo eso, no la asignatura del día.",
        "ficha": [("Edad", "7 – 11 años", "grupos por edad y no por nivel suelto"),
                  ("Ritmo", "1 – 2 h / semana", "sesiones cortas, que es lo que aguanta la atención"),
                  ("Formato", "Grupo reducido", "también individual si hace falta"),
                  ("Meta", "DELF Prim", "cuando la familia lo quiere, sin presión")],
        "quien": [
            "Familias que quieren dar a sus hijos una segunda lengua desde pequeños.",
            "Niños en escuelas bilingües que necesitan apoyo o refuerzo.",
            "Hijos de familias francófonas que quieren mantener la lengua fuera de casa.",
        ],
        "preparo": [
            "Canciones, cuentos y juegos de mesa: a esta edad la repetición tiene que ser divertida o no hay repetición.",
            "Proyectos colectivos con un resultado visible, para que el idioma tenga una finalidad y no sea un ejercicio.",
            "Trabajo oral muy por delante del escrito, que es como se aprende una lengua a esta edad.",
            "Ruta natural hacia el DELF Prim para quien quiera certificar, sin convertir la clase en una preparación de examen.",
        ],
        "faq": [
            ("¿Desde qué edad tiene sentido empezar?",
             "Desde los siete años más o menos, cuando ya leen y escriben en su lengua. Antes también se puede, pero el trabajo "
             "es distinto y casi todo oral."),
            ("¿Mi hijo se va a confundir con el español?",
             "No. Es un miedo comprensible y muy extendido, pero los niños separan las lenguas sin problema. "
             "Mezclar palabras al principio es una etapa normal, no una señal de alarma."),
            ("¿Hay deberes?",
             "Muy pocos y siempre cortos. A esta edad prefiero que escuchen una canción o vean un dibujo en francés "
             "a que rellenen una ficha."),
        ],
    },
    {
        "slug": "adolescentes",
        "sigla": "Adolescentes",
        "titulo": "Clases de francés para adolescentes",
        "meta": "Clases de francés para adolescentes de 12 a 17 años, con preparación al DELF Junior y apoyo escolar. "
                "Profesor especialista en FLE en San Cristóbal de Las Casas y en línea.",
        "h1": "Francés para <em>adolescentes</em>",
        "entradilla": "A esta edad el francés deja de ser un juego y empieza a tener consecuencias: notas, intercambios, "
                      "una beca, la idea de estudiar fuera. Las clases van a eso, con temas que les interesen de verdad "
                      "y con el DELF Junior como meta cuando tiene sentido.",
        "ficha": [("Edad", "12 – 17 años", "grupos por edad y nivel"),
                  ("Ritmo", "2 – 4 h / semana", "compatible con el calendario escolar"),
                  ("Formato", "Grupo o individual", "también apoyo escolar puntual"),
                  ("Meta", "DELF Junior", "A1 a B2 según el punto de partida")],
        "quien": [
            "Adolescentes que llevan francés en el colegio y necesitan apoyo o quieren ir más lejos.",
            "Quien prepara un intercambio, una beca o una estancia en un país francófono.",
            "Familias que quieren un diploma oficial en el expediente antes de la universidad.",
        ],
        "preparo": [
            "Temas que conectan con su mundo: música, series, redes, actualidad. Un texto aburrido no se aprende.",
            "Preparación al DELF Junior, con la misma exigencia que el Tous Publics pero con temas de su edad.",
            "Apoyo con lo que llevan en el colegio, sin limitarme a repetir lo que ya les explicaron.",
            "Expresión oral en grupo, que a esta edad es donde está el bloqueo real: entienden y no se atreven.",
        ],
        "faq": [
            ("¿Sirve para subir la nota del colegio?",
             "Suele ser una consecuencia, no el objetivo. Trabajo la lengua a fondo y las notas mejoran solas. "
             "Si hay un examen concreto a la vista, lo preparamos, claro."),
            ("¿El DELF Junior vale lo mismo que el normal?",
             "Exactamente lo mismo. Es el mismo diploma y el mismo nivel del Marco Común Europeo; solo cambian los temas, "
             "adaptados a la vida de un adolescente."),
            ("¿Y si no quiere estar ahí?",
             "Se nota enseguida y no sirve forzarlo. Lo que suele funcionar es encontrar para qué le sirve el francés a esa persona "
             "en concreto. Cuando aparece un motivo propio, el trabajo cambia."),
        ],
    },
    {
        "slug": "adultos",
        "sigla": "Adultos",
        "titulo": "Clases de francés para adultos",
        "meta": "Clases de francés para adultos: itinerario a medida según tu objetivo, tu ritmo y tu tiempo real. "
                "Del A1 al C2, en línea y en San Cristóbal de Las Casas.",
        "h1": "Francés para <em>adultos</em>",
        "entradilla": "Un adulto no tiene tiempo que perder y casi siempre tiene un motivo concreto: un examen, una mudanza, "
                      "un trabajo, un viaje o una asignatura pendiente desde hace años. El itinerario se construye sobre ese motivo "
                      "y sobre el tiempo del que dispones de verdad, no sobre el que te gustaría tener.",
        "ficha": [("Niveles", "A1 → C2", "todo el recorrido"),
                  ("Ritmo", "A convenir", "de 2 h semanales a inmersión intensiva"),
                  ("Formato", "Individual, dúo o grupo", "presencial y en línea"),
                  ("Meta", "La tuya", "examen, trabajo, viaje o gusto propio")],
        "quien": [
            "Quien prepara un examen oficial o un trámite migratorio con fecha.",
            "Profesionales que necesitan el francés para su trabajo.",
            "Quien retoma el francés después de años y no sabe por dónde entrar.",
            "Quien aprende por gusto y quiere hacerlo bien.",
        ],
        "preparo": [
            "Una prueba de ubicación real al principio: escucharte y hacerte hablar, no solo un test de gramática.",
            "Un itinerario con objetivos por etapa, para que sepas en todo momento dónde estás y qué falta.",
            "Metodología comunicativa: se habla desde la primera clase, aunque sea mal, porque es la única forma.",
            "Adaptación a tu calendario real, incluidas las semanas en que la vida se complica.",
        ],
        "faq": [
            ("Soy mayor, ¿todavía puedo aprender un idioma?",
             "Sí. Los adultos aprenden distinto que los niños, no peor: entienden estructuras más rápido y aprovechan mejor "
             "la explicación. Lo que cuesta más es soltarse a hablar, y eso se trabaja."),
            ("¿Cuánto tardaré en manejarme?",
             "Para desenvolverte en lo cotidiano hacen falta entre 150 y 200 horas de clase acumuladas; para autonomía real, "
             "unas 350 o 400. Son cifras orientativas, pero sirven para planificar sin ilusiones."),
            ("Intenté aprender antes y lo dejé. ¿Qué cambia ahora?",
             "Normalmente lo que falla no es la capacidad sino la falta de un objetivo concreto y de una ruta visible. "
             "Empezamos por ahí: qué quieres poder hacer en francés, y en cuánto tiempo."),
        ],
    },
    {
        "slug": "docentes",
        "sigla": "Docentes",
        "titulo": "Formación para docentes de francés",
        "meta": "Formación y asesoría pedagógica para profesores de francés lengua extranjera: diseño curricular, "
                "evaluación por competencias y acompañamiento de equipos, según el Marco Común Europeo.",
        "h1": "Formación para <em>docentes</em>",
        "entradilla": "Dar clase de francés y formar a quien la da son dos oficios distintos. Esta línea de trabajo es para "
                      "profesores y equipos que quieren enseñar mejor: revisar cómo evalúan, ordenar un programa disperso "
                      "o construir un itinerario coherente con el Marco Común Europeo.",
        "ficha": [("Público", "Docentes y equipos", "de centros públicos y privados"),
                  ("Formato", "Taller o acompañamiento", "sesión suelta o proceso largo"),
                  ("Ámbito", "Presencial y en línea", "también a instituciones completas"),
                  ("Base", "MCER", "enfoque comunicativo y accional")],
        "quien": [
            "Profesores de francés que enseñan por vocación y sin formación específica en didáctica del FLE.",
            "Coordinaciones que necesitan ordenar un programa heredado y sin criterio común.",
            "Centros que quieren alinear su evaluación con el Marco Común Europeo.",
            "Equipos que preparan candidatos a DELF y DALF y quieren afinar su preparación.",
        ],
        "preparo": [
            "Diseño curricular: pasar de una lista de contenidos a un itinerario con objetivos observables por nivel.",
            "Evaluación por competencias, con criterios que el estudiante entienda y el profesor pueda sostener.",
            "Formación de formadores y observación de clases, con retorno concreto y no genérico.",
            "Preparación de equipos para el acompañamiento a DELF y DALF, incluida la corrección con criterios oficiales.",
        ],
        "faq": [
            ("¿Hace falta un nivel alto de francés para la formación?",
             "Para la parte didáctica, no necesariamente: se puede trabajar en español. "
             "Ahora bien, si el objetivo es subir el nivel de lengua del propio equipo, eso es otra línea de trabajo y se dice claro."),
            ("¿Trabajas con instituciones completas?",
             "Sí. He dirigido centros y equipos durante más de una década, y buena parte del trabajo es institucional: "
             "diagnóstico, plan de mejora y acompañamiento sostenido, no una charla suelta."),
            ("¿Se puede hacer a distancia?",
             "Sí, y funciona bien para la parte de diseño y de revisión de materiales. "
             "La observación de clases rinde más en presencial, aunque también se hace con grabaciones."),
        ],
    },
]

# ═══════════════════════════════════════════════════════════════
# PLANTILLA
# ═══════════════════════════════════════════════════════════════

def cabecera(titulo, meta, canonico, prof):
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{html.escape(titulo)} · Miguel Tillero</title>
<meta name="description" content="{html.escape(meta)}">
<link rel="canonical" href="{canonico}">
<meta name="robots" content="index, follow">
<meta name="author" content="Miguel David Tillero Álvarez">
<meta name="theme-color" content="#f3f7f1">
<meta property="og:type" content="article">
<meta property="og:title" content="{html.escape(titulo)} · Miguel Tillero">
<meta property="og:description" content="{html.escape(meta)}">
<meta property="og:url" content="{canonico}">
<meta property="og:locale" content="es_MX">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Space+Mono&family=Syne:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{prof}assets/landing.css">
<link rel="icon" type="image/svg+xml" href='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="%23f3f7f1"/><text x="50" y="68" font-family="Georgia,serif" font-size="52" fill="%23206a48" text-anchor="middle">MT</text></svg>'>
</head>
<body>
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<div class="container">
<div class="top-bar">
  <a class="brand" href="{prof}index.html">Miguel <span>Tillero</span></a>
  <a class="back-link" href="{prof}index.html#estudiantes">← Volver al sitio</a>
</div>
"""


def pie(prof):
    return f"""
<footer>
  <span>© 2026 Miguel Tillero · Profesor de francés · Especialista FLE</span>
  <span><a href="{prof}index.html">Inicio</a> · <a href="{prof}index.html#contacto">Contacto</a> · <a href="{prof}reglamento.html">Reglamento</a></span>
</footer>
</div>
</body>
</html>
"""


def bloque_faq(faq):
    out = ["<h2>Preguntas frecuentes</h2>"]
    for preg, resp in faq:
        out.append(f"<details><summary>{html.escape(preg)}</summary>"
                   f'<div class="cuerpo">{html.escape(resp)}</div></details>')
    return "\n".join(out)


def bloque_cta(titulo_cta, texto, prof):
    return f"""
<div class="cta">
  <h2>{html.escape(titulo_cta)}</h2>
  <p>{html.escape(texto)}</p>
  <div class="botones">
    <a class="btn btn-oro" href="{prof}index.html#inscripcion">Solicitar información</a>
    <a class="btn btn-linea" href="https://wa.me/{WA}" target="_blank" rel="noopener">Escribir por WhatsApp</a>
  </div>
</div>
"""


def hermanas(items, actual, carpeta, etiqueta):
    enlaces = []
    for it in items:
        marca = ' aria-current="page"' if it["slug"] == actual else ""
        enlaces.append(f'<a href="{it["slug"]}.html"{marca}>{html.escape(it["sigla"])}</a>')
    return f'<h2>{etiqueta}</h2>\n<div class="hermanas">{"".join(enlaces)}</div>'


def json_ld(titulo, meta, canonico, faq):
    curso = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": titulo,
        "description": meta,
        "url": canonico,
        "inLanguage": "fr",
        "provider": {"@type": "Person", "name": "Miguel David Tillero Álvarez",
                     "url": BASE + "/"},
        "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": ["Onsite", "Online"],
            "location": {"@type": "Place", "address": {
                "@type": "PostalAddress", "addressLocality": "San Cristóbal de Las Casas",
                "addressRegion": "Chiapas", "addressCountry": "MX"}},
        },
    }
    preguntas = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": p,
             "acceptedAnswer": {"@type": "Answer", "text": r}} for p, r in faq
        ],
    }
    return ('<script type="application/ld+json">\n'
            + json.dumps(curso, ensure_ascii=False, indent=2)
            + '\n</script>\n<script type="application/ld+json">\n'
            + json.dumps(preguntas, ensure_ascii=False, indent=2)
            + '\n</script>')


def pagina_examen(e):
    prof = "../"
    canonico = f"{BASE}/examenes/{e['slug']}.html"
    p = [cabecera(e["titulo"], e["meta"], canonico, prof)]
    p.append(f'<nav class="migas" aria-label="Migas de pan">'
             f'<a href="{prof}index.html">Inicio</a> / '
             f'<a href="{prof}index.html#certificaciones">Exámenes oficiales</a> / '
             f'{html.escape(e["sigla"])}</nav>')
    p.append('<main id="contenido">')
    p.append(f'<p class="eyebrow">Examen oficial de francés</p>')
    p.append(f'<h1>{e["h1"]}</h1>')
    p.append(f'<p class="entradilla">{html.escape(e["entradilla"])}</p>')

    p.append('<dl class="ficha">'
             f'<div><dt>Nivel</dt><dd>{html.escape(e["sigla"].split()[-1])}'
             f'<small>en la escala del Marco Común Europeo</small></dd></div>'
             f'<div><dt>Horas orientativas</dt><dd>{html.escape(e["horas"])}'
             f'<small>{html.escape(e["horas_nota"])}</small></dd></div>'
             '<div><dt>Validez</dt><dd>De por vida<small>el diploma no caduca nunca</small></dd></div>'
             f'<div><dt>Qué acredita</dt><dd style="font-size:.9rem;line-height:1.6">'
             f'{html.escape(e["puede"])}</dd></div>'
             '</dl>')

    p.append("<h2>Qué evalúa el examen</h2>")
    if e["slug"] == "dalf-c2":
        p.append('<p>A diferencia del resto de la escala, el C2 no se divide en cuatro pruebas separadas '
                 'sino en dos bloques que combinan comprensión y producción.</p>'
                 '<div class="pruebas">'
                 '<div class="prueba"><h3>Bloque oral</h3><p>Escucha de un documento extenso, síntesis y '
                 'exposición argumentada, seguida de un debate con el jurado.</p></div>'
                 '<div class="prueba"><h3>Bloque escrito</h3><p>Lectura de un dossier y producción de un texto '
                 'estructurado y extenso a partir de él.</p></div>'
                 '</div>')
    else:
        p.append('<p>Cuatro pruebas independientes, una por competencia. Cada una vale 25 puntos y el examen se '
                 'aprueba con 50 sobre 100 en el conjunto, con un mínimo de 5 sobre 25 en cada prueba: se puede ir '
                 'flojo en una si las otras compensan, pero no se puede dejar ninguna en blanco.</p>'
                 '<div class="pruebas">'
                 '<div class="prueba"><h3>Comprensión oral</h3><p>Escucha de grabaciones y respuesta a preguntas '
                 'sobre lo que se ha entendido.</p></div>'
                 '<div class="prueba"><h3>Comprensión escrita</h3><p>Lectura de documentos y preguntas sobre su '
                 'contenido.</p></div>'
                 '<div class="prueba"><h3>Producción escrita</h3><p>Redacción de un texto adaptado al nivel y a la '
                 'situación planteada.</p></div>'
                 '<div class="prueba"><h3>Producción oral</h3><p>Intervención ante el examinador, con tiempo de '
                 'preparación previo.</p></div>'
                 '</div>')

    p.append("<h2>Para quién es</h2><ul class=\"lista\">"
             + "".join(f"<li>{html.escape(x)}</li>" for x in e["quien"]) + "</ul>")

    p.append("<h2>Cómo te preparo</h2><ul class=\"lista\">"
             + "".join(f"<li>{html.escape(x)}</li>" for x in e["preparo"]) + "</ul>")

    p.append('<div class="aviso"><strong>Yo te preparo; el examen lo aplica un centro acreditado.</strong> '
             'Estas pruebas solo se rinden en centros autorizados por el organismo que las emite, y ese organismo '
             'cambia según el país e incluso la ciudad. La inscripción y la aplicación se hacen siempre ante la '
             'institución oficial que corresponda a tu lugar de residencia; dime dónde vives y te oriento para '
             'identificarla y para planificar la preparación hacia esa fecha.</div>')

    p.append(bloque_faq(e["faq"]))
    p.append(hermanas(EXAMENES, e["slug"], "examenes", "Los demás exámenes"))
    p.append(bloque_cta("¿Preparamos tu " + e["sigla"] + "?",
                        "Cuéntame para cuándo lo necesitas y en qué punto estás. "
                        "La primera sesión de ubicación es sin costo y sin compromiso.", prof))
    p.append("</main>")
    p.append(json_ld(e["titulo"], e["meta"], canonico, e["faq"]))
    p.append(pie(prof))
    return "\n".join(p)


def pagina_publico(c):
    prof = "../"
    canonico = f"{BASE}/cursos/{c['slug']}.html"
    p = [cabecera(c["titulo"], c["meta"], canonico, prof)]
    p.append(f'<nav class="migas" aria-label="Migas de pan">'
             f'<a href="{prof}index.html">Inicio</a> / '
             f'<a href="{prof}index.html#modalidades">Cursos</a> / '
             f'{html.escape(c["sigla"])}</nav>')
    p.append('<main id="contenido">')
    p.append('<p class="eyebrow">Clases de francés</p>')
    p.append(f'<h1>{c["h1"]}</h1>')
    p.append(f'<p class="entradilla">{html.escape(c["entradilla"])}</p>')

    p.append('<dl class="ficha">' + "".join(
        f'<div><dt>{html.escape(t)}</dt><dd>{html.escape(v)}<small>{html.escape(n)}</small></dd></div>'
        for t, v, n in c["ficha"]) + '</dl>')

    p.append("<h2>Para quién es</h2><ul class=\"lista\">"
             + "".join(f"<li>{html.escape(x)}</li>" for x in c["quien"]) + "</ul>")
    p.append("<h2>Cómo trabajo</h2><ul class=\"lista\">"
             + "".join(f"<li>{html.escape(x)}</li>" for x in c["preparo"]) + "</ul>")
    p.append(bloque_faq(c["faq"]))
    p.append(hermanas(PUBLICOS, c["slug"], "cursos", "Otros públicos"))
    p.append(bloque_cta("¿Empezamos?",
                        "Escríbeme y definimos juntos el itinerario. "
                        "La primera sesión de ubicación es sin costo y sin compromiso.", prof))
    p.append("</main>")
    p.append(json_ld(c["titulo"], c["meta"], canonico, c["faq"]))
    p.append(pie(prof))
    return "\n".join(p)


def main():
    escritos = []
    for carpeta, items, fn in (("examenes", EXAMENES, pagina_examen),
                               ("cursos", PUBLICOS, pagina_publico)):
        destino = os.path.join(RAIZ, carpeta)
        os.makedirs(destino, exist_ok=True)
        for it in items:
            ruta = os.path.join(destino, it["slug"] + ".html")
            with open(ruta, "w", encoding="utf-8") as f:
                f.write(fn(it))
            escritos.append(os.path.relpath(ruta, RAIZ))

    # Mapa del sitio, para que el buscador encuentre las páginas nuevas
    urls = [f"{BASE}/", f"{BASE}/reglamento.html", f"{BASE}/pagos.html"]
    urls += [f"{BASE}/examenes/{e['slug']}.html" for e in EXAMENES]
    urls += [f"{BASE}/cursos/{c['slug']}.html" for c in PUBLICOS]
    mapa = ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            + "".join(f"  <url><loc>{u}</loc></url>\n" for u in urls)
            + "</urlset>\n")
    with open(os.path.join(RAIZ, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(mapa)
    escritos.append("sitemap.xml")

    for r in escritos:
        print("escrito:", r)
    print(f"\n{len(escritos)} archivos generados.")


if __name__ == "__main__":
    main()
