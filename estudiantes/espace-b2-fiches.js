/* ═══════════════════════════════════════════════════════════════════════
   EXERCICES COMPLÉMENTAIRES · B2 — CYCLE OCTOBRE-NOVEMBRE 2026
   ═══════════════════════════════════════════════════════════════════════
   El contenido de cada clase, en dos tiempos:

     1. «Révision autrement» — lo mismo que se trabajó en clase, pero
        por otro camino: lo que se clasificó se empareja, lo que se leyó
        se escucha, lo que se dijo se escribe.
     2. «Un pas plus loin» — ejercicios nuevos sobre el mismo contenido,
        algo más exigentes, con lo que no entró en el libro.

   No hay nombres de estudiantes en este archivo. Se publica con el sitio
   y lo puede abrir cualquiera.

   Tipos de ejercicio que entiende el motor (b2-oct2026.html):
     qcm     · opción múltiple          { q:[{enonce,o:[],r,note,audio}] }
     trous   · rellenar (___)           { q:[{enonce,r:'x'|['x','y'],note}] }
     tri     · clasificar en columnas   { cols:[], items:[['texto',col]] }
     paires  · emparejar                { pairs:[['izq','der']] }
     transfo · transformar con modelo   { q:[{enonce,modele,note}] }
     dictee  · escuchar y escribir      { q:[{texte}] }
     prod    · producción escrita       { mots, check:[], modele }
   ═══════════════════════════════════════════════════════════════════════ */

const FICHAS = [];

/* ───────────────────────────────────────────────────────────────────────
   UNITÉ 1 · p. 14-15 — FAUX PAS VESTIMENTAIRES
   El artículo de Manu, la crónica de la actividad 6, el léxico de la ropa,
   las expresiones con PIRE y las impresiones (ça fait, on dirait).
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'u1-p14',
  tipo: 'revision',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Unité 1 · p. 14-15',
  titulo: 'Faux pas vestimentaires',
  resumen: 'El artículo de Manu, el léxico de la ropa y cómo se lleva, las expresiones con «pire» y las impresiones: ça fait…, on dirait…',
  intro: 'Lo de las páginas 14 y 15, para repasarlo solo. El vocabulario de la ropa '
       + 'es el que después hace falta para describir un look sin dar rodeos.',

  secciones: [
    { titulo: '1. Le vêtement et la façon de le porter',
      sous: 'Los dos recuadros de las páginas 14 y 15, que son los que hay que saberse.',
      rappels: [
        { titulo: 'Les pièces et les détails',
          html: `<ul>
            <li><b>les boutons</b> · <b>la ceinture</b> · <b>le col</b> ·
                <b>le débardeur</b> · <b>les manches</b> · <b>les poches</b> ·
                <b>le décolleté</b></li>
            <li><b>Le style :</b> serré / moulant ≠ large · petit / long / sombre ·
                (pas) à ma taille · bien assorti ≠ mal assorti · la bonne longueur.</li>
            <li><b>Porter un vêtement :</b> la chemise <b>rentrée</b> dans le pantalon ·
                boutonnée / <b>déboutonnée</b> / ouverte · porter un <b>décolleté</b> ·
                jusqu’au <b>nombril</b> · autour de la <b>taille</b> ·
                sur les <b>épaules</b> · au-dessus ≠ au-dessous du <b>genou</b>.</li>
          </ul>
<div class="esquema">
          <svg viewBox="-60 0 520 300" role="img" aria-label="Esquema de una camisa con las partes señaladas">
            <!-- cuerpo -->
            <path d="M150 60 L150 260 L290 260 L290 60 Z" class="tela"/>
            <!-- mangas -->
            <path d="M150 60 L100 90 L120 170 L150 150 Z" class="tela"/>
            <path d="M290 60 L340 90 L320 170 L290 150 Z" class="tela"/>
            <!-- cuello -->
            <path d="M150 60 L220 100 L290 60 L255 45 L220 70 L185 45 Z" class="cuello"/>
            <!-- botonadura -->
            <line x1="220" y1="100" x2="220" y2="260" class="linea"/>
            <circle cx="220" cy="128" r="5" class="boton"/>
            <circle cx="220" cy="164" r="5" class="boton"/>
            <circle cx="220" cy="200" r="5" class="boton"/>
            <!-- bolsillo -->
            <rect x="172" y="120" width="34" height="30" rx="3" class="detalle"/>
            <!-- cinturón -->
            <rect x="150" y="248" width="140" height="14" class="cinturon"/>
            <!-- líneas guía -->
            <line x1="220" y1="52" x2="220" y2="22" class="guia"/>
            <line x1="112" y1="130" x2="60" y2="130" class="guia"/>
            <line x1="228" y1="164" x2="300" y2="196" class="guia"/>
            <line x1="172" y1="135" x2="96" y2="196" class="guia"/>
            <line x1="290" y1="255" x2="360" y2="255" class="guia"/>
            <!-- etiquetas -->
            <text x="220" y="16" text-anchor="middle">le col</text>
            <text x="54"  y="134" text-anchor="end">les manches</text>
            <text x="304" y="200">les boutons</text>
            <text x="92"  y="200" text-anchor="end">la poche</text>
            <text x="364" y="259">la ceinture</text>
          </svg>
          <p class="pie-esquema">Y debajo, el <b>débardeur</b> — el que, según Manu, hace
          <i>grand-père</i>. El <b>décolleté</b> es la abertura sobre el pecho ; el
          <b>nombril</b>, hasta donde se abre la camisa del artículo.</p>
        </div>
          <div class="piege"><b>El acuerdo es la mitad del ejercicio 6b :</b>
          <i>le jean trop moulant</i> pero <i>une chemise trop moulant<b>e</b></i> ;
          <i>les manches retrouss<b>ées</b></i>, <i>les polos ni trop long<b>s</b> ni trop court<b>s</b></i>.</div>` },
        { titulo: 'Exprimer une impression',
          html: `<ul>
            <li><b>Ça fait</b> + nom o adjetivo : <i>ça fait rappeur · ça fait vieux ·
                ça fait ringard · ça fait années 80 · ça fait classe · ça fait bourgeois.</i></li>
            <li><b>On dirait</b> + nombre : <i>on dirait un ministre · on dirait un clown.</i></li>
            <li><b>Ressembler à</b> + nombre : <i>tu ressembles à un rappeur adolescent.</i></li>
            <li><b>Avoir l’air de / d’un</b> : <i>vous avez l’air d’un clown.</i></li>
          </ul>
          <div class="ex">Y las tres del artículo para juzgar sin insultar :
          <i>ça peut mettre mal à l’aise · ça ne fait pas assez décontracté ·
          ça ne va à personne.</i></div>` }
      ],
      ejercicios: [0, 1, 2]
    },
    { titulo: '2. Les expressions avec pire',
      sous: 'El recuadro de la página 15. Son cuatro y entran en la evaluación.',
      rappels: [
        { titulo: 'Pire',
          html: `<p><b>Pire</b> es el comparativo irregular de <i>mauvais</i> :
          más malo, peor. No se dice « <s>plus mauvais</s> » en este sentido.</p>
          <ul>
            <li><b>C’est la pire erreur du monde.</b> <i>(la peor de todas)</i></li>
            <li><b>Il n’y a rien de pire que de</b> + infinitivo :
                <i>il n’y a rien de pire que de porter des chaussettes dans des sandales.</i></li>
            <li><b>Le pire, c’est de</b> + infinitivo : <i>le pire, c’est de l’imiter.</i></li>
            <li><b>Le pire, c’est que</b> + frase : <i>le pire, c’est que personne ne lui dit rien.</i></li>
          </ul>` }
      ],
      ejercicios: [3, 4]
    },
    { titulo: '3. L’article et la chronique',
      sous: 'Lo que dicen Manu y la cronista, y tu propio look.',
      rappels: [],
      ejercicios: [5, 6]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'paires', etiqueta:'Lexique',
      consigne:'Cada palabra con lo que designa.',
      pairs: [
        ['le col', 'la partie du vêtement qui entoure le cou'],
        ['les manches', 'les parties qui couvrent les bras'],
        ['la ceinture', 'la bande qui tient le pantalon à la taille'],
        ['les boutons', 'ce qu’on ouvre et ferme sur une chemise'],
        ['le débardeur', 'le maillot sans manches qu’on met dessous'],
        ['les poches', 'ce dans quoi on met ses clés'],
        ['le décolleté', 'l’ouverture du vêtement sur la poitrine'],
        ['le pantacourt', 'le pantalon qui s’arrête au mollet'],
        ['le nombril', 'le milieu du ventre — jusqu’où s’ouvre la chemise de l’article']
      ] },

    /* 1 */ { t:'tri', etiqueta:'Ça fait…',
      consigne:'Según el artículo de Manu, ¿qué impresión da cada cosa ?',
      cols: ['Ça fait rappeur', 'Ça fait clown', 'Ça fait grand-père', 'Ça fait bourgeois'],
      items: [
        ['un tee-shirt XXL', 0],
        ['un baggy', 0],
        ['un pantacourt', 1],
        ['ni court ni long', 1],
        ['un débardeur blanc sous la chemise', 2],
        ['un pull sur les épaules', 3]
      ],
      aide:'Es exactamente la actividad 5b de la página 14. Manu no dice que esté prohibido : '
         + 'dice la <b>impresión</b> que da, que es otra cosa.' },

    /* 2 */ { t:'qcm', etiqueta:'Exprimer une impression',
      consigne:'La construcción correcta. Es lo que más se confunde.',
      q: [
        { enonce:'___ un ministre, avec ce costume !',
          o:['Ça fait', 'On dirait', 'Il ressemble'], r:1,
          note:'<b>On dirait</b> + nombre. <i>Ça fait</i> iría sin artículo : « ça fait ministre ».' },
        { enonce:'Avec ce baggy, tu ressembles ___ rappeur adolescent.',
          o:['à un', 'd’un', 'comme un'], r:0,
          note:'<b>ressembler à</b> quelqu’un.' },
        { enonce:'Vous avez l’air ___ clown.',
          o:['à un', 'd’un', 'comme un'], r:1,
          note:'<b>avoir l’air de</b> → <i>d’un clown</i>.' },
        { enonce:'Ce jean trop serré, ça ___ années 80.',
          o:['fait', 'dirait', 'ressemble'], r:0 },
        { enonce:'Le col relevé, ça ne fait pas assez ___.',
          o:['décontracté', 'décontractée', 'de décontracté'], r:0,
          note:'Tras <b>ça fait</b>, el adjetivo queda en masculino singular : es impersonal.' },
        { enonce:'Tous les boutons ouverts, ça peut ___.',
          o:['mettre mal à l’aise', 'mettre mal à l’aise les autres clients', 'faire mal à l’aise'],
          r:0, note:'Las dos primeras son correctas ; la tercera no existe. Aquí la más corta '
                  + 'es la del artículo.' }
      ] },

    /* 3 */ { t:'trous', etiqueta:'Pire',
      consigne:'Completa con las expresiones del recuadro.',
      q: [
        { enonce:'Les chaussettes dans les sandales, c’est la ___ erreur du monde.',
          r:['pire'], taille:10 },
        { enonce:'Il n’y a rien de ___ que de porter un tee-shirt publicitaire.',
          r:['pire'], taille:10 },
        { enonce:'Le ___, c’est que personne n’ose le lui dire.',
          r:['pire'], taille:10,
          note:'<b>Le pire, c’est que</b> + frase. Si sigue un infinitivo : <i>le pire, c’est de…</i>' },
        { enonce:'Cette veste est encore ___ que l’autre.',
          r:['pire','plus moche'], taille:12,
          note:'<b>Pire</b> es el comparativo de <i>mauvais</i> : nunca « plus mauvais » aquí.' }
      ] },

    /* 4 */ { t:'paires', etiqueta:'Reconstituer (act. 6b)',
      consigne:'Cada prenda con la expresión que usó la cronista. Cuidado con el acuerdo.',
      pairs: [
        ['les polos et tee-shirts…', 'ni trop longs ni trop courts'],
        ['le jean…', 'trop moulant'],
        ['le col…', 'déboutonné'],
        ['la chemise…', 'ouverte jusqu’au nombril'],
        ['les manches…', 'retroussées'],
        ['le décolleté…', 'plongeant']
      ],
      aide:'Fíjate en las terminaciones : <i>les manches retrouss<b>ées</b></i> (femenino plural), '
         + '<i>le col déboutonn<b>é</b></i> (masculino singular). El acuerdo es lo que pide la actividad.' },

    /* 5 */ { t:'qcm', etiqueta:'L’article',
      consigne:'Cuatro preguntas sobre « Fashion faux pas ! ».',
      q: [
        { enonce:'Selon Manu, quelle est la pire erreur — et la plus répandue ?',
          o:['le tee-shirt à message', 'les chaussettes dans les sandales', 'le pantacourt'], r:1 },
        { enonce:'Que reproche-t-il au tee-shirt publicitaire ?',
          o:['c’est une insulte au bon goût', 'ça fait trop cher', 'ça ne va à personne'], r:0 },
        { enonce:'Pour la chemise, que conseille-t-il ?',
          o:['tous les boutons ouverts et le col relevé',
             'unie, rentrée dans le pantalon, cintrée et avec une ceinture',
             'avec un pull sur les épaules'], r:1 },
        { enonce:'Choisir des vêtements à sa taille, pour lui, c’est…',
          o:['la base', 'une question de prix', 'démodé'], r:0,
          note:'« Ça devrait être la base, non ? » — y es la misma expresión de la '
             + 'actividad 22, página 19.' },
        { enonce:'À la fin, qu’est-ce qui compte selon lui ?',
          o:['la beauté intérieure', 'la première impression', 'les réseaux sociaux'], r:1,
          note:'En la actividad 9 te preguntan justamente con cuál de las dos estás de acuerdo.' }
      ] },

    /* 6 */ { t:'prod', etiqueta:'Production écrite', mots:90,
      consigne:'Décris un look que tu aimes bien — le tien ou celui de quelqu’un d’autre. '
             + '(Actividad 7)',
      sous:'90 palabras, con el vocabulario de los dos recuadros. Nada de « c’est beau ».',
      check: [
        'Tres prendas con su detalle (le col, les manches, la ceinture…).',
        'Dos palabras del estilo (moulant, large, assorti, la bonne longueur…).',
        'Una impresión con <b>ça fait</b> y otra con <b>on dirait</b>.',
        'Una expresión con <b>pire</b>, para lo que no te gusta.',
        'Tu posición sobre una de las frases de la actividad 9.'
      ],
      modele:'J’aime bien le look de mon cousin : une chemise unie de couleur sombre, '
           + 'rentrée dans le pantalon, avec les manches retroussées et une ceinture fine. '
           + 'Rien n’est trop moulant ni trop large : tout est à sa taille, et c’est bien '
           + 'assorti. Ça fait soigné sans faire bourgeois. Ce que je ne supporte pas, en '
           + 'revanche, ce sont les tee-shirts à message : il n’y a rien de pire que de '
           + 'vouloir faire drôle avec une blague écrite sur le ventre — on dirait un panneau '
           + 'publicitaire. Pour moi, c’est la première impression qui compte, même si la '
           + 'beauté intérieure compte aussi.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   UNITÉ 1 · p. 16-17 — C’EST PLUTÔT JOLI
   El artículo del «bon mauvais goût», definir conceptos, atenuar o
   exagerar, y el adverbio plutôt.
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'u1-p16',
  tipo: 'revision',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Unité 1 · p. 16-17',
  titulo: 'C’est plutôt joli — le « bon mauvais goût »',
  resumen: 'El artículo de Bourdieu y el «bon mauvais goût», definir un concepto, atenuar o exagerar lo que se dice, y plutôt.',
  intro: 'La parte más de fondo de la unidad: de dónde vienen los gustos, y cómo se dice '
       + 'lo que uno piensa sin pasarse — o pasándose a propósito.',

  secciones: [
    { titulo: '1. L’article',
      sous: '« Pour le bon mauvais goût », y por qué el gusto no es solo cosa de cada quien.',
      rappels: [
        { titulo: 'Relativiser',
          html: `<p>Dos fórmulas cortas que lo cambian todo en un debate :</p>
          <div class="ex"><b>C’est relatif.</b> · <b>C’est subjectif.</b></div>
          <p>Sirven para no cerrar la discusión y para matizar lo que acabas de decir.</p>` }
      ],
      ejercicios: [0]
    },
    { titulo: '2. Définir un concept',
      sous: 'La actividad 13: tres maneras de definir, y no son intercambiables.',
      rappels: [
        { titulo: 'Les trois structures',
          html: `<ul>
            <li><b>C’est quand…</b> + frase → se define una <b>situación</b>.
                <i>Le kitsch, c’est quand on accumule des objets voyants.</i></li>
            <li><b>C’est ce qui / ce que…</b> → se define por <b>lo que hace o lo que se le hace</b>.
                <i>La beauté, c’est ce que tout le monde aime.</i> ·
                <i>Le style rétro, c’est ce qui s’inspire d’une autre époque.</i></li>
            <li><b>C’est une question de…</b> + nombre → se define por su <b>criterio</b>.
                <i>La politesse, c’est une question d’éducation.</i></li>
          </ul>
          <div class="piege"><b>ce qui</b> cuando le sigue un verbo sin sujeto
          (<i>ce qui <u>plaît</u></i>) ; <b>ce que</b> cuando le sigue un sujeto
          (<i>ce que <u>tout le monde</u> aime</i>). Es la misma regla de la página 23.</div>` }
      ],
      ejercicios: [1, 2]
    },
    { titulo: '3. Atténuer ou exagérer',
      sous: 'La actividad 14c. Saber en qué lado está cada frase es media nota del oral.',
      rappels: [
        { titulo: 'Les deux registres du jugement',
          html: `<ul>
            <li><b>Atténuer</b> — se dice menos de lo que se piensa, por cortesía :
                <i>c’est d’un goût douteux · ce n’est pas très heureux · c’est un style… ·
                faut aimer… · pourquoi pas ?</i></li>
            <li><b>Exagérer</b> — se dice más, por efecto :
                <i>ça pique les yeux · c’est mochissime <span class="note">(familier)</span> ·
                c’est la pire erreur du monde · c’est d’une laideur ! ·
                on se croirait dans un cimetière.</i></li>
          </ul>
          <div class="ex">Y del lado del entusiasmo, lo mismo : <i>c’est joli</i> (neutro) ·
          <i>ça fait classe</i> · <i>ça en jette !</i>, <i>ça pète !</i>,
          <i>je kiffe !</i>, <i>c’est trop stylé !</i> (familiares).</div>` }
      ],
      ejercicios: [3, 4]
    },
    { titulo: '4. Plutôt',
      sous: 'Un adverbio con cuatro usos distintos, y los cuatro caen en el examen.',
      rappels: [
        { titulo: 'Les quatre emplois',
          html: `<ol>
            <li><b>Preferencia</b> — <i>plutôt que</i> + nombre o verbo :
                <i>On préférait le fastfood plutôt qu’un bon restau.</i></li>
            <li><b>Sugerencia</b> — al final de la frase :
                <i>Des fleurs en plastique ? Tu veux pas mettre des cactus, plutôt ?</i></li>
            <li><b>Precisión o corrección</b> — <i>ou plutôt</i> :
                <i>Il n’a aucun goût. Ou plutôt, il a des idées d’un goût douteux.</i></li>
            <li><b>= assez</b>, delante de adjetivo o adverbio :
                <i>Je trouve son appartement plutôt joli.</i></li>
          </ol>
          <div class="piege">Delante de infinitivo se añade <b>de</b> :
          <i>Plutôt mourir que <b>de</b> mettre une cravate !</i></div>` }
      ],
      ejercicios: [5, 6]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'qcm', etiqueta:'Compréhension',
      consigne:'Cinco preguntas sobre el artículo.',
      q: [
        { enonce:'Selon Bourdieu, nos goûts sont déterminés par…',
          o:['notre caractère', 'notre position sociale', 'notre âge'], r:1,
          note:'Las clases dominantes dictan lo que se considera « de bon goût », y '
             + 'reproducimos esa jerarquía sin darnos cuenta.' },
        { enonce:'De quoi l’auteur dit-il qu’il ne faut pas se laisser paralyser ?',
          o:['de la peur du faux pas', 'du prix des objets', 'de la mode'], r:0 },
        { enonce:'Le « bon mauvais goût », selon lui, c’est…',
          o:['ce qui est cher et rare',
             'ce qui est inattendu, vivant, et qui a une âme humaine',
             'ce que recommandent les magazines'], r:1,
          note:'Sus ejemplos : los dibujos de tus hijos enmarcados, el sillón de la abuela, '
             + 'un cartel viejo encontrado en la calle.' },
        { enonce:'Que reproche-t-il aux logements « dignes des magazines » ?',
          o:['ils donnent une impression d’absence de vie',
             'ils coûtent trop cher', 'ils sont trop petits'], r:0 },
        { enonce:'Sa conclusion :',
          o:['il faut copier les modèles dominants pour avoir bon goût',
             'il vaut mieux avoir conscience de ses goûts et les accepter',
             'le goût ne s’apprend pas'], r:1 }
      ] },

    /* 1 */ { t:'trous', etiqueta:'Définir',
      consigne:'Completa con c’est quand, c’est ce qui, c’est ce que o c’est une question de.',
      q: [
        { enonce:'Le kitsch, ___ on accumule des objets voyants et un peu ridicules.',
          r:['c’est quand',"c'est quand"], taille:20 },
        { enonce:'La beauté, ___ tout le monde aime.',
          r:['c’est ce que',"c'est ce que"], taille:20,
          note:'Detrás viene un sujeto (<i>tout le monde</i>) → <b>ce que</b>.' },
        { enonce:'Le style rétro, ___ s’inspire d’une autre époque.',
          r:['c’est ce qui',"c'est ce qui"], taille:20,
          note:'Detrás viene directamente el verbo → <b>ce qui</b>.' },
        { enonce:'La politesse, ___ éducation.',
          r:['c’est une question d’',"c'est une question d'",'c’est une question de'], taille:22 },
        { enonce:'Le bling-bling, ___ on montre sa richesse sans aucune discrétion.',
          r:['c’est quand',"c'est quand"], taille:20 },
        { enonce:'Le style ringard, ___ était à la mode il y a vingt ans.',
          r:['c’est ce qui',"c'est ce qui"], taille:20 }
      ] },

    /* 2 */ { t:'prod', etiqueta:'À ta façon', mots:60,
      consigne:'Define tres de estos conceptos con tus palabras: la laideur, le kitsch, '
             + 'le bling-bling, le style ringard, l’impolitesse.',
      sous:'60 palabras. Usa una estructura distinta en cada definición.',
      check: [
        'Una definición con <b>c’est quand</b>.',
        'Una con <b>c’est ce qui</b> o <b>c’est ce que</b>.',
        'Una con <b>c’est une question de</b>.',
        'Un ejemplo concreto en cada una.'
      ],
      modele:'Le kitsch, c’est quand on accumule des objets voyants qui ne vont pas ensemble : '
           + 'un flamant rose en plastique à côté d’un nain de jardin. Le style ringard, c’est ce '
           + 'qui était à la mode il y a vingt ans et qui ne l’est pas encore redevenu — les '
           + 'lunettes de mon oncle, par exemple. L’impolitesse, c’est une question de contexte : '
           + 'ce qui choque ici ne choque pas forcément ailleurs.' },

    /* 3 */ { t:'tri', etiqueta:'Act. 14c',
      consigne:'¿Esta frase exagera o atenúa lo que se piensa ?',
      cols: ['Ça exagère (E)', 'Ça atténue (A)'],
      items: [
        ['Ça pique les yeux !', 0],
        ['C’est mochissime.', 0],
        ['Ça sort de l’ordinaire !', 0],
        ['On se croirait dans un cimetière.', 0],
        ['C’est d’un goût douteux.', 1],
        ['C’est pas très heureux.', 1],
        ['Ça fait plutôt classe !', 1]
      ],
      aide:'Las que atenúan suelen llevar una marca : <b>pas très</b>, <b>douteux</b>, '
         + '<b>plutôt</b>. Las que exageran usan superlativos, imágenes o el sufijo familiar '
         + '<b>-issime</b> (<i>mochissime</i>, de <i>moche</i>).' },

    /* 4 */ { t:'tri', etiqueta:'Dire qu’on n’aime pas',
      consigne:'¿Lo dice con educación o lo dice abiertamente ?',
      cols: ['Poliment', 'Ouvertement'],
      items: [
        ['Ce n’est pas très heureux.', 0],
        ['C’est d’un goût douteux.', 0],
        ['C’est un style…', 0],
        ['Pourquoi pas ?', 0],
        ['Faut aimer…', 0],
        ['C’est horrible !', 1],
        ['C’est la pire erreur du monde.', 1],
        ['C’est une insulte au bon goût !', 1],
        ['C’est d’une vulgarité sans nom !', 1]
      ],
      aide:'Las de la izquierda son las que puedes usar delante de la persona. Las de la '
         + 'derecha, no — salvo que quieras justo ese efecto.' },

    /* 5 */ { t:'qcm', etiqueta:'Plutôt',
      consigne:'¿Qué hace « plutôt » en cada frase ?',
      q: [
        { enonce:'« Je n’ai pas peur de le dire, ou plutôt j’ose le dire. »',
          o:['une préférence', 'une précision, une correction', 'il veut dire « assez »'],
          r:1, note:'<b>ou plutôt</b> corrige lo que se acaba de decir.' },
        { enonce:'« Je trouve son appartement plutôt amusant. »',
          o:['une préférence', 'une correction', 'il veut dire « assez »'], r:2,
          note:'Delante de adjetivo, <b>plutôt</b> = <i>assez</i>.' },
        { enonce:'« Je préfère vivre dans un bazar plutôt que dans un catalogue. »',
          o:['une préférence', 'une correction', 'il veut dire « assez »'], r:0 },
        { enonce:'« Tu veux pas mettre des cactus, plutôt ? »',
          o:['une suggestion', 'une correction', 'il veut dire « assez »'], r:0,
          note:'Al final de la frase, propone otra cosa.' },
        { enonce:'« Plutôt mourir ___ mettre une cravate ! »',
          o:['que', 'que de', 'de'], r:1,
          note:'Delante de infinitivo, <b>plutôt que de</b>. También se oye sin « de », '
             + 'pero con él es lo correcto.' }
      ] },

    /* 6 */ { t:'prod', etiqueta:'Ce qui se fait', mots:90,
      consigne:'Da ejemplos, en decoración o en ropa, de ce qui ne se fait pas, ce qui se fait, '
             + 'y ce qui te plaît personnellement, aunque no se lleve. (Actividad 11)',
      sous:'90 palabras. Y una frase para relativizar, que para eso están.',
      check: [
        'Dos ejemplos de <b>ce qui ne se fait pas</b>.',
        'Dos de <b>ce qui se fait</b>.',
        'Uno de <b>ce qui te plaît</b> aunque no se lleve, con el porqué.',
        'Una frase que atenúe y otra que exagere.',
        'Un <b>c’est relatif</b> o <b>c’est subjectif</b> para cerrar.'
      ],
      modele:'En décoration, ce qui ne se fait pas, chez moi, c’est de peindre les murs en '
           + 'noir, ni de mettre des fleurs en plastique : ça pique les yeux. Ce qui se '
           + 'fait, c’est le blanc partout et les meubles clairs, comme dans les magazines — '
           + 'c’est joli, mais on se croirait parfois dans un catalogue. Ce qui me plaît '
           + 'personnellement, ce sont les affiches un peu anciennes que ma mère a gardées : '
           + 'ce n’est pas très à la mode, disons que c’est d’un goût douteux pour certains, '
           + 'mais ça raconte quelque chose. Après, tout ça est subjectif.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   PARCOURS · Ça se fait, ça ne se fait pas — ici et là-bas
   Vidéo : Mcfly et Carlito avec Carmel, « On apprend les bonnes manières
   à table » · Livre p. 19 (act. 18 à 24)
   ---------------------------------------------------------------------
   El eje es el de la página 19: las expresiones para juzgar una manera
   (« ça ne se fait pas », « c’est la base »), lo que se hace y lo que no, y
   la comparación entre México y Francia. Lo gramatical se queda en lo que
   el libro pide ahí: « plus… plus » y las expresiones con valoir.
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'savoir-vivre',
  tipo: 'outil',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Parcours · livre p. 19',
  titulo: 'Ça se fait, ça ne se fait pas — à table, ici et là-bas',
  resumen: 'Las expresiones de la actividad 22, lo que se hace y lo que no en la mesa francesa, y la comparación con México. Con el vídeo dentro.',
  intro: 'Lo que estamos trabajando, para practicarlo solo: cómo se juzga una manera en '
       + 'francés, qué se hace y qué no en una mesa francesa, y en qué se parece o se '
       + 'diferencia de lo de aquí. El vídeo está dentro: cada pregunta salta a su minuto.',

  video: {
    id: 'sWtjnwMbEVU',
    titulo: 'Mcfly et Carlito avec Carmel — « On apprend les bonnes manières à table » (35 min)'
  },

  secciones: [
    { titulo: '1. Les mots pour juger une manière',
      sous: 'Las expresiones de la actividad 22. Son las que necesitas para opinar sin repetir «c’est mal».',
      rappels: [
        { titulo: 'La boîte à expressions (act. 22)',
          html: `<ul>
            <li><b>Ça ne se fait pas.</b> — la regla social, sin más explicación.</li>
            <li><b>C’est la base.</b> — es lo mínimo, lo elemental.</li>
            <li><b>Ça s’apprend.</b> — no se nace sabiéndolo.</li>
            <li><b>Ça donne une mauvaise première impression.</b> — la consecuencia.</li>
            <li><b>Ça met mal à l’aise.</b> — el efecto en los demás.</li>
            <li><b>C’est gênant.</b> / <b>C’est vexant.</b> — incómodo / hiriente.</li>
            <li><b>Ça fait vulgaire</b> / <b>mauvais genre.</b> — el juicio estético.</li>
            <li><b>C’est n’importe quoi.</b> — familiar, muy fuerte.</li>
          </ul>
          <div class="ex">El ejemplo del libro: <i>« Mettre le couteau dans la bouche, ça ne se
          fait pas. Ça me choque ! »</i></div>
          <div class="piege">Dos que no son lo mismo: <b>gênant</b> incomoda a todos
          (un silencio, un ruido); <b>vexant</b> hiere a alguien en concreto.</div>` }
      ],
      ejercicios: [0, 1]
    },

    { titulo: '2. À table : ça se fait ou pas ?',
      sous: 'Primero en Francia. Después, lo de aquí, que es lo que más vale la pena comparar.',
      rappels: [],
      ejercicios: [2, 3, 4]
    },

    { titulo: '3. La vidéo',
      sous: 'Seis preguntas, nada más. No hace falta entender cada palabra.',
      rappels: [
        { titulo: 'Avant de regarder',
          html: `<p>Tres personas hablan deprisa y se interrumpen: es normal perderse.
          Escucha las <b>ideas</b> y los <b>ejemplos</b>, no las palabras.</p>
          <div class="ex">Carmel es la invitada, experta en <i>savoir-vivre</i>;
          Mcfly y Carlito son los dos vidéastes que preguntan.</div>` }
      ],
      ejercicios: [5, 6]
    },

    { titulo: '4. Plus… plus, et les expressions avec valoir',
      sous: 'Lo de las actividades 19 y 20, que es la gramática que toca aquí.',
      rappels: [
        { titulo: 'Plus… plus · moins… moins (act. 19)',
          html: `<p>Dos mitades, y el verbo va en cada una:</p>
          <div class="ex"><b>Plus</b> je vieillis, <b>plus</b> je tiens à ces règles.<br>
          <b>Plus</b> il y a d’objets dans un salon, <b>moins</b> la pièce paraît grande.<br>
          <b>Moins</b> on connaît les codes, <b>plus</b> on a peur de se tromper.</div>
          <div class="piege">Delante de un nombre hace falta <b>de</b>:
          <i>plus <b>de</b> monde</i>, <i>moins <b>d’</b>objets</i>.</div>` },
        { titulo: 'Valoir (act. 20)',
          html: `<ul>
            <li><b>Il vaut mieux</b> + infinitivo = es preferible. <i>Il vaut mieux éviter.</i></li>
            <li><b>Mieux vaut</b> + infinitivo = lo mismo, más corto y más escrito.</li>
            <li><b>Ça vaut la peine</b> / <b>le coup</b> = merece el esfuerzo.</li>
          </ul>
          <div class="ex"><b>Los dos proverbios del margen:</b><br>
          « Un homme averti en vaut deux » — el que está avisado vale por dos.<br>
          « Deux précautions valent mieux qu’une » — más vale prevenir dos veces.</div>` }
      ],
      ejercicios: [7, 8, 9]
    },

    { titulo: '5. La nétiquette',
      sous: 'La buena educación, pero en línea (act. 23 y 24).',
      rappels: [
        { titulo: 'De la table à l’écran',
          html: `<p>La <b>nétiquette</b> es la etiqueta de internet: las reglas no escritas
          del correo, del chat y de la videollamada. Cambian el soporte, pero no la idea:
          <b>no incomodar al otro</b>.</p>` }
      ],
      ejercicios: [10, 11]
    },

    { titulo: '6. À toi',
      sous: 'Lo contrastivo, por escrito. Es lo que vamos a comentar en clase.',
      rappels: [],
      ejercicios: [12]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'paires', etiqueta:'Les expressions',
      consigne:'Cada expresión con lo que quiere decir de verdad.',
      pairs: [
        ['Ça ne se fait pas.', 'C’est contraire aux usages'],
        ['C’est la base.', 'C’est le minimum, l’élémentaire'],
        ['Ça s’apprend.', 'Personne ne naît en le sachant'],
        ['Ça donne une mauvaise première impression.', 'Les autres se font tout de suite une idée fausse de toi'],
        ['Ça met mal à l’aise.', 'Les autres ne savent plus où se mettre'],
        ['C’est vexant.', 'Ça blesse la personne à qui on le fait'],
        ['Ça fait vulgaire.', 'C’est inélégant, mauvais genre'],
        ['C’est n’importe quoi.', 'Familier et très fort : ça n’a aucun sens']
      ] },

    /* 1 */ { t:'qcm', etiqueta:'La bonne expression',
      consigne:'¿Qué dirías en cada situación? Hay una que encaja mejor que las otras.',
      q: [
        { enonce:'Quelqu’un met son couteau dans la bouche.',
          o:['Ça ne se fait pas.', 'C’est vexant.', 'Ça s’apprend.'], r:0,
          note:'Es el ejemplo del libro. <b>Vexant</b> no: no hiere a nadie, simplemente no se hace.' },
        { enonce:'Un ami arrive à un entretien avec un t-shirt taché.',
          o:['C’est n’importe quoi.', 'Ça donne une mauvaise première impression.', 'C’est la base.'], r:1,
          note:'Aquí lo que importa es la <b>consecuencia</b>: lo que el otro va a pensar.' },
        { enonce:'Quelqu’un te reprend devant tout le monde à table.',
          o:['Ça fait vulgaire.', 'C’est vexant et ça met mal à l’aise.', 'Ça s’apprend.'], r:1,
          note:'Y es justo lo que Carmel llama la regla número uno: no señalar al otro.' },
        { enonce:'Dire bonjour en entrant, pour toi, c’est évident.',
          o:['C’est la base.', 'C’est gênant.', 'Ça ne se fait pas.'], r:0 },
        { enonce:'Alguien dice: « yo no tengo por qué saber esas reglas, nadie me las enseñó ».',
          o:['Ça fait vulgaire.', 'Justement : ça s’apprend.', 'C’est la base.'], r:1,
          note:'<b>Ça s’apprend</b> es la respuesta amable: no es un defecto, es algo que se aprende.' }
      ] },

    /* 2 */ { t:'tri', etiqueta:'En France',
      consigne:'Según las reglas clásicas francesas: ¿se hace o no se hace?',
      cols: ['Ça se fait', 'Ça ne se fait pas'],
      items: [
        ['garder les poignets sur la table', 0],
        ['poser son pain sur la nappe, à gauche de l’assiette', 0],
        ['rompre le pain avec les doigts', 0],
        ['poser sa serviette froissée à côté de l’assiette à la fin', 0],
        ['mettre les coudes sur la table', 1],
        ['couper son pain avec un couteau', 1],
        ['mettre son couteau dans la bouche', 1],
        ['lever le petit doigt en buvant', 1],
        ['replier soigneusement sa serviette à la fin', 1]
      ],
      aide:'Dos que sorprenden: las <b>manos</b> se quedan a la vista (viene de cuando había que '
         + 'demostrar que no se escondía nada), y la <b>servilleta</b> no se vuelve a doblar — '
         + 'doblarla significaría que uno cuenta con volver a comer ahí.' },

    /* 3 */ { t:'qcm', etiqueta:'Et toi, tu fais comment ?',
      consigne:'Situaciones concretas. Elige lo que harías y mira después lo que dice Carmel.',
      q: [
        { enonce:'À l’apéritif, on te sert des crevettes entières. Tu les décortiques…',
          min:'7:09',
          o:['avec les doigts', 'à la fourchette et au couteau', 'tu n’y touches pas'], r:0,
          note:'<b>Con los dedos</b>, y no pasa nada: en el aperitivo está perfectamente admitido '
             + '[09:22]. En un plato servido en la mesa, en cambio, se hace con cubiertos: '
             + 'cabeza, cola, patas, y por último el caparazón [08:49]. Las dos están bien — '
             + 'lo que cambia es el momento.' },
        { enonce:'Il reste de la sauce dans ton assiette. Tu…', min:'22:24',
          o:['prends un morceau de pain dans la main et tu sauces',
             'piques un petit morceau de pain au bout de ta fourchette',
             'laisses la sauce'], r:1,
          note:'Con el pan <b>en la mano</b> no; con el pan <b>en el tenedor</b> sí, discretamente '
             + '[24:07]. Es el término medio francés.' },
        { enonce:'Tu manges une soupe très chaude. Tu…', min:'11:51',
          o:['penches le buste vers l’assiette', 'souffles dessus',
             'prends la soupe sur le bord de l’assiette, où elle est moins chaude'], r:2,
          note:'Y la espalda recta: es la cuchara la que sube a la boca [12:02].' },
        { enonce:'Des spaghettis. Tu les enroules…', min:'25:16',
          o:['avec une cuillère', 'avec la fourchette seulement, peu à la fois',
             'tu les coupes au couteau'], r:1,
          note:'La cuchara está muy extendida, pero no forma parte de los códigos.' },
        { enonce:'L’hôte te sert un plat que tu n’aimes pas. Tu…',
          o:['dis que tu n’aimes pas', 'en prends un peu, pour goûter',
             'refuses sans explication'], r:1,
          note:'La cantidad es la forma educada de decir que no. Y conecta con la regla número uno.' },
        { enonce:'Quelqu’un à table ne connaît pas une règle et se trompe. Tu…',
          min:'13:26',
          o:['le corriges tout de suite', 'ne dis rien', 'en parles après le repas, devant tout le monde'],
          r:1, note:'La regla número uno de Carmel: <b>nunca</b> hacer sentir mal al otro ni '
                  + 'mostrarle que se equivoca [14:15]. La anécdota de la reina y el rince-doigts '
                  + 'lo dice todo [13:48].' }
      ] },

    /* 4 */ { t:'prod', etiqueta:'Contraste', mots:80,
      consigne:'Y en México, ¿qué pasa con esas mismas cosas?',
      sous:'80 palabras. Nadie mejor que tú para decirlo: aquí no hay respuesta correcta.',
      check: [
        'Tres cosas que <b>se hacen</b> aquí y que en Francia <b>no se hacen</b> (o al revés).',
        'Una que sea igual en los dos sitios.',
        'Tres expresiones de la actividad 22 (<i>ça ne se fait pas, c’est la base…</i>).',
        'Una cosa que a ti te parezca exagerada, y por qué.'
      ],
      modele:'Chez nous, on mange beaucoup de choses avec les mains — un taco, une quesadilla — '
           + 'et ça ne choque personne : c’est même la base. En France, ça ferait mauvais genre '
           + 'dans un repas un peu formel. En revanche, poser les coudes sur la table, ça ne se '
           + 'fait pas non plus ici : ma grand-mère me reprenait tout le temps. Ce qui est pareil, '
           + 'c’est qu’on attend que tout le monde soit servi. Ce qui me paraît exagéré, c’est de '
           + 'ne pas souhaiter « bon appétit » : ici, ne pas le dire serait presque vexant.' },

    /* 5 */ { t:'qcm', etiqueta:'La vidéo', min:'0:00',
      consigne:'Seis preguntas sobre el vídeo. Usa los botones de minuto para comprobar.',
      q: [
        { enonce:'Pourquoi la couleur des vêtements des animateurs est-elle une erreur ?',
          min:'0:37',
          o:['le noir était traditionnellement réservé au personnel de service',
             'le noir salit trop vite', 'le noir est trop élégant pour un repas'], r:0 },
        { enonce:'Quel était le métier de Carmel avant ?', min:'2:05',
          o:['cuisinière', 'juriste', 'professeure'], r:1,
          note:'Juriste en droit des affaires: muchas comidas de negocios, y de ahí le viene todo.' },
        { enonce:'Pourquoi David veut-il connaître les règles aujourd’hui ?', min:'2:55',
          o:['pour les imposer à ses enfants',
             'pour les transmettre, et que ses enfants puissent choisir',
             'pour gagner un pari'], r:1 },
        { enonce:'Selon Carmel, ne pas connaître les codes…', min:'3:15',
          o:['fait peur et empêche d’oser entrer quelque part',
             'n’a aucune importance', 'se voit tout de suite'], r:0,
          note:'Su ejemplo: no atreverse a entrar en un gran hotel por una pastelería, por miedo '
             + 'a la mirada de los demás [03:48].' },
        { enonce:'Pourquoi, traditionnellement, on ne dit pas « bon appétit » ?', min:'14:40',
          o:['parce que ça renvoie à la digestion, et le repas est un art de vivre',
             'parce que c’est trop familier', 'parce que ça porte malheur'], r:0,
          note:'Pero si nos lo dicen, se responde « Merci, vous également » [14:46]. Hoy casi '
             + 'todo el mundo lo dice.' },
        { enonce:'Quelle est, selon Carmel, la règle numéro un ?', min:'13:26',
          o:['connaître l’ordre des couverts',
             'ne jamais mettre les autres mal à l’aise',
             'ne jamais parler à table'], r:1 }
      ] },

    /* 6 */ { t:'prod', etiqueta:'Après la vidéo', mots:50,
      consigne:'Una cosa del vídeo que te sorprendió, y una que ya hacías sin saber por qué.',
      sous:'50 palabras. Dos frases bien hechas valen más que diez a medias.',
      check: [
        'Lo que te sorprendió, con el porqué.',
        'Lo que ya hacías.',
        'Una expresión de la actividad 22.'
      ],
      modele:'Ce qui m’a le plus surpris, c’est l’histoire de la reine qui boit l’eau du '
           + 'rince-doigts pour ne pas gêner son invité : je pensais que ces règles servaient à '
           + 'juger les autres, et en fait c’est le contraire. Ce que je faisais déjà sans le '
           + 'savoir, c’est garder les mains sur la table. Chez moi, les cacher, ça ne se fait pas '
           + 'non plus.' },

    /* 7 */ { t:'transfo', etiqueta:'Plus… plus',
      consigne:'Termina cada frase a tu manera. Compara después con el modelo.',
      sous:'Es la actividad 19 del libro: no hay una sola respuesta buena.',
      q: [
        { enonce:'Plus je vois ce qui est à la mode, plus / moins…',
          modele:'Plus je vois ce qui est à la mode, moins j’ai envie de suivre la mode.' },
        { enonce:'Plus je vieillis, plus / moins…',
          modele:'Plus je vieillis, plus je comprends à quoi servent ces règles.' },
        { enonce:'Plus je vois les ados, plus / moins…',
          modele:'Plus je vois les ados, plus je me dis qu’ils sont simplement plus directs.' },
        { enonce:'Plus / Moins il y a d’objets dans un salon, plus / moins…',
          modele:'Moins il y a d’objets dans un salon, plus la pièce paraît grande.',
          note:'Delante de un nombre, <b>de</b>: <i>moins d’objets</i>, <i>plus de monde</i>.' },
        { enonce:'Moins on connaît les codes, plus / moins…',
          modele:'Moins on connaît les codes, plus on a peur de se tromper.' }
      ] },

    /* 8 */ { t:'trous', etiqueta:'Valoir',
      consigne:'Completa con el verbo valoir.',
      q: [
        { enonce:'Il ___ mieux éviter d’en parler à table.', r:['vaut'], taille:10 },
        { enonce:'Mieux ___ prévenir que guérir.', r:['vaut'], taille:10 },
        { enonce:'Un homme averti en ___ deux. <i>(proverbe)</i>', r:['vaut'], taille:10 },
        { enonce:'Deux précautions ___ mieux qu’une. <i>(proverbe)</i>', r:['valent'], taille:10,
          note:'Aquí el sujeto es <b>deux précautions</b>, plural: <i>valent</i>.' },
        { enonce:'Apprendre ces règles, ça ___ la peine.', r:['vaut'], taille:10 }
      ] },

    /* 9 */ { t:'qcm', etiqueta:'Les proverbes',
      consigne:'¿Qué quiere decir cada uno?',
      q: [
        { enonce:'« Un homme averti en vaut deux. »',
          o:['Quien está prevenido tiene ventaja',
             'Dos personas trabajan mejor que una',
             'Hay que avisar dos veces'], r:0 },
        { enonce:'« Deux précautions valent mieux qu’une. »',
          o:['Es mejor no arriesgarse nunca',
             'Más vale tomar una precaución de más que una de menos',
             'Hay que hacer las cosas dos veces'], r:1 },
        { enonce:'¿Por qué los usa Vincent en el mensaje ?',
          o:['para presumir de cultura',
             'para suavizar un consejo: dice la regla sin señalar a nadie',
             'porque no sabe explicarlo de otra forma'], r:1,
          note:'Es exactamente lo que hace un proverbio: dice la norma <b>sin</b> acusar a nadie. '
             + 'Muy útil cuando quieres corregir a alguien sin que se sienta atacado.' }
      ] },

    /* 10 */ { t:'tri', etiqueta:'La nétiquette',
      consigne:'En un correo o un chat con alguien a quien no tuteas: ¿se hace o no?',
      cols: ['Ça se fait', 'Ça ne se fait pas'],
      items: [
        ['commencer par « Bonjour » avant de demander quelque chose', 0],
        ['répondre dans la journée, ou dire quand on pourra répondre', 0],
        ['mettre un objet clair à son mail', 0],
        ['se relire avant d’envoyer', 0],
        ['ÉCRIRE TOUT EN MAJUSCULES', 1],
        ['envoyer un message vocal de huit minutes', 1],
        ['mettre toute l’équipe en copie pour une question à une seule personne', 1],
        ['relancer au bout de deux heures', 1],
        ['écrire « slt » à un professeur', 1]
      ],
      aide:'Las mayúsculas, en internet, equivalen a <b>gritar</b>. Y el vocal largo traslada '
         + 'el trabajo al otro: tú tardas ocho minutos en hablar, él tarda ocho en escucharte.' },

    /* 11 */ { t:'qcm', etiqueta:'Nétiquette',
      consigne:'Tres situaciones. ¿Qué expresión de la actividad 22 usarías?',
      q: [
        { enonce:'Un camarade t’envoie un vocal de huit minutes à minuit.',
          o:['C’est la base.', 'Ça ne se fait pas vraiment, et ça met mal à l’aise.', 'C’est vexant.'],
          r:1 },
        { enonce:'Quelqu’un écrit tout un mail en majuscules.',
          o:['Ça fait mauvais genre : on a l’impression qu’il crie.',
             'C’est la base.', 'Ça s’apprend.'], r:0 },
        { enonce:'Un étudiant écrit à un professeur sans dire bonjour.',
          o:['C’est n’importe quoi.', 'Ça ne se fait pas — mais ça s’apprend.', 'C’est vexant.'],
          r:1, note:'Las dos juntas: señalas la norma y al mismo tiempo no humillas a nadie. '
                  + 'Es la fórmula más útil de toda la lista.' }
      ] },

    /* 12 */ { t:'prod', etiqueta:'Production finale', mots:120,
      consigne:'Escríbele a un amigo francés que viene a México la semana que viene: '
             + '¿qué se hace y qué no se hace en la mesa aquí?',
      sous:'120 palabras. Es lo que vamos a comentar en clase, así que trae lo tuyo, no lo mío.',
      check: [
        'Tres cosas que <b>se hacen</b> aquí y tres que <b>no se hacen</b>.',
        'Cuatro expresiones de la actividad 22.',
        'Un <i>plus… plus</i> o un <i>moins… moins</i>.',
        'Un <i>il vaut mieux</i> + infinitivo.',
        'Una diferencia con Francia que te parezca divertida.',
        'Nada de « c’est bien » ni « c’est mal »: usa las expresiones.'
      ],
      modele:'Salut ! Avant que tu arrives, trois choses. Ici, on mange beaucoup avec les mains, '
           + 'et c’est la base : un taco se prend à la main, jamais à la fourchette — le faire '
           + 'autrement, ça fait même un peu prétentieux. On dit toujours « provecho » en '
           + 'arrivant, même à des inconnus dans un restaurant : ne pas le dire, ça ne se fait '
           + 'pas. Et on attend l’hôte avant de commencer, comme chez toi.<br><br>'
           + 'Ce qui ne se fait pas : refuser un plat sans goûter, partir tout de suite après le '
           + 'repas — plus tu restes à table, plus on te trouve sympathique —, et arriver à '
           + 'l’heure exacte à une invitation chez quelqu’un. Il vaut mieux arriver vingt '
           + 'minutes plus tard : autrement, tu surprends tout le monde en cuisine.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   SÉANCE 5 · 19 octobre · p. 20-21
   Rendez-vous « Être éducateur au goût »
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's5',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Lundi 19 octobre · p. 20-21',
  titulo: 'Être éducateur au goût',
  resumen: 'Un métier peu connu, les cinq saveurs, les textures y cómo hablar de un plato sin juzgarlo.',
  intro: 'El oficio del texto sirve de pretexto para lo que de verdad se trabaja aquí: '
       + 'poner palabras a lo que se siente en la boca.',

  secciones: [
    { titulo: 'Révision autrement',
      sous: 'El vrai/faux de clase, ahora clasificando; y los oficios que se parecen y no son lo mismo.',
      rappels: [
        { titulo: 'Un métier qui n’est pas un autre',
          html: `<p>Tout le texte tient sur une distinction : l’éducateur au goût
          <b>n’est pas</b> un soignant et <b>ne juge pas</b>. Il fait sentir, nommer, comparer.</p>
          <div class="ex">éveiller les papilles · une dégustation à l’aveugle ·
          mettre des mots sur une sensation · le palais (le goût fin)</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: 'Un pas plus loin',
      sous: 'Las cinco saveurs —con la quinta que el libro no nombra—, las texturas y el dictado.',
      rappels: [
        { titulo: 'Les cinq saveurs et les textures',
          html: `<ul>
            <li><b>Les saveurs :</b> sucré · salé · acide · amer · et la cinquième,
                <b>l’umami</b> (le parmesan vieilli, la sauce soja, le bouillon de dashi).</li>
            <li><b>Les textures :</b> croquant (une pomme) · croustillant (une croûte) ·
                fondant · moelleux · onctueux · filandreux · pâteux.</li>
            <li><b>Le degré :</b> fade ≠ relevé · doux ≠ piquant · âpre · astringent.</li>
          </ul>
          <div class="piege"><b>Faux amis de la table :</b> <i>épicé</i> n’est pas
          <i>piquant</i> (un plat peut être très épicé sans piquer), et <i>fort</i> se dit
          surtout d’un fromage ou d’une moutarde.</div>` },
        { titulo: 'Bruts, transformés, ultra-transformés',
          html: `<p>La classification dont tout le monde parle, en trois marches :</p>
          <ul>
            <li><b>brut</b> — tel qu’il sort de la terre ou de la découpe : une pomme, des lentilles.</li>
            <li><b>transformé</b> — une recette simple et des ingrédients qu’on reconnaît :
                du pain, du beurre, des tomates pelées.</li>
            <li><b>ultra-transformé</b> — une liste d’ingrédients qu’on ne trouve pas dans
                une cuisine : un soda, des nuggets, une soupe en sachet.</li>
          </ul>` },
        { titulo: 'Refuser sans blesser',
          html: `<ul>
            <li>Je ne suis pas très <b>sensible</b> aux fromages forts.</li>
            <li>Ce n’est pas <b>ma tasse de thé</b>. <i>(familier)</i></li>
            <li>Ça ne me <b>parle</b> pas. <i>(sans juger le plat)</i></li>
            <li>J’en prendrai <b>juste un peu</b>, pour goûter.</li>
          </ul>` }
      ],
      ejercicios: [2, 3, 4, 5, 6]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'tri', etiqueta:'Révision',
      consigne:'Un éducateur au goût : il le fait, ou il ne le fait pas ?',
      cols: ['Il le fait', 'Il ne le fait pas'],
      items: [
        ['faire goûter des aliments à l’aveugle', 0],
        ['apprendre à mettre des mots sur ce qu’on ressent', 0],
        ['travailler avec les écoles et les cantines', 0],
        ['éveiller la curiosité devant un légume inconnu', 0],
        ['prescrire un régime alimentaire', 1],
        ['calculer les calories d’un menu', 1],
        ['dire ce qui est de bon ou de mauvais goût', 1],
        ['juger la cuisine des familles', 1]
      ],
      aide:'Es toda la idea del texto : ni médico, ni crítico. Si confundes las dos columnas, '
         + 'vuelve a leer la act. 1 del libro.' },

    /* 1 */ { t:'paires', etiqueta:'Métiers et mots',
      consigne:'Quatre métiers qu’on confond, et les mots du goût.',
      pairs: [
        ['un(e) nutritionniste', 'médecin : il soigne par l’alimentation'],
        ['un(e) diététicien(ne)', 'il conçoit des menus et des régimes équilibrés'],
        ['un(e) éducateur(trice) au goût', 'il apprend à sentir, à goûter et à en parler'],
        ['un(e) critique gastronomique', 'il juge les restaurants et le publie'],
        ['un(e) sommelier(ère)', 'il accorde les vins avec les plats'],
        ['un(e) maraîcher(ère)', 'il cultive les légumes et les vend'],
        ['les papilles', 'ce qui, sur la langue, perçoit les saveurs'],
        ['le palais', 'le goût, quand on parle de finesse']
      ] },

    /* 2 */ { t:'trous', etiqueta:'Saveurs et textures',
      consigne:'Complète avec le mot juste.',
      q: [
        { enonce:'Le citron et le vinaigre sont ___.', r:['acides','acide'], taille:12 },
        { enonce:'Un café sans sucre est ___.', r:['amer'], taille:12 },
        { enonce:'Le pain tout juste sorti du four est ___.', r:['croustillant'], taille:14 },
        { enonce:'Ce chocolat ___ dans la bouche.', r:['fond'], taille:10,
          note:'<b>fondre</b> : il fond, ils fondent. <i>Fondant</i> est l’adjectif.' },
        { enonce:'Une soupe de courge bien lisse est ___.', r:['onctueuse','veloutée'], taille:14 },
        { enonce:'Un parmesan vieilli, de la sauce soja : c’est la cinquième saveur, l’___.',
          r:['umami'], taille:10 },
        { enonce:'Ce plat ne goûte rien du tout, il est complètement ___.', r:['fade'], taille:10 }
      ] },

    /* 3 */ { t:'tri', etiqueta:'Classer',
      consigne:'Brut, transformé ou ultra-transformé ?',
      cols: ['Brut', 'Transformé', 'Ultra-transformé'],
      items: [
        ['une pomme', 0], ['un filet de poulet', 0], ['des lentilles sèches', 0],
        ['du pain de boulangerie', 1], ['du beurre', 1], ['une conserve de tomates pelées', 1],
        ['un soda', 2], ['des nuggets', 2], ['une soupe déshydratée en sachet', 2]
      ],
      aide:'La frontière n’est pas « industriel ou pas » : c’est la liste des '
         + 'ingrédients. Si tu y trouves un mot que tu n’as pas dans ta cuisine, '
         + 'c’est ultra-transformé.' },

    /* 4 */ { t:'transfo', etiqueta:'Politesse de la table',
      consigne:'Réécris chaque phrase pour dire la même chose sans vexer personne.',
      q: [
        { enonce:'Je déteste le fromage. <i>(ne pas être sensible à)</i>',
          modele:'Je ne suis pas très sensible aux fromages forts.' },
        { enonce:'C’est dégueulasse. <i>(ce n’est pas…)</i>',
          modele:'Ce n’est pas ce que je préfère, mais j’en goûte volontiers un peu.' },
        { enonce:'Ton plat n’a aucun goût. <i>(je trouve que… un peu…)</i>',
          modele:'Je trouve ça un peu doux à mon goût — tu as mis du sel ?',
          note:'Formuler en « à mon goût » déplace le jugement sur soi : '
             + 'c’est tout le secret.' },
        { enonce:'Je n’en veux pas. <i>(juste un peu)</i>',
          modele:'J’en prendrai juste un peu, merci.' },
        { enonce:'Cette cuisine, ça ne m’intéresse pas du tout. <i>(ça ne me parle pas)</i>',
          modele:'Honnêtement, cette cuisine ne me parle pas beaucoup.' }
      ] },

    /* 5 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris. Autant de fois que tu veux.',
      sous:'La voz es de síntesis, no es un locutor: sirve para el ritmo, no para el acento.',
      q: [
        { texte:'Je trouve ce plat un peu trop amer.' },
        { texte:'Les aliments bruts ont beaucoup plus de goût.' },
        { texte:'Elle apprend aux enfants à mettre des mots sur ce qu’ils goûtent.' },
        { texte:'Ça fond dans la bouche et ce n’est pas du tout sucré.' }
      ] },

    /* 6 */ { t:'prod', etiqueta:'Production écrite', mots:100,
      consigne:'Présente un plat de chez toi à quelqu’un qui ne l’a jamais goûté.',
      sous:'100 mots. Prohibido escribir « c’est très bon »: hay que hacerlo sentir.',
      check: [
        'Deux saveurs au moins, nommées (sucré, salé, acide, amer, umami).',
        'Une texture (croquant, fondant, onctueux…).',
        'Quand on le mange : la fête, la saison, l’heure.',
        'Une comparaison pour aider l’autre : <i>c’est un peu comme…</i>',
        'Aucun « c’est bon », aucun « c’est délicieux ».'
      ],
      modele:'Chez nous, on prépare les <i>cachapas</i> quand le maïs est tendre, vers la fin '
           + 'des pluies. C’est une galette épaisse, faite de maïs frais écrasé : le dessus '
           + 'reste un peu croustillant, l’intérieur est fondant et presque sucré, parce qu’on '
           + 'ne met pas de farine. On la plie en deux sur un fromage blanc très salé qui fond '
           + 'à la chaleur. C’est ce contraste qui fait tout : le sucré du maïs contre le '
           + 'salé du fromage. C’est un peu comme une crêpe, mais plus dense, et ça se mange '
           + 'avec les mains, au bord de la route.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   SÉANCE 6 · 21 octobre · p. 22-23
   Communication et Grammaire — cierre de la Unité 1
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's6',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Mercredi 21 octobre · p. 22-23',
  titulo: 'Communication et grammaire · ce qui, ce que, comparatifs',
  resumen: 'Ce qui / ce que / ce dont, el doble comparativo, plutôt que, y el registro de lo que se dice.',
  intro: 'La sesión más gramatical del ciclo. Lo que se practica aquí vuelve a salir '
       + 'en la evaluación del 9 de noviembre.',

  secciones: [
    { titulo: 'Révision autrement',
      sous: 'Las expresiones del libro, ahora emparejadas con su intención — y clasificadas por registro.',
      rappels: [
        { titulo: 'Dire ce qu’on aime, et ce qu’on n’aime pas',
          html: `<ul>
            <li><b>Avec enthousiasme :</b> ça en jette ! · j’ai un faible pour… ·
                je craque pour… · c’est ça qui me plaît.</li>
            <li><b>En critiquant avec douceur :</b> ce n’est pas très heureux ·
                ça ne me parle pas · c’est… particulier.</li>
            <li><b>Franchement :</b> ça pique les yeux · c’est du plus mauvais goût.</li>
          </ul>
          <div class="piege"><b>Registre :</b> <i>ça en jette</i> et <i>ça pique les yeux</i>
          sont familiers. À l’examen oral, on les signale (<i>« comme on dit familièrement… »</i>)
          ou on les garde pour la conversation.</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: 'Un pas plus loin',
      sous: 'Ce dont y ce à quoi, que el libro no da; y el comparativo doble con sus irregulares.',
      rappels: [
        { titulo: 'Ce qui · ce que · ce dont · ce à quoi',
          html: `<p>Un seul principe : on reprend <b>une idée entière</b>, pas un nom.
          La forme dépend de ce que demande le verbe qui suit.</p>
          <ul>
            <li><b>ce qui</b> — sujet. <i>Ce qui me plaît, c’est la couleur.</i> (quelque chose <u>plaît</u>)</li>
            <li><b>ce que</b> — complément direct. <i>Raconte-moi ce que tu as vu.</i> (voir <u>quelque chose</u>)</li>
            <li><b>ce dont</b> — pour les verbes en <b>de</b>. <i>Ce dont j’ai besoin…</i>
                (avoir besoin <u>de</u>) · parler <u>de</u>, rêver <u>de</u>, se souvenir <u>de</u>.</li>
            <li><b>ce à quoi</b> — pour les verbes en <b>à</b>. <i>Ce à quoi je pense…</i>
                (penser <u>à</u>) · s’attendre <u>à</u>, tenir <u>à</u>.</li>
          </ul>
          <div class="ex"><b>La mise en relief :</b> « Ce qui me dérange, <b>c’est</b> le bruit »
          · « Ce qui me dérange, <b>ce sont</b> les commentaires » — pluriel, donc <i>ce sont</i>.</div>` },
        { titulo: 'Le double comparatif',
          html: `<ul>
            <li><b>Plus… plus · moins… moins · plus… moins</b> —
                <i>Plus on goûte tôt, plus on est curieux.</i></li>
            <li>Avec un nom : <b>plus de / moins de</b> + nom.
                <i>Il y a moins de monde qu’hier.</i></li>
            <li><b>Les irréguliers :</b> bon → <b>meilleur</b> (adjectif) ·
                bien → <b>mieux</b> (adverbe) · mauvais → <b>pire</b>.</li>
          </ul>
          <div class="piege"><b>Le piège de l’examen :</b> <i>Ce vin est <b>meilleur</b></i>
          (adjectif, il accompagne un nom) mais <i>Elle cuisine <b>mieux</b></i>
          (adverbe, il accompagne un verbe). Jamais « plus bon », jamais « plus bien ».</div>` },
        { titulo: 'Plutôt que',
          html: `<ul>
            <li><b>plutôt que</b> + nom : <i>une salade plutôt qu’un dessert.</i></li>
            <li><b>plutôt que de</b> + infinitif : <i>Plutôt que de te plaindre, propose quelque chose.</i></li>
            <li><b>plutôt</b> seul = assez, un peu : <i>Elle est plutôt timide. C’est plutôt classe.</i></li>
          </ul>` }
      ],
      ejercicios: [2, 3, 4, 5, 6]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'paires', etiqueta:'Révision',
      consigne:'Chaque formule, son intention exacte.',
      pairs: [
        ['Ça en jette !', 'C’est spectaculaire, ça impressionne'],
        ['Ça pique les yeux.', 'C’est visuellement agressif, ça jure'],
        ['Ce n’est pas très heureux.', 'Dit avec douceur : c’est raté'],
        ['J’ai un faible pour…', 'J’aime particulièrement, avec tendresse'],
        ['Je craque pour…', 'Je ne résiste pas'],
        ['Ça ne me parle pas.', 'Ça ne me touche pas — sans juger'],
        ['C’est du plus mauvais goût.', 'C’est franchement choquant'],
        ['C’est sobre, mais ça a du cachet.', 'Discret et pourtant élégant']
      ] },

    /* 1 */ { t:'tri', etiqueta:'Registre',
      consigne:'Dans quel registre dirais-tu chacune de ces phrases ?',
      cols: ['Familier', 'Standard', 'Soutenu'],
      items: [
        ['Ça en jette !', 0],
        ['C’est top.', 0],
        ['C’est pas mon truc.', 0],
        ['Ça pique les yeux.', 0],
        ['C’est très réussi.', 1],
        ['Ce n’est pas très heureux.', 1],
        ['C’est d’un goût exquis.', 2],
        ['Cela ne me séduit guère.', 2],
        ['Je trouve cela peu heureux.', 2]
      ],
      aide:'En el oral del DELF se espera el <b>standard</b>, con algún toque soutenu. '
         + 'Lo familiar no está prohibido, pero hay que marcarlo como tal.' },

    /* 2 */ { t:'trous', etiqueta:'Grammaire',
      consigne:'Complète avec ce qui, ce que (ce qu’), ce dont ou ce à quoi.',
      q: [
        { enonce:'___ me plaît dans cette robe, c’est la couleur.', r:['ce qui'], taille:12 },
        { enonce:'Raconte-moi ___ tu as vu au défilé.', r:['ce que','ce qu'], taille:12 },
        { enonce:'___ j’ai besoin, c’est d’un manteau qui dure.', r:['ce dont'], taille:12,
          note:'avoir besoin <b>de</b> → ce <b>dont</b>.' },
        { enonce:'C’est exactement ___ je m’attendais.', r:['ce à quoi'], taille:14,
          note:'s’attendre <b>à</b> → ce <b>à quoi</b>.' },
        { enonce:'Il ne comprend pas ___ je lui reproche.', r:['ce que','ce qu'], taille:12 },
        { enonce:'Elle fait toujours ___ lui plaît.', r:['ce qui'], taille:12 },
        { enonce:'___ tout le monde parle, c’est de ce jeune créateur.', r:['ce dont'], taille:12 },
        { enonce:'___ je tiens le plus, c’est au confort.', r:['ce à quoi'], taille:14 }
      ] },

    /* 3 */ { t:'transfo', etiqueta:'Mise en relief',
      consigne:'Réécris chaque phrase en mettant en relief l’élément souligné.',
      sous:'Empieza por « Ce qui… », « Ce que… », « Ce dont… ».',
      q: [
        { enonce:'J’aime surtout <u>la liberté</u> qu’il y a dans son style.',
          modele:'Ce que j’aime surtout dans son style, c’est la liberté.' },
        { enonce:'<u>Les commentaires sur les réseaux</u> me dérangent.',
          modele:'Ce qui me dérange, ce sont les commentaires sur les réseaux.',
          note:'Pluriel → <b>ce sont</b>.' },
        { enonce:'J’ai besoin <u>de conseils</u>, pas de jugements.',
          modele:'Ce dont j’ai besoin, ce sont des conseils, pas des jugements.' },
        { enonce:'Je rêve <u>d’un vêtement qui dure dix ans</u>.',
          modele:'Ce dont je rêve, c’est d’un vêtement qui dure dix ans.' },
        { enonce:'Je ne supporte pas <u>qu’on commente ma tenue</u>.',
          modele:'Ce que je ne supporte pas, c’est qu’on commente ma tenue.' }
      ] },

    /* 4 */ { t:'qcm', etiqueta:'Comparatifs',
      consigne:'Choisis la forme correcte.',
      q: [
        { enonce:'___ on connaît un plat, ___ on l’apprécie.',
          o:['Plus… plus', 'Plus… plus de', 'Le plus… le plus'], r:0 },
        { enonce:'Il y a ___ monde qu’hier.',
          o:['moins de', 'moins', 'le moins de'], r:0,
          note:'Devant un nom : <b>moins de</b>, <b>plus de</b>.' },
        { enonce:'Elle cuisine ___ que moi.',
          o:['meilleur', 'mieux', 'plus bonne'], r:1,
          note:'<b>mieux</b> accompagne un verbe ; <b>meilleur</b> accompagne un nom.' },
        { enonce:'Ce vin est ___ que l’autre.',
          o:['mieux', 'meilleur', 'plus bon'], r:1 },
        { enonce:'Plus il insiste, ___ j’ai envie d’accepter.',
          o:['moins', 'le moins', 'pas'], r:0 },
        { enonce:'C’est ___ que ce que je craignais.',
          o:['pire', 'plus pire', 'plus mauvais'], r:0,
          note:'<i>Plus mauvais</i> existe, mais pour un goût ou une qualité concrète : '
             + '<i>ce café est plus mauvais que l’autre</i>. Pour une situation, c’est <b>pire</b>.' }
      ] },

    /* 5 */ { t:'trous', etiqueta:'Plutôt',
      consigne:'Complète avec plutôt, plutôt que ou plutôt que de.',
      q: [
        { enonce:'Je préfère marcher ___ prendre le bus.', r:['plutôt que de','plutôt que'], taille:16 },
        { enonce:'Elle est ___ timide. <i>(= assez)</i>', r:['plutôt'], taille:10 },
        { enonce:'___ te plaindre, propose quelque chose.', r:['plutôt que de'], taille:16 },
        { enonce:'Ce manteau est ___ classe. <i>(familier)</i>', r:['plutôt'], taille:10 },
        { enonce:'Prends une salade ___ un dessert.', r:['plutôt qu','plutôt que'], taille:14,
          note:'Devant un nom : <i>plutôt qu’un dessert</i>.' }
      ] },

    /* 6 */ { t:'prod', etiqueta:'Production écrite', mots:100,
      consigne:'Un ami t’envoie une photo de la tenue qu’il a choisie pour un entretien '
             + 'd’embauche et te demande ton avis. Tu n’aimes pas du tout. Réponds-lui.',
      sous:'100 mots. Hay que ser honesto y amable a la vez: ahí está el ejercicio.',
      check: [
        'Une mise en relief : <i>Ce qui…, c’est…</i> ou <i>Ce que…, c’est…</i>',
        'Un double comparatif : <i>Plus…, plus…</i>',
        'Un <i>plutôt que</i>.',
        'Une critique polie (pas « ça pique les yeux » — il passe un entretien !).',
        'Une proposition concrète pour remplacer.'
      ],
      modele:'Alors, franchement : ce qui me plaît, c’est la chemise — la coupe est '
           + 'impeccable et le blanc passe partout. Ce qui me gêne un peu plus, c’est la veste. '
           + 'Elle est très serrée, et plus tu bougeras, moins tu seras à l’aise ; dans un '
           + 'entretien, ça se voit tout de suite. Je mettrais quelque chose de plus sobre '
           + 'plutôt que ce motif, qui attire l’œil avant toi. Et garde les manches comme ça, '
           + 'pas retroussées : c’est un détail, mais ce n’est pas très heureux dans un '
           + 'bureau. Sinon, ça te va très bien — tu as bon goût, tu le sais.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   SÉANCE 7 · 26 octobre · p. 24-25
   Méthodologie DELF — Prendre des notes
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's7',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Lundi 26 octobre · p. 24-25',
  titulo: 'Prendre des notes — méthodologie DELF',
  resumen: 'Descifrar notas, abreviar, y oír cifras al vuelo: la técnica que decide la compréhension orale.',
  intro: 'Se habla a 150-200 palabras por minuto y se escribe a 25-40. Tomar notas no es '
       + 'transcribir: es elegir y reformular. Esta ficha entrena las dos cosas.',

  secciones: [
    { titulo: 'Révision autrement',
      sous: 'En clase leímos unas notas. Aquí vamos al revés: de las notas a la frase completa.',
      rappels: [
        { titulo: 'Le calcul qui explique tout',
          html: `<p>Un locuteur dit entre <b>150 et 200 mots par minute</b>. On écrit entre
          <b>25 et 40</b>. Il est donc matériellement impossible de tout noter :
          la seule question est <i>quoi garder</i>.</p>
          <ul>
            <li>Les <b>mots-clés</b>, pas les phrases.</li>
            <li>Les <b>chiffres</b> et les <b>noms propres</b>, tout de suite : ils ne se devinent pas.</li>
            <li>La <b>structure</b> : ce qui s’oppose, ce qui cause, ce qui conclut.</li>
            <li>Un <b>blanc</b> si on n’a pas compris — et on continue. Le blanc se comble souvent tout seul.</li>
          </ul>` },
        { titulo: 'Abréviations et symboles courants',
          html: `<div class="ex">tjrs (toujours) · bcp (beaucoup) · qqch · qqn · c-à-d · pdt (pendant) ·
          ds (dans) · ms (mais) · pr (pour) · ss (sans) · nbx (nombreux) · pb (problème) ·
          dvpt (développement) · gvt (gouvernement) · ex (exemple) · mn (minute)</div>
          <div class="ex">= (c’est) · ≠ (ce n’est pas, au contraire) · &gt; (plus que) ·
          &lt; (moins que) · → (donc, entraîne) · ↑ (augmente) · ↓ (diminue) · + / − · ø (rien, aucun)</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: 'Un pas plus loin',
      sous: 'Abreviar uno mismo, oír cifras, y una toma de notas de verdad.',
      rappels: [
        { titulo: 'Au DELF B2, la compréhension de l’oral',
          html: `<ul>
            <li>Deux documents. L’un n’est <b>écouté qu’une fois</b> (interview, bulletin
                d’information) ; l’autre, plus long, est <b>écouté deux fois</b>
                (exposé, conférence, émission).</li>
            <li>On lit <b>les questions avant</b> l’écoute : elles disent quoi chercher.</li>
            <li>Première écoute : la structure et les chiffres. Deuxième : les détails et les blancs.</li>
            <li>On relit ses notes <b>tout de suite</b>, tant que la mémoire complète ce qui manque.</li>
          </ul>` }
      ],
      ejercicios: [2, 3, 4, 5]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'transfo', etiqueta:'Décoder',
      consigne:'Voici des notes prises en classe. Réécris chacune en une phrase complète.',
      q: [
        { enonce:'éduc. goût ≠ nutritionniste → pas de régime, ms éveil des papilles',
          modele:'L’éducateur au goût n’est pas un nutritionniste : il ne prescrit pas de régime, '
               + 'mais il éveille les papilles.' },
        { enonce:'enfants 3-6 ans = âge clé pr accepter nveaux aliments',
          modele:'Les enfants de 3 à 6 ans sont à l’âge clé pour accepter de nouveaux aliments.' },
        { enonce:'ateliers adultes ↑ dde, pb = tps + budget',
          modele:'La demande d’ateliers pour adultes augmente, mais le problème, c’est le temps et le budget.' },
        { enonce:'+ on goûte tôt, + on est curieux ap.',
          modele:'Plus on goûte tôt, plus on est curieux ensuite.' },
        { enonce:'bcp de clichés ds l’alim° : sucré/salé ≠ interdit',
          modele:'Il y a beaucoup de clichés dans l’alimentation : mélanger le sucré et le salé '
               + 'n’est pas interdit.' }
      ],
      aide:'Fíjate en lo que hacen las flechas y el signo ≠ : no son adornos, son la '
         + 'estructura lógica de la frase.' },

    /* 1 */ { t:'paires', etiqueta:'Abréviations',
      consigne:'Chaque abréviation, son mot.',
      pairs: [
        ['tjrs', 'toujours'], ['bcp', 'beaucoup'], ['qqch', 'quelque chose'],
        ['c-à-d', 'c’est-à-dire'], ['pdt', 'pendant'], ['ms', 'mais'],
        ['dvpt', 'développement'], ['gvt', 'gouvernement'], ['nbx', 'nombreux'],
        ['↑', 'augmente, en hausse']
      ] },

    /* 2 */ { t:'trous', etiqueta:'Abréger',
      consigne:'Écris ces mots comme tu les noterais, en abrégé.',
      sous:'Hay varias formas válidas; la corrección acepta las más corrientes.',
      q: [
        { enonce:'beaucoup → ___', r:['bcp'], taille:8 },
        { enonce:'c’est-à-dire → ___', r:['c-à-d','cad','c.-à-d.','c à d'], taille:8 },
        { enonce:'quelqu’un → ___', r:['qqn'], taille:8 },
        { enonce:'toujours → ___', r:['tjrs'], taille:8 },
        { enonce:'problème → ___', r:['pb'], taille:8 },
        { enonce:'développement → ___', r:['dvpt','dvlpt','dév.'], taille:8 },
        { enonce:'« cela entraîne » → ___ <i>(un symbole)</i>', r:['→','->','='], taille:8 }
      ] },

    /* 3 */ { t:'dictee', etiqueta:'Chiffres',
      consigne:'Les chiffres sont ce qui se perd en premier. Écoute et écris, en lettres.',
      sous:'Escribe los números en letras, tal como los oyes.',
      q: [
        { texte:'Le nombre d’ateliers a augmenté de quinze pour cent en deux ans.' },
        { texte:'Trois enfants sur quatre refusent un légume qu’ils ne connaissent pas.' },
        { texte:'L’étude a été menée auprès de mille deux cents familles.' },
        { texte:'La séance dure une heure et demie.' },
        { texte:'Un adulte prononce environ cent soixante mots par minute.' }
      ],
      aide:'En el examen no los escribes en letras, claro: los anotas en cifras, al vuelo. '
         + 'Aquí van en letras para entrenar el oído, que es lo que falla.' },

    /* 4 */ { t:'qcm', etiqueta:'Stratégie',
      consigne:'Cinq décisions à prendre pendant l’épreuve.',
      q: [
        { enonce:'Pendant l’écoute, tu notes…',
          o:['tout ce que tu entends', 'les mots-clés, les chiffres et les noms propres',
             'seulement les mots que tu connais déjà'], r:1 },
        { enonce:'Tu n’as pas compris une phrase. Tu…',
          o:['t’arrêtes pour y réfléchir', 'laisses un blanc et tu continues',
             'recommences l’écoute dans ta tête'], r:1,
          note:'S’arrêter sur un mot, c’est perdre les trente secondes qui suivent. '
             + 'Le blanc se comble souvent à la deuxième écoute.' },
        { enonce:'Le meilleur moment pour relire tes notes, c’est…',
          o:['le soir même', 'juste après, à chaud', 'la veille de l’examen'], r:1,
          note:'À chaud, la mémoire complète encore les blancs toute seule. Deux heures plus tard, non.' },
        { enonce:'Au DELF B2, en compréhension orale…',
          o:['tous les documents passent deux fois',
             'un document ne passe qu’une fois, l’autre deux fois',
             'on choisit combien de fois on écoute'], r:1 },
        { enonce:'Avant l’écoute, tu lis…',
          o:['rien, pour rester concentré', 'les questions', 'la transcription'], r:1,
          note:'Les questions disent quoi chercher : c’est la moitié du travail.' }
      ] },

    /* 5 */ { t:'prod', etiqueta:'Entraînement réel',
      consigne:'Écoute trois minutes de français authentique et prends des notes. '
             + 'Puis recopie ici tes notes, telles quelles.',
      sous:'Sugerencias: « Journal en français facile » (RFI), un podcast que ya sigas, '
         + 'o un vídeo de los que vemos en clase. Tráemelas y las comentamos.',
      check: [
        'Al menos tres abreviaturas propias.',
        'Dos símbolos (→, ≠, ↑…).',
        'Todas las cifras que aparezcan.',
        'Los nombres propios.',
        'Un blanco marcado con «…» donde no entendiste: eso también es técnica.'
      ],
      modele:'migration oiseaux — RFI 12/10<br>'
           + '• départ + tôt qu’il y a 20 ans → réchauffement<br>'
           + '• étude univ. … (nom ?) sur 50 espèces, 1980 → auj.<br>'
           + '• 2/3 des espèces concernées<br>'
           + '• csq : décalage avec les insectes = ø nourriture pr les petits<br>'
           + '• chercheur : « ce n’est pas une adaptation, c’est une course »' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   SÉANCE 8 · 28 octobre · p. 26-27
   Unité 2 «Tellement genré !» — los estereotipos de género
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's8',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Mercredi 28 octobre · p. 26-27',
  titulo: 'Tellement genré ! — nommer les clichés',
  resumen: 'El léxico del estereotipo, las construcciones «ça permet de / ça évite de», y distinguir hecho de opinión.',
  intro: 'La unidad empieza con un juego de cartas que da mucho que hablar. Para hablar bien '
       + 'hacen falta dos cosas: las palabras exactas y la construcción correcta del verbo.',

  secciones: [
    { titulo: 'Révision autrement',
      sous: 'Las expresiones de la etiqueta del libro, ahora clasificadas por su construcción.',
      rappels: [
        { titulo: 'Dire à quoi ça sert — et la préposition qui va avec',
          html: `<ul>
            <li><b>+ nom :</b> ça favorise <i>l’égalité</i> · ça renforce <i>les clichés</i> ·
                ça entraîne <i>des inégalités</i>.</li>
            <li><b>+ de + infinitif :</b> ça permet <i>de choisir</i> · ça évite <i>de répéter</i> ·
                ça empêche <i>de jouer</i>.</li>
            <li><b>+ à + infinitif :</b> ça aide <i>à comprendre</i> · ça contribue <i>à construire</i> ·
                ça pousse <i>à croire</i>.</li>
          </ul>
          <div class="piege"><b>Les deux pièges :</b> <i>ça évite <b>de</b> le répéter</i>
          mais aussi <i>ça évite <b>les</b> malentendus</i> (les deux existent) ; et
          <i>ça aide <b>à</b></i>, jamais « ça aide de ».</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: 'Un pas plus loin',
      sous: 'Matizar sin ofender, y la diferencia entre un hecho, una opinión y un estereotipo.',
      rappels: [
        { titulo: 'Les mots pour nommer',
          html: `<ul>
            <li><b>un stéréotype</b> — une image toute faite d’un groupe, répétée partout.</li>
            <li><b>un préjugé</b> — un jugement porté <i>avant</i> de connaître.</li>
            <li><b>un cliché</b> — une formule usée à force d’être répétée.</li>
            <li><b>une idée reçue</b> — ce que tout le monde croit savoir sans l’avoir vérifié.</li>
            <li><b>la mixité</b> (filles et garçons ensemble) ≠ <b>la parité</b> (le même nombre).</li>
            <li><b>le sexisme ordinaire</b> · <b>la charge mentale</b> · <b>les métiers genrés</b>.</li>
          </ul>` },
        { titulo: 'Nuancer sans se fâcher',
          html: `<ul>
            <li><b>Désaccord net, mais poli :</b> Là, je ne te suis pas du tout. ·
                Je ne suis pas d’accord, et je vais te dire pourquoi.</li>
            <li><b>Nuancer :</b> Je nuancerais : … · Ça dépend du contexte. ·
                C’est plus compliqué que ça.</li>
            <li><b>Concéder avant de répondre :</b> Je te l’accorde, mais… ·
                Tu as raison sur un point, en revanche…</li>
            <li><b>Signaler une généralisation :</b> Tu généralises. · Tu pars d’un cas particulier.</li>
            <li><b>Familier :</b> N’importe quoi ! · C’est tellement cliché !</li>
          </ul>` }
      ],
      ejercicios: [2, 3, 4, 5]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'tri', etiqueta:'Constructions',
      consigne:'Quelle suite demande chaque expression ?',
      cols: ['+ nom', '+ de + infinitif', '+ à + infinitif'],
      items: [
        ['ça favorise…', 0], ['ça renforce…', 0], ['ça entraîne…', 0],
        ['ça permet…', 1], ['ça évite…', 1], ['ça empêche…', 1],
        ['ça aide…', 2], ['ça contribue…', 2], ['ça pousse…', 2]
      ],
      aide:'Cuando dudes, prueba con el infinitivo en la cabeza : <i>ça aide à comprendre</i> '
         + 'suena bien, <i>ça aide de comprendre</i> no.' },

    /* 1 */ { t:'paires', etiqueta:'Lexique',
      consigne:'Cada palabra con su definición exacta. Las cuatro primeras se parecen y no son lo mismo.',
      pairs: [
        ['un stéréotype', 'une image toute faite d’un groupe, répétée partout'],
        ['un préjugé', 'un jugement porté avant de connaître'],
        ['un cliché', 'une formule usée à force d’être répétée'],
        ['une idée reçue', 'ce qu’on croit savoir sans l’avoir vérifié'],
        ['la mixité', 'le fait que filles et garçons soient ensemble'],
        ['la parité', 'le même nombre de femmes et d’hommes'],
        ['le sexisme ordinaire', 'les petites remarques banalisées du quotidien'],
        ['la charge mentale', 'le poids d’avoir à penser à tout, à la maison']
      ] },

    /* 2 */ { t:'trous', etiqueta:'Grammaire',
      consigne:'Complète avec le verbe entre parenthèses, au présent.',
      q: [
        { enonce:'La mixité dans les jeux ___ l’égalité. <i>(favoriser)</i>', r:['favorise'], taille:12 },
        { enonce:'Un jouet neutre ___ de choisir librement. <i>(permettre)</i>', r:['permet'], taille:12 },
        { enonce:'Ce genre de remarque ___ à croire que c’est normal. <i>(pousser)</i>', r:['pousse'], taille:12 },
        { enonce:'Nommer un stéréotype ___ de le répéter. <i>(éviter)</i>', r:['évite'], taille:12 },
        { enonce:'La peur du ridicule ___ beaucoup de garçons de danser. <i>(empêcher)</i>', r:['empêche'], taille:12 },
        { enonce:'L’école ___ à construire ces habitudes. <i>(contribuer)</i>', r:['contribue'], taille:12 }
      ] },

    /* 3 */ { t:'tri', etiqueta:'Esprit critique',
      consigne:'Fait vérifiable, opinion ou stéréotype ?',
      cols: ['Fait vérifiable', 'Opinion', 'Stéréotype'],
      items: [
        ['En France, les femmes gagnent en moyenne moins que les hommes.', 0],
        ['Les hommes sont très minoritaires dans le métier de sage-femme.', 0],
        ['Depuis 2021, le congé paternité est de vingt-huit jours en France.', 0],
        ['Je trouve que les rayons roses en magasin sont ridicules.', 1],
        ['C’est mieux qu’un des deux parents reste à la maison.', 1],
        ['Les femmes sont moins ambitieuses.', 2],
        ['Les hommes ne savent pas s’occuper d’un bébé.', 2],
        ['Les filles sont naturellement plus ordonnées.', 2]
      ],
      aide:'Es la distinción que más puntos da en el DELF : un hecho se verifica, una opinión '
         + 'se asume (« je trouve que »), un estereotipo se presenta como un hecho sin serlo.' },

    /* 4 */ { t:'qcm', etiqueta:'Réagir',
      consigne:'Tu veux répondre sans te fâcher et sans donner raison. Que dis-tu ?',
      q: [
        { enonce:'« Les filles sont naturellement plus douces. »',
          o:['N’importe quoi, tu dis vraiment des bêtises.',
             'Je nuancerais : on les élève aussi comme ça.',
             'C’est vrai, c’est bien connu.'], r:1 },
        { enonce:'« Les hommes ne savent pas s’occuper d’un bébé. »',
          o:['Oui, c’est biologique.',
             'C’est tellement cliché — et démenti par tous les pères que je connais.',
             'Je m’en fiche complètement.'], r:1 },
        { enonce:'À l’écrit, pour marquer un désaccord fort mais correct :',
          o:['« Là, je ne vous suis pas du tout. »',
             '« Vous racontez n’importe quoi. »',
             '« Mdr non. »'], r:0 },
        { enonce:'« Tu généralises » veut dire :',
          o:['tu exagères un détail',
             'tu étends à tout un groupe ce qui vaut pour quelques cas',
             'tu changes de sujet'], r:1 },
        { enonce:'Quelle formule concède un point avant de répondre ?',
          o:['« Je te l’accorde, mais… »', '« De toute façon… »',
             '« Point final. »'], r:0,
          note:'Concéder d’abord, c’est la technique la plus efficace du débat : '
             + 'l’autre écoute la suite.' }
      ] },

    /* 5 */ { t:'prod', etiqueta:'Préparer le débat', mots:120,
      consigne:'Choisis une affirmation du jeu de cartes et prépare ta réponse : '
             + 'trois arguments pour, deux contre.',
      sous:'120 palabras. No se trata de ganar: se trata de sostener una posición y reconocer la otra.',
      check: [
        'Une reformulation de l’affirmation : <i>Si je comprends bien, on dit que…</i>',
        'Trois arguments, chacun avec un exemple concret.',
        'Deux objections, présentées honnêtement.',
        'Deux constructions de la liste : <i>ça permet de</i>, <i>ça évite de</i>, <i>ça renforce</i>…',
        'Une formule de concession : <i>Je te l’accorde, mais…</i>'
      ],
      modele:'On dit que les jouets devraient être neutres, sans rayon rose ni rayon bleu. '
           + 'D’abord, ça permet à l’enfant de choisir ce qui l’attire vraiment, et pas ce '
           + 'qu’on attend de lui. Ensuite, ça évite de fermer très tôt des portes : une '
           + 'fille qui n’a jamais eu de jeu de construction ne saura pas qu’elle aime ça. '
           + 'Enfin, ça contribue à normaliser les métiers mixtes : on joue avant de '
           + 'choisir un métier. Je te l’accorde, les magasins y perdraient un repère '
           + 'commode, et beaucoup de parents disent que leurs enfants choisissent le rose '
           + 'tout seuls. Mais justement : comment savoir, si tout le reste du monde le '
           + 'leur a déjà soufflé ?' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   SÉANCE 9 · 2 novembre · p. 28-29
   Bébés et jouets · tellement, pourvu que, avoir hâte de
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's9',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Lundi 2 novembre · p. 28-29',
  titulo: 'Tellement, pourvu que, avoir hâte',
  resumen: 'La intensidad, el deseo con subjuntivo y el léxico del nacimiento. La gramática más rentable del ciclo.',
  intro: 'Tres estructuras que un B2 usa todo el tiempo y que casi nadie domina del todo. '
       + 'Si solo haces una ficha de gramática, que sea esta.',

  secciones: [
    { titulo: 'Révision autrement',
      sous: 'Las frases del libro con «tellement», ahora clasificadas por lo que expresan.',
      rappels: [
        { titulo: 'Les trois tellement',
          html: `<ul>
            <li><b>Intensité</b> — tellement + adjectif ou adverbe :
                <i>Je suis tellement contente ! Il parle tellement vite.</i></li>
            <li><b>Quantité</b> — tellement <b>de</b> + nom :
                <i>Il y avait tellement de monde.</i></li>
            <li><b>Conséquence</b> — tellement… <b>que</b> :
                <i>J’étais tellement fatiguée que je me suis endormie.</i></li>
          </ul>
          <div class="ex"><b>La famille :</b> <i>si</i> remplace <i>tellement</i> devant un
          adjectif (si belle) ; <i>tant</i> le remplace devant un verbe ou un nom
          (j’ai tant travaillé · tant de gens). <b>Tellement</b> va partout : c’est le
          plus sûr à l’examen.</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: 'Un pas plus loin',
      sous: 'Pourvu que, avoir hâte, y el léxico que acompaña a la espera de un hijo.',
      rappels: [
        { titulo: 'Pourvu que + subjonctif',
          html: `<ul>
            <li><b>Seul, en exclamation :</b> un souhait teinté d’inquiétude.
                <i>Pourvu qu’il ne pleuve pas !</i></li>
            <li><b>Dans la phrase :</b> la seule condition qui compte.
                <i>Je viendrai, pourvu que tu sois là.</i></li>
            <li><b>Même famille, tous au subjonctif :</b> à condition que · pour peu que ·
                à moins que (+ <i>ne</i> explétif : <i>à moins qu’il ne pleuve</i>).</li>
          </ul>
          <div class="piege">Ce <b>ne</b> de « à moins qu’il ne pleuve »
          <b>n’est pas une négation</b> : c’est un usage soutenu. La phrase veut dire
          « sauf s’il pleut ».</div>` },
        { titulo: 'Avoir hâte',
          html: `<ul>
            <li><b>même sujet</b> → avoir hâte <b>de</b> + infinitif :
                <i>J’ai hâte de le rencontrer.</i></li>
            <li><b>sujets différents</b> → avoir hâte <b>que</b> + subjonctif :
                <i>J’ai hâte que tu le voies.</i></li>
            <li>Soutenu : <i>il me tarde de…</i> · Oral : <i>J’ai trop hâte !</i></li>
          </ul>
          <div class="piege">C’est exactement la règle de <i>vouloir</i> : on ne dit pas
          « je veux que je parte », mais « je veux partir ».</div>` },
        { titulo: 'Attendre un enfant',
          html: `<div class="ex">attendre un enfant · tomber enceinte · la grossesse ·
          une échographie · l’accouchement · la naissance · le congé maternité / paternité ·
          la layette · un prénom mixte</div>` }
      ],
      ejercicios: [2, 3, 4, 5, 6]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'tri', etiqueta:'Révision',
      consigne:'Que fait « tellement » dans chaque phrase ?',
      cols: ['Intensité', 'Quantité', 'Conséquence'],
      items: [
        ['Je suis tellement contente !', 0],
        ['C’est tellement cliché.', 0],
        ['Il est tellement gentil.', 0],
        ['Il y avait tellement de monde.', 1],
        ['Elle a tellement de patience.', 1],
        ['Tellement de gens y croient encore.', 1],
        ['Il parlait tellement vite que je n’ai rien noté.', 2],
        ['J’étais tellement fatigué que je me suis endormi.', 2]
      ] },

    /* 1 */ { t:'trous', etiqueta:'Intensité',
      consigne:'Complète avec tellement, tellement de, si ou tant.',
      q: [
        { enonce:'Il y a ___ préjugés sur ce métier.', r:['tellement de','tant de'], taille:14 },
        { enonce:'Elle est ___ convaincante qu’on l’écoute sans bouger.', r:['tellement','si'], taille:12 },
        { enonce:'J’ai ___ travaillé que je n’ai pas vu l’heure.', r:['tellement','tant'], taille:12 },
        { enonce:'C’était ___ beau !', r:['tellement','si'], taille:12 },
        { enonce:'___ que tu y es, prends du pain.', r:['tant'], taille:10,
          note:'<b>Tant que tu y es</b> = pendant que tu le fais. Ici, <i>tellement</i> est impossible : '
             + 'c’est une expression figée.' },
        { enonce:'Ils ont ___ d’arguments qu’on finit par douter.', r:['tellement','tant'], taille:12 }
      ] },

    /* 2 */ { t:'qcm', etiqueta:'Subjonctif',
      consigne:'Choisis la forme correcte.',
      q: [
        { enonce:'J’ai hâte ___ partir en vacances.', o:['de', 'que', 'à'], r:0 },
        { enonce:'J’ai hâte ___ les vacances commencent.', o:['de', 'que', 'qui'], r:1,
          note:'Sujets différents → <b>avoir hâte que</b> + subjonctif : <i>qu’elles commencent</i>.' },
        { enonce:'Pourvu qu’il ___ beau demain !', o:['fait', 'fasse', 'fera'], r:1 },
        { enonce:'Je t’accompagne, pourvu que tu ___ à l’heure.', o:['es', 'sois', 'seras'], r:1 },
        { enonce:'« Pourvu que… ! » tout seul exprime…',
          o:['une condition', 'un souhait mêlé d’inquiétude', 'un ordre'], r:1 },
        { enonce:'Dans « à moins qu’il ne pleuve », le « ne »…',
          o:['est une négation : il ne pleut pas',
             'n’est pas une négation : c’est un usage soutenu',
             'est une faute'], r:1 }
      ] },

    /* 3 */ { t:'transfo', etiqueta:'Transformer',
      consigne:'Réécris avec la structure demandée.',
      q: [
        { enonce:'J’attends avec impatience de connaître le prénom. <i>(avoir hâte)</i>',
          modele:'J’ai hâte de connaître le prénom.' },
        { enonce:'J’attends avec impatience que le bébé arrive. <i>(avoir hâte)</i>',
          modele:'J’ai hâte que le bébé arrive.',
          note:'Sujets différents : <i>que</i> + subjonctif.' },
        { enonce:'J’espère qu’on ne nous demandera pas le sexe du bébé ! <i>(pourvu que)</i>',
          modele:'Pourvu qu’on ne nous demande pas le sexe du bébé !' },
        { enonce:'Je viendrai à la condition que tu me préviennes. <i>(pourvu que)</i>',
          modele:'Je viendrai, pourvu que tu me préviennes.' },
        { enonce:'Elle était très émue et elle a pleuré. <i>(tellement… que)</i>',
          modele:'Elle était tellement émue qu’elle a pleuré.' }
      ] },

    /* 4 */ { t:'paires', etiqueta:'Lexique',
      consigne:'Le vocabulaire de l’attente d’un enfant.',
      pairs: [
        ['attendre un enfant', 'être enceinte — la façon la plus courante de le dire'],
        ['tomber enceinte', 'le début de la grossesse'],
        ['une échographie', 'l’examen où l’on voit le bébé à l’écran'],
        ['l’accouchement', 'le moment où l’enfant naît'],
        ['la naissance', 'le jour où l’enfant vient au monde'],
        ['le congé maternité', 'l’arrêt de travail de la mère'],
        ['le congé paternité', 'l’arrêt de travail du second parent'],
        ['la layette', 'les premiers vêtements du bébé']
      ] },

    /* 5 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris. Attention au subjonctif : il s’entend.',
      q: [
        { texte:'Pourvu qu’ils ne nous demandent pas le prénom !' },
        { texte:'J’ai tellement hâte que tu le voies.' },
        { texte:'Elle a tellement de choses à préparer avant la naissance.' },
        { texte:'Nous avons hâte de le rencontrer.' }
      ] },

    /* 6 */ { t:'prod', etiqueta:'Production écrite', mots:80,
      consigne:'Exprime trois souhaits pour la fin de ce cycle.',
      sous:'80 palabras. Uno con pourvu que, uno con avoir hâte que, uno con tellement.',
      check: [
        'Un <i>pourvu que</i> + subjonctif.',
        'Un <i>avoir hâte que</i> + subjonctif, et un <i>avoir hâte de</i> + infinitif.',
        'Un <i>tellement… que</i>.',
        'Rien au futur simple après ces structures : c’est la faute classique.'
      ],
      modele:'Pourvu que l’évaluation du 9 ne tombe pas le jour où je travaille ! '
           + 'J’ai tellement révisé ces dernières semaines que je serais déçu de la rater '
           + 'pour une question d’horaire. J’ai hâte de voir mes résultats, mais j’ai surtout '
           + 'hâte qu’on commence l’unité suivante : le thème m’intéresse beaucoup plus. '
           + 'Et pourvu qu’on garde le même groupe : on a mis deux mois à oser parler '
           + 'devant les autres.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   SÉANCE 10 · 4 novembre
   Repaso general y preparación de la evaluación
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's10',
  tipo: 'revision',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Mercredi 4 novembre',
  titulo: 'Révision générale — tout le cycle',
  resumen: 'Todo lo del ciclo en un solo sitio, con un diagnóstico que te dice qué ficha repasar.',
  intro: 'Esta ficha no trae nada nuevo. Sirve para saber en qué estás flojo antes del 9, '
       + 'y cada pregunta te dice a qué ficha volver.',

  secciones: [
    { titulo: 'Diagnostic',
      sous: 'Hazlo sin mirar los recordatorios. Lo que falles indica la ficha a repasar.',
      rappels: [
        { titulo: 'Ce qui tombe à l’évaluation',
          html: `<ul>
            <li><b>Grammaire :</b> ce qui / ce que / ce dont · le double comparatif et
                mieux ≠ meilleur · plutôt que · tellement (intensité, quantité, conséquence) ·
                pourvu que et avoir hâte que + subjonctif.</li>
            <li><b>Lexique :</b> les expressions avec goût et avec valoir · les saveurs et
                les textures · décrire un style · les bonnes manières · les mots du stéréotype ·
                attendre un enfant.</li>
            <li><b>Savoir-faire :</b> prendre des notes · nuancer un désaccord ·
                distinguer un fait d’une opinion · défendre un point de vue.</li>
          </ul>` }
      ],
      ejercicios: [0, 1, 2]
    },
    { titulo: 'Entraînement',
      sous: 'Lo que más puntos da y menos se entrena: oír bien y escribir largo.',
      rappels: [],
      ejercicios: [3, 4]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'qcm', etiqueta:'Diagnostic grammaire',
      consigne:'Doce questions. Chaque réponse dit où réviser.',
      q: [
        { enonce:'___ me dérange, ce sont les remarques sur ma tenue.',
          o:['Ce qui', 'Ce que', 'Ce dont'], r:0, note:'→ Fiche du 21 octobre.' },
        { enonce:'___ j’ai besoin, c’est de temps.',
          o:['Ce qui', 'Ce que', 'Ce dont'], r:2, note:'avoir besoin <b>de</b> → ce dont. Fiche du 21.' },
        { enonce:'Elle chante ___ que son frère.',
          o:['meilleur', 'mieux', 'plus bien'], r:1, note:'Verbe → adverbe → <b>mieux</b>. Fiche du 21.' },
        { enonce:'Ce gâteau est ___ que celui d’hier.',
          o:['mieux', 'meilleur', 'plus bon'], r:1, note:'Nom → adjectif → <b>meilleur</b>. Fiche du 21.' },
        { enonce:'Plus je l’écoute, ___ je le comprends.',
          o:['plus', 'le plus', 'de plus'], r:0, note:'→ Fiche du 21.' },
        { enonce:'Je préfère marcher ___ prendre le métro.',
          o:['plutôt de', 'plutôt que de', 'plutôt'], r:1, note:'→ Fiche du 21.' },
        { enonce:'Il y avait ___ monde qu’on n’a pas pu entrer.',
          o:['tellement', 'tellement de', 'si'], r:1, note:'Devant un nom : tellement <b>de</b>. Fiche du 2 novembre.' },
        { enonce:'J’ai hâte ___ tu arrives.',
          o:['de', 'que', 'à ce que'], r:1, note:'Sujets différents → que + subjonctif. Fiche du 2 novembre.' },
        { enonce:'Pourvu qu’elle ___ y aller !',
          o:['peut', 'puisse', 'pourra'], r:1, note:'pourvu que + subjonctif. Fiche du 2 novembre.' },
        { enonce:'Ça aide ___ comprendre.',
          o:['à', 'de', 'ø'], r:0, note:'→ Fiche du 28 octobre.' },
        { enonce:'Ça permet ___ choisir.',
          o:['à', 'de', 'ø'], r:1, note:'→ Fiche du 28 octobre.' },
        { enonce:'Il ___ mieux prévenir que guérir.',
          o:['vaut', 'faut', 'veut'], r:0, note:'→ Fiche des séances 1 à 4.' }
      ] },

    /* 1 */ { t:'trous', etiqueta:'Diagnostic lexique',
      consigne:'Un mot par phrase. Sans regarder les fiches.',
      q: [
        { enonce:'Un café sans sucre est ___.', r:['amer'], taille:10 },
        { enonce:'La cinquième saveur s’appelle l’___.', r:['umami'], taille:10 },
        { enonce:'Une chemise qui sort du pantalon et qui est froissée fait ___.',
          r:['négligé','negligé'], taille:12 },
        { enonce:'Un jugement porté avant de connaître : un ___.', r:['préjugé'], taille:12 },
        { enonce:'Le même nombre de femmes et d’hommes : la ___.', r:['parité'], taille:12 },
        { enonce:'Filles et garçons dans la même classe : la ___.', r:['mixité'], taille:12 },
        { enonce:'L’arrêt de travail du second parent : le congé ___.', r:['paternité'], taille:12 },
        { enonce:'Ce musée mérite qu’on s’y déplace : ça vaut le ___.', r:['détour'], taille:12 },
        { enonce:'J’ai fini par aimer les olives : j’y ai pris ___.', r:['goût'], taille:10 },
        { enonce:'Pendant une écoute, on note les mots-___.', r:['clés','cles','clefs'], taille:10 }
      ] },

    /* 2 */ { t:'paires', etiqueta:'Diagnostic expressions',
      consigne:'Dix expressions du cycle. Retrouve leur sens.',
      pairs: [
        ['Ça en jette !', 'C’est spectaculaire'],
        ['Ce n’est pas très heureux.', 'C’est raté, dit poliment'],
        ['Ça ne me parle pas.', 'Ça ne me touche pas, sans juger'],
        ['Chacun ses goûts.', 'On ne discute pas ce que les autres aiment'],
        ['Ça vaut le coup.', 'L’effort est justifié'],
        ['Faire valoir son expérience.', 'La mettre en avant'],
        ['Tu généralises.', 'Tu étends à tous ce qui vaut pour quelques-uns'],
        ['Je te l’accorde, mais…', 'Je concède un point avant de répondre'],
        ['Tant que tu y es…', 'Pendant que tu le fais…'],
        ['Il me tarde de…', 'J’ai hâte de… (soutenu)']
      ] },

    /* 3 */ { t:'dictee', etiqueta:'Compréhension orale',
      consigne:'Six phrases du cycle. Écoute et écris.',
      q: [
        { texte:'Ce qui me dérange, ce sont les idées reçues sur ce métier.' },
        { texte:'Plus on goûte tôt, plus on devient curieux.' },
        { texte:'Elle a tellement d’arguments que personne n’ose répondre.' },
        { texte:'Pourvu que le groupe reste le même l’année prochaine.' },
        { texte:'Je prendrais plutôt une salade qu’un dessert.' },
        { texte:'Ce dont nous avons besoin, c’est de temps.' }
      ] },

    /* 4 */ { t:'prod', etiqueta:'Production écrite · format DELF', mots:250,
      consigne:'Le magazine de ton quartier publie un article affirmant que « les ateliers '
             + 'de cuisine à l’école sont une perte de temps ». Tu écris au courrier des '
             + 'lecteurs pour défendre ton point de vue.',
      sous:'250 palabras, formato carta formal. Es el formato exacto de la producción escrita del DELF B2.',
      check: [
        'En-tête : <i>Madame, Monsieur,</i> — et une formule finale de politesse.',
        'Une introduction qui rappelle l’article et annonce ta position.',
        'Trois arguments, chacun avec un exemple ou un chiffre.',
        'Une concession : <i>Je conçois que…, néanmoins…</i>',
        'Des connecteurs : d’abord, par ailleurs, en revanche, enfin, en somme.',
        'Au moins deux structures du cycle (mise en relief, tellement… que, ça permet de…).',
        '250 mots ± 10 % : en dessous de 220, on perd des points.'
      ],
      modele:'Madame, Monsieur,<br><br>J’ai lu avec intérêt, dans votre dernier numéro, '
           + 'l’article affirmant que les ateliers de cuisine à l’école seraient une perte '
           + 'de temps. Permettez-moi de ne pas partager cet avis.<br><br>'
           + 'D’abord, ces ateliers ne servent pas à former des cuisiniers : ils '
           + 'apprennent à nommer ce que l’on goûte. Ce qui se joue là, c’est le vocabulaire '
           + 'et la curiosité, et cela vaut pour toutes les matières. Par ailleurs, un enfant '
           + 'qui a manipulé un légume l’accepte plus facilement à table : ça évite '
           + 'd’entrer dans le rapport de force quotidien que connaissent toutes les familles. '
           + 'Enfin, ces séances sont les seules où l’on travaille ensemble sans être noté, '
           + 'ce qui permet à des élèves en difficulté de reprendre confiance.<br><br>'
           + 'Je conçois que le temps scolaire soit compté et que chaque heure prise ait un '
           + 'coût. Néanmoins, une heure par mois ne met aucun programme en danger, et je '
           + 'connais peu d’activités dont les effets soient aussi visibles.<br><br>'
           + 'En somme, il ne s’agit pas d’apprendre à faire la cuisine, mais d’apprendre à '
           + 'goûter, à décrire et à écouter l’avis des autres. Cela me semble valoir '
           + 'largement une heure de classe.<br><br>'
           + 'Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations '
           + 'distinguées.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   SÉANCE 11 · 9 novembre · Évaluation collective
   Prueba de ensayo completa, en el formato del DELF B2.
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's11',
  tipo: 'eval',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Lundi 9 novembre',
  titulo: 'Épreuve blanche — écrit',
  resumen: 'Una prueba de ensayo completa: comprensión oral, comprensión escrita y producción escrita.',
  intro: 'Mismo formato que la evaluación del lunes. Hazla de una sentada y cronometrada: '
       + 'es la única forma de saber si el tiempo te alcanza.',

  secciones: [
    { titulo: 'Compréhension de l’oral',
      sous: 'Escucha el documento dos veces, toma notas, y después responde. 10 minutos.',
      rappels: [
        { titulo: 'Le document — une chronique de radio',
          html: `<p>Écoute sans lire les questions la première fois, puis reprends.</p>
          <p><button class="btn-audio" onclick="hablar('Bonjour à tous. On parle aujourd’hui d’un métier dont presque personne n’a entendu parler : éducateur au goût. Quentin exerce depuis six ans dans le sud de la France. Son travail ne consiste ni à soigner, ni à faire maigrir : il fait goûter, à l’aveugle, des aliments que les enfants croient connaître. Trois enfants sur quatre, dit-il, refusent un légume uniquement parce qu’ils n’en connaissent pas le nom. Dans ses ateliers, on ne dit jamais c’est bon ou c’est mauvais : on cherche le mot juste. Est-ce que c’est acide ? amer ? croquant ? Depuis deux ans, la demande a augmenté de quinze pour cent, et elle vient maintenant des adultes autant que des écoles. Son seul problème, reconnaît-il, c’est le budget des établissements, qui se décide en mars pour toute l’année.',this)">🔊 Écouter le document</button></p>
          <p class="note">Voix de synthèse : le débit est régulier, un vrai locuteur sera plus rapide.</p>` }
      ],
      ejercicios: [0]
    },
    { titulo: 'Compréhension des écrits',
      sous: 'Lee el texto y responde. 15 minutos.',
      rappels: [
        { titulo: 'Le texte — « Le rayon rose n’est pas une fatalité »',
          html: `<p>Chaque mois de décembre, la même scène se répète dans les magasins de
          jouets : d’un côté les boîtes roses, de l’autre les boîtes bleues, et au milieu
          des parents qui hésitent. L’organisation de ces rayons n’a pourtant rien d’ancien.
          Dans les catalogues des années 1970, les mêmes jeux de construction étaient
          proposés aux filles comme aux garçons ; c’est à partir des années 1980 que le
          marketing a séparé les univers, parce qu’un rayon genré vend deux fois le même
          produit à une famille qui a un garçon et une fille.</p>
          <p>Les conséquences dépassent le commerce. Les jeux de construction développent
          la représentation dans l’espace ; les jeux d’imitation, le langage et la
          relation. Priver durablement un enfant des uns ou des autres, ce n’est pas
          neutre. Plusieurs enseignes ont donc supprimé les panneaux « filles » et
          « garçons » de leurs catalogues, sans supprimer aucun jouet : ce n’est pas le
          jouet qui pose problème, c’est le panneau.</p>
          <p>Reste l’objection la plus fréquente : « les enfants choisissent eux-mêmes ».
          C’est vrai, et c’est précisément la question. À quatre ans, un enfant a déjà vu
          des centaines d’images qui lui disent ce qui est pour lui. Son choix est libre ;
          il n’est pas pour autant spontané.</p>` }
      ],
      ejercicios: [1, 2]
    },
    { titulo: 'Production écrite',
      sous: '45 minutos, 250 palabras. Sin diccionario.',
      rappels: [],
      ejercicios: [3]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'qcm', etiqueta:'Compréhension de l’oral',
      consigne:'Six questions sur la chronique.',
      q: [
        { enonce:'Le métier de Quentin consiste à…',
          o:['soigner par l’alimentation', 'faire goûter et faire nommer',
             'préparer des repas pour les écoles'], r:1 },
        { enonce:'Depuis combien de temps exerce-t-il ?',
          o:['deux ans', 'six ans', 'quinze ans'], r:1 },
        { enonce:'Pourquoi, selon lui, les enfants refusent-ils un légume ?',
          o:['parce qu’il est amer', 'parce qu’ils n’en connaissent pas le nom',
             'parce que leurs parents ne l’aiment pas'], r:1,
          note:'« Trois enfants sur quatre refusent un légume uniquement parce qu’ils n’en '
             + 'connaissent pas le nom. »' },
        { enonce:'Dans ses ateliers, on ne dit jamais…',
          o:['acide ou amer', 'c’est bon ou c’est mauvais', 'je n’aime pas'], r:1 },
        { enonce:'La demande a augmenté de…',
          o:['quinze pour cent en deux ans', 'cinquante pour cent en deux ans',
             'quinze pour cent en six ans'], r:0 },
        { enonce:'Son principal problème, c’est…',
          o:['le manque de locaux', 'le budget des établissements, décidé en mars',
             'le désintérêt des adultes'], r:1 }
      ] },

    /* 1 */ { t:'qcm', etiqueta:'Compréhension des écrits',
      consigne:'Six questions sur le texte.',
      q: [
        { enonce:'Selon le texte, la séparation des rayons roses et bleus…',
          o:['a toujours existé', 'date des années 1980', 'date des années 1970'], r:1 },
        { enonce:'Quelle raison commerciale le texte donne-t-il ?',
          o:['les enfants le demandent',
             'cela permet de vendre deux fois le même produit à une même famille',
             'cela coûte moins cher à fabriquer'], r:1 },
        { enonce:'Les jeux de construction développent surtout…',
          o:['le langage', 'la représentation dans l’espace', 'la relation aux autres'], r:1 },
        { enonce:'Qu’ont fait plusieurs enseignes ?',
          o:['elles ont supprimé certains jouets',
             'elles ont supprimé les panneaux « filles » et « garçons »',
             'elles ont créé un rayon neutre'], r:1 },
        { enonce:'« Son choix est libre ; il n’est pas pour autant spontané. » Cela veut dire :',
          o:['l’enfant ne choisit pas vraiment',
             'l’enfant choisit, mais ce qu’il choisit a été préparé par ce qu’il a vu',
             'l’enfant est obligé de choisir'], r:1,
          note:'C’est la phrase la plus difficile du texte, et c’est souvent celle qui est posée : '
             + 'une opposition tenue en une seule phrase.' },
        { enonce:'Le ton général de l’article est…',
          o:['indigné', 'argumenté et mesuré', 'ironique'], r:1 }
      ] },

    /* 2 */ { t:'trous', etiqueta:'Grammaire en contexte',
      consigne:'Complète ce résumé du texte.',
      q: [
        { enonce:'___ le texte dénonce, ce n’est pas le jouet, c’est le panneau.',
          r:['ce que','ce qu'], taille:12 },
        { enonce:'Les rayons genrés ___ de vendre deux fois le même produit. <i>(permettre)</i>',
          r:['permettent'], taille:14 },
        { enonce:'___ on voit d’images, ___ on croit choisir librement.',
          r:['plus… moins','plus... moins','plus…moins'], taille:20,
          note:'On attendait <b>Plus… moins…</b> : les deux moitiés du double comparatif.' },
        { enonce:'Il y a ___ images autour d’eux qu’un enfant de quatre ans sait déjà ce qui est « pour lui ».',
          r:['tellement d','tant d','tellement de','tant de'], taille:14 },
        { enonce:'Certaines enseignes ont changé leurs catalogues ___ attendre une loi.',
          r:['plutôt que d','plutôt que de','sans'], taille:16 },
        { enonce:'___ ces jeux développent, c’est la représentation dans l’espace.',
          r:['ce que','ce qu'], taille:12 }
      ] },

    /* 3 */ { t:'prod', etiqueta:'Production écrite', mots:250,
      consigne:'Le conseil de ton quartier envisage d’organiser une journée « jouets sans '
             + 'étiquette » dans la bibliothèque municipale. On demande leur avis aux '
             + 'habitants. Tu écris une lettre au responsable pour donner le tien.',
      sous:'250 palabras. 45 minutos. Cronométralo de verdad.',
      check: [
        'Formule d’appel et formule finale de politesse.',
        'Ta position annoncée dès l’introduction.',
        'Trois arguments développés, avec des exemples.',
        'Une objection prise au sérieux, puis réfutée.',
        'Une proposition concrète pour la journée.',
        'Connecteurs variés : tout d’abord, en outre, certes… mais, en définitive.',
        'Relecture des accords et des subjonctifs : c’est là que se perdent les points.'
      ] }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   SÉANCE 12 · 11 novembre · Évaluation individuelle
   Preparación de la prueba oral.
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's12',
  tipo: 'eval',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Mercredi 11 novembre',
  titulo: 'Préparer l’oral',
  resumen: 'El formato del oral B2, las frases que lo estructuran y tres temas para ensayar en voz alta.',
  intro: 'En el oral no se evalúa lo que sabes: se evalúa cómo lo organizas. '
       + 'Estas frases hechas valen más que diez palabras nuevas.',

  secciones: [
    { titulo: 'Le format',
      sous: 'Cómo es la prueba, y las frases que la sostienen.',
      rappels: [
        { titulo: 'L’épreuve, minute par minute',
          html: `<ul>
            <li><b>30 minutes de préparation</b> à partir d’un court document déclencheur.</li>
            <li><b>Un exposé d’une dizaine de minutes</b> : tu dégages le thème, tu annonces
                ta position et ton plan, tu développes, tu conclus.</li>
            <li><b>Un débat</b> avec l’examinateur : il objecte, tu défends, tu nuances.</li>
          </ul>
          <div class="piege"><b>L’erreur la plus coûteuse :</b> résumer le document.
          On attend que tu en <b>dégages le thème</b> et que tu donnes <b>ton</b> avis.
          Le document est un point de départ, pas le sujet.</div>` },
        { titulo: 'Les phrases qui structurent',
          html: `<ul>
            <li><b>Annoncer :</b> Ce document soulève la question de… · Je traiterai ce point
                en deux temps : d’abord…, ensuite…</li>
            <li><b>Enchaîner :</b> J’en viens à mon second point. · Cela m’amène à…</li>
            <li><b>Illustrer :</b> Je prendrai un exemple concret. · Pour ne citer qu’un cas…</li>
            <li><b>Nuancer :</b> Certes…, mais… · Il faut distinguer deux choses. ·
                Cela dépend largement du contexte.</li>
            <li><b>Gagner du temps :</b> C’est une bonne question. · Si je comprends bien,
                vous me demandez si… · Permettez-moi de préciser.</li>
            <li><b>Conclure :</b> En définitive… · Pour résumer ma position…</li>
          </ul>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: 'S’entraîner',
      sous: 'Del francés hablado al francés de examen, y tres temas para ensayar.',
      rappels: [],
      ejercicios: [2, 3]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'paires', etiqueta:'Structurer',
      consigne:'À quoi sert chaque formule ?',
      pairs: [
        ['Ce document soulève la question de…', 'Annoncer le thème'],
        ['Je traiterai ce point en deux temps.', 'Annoncer le plan'],
        ['J’en viens à mon second point.', 'Enchaîner'],
        ['Pour ne citer qu’un cas…', 'Illustrer'],
        ['Certes…, mais…', 'Concéder puis nuancer'],
        ['Il faut distinguer deux choses.', 'Refuser une question mal posée'],
        ['Si je comprends bien, vous me demandez si…', 'Gagner quelques secondes'],
        ['En définitive…', 'Conclure']
      ] },

    /* 1 */ { t:'qcm', etiqueta:'Stratégie',
      consigne:'Six décisions pendant l’épreuve.',
      q: [
        { enonce:'Pendant les 30 minutes de préparation, tu écris…',
          o:['ton exposé mot à mot', 'un plan avec des mots-clés', 'rien, pour rester naturel'], r:1,
          note:'Un texte rédigé se lit, et cela s’entend immédiatement. Un plan se parle.' },
        { enonce:'Tu commences ton exposé par…',
          o:['le résumé du document', 'le thème qu’il soulève et ta position',
             'ta biographie'], r:1 },
        { enonce:'Tu ne connais pas un mot pendant le débat. Tu…',
          o:['t’arrêtes', 'le contournes : « une sorte de… », « ce qu’on utilise pour… »',
             'le dis dans ta langue'], r:1 },
        { enonce:'L’examinateur t’objecte quelque chose de juste. Tu…',
          o:['changes d’avis complètement', 'le concèdes et tu précises ta position',
             'répètes ton argument'], r:1,
          note:'Concéder n’est pas perdre : c’est exactement ce qu’on évalue au B2.' },
        { enonce:'Ton exposé doit durer…',
          o:['trois minutes', 'une dizaine de minutes', 'le plus longtemps possible'], r:1 },
        { enonce:'Tu fais une faute et tu t’en rends compte. Tu…',
          o:['t’excuses longuement', 'te corriges en un mot et tu continues',
             'reprends la phrase depuis le début'], r:1,
          note:'L’autocorrection est <b>valorisée</b> dans la grille. Elle prouve que tu te contrôles.' }
      ] },

    /* 2 */ { t:'transfo', etiqueta:'Registre',
      consigne:'Réécris chaque phrase en français d’examen.',
      q: [
        { enonce:'Ça pique les yeux, ces pubs !',
          modele:'Ces publicités me paraissent visuellement très agressives.' },
        { enonce:'Les mecs font jamais le ménage, c’est n’importe quoi.',
          modele:'On entend souvent que les hommes ne participent pas aux tâches ménagères ; '
               + 'cette affirmation me semble très exagérée.' },
        { enonce:'Moi je trouve que c’est trop cliché.',
          modele:'Pour ma part, je trouve cette image assez stéréotypée.' },
        { enonce:'C’est top, ce truc.',
          modele:'C’est une initiative tout à fait réussie.' },
        { enonce:'Bah ça dépend, quoi.',
          modele:'Cela dépend largement du contexte, et c’est justement ce qui rend la question '
               + 'intéressante.' }
      ] },

    /* 3 */ { t:'prod', etiqueta:'Plan d’exposé',
      consigne:'Choisis un sujet et prépare le plan de ton exposé — puis dis-le à voix haute, '
             + 'chronomètre en main.',
      sous:'Tres temas posibles. Escribe el plan, no el texto. Después grábate: el oído lo oye todo.',
      check: [
        '<b>Sujet A :</b> faut-il apprendre à goûter à l’école ?',
        '<b>Sujet B :</b> les rayons de jouets doivent-ils être neutres ?',
        '<b>Sujet C :</b> peut-on encore dire « chacun ses goûts » quand il s’agit de style ?',
        '— Thème dégagé en une phrase, pas un résumé.',
        '— Ta position, annoncée dès le début.',
        '— Deux parties, deux ou trois idées chacune, un exemple par idée.',
        '— Une objection anticipée, que tu traites toi-même.',
        '— Une conclusion qui ne répète pas l’introduction.'
      ],
      modele:'<b>Sujet B — plan</b><br>'
           + '<i>Thème :</i> ce document pose la question de la liberté réelle de choix des enfants.<br>'
           + '<i>Position :</i> favorable à la neutralité des rayons, mais pas à l’interdiction de quoi que ce soit.<br>'
           + '<b>1. Ce que le rayon genré produit</b> — l’habitude précède le goût (ex. : jeux de '
           + 'construction) · l’intérêt commercial (ex. : vendre deux fois) · l’effet sur les métiers choisis.<br>'
           + '<b>2. Ce qu’une neutralité raisonnable changerait</b> — supprimer le panneau, pas le jouet · '
           + 'laisser la famille décider · l’exemple des enseignes qui l’ont déjà fait.<br>'
           + '<i>Objection anticipée :</i> « les enfants choisissent seuls » → certes, mais à quatre '
           + 'ans le choix est déjà informé par des centaines d’images.<br>'
           + '<i>Conclusion :</i> il ne s’agit pas d’imposer, mais de cesser de suggérer.' }
  ]
});
