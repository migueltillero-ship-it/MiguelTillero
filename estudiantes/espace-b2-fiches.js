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
   UNITÉ 1 · p. 12-13 — LES ENFANTS ET LEURS GOÛTS
   La apertura de la unidad: las seis viñetas, la conversación de los
   padres, y el primer encuentro con el doble comparativo.
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'u1-p12',
  tipo: 'revision',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Unité 1 · p. 12-13',
  titulo: 'Les enfants et leurs goûts',
  resumen: 'Las seis viñetas de apertura, el vocabulario del gusto dudoso, «n’importe quoi» y el doble comparativo tal como aparece por primera vez.',
  intro: 'La página con la que abrimos la unidad. Parece ligera y es la que mete, sin decirlo, '
       + 'el doble comparativo y media docena de expresiones que después salen en todas partes.',

  secciones: [
    { titulo: '1. Les six vignettes',
      sous: 'Qué dominio toca cada una —la actividad 2— y el vocabulario que traen.',
      rappels: [
        { titulo: 'Le ton de la page',
          html: `<p>La entradilla lo dice en broma y en serio a la vez :</p>
          <div class="ex"><i>« Disons-nous la vérité : les enfants n’ont pas de goût. Mais ils
          se moquent du regard des autres, ils font ce qu’ils veulent, et c’est pour ça
          qu’on les aime ! »</i></div>
          <p>Esa última idea —hacer lo que a uno le gusta sin mirar a los demás— es la que
          recorre toda la unidad, hasta el artículo de la página 16.</p>` },
        { titulo: 'Le vocabulaire des vignettes',
          html: `<ul>
            <li><b>avoir des goûts douteux</b> — tener un gusto discutible. <i>Douteux</i> viene
                de <i>douter</i> : literalmente, que hace dudar.</li>
            <li><b>kiffer</b> <i>(familier)</i> — encantarle a uno algo. De uso muy extendido
                entre jóvenes ; en un examen, mejor <i>adorer</i>.</li>
            <li><b>beurk !</b> — la onomatopeya del asco. El equivalente de nuestro « puaj ».</li>
            <li><b>un doudou</b> — el peluche o trapito al que un niño se aferra.</li>
            <li><b>casser les codes</b> — saltarse las reglas establecidas.</li>
            <li><b>kitsch</b> · <b>mal assorti</b> — recargado y mal combinado. Los dos vuelven
                en la página 17.</li>
            <li><b>avoir des goûts de luxe</b> — tener gustos caros.</li>
          </ul>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: '2. N’importe quoi, n’importe comment',
      sous: 'Dos frases de la actividad 4 que esconden una estructura muy útil.',
      rappels: [
        { titulo: 'La famille de « n’importe »',
          html: `<p>Se forma con <b>n’importe</b> + una palabra interrogativa, y siempre añade
          la idea de <b>sin criterio, sin elegir</b> :</p>
          <ul>
            <li><b>n’importe quoi</b> (cosa) — <i>Il mange n’importe quoi.</i></li>
            <li><b>n’importe qui</b> (persona) — <i>Elle sort avec n’importe qui.</i></li>
            <li><b>n’importe comment</b> (manera) — <i>Il s’habille n’importe comment.</i></li>
            <li><b>n’importe où</b> (lugar) · <b>n’importe quand</b> (momento) ·
                <b>n’importe lequel</b> (elección entre varios).</li>
          </ul>
          <div class="piege">Solo <b>« C’est n’importe quoi ! »</b> funciona como exclamación,
          y entonces significa otra cosa : <i>es absurdo, no tiene sentido</i>. Es la de la
          lista de la página 19.</div>` }
      ],
      ejercicios: [2, 3]
    },
    { titulo: '3. Plus… plus, par la porte de derrière',
      sous: 'Tres frases de las viñetas. Es la primera vez que aparece, sin que nadie lo anuncie.',
      rappels: [
        { titulo: 'Las tres frases de la página 12',
          html: `<div class="ex">Plus c’est chimique, <b>plus</b> ils aiment.<br>
          Plus ça brille, <b>mieux</b> c’est.<br>
          Plus c’est absurde, <b>plus</b> ils aiment.</div>
          <p>La regla entera está en la página 23, pero aquí ya puedes ver lo esencial :
          dos mitades, y en cada una un verbo. Y que <b>mieux</b> aparece donde esperarías
          « plus c’est bien ».</p>` }
      ],
      ejercicios: [4, 5]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'paires', etiqueta:'Act. 2',
      consigne:'Associe chaque vignette au domaine qu’elle concerne.',
      sous:'Es la actividad 2 del libro.',
      pairs: [
        ['Ils kiffent les pires bonbons et détestent les légumes.', 'l’alimentation'],
        ['Ils s’habillent n’importe comment et adorent ce qui brille.', 'la mode'],
        ['Ils écoutent des chansons ridicules.', 'les choix culturels'],
        ['Ils cassent les codes de l’orthographe et de la syntaxe.', 'le langage'],
        ['Ils ont des goûts douteux en matière de blagues.', 'l’humour'],
        ['Ils ont mille peluches mais adorent le vieux doudou.', 'les objets et l’attachement']
      ],
      aide:'La actividad 2 del libro solo pide cuatro (mode, alimentation, choix culturels, '
         + 'langage). Las otras dos están aquí porque también dicen algo del gusto.' },

    /* 1 */ { t:'trous', etiqueta:'Le vocabulaire',
      consigne:'Complète avec les mots des vignettes.',
      q: [
        { enonce:'Avoir un goût discutable, c’est avoir des goûts ___.', r:['douteux'], taille:12 },
        { enonce:'Le vieux peluche sans un œil, c’est son ___.', r:['doudou'], taille:12 },
        { enonce:'Ne pas respecter les règles établies, c’est ___ les codes.',
          r:['casser'], taille:12 },
        { enonce:'Des couleurs et des motifs qui ne vont pas ensemble : c’est mal ___.',
          r:['assorti'], taille:12 },
        { enonce:'Aimer les choses chères, c’est avoir des goûts de ___.', r:['luxe'], taille:12 },
        { enonce:'« Les carottes, ___ ! » dit l’enfant de la vignette 2.',
          r:['beurk'], taille:12 }
      ] },

    /* 2 */ { t:'qcm', etiqueta:'N’importe',
      consigne:'Choisis la forme correcte.',
      q: [
        { enonce:'Il s’habille ___ : il met le premier vêtement qu’il trouve.',
          o:['n’importe quoi', 'n’importe comment', 'n’importe qui'], r:1,
          note:'Se trata de <b>la manera</b> → <i>comment</i>.' },
        { enonce:'Il mange ___ : des bonbons au petit-déjeuner.',
          o:['n’importe quoi', 'n’importe comment', 'n’importe où'], r:0 },
        { enonce:'Ne laisse pas entrer ___ !',
          o:['n’importe quoi', 'n’importe qui', 'n’importe lequel'], r:1 },
        { enonce:'Tu peux m’appeler ___, je suis chez moi toute la journée.',
          o:['n’importe quand', 'n’importe comment', 'n’importe quoi'], r:0 },
        { enonce:'« Les enfants n’ont pas de goût ?  — Mais c’est ___ ! »',
          o:['n’importe quoi', 'n’importe comment', 'n’importe qui'], r:0,
          note:'Aquí es la exclamación : <b>c’est n’importe quoi</b> = eso es absurdo. '
             + 'Está en la lista de la actividad 22, página 19.' }
      ] },

    /* 3 */ { t:'paires', etiqueta:'Act. 4a',
      consigne:'Les quatre phrases du livre : associe-les à ce qu’elles veulent vraiment dire.',
      sous:'Fíjate en cuáles son críticas y cuál depende del tono.',
      pairs: [
        ['Il/Elle s’habille n’importe comment.', 'sans faire attention à ce qu’il/elle met'],
        ['Il/Elle n’a pas de goût.', 'ne sait pas choisir ce qui est beau ou élégant'],
        ['Il/Elle mange n’importe quoi.', 'sans faire attention à ce qu’il/elle mange'],
        ['Il/Elle a des goûts de luxe.', 'aime les choses chères et raffinées']
      ],
      aide:'Fíjate en que tres son <b>críticas</b> y la cuarta no lo es del todo : '
         + '« avoir des goûts de luxe » puede ser un reproche o un elogio según el tono. '
         + 'La actividad 4b te pide justamente de quién lo dirías tú.' },

    /* 4 */ { t:'trous', etiqueta:'Plus… plus',
      consigne:'Complète, comme dans les vignettes.',
      q: [
        { enonce:'Plus c’est chimique, ___ ils aiment.', r:['plus'], taille:10 },
        { enonce:'Plus ça brille, ___ c’est.', r:['mieux'], taille:10,
          note:'No « plus c’est bien » : el irregular de <i>bien</i> es <b>mieux</b>.' },
        { enonce:'Plus c’est absurde, ___ ils aiment.', r:['plus'], taille:10 },
        { enonce:'___ je vieillis, moins je suis la mode.', r:['plus'], taille:10 },
        { enonce:'Moins il y a de sucre, ___ c’est. <i>(= plus c’est bon)</i>',
          r:['meilleur'], taille:10 }
      ] },

    /* 5 */ { t:'prod', etiqueta:'Act. 1 et 4b', mots:80,
      consigne:'Quelle vignette t’amuse le plus, et pourquoi ? De qui pourrais-tu dire les '
             + 'quatre phrases de l’activité 4 ?',
      sous:'80 palabras. Piensa en niños que conozcas — o en adultos, que también valen.',
      check: [
        'La viñeta que eliges, y por qué te hace gracia.',
        'Un niño (o un adulto) de quien dirías una de las cuatro frases, con el ejemplo.',
        'Dos palabras de las viñetas (douteux, kitsch, mal assorti, casser les codes…).',
        'Un <b>plus… plus</b> o un <b>plus… mieux</b>.',
        'Una de las frases con <b>n’importe</b>.'
      ],
      modele:'La vignette qui m’amuse le plus, c’est celle du doudou : mon neveu a une '
           + 'chambre pleine de peluches neuves, et il dort avec un vieux lapin à qui il '
           + 'manque une oreille. Plus c’est abîmé, plus il y tient. Pour les vêtements, c’est '
           + 'pareil : il s’habille n’importe comment, tout est mal assorti, et quand sa mère '
           + 'lui propose autre chose, il répond que c’est elle qui a des goûts douteux. Celui '
           + 'qui a vraiment des goûts de luxe, dans la famille, c’est plutôt mon oncle.' }
  ]
});

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
      consigne:'Associe chaque mot à ce qu’il désigne.',
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
      consigne:'D’après l’article de Manu, quelle impression donne chaque chose ?',
      sous:'Es la actividad 5b de la página 14.',
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
      consigne:'Choisis la construction correcte.',
      sous:'Es lo que más se confunde: cada fórmula pide una continuación distinta.',
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
      consigne:'Complète avec les expressions de l’encadré.',
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
      consigne:'Associe chaque vêtement à l’expression employée par la chroniqueuse.',
      sous:'Cuidado con el acuerdo: es la mitad del ejercicio 6b.',
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
      consigne:'Quatre questions sur « Fashion faux pas ! ».',
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
             + '(Activité 7)',
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
      consigne:'Cinq questions sur l’article.',
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
      consigne:'Complète avec c’est quand, c’est ce qui, c’est ce que ou c’est une question de.',
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
      consigne:'Définis trois de ces concepts avec tes mots : la laideur, le kitsch, '
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
      consigne:'Cette phrase exagère ou atténue le propos ?',
      sous:'Es la actividad 14c del libro.',
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
      consigne:'Le dit-on poliment, ou ouvertement ?',
      sous:'Las de la izquierda puedes usarlas delante de la persona. Las otras, no.',
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
      consigne:'Que fait « plutôt » dans chaque phrase ?',
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
      consigne:'Donne des exemples — en décoration ou en mode — de ce qui ne se fait pas, '
             + 'ce qui se fait, et ce qui te plaît personnellement même si ça ne se porte plus. '
             + '(Activité 11)',
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
   Vidéo : Mcfly et Carlito avec Carmel · Livre p. 19 (act. 18 à 24)
   ---------------------------------------------------------------------
   No es un cuestionario sobre un vídeo: es un reto con reloj, una mesa en
   la que hay que señalar, un orden que reconstruir y una cena en la que
   se decide qué hacer. El vídeo está dentro y sirve para comprobar.
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'savoir-vivre',
  tipo: 'outil',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Parcours · livre p. 19',
  titulo: 'Ça se fait, ça ne se fait pas — à table, ici et là-bas',
  resumen: 'Un reto de un minuto, una mesa que hay que saber leer, una cena con decisiones y la comparación con lo de aquí. Con el vídeo dentro.',
  intro: 'Seis etapas y ninguna es un cuestionario: un reto contrarreloj, una mesa en la que '
       + 'hay que señalar, un orden que reconstruir y una cena en la que decides tú. '
       + 'El vídeo está dentro para comprobarlo todo.',

  video: {
    id: 'sWtjnwMbEVU',
    titulo: 'Mcfly et Carlito avec Carmel — « On apprend les bonnes manières à table » (35 min)'
  },

  secciones: [
    { titulo: '1. Les mots pour juger',
      sous: 'Las expresiones de la actividad 22, que son las que necesitas para todo lo demás.',
      rappels: [
        { titulo: 'La boîte à expressions (act. 22)',
          html: `<ul>
            <li><b>Ça ne se fait pas.</b> — la regla social, sin más.</li>
            <li><b>C’est la base.</b> — es lo mínimo.</li>
            <li><b>Ça s’apprend.</b> — no se nace sabiéndolo.</li>
            <li><b>Ça donne une mauvaise première impression.</b> — la consecuencia.</li>
            <li><b>Ça met mal à l’aise.</b> · <b>C’est gênant / vexant.</b></li>
            <li><b>Ça fait vulgaire / mauvais genre.</b> · <b>C’est n’importe quoi.</b></li>
          </ul>
          <div class="ex">El ejemplo del libro: <i>« Mettre le couteau dans la bouche, ça ne se
          fait pas. Ça me choque ! »</i></div>` }
      ],
      ejercicios: [0, 1]
    },

    { titulo: '2. Le défi : une minute',
      sous: 'Doce reglas, sesenta segundos. Lo que falles te lo dice al final.',
      rappels: [],
      ejercicios: [2]
    },

    { titulo: '3. La table',
      sous: 'Saber leer una mesa puesta, y en qué orden llega cada cosa.',
      rappels: [
        { titulo: 'Une table dressée',
          html: `<p>La regla que lo ordena todo: <b>los cubiertos se usan de fuera hacia
          dentro</b>, en el orden en que llegan los platos. Y los vasos van arriba a la
          derecha, el del agua más grande que el del vino.</p>
          <div class="ex">le pain se pose <b>à gauche</b>, directement sur la nappe ou sur
          une petite assiette — jamais dans l’assiette.</div>` }
      ],
      ejercicios: [3, 4]
    },

    { titulo: '4. Le dîner : à toi de décider',
      sous: 'Seis momentos de una cena. Elige y mira lo que pasa.',
      rappels: [],
      ejercicios: [5]
    },

    { titulo: '5. La vidéo',
      sous: 'Para comprobar, y para oír cómo lo cuenta Carmel.',
      rappels: [
        { titulo: 'Avant de regarder',
          html: `<p>Tres personas hablan deprisa y se interrumpen: es normal perderse.
          Escucha las <b>ideas</b> y los <b>ejemplos</b>, no las palabras.</p>` }
      ],
      ejercicios: [6, 7]
    },

    { titulo: '6. La langue, et la nétiquette',
      sous: 'Lo de las actividades 19, 20, 23 y 24.',
      rappels: [
        { titulo: 'Plus… plus · valoir',
          html: `<div class="ex">Plus je vieillis, plus je tiens à ces règles.<br>
          Il vaut mieux éviter. · Mieux vaut prévenir que guérir.<br>
          Un homme averti en vaut deux. · Deux précautions valent mieux qu’une.</div>
          <div class="piege">Delante de un nombre hace falta <b>de</b>:
          <i>plus <b>de</b> monde</i>, <i>moins <b>d’</b>objets</i>.</div>` },
        { titulo: 'La nétiquette',
          html: `<p>La buena educación, pero en línea. Cambia el soporte, no la idea:
          <b>no incomodar al otro</b>.</p>` }
      ],
      ejercicios: [8, 9, 10, 11]
    },

    { titulo: '7. Et chez toi ?',
      sous: 'Lo contrastivo, que es lo que vamos a comentar en clase.',
      rappels: [],
      ejercicios: [12]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'paires', etiqueta:'Les expressions',
      consigne:'Associe chaque expression à ce qu’elle veut vraiment dire.',
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
      consigne:'Que dirais-tu dans chaque situation ?',
      q: [
        { enonce:'Quelqu’un met son couteau dans la bouche.',
          o:['Ça ne se fait pas.', 'C’est vexant.', 'Ça s’apprend.'], r:0,
          note:'Es el ejemplo del libro. <b>Vexant</b> no: no hiere a nadie.' },
        { enonce:'Un ami arrive à un entretien avec un t-shirt taché.',
          o:['C’est n’importe quoi.', 'Ça donne une mauvaise première impression.', 'C’est la base.'],
          r:1 },
        { enonce:'Quelqu’un te reprend devant tout le monde à table.',
          o:['Ça fait vulgaire.', 'C’est vexant et ça met mal à l’aise.', 'Ça s’apprend.'], r:1 },
        { enonce:'Alguien dice: « nadie me enseñó esas reglas ».',
          o:['Ça fait vulgaire.', 'Justement : ça s’apprend.', 'C’est la base.'], r:1,
          note:'Es la respuesta amable: no es un defecto, es algo que se aprende.' }
      ] },

    /* 2 */ { t:'defi', etiqueta:'Contre la montre', segundos:60,
      consigne:'Douze règles françaises, une carte à la fois : ça se fait ou ça ne se fait pas ?',
      sous:'Si fallas, al final te dice cuáles. Puedes repetirlo las veces que quieras.',
      cols: ['Ça se fait', 'Ça ne se fait pas'],
      items: [
        ['Garder les poignets sur la table.', 0],
        ['Poser son pain sur la nappe, à gauche.', 0],
        ['Rompre le pain avec les doigts.', 0],
        ['Laisser sa serviette froissée à côté de l’assiette, à la fin.', 0],
        ['Prendre la soupe sur le bord de l’assiette.', 0],
        ['Décortiquer une crevette avec les doigts, à l’apéritif.', 0],
        ['Mettre les coudes sur la table.', 1],
        ['Couper son pain avec un couteau.', 1],
        ['Mettre son couteau dans la bouche.', 1],
        ['Lever le petit doigt en buvant son thé.', 1],
        ['Saucer son assiette avec un morceau de pain tenu à la main.', 1],
        ['Replier soigneusement sa serviette à la fin du repas.', 1]
      ],
      aide:'Las dos que más sorprenden: las <b>manos</b> se quedan a la vista (viene de cuando '
         + 'había que demostrar que no se escondía nada), y la <b>servilleta</b> no se vuelve a '
         + 'doblar — doblarla significaría que uno cuenta con volver a comer ahí.' },

    /* 3 */ { t:'points', etiqueta:'Montre-moi',
      consigne:'Montre sur la table ce qu’on te demande. Huit fois.',
      sous:'Pulsa directamente sobre el dibujo.',
      puntos: [
        { id:'assiette',   nombre:'l’assiette' },
        { id:'fourchette', nombre:'la fourchette' },
        { id:'couteau',    nombre:'le couteau' },
        { id:'cuillere',   nombre:'la cuillère' },
        { id:'verre-eau',  nombre:'le verre à eau' },
        { id:'verre-vin',  nombre:'le verre à vin' },
        { id:'pain',       nombre:'le pain' },
        { id:'serviette',  nombre:'la serviette' }
      ],
      svg: `<svg viewBox="0 0 520 330" role="img" aria-label="Une table dressée">
        <rect x="0" y="0" width="520" height="330" rx="10" class="mantel"/>
        <g data-punto="assiette">
          <circle cx="260" cy="195" r="80" data-pieza class="pieza"/>
          <circle cx="260" cy="195" r="62" class="pieza-fina"/>
        </g>
        <g data-punto="fourchette">
          <rect x="158" y="140" width="11" height="112" rx="5" data-pieza class="pieza"/>
          <rect x="156" y="130" width="3" height="26" class="pieza-fina"/>
          <rect x="162" y="130" width="3" height="26" class="pieza-fina"/>
          <rect x="168" y="130" width="3" height="26" class="pieza-fina"/>
        </g>
        <g data-punto="couteau">
          <rect x="352" y="140" width="11" height="112" rx="5" data-pieza class="pieza"/>
          <path d="M352 140 L363 140 L363 176 L352 186 Z" class="pieza-fina"/>
        </g>
        <g data-punto="cuillere">
          <rect x="382" y="152" width="11" height="100" rx="5" data-pieza class="pieza"/>
          <ellipse cx="387" cy="143" rx="11" ry="16" class="pieza-fina"/>
        </g>
        <g data-punto="verre-eau">
          <path d="M330 52 L356 52 L352 100 L334 100 Z" data-pieza class="pieza"/>
          <rect x="339" y="100" width="8" height="18" class="pieza-fina"/>
          <rect x="331" y="117" width="24" height="5" rx="2" class="pieza-fina"/>
        </g>
        <g data-punto="verre-vin">
          <path d="M378 62 L399 62 L396 98 L381 98 Z" data-pieza class="pieza"/>
          <rect x="385" y="98" width="7" height="20" class="pieza-fina"/>
          <rect x="377" y="117" width="22" height="5" rx="2" class="pieza-fina"/>
        </g>
        <g data-punto="pain">
          <circle cx="148" cy="80" r="36" data-pieza class="pieza"/>
          <ellipse cx="148" cy="78" rx="22" ry="14" class="pieza-fina"/>
          <path d="M136 72 L160 72 M134 80 L162 80 M138 88 L158 88" class="pieza-linea"/>
        </g>
        <g data-punto="serviette">
          <rect x="62" y="150" width="62" height="92" rx="4" data-pieza class="pieza"/>
          <path d="M62 174 L124 174 M62 198 L124 198" class="pieza-linea"/>
        </g>
      </svg>`,
      aide:'La regla de oro: <b>los cubiertos se usan de fuera hacia dentro</b>, según van '
         + 'llegando los platos. Y los vasos, arriba a la derecha.' },

    /* 4 */ { t:'ordre', etiqueta:'L’ordre du repas',
      consigne:'Remets dans l’ordre un repas français complet, du début à la fin.',
      sous:'Hay uno que casi nadie coloca bien, y es el que más sorprende fuera de Francia.',
      items: [
        'L’apéritif',
        'L’entrée',
        'Le plat principal',
        'La salade',
        'Le fromage',
        'Le dessert',
        'Le café'
      ],
      aide:'El que sorprende: <b>el queso va antes del postre</b>, no después. Y la ensalada, '
         + 'antes del queso — nunca de entrada, como en muchos otros países.' },

    /* 5 */ { t:'dialogue', etiqueta:'Un dîner chez les parents de ton ami',
      consigne:'Six moments du dîner. Choisis ce que tu fais, et regarde ce qui arrive.',
      sous:'No hay trampa: casi todas las respuestas son razonables. Solo una es la que harías '
         + 'si conocieras los códigos.',
      final: 'Tu es rentré sans avoir mis personne mal à l’aise — y compris toi-même. '
           + 'C’est exactement la règle numéro un de Carmel.',
      escenas: [
        { texto:'On t’a invité à dîner à <b>20 h</b>. Tu es devant la porte à 19 h 50. Tu…',
          opciones: [
            { texto:'sonnes tout de suite, pour ne pas être en retard', ok:false,
              replica:'La mère ouvre en tablier, un peu surprise : elle était encore en cuisine. '
                    + 'Arriver pile à l’heure, ou avant, met l’hôte en difficulté.' },
            { texto:'fais un tour et sonnes vers 20 h 15', ok:true,
              replica:'Parfait. C’est le « quart d’heure de politesse » : on arrive un peu après, '
                    + 'jamais avant. Au-delà de 20-30 minutes, en revanche, on prévient.' },
            { texto:'attends qu’il soit 21 h, pour être sûr', ok:false,
              replica:'Trop. Le plat t’attendait depuis une heure et tout le monde a faim.' }
          ] },
        { texto:'Tu es à table. Tu ne manges pas encore. Tes mains…', min:'8:04',
          opciones: [
            { texto:'sur tes genoux, sous la table', ok:false,
              replica:'C’est l’usage anglo-saxon. En France, ça intrigue : historiquement, '
                    + 'les mains devaient rester visibles — question de poison et d’armes cachées.' },
            { texto:'les poignets posés sur la table', ok:true,
              replica:'Exactement. Les poignets ou les mains sur la table, mais jamais les coudes.' },
            { texto:'les coudes sur la table, tu es détendu', ok:false,
              replica:'Là, la grand-mère te regarde. Les coudes, c’est le reproche classique.' }
          ] },
        { texto:'On sert une soupe brûlante. Tu…', min:'11:51',
          opciones: [
            { texto:'souffles dessus', ok:false,
              replica:'Ça s’entend, et ça se voit. On évite.' },
            { texto:'penches le buste vers l’assiette pour aller plus vite', ok:false,
              replica:'C’est la cuillère qui monte à la bouche, pas le buste qui descend. '
                    + 'Le dos reste droit.' },
            { texto:'la prends sur le bord de l’assiette, en effleurant la surface', ok:true,
              replica:'Oui : c’est là qu’elle est la moins chaude. Et le dos reste droit.' }
          ] },
        { texto:'Il reste de la sauce dans ton assiette, et elle est très bonne. Tu…', min:'22:24',
          opciones: [
            { texto:'prends un morceau de pain dans la main et tu sauces', ok:false,
              replica:'C’est le geste qu’on évite. Pourtant tout le monde en a envie — '
                    + 'il existe une solution.' },
            { texto:'piques un petit morceau de pain au bout de ta fourchette', ok:true,
              replica:'C’est le compromis français : discret, et personne n’y trouve rien à redire.' },
            { texto:'laisses la sauce, à regret', ok:false,
              replica:'Dommage : ce n’était pas interdit, à condition de passer par la fourchette.' }
          ] },
        { texto:'Un invité étranger boit l’eau de son <b>rince-doigts</b>. '
              + 'Les autres se regardent. Tu…', min:'13:39',
          opciones: [
            { texto:'lui expliques gentiment à quoi ça sert', ok:false,
              replica:'Gentiment ou pas, tu viens de lui montrer qu’il s’est trompé devant '
                    + 'tout le monde. C’est précisément ce qu’il ne faut pas faire.' },
            { texto:'ne dis rien et tu regardes ailleurs', ok:false,
              replica:'Pas mal — mais il reste seul avec son malaise. On peut faire mieux.' },
            { texto:'bois la tienne aussi', ok:true,
              replica:'C’est ce qu’a fait la reine d’Angleterre dans la même situation. '
                    + 'Plus personne ne remarque rien, et l’invité ne saura jamais. '
                    + 'Règle numéro un : ne jamais mettre l’autre mal à l’aise.' }
          ] },
        { texto:'Le repas est fini, on se lève. Ta serviette…', min:'33:29',
          opciones: [
            { texto:'tu la replies soigneusement', ok:false,
              replica:'Attention : replier sa serviette signifiait qu’on compte revenir au '
                    + 'repas suivant. Chez des inconnus, c’est presque drôle.' },
            { texto:'tu la poses légèrement froissée à côté de l’assiette', ok:true,
              replica:'C’est exactement ça. Ni pliée, ni jetée : posée.' },
            { texto:'tu la laisses sur la chaise', ok:false,
              replica:'Elle finit par terre, et quelqu’un devra la ramasser.' }
          ] }
      ],
      aide:'Si has acertado menos de cuatro, vuelve a jugar después de ver el vídeo: todas las '
         + 'respuestas están ahí, con su minuto.' },

    /* 6 */ { t:'qcm', etiqueta:'La vidéo', min:'0:00',
      consigne:'Six questions. Utilise les boutons de minutage pour vérifier.',
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
          note:'Su ejemplo: no atreverse a entrar en un gran hotel por una pastelería [03:48].' },
        { enonce:'Pourquoi, traditionnellement, on ne dit pas « bon appétit » ?', min:'14:40',
          o:['parce que ça renvoie à la digestion, et le repas est un art de vivre',
             'parce que c’est trop familier', 'parce que ça porte malheur'], r:0,
          note:'Pero si nos lo dicen, se responde « Merci, vous également » [14:46].' },
        { enonce:'Quelle est, selon Carmel, la règle numéro un ?', min:'13:26',
          o:['connaître l’ordre des couverts',
             'ne jamais mettre les autres mal à l’aise',
             'ne jamais parler à table'], r:1 }
      ] },

    /* 7 */ { t:'prod', etiqueta:'Après la vidéo', mots:50,
      consigne:'Une chose de la vidéo qui t’a surpris, et une que tu faisais déjà sans savoir pourquoi.',
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

    /* 8 */ { t:'transfo', etiqueta:'Plus… plus',
      consigne:'Termine chaque phrase à ta façon, puis compare avec le modèle.',
      sous:'Es la actividad 19 del libro: no hay una sola respuesta buena.',
      q: [
        { enonce:'Plus je vois ce qui est à la mode, plus / moins…',
          modele:'Plus je vois ce qui est à la mode, moins j’ai envie de suivre la mode.' },
        { enonce:'Plus je vieillis, plus / moins…',
          modele:'Plus je vieillis, plus je comprends à quoi servent ces règles.' },
        { enonce:'Plus / Moins il y a d’objets dans un salon, plus / moins…',
          modele:'Moins il y a d’objets dans un salon, plus la pièce paraît grande.',
          note:'Delante de un nombre, <b>de</b>: <i>moins d’objets</i>.' },
        { enonce:'Moins on connaît les codes, plus / moins…',
          modele:'Moins on connaît les codes, plus on a peur de se tromper.' }
      ] },

    /* 9 */ { t:'trous', etiqueta:'Valoir',
      consigne:'Complète avec le verbe valoir.',
      q: [
        { enonce:'Il ___ mieux éviter d’en parler à table.', r:['vaut'], taille:10 },
        { enonce:'Mieux ___ prévenir que guérir.', r:['vaut'], taille:10 },
        { enonce:'Un homme averti en ___ deux.', r:['vaut'], taille:10 },
        { enonce:'Deux précautions ___ mieux qu’une.', r:['valent'], taille:10,
          note:'Aquí el sujeto es <b>deux précautions</b>, plural: <i>valent</i>.' },
        { enonce:'Apprendre ces règles, ça ___ la peine.', r:['vaut'], taille:10 }
      ] },

    /* 10 */ { t:'tri', etiqueta:'La nétiquette',
      consigne:'Dans un mail à quelqu’un que tu vouvoies : ça se fait ou pas ?',
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
      consigne:'Quelle expression de l’activité 22 emploierais-tu ?',
      q: [
        { enonce:'Un camarade t’envoie un vocal de huit minutes à minuit.',
          o:['C’est la base.', 'Ça ne se fait pas vraiment, et ça met mal à l’aise.', 'C’est vexant.'],
          r:1 },
        { enonce:'Quelqu’un écrit tout un mail en majuscules.',
          o:['Ça fait mauvais genre : on a l’impression qu’il crie.',
             'C’est la base.', 'Ça s’apprend.'], r:0 },
        { enonce:'Un étudiant écrit à un professeur sans dire bonjour.',
          o:['C’est n’importe quoi.', 'Ça ne se fait pas — mais ça s’apprend.', 'C’est vexant.'],
          r:1, note:'Las dos juntas: señalas la norma y no humillas a nadie. Es la fórmula más '
                  + 'útil de toda la lista.' }
      ] },

    /* 12 */ { t:'prod', etiqueta:'Production finale', mots:120,
      consigne:'Écris à un ami français qui arrive au Mexique la semaine prochaine : '
             + 'qu’est-ce qui se fait et qu’est-ce qui ne se fait pas à table, ici ?',
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
           + 'l’heure exacte à une invitation. Il vaut mieux arriver vingt minutes plus tard : '
           + 'autrement, tu surprends tout le monde en cuisine.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   SÉANCE 5 · 21 octobre · p. 20-21
   RENDEZ-VOUS — Être éducateur au goût (Quentin, 37 ans, Occitanie)
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's5',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Mercredi 21 octobre · p. 20-21',
  titulo: 'Être éducateur au goût',
  resumen: 'El texto de Quentin: lo que su oficio es y lo que no, los cuatro sabores, las ideas recibidas sobre lo que se hace en la cocina.',
  intro: 'Todo el texto se sostiene sobre una distinción: Quentin no dice lo que está bien '
       + 'ni lo que está mal. Si eso queda claro, las preguntas del libro se contestan solas.',

  secciones: [
    { titulo: '1. Ce qu’il fait, et ce qu’on croit qu’il fait',
      sous: 'La actividad 1 del libro, con la justificación sacada del texto.',
      rappels: [
        { titulo: 'Les mots du texte',
          html: `<ul>
            <li><b>les « classes du goût »</b> — el programa del
                <b>ministère de l’Éducation nationale</b>, su principal empleador.</li>
            <li><b>un animateur</b> ≠ <b>un professeur</b> — él mismo se define así:
                <i>« je suis plus un animateur qu’un professeur »</i>.</li>
            <li><b>un aliment brut</b> ≠ <b>un aliment transformé</b>.</li>
            <li><b>l’excès</b> ≠ <b>la parcimonie</b> — las dos nociones complejas que,
                dice, se aprenden con la práctica.</li>
            <li><b>une idée reçue</b> — lo que todo el mundo cree saber sin haberlo comprobado.</li>
          </ul>
          <div class="ex">En Francia, dice el texto, <i>« on considère qu’apprendre à manger
          est aussi important que savoir lire »</i>. Esa frase sola explica por qué existe
          el programa.</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: '2. Les goûts et les idées reçues',
      sous: 'Los cuatro sabores —« c’est la base », dice él— y lo que responde a cada idea recibida.',
      rappels: [
        { titulo: 'Les quatre goûts du texte',
          html: `<div class="ex"><b>sucré · salé · amer · acide</b> — los cuatro que los niños
          aprenden a reconocer en sus talleres.</div>
          <p>Fuera del libro se habla de un quinto, el <b>umami</b> (el parmesano curado,
          la salsa de soja). No entra en la evaluación, pero conviene conocerlo.</p>` },
        { titulo: 'Deux images que usa con los niños',
          html: `<ul>
            <li><b>Les couleurs assorties :</b> el azul y el naranja van bien juntos —
                con los sabores, igual. <i>Un filet de dinde salé avec des petits pois un peu
                sucrés, ça va bien ensemble.</i></li>
            <li><b>Mettre en valeur ≠ cacher :</b> <i>un peu d’huile d’olive plutôt que
                trois tonnes de ketchup sur du poisson, ça met en valeur le goût du poisson
                plutôt que de le cacher.</i></li>
          </ul>
          <div class="piege">Fíjate en los dos <b>plutôt que</b> de esa frase: es la misma
          estructura de la página 23, y aquí la tienes en contexto.</div>` }
      ],
      ejercicios: [2, 3, 4]
    },
    { titulo: '3. À toi',
      sous: 'La actividad 4: tus propias ideas recibidas.',
      rappels: [],
      ejercicios: [5, 6]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'qcm', etiqueta:'Act. 1 · vrai ou faux',
      consigne:'Les trois affirmations du livre : vrai ou faux ?',
      sous:'Lee la corrección: lleva la frase exacta del texto.',
      q: [
        { enonce:'<b>1.</b> Quentin dit ce qui est de bon ou de mauvais goût chez les gens.',
          o:['Vrai','Faux'], r:1,
          note:'<b>FAUX.</b> Es lo que la gente cree: <i>« les gens pensent que je vais '
             + 'critiquer leur façon de s’habiller ou de décorer leur maison… Pas du tout. »</i>' },
        { enonce:'<b>2.</b> Les gens pensent qu’il enseigne les bonnes manières.',
          o:['Vrai','Faux'], r:1,
          note:'<b>FAUX.</b> Lo que creen es que es <i>« un spécialiste du bon goût »</i> y que '
             + 'va a criticar su forma de vestir o de decorar. De buenas maneras en la mesa, '
             + 'el texto no dice nada.' },
        { enonce:'<b>3.</b> Il ne faut pas confondre son métier avec celui de nutritionniste.',
          o:['Vrai','Faux'], r:0,
          note:'<b>VRAI.</b> <i>« Je m’occupe des aliments, mais je ne suis pas non plus un '
             + 'nutritionniste. »</i>' }
      ] },

    /* 1 */ { t:'qcm', etiqueta:'Act. 2 et 3',
      consigne:'Ce que dit le texte, exactement.',
      q: [
        { enonce:'L’éducation au goût, selon lui, c’est…',
          o:['apprendre à cuisiner',
             'tout ce qui concerne la capacité à aimer ou pas un aliment, et la qualité des aliments',
             'apprendre les bonnes manières à table'], r:1 },
        { enonce:'Son principal employeur, c’est…',
          o:['les restaurants', 'le ministère de l’Éducation nationale', 'les familles'], r:1,
          note:'Con un programa que se llama <b>les « classes du goût »</b>.' },
        { enonce:'Comment se définit-il lui-même ?',
          o:['plus un animateur qu’un professeur', 'plus un professeur qu’un animateur',
             'un chef cuisinier'], r:0 },
        { enonce:'Pourquoi voudrait-il développer des ateliers pour les adultes ?',
          o:['parce que les goûts se forment très tôt et que c’est le travail de tous les parents',
             'parce que les adultes mangent mal',
             'parce que c’est mieux payé'], r:0,
          note:'Y añade algo que sorprende a todo el mundo: nuestros gustos pueden estar '
             + 'influidos por <i>ce que notre mère mangeait pendant sa grossesse</i>.' },
        { enonce:'Quelle est sa plus grande satisfaction ?',
          o:['quand les enfants mangent de tout',
             'quand des jeunes reviennent d’un fast-food en disant que les frites y sont dégueulasses',
             'quand les parents le remercient'], r:1,
          note:'Porque significa que el paladar ya distingue por sí solo, sin que nadie se lo diga.' },
        { enonce:'Sur quoi, selon lui, n’a-t-on pas de pouvoir ?',
          o:['sur certains goûts, liés à la prime enfance',
             'sur les goûts des adultes', 'sur rien : tout s’éduque'], r:0,
          note:'<i>« Ce n’est pas une question de sociologie, c’est plutôt lié à la prime '
             + 'enfance. »</i> Otro <b>plutôt</b> de precisión.' }
      ] },

    /* 2 */ { t:'tri', etiqueta:'Les aliments',
      consigne:'La distinction que les enfants apprennent à reconnaître dans ses ateliers.',
      cols: ['Aliment brut', 'Aliment transformé'],
      items: [
        ['une pomme', 0], ['un filet de dinde', 0], ['des petits pois frais', 0],
        ['une carotte', 0],
        ['du ketchup', 1], ['des bonbons', 1], ['une soupe en sachet', 1], ['des frites surgelées', 1]
      ],
      aide:'El libro se queda en dos categorías. Fuera de él se habla de una tercera, los '
         + '<b>ultra-transformés</b> (refrescos, nuggets): son los que llevan ingredientes '
         + 'que no tendrías en tu cocina.' },

    /* 3 */ { t:'trous', etiqueta:'Les quatre goûts',
      consigne:'Complète avec sucré, salé, amer ou acide.',
      q: [
        { enonce:'Le citron est ___.', r:['acide'], taille:10 },
        { enonce:'Le café sans sucre est ___.', r:['amer'], taille:10 },
        { enonce:'Les bonbons sont ___.', r:['sucrés','sucré'], taille:10 },
        { enonce:'Les chips sont ___.', r:['salées','salé','salées'], taille:10 },
        { enonce:'Un filet de dinde ___ avec des petits pois un peu sucrés, ça va bien ensemble.',
          r:['salé'], taille:10,
          note:'Es la frase del texto. El contraste salado/dulce es justo lo que muchos niños '
             + 'creen imposible.' }
      ] },

    /* 4 */ { t:'paires', etiqueta:'Les idées reçues',
      consigne:'Associe chaque idée reçue des enfants à ce que Quentin leur répond.',
      pairs: [
        ['« Plus c’est sucré, mieux c’est ! »',
         'il leur fait découvrir l’excès et la parcimonie par la pratique'],
        ['« Le sucré ne va pas bien avec le salé. »',
         'un filet de dinde salé avec des petits pois sucrés va très bien ensemble'],
        ['« Le poisson, c’est meilleur avec beaucoup de ketchup. »',
         'un peu d’huile d’olive met en valeur le goût au lieu de le cacher'],
        ['« Ce qui compte, c’est le goût, pas l’assiette. »',
         'avec les plus grands, il travaille la présentation et la première impression'],
        ['« Les goûts, on les a et c’est tout. »',
         'les goûts s’éduquent — même si certains échappent à notre pouvoir']
      ] },

    /* 5 */ { t:'trous', etiqueta:'Le lexique du texte',
      consigne:'Complète avec les mots du texte.',
      q: [
        { enonce:'Mettre trop de sauce, c’est ___ le goût du poisson au lieu de le mettre en valeur.',
          r:['cacher'], taille:12 },
        { enonce:'Trop de quelque chose, c’est l’___ ; très poco, c’est la parcimonie.',
          r:['excès'], taille:12 },
        { enonce:'Une ___ reçue, c’est ce que tout le monde croit savoir sans l’avoir vérifié.',
          r:['idée'], taille:12 },
        { enonce:'Le bleu et le orange vont bien ___.', r:['ensemble'], taille:12 },
        { enonce:'Il faut que l’assiette soit jolie, qu’elle donne ___.', r:['envie'], taille:12,
          note:'<b>donner envie</b>: dar ganas. Es lo que el texto llama la <i>première impression</i> '
             + 'de un plato — la misma idea de la página 15, pero en la mesa.' }
      ] },

    /* 6 */ { t:'prod', etiqueta:'Act. 4 · production écrite', mots:90,
      consigne:'Et toi ? Quelles autres idées reçues connais-tu sur ce qui se fait ou ne se '
             + 'fait pas en cuisine ? Quels aliments vont bien ensemble ?',
      sous:'90 palabras. Las ideas recibidas de tu casa valen tanto como las francesas.',
      check: [
        'Dos ideas recibidas, con quién las dice.',
        'Lo que tú responderías a una de ellas.',
        'Dos alimentos que, según tú, <b>vont bien ensemble</b>, y por qué.',
        'Un <b>plutôt que</b>.',
        'Uno de los cuatro sabores, por lo menos.'
      ],
      modele:'Chez moi, on entend souvent que la soupe se mange seulement quand on est malade, '
           + 'et que le poisson, il faut le couvrir de citron. Pour la soupe, je ne suis pas '
           + 'd’accord : une bonne soupe de courge, c’est doux et épais, et ça n’a rien '
           + 'd’un médicament. Pour le poisson, je dirais comme Quentin : un peu de citron '
           + 'plutôt que trois tonnes, parce qu’un excès d’acide cache tout le reste. Ce qui va '
           + 'très bien ensemble, chez nous, c’est la mangue verte avec du sel et du piment : '
           + 'le salé réveille le sucré du fruit.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   SÉANCE 6 · 26 octobre · p. 22-23
   COMMUNICATION et GRAMMAIRE — cierre de la Unité 1
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's6',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Lundi 26 octobre · p. 22-23',
  titulo: 'Communication et grammaire — toute l’unité',
  resumen: 'Los tres registros del juicio, describir un estilo, las buenas y malas maneras, y la gramática: ce qui / ce que, el doble comparativo y plutôt.',
  intro: 'Las dos páginas que resumen la unidad. Lo que practiques aquí es lo que sale en la '
       + 'evaluación del 11 de noviembre.',

  secciones: [
    { titulo: '1. Exprimer son goût',
      sous: 'Tres cajones distintos, y meter una frase en el equivocado se nota mucho.',
      rappels: [
        { titulo: 'Les trois registres du jugement',
          html: `<ul>
            <li><b>Le dégoût avec emphase :</b> C’est horrible ! · C’est la pire
                erreur du monde. · Ça pique les yeux. · C’est mochissime. <i>(familier)</i> ·
                C’est une insulte au bon goût. · C’est d’une vulgarité sans nom ! ·
                C’est d’une laideur !</li>
            <li><b>Le dégoût poliment :</b> Ce n’est pas très heureux. ·
                C’est d’un goût douteux. · C’est un style… · Pourquoi pas ? · Faut aimer…</li>
            <li><b>L’enthousiasme esthétique :</b> C’est joli. · Ça fait classe ! ·
                Ça en jette ! · Ça pète ! · Je kiffe ! · C’est trop stylé !
                <i>(los cuatro últimos, familiares)</i></li>
          </ul>
          <div class="piege"><b>Las expresiones con goût :</b> avoir du goût ≠ ne pas
          avoir de goût · c’est de bon / mauvais goût · <b>c’est une faute de goût</b> ·
          chacun ses goûts.</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: '2. Décrire le style, et les manières',
      sous: 'Los adjetivos del recuadro y las fórmulas con on dirait, ça fait, on se croirait.',
      rappels: [
        { titulo: 'Les adjectifs du style',
          html: `<div class="ex">décontracté · vulgaire · élégant · chic · négligé ·
          raffiné · coincé · passe-partout</div>
          <ul>
            <li><b>Juger l’ensemble :</b> Ça ne va pas ensemble. · Ça ne va à personne. ·
                C’est bien ≠ mal assorti.</li>
            <li><b>Avec une image :</b> On dirait un clown… · Il a l’air coincé. ·
                Il a l’air d’un rappeur. · Ça fait ringard / années 80. ·
                <b>On se croirait</b> dans un catalogue Ikea / un cimetière.</li>
          </ul>` },
        { titulo: 'Les bonnes et les mauvaises manières',
          html: `<ul>
            <li><b>Les bonnes :</b> savoir se comporter · être poli(e) · bien se tenir ·
                connaître les règles de politesse.</li>
            <li><b>Les mauvaises :</b> dire des gros mots · se mettre les doigts dans le
                nez · mettre ses coudes sur la table.</li>
            <li><b>Réagir :</b> Ça donne une mauvaise impression. · Ça fait mauvais genre. ·
                C’est mal élevé. · C’est gênant / vexant. · Ça met mal à l’aise.</li>
          </ul>` }
      ],
      ejercicios: [2, 3]
    },
    { titulo: '3. Ce qui / ce que',
      sous: 'La gramática de la página 23, con las cuatro funciones que pide el libro.',
      rappels: [
        { titulo: 'La règle, et les quatre fonctions',
          html: `<p><b>Ce</b> es un pronombre indefinido, <b>neutro e invariable</b>: remite a
          una o varias cosas indeterminadas.</p>
          <ul>
            <li><b>ce qui</b> = « la/les chose(s) qui » → le sigue <b>un verbo</b>.</li>
            <li><b>ce que</b> = « la/les chose(s) que » → le sigue <b>un sujeto</b> y un verbo.</li>
          </ul>
          <p>Y el grupo entero puede hacer cuatro papeles en la frase:</p>
          <ul>
            <li><b>Sujeto :</b> <i>Ce qui est chimique plaît beaucoup aux enfants.</i></li>
            <li><b>Complemento directo :</b> <i>Les enfants aiment ce qui brille.</i></li>
            <li><b>Complemento indirecto :</b> <i>Ils ont des idées reçues sur ce qui se
                fait en matière de cuisine.</i></li>
            <li><b>Complemento agente :</b> <i>Nos goûts sont influencés par ce que notre
                mère mangeait pendant sa grossesse.</i></li>
          </ul>` }
      ],
      ejercicios: [4, 5]
    },
    { titulo: '4. Le double comparatif et plutôt',
      sous: 'Lo que más puntos da y lo que más se falla.',
      rappels: [
        { titulo: 'Le double comparatif',
          html: `<p>Cuando <b>plus</b> y/o <b>moins</b> se repiten al principio de dos
          proposiciones seguidas, muestran cómo evoluciona una situación en función de otra.
          Todas las combinaciones son posibles.</p>
          <div class="ex">Plus une phrase est courte, plus elle est lisible.<br>
          Plus je vieillis, moins je suis la mode.<br>
          Moins tu dors, plus tu es fatigué.</div>
          <div class="piege"><b>Dos trampas :</b><br>
          • Si indican <b>cantidad</b>, el nombre lleva <b>de</b>:
          <i>Plus je relis ma lettre, moins je trouve <b>de</b> fautes.</i><br>
          • Los <b>irregulares</b> entran también:
          <i>Plus c’est clair, <b>mieux</b> c’est !</i> (= plus c’est bien) ·
          <i>Moins il y a de sucre, <b>meilleur</b> c’est.</i> (= plus c’est bon)</div>` },
        { titulo: 'Plutôt (que)',
          html: `<p>Lo tienes entero en la ficha de las páginas 16-17. En resumen:
          preferencia (<i>plutôt que</i>, y <b>plutôt que de</b> + infinitivo), sugerencia al
          final de la frase, precisión (<i>ou plutôt</i>) y, delante de adjetivo, <b>= assez</b>.</p>` }
      ],
      ejercicios: [6, 7]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'tri', etiqueta:'Trois registres',
      consigne:'Où va chaque phrase de l’encadré de la page 22 ?',
      cols: ['Dégoût avec emphase', 'Dégoût poliment', 'Enthousiasme'],
      items: [
        ['C’est horrible !', 0],
        ['Ça pique les yeux.', 0],
        ['C’est mochissime.', 0],
        ['C’est d’une laideur !', 0],
        ['Ce n’est pas très heureux.', 1],
        ['C’est d’un goût douteux.', 1],
        ['Pourquoi pas ?', 1],
        ['Faut aimer…', 1],
        ['Ça fait classe !', 2],
        ['Ça en jette !', 2],
        ['Je kiffe !', 2]
      ],
      aide:'<b>Mochissime</b> viene de <i>moche</i> con el sufijo <b>-issime</b>, que exagera. '
         + '<b>Ça pète</b> y <b>je kiffe</b> son familiares: en el oral del examen, mejor '
         + 'señalarlos (« comme on dit familièrement… ») o cambiarlos.' },

    /* 1 */ { t:'trous', etiqueta:'Les expressions avec goût',
      consigne:'Complète avec les quatre expressions de l’encadré.',
      q: [
        { enonce:'Elle choisit toujours bien ses vêtements : elle a ___ goût.',
          r:['du'], taille:8 },
        { enonce:'Ce mélange de couleurs, c’est de ___ goût.', r:['mauvais'], taille:10 },
        { enonce:'Mettre ce tableau ici, c’est une ___ de goût.', r:['faute'], taille:10,
          note:'<b>une faute de goût</b>: un error de gusto, algo que desentona.' },
        { enonce:'Moi je déteste ça, mais bon : ___ ses goûts.', r:['chacun'], taille:10 }
      ] },

    /* 2 */ { t:'paires', etiqueta:'Décrire le style',
      consigne:'Associe chaque adjectif de l’encadré à ce qu’il veut dire.',
      pairs: [
        ['décontracté', 'relajado, sin rigidez — y es un elogio'],
        ['coincé', 'rígido, incómodo, demasiado formal'],
        ['négligé', 'descuidado — y es un reproche'],
        ['raffiné', 'refinado, con detalles cuidados'],
        ['chic', 'elegante y caro, sin estridencias'],
        ['vulgaire', 'de mal gusto, que llama la atención por lo peor'],
        ['passe-partout', 'que vale para todo y no dice nada'],
        ['bien assorti', 'cuyas piezas combinan entre sí']
      ],
      aide:'<b>Décontracté</b> y <b>négligé</b> son la misma idea vista desde dos lados: '
         + 'uno es una elección, el otro una dejadez.' },

    /* 3 */ { t:'qcm', etiqueta:'Réagir',
      consigne:'Que dirais-tu dans chaque cas, avec les formules de l’encadré ?',
      q: [
        { enonce:'Alguien pone los codos sobre la mesa en una cena formal.',
          o:['C’est mal élevé.', 'C’est une faute de goût.', 'Ça ne va pas ensemble.'], r:0 },
        { enonce:'Un amigo llega a una entrevista con la camisa arrugada.',
          o:['Ça donne une mauvaise impression.', 'Je kiffe !', 'C’est raffiné.'], r:0 },
        { enonce:'Una decoración completamente blanca, sin nada personal.',
          o:['On se croirait dans un catalogue Ikea.', 'Ça fait mauvais genre.',
             'C’est d’une vulgarité sans nom !'], r:0,
          note:'<b>On se croirait…</b> + lugar: la fórmula para describir una impresión de conjunto.' },
        { enonce:'Alguien dice palabrotas delante de los niños.',
          o:['Ça fait mauvais genre.', 'C’est passe-partout.', 'Ça ne va à personne.'], r:0 },
        { enonce:'Un pantalón que no le sienta bien a nadie, en general.',
          o:['Ça ne va à personne.', 'Ça ne va pas ensemble.', 'C’est gênant.'], r:0,
          note:'<b>Ça ne va à personne</b> (nadie lo lleva bien) ≠ <b>ça ne va pas ensemble</b> '
             + '(esas dos piezas no combinan).' }
      ] },

    /* 4 */ { t:'trous', etiqueta:'Ce qui / ce que',
      consigne:'Complète avec ce qui ou ce que (ce qu’).',
      sous:'La regla: detrás de <b>ce qui</b> viene un verbo; detrás de <b>ce que</b>, un sujeto.',
      q: [
        { enonce:'___ est chimique plaît beaucoup aux enfants.', r:['ce qui'], taille:10 },
        { enonce:'___ tu portes plaît beaucoup aux enfants.', r:['ce que','ce qu'], taille:10 },
        { enonce:'Les enfants aiment ___ brille.', r:['ce qui'], taille:10 },
        { enonce:'Ils ont des idées reçues sur ___ se fait en matière de cuisine.',
          r:['ce qui'], taille:10 },
        { enonce:'Ce principe vaut aussi pour ___ vous portez.', r:['ce que','ce qu'], taille:10 },
        { enonce:'Nos goûts sont influencés par ___ notre mère mangeait pendant sa grossesse.',
          r:['ce que','ce qu'], taille:10 },
        { enonce:'Je suis souvent surprise par ___ plaît aux enfants.', r:['ce qui'], taille:10 },
        { enonce:'___ me dérange, c’est le bruit.', r:['ce qui'], taille:10 }
      ] },

    /* 5 */ { t:'qcm', etiqueta:'Quelle fonction ?',
      consigne:'Quelle fonction a le groupe souligné dans la phrase ?',
      sous:'Es la actividad de la página 23: sujeto, complemento directo, indirecto o agente.',
      q: [
        { enonce:'<u>Ce qui est chimique</u> plaît beaucoup aux enfants.',
          o:['sujet du verbe', 'complément d’objet direct', 'complément d’agent'], r:0 },
        { enonce:'Les enfants aiment <u>ce qui brille</u>.',
          o:['sujet du verbe', 'complément d’objet direct', 'complément d’objet indirect'], r:1 },
        { enonce:'Ils ont des idées reçues <u>sur ce qui se fait</u>.',
          o:['sujet', 'complément d’objet direct', 'complément d’objet indirect'], r:2,
          note:'Va introducido por la preposición <b>sur</b>: por eso es indirecto.' },
        { enonce:'Nos goûts sont influencés <u>par ce que notre mère mangeait</u>.',
          o:['complément d’agent', 'sujet', 'complément d’objet direct'], r:0,
          note:'Frase en pasiva + <b>par</b> → complemento agente: el que hace la acción.' }
      ] },

    /* 6 */ { t:'trous', etiqueta:'Le double comparatif',
      consigne:'Complète. Attention au « de » et aux irréguliers.',
      q: [
        { enonce:'Plus une phrase est courte, ___ elle est lisible.', r:['plus'], taille:10 },
        { enonce:'Plus je vieillis, ___ je suis la mode.', r:['moins','plus'], taille:10,
          note:'El libro dice <i>moins</i>, pero las dos son gramaticalmente correctas: '
             + 'depende de lo que quieras decir.' },
        { enonce:'Moins tu dors, ___ tu es fatigué.', r:['plus'], taille:10 },
        { enonce:'Plus je relis ma lettre, moins je trouve ___ fautes.', r:['de','d'], taille:8,
          note:'Cantidad + nombre → <b>de</b>, sin artículo.' },
        { enonce:'Plus c’est clair, ___ c’est ! <i>(= plus c’est bien)</i>',
          r:['mieux'], taille:10 },
        { enonce:'Moins il y a de sucre, ___ c’est. <i>(= plus c’est bon)</i>',
          r:['meilleur'], taille:10,
          note:'<b>mieux</b> sustituye a <i>bien</i> ; <b>meilleur</b>, a <i>bon</i>. '
             + 'Es la pareja que más se confunde del nivel.' }
      ] },

    /* 7 */ { t:'prod', etiqueta:'Production écrite', mots:110,
      consigne:'Un ami t’envoie une photo de son salon fraîchement décoré et te demande ton '
             + 'avis. Tu n’es pas vraiment convaincu. Réponds-lui.',
      sous:'110 palabras. Honesto y amable a la vez: ahí está el ejercicio.',
      check: [
        'Una mise en relief con <b>ce qui</b> o <b>ce que</b>.',
        'Un doble comparativo, con <b>de</b> o con un irregular.',
        'Un <b>plutôt que</b>.',
        'Una crítica <b>poliment</b> (nada de « c’est mochissime »).',
        'Un elogio sincero de algo concreto.',
        'Una fórmula con <b>on dirait</b> o <b>on se croirait</b>.'
      ],
      modele:'Alors, franchement : ce qui me plaît beaucoup, c’est la bibliothèque — elle '
           + 'est bien assortie au parquet et ça fait classe. Ce qui me convainc moins, ce sont '
           + 'les murs : tout ce blanc, avec les meubles blancs aussi, on se croirait un peu '
           + 'dans un catalogue. Plus une pièce est uniforme, moins on y voit la personne qui y '
           + 'vit. Je mettrais une seule couleur forte sur un mur, plutôt que de tout repeindre. '
           + 'Et tes affiches anciennes, pourquoi tu ne les ressors pas ? Elles ne sont peut-être '
           + 'pas très à la mode, disons plutôt qu’elles ont une histoire — et c’est justement ce '
           + 'qui manque ici.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   SÉANCE 7 · 28 octobre · p. 24-25
   MÉTHODOLOGIE ET PRÉPARATION AU DELF — Prendre des notes
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's7',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Mercredi 28 octobre · p. 24-25',
  titulo: 'Prendre des notes — méthodologie DELF',
  resumen: 'Las notas manuscritas de la página 24 descifradas, la lista de abreviaturas del libro y los seis procedimientos para crear las tuyas.',
  intro: 'Se habla a 150-200 palabras por minuto y se escribe a 25-40. Tomar notas no es '
       + 'transcribir: es seleccionar y reformular. Esta ficha entrena las dos cosas.',

  secciones: [
    { titulo: '1. Les notes de la page 24',
      sous: 'Lo que pone en el cuadro manuscrito, frase por frase.',
      rappels: [
        { titulo: 'MÉTHODO : la prise de notes (PN)',
          html: `<ul>
            <li><b>Objectif :</b> retrouver des informations.</li>
            <li><b>Impossible de tout écrire :</b> on parle à <b>150-200 mots/min</b>,
                on écrit à <b>25-40</b>.</li>
            <li><b>Prendre des notes = résumer</b> ⇒ sélectionner + reformuler les infos.</li>
            <li><b>Le plus important :</b> les idées principales, les dates, les définitions.</li>
            <li><b>Ne pas noter</b> les exemples — sauf s’ils sont utiles à la compréhension —
                ni les articles.</li>
            <li>Si on n’a pas le temps d’écrire : <b>laisser un espace</b> pour compléter
                plus tard.</li>
            <li>Des notes utiles sont des notes <b>pratiques à consulter</b> : mettre en
                valeur la structure (numéros, tirets, couleurs) et <b>relire juste après</b>
                pour ajouter, corriger, compléter.</li>
          </ul>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: '2. Les abréviations du livre',
      sous: 'La lista de la página 25, y los seis procedimientos para fabricar las tuyas.',
      rappels: [
        { titulo: 'La liste à connaître',
          html: `<div class="ex"><b>ap</b> après · <b>ex</b> exemple · <b>p</b> page ·
          <b>info</b> ou <b>1fo</b> information · <b>q</b> qui/que · <b>avt</b> avant ·
          <b>min/max</b> minimum/maximum · <b>pdt</b> pendant · <b>pb</b> problème ·
          <b>qd</b> quand · <b>qq</b> quelque · <b>qqch</b> quelque chose · <b>svt</b> souvent ·
          <b>tt/ts</b> tout/tous · <b>bcp</b> beaucoup · <b>sf</b> sauf, excepté ·
          <b>tjrs/tjs</b> toujours · <b>ms</b> mais · <b>objf</b> objectif</div>
          <div class="ex"><b>=</b> égal, est, équivalent · <b>≠</b> différent, n’est pas, inégal ·
          <b>&gt;</b> supérieur à · <b>&lt;</b> inférieur à</div>` },
        { titulo: 'Les six procédés',
          html: `<ol>
            <li><b>Le début du mot :</b> <i>ex.</i> pour <i>exemple</i>.</li>
            <li><b>Les consonnes principales :</b> <i>mn</i> pour <i>minute</i>.</li>
            <li><b>L’écriture phonétique :</b> <i>NRJ</i> pour <i>énergie</i>,
                <i>1fo</i> pour <i>info</i>.</li>
            <li><b>Les symboles mathématiques :</b> <i>+</i>, <i>=</i>, <i>≠</i>…</li>
            <li><b>Les abréviations conventionnelles :</b> <i>p.</i> pour <i>page</i>.</li>
            <li><b>Les abréviations de circonstance :</b> <i>VH</i> para <i>Victor Hugo</i>
                — y entonces hay que <b>escribir el nombre completo una vez</b>.</li>
          </ol>
          <div class="piege">La de circunstancia es la que te inventas para ese documento.
          Si no escribes el nombre entero la primera vez, dentro de una semana tus propias
          notas no se entienden.</div>` }
      ],
      ejercicios: [2, 3, 4]
    },
    { titulo: '3. S’entraîner',
      sous: 'Oír cifras y tomar notas de verdad, como en la actividad 3.',
      rappels: [
        { titulo: 'Les trois conseils de la page 25',
          html: `<ul>
            <li>Écrire <b>uniquement</b> ce qui est important ou ce qu’il faut mémoriser
                (idées principales, définitions, chiffres, dates).</li>
            <li>Mettre en valeur <b>la structure</b> du cours ou du podcast : numéroter
                les parties, ou utiliser des couleurs.</li>
            <li>Noter les exemples <b>seulement</b> quand ils aident à comprendre une idée.</li>
            <li><b>Relire ses notes juste après</b> et les compléter.</li>
          </ul>` }
      ],
      ejercicios: [5, 6]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'transfo', etiqueta:'Décoder',
      consigne:'Les notes de l’encadré de la page 24 : réécris-les en phrases complètes.',
      q: [
        { enonce:'<i>Objf PN : retrouver infos</i>',
          modele:'L’objectif de la prise de notes, c’est de retrouver les informations.' },
        { enonce:'<i>Impossble tt écr. : Parler = 150-200 mots/mn · Écr. = 25-40 mots/mn</i>',
          modele:'Il est impossible de tout écrire : on parle à 150-200 mots par minute et '
               + 'on écrit à 25-40 mots par minute.' },
        { enonce:'<i>PN = résumer ⇒ sélect. + reform. les infos</i>',
          modele:'Prendre des notes, c’est résumer : il faut donc sélectionner et reformuler '
               + 'les informations.' },
        { enonce:'<i>Ne pas noter ex. (sf si utiles pr compr°), ni les artcl</i>',
          modele:'Il ne faut pas noter les exemples, sauf s’ils sont utiles à la compréhension, '
               + 'ni les articles.' },
        { enonce:'<i>Si pas le tps d’écr. → laisser espace pr compléter + tard</i>',
          modele:'Si on n’a pas le temps d’écrire, on laisse un espace pour compléter plus tard.' },
        { enonce:'<i>Relire notes rapidt ap. cours pr ajouter, corriger, compléter</i>',
          modele:'Il faut relire ses notes rapidement après le cours pour ajouter, corriger et '
               + 'compléter.' }
      ],
      aide:'Fíjate en lo que desaparece siempre: los artículos, los verbos de apoyo, las '
         + 'preposiciones cortas. Lo que nunca desaparece: las cifras.' },

    /* 1 */ { t:'qcm', etiqueta:'La méthodo',
      consigne:'Cinq décisions à prendre, d’après la page 24.',
      q: [
        { enonce:'¿Cuántas palabras por minuto se dicen, y cuántas se escriben ?',
          o:['150-200 et 25-40', '100-150 et 50-60', '200-250 et 40-50'], r:0 },
        { enonce:'Les exemples…',
          o:['se notent toujours', 'ne se notent pas, sauf s’ils aident à comprendre',
             'ne se notent jamais'], r:1 },
        { enonce:'Quand on n’a pas le temps d’écrire, on…',
          o:['arrête de noter', 'laisse un espace pour compléter plus tard',
             'écrit plus petit'], r:1 },
        { enonce:'Des notes utiles, ce sont des notes…',
          o:['complètes', 'pratiques à consulter', 'écrites à la main'], r:1,
          note:'Por eso el libro insiste en numerar, usar guiones o colores: la estructura es '
             + 'lo que las hace consultables.' },
        { enonce:'Quand faut-il relire ses notes ?',
          o:['juste après', 'le soir', 'avant l’examen'], r:0,
          note:'En caliente la memoria todavía rellena los huecos. Dos horas después, ya no.' }
      ] },

    /* 2 */ { t:'paires', etiqueta:'Abréviations',
      consigne:'Celles de la liste de la page 25.',
      pairs: [
        ['bcp', 'beaucoup'], ['tjrs', 'toujours'], ['svt', 'souvent'],
        ['pdt', 'pendant'], ['qd', 'quand'], ['sf', 'sauf, excepté'],
        ['ms', 'mais'], ['objf', 'objectif'], ['qqch', 'quelque chose'],
        ['1fo', 'info'], ['tt / ts', 'tout / tous'], ['≠', 'différent, n’est pas']
      ] },

    /* 3 */ { t:'tri', etiqueta:'Les six procédés',
      consigne:'Comment chaque abréviation a-t-elle été fabriquée ?',
      cols: ['Début du mot', 'Consonnes principales', 'Écriture phonétique', 'Symbole ou convention'],
      items: [
        ['ex (exemple)', 0], ['info (information)', 0], ['objf (objectif)', 0],
        ['mn (minute)', 1], ['bcp (beaucoup)', 1], ['tjrs (toujours)', 1], ['pdt (pendant)', 1],
        ['NRJ (énergie)', 2], ['1fo (info)', 2],
        ['= (est, équivalent)', 3], ['p. (page)', 3], ['VH (Victor Hugo)', 3]
      ],
      aide:'<b>VH</b> es una abreviatura <i>de circunstancia</i>: te la inventas para ese '
         + 'documento. Por eso hay que escribir <b>una vez</b> el nombre completo.' },

    /* 4 */ { t:'trous', etiqueta:'Abréger',
      consigne:'Écris ces mots comme tu les noterais, d’après la liste du livre.',
      q: [
        { enonce:'beaucoup → ___', r:['bcp'], taille:8 },
        { enonce:'quelque chose → ___', r:['qqch'], taille:8 },
        { enonce:'problème → ___', r:['pb'], taille:8 },
        { enonce:'pendant → ___', r:['pdt'], taille:8 },
        { enonce:'sauf, excepté → ___', r:['sf'], taille:8 },
        { enonce:'objectif → ___', r:['objf'], taille:8 },
        { enonce:'« n’est pas », « différent » → ___ <i>(un symbole)</i>',
          r:['≠','=/=','/='], taille:8 },
        { enonce:'« supérieur à » → ___ <i>(un symbole)</i>', r:['>'], taille:8 }
      ] },

    /* 5 */ { t:'dictee', etiqueta:'Les chiffres',
      consigne:'Écoute et écris les chiffres, en lettres.',
      sous:'Las cifras son lo primero que se pierde en una escucha.',
      q: [
        { texte:'On parle à cent cinquante mots par minute et on écrit à vingt-cinq.' },
        { texte:'Trois enfants sur quatre refusent un légume qu’ils ne connaissent pas.' },
        { texte:'L’étude a été menée auprès de mille deux cents familles.' },
        { texte:'La séance dure une heure et demie.' },
        { texte:'Le programme existe depuis deux mille huit.' }
      ] },

    /* 6 */ { t:'prod', etiqueta:'Act. 3 · entraînement',
      consigne:'Écoute le podcast de l’activité 3 — « Pourquoi pas tous les mêmes goûts ? » — '
             + 'et prends des notes. Recopie-les ensuite ici, telles quelles.',
      sous:'Si no tienes el audio a mano, sirve cualquier pódcast en francés de tres minutos. '
         + 'Tráelas a clase: las comparamos, como pide la actividad 3c.',
      check: [
        'La estructura numerada o con guiones.',
        'Cuatro abreviaturas de la lista del libro.',
        'Una abreviatura <b>de circunstancia</b> tuya, con el nombre completo escrito una vez.',
        'Dos símbolos (=, ≠, &gt;, →).',
        'Todas las cifras.',
        'Un espacio en blanco donde no entendiste: eso también es técnica.'
      ],
      modele:'<b>Pq pas ts mêmes goûts ?</b> — podcast, 3 min<br>'
           + '1. Goûts = en partie innés → prime enfance<br>'
           + '  • influence de ce q la mère mangeait pdt la grossesse<br>'
           + '2. Mais goûts s’éduquent<br>'
           + '  • ateliers ds les écoles = « classes du goût » (CG)<br>'
           + '  • CG : 4 goûts = sucré, salé, amer, acide<br>'
           + '3. Idées reçues : sucré ≠ salé → faux<br>'
           + '  • ex. dinde salée + petits pois sucrés<br>'
           + '4. Csq : + on goûte tôt, + on est curieux ap.<br>'
           + '  • chiffre : … <i>(à compléter)</i>' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   SÉANCE 8 · 2 novembre · p. 26-27
   Unité 2 «Tellement genré !» — los estereotipos de género
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's8',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Lundi 2 novembre · p. 26-27',
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
      consigne:'Associe chaque mot à sa définition exacte.',
      sous:'Las cuatro primeras se parecen y no son lo mismo.',
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
   SÉANCE 9 · 4 novembre · p. 28-29
   Bébés et jouets · tellement, pourvu que, avoir hâte de
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's9',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Mercredi 4 novembre · p. 28-29',
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
   SÉANCE 10 · 9 novembre
   Repaso general y preparación de la evaluación
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's10',
  tipo: 'revision',
  ciclo: 'Oct.-nov. 2026',
  fecha: 'Lundi 9 novembre',
  titulo: 'Révision générale — tout le cycle',
  resumen: 'Todo lo del ciclo en un solo sitio, con un diagnóstico que te dice qué ficha repasar.',
  intro: 'Esta ficha no trae nada nuevo. Sirve para saber en qué estás flojo antes del 11, '
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
          o:['Ce qui', 'Ce que', 'Ce dont'], r:0, note:'→ Fiche du 26 octobre.' },
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
          o:['tellement', 'tellement de', 'si'], r:1, note:'Devant un nom : tellement <b>de</b>. Fiche du 4 novembre.' },
        { enonce:'J’ai hâte ___ tu arrives.',
          o:['de', 'que', 'à ce que'], r:1, note:'Sujets différents → que + subjonctif. Fiche du 4 novembre.' },
        { enonce:'Pourvu qu’elle ___ y aller !',
          o:['peut', 'puisse', 'pourra'], r:1, note:'pourvu que + subjonctif. Fiche du 4 novembre.' },
        { enonce:'Ça aide ___ comprendre.',
          o:['à', 'de', 'ø'], r:0, note:'→ Fiche du 2 novembre.' },
        { enonce:'Ça permet ___ choisir.',
          o:['à', 'de', 'ø'], r:1, note:'→ Fiche du 2 novembre.' },
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
   SÉANCE 11 · 11 novembre · Évaluation collective
   Prueba de ensayo completa, en el formato del DELF B2.
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's11',
  tipo: 'eval',
  ciclo: 'Oct.-nov. 2026',
  desde: '2026-11-09',          // se abre el día del repaso, no antes
  fecha: 'Mercredi 11 novembre',
  titulo: 'Épreuve blanche — écrit',
  resumen: 'Una prueba de ensayo completa: comprensión oral, comprensión escrita y producción escrita.',
  intro: 'Mismo formato que la evaluación del miércoles. Hazla de una sentada y cronometrada: '
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
   SÉANCE 12 · 16 novembre · Évaluation individuelle
   Preparación de la prueba oral.
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 's12',
  tipo: 'eval',
  ciclo: 'Oct.-nov. 2026',
  desde: '2026-11-11',          // se abre después de la prueba escrita
  fecha: 'Lundi 16 novembre',
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
