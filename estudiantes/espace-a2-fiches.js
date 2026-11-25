/* ═══════════════════════════════════════════════════════════════════════
   EJERCICIOS COMPLEMENTARIOS · A2.1 — NOVIEMBRE 2026 · UNITÉ 5
   ═══════════════════════════════════════════════════════════════════════
   Défi 1, Unité 5 «Métro, boulot, dodo»: una ficha por cada clase del ciclo
   (pp. 80, 81, 82-83, 84-85 y 86-88), precedidas de un repaso de la
   apertura de la unidad (pp. 76-79), que se vio al final del A1.4. Cada ficha empieza por la explicación
   del tema y sigue con la práctica; ningún tema nuevo va sin su explicación.

   No hay nombres ni datos de estudiantes en este archivo: se publica con el
   sitio. Las cifras de la ficha 3 son las de la infografía del libro (p. 82).

   Tipos de ejercicio (motor en assets/js/fichas-ejercicios.js):
     qcm · trous · tri · paires · transfo · dictee · prod · ordre
   ═══════════════════════════════════════════════════════════════════════ */

const FICHAS = [];

/* ═══════════════════════════════════════════════════════════════════════
   0 · REMISE À NIVEAU — LES BASES   (recorrido obligatorio del A2.1)
   Nueve fichas que recuperan lo de base que la Unité 5 dejó ver como poco
   firme: vocales y nasales, los números (60 a 99), la hora, los verbos de
   los tres grupos y, al final, los verbos de la rutina con el paso al
   passé composé. Cada ficha empieza por su explicación (rappels) y sigue
   con la práctica; la última es un balance que mezcla todo.
   ═══════════════════════════════════════════════════════════════════════ */
const RN = { tipo: 'bases', ciclo: 'Nov. 2026 · A2.1' };
const TBL = 'style="width:100%;border-collapse:collapse;margin:.6rem 0"';

FICHAS.push(Object.assign({}, RN, {
  id: 'rn-1', fecha: 'Les bases · 1/9',
  titulo: 'Les voyelles, simples et composées',
  resumen: 'Las vocales una por una, los acentos y las vocales compuestas (ou, oi, ai, eau, eu, ui), con el par que más cuesta: ou y u.',
  intro: 'Todo lo demás —la hora, los números, los verbos— se apoya en oír y escribir bien las vocales. '
       + 'Antes de empezar, si quieres, repasa la presentación «Les sons et les voyelles» desde tu menú de Les bases.',
  secciones: [
    { titulo: '1. Les voyelles simples et les accents',
      sous: 'Seis vocales y los acentos que cambian el sonido de la e.',
      rappels: [
        { titulo: 'Six voyelles, trois accents',
          html: `<p>El francés escribe seis vocales: <b>a, e, i, o, u, y</b>. Cinco se parecen al español; la
          <b>u</b> no: se dice con los labios de <i>ou</i> pero con la lengua de <i>i</i> (<i>tu, rue, lune</i>).</p>
          <table ${TBL}>
            <tr><th style="text-align:left;padding:.3rem">Letra</th><th style="text-align:left;padding:.3rem">Sonido</th><th style="text-align:left;padding:.3rem">Ejemplos</th></tr>
            <tr><td style="padding:.3rem"><b>é</b></td><td>[e] cerrada, labios tensos</td><td>été, café, écouter</td></tr>
            <tr><td style="padding:.3rem"><b>è ê ë</b></td><td>[ɛ] abierta</td><td>mère, tête, Noël</td></tr>
            <tr><td style="padding:.3rem"><b>e</b> sin acento</td><td>[ə] débil, o mudo al final</td><td>le, je, table</td></tr>
            <tr><td style="padding:.3rem"><b>à â / ù û / î ï / ô</b></td><td>el acento no cambia el sonido</td><td>là, où, île, hôtel</td></tr>
            <tr><td style="padding:.3rem"><b>u</b></td><td>[y] labios redondos, lengua adelante</td><td>tu, rue, lune</td></tr>
          </table>
          <div class="piege"><b>Ojo:</b> el acento de <i>é, è</i> es parte de la palabra: <i>pere</i> está mal, <i>père</i> está bien.
          Y la <b>e</b> final casi nunca se oye: <i>table, porte, elle</i>.</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: '2. Les voyelles composées',
      sous: 'Dos letras, un solo sonido.',
      rappels: [
        { titulo: 'Deux lettres, un son',
          html: `<table ${TBL}>
            <tr><th style="text-align:left;padding:.3rem">Grupo</th><th style="text-align:left;padding:.3rem">Sonido</th><th style="text-align:left;padding:.3rem">Ejemplos</th></tr>
            <tr><td style="padding:.3rem"><b>ou</b></td><td>[u]</td><td>rouge, jour, vous</td></tr>
            <tr><td style="padding:.3rem"><b>oi</b></td><td>[wa]</td><td>moi, voiture, trois</td></tr>
            <tr><td style="padding:.3rem"><b>ai, ei</b></td><td>[ɛ]</td><td>lait, maison, neige</td></tr>
            <tr><td style="padding:.3rem"><b>au, eau</b></td><td>[o]</td><td>chaud, bateau, beau</td></tr>
            <tr><td style="padding:.3rem"><b>eu, œu</b></td><td>[ø] / [œ]</td><td>peu, fleur, sœur</td></tr>
            <tr><td style="padding:.3rem"><b>ui</b></td><td>[ɥi]</td><td>nuit, huit, fruit</td></tr>
          </table>
          <div class="ex"><b>El par difícil: <i>ou</i> y <i>u</i>.</b> <i>Tout</i> (todo) no es <i>tu</i> (tú); <i>roue</i> (rueda)
          no es <i>rue</i> (calle). Un solo sonido cambia el significado, y por eso conviene oírlo bien.</div>` }
      ],
      ejercicios: [2, 3, 4, 5]
    }
  ],
  ejercicios: [
    /* 0 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Quel accent faut-il sur la lettre e ?',
      sous:'Piensa en cómo suena: cerrada [e] o abierta [ɛ].',
      q: [
        { enonce:'Un caf___ (el sonido final es [e])', o:['é', 'è', 'ê'], r:0 },
        { enonce:'Ma m___re (la e es abierta)', o:['é', 'è', 'e'], r:1 },
        { enonce:'Une t___te (la e es abierta)', o:['é', 'ê', 'e'], r:1 },
        { enonce:'L’___té (la estación del calor)', o:['é', 'è', 'e'], r:0 },
        { enonce:'Une table : la e final…', o:['se pronuncia fuerte', 'casi no se oye', 'lleva siempre acento'], r:1 }
      ] },
    /* 1 */ { t:'tri', etiqueta:'Classe',
      consigne:'Le son est-il [u] (ou) ou [y] (u) ?',
      sous:'[u]: labios redondos y lengua atrás. [y]: labios redondos y lengua adelante.',
      cols: ['ou [u]', 'u [y]'],
      items: [
        ['tout', 0], ['rouge', 0], ['vous', 0], ['jour', 0], ['nous', 0],
        ['tu', 1], ['rue', 1], ['lune', 1], ['sur', 1], ['mur', 1]
      ] },
    /* 2 */ { t:'paires', etiqueta:'Associe',
      consigne:'Associe chaque voyelle composée à un mot qui la contient.',
      pairs: [
        ['ou', 'rouge'], ['oi', 'voiture'], ['ai', 'maison'],
        ['eau', 'bateau'], ['eu', 'peu'], ['ui', 'nuit']
      ] },
    /* 3 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Quel son entends-tu dans le mot ?',
      q: [
        { enonce:'roue', o:['[u] comme dans tout', '[y] comme dans tu'], r:0 },
        { enonce:'rue', o:['[u] comme dans tout', '[y] comme dans tu'], r:1 },
        { enonce:'moi', o:['[wa]', '[o]', '[u]'], r:0 },
        { enonce:'neige', o:['[ɛ]', '[ø]', '[wa]'], r:0, note:'<i>ei</i> suena como <i>ai</i>: [ɛ].' },
        { enonce:'bateau', o:['[o]', '[u]', '[ɛ]'], r:0, note:'<i>eau</i> suena [o], igual que <i>au</i> en <i>chaud</i>.' },
        { enonce:'fleur', o:['[ø] / [œ]', '[u]', '[wa]'], r:0 }
      ] },
    /* 4 */ { t:'trous', etiqueta:'Complète',
      consigne:'Écris la voyelle composée qui manque.',
      sous:'Una de ou, oi, ai, eau, eu, ui.',
      q: [
        { enonce:'v___ture (un coche)', r:['oi'], taille:6 },
        { enonce:'m___son (un hogar)', r:['ai'], taille:6 },
        { enonce:'bat___ (un barco)', r:['eau'], taille:6 },
        { enonce:'n___t (lo contrario del día)', r:['ui'], taille:6 },
        { enonce:'j___r (lo contrario de la noche)', r:['ou'], taille:6 },
        { enonce:'p___ (poco)', r:['eu'], taille:6 }
      ] },
    /* 5 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris.',
      sous:'Las vocales compuestas se escriben con dos letras aunque suenen una vez.',
      q: [
        { texte:'Il pleut sur la route.' },
        { texte:'Nous avons une voiture rouge.' },
        { texte:'Moi, j’aime le beau temps.' },
        { texte:'Elle a peur de la nuit.' },
        { texte:'Au revoir, à bientôt.' }
      ] }
  ]
}));

FICHAS.push(Object.assign({}, RN, {
  id: 'rn-2', fecha: 'Les bases · 2/9',
  titulo: 'Les sons nasaux : an, on, in, un',
  resumen: 'Cuatro vocales nasales y la regla para saber cuándo la n se oye y cuándo solo nasaliza.',
  intro: 'Las nasales son lo que más delata el acento en francés, y también lo que más se pierde al escribir. '
       + 'Aquí se oyen, se separan y se escriben. Si quieres oírlas con calma, abre «Les sons nasaux, sifflants et vibrants» en tu menú.',
  secciones: [
    { titulo: '1. Les quatre nasales',
      sous: 'Cuatro sonidos con varias grafías.',
      rappels: [
        { titulo: 'Quatre sons, plusieurs écritures',
          html: `<table ${TBL}>
            <tr><th style="text-align:left;padding:.3rem">Sonido</th><th style="text-align:left;padding:.3rem">Se escribe</th><th style="text-align:left;padding:.3rem">Ejemplos</th></tr>
            <tr><td style="padding:.3rem">[ɑ̃]</td><td><b>an, am, en, em</b></td><td>enfant, vent, chambre, temps</td></tr>
            <tr><td style="padding:.3rem">[ɔ̃]</td><td><b>on, om</b></td><td>bon, maison, pont, nom</td></tr>
            <tr><td style="padding:.3rem">[ɛ̃]</td><td><b>in, im, ain, ein</b></td><td>vin, matin, pain, plein</td></tr>
            <tr><td style="padding:.3rem">[œ̃]</td><td><b>un, um</b></td><td>un, lundi, parfum</td></tr>
          </table>
          <p>Se hacen con la boca de la vocal y el aire saliendo también por la nariz. La <b>n</b> no se pronuncia:
          solo avisa de que la vocal es nasal.</p>` },
        { titulo: 'Nasale ou pas ? La règle de la n',
          html: `<p>La vocal es nasal cuando <b>la n o la m cierra la sílaba</b>: <i>bon, pain, un</i>. Si después de la n
          viene otra vocal, o hay <b>nn / mm</b>, ya no es nasal y la n se oye:</p>
          <div class="ex"><i>bon</i> [bɔ̃] → <i>bonne</i> [bɔn] · <i>un</i> [œ̃] → <i>une</i> [yn] · <i>plein</i> [plɛ̃] → <i>pleine</i> [plɛn]</div>
          <div class="piege"><b>Ojo:</b> el femenino devuelve la n. Si oyes la n, la vocal ya no es nasal; si no la oyes, sí.</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: '2. S’entraîner',
      sous: 'Separar, completar y escribir.',
      rappels: [],
      ejercicios: [2, 3, 4]
    }
  ],
  ejercicios: [
    /* 0 */ { t:'tri', etiqueta:'Classe',
      consigne:'Quelle nasale entends-tu dans chaque mot ?',
      cols: ['an / en [ɑ̃]', 'on [ɔ̃]', 'in / ain / ein [ɛ̃]'],
      items: [
        ['enfant', 0], ['vent', 0], ['dent', 0], ['grand', 0],
        ['bon', 1], ['maison', 1], ['pont', 1], ['mon', 1],
        ['vin', 2], ['pain', 2], ['plein', 2], ['matin', 2]
      ] },
    /* 1 */ { t:'qcm', etiqueta:'Nasale ou pas ?',
      consigne:'Écoute-toi dire les deux mots, puis choisis.',
      q: [
        { enonce:'Dans quel mot entend-on le [n] ?', o:['bon', 'bonne'], r:1 },
        { enonce:'Dans quel mot la voyelle est nasale ?', o:['lune', 'lundi'], r:1, note:'<i>Lundi</i> lleva <i>un</i> nasal; <i>lune</i> tiene <i>u</i> + n, y la n se oye.' },
        { enonce:'Quelle forme est le féminin ?', o:['plein', 'pleine'], r:1 },
        { enonce:'« Un ami » ou « une amie » : où entend-on le [n] ?', o:['un ami', 'une amie'], r:1 },
        { enonce:'Le mot « mon » contient…', o:['une nasale', 'un [n] comme dans « mine »'], r:0 }
      ] },
    /* 2 */ { t:'paires', etiqueta:'Associe',
      consigne:'Associe chaque écriture nasale à un mot.',
      pairs: [
        ['an', 'enfant'], ['en', 'vent'], ['on', 'maison'],
        ['in', 'vin'], ['ain', 'pain'], ['ein', 'plein'], ['un', 'lundi']
      ] },
    /* 3 */ { t:'trous', etiqueta:'Complète',
      consigne:'Écris la nasale qui manque.',
      sous:'Una de an, on, ain, ent, un.',
      q: [
        { enonce:'Une gr___de maison', r:['an'], taille:6 },
        { enonce:'Un b___ repas', r:['on'], taille:6 },
        { enonce:'Du p___ et du fromage', r:['ain'], taille:6 },
        { enonce:'Il y a du v___ aujourd’hui (aire en movimiento)', r:['ent'], taille:6 },
        { enonce:'Un l___di matin', r:['un'], taille:6 }
      ] },
    /* 4 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris.',
      sous:'La n final avisa de la nasal pero no se pronuncia.',
      q: [
        { texte:'Mon enfant mange du pain.' },
        { texte:'Nous avons un bon vin.' },
        { texte:'Le lundi, il fait un long voyage.' },
        { texte:'Elle prend un grand sandwich.' }
      ] }
  ]
}));

FICHAS.push(Object.assign({}, RN, {
  id: 'rn-3', fecha: 'Les bases · 3/9',
  titulo: 'Les nombres de 0 à 100 : 60, 70, 80, 90',
  resumen: 'Cómo se forman los números, por qué 70 es «sesenta y diez» y 80 «cuatro veinte», y cuándo se escribe la s de quatre-vingts.',
  intro: 'Los números 70 a 99 son los que más se traban porque se cuentan con otra lógica. Aquí se explica la lógica y luego se practica '
       + 'en los dos sentidos: de cifra a letra y de letra a cifra.',
  secciones: [
    { titulo: '1. Comprendre la logique',
      sous: 'Del 0 al 69 es regular; del 70 en adelante cambia.',
      rappels: [
        { titulo: '0 à 69 : les bases',
          html: `<table ${TBL}>
            <tr><td style="padding:.3rem">0 zéro</td><td>1 un</td><td>2 deux</td><td>3 trois</td><td>4 quatre</td><td>5 cinq</td></tr>
            <tr><td style="padding:.3rem">6 six</td><td>7 sept</td><td>8 huit</td><td>9 neuf</td><td>10 dix</td><td>11 onze</td></tr>
            <tr><td style="padding:.3rem">12 douze</td><td>13 treize</td><td>14 quatorze</td><td>15 quinze</td><td>16 seize</td><td>17 dix-sept</td></tr>
          </table>
          <p>Las decenas: <b>vingt</b> (20), <b>trente</b> (30), <b>quarante</b> (40), <b>cinquante</b> (50), <b>soixante</b> (60).
          Se une la unidad con un guion: <i>vingt-deux, trente-cinq, soixante-neuf</i>.</p>
          <div class="piege"><b>Ojo:</b> con <b>1</b> se dice <b>et</b> y sin guion: <i>vingt <b>et</b> un, trente <b>et</b> un, soixante <b>et</b> un</i>.
          Con 2 a 9, guion: <i>vingt-deux</i>. Y 17, 18, 19 son <i>dix-sept, dix-huit, dix-neuf</i>.</div>` },
        { titulo: '70 à 99 : on compte avec 60 et 80',
          html: `<p>El francés de Francia no tiene palabras propias para 70, 80 y 90: los construye.</p>
          <table ${TBL}>
            <tr><th style="text-align:left;padding:.3rem">Número</th><th style="text-align:left;padding:.3rem">Cómo se construye</th><th style="text-align:left;padding:.3rem">Se escribe</th></tr>
            <tr><td style="padding:.3rem">70</td><td>60 + 10</td><td><b>soixante-dix</b></td></tr>
            <tr><td style="padding:.3rem">71</td><td>60 + 11 (con <i>et</i>)</td><td><b>soixante et onze</b></td></tr>
            <tr><td style="padding:.3rem">75</td><td>60 + 15</td><td><b>soixante-quinze</b></td></tr>
            <tr><td style="padding:.3rem">80</td><td>4 × 20</td><td><b>quatre-vingts</b></td></tr>
            <tr><td style="padding:.3rem">81</td><td>4 × 20 + 1 (sin <i>et</i>)</td><td><b>quatre-vingt-un</b></td></tr>
            <tr><td style="padding:.3rem">90</td><td>4 × 20 + 10</td><td><b>quatre-vingt-dix</b></td></tr>
            <tr><td style="padding:.3rem">99</td><td>4 × 20 + 19</td><td><b>quatre-vingt-dix-neuf</b></td></tr>
            <tr><td style="padding:.3rem">100</td><td></td><td><b>cent</b></td></tr>
          </table>
          <div class="ex"><b>Quatre-vingts</b> lleva <b>s</b> solo cuando es el 80 exacto. Si va seguido de otro número, la pierde:
          <i>quatre-vingt-un, quatre-vingt-quinze</i>.</div>
          <div class="ex"><b>En Bélgica y en Suiza</b> es más sencillo: <i>septante</i> (70) y <i>nonante</i> (90).
          Los entenderás y a veces los leerás, como en la infografía del libro.</div>` }
      ],
      ejercicios: [0, 1, 2]
    },
    { titulo: '2. S’entraîner à lire, écrire et entendre',
      sous: 'Cifras, letras y dictado.',
      rappels: [],
      ejercicios: [3, 4, 5]
    }
  ],
  ejercicios: [
    /* 0 */ { t:'trous', etiqueta:'Écris en lettres',
      consigne:'Écris ces nombres en lettres.',
      sous:'Con guiones. Cuidado con et, con la s de quatre-vingts y con el 70 y el 90.',
      q: [
        { enonce:'60 → ___', r:['soixante'], taille:20 },
        { enonce:'70 → ___', r:['soixante-dix', 'soixante dix'], taille:20 },
        { enonce:'71 → ___', r:['soixante et onze', 'soixante-et-onze'], taille:20 },
        { enonce:'80 → ___', r:['quatre-vingts', 'quatre vingts'], taille:20 },
        { enonce:'81 → ___', r:['quatre-vingt-un', 'quatre vingt un'], taille:20 },
        { enonce:'90 → ___', r:['quatre-vingt-dix', 'quatre vingt dix'], taille:20 },
        { enonce:'99 → ___', r:['quatre-vingt-dix-neuf', 'quatre vingt dix neuf'], taille:24 }
      ] },
    /* 1 */ { t:'trous', etiqueta:'Écris en chiffres',
      consigne:'Écris ces nombres en chiffres.',
      sous:'Solo las cifras: 84, 73…',
      q: [
        { enonce:'quatre-vingt-quatre → ___', r:['84'], taille:6 },
        { enonce:'soixante-treize → ___', r:['73'], taille:6 },
        { enonce:'quatre-vingt-seize → ___', r:['96'], taille:6 },
        { enonce:'soixante et un → ___', r:['61'], taille:6 },
        { enonce:'quatre-vingt-cinq → ___', r:['85'], taille:6 },
        { enonce:'soixante-dix-sept → ___', r:['77'], taille:6 }
      ] },
    /* 2 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Quelle est la bonne écriture ?',
      q: [
        { enonce:'80', o:['quatre-vingts', 'quatre-vingt', 'quatre vingtes'], r:0 },
        { enonce:'81', o:['quatre-vingts-un', 'quatre-vingt-un', 'quatre-vingt-et-un'], r:1, note:'Con 81 no hay <i>s</i> ni <i>et</i>.' },
        { enonce:'71', o:['soixante et onze', 'soixante-un-dix', 'soixante-onze-un'], r:0 },
        { enonce:'92', o:['quatre-vingt-douze', 'quatre-vingts-douze', 'quatre-douze'], r:0 },
        { enonce:'Quel mot est belge ou suisse ?', o:['septante', 'soixante-dix', 'quatre-vingts'], r:0 }
      ] },
    /* 3 */ { t:'paires', etiqueta:'Associe',
      consigne:'Associe le chiffre et le nombre en lettres.',
      pairs: [
        ['60', 'soixante'], ['70', 'soixante-dix'], ['75', 'soixante-quinze'],
        ['80', 'quatre-vingts'], ['90', 'quatre-vingt-dix'], ['100', 'cent']
      ] },
    /* 4 */ { t:'qcm', etiqueta:'Calcule',
      consigne:'Fais le calcul de tête et choisis le résultat.',
      q: [
        { enonce:'soixante + vingt = ?', o:['quatre-vingts', 'quatre-vingt-dix', 'soixante-dix'], r:0 },
        { enonce:'cinquante + trente-neuf = ?', o:['quatre-vingt-neuf', 'soixante-dix-neuf', 'quatre-vingt-dix'], r:0 },
        { enonce:'quatre-vingt-dix − dix = ?', o:['soixante-dix', 'quatre-vingts', 'cent'], r:1 },
        { enonce:'trente + quarante = ?', o:['soixante-dix', 'quatre-vingts', 'soixante'], r:0 }
      ] },
    /* 5 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris. Les nombres, en lettres.',
      sous:'Cada número, en letras y con sus guiones.',
      q: [
        { texte:'Il a soixante-quinze ans.' },
        { texte:'Ça coûte quatre-vingt-dix euros.' },
        { texte:'Nous sommes quatre-vingts à la fête.' },
        { texte:'Elle habite au soixante et onze, rue de la Paix.' }
      ] }
  ]
}));

FICHAS.push(Object.assign({}, RN, {
  id: 'rn-4', fecha: 'Les bases · 4/9',
  titulo: 'L’heure : dire, lire et écrire',
  resumen: 'La hora en lenguaje corriente y en horario oficial, y las palabras que acompañan una hora (à, de… à, vers).',
  intro: 'La hora es lo que más se usa en la rutina y donde más se mezclan las dos maneras de decirla. '
       + 'Aquí se separan: primero la manera de todos los días, luego la oficial, y después se practican las dos.',
  secciones: [
    { titulo: '1. Deux façons de dire l’heure',
      sous: 'Corriente (12 horas) y oficial (24 horas).',
      rappels: [
        { titulo: 'La langue de tous les jours',
          html: `<p>Se pregunta <i>Quelle heure est-il ?</i> y se responde <i>Il est huit heures.</i> Cuando algo ocurre a una hora,
          se usa <b>à</b>: <i>Je me lève à sept heures.</i></p>
          <table ${TBL}>
            <tr><td style="padding:.3rem">8 h 05</td><td>huit heures cinq</td></tr>
            <tr><td style="padding:.3rem">8 h 15</td><td>huit heures <b>et quart</b></td></tr>
            <tr><td style="padding:.3rem">8 h 30</td><td>huit heures <b>et demie</b></td></tr>
            <tr><td style="padding:.3rem">8 h 45</td><td>neuf heures <b>moins le quart</b></td></tr>
            <tr><td style="padding:.3rem">8 h 50</td><td>neuf heures <b>moins dix</b></td></tr>
            <tr><td style="padding:.3rem">12 h 00 / 12 h 30</td><td><b>midi</b> / <b>midi et demi</b></td></tr>
            <tr><td style="padding:.3rem">0 h 00</td><td><b>minuit</b></td></tr>
          </table>
          <p>Pasada la media hora se dice la hora siguiente <b>moins</b> los minutos que faltan.</p>` },
        { titulo: 'L’heure officielle et les petits mots',
          html: `<p>Para trenes, citas y clases se cuenta de 0 a 24 y <b>no</b> se usa <i>et quart, et demie, moins</i>:
          <i>dix-sept heures quarante</i> (17 h 40), <i>dix-neuf heures quinze</i> (19 h 15).</p>
          <div class="ex"><b>À</b> una hora: <i>à huit heures</i> · <b>de… à…</b> un periodo: <i>de huit heures à dix-sept heures</i> ·
          <b>vers</b> más o menos: <i>vers midi</i>.</div>
          <div class="piege"><b>Ojo:</b> <i>heure</i> es femenino, por eso <i>et demi<b>e</b></i>; con <i>midi</i>, masculino: <i>midi et demi</i>.
          Y en francés se escribe <b>8 h 30</b>, con una h, no 8:30.</div>` }
      ],
      ejercicios: [0, 1, 2]
    },
    { titulo: '2. S’entraîner',
      sous: 'Pasar de una forma a otra, ordenar y escribir.',
      rappels: [],
      ejercicios: [3, 4, 5]
    }
  ],
  ejercicios: [
    /* 0 */ { t:'trous', etiqueta:'Complète',
      consigne:'Complète avec et quart, et demie, moins le quart, moins dix…',
      sous:'Escribe solo lo que falta: et quart, et demie…',
      q: [
        { enonce:'3 h 15 → trois heures ___', r:['et quart'], taille:12 },
        { enonce:'3 h 30 → trois heures ___', r:['et demie'], taille:12 },
        { enonce:'3 h 45 → quatre heures ___', r:['moins le quart'], taille:14 },
        { enonce:'3 h 50 → quatre heures ___', r:['moins dix'], taille:12 },
        { enonce:'12 h 30 → midi ___', r:['et demi'], taille:10 },
        { enonce:'10 h 05 → dix heures ___', r:['cinq'], taille:8 }
      ] },
    /* 1 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Comment dit-on cette heure dans le style officiel (0 à 24) ?',
      q: [
        { enonce:'18 h 40', o:['dix-huit heures quarante', 'six heures quarante', 'dix-huit heures et quarante'], r:0 },
        { enonce:'14 h 15', o:['quatorze heures et quart', 'quatorze heures quinze', 'deux heures quinze'], r:1 },
        { enonce:'16 h 45', o:['seize heures quarante-cinq', 'seize heures moins le quart', 'quatre heures quarante-cinq'], r:0 },
        { enonce:'0 h 20', o:['minuit vingt', 'zéro heure vingt', 'vingt heures zéro'], r:1 },
        { enonce:'21 h 30', o:['vingt et une heures trente', 'vingt-un heures et demie', 'vingt-deux heures trente'], r:0 }
      ] },
    /* 2 */ { t:'trous', etiqueta:'Complète',
      consigne:'À, de, vers, et ou moins ?',
      q: [
        { enonce:'Je me lève ___ sept heures.', r:['à', 'a'], taille:6 },
        { enonce:'Je travaille ___ huit heures jusqu’à dix-sept heures.', r:['de'], taille:6 },
        { enonce:'Nous arrivons ___ midi (más o menos).', r:['vers'], taille:6 },
        { enonce:'Il est une heure ___ quart.', r:['et'], taille:6 },
        { enonce:'Il est une heure ___ le quart (12 h 45).', r:['moins'], taille:8 }
      ] },
    /* 3 */ { t:'transfo', etiqueta:'Transformer',
      consigne:'Dis l’heure dans la langue de tous les jours.',
      sous:'Del horario oficial al corriente.',
      q: [
        { enonce:'Il est dix-neuf heures quarante-cinq.', modele:'Il est huit heures moins le quart.' },
        { enonce:'Il est vingt heures trente.', modele:'Il est huit heures et demie.' },
        { enonce:'Il est treize heures quinze.', modele:'Il est une heure et quart.' },
        { enonce:'Il est vingt-trois heures cinquante.', modele:'Il est minuit moins dix.' }
      ] },
    /* 4 */ { t:'ordre', etiqueta:'Une journée',
      consigne:'Remets cette journée dans l’ordre.',
      sous:'De la mañana a la noche, siguiendo las horas.',
      items: [
        'À sept heures et demie, je prends le petit déjeuner.',
        'À midi, je déjeune.',
        'À cinq heures, je sors du travail.',
        'À huit heures du soir, je dîne.',
        'À minuit, je dors.'
      ] },
    /* 5 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris. Les heures, en lettres.',
      sous:'Las horas se escriben en letras en el dictado.',
      q: [
        { texte:'Il est huit heures et quart.' },
        { texte:'Le train part à dix-sept heures quarante.' },
        { texte:'Je me couche à minuit moins dix.' },
        { texte:'Le cours commence à dix-neuf heures.' }
      ] }
  ]
}));

FICHAS.push(Object.assign({}, RN, {
  id: 'rn-5', fecha: 'Les bases · 5/9',
  titulo: 'Les verbes du premier groupe : -er',
  resumen: 'El presente de los verbos en -er (parler, manger, commencer…), por qué las terminaciones casi no se oyen y las pequeñas excepciones.',
  intro: 'Más del 90 % de los verbos franceses terminan en -er y se conjugan igual. Si esto queda firme, el resto del camino se simplifica. '
       + 'Antes de empezar puedes revisar la presentación «Les verbes» de tu menú.',
  secciones: [
    { titulo: '1. Comprendre le modèle',
      sous: 'Una raíz que no cambia y seis terminaciones.',
      rappels: [
        { titulo: 'La racine et les terminaisons',
          html: `<p>Se quita <b>-er</b> y se queda la raíz; luego se añade la terminación de cada persona.</p>
          <table ${TBL}>
            <tr><th style="text-align:left;padding:.3rem">Persona</th><th style="text-align:left;padding:.3rem">parler</th><th style="text-align:left;padding:.3rem">Terminación</th></tr>
            <tr><td style="padding:.3rem">je</td><td>parl<b>e</b></td><td>-e</td></tr>
            <tr><td style="padding:.3rem">tu</td><td>parl<b>es</b></td><td>-es</td></tr>
            <tr><td style="padding:.3rem">il / elle / on</td><td>parl<b>e</b></td><td>-e</td></tr>
            <tr><td style="padding:.3rem">nous</td><td>parl<b>ons</b></td><td>-ons</td></tr>
            <tr><td style="padding:.3rem">vous</td><td>parl<b>ez</b></td><td>-ez</td></tr>
            <tr><td style="padding:.3rem">ils / elles</td><td>parl<b>ent</b></td><td>-ent</td></tr>
          </table>
          <p><b>Se oye muy poco y se escribe mucho:</b> <i>je parle, tu parles, il parle, ils parlent</i> suenan igual.
          Para saber cuál escribir hay que mirar el sujeto, no el oído.</p>
          <p>Delante de vocal o h muda, <i>je</i> se convierte en <b>j’</b>: <i>j’aime, j’habite, j’écoute</i>.</p>` },
        { titulo: 'Les petits changements',
          html: `<div class="ex"><b>manger</b> → <i>nous mange<b>o</b>ns</i> (la g sigue suave: se añade una e).<br>
          <b>commencer</b> → <i>nous commen<b>ç</b>ons</i> (la c lleva cedilla para seguir sonando [s]).<br>
          <b>acheter</b> → <i>j’ach<b>è</b>te, nous achetons</i> (cambia la e, salvo nous y vous).<br>
          <b>appeler</b> → <i>j’appe<b>ll</b>e, nous appelons</i> (se duplica la l, salvo nous y vous).</div>` }
      ],
      ejercicios: [0, 1, 2]
    },
    { titulo: '2. S’entraîner',
      sous: 'Del singular al plural, dictado y producción.',
      rappels: [],
      ejercicios: [3, 4, 5]
    }
  ],
  ejercicios: [
    /* 0 */ { t:'trous', etiqueta:'Complète',
      consigne:'Conjugue le verbe au présent.',
      sous:'Solo el verbo conjugado.',
      q: [
        { enonce:'J’___ le café. <i>(aimer)</i>', r:['aime'], taille:10 },
        { enonce:'Nous ___ à Paris. <i>(habiter)</i>', r:['habitons'], taille:12 },
        { enonce:'Vous ___ à la maison ? <i>(travailler)</i>', r:['travaillez'], taille:12 },
        { enonce:'Ils ___ la télé. <i>(regarder)</i>', r:['regardent'], taille:12 },
        { enonce:'Tu ___ une chanson. <i>(chanter)</i>', r:['chantes'], taille:10 },
        { enonce:'Elle ___ le français. <i>(étudier)</i>', r:['étudie', 'etudie'], taille:10 }
      ] },
    /* 1 */ { t:'tri', etiqueta:'Classe',
      consigne:'Quelle est la terminaison de chaque verbe conjugué ?',
      cols: ['-e', '-es', '-ons', '-ez', '-ent'],
      items: [
        ['je regarde', 0], ['il parle', 0],
        ['tu aimes', 1], ['tu chantes', 1],
        ['nous chantons', 2], ['nous habitons', 2],
        ['vous parlez', 3], ['vous mangez', 3],
        ['ils mangent', 4], ['elles étudient', 4]
      ] },
    /* 2 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Quelle forme est correcte ?',
      q: [
        { enonce:'Tu ___ le français.', o:['parle', 'parles', 'parlent'], r:1 },
        { enonce:'Elles ___ beaucoup.', o:['chante', 'chantes', 'chantent'], r:2 },
        { enonce:'Nous ___ au restaurant.', o:['mange', 'mangeons', 'mangons'], r:1, note:'Con <i>nous</i>, el verbo <i>manger</i> lleva una e para que la g siga suave.' },
        { enonce:'Nous ___ la leçon.', o:['commençons', 'commencons', 'commence'], r:0, note:'La <i>ç</i> con cedilla mantiene el sonido [s].' },
        { enonce:'J’___ un livre.', o:['achète', 'achete', 'achetes'], r:0 }
      ] },
    /* 3 */ { t:'transfo', etiqueta:'Transformer',
      consigne:'Mets la phrase au pluriel.',
      sous:'Cambia el sujeto y adapta la terminación.',
      q: [
        { enonce:'Je travaille à Paris.', modele:'Nous travaillons à Paris.' },
        { enonce:'Tu parles français.', modele:'Vous parlez français.' },
        { enonce:'Il mange une pomme.', modele:'Ils mangent une pomme.' },
        { enonce:'Elle étudie le soir.', modele:'Elles étudient le soir.' },
        { enonce:'J’aime le café.', modele:'Nous aimons le café.' }
      ] },
    /* 4 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris.',
      sous:'Cuidado: se oye poco y se escribe mucho.',
      q: [
        { texte:'Nous mangeons à midi.' },
        { texte:'Ils arrivent à huit heures.' },
        { texte:'Tu regardes la télé ?' },
        { texte:'Vous habitez à Paris ?' },
        { texte:'Elle commence à neuf heures.' }
      ] },
    /* 5 */ { t:'prod', etiqueta:'Écrire', mots:40,
      consigne:'Dis ce que tu fais le week-end.',
      sous:'40 palabras, solo con verbos en -er.',
      check: [
        'Al menos cinco verbos en -er (regarder, manger, chanter, parler, habiter…).',
        'Con al menos tres sujetos distintos: je, nous, ils / elle…',
        'Las terminaciones correctas: -e, -es, -ons, -ez, -ent.',
        'Una hora o un momento del día (le matin, à midi…).'
      ],
      modele:'Le week-end, je regarde la télé et j’écoute de la musique. Ma sœur chante dans la cuisine '
           + 'et nous mangeons ensemble à midi. Le soir, mes amis arrivent à huit heures, nous parlons '
           + 'beaucoup et nous dansons un peu.' }
  ]
}));

FICHAS.push(Object.assign({}, RN, {
  id: 'rn-6', fecha: 'Les bases · 6/9',
  titulo: 'Les verbes du deuxième groupe : -ir, -issons',
  resumen: 'Finir, choisir, réussir: el presente con -iss- en el plural, y cómo distinguirlos de dormir, sortir y partir.',
  intro: 'Los verbos en -ir se dividen en dos familias. Los del segundo grupo son regulares y tienen una marca fácil de oír: '
       + 'la sílaba -iss- en el plural. Los otros, del tercer grupo, se verán en la ficha siguiente.',
  secciones: [
    { titulo: '1. Comprendre le modèle',
      sous: 'La marca -iss- y la lista corta.',
      rappels: [
        { titulo: 'Finir : le modèle',
          html: `<table ${TBL}>
            <tr><th style="text-align:left;padding:.3rem">Persona</th><th style="text-align:left;padding:.3rem">finir</th></tr>
            <tr><td style="padding:.3rem">je</td><td>fin<b>is</b></td></tr>
            <tr><td style="padding:.3rem">tu</td><td>fin<b>is</b></td></tr>
            <tr><td style="padding:.3rem">il / elle / on</td><td>fin<b>it</b></td></tr>
            <tr><td style="padding:.3rem">nous</td><td>fin<b>issons</b></td></tr>
            <tr><td style="padding:.3rem">vous</td><td>fin<b>issez</b></td></tr>
            <tr><td style="padding:.3rem">ils / elles</td><td>fin<b>issent</b></td></tr>
          </table>
          <p>Así se conjugan también <b>choisir, réussir, grandir, réfléchir, remplir, obéir, réagir</b>.
          La marca es la sílaba <b>-iss-</b> en las tres personas del plural.</p>` },
        { titulo: 'Deuxième ou troisième groupe ?',
          html: `<p>Hay otros verbos en <i>-ir</i> que <b>no</b> hacen <i>-issons</i>: <i>dormir, sortir, partir, venir, ouvrir</i>.
          Pertenecen al tercer grupo: <i>nous dormons, nous sortons, nous partons</i>.</p>
          <div class="ex">Truco: di el verbo con <i>nous</i>. Si oyes <b>-issons</b> (<i>nous finissons</i>), es del segundo grupo.
          Si no (<i>nous sortons</i>), es del tercero.</div>` }
      ],
      ejercicios: [0, 1, 2]
    },
    { titulo: '2. S’entraîner',
      sous: 'Conjugar, transformar y escribir.',
      rappels: [],
      ejercicios: [3, 4, 5]
    }
  ],
  ejercicios: [
    /* 0 */ { t:'tri', etiqueta:'Classe',
      consigne:'Deuxième groupe (-issons) ou troisième groupe (-ons) ?',
      cols: ['2e groupe (nous -issons)', '3e groupe (nous -ons)'],
      items: [
        ['finir', 0], ['choisir', 0], ['réussir', 0], ['grandir', 0], ['réfléchir', 0],
        ['sortir', 1], ['dormir', 1], ['partir', 1], ['venir', 1], ['ouvrir', 1]
      ] },
    /* 1 */ { t:'trous', etiqueta:'Complète',
      consigne:'Conjugue le verbe au présent.',
      q: [
        { enonce:'Je ___ mon travail à cinq heures. <i>(finir)</i>', r:['finis'], taille:10 },
        { enonce:'Tu ___ un film. <i>(choisir)</i>', r:['choisis'], taille:10 },
        { enonce:'Elle ___ toujours ses examens. <i>(réussir)</i>', r:['réussit', 'reussit'], taille:12 },
        { enonce:'Nous ___ le repas. <i>(finir)</i>', r:['finissons'], taille:12 },
        { enonce:'Vous ___ bien. <i>(réfléchir)</i>', r:['réfléchissez', 'reflechissez'], taille:14 },
        { enonce:'Ils ___ vite. <i>(grandir)</i>', r:['grandissent'], taille:14 }
      ] },
    /* 2 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Quelle forme est correcte ?',
      q: [
        { enonce:'Nous ___ le travail à 17 h.', o:['finons', 'finissons', 'finisons'], r:1 },
        { enonce:'Elle ___ une glace.', o:['choisit', 'choisi', 'choissit'], r:0 },
        { enonce:'Ils ___ leurs exercices.', o:['finit', 'finissent', 'finisent'], r:1 },
        { enonce:'Nous ___ du travail à 18 h (sortir).', o:['sortissons', 'sortons', 'sorton'], r:1, note:'<i>Sortir</i> es del tercer grupo: <i>nous sortons</i>.' }
      ] },
    /* 3 */ { t:'transfo', etiqueta:'Transformer',
      consigne:'Mets la phrase au pluriel.',
      q: [
        { enonce:'Je finis à six heures.', modele:'Nous finissons à six heures.' },
        { enonce:'Tu choisis un livre.', modele:'Vous choisissez un livre.' },
        { enonce:'Elle réussit son examen.', modele:'Elles réussissent leur examen.' },
        { enonce:'L’enfant grandit vite.', modele:'Les enfants grandissent vite.' }
      ] },
    /* 4 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris.',
      sous:'Se oye -iss- en plural y se escribe -iss-.',
      q: [
        { texte:'Nous finissons à six heures.' },
        { texte:'Vous choisissez un plat ?' },
        { texte:'Elle réussit toujours.' },
        { texte:'Ils réfléchissent beaucoup.' }
      ] },
    /* 5 */ { t:'prod', etiqueta:'Écrire', mots:40,
      consigne:'Parle de ta journée de travail avec des verbes en -ir.',
      sous:'40 palabras, con finir, choisir o réussir.',
      check: [
        'Al menos tres verbos del segundo grupo (finir, choisir, réussir, réfléchir, grandir…).',
        'Al menos una forma de plural con -issons, -issez o -issent.',
        'Una hora con à (à cinq heures).'
      ],
      modele:'Je finis mon travail à cinq heures. Nous choisissons toujours un bon restaurant le vendredi. '
           + 'Mes collègues réussissent leurs projets et ils finissent tôt. Moi, je réfléchis beaucoup '
           + 'avant de choisir.' }
  ]
}));

FICHAS.push(Object.assign({}, RN, {
  id: 'rn-7', fecha: 'Les bases · 7/9',
  titulo: 'Les verbes du troisième groupe : être, avoir, aller, faire…',
  resumen: 'Los verbos más usados e irregulares: être, avoir, aller, faire, prendre, venir, pouvoir, vouloir y dire, en presente.',
  intro: 'No tienen una regla única, y por eso conviene conocerlos de memoria. Son pocos y se usan todos los días: '
       + 'si estos nueve quedan firmes, casi todo lo demás se sostiene.',
  secciones: [
    { titulo: '1. Les verbes à connaître par cœur',
      sous: 'Tres tablas, nueve verbos.',
      rappels: [
        { titulo: 'Être, avoir, aller',
          html: `<table ${TBL}>
            <tr><th style="text-align:left;padding:.3rem"></th><th style="text-align:left;padding:.3rem">être</th><th style="text-align:left;padding:.3rem">avoir</th><th style="text-align:left;padding:.3rem">aller</th></tr>
            <tr><td style="padding:.3rem">je</td><td>suis</td><td>ai</td><td>vais</td></tr>
            <tr><td style="padding:.3rem">tu</td><td>es</td><td>as</td><td>vas</td></tr>
            <tr><td style="padding:.3rem">il / elle / on</td><td>est</td><td>a</td><td>va</td></tr>
            <tr><td style="padding:.3rem">nous</td><td>sommes</td><td>avons</td><td>allons</td></tr>
            <tr><td style="padding:.3rem">vous</td><td>êtes</td><td>avez</td><td>allez</td></tr>
            <tr><td style="padding:.3rem">ils / elles</td><td>sont</td><td>ont</td><td>vont</td></tr>
          </table>` },
        { titulo: 'Faire, prendre, venir',
          html: `<table ${TBL}>
            <tr><th style="text-align:left;padding:.3rem"></th><th style="text-align:left;padding:.3rem">faire</th><th style="text-align:left;padding:.3rem">prendre</th><th style="text-align:left;padding:.3rem">venir</th></tr>
            <tr><td style="padding:.3rem">je</td><td>fais</td><td>prends</td><td>viens</td></tr>
            <tr><td style="padding:.3rem">tu</td><td>fais</td><td>prends</td><td>viens</td></tr>
            <tr><td style="padding:.3rem">il / elle / on</td><td>fait</td><td>prend</td><td>vient</td></tr>
            <tr><td style="padding:.3rem">nous</td><td>faisons</td><td>prenons</td><td>venons</td></tr>
            <tr><td style="padding:.3rem">vous</td><td><b>faites</b></td><td>prenez</td><td>venez</td></tr>
            <tr><td style="padding:.3rem">ils / elles</td><td><b>font</b></td><td>prennent</td><td>viennent</td></tr>
          </table>` },
        { titulo: 'Pouvoir, vouloir, dire',
          html: `<table ${TBL}>
            <tr><th style="text-align:left;padding:.3rem"></th><th style="text-align:left;padding:.3rem">pouvoir</th><th style="text-align:left;padding:.3rem">vouloir</th><th style="text-align:left;padding:.3rem">dire</th></tr>
            <tr><td style="padding:.3rem">je</td><td>peux</td><td>veux</td><td>dis</td></tr>
            <tr><td style="padding:.3rem">tu</td><td>peux</td><td>veux</td><td>dis</td></tr>
            <tr><td style="padding:.3rem">il / elle / on</td><td>peut</td><td>veut</td><td>dit</td></tr>
            <tr><td style="padding:.3rem">nous</td><td>pouvons</td><td>voulons</td><td>disons</td></tr>
            <tr><td style="padding:.3rem">vous</td><td>pouvez</td><td>voulez</td><td><b>dites</b></td></tr>
            <tr><td style="padding:.3rem">ils / elles</td><td>peuvent</td><td>veulent</td><td>disent</td></tr>
          </table>
          <div class="piege"><b>Ojo:</b> tres formas con -tes: <i>vous êtes, vous faites, vous dites</i>. Son las únicas que no acaban en -ez.
          Y en el plural de 3.ª persona: <i>ils sont, ils ont, ils vont, ils font</i>.</div>` }
      ],
      ejercicios: [0, 1, 2]
    },
    { titulo: '2. S’entraîner',
      sous: 'Del singular al plural y dictado.',
      rappels: [],
      ejercicios: [3, 4, 5]
    }
  ],
  ejercicios: [
    /* 0 */ { t:'paires', etiqueta:'Associe',
      consigne:'Associe l’infinitif et la forme avec « je ».',
      pairs: [
        ['être', 'je suis'], ['avoir', 'j’ai'], ['aller', 'je vais'],
        ['faire', 'je fais'], ['prendre', 'je prends'], ['venir', 'je viens'],
        ['pouvoir', 'je peux'], ['vouloir', 'je veux'], ['dire', 'je dis']
      ] },
    /* 1 */ { t:'tri', etiqueta:'Classe',
      consigne:'Être, avoir ou aller ? Classe chaque forme.',
      cols: ['être', 'avoir', 'aller'],
      items: [
        ['nous sommes', 0], ['vous êtes', 0], ['ils sont', 0],
        ['ils ont', 1], ['nous avons', 1], ['tu as', 1],
        ['vous allez', 2], ['ils vont', 2], ['je vais', 2]
      ] },
    /* 2 */ { t:'trous', etiqueta:'Complète',
      consigne:'Conjugue le verbe au présent.',
      q: [
        { enonce:'Nous ___ français. <i>(être)</i>', r:['sommes'], taille:10 },
        { enonce:'Vous ___ la fête ? <i>(faire)</i>', r:['faites'], taille:10 },
        { enonce:'Ils ___ au cinéma. <i>(aller)</i>', r:['vont'], taille:8 },
        { enonce:'Elle ___ un café. <i>(prendre)</i>', r:['prend'], taille:8 },
        { enonce:'Tu ___ venir ? <i>(pouvoir)</i>', r:['peux'], taille:8 },
        { enonce:'Vous ___ la vérité. <i>(dire)</i>', r:['dites'], taille:8 }
      ] },
    /* 3 */ { t:'transfo', etiqueta:'Transformer',
      consigne:'Mets la phrase au pluriel.',
      q: [
        { enonce:'Il a faim.', modele:'Ils ont faim.' },
        { enonce:'Je vais au travail.', modele:'Nous allons au travail.' },
        { enonce:'Tu peux venir ?', modele:'Vous pouvez venir ?' },
        { enonce:'Elle veut un café.', modele:'Elles veulent un café.' },
        { enonce:'Il fait du sport.', modele:'Ils font du sport.' }
      ] },
    /* 4 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Quelle forme est correcte ?',
      q: [
        { enonce:'Vous ___ en retard.', o:['êtes', 'est', 'sont'], r:0 },
        { enonce:'Ils ___ du sport le samedi.', o:['faisent', 'font', 'fait'], r:1 },
        { enonce:'Nous ___ un café ensemble.', o:['prenons', 'prennons', 'prendons'], r:0 },
        { enonce:'Elles ___ à Paris.', o:['viens', 'viennent', 'venent'], r:1 },
        { enonce:'Vous ___ quoi ?', o:['disez', 'dites', 'disent'], r:1 }
      ] },
    /* 5 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris.',
      q: [
        { texte:'Nous sommes en retard.' },
        { texte:'Ils vont au cinéma le samedi.' },
        { texte:'Vous faites du sport ?' },
        { texte:'Elle prend le train et il vient avec nous.' }
      ] }
  ]
}));

FICHAS.push(Object.assign({}, RN, {
  id: 'rn-8', fecha: 'Les bases · 8/9',
  titulo: 'Les verbes de la routine : du présent au passé composé',
  resumen: 'Los verbos del día (se réveiller, se lever, prendre, travailler, se coucher…) en presente y el paso al passé composé con avoir y être.',
  intro: 'Este es el objetivo de todo el camino: poder contar una rutina en presente y después contarla en pasado. '
       + 'Se empieza por los verbos de la rutina, se explica cómo se forma el pasado y luego se transforma el texto de los quebequenses.',
  secciones: [
    { titulo: '1. Les verbes de la routine',
      sous: 'Los verbos del día, de la mañana a la noche.',
      rappels: [
        { titulo: 'Une journée, verbe par verbe',
          html: `<table ${TBL}>
            <tr><th style="text-align:left;padding:.3rem">Momento</th><th style="text-align:left;padding:.3rem">Verbo</th><th style="text-align:left;padding:.3rem">Presente (je / nous)</th></tr>
            <tr><td style="padding:.3rem">Al despertar</td><td>se réveiller</td><td>je me réveille · nous nous réveillons</td></tr>
            <tr><td style="padding:.3rem"></td><td>se lever</td><td>je me lève · nous nous levons</td></tr>
            <tr><td style="padding:.3rem"></td><td>se doucher / s’habiller</td><td>je me douche · je m’habille</td></tr>
            <tr><td style="padding:.3rem">Mañana</td><td>prendre le petit déjeuner</td><td>je prends · nous prenons</td></tr>
            <tr><td style="padding:.3rem"></td><td>aller au travail</td><td>je vais · nous allons</td></tr>
            <tr><td style="padding:.3rem">Día</td><td>travailler / déjeuner</td><td>je travaille · je déjeune</td></tr>
            <tr><td style="padding:.3rem">Tarde</td><td>rentrer / dîner</td><td>je rentre · je dîne</td></tr>
            <tr><td style="padding:.3rem">Noche</td><td>se coucher / dormir</td><td>je me couche · je dors</td></tr>
          </table>
          <p>Los verbos con <b>se</b> (pronominales) llevan el pronombre antes del verbo: <i>je <b>me</b> lève, nous <b>nous</b> couchons</i>.</p>` }
      ],
      ejercicios: [0]
    },
    { titulo: '2. Le passé composé',
      sous: 'Avoir o être, más un participio.',
      rappels: [
        { titulo: 'Avoir + participe passé',
          html: `<p>El passé composé se forma con un auxiliar (<b>avoir</b> o <b>être</b>) en presente y el participio pasado.</p>
          <table ${TBL}>
            <tr><th style="text-align:left;padding:.3rem">Infinitivo</th><th style="text-align:left;padding:.3rem">Participio</th><th style="text-align:left;padding:.3rem">Ejemplo</th></tr>
            <tr><td style="padding:.3rem">-er</td><td>-<b>é</b></td><td>manger → j’ai mangé</td></tr>
            <tr><td style="padding:.3rem">-ir</td><td>-<b>i</b></td><td>finir → j’ai fini</td></tr>
            <tr><td style="padding:.3rem">-re</td><td>-<b>u</b></td><td>attendre → j’ai attendu</td></tr>
            <tr><td style="padding:.3rem">irregulares</td><td>pris, fait, eu, été, dit, vu</td><td>prendre → j’ai pris · faire → j’ai fait</td></tr>
          </table>` },
        { titulo: 'Être + participe passé',
          html: `<p>Con unos pocos verbos de movimiento —<b>aller, venir, arriver, partir, sortir, rentrer</b>— y con <b>todos los
          verbos pronominales</b> se usa <b>être</b>. El participio <b>concuerda con el sujeto</b>:</p>
          <div class="ex"><i>Il est allé · Elle est allée · Ils sont allés · Elles sont allées</i><br>
          <i>Je me suis couché(e) · Il s’est réveillé · Elle s’est réveillée · Ils se sont couchés</i></div>
          <p>Marcadores de pasado: <i>hier, ce matin, hier soir, la semaine dernière, il y a deux jours</i>.</p>` }
      ],
      ejercicios: [1, 2, 3]
    },
    { titulo: '3. Raconter une journée',
      sous: 'Transformar el texto de los quebequenses y contar tu propio ayer.',
      rappels: [],
      ejercicios: [4, 5]
    }
  ],
  ejercicios: [
    /* 0 */ { t:'trous', etiqueta:'Complète',
      consigne:'Conjugue le verbe de la routine au présent.',
      q: [
        { enonce:'Je ___ à sept heures. <i>(se réveiller)</i>', r:['me réveille', 'me reveille'], taille:14 },
        { enonce:'Nous ___ tard. <i>(se coucher)</i>', r:['nous couchons'], taille:14 },
        { enonce:'Elle ___ une douche. <i>(prendre)</i>', r:['prend'], taille:8 },
        { enonce:'Vous ___ au travail à huit heures. <i>(aller)</i>', r:['allez'], taille:8 },
        { enonce:'Ils ___ à midi. <i>(déjeuner)</i>', r:['déjeunent', 'dejeunent'], taille:12 },
        { enonce:'Tu ___ vite le matin. <i>(s’habiller)</i>', r:['t’habilles', "t'habilles"], taille:14 }
      ] },
    /* 1 */ { t:'qcm', etiqueta:'Avoir ou être ?',
      consigne:'Quel auxiliaire faut-il ?',
      q: [
        { enonce:'J’___ travaillé hier.', o:['ai', 'suis'], r:0 },
        { enonce:'Elle ___ allée au marché.', o:['a', 'est'], r:1 },
        { enonce:'Nous ___ pris le train.', o:['avons', 'sommes'], r:0 },
        { enonce:'Ils se ___ couchés tard.', o:['sont', 'ont'], r:0, note:'Los pronominales siempre usan <b>être</b>.' },
        { enonce:'Tu ___ sorti hier soir ?', o:['as', 'es'], r:1 }
      ] },
    /* 2 */ { t:'trous', etiqueta:'Complète',
      consigne:'Écris le participe passé.',
      sous:'-é, -i, -u o irregular. Con être, ¡acuerda!',
      q: [
        { enonce:'J’ai ___ une pomme. <i>(manger)</i>', r:['mangé', 'mange'], taille:10 },
        { enonce:'Il a ___ son travail. <i>(finir)</i>', r:['fini'], taille:10 },
        { enonce:'Nous avons ___ le métro. <i>(prendre)</i>', r:['pris'], taille:8 },
        { enonce:'Elle a ___ du sport. <i>(faire)</i>', r:['fait'], taille:8 },
        { enonce:'Elle est ___ au travail. <i>(aller)</i>', r:['allée', 'allee'], taille:10 },
        { enonce:'Il s’est ___ tard. <i>(se coucher)</i>', r:['couché', 'couche'], taille:10 }
      ] },
    /* 3 */ { t:'tri', etiqueta:'Classe',
      consigne:'Avec avoir ou avec être ?',
      cols: ['avoir', 'être'],
      items: [
        ['manger', 0], ['finir', 0], ['prendre', 0], ['faire', 0], ['travailler', 0], ['déjeuner', 0],
        ['aller', 1], ['partir', 1], ['rentrer', 1], ['se lever', 1], ['se coucher', 1]
      ] },
    /* 4 */ { t:'transfo', etiqueta:'Transformer',
      consigne:'Mets le texte sur les Québécois au passé composé.',
      sous:'Del presente («Les Québécois se réveillent…») al pasado («Les Québécois se sont réveillés…»).',
      q: [
        { enonce:'Les Québécois se réveillent vers 6 h.', modele:'Les Québécois se sont réveillés vers 6 h.' },
        { enonce:'Ils prennent un café sur la route.', modele:'Ils ont pris un café sur la route.' },
        { enonce:'Ils déjeunent entre 12 h et 13 h.', modele:'Ils ont déjeuné entre 12 h et 13 h.' },
        { enonce:'Ils dînent vers 17 h.', modele:'Ils ont dîné vers 17 h.' },
        { enonce:'Ils font du sport le soir.', modele:'Ils ont fait du sport le soir.' },
        { enonce:'Ils se couchent tard.', modele:'Ils se sont couchés tard.' }
      ] },
    /* 5 */ { t:'prod', etiqueta:'Écrire', mots:60,
      consigne:'Raconte ta journée d’hier.',
      sous:'60 palabras, en passé composé, con horas.',
      check: [
        'Al menos cuatro verbos en passé composé.',
        'Al menos un verbo pronominal con être (je me suis levé(e)…).',
        'Al menos tres horas con à (à sept heures, à midi…).',
        'Marcadores de pasado: hier, ce matin, ensuite, le soir.'
      ],
      modele:'Hier, je me suis réveillé à six heures et demie. J’ai pris une douche et j’ai pris mon petit '
           + 'déjeuner. Je suis allé au travail en métro et j’ai travaillé jusqu’à cinq heures. À midi, '
           + 'j’ai déjeuné avec un collègue. Le soir, j’ai regardé un film et je me suis couché à onze heures.' }
  ]
}));

FICHAS.push(Object.assign({}, RN, {
  id: 'rn-9', fecha: 'Les bases · 9/9',
  titulo: 'Bilan : tout ensemble',
  resumen: 'Un balance que mezcla vocales, nasales, números, hora y verbos, con un dictado y un texto final.',
  intro: 'Última ficha del recorrido. Aquí no hay explicación nueva: se usa todo lo anterior a la vez. '
       + 'Si algo falla, el balance te dirá a qué ficha volver.',
  secciones: [
    { titulo: 'Bilan',
      sous: 'Dictado, elección, huecos y un texto.',
      rappels: [
        { titulo: 'Avant de commencer : l’essentiel',
          html: `<div class="ex"><b>Vocales y nasales:</b> <i>ou</i> [u] ≠ <i>u</i> [y] · la n que cierra sílaba nasaliza (<i>bon</i> ≠ <i>bonne</i>).<br>
          <b>Números:</b> 70 = soixante-dix · 80 = quatre-vingts · 81 = quatre-vingt-un · 90 = quatre-vingt-dix.<br>
          <b>Hora:</b> et quart · et demie · moins le quart · midi · minuit.<br>
          <b>-er:</b> -e, -es, -e, -ons, -ez, -ent · <b>-ir (2.º grupo):</b> -is, -is, -it, -issons, -issez, -issent.<br>
          <b>3.er grupo:</b> être, avoir, aller, faire, prendre, venir, pouvoir, vouloir, dire.<br>
          <b>Passé composé:</b> avoir/être + participio (-é, -i, -u, irregular); los pronominales, siempre con être.</div>` }
      ],
      ejercicios: [0, 1, 2, 3]
    }
  ],
  ejercicios: [
    /* 0 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris.',
      sous:'Números, horas y verbos a la vez.',
      q: [
        { texte:'Il est huit heures et quart et je me réveille.' },
        { texte:'Nous avons quatre-vingts euros pour la soirée.' },
        { texte:'Elle finit son travail à dix-sept heures quarante.' },
        { texte:'Hier, ils se sont couchés à minuit.' },
        { texte:'Vous prenez un bon pain et du vin ?' }
      ] },
    /* 1 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Choisis la forme correcte.',
      q: [
        { enonce:'Ils ___ quatre-vingt-dix ans.', o:['ont', 'sont', 'avent'], r:0 },
        { enonce:'Nous ___ le repas à midi.', o:['finons', 'finissons', 'finisons'], r:1 },
        { enonce:'À 7 h 45, il est huit heures ___.', o:['moins le quart', 'et quart', 'et demie'], r:0 },
        { enonce:'Elle ___ allée au travail à pied.', o:['a', 'est'], r:1 },
        { enonce:'71 s’écrit…', o:['soixante et onze', 'soixante-onze-un', 'septante-un'], r:0 },
        { enonce:'Nous ___ du sport le samedi.', o:['faites', 'faisons', 'font'], r:1 }
      ] },
    /* 2 */ { t:'trous', etiqueta:'Complète',
      consigne:'Complète avec le verbe ou le nombre demandé.',
      q: [
        { enonce:'Vous ___ en retard. <i>(être)</i>', r:['êtes', 'etes'], taille:10 },
        { enonce:'Ils ___ du café. <i>(prendre, présent)</i>', r:['prennent'], taille:10 },
        { enonce:'Elle ___ à six heures. <i>(se lever, présent)</i>', r:['se lève', 'se leve'], taille:12 },
        { enonce:'J’ai ___ le train. <i>(prendre, passé composé)</i>', r:['pris'], taille:8 },
        { enonce:'93 → ___', r:['quatre-vingt-treize', 'quatre vingt treize'], taille:22 },
        { enonce:'12 h 30 → midi ___', r:['et demi'], taille:10 }
      ] },
    /* 3 */ { t:'prod', etiqueta:'Écrire', mots:80,
      consigne:'Raconte ta journée d’hier avec les heures et, à la fin, ce que tu fais d’habitude.',
      sous:'80 palabras: la primera parte en passé composé, la última en presente.',
      check: [
        'La parte de ayer en passé composé, con al menos cinco verbos.',
        'Al menos un verbo pronominal con être (je me suis réveillé(e), je me suis couché(e)…).',
        'Al menos cuatro horas, una de ellas con et quart, et demie o moins le quart.',
        'Un número grande en letras (cuarenta, soixante-dix, quatre-vingts…).',
        'Una frase final en presente: «Normalement, je me lève à… et je… ».'
      ],
      modele:'Hier, je me suis réveillé à six heures et demie. J’ai pris le métro à sept heures moins le '
           + 'quart et je suis arrivé au bureau à huit heures. J’ai travaillé avec quatre-vingts '
           + 'clients au téléphone. J’ai déjeuné à midi et demi et j’ai fini à cinq heures. Le soir, je '
           + 'me suis couché à onze heures. Normalement, je me lève à six heures et je prends le métro.' }
  ]
}));


/* ───────────────────────────────────────────────────────────────────────
   0 · LE RYTHME DE VIE   (livre pp. 76-79, Dossier 1)
   La apertura de la unidad: el artículo sobre el ritmo de vida de los
   quebequenses y la historieta «Metz-Paris, Paris-Metz». Se vio al final
   del A1.4 (la hora, el 20 de octubre; los pronominales, el 22) y aquí
   queda para repasarlo antes de seguir con la p. 80.
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'u5-p76',
  tipo: 'revision',
  ciclo: 'Nov. 2026 · A2.1',
  fecha: 'Repaso · pp. 76-79',
  titulo: 'Le rythme de vie : l’heure, les repas et les verbes pronominaux',
  resumen: 'Decir la hora, los momentos del día y las comidas, y los verbos de la rutina (se lever, s’habiller…), con el artículo sobre Quebec y la historieta de Claire.',
  intro: 'La primera doble página de la unidad: cómo viven los quebequenses (se levantan temprano, cenan '
       + 'a las cinco) y la historieta de Claire, que vive en Metz y trabaja en París. De ahí salen tres '
       + 'temas: la hora, las comidas del día y los verbos pronominales.',

  secciones: [
    { titulo: '1. L’heure',
      sous: 'El recuadro «L’heure» de la p. 79 y las horas de la historieta.',
      rappels: [
        { titulo: 'Dire l’heure : deux façons',
          html: `<p>Para preguntar: <i>Quelle heure est-il ?</i> Para responder: <i>Il est huit heures.</i>
          Para decir cuándo pasa algo: <i>à huit heures</i> (<i>Je me lève à 6 h 30</i>).</p>
          <table style="width:100%;border-collapse:collapse;margin:.6rem 0">
            <tr><th style="text-align:left;padding:.3rem">Hora</th>
                <th style="text-align:left;padding:.3rem">Lenguaje corriente</th>
                <th style="text-align:left;padding:.3rem">Horario oficial (trenes, citas)</th></tr>
            <tr><td style="padding:.3rem">8 h 05</td><td>huit heures cinq</td><td>huit heures cinq</td></tr>
            <tr><td style="padding:.3rem">8 h 15</td><td>huit heures <b>et quart</b></td><td>huit heures quinze</td></tr>
            <tr><td style="padding:.3rem">8 h 30</td><td>huit heures <b>et demie</b></td><td>huit heures trente</td></tr>
            <tr><td style="padding:.3rem">8 h 45</td><td>neuf heures <b>moins le quart</b></td><td>huit heures quarante-cinq</td></tr>
            <tr><td style="padding:.3rem">8 h 50</td><td>neuf heures <b>moins dix</b></td><td>huit heures cinquante</td></tr>
            <tr><td style="padding:.3rem">12 h 00</td><td><b>midi</b></td><td>douze heures</td></tr>
            <tr><td style="padding:.3rem">19 h 45</td><td>huit heures moins le quart (du soir)</td><td>dix-neuf heures quarante-cinq</td></tr>
            <tr><td style="padding:.3rem">0 h 00</td><td><b>minuit</b></td><td>zéro heure</td></tr>
          </table>
          <p>En el lenguaje corriente se cuenta hasta 12 y, pasada la media, se dice la hora siguiente
          <b>menos</b> los minutos que faltan: 8 h 50 es <i>neuf heures moins dix</i>. En el horario
          oficial se cuenta de 0 a 24 y nunca se usa <i>et quart, et demie</i> ni <i>moins</i>.</p>
          <div class="piege"><b>Ojo:</b> <i>heure</i> es femenino, por eso <i>huit heures et demi<b>e</b></i>.
          Pero con <i>midi</i> y <i>minuit</i>, que son masculinos: <i>midi et demi</i>.
          Y en francés se escribe <b>8 h 30</b>, con una h, no 8:30.</div>` },
        { titulo: 'Tôt ou tard ? Les moments de la journée',
          html: `<p>El día se divide así: <b>le matin</b> (6 h a 12 h), <b>le midi</b> (12 h a 14 h),
          <b>l’après-midi</b> (14 h a 19 h), <b>le soir</b> (19 h a 0 h) y <b>la nuit</b> (0 h a 6 h).</p>
          <p>Para opinar sobre una hora: <i>c’est tôt</i> (es temprano) o <i>c’est tard</i> (es tarde).
          <i>Se lever à six heures du matin, c’est tôt ! Moi, je me lève à sept heures trente.</i></p>
          <div class="ex">Con un día de la semana sin artículo se habla de uno concreto:
          <i>Lundi, je travaille.</i> Con <b>le</b> se habla de todos los lunes:
          <i>Le lundi, je me réveille à 7 h 30.</i> Lo mismo con <i>le matin, le soir</i>.</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: '2. Les verbes pronominaux',
      sous: 'El cuadro de la p. 79 con se lever y s’habiller.',
      rappels: [
        { titulo: 'Un pronom avant le verbe',
          html: `<p>Los verbos de la rutina llevan un pronombre delante, como en español
          (<i>me levanto, te vistes</i>), pero en francés el pronombre va <b>siempre antes</b> del verbo.</p>
          <table style="width:100%;border-collapse:collapse;margin:.6rem 0">
            <tr><th style="text-align:left;padding:.3rem">&nbsp;</th>
                <th style="text-align:left;padding:.3rem">se lever</th>
                <th style="text-align:left;padding:.3rem">s’habiller</th></tr>
            <tr><td style="padding:.3rem">je</td><td><b>me</b> lève</td><td><b>m’</b>habille</td></tr>
            <tr><td style="padding:.3rem">tu</td><td><b>te</b> lèves</td><td><b>t’</b>habilles</td></tr>
            <tr><td style="padding:.3rem">il / elle / on</td><td><b>se</b> lève</td><td><b>s’</b>habille</td></tr>
            <tr><td style="padding:.3rem">nous</td><td><b>nous</b> levons</td><td><b>nous</b> habillons</td></tr>
            <tr><td style="padding:.3rem">vous</td><td><b>vous</b> levez</td><td><b>vous</b> habillez</td></tr>
            <tr><td style="padding:.3rem">ils / elles</td><td><b>se</b> lèvent</td><td><b>s’</b>habillent</td></tr>
          </table>
          <p>Los de la historieta: <i>se réveiller, se lever, se doucher, s’habiller, se maquiller,
          se coiffer, se coucher</i>. Todos se conjugan como verbos en -er.</p>
          <div class="piege"><b>Delante de vocal o h muda</b>, me, te, se se convierten en
          <b>m’, t’, s’</b>: <i>je m’habille, tu t’appelles, il s’habille</i>.
          Y <i>se lever</i> lleva acento grave cuando la terminación no se oye:
          <i>je me l<b>è</b>ve</i>, pero <i>nous nous levons</i>.</div>` }
      ],
      ejercicios: [2, 3, 4]
    },
    { titulo: '3. Les repas et le rythme des Québécois',
      sous: 'El artículo de las pp. 76-77 y el recuadro «Ah bon ?!».',
      rappels: [
        { titulo: 'Les repas : ça change selon le pays',
          html: `<table style="width:100%;border-collapse:collapse;margin:.6rem 0">
            <tr><th style="text-align:left;padding:.3rem">&nbsp;</th>
                <th style="text-align:left;padding:.3rem">Francia</th>
                <th style="text-align:left;padding:.3rem">Bélgica y Quebec</th></tr>
            <tr><td style="padding:.3rem">por la mañana</td><td>le petit déjeuner</td><td>le déjeuner</td></tr>
            <tr><td style="padding:.3rem">a mediodía</td><td>le déjeuner</td><td>le dîner</td></tr>
            <tr><td style="padding:.3rem">por la noche</td><td>le dîner</td><td>le souper</td></tr>
          </table>
          <p>Los verbos siguen la misma lógica: en Francia <i>on déjeune</i> a mediodía y
          <i>on dîne</i> por la noche.</p>
          <div class="ex">Según el artículo, los quebequenses trabajan de 8 h a 17 h, se despiertan
          hacia las 6 h, comen entre 12 h y 13 h, <b>cenan hacia las 17 h o 18 h</b> (la comida más
          importante del día) y se acuestan hacia las 23 h entre semana.</div>` }
      ],
      ejercicios: [5, 6, 7]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'trous', etiqueta:'Écris en chiffres',
      consigne:'Écris ces heures en chiffres, comme dans l’activité 3 (p. 79).',
      sous:'Escribe por ejemplo 5h45.',
      q: [
        { enonce:'six heures moins le quart → ___', r:['5h45', '5 h 45', '545'], taille:8 },
        { enonce:'six heures et quart → ___', r:['6h15', '6 h 15', '615'], taille:8 },
        { enonce:'six heures et demie → ___', r:['6h30', '6 h 30', '630'], taille:8 },
        { enonce:'dix-neuf heures quarante-cinq → ___', r:['19h45', '19 h 45', '1945'], taille:8 },
        { enonce:'neuf heures moins dix → ___', r:['8h50', '8 h 50', '850'], taille:8,
          note:'Faltan diez minutos para las nueve: 8 h 50.' },
        { enonce:'vingt heures → ___', r:['20h', '20 h', '20h00', '20 h 00', '2000'], taille:8 }
      ] },

    /* 1 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Comment dit-on cette heure dans la langue de tous les jours ?',
      q: [
        { enonce:'8 h 15', o:['huit heures et quart', 'huit heures et demie', 'huit heures moins le quart'], r:0 },
        { enonce:'8 h 45', o:['huit heures et quart', 'neuf heures moins le quart', 'neuf heures et quart'], r:1 },
        { enonce:'12 h 30', o:['douze heures et demie', 'midi et demi', 'midi et demie'], r:1,
          note:'<i>Midi</i> es masculino: <b>midi et demi</b>.' },
        { enonce:'7 h 30', o:['sept heures et demie', 'sept heures et demi', 'sept heures moins trente'], r:0,
          note:'<i>Heure</i> es femenino: <b>et demie</b>.' },
        { enonce:'0 h 00', o:['midi', 'minuit', 'zéro heures'], r:1 }
      ] },

    /* 2 */ { t:'trous', etiqueta:'Complète',
      consigne:'Conjugue le verbe pronominal au présent.',
      sous:'Escribe el pronombre y el verbo: me lève, t’habilles…',
      q: [
        { enonce:'Le matin, je ___ à six heures. <i>(se lever)</i>', r:['me lève', 'me leve'], taille:14 },
        { enonce:'Tu ___ vite&nbsp;? <i>(s’habiller)</i>', r:['t’habilles', "t'habilles"], taille:14 },
        { enonce:'Claire ___ dans le train. <i>(se maquiller)</i>', r:['se maquille'], taille:14 },
        { enonce:'Nous ___ à onze heures. <i>(se coucher)</i>', r:['nous couchons'], taille:14 },
        { enonce:'Vous ___ tôt&nbsp;? <i>(se réveiller)</i>', r:['vous réveillez', 'vous reveillez'], taille:14 },
        { enonce:'Ses enfants ___ à sept heures. <i>(se lever)</i>', r:['se lèvent', 'se levent'], taille:14 }
      ] },

    /* 3 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Me ou m’ ? Te ou t’ ? Se ou s’ ?',
      q: [
        { enonce:'Je ___ habille.', o:['me', 'm’'], r:1, note:'Delante de h muda: <b>m’</b>.' },
        { enonce:'Il ___ douche le matin.', o:['se', 's’'], r:0 },
        { enonce:'Tu ___ appelles comment&nbsp;?', o:['te', 't’'], r:1 },
        { enonce:'Elles ___ coiffent.', o:['se', 's’'], r:0 },
        { enonce:'Je ___ réveille tard.', o:['me', 'm’'], r:0, note:'<i>Réveille</i> empieza por consonante: <b>me</b>.' }
      ] },

    /* 4 */ { t:'transfo', etiqueta:'Transformer',
      consigne:'Raconte la journée de Claire (p. 78) à la troisième personne.',
      sous:'Pasa de je a elle y adapta el pronombre.',
      q: [
        { enonce:'Je me lève à 5 h 45.', modele:'Elle se lève à 5 h 45.' },
        { enonce:'Je me douche et je m’habille.', modele:'Elle se douche et elle s’habille.' },
        { enonce:'Dans le train, je me maquille et je me coiffe.', modele:'Dans le train, elle se maquille et elle se coiffe.' },
        { enonce:'Je me couche à 22 h.', modele:'Elle se couche à 22 h.' }
      ] },

    /* 5 */ { t:'qcm', etiqueta:'Lire',
      consigne:'Relis l’article « Le rythme de vie des Québécois » (pp. 76-77).',
      q: [
        { enonce:'Les Québécois travaillent…', o:['de 9 h à 18 h', 'de 8 h à 17 h', 'de 7 h à 15 h'], r:1 },
        { enonce:'Le matin, ils se réveillent vers…', o:['6 h ou 6 h 30', '7 h 30', '8 h'], r:0 },
        { enonce:'60 % des Québécois…', o:['prennent un grand petit déjeuner', 'ne prennent pas de petit déjeuner', 'déjeunent au lit'], r:1 },
        { enonce:'Le repas le plus important de la journée, c’est…', o:['le repas de midi', 'le repas du soir, vers 17 h ou 18 h', 'le petit déjeuner'], r:1 },
        { enonce:'En semaine, ils se couchent vers…', o:['21 h', '23 h', 'minuit et demi'], r:1 }
      ] },

    /* 6 */ { t:'paires', etiqueta:'Associe',
      consigne:'Associe le repas en Belgique ou au Québec et son équivalent en France.',
      pairs: [
        ['le déjeuner (Québec)', 'le petit déjeuner (France)'],
        ['le dîner (Québec)', 'le déjeuner (France)'],
        ['le souper (Québec)', 'le dîner (France)'],
        ['le matin', 'de 6 h à 12 h'],
        ['l’après-midi', 'de 14 h à 19 h'],
        ['la nuit', 'de 0 h à 6 h']
      ] },

    /* 7 */ { t:'prod', etiqueta:'Écrire', mots:60,
      consigne:'Décris ta journée habituelle, comme dans l’activité 4 (p. 77).',
      sous:'60 palabras. Con horas y verbos pronominales.',
      check: [
        'Al menos cuatro verbos pronominales (je me réveille, je me lève, je m’habille, je me couche…).',
        'Al menos cuatro horas, con <b>à</b> delante: à 7 h 30.',
        'Una hora dicha con <i>et quart, et demie</i> o <i>moins le quart</i>.',
        'Las comidas con su nombre de Francia: le petit déjeuner, le déjeuner, le dîner.',
        'Una comparación con los quebequenses: <i>Moi aussi… / Moi, je…</i>'
      ],
      modele:'En semaine, je me réveille à six heures et demie et je me lève tout de suite. Je me '
           + 'douche, je m’habille et je prends mon petit déjeuner à sept heures. Je travaille de huit '
           + 'heures à quatre heures. Je déjeune à deux heures moins le quart. Je dîne vers neuf heures '
           + 'et je me couche à onze heures. Comme les Québécois, je me couche tard !' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   1 · SORTIR, DORMIR, PRENDRE   (livre p. 80)
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'u5-p80',
  tipo: 'revision',
  ciclo: 'Nov. 2026 · A2.1',
  fecha: 'Séance du 17 novembre · p. 80',
  titulo: 'Sortir, dormir, prendre — la routine',
  resumen: 'Los tres verbos del artículo «Fatigué du métro, boulot, dodo ?»: cómo se conjugan y con qué palabras van.',
  intro: 'Tres verbos que aparecen en cualquier rutina: sortir (salir), dormir (dormir) y '
       + 'prendre (tomar, coger). Primero la conjugación y luego las expresiones del libro.',

  secciones: [
    { titulo: 'Les trois verbes',
      sous: 'Presente de sortir, dormir y prendre.',
      rappels: [
        { titulo: 'Le présent de sortir, dormir et prendre',
          html: `<table style="width:100%;border-collapse:collapse;margin:.6rem 0">
            <tr><th style="text-align:left;padding:.3rem">&nbsp;</th>
                <th style="text-align:left;padding:.3rem">sortir</th>
                <th style="text-align:left;padding:.3rem">dormir</th>
                <th style="text-align:left;padding:.3rem">prendre</th></tr>
            <tr><td style="padding:.3rem">je</td><td><b>sors</b></td><td><b>dors</b></td><td><b>prends</b></td></tr>
            <tr><td style="padding:.3rem">tu</td><td><b>sors</b></td><td><b>dors</b></td><td><b>prends</b></td></tr>
            <tr><td style="padding:.3rem">il / elle / on</td><td><b>sort</b></td><td><b>dort</b></td><td><b>prend</b></td></tr>
            <tr><td style="padding:.3rem">nous</td><td><b>sortons</b></td><td><b>dormons</b></td><td><b>prenons</b></td></tr>
            <tr><td style="padding:.3rem">vous</td><td><b>sortez</b></td><td><b>dormez</b></td><td><b>prenez</b></td></tr>
            <tr><td style="padding:.3rem">ils / elles</td><td><b>sortent</b></td><td><b>dorment</b></td><td><b>prennent</b></td></tr>
          </table>
          <p><b>Cómo se reconocen:</b> en singular, <i>sortir</i> y <i>dormir</i> pierden la última
          consonante de la raíz (<i>sor-</i>, <i>dor-</i>) y toman <b>-s, -s, -t</b>. En plural recuperan la
          raíz completa: <i>sortons, dormons</i>.</p>
          <div class="piege"><b>Prendre es el más traicionero:</b> en plural la raíz cambia
          (<i>prenons, prenez</i>) y en <i>ils / elles</i> se duplica la <b>n</b>:
          <i>ils prennent</i>. Y la tercera persona del singular acaba en <b>-d</b>, no en -t:
          <i>il prend</i>.</div>` }
      ],
      ejercicios: [0, 1, 2]
    },
    { titulo: 'Les expressions du livre',
      sous: 'Las combinaciones de la p. 88 y de la rutina, para usarlas sin pensar.',
      rappels: [
        { titulo: 'Qué palabras van con cada verbo',
          html: `<ul>
            <li><b>dormir</b> + peu, bien, tard: <i>Je dors peu. Le week-end, je dors tard.</i></li>
            <li><b>sortir</b> + <i>du travail, de chez soi</i> (salir de un lugar) o <i>avec des amis</i>
                (salir con alguien).</li>
            <li><b>prendre</b> + <i>une douche, un café, un verre, le métro, le train, des notes</i>.
                En español usamos verbos distintos (ducharse, tomar, coger, apuntar); en francés
                es siempre <b>prendre</b>.</li>
          </ul>
          <div class="ex">Je <b>prends</b> une douche. · Tu <b>prends</b> le métro. ·
          Il <b>prend</b> des notes. · Nous <b>prenons</b> un verre.</div>` }
      ],
      ejercicios: [3, 4, 5, 6]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'trous', etiqueta:'Complète',
      consigne:'Conjugue le verbe au présent.',
      q: [
        { enonce:'Le week-end, je ___ tard. <i>(dormir)</i>', r:['dors'], taille:10 },
        { enonce:'Tu ___ avec tes amis le samedi&nbsp;? <i>(sortir)</i>', r:['sors'], taille:10 },
        { enonce:'Elle ___ le métro pour aller au travail. <i>(prendre)</i>', r:['prend'], taille:10,
          note:'<b>il / elle prend</b>: acaba en -d.' },
        { enonce:'Nous ___ un café après le déjeuner. <i>(prendre)</i>', r:['prenons'], taille:10 },
        { enonce:'Vous ___ bien&nbsp;? <i>(dormir)</i>', r:['dormez'], taille:10 },
        { enonce:'Ils ___ de chez eux à sept heures. <i>(sortir)</i>', r:['sortent'], taille:10 },
        { enonce:'Mes parents ___ le train. <i>(prendre)</i>', r:['prennent'], taille:10,
          note:'Con <b>ils / elles</b>, prendre duplica la n: <b>prennent</b>.' }
      ] },

    /* 1 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Choisis la bonne forme.',
      q: [
        { enonce:'Il ___ très peu.', o:['dors', 'dort', 'dorment'], r:1 },
        { enonce:'Nous ___ du travail à six heures.', o:['sort', 'sortons', 'sortez'], r:1 },
        { enonce:'Tu ___ une douche le matin&nbsp;?', o:['prend', 'prends', 'prenons'], r:1 },
        { enonce:'Elles ___ un verre.', o:['prend', 'prennent', 'prenent'], r:1,
          note:'<b>prennent</b>, con dos n, como en <i>ils prennent</i>.' },
        { enonce:'Vous ___ avec nous ce soir&nbsp;?', o:['sortez', 'sortes', 'sortent'], r:0 }
      ] },

    /* 2 */ { t:'tri', etiqueta:'Classe',
      consigne:'Singulier ou pluriel&nbsp;? Classe chaque forme.',
      sous:'Una forma que acaba en -s o -t es del singular; el plural lleva -ons, -ez o -ent.',
      cols: ['singulier (je, tu, il)', 'pluriel (nous, vous, ils)'],
      items: [
        ['sors', 0], ['dort', 0], ['prends', 0], ['prend', 0],
        ['sortons', 1], ['dormez', 1], ['prennent', 1], ['dorment', 1], ['prenons', 1], ['sortent', 1]
      ] },

    /* 3 */ { t:'paires', etiqueta:'Associe',
      consigne:'Associe l’expression française et sa traduction.',
      pairs: [
        ['prendre une douche', 'ducharse'],
        ['sortir du travail', 'salir del trabajo'],
        ['prendre le métro', 'tomar el metro'],
        ['prendre un verre', 'tomar una copa'],
        ['sortir avec des amis', 'salir con amigos'],
        ['dormir peu', 'dormir poco'],
        ['prendre des notes', 'tomar apuntes'],
        ['sortir de chez soi', 'salir de casa']
      ] },

    /* 4 */ { t:'transfo', etiqueta:'Transformer',
      consigne:'Change le sujet comme il est indiqué.',
      sous:'Cambia el sujeto y adapta el verbo.',
      q: [
        { enonce:'Je sors à six heures. <i>(nous)</i>', modele:'Nous sortons à six heures.' },
        { enonce:'Tu prends le métro. <i>(vous)</i>', modele:'Vous prenez le métro.' },
        { enonce:'Il dort peu. <i>(ils)</i>', modele:'Ils dorment peu.' },
        { enonce:'Elle prend une douche. <i>(elles)</i>', modele:'Elles prennent une douche.' },
        { enonce:'Je dors beaucoup le week-end. <i>(nous)</i>', modele:'Nous dormons beaucoup le week-end.' }
      ] },

    /* 5 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris.',
      sous:'Fíjate en las terminaciones: aquí se oye muy poco y se escribe mucho.',
      q: [
        { texte:'Le week-end, je dors beaucoup.' },
        { texte:'Tu sors avec des amis ?' },
        { texte:'Elle prend le train à huit heures.' },
        { texte:'Nous prenons un café.' },
        { texte:'Ils sortent du travail à six heures.' }
      ] },

    /* 6 */ { t:'prod', etiqueta:'Écrire', mots:40,
      consigne:'Écris trois phrases sur ta routine avec dormir, sortir et prendre.',
      sous:'40 palabras. Un verbo por frase, como en el artículo de la p. 80.',
      check: [
        'Una frase con <b>dormir</b>, una con <b>sortir</b> y una con <b>prendre</b>.',
        'Cada verbo bien conjugado en <b>je</b>.',
        'Un momento del día en cada frase (le matin, le soir, le week-end…).',
        'Una expresión del libro (une douche, le métro, avec des amis…).'
      ],
      modele:'Le week-end, je dors tard, jusqu’à dix heures. Le samedi soir, je sors avec des '
           + 'amis. Pendant la semaine, je prends le métro pour aller au travail et je prends '
           + 'un café avant de commencer.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   2 · FAIRE ET LE DÉFI DE LA ROUTINE   (livre p. 81)
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'u5-p81',
  tipo: 'revision',
  ciclo: 'Nov. 2026 · A2.1',
  fecha: 'Séance du 19 novembre · p. 81',
  titulo: 'Faire, et le défi de la routine',
  resumen: 'El tercer verbo de la serie, las expresiones con faire y cómo dar consejos para salir de la rutina.',
  intro: 'Con faire se completa la serie sortir, prendre, faire. Después, el défi de la '
       + 'página: dar un consejo para salir de la rutina.',

  secciones: [
    { titulo: 'Le verbe faire',
      sous: 'Conjugación, expresiones y los tres verbos juntos.',
      rappels: [
        { titulo: 'Faire au présent',
          html: `<table style="width:100%;border-collapse:collapse;margin:.6rem 0">
            <tr><td style="padding:.3rem">je</td><td><b>fais</b></td>
                <td style="padding:.3rem">nous</td><td><b>faisons</b> <small>(se lee «fe-zon»)</small></td></tr>
            <tr><td style="padding:.3rem">tu</td><td><b>fais</b></td>
                <td style="padding:.3rem">vous</td><td><b>faites</b></td></tr>
            <tr><td style="padding:.3rem">il / elle / on</td><td><b>fait</b></td>
                <td style="padding:.3rem">ils / elles</td><td><b>font</b></td></tr>
          </table>
          <div class="piege"><b>Dos irregulares:</b> <i>vous faites</i> (no «faisez») e
          <i>ils font</i> (no «faisent»). Son de los pocos verbos cuyo plural no acaba en -ez / -ent.</div>
          <p><b>Expresiones con faire:</b></p>
          <div class="ex">faire la sieste · faire la fête · faire du sport · faire la cuisine ·
          faire les courses · faire ses devoirs</div>` }
      ],
      ejercicios: [0, 1, 2]
    },
    { titulo: 'La routine et le défi',
      sous: 'Contar un día de rutina y proponer un consejo para salir de ella.',
      rappels: [
        { titulo: 'Donner un conseil : l’impératif',
          html: `<p>Para dar un consejo se usa el <b>imperativo</b>: es la forma de <i>tu</i> o de
          <i>vous</i>, <b>sin pronombre</b>.</p>
          <div class="ex"><b>Fais</b> la sieste ! (tu) · <b>Prends</b> un café ! (tu) ·
          <b>Prenez</b> une pause ! (vous) · <b>Sors</b> avec tes amis ! (tu)</div>
          <div class="piege">Con <i>tu</i>, los verbos en -er pierden la -s (<i>tu parles → parle</i>),
          pero <b>faire, prendre y sortir sí la conservan</b>: <i>fais, prends, sors</i>.
          Para decir lo contrario, la negación rodea al verbo: <i>Ne prends pas le métro !</i></div>
          <p>Para explicar el efecto positivo: <i>ça fait du bien</i>, <i>on se détend</i>,
          <i>on dort mieux</i>, <i>on se déconnecte</i>.</p>` }
      ],
      ejercicios: [3, 4, 5, 6]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'trous', etiqueta:'Complète',
      consigne:'Conjugue faire au présent.',
      q: [
        { enonce:'Je ___ la sieste après le déjeuner.', r:['fais'], taille:10 },
        { enonce:'Tu ___ du sport le matin&nbsp;?', r:['fais'], taille:10 },
        { enonce:'Il ___ la fête le samedi.', r:['fait'], taille:10 },
        { enonce:'Nous ___ les courses le vendredi.', r:['faisons'], taille:10 },
        { enonce:'Vous ___ la cuisine&nbsp;?', r:['faites'], taille:10 },
        { enonce:'Elles ___ du yoga.', r:['font'], taille:10 }
      ] },

    /* 1 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Choisis la bonne forme de faire.',
      q: [
        { enonce:'Ils ___ la fête.', o:['faisent', 'font', 'fait'], r:1 },
        { enonce:'Vous ___ du sport&nbsp;?', o:['faisez', 'faites', 'faisons'], r:1 },
        { enonce:'Nous ___ la sieste.', o:['faisons', 'faison', 'fait'], r:0 },
        { enonce:'Elle ___ ses devoirs.', o:['font', 'fais', 'fait'], r:2 }
      ] },

    /* 2 */ { t:'tri', etiqueta:'Classe',
      consigne:'Sortir, prendre ou faire&nbsp;? Classe chaque expression.',
      sous:'Los tres verbos de la serie del libro.',
      cols: ['sortir', 'prendre', 'faire'],
      items: [
        ['du travail', 0], ['de chez soi', 0], ['avec des amis', 0],
        ['une douche', 1], ['le train', 1], ['un café', 1],
        ['la sieste', 2], ['la fête', 2], ['du sport', 2], ['les courses', 2]
      ] },

    /* 3 */ { t:'ordre', etiqueta:'Une journée',
      consigne:'Remets cette journée dans l’ordre.',
      sous:'Una rutina de lunes, de la mañana a la noche.',
      items: [
        'Je me réveille à sept heures.',
        'Je prends une douche.',
        'Je prends le métro pour aller au travail.',
        'Je sors du travail à six heures.',
        'Je fais du sport.',
        'Je dors à onze heures.'
      ],
      aide:'Seis acciones en el orden natural de un día: lo primero es despertarse y lo último, dormir.' },

    /* 4 */ { t:'qcm', etiqueta:'Un conseil',
      consigne:'Donne le bon conseil.',
      sous:'Imperativo: la forma de tu o de vous, sin pronombre.',
      q: [
        { enonce:'À un ami fatigué&nbsp;: «&nbsp;___ la sieste&nbsp;!&nbsp;»', o:['Fais', 'Fait', 'Faites'], r:0 },
        { enonce:'À vos collègues&nbsp;: «&nbsp;___ une pause&nbsp;!&nbsp;»', o:['Prends', 'Prenez', 'Prend'], r:1 },
        { enonce:'À ta sœur&nbsp;: «&nbsp;___ avec tes amis ce week-end&nbsp;!&nbsp;»', o:['Sors', 'Sortez', 'Sort'], r:0,
          note:'Con <b>tu</b>, sortir conserva la -s: <b>sors</b>.' },
        { enonce:'À Paul&nbsp;: «&nbsp;Ne ___ pas le métro, marche&nbsp;!&nbsp;»', o:['prends', 'prenez', 'prend'], r:0 }
      ] },

    /* 5 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris.',
      q: [
        { texte:'Je fais du sport le samedi.' },
        { texte:'Nous faisons la fête.' },
        { texte:'Vous faites la sieste ?' },
        { texte:'Ils font les courses.' },
        { texte:'Elle fait la cuisine le soir.' }
      ] },

    /* 6 */ { t:'prod', etiqueta:'Défi n° 1', mots:60,
      consigne:'Propose une idée pour sortir de la routine.',
      sous:'60 palabras. Como en la ficha del libro: contexto, momento, propuesta y efecto positivo.',
      check: [
        'Un <b>contexte</b> (au travail, en famille, le week-end…) y un <b>moment</b> de la journée.',
        'Un consejo en <b>impératif</b> («&nbsp;Prends…&nbsp;», «&nbsp;Fais…&nbsp;», «&nbsp;Sors…&nbsp;»).',
        'Al menos uno de los verbos <b>sortir, prendre, faire</b>, bien conjugado.',
        'Un <b>efecto positivo</b> (ça fait du bien, on se détend, on dort mieux).'
      ],
      modele:'Au travail, le soir&nbsp;: «&nbsp;Ne prends pas le métro, rentre à pied&nbsp;!&nbsp;» '
           + 'Après une longue journée, on est fatigué. Marcher quarante minutes, ça fait du '
           + 'bien au corps et à la tête. Je sors du bureau, je prends un café, je fais une '
           + 'promenade et je me déconnecte. Le soir, je dors mieux.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   3 · TEMPS DE TRAVAIL   (livre pp. 82-83)
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'u5-p82',
  tipo: 'revision',
  ciclo: 'Nov. 2026 · A2.1',
  fecha: 'Séance du 24 novembre · pp. 82-83',
  titulo: 'Temps de travail — France, Belgique, Suisse',
  resumen: 'Leer la infografía de las pp. 82-83, comparar con plus / moins / autant y presentar los datos de tu país.',
  intro: 'La infografía compara el trabajo en tres países francófonos. Esta ficha te hace leer '
       + 'las cifras, compararlas y escribirlas en letras.',

  secciones: [
    { titulo: 'Lire les chiffres',
      sous: 'El vocabulario del trabajo y los datos de la infografía.',
      rappels: [
        { titulo: 'Le vocabulaire et les données',
          html: `<ul>
            <li><b>le temps de travail</b> (horas de trabajo) · <b>les jours fériés</b> (festivos) ·
                <b>les vacances</b> · <b>le salaire</b> (brut = bruto) · <b>la retraite</b> (jubilación)</li>
            <li><b>par semaine / par mois / par an</b>: por semana, por mes, por año.</li>
          </ul>
          <table style="width:100%;border-collapse:collapse;margin:.6rem 0">
            <tr><th style="text-align:left;padding:.3rem">&nbsp;</th><th style="text-align:left">France</th>
                <th style="text-align:left">Belgique</th><th style="text-align:left">Suisse</th></tr>
            <tr><td style="padding:.3rem">Temps de travail</td><td>35 h</td><td>38 h</td><td>45 h</td></tr>
            <tr><td style="padding:.3rem">Jours fériés / an</td><td>11 à 13</td><td>10 à 12</td><td>7 à 15</td></tr>
            <tr><td style="padding:.3rem">Vacances</td><td>5 semaines</td><td>4 semaines</td><td>4 semaines</td></tr>
            <tr><td style="padding:.3rem">Âge de la retraite</td><td>62 ans</td><td>65 ans</td><td>64-65 ans</td></tr>
          </table>
          <p><small>Cifras de la infografía del libro (p. 82).</small></p>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: 'Comparer et présenter',
      sous: 'Plus, moins, autant, los números en letras y tu propio país.',
      rappels: [
        { titulo: 'Comparer : plus, moins, autant',
          html: `<ul>
            <li><b>plus … que</b> (más que): <i>En Suisse, on travaille <b>plus</b> qu’en France.</i></li>
            <li><b>moins … que</b> (menos que): <i>En France, on travaille <b>moins</b> qu’en Belgique.</i></li>
            <li><b>autant … que</b> (tanto como): <i>Il y a <b>autant</b> de semaines de vacances en Belgique
                qu’en Suisse.</i></li>
          </ul>
          <div class="piege">Con un <b>sustantivo</b> se añade <b>de</b>: <i>plus <b>de</b> vacances,
          moins <b>de</b> jours fériés, autant <b>de</b> semaines</i>. Y «que» ante vocal pierde la e:
          <i>qu’en France</i>.</div>
          <p><b>Los números:</b> 35 = trente-cinq · 38 = trente-huit · 45 = quarante-cinq ·
          62 = soixante-deux · 65 = soixante-cinq.</p>` }
      ],
      ejercicios: [2, 3, 4, 5]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'paires', etiqueta:'Associe',
      consigne:'Associe le mot et sa traduction.',
      pairs: [
        ['le temps de travail', 'las horas de trabajo'],
        ['les jours fériés', 'los días festivos'],
        ['les vacances', 'las vacaciones'],
        ['le salaire', 'el salario'],
        ['la retraite', 'la jubilación'],
        ['par an', 'por año'],
        ['par mois', 'por mes'],
        ['brut', 'bruto']
      ] },

    /* 1 */ { t:'qcm', etiqueta:'Lis',
      consigne:'Réponds avec les données de l’infographie.',
      q: [
        { enonce:'En France, on travaille environ…', o:['35 heures', '38 heures', '45 heures'], r:0 },
        { enonce:'Où travaille-t-on le plus&nbsp;?', o:['en France', 'en Belgique', 'en Suisse'], r:2 },
        { enonce:'Combien de semaines de vacances a-t-on en France&nbsp;?', o:['4', '5', '6'], r:1 },
        { enonce:'Combien de semaines de vacances a-t-on en Belgique et en Suisse&nbsp;?', o:['3', '4', '5'], r:1 },
        { enonce:'À quel âge part-on à la retraite en France&nbsp;?', o:['62 ans', '64 ans', '65 ans'], r:0 },
        { enonce:'Où le salaire moyen brut est-il le plus élevé&nbsp;?', o:['en France', 'en Belgique', 'en Suisse'], r:2 }
      ] },

    /* 2 */ { t:'trous', etiqueta:'Compare',
      consigne:'Complète avec plus, moins ou autant.',
      q: [
        { enonce:'En Suisse, on travaille ___ qu’en France.', r:['plus'], taille:8 },
        { enonce:'En France, on travaille ___ qu’en Belgique.', r:['moins'], taille:8 },
        { enonce:'En Belgique et en Suisse, il y a ___ de semaines de vacances.', r:['autant'], taille:8 },
        { enonce:'En France, il y a ___ de semaines de vacances qu’en Suisse.', r:['plus'], taille:8,
          note:'Con un sustantivo: <b>plus de</b> semaines.' },
        { enonce:'En Suisse, on part à la retraite ___ tard qu’en France.', r:['plus'], taille:8 }
      ] },

    /* 3 */ { t:'transfo', etiqueta:'Écrire les nombres',
      consigne:'Écris les nombres en lettres.',
      sous:'Los números, completos y con guiones.',
      q: [
        { enonce:'En France, on travaille 35 heures.', modele:'En France, on travaille trente-cinq heures.' },
        { enonce:'En Belgique, on travaille 38 heures.', modele:'En Belgique, on travaille trente-huit heures.' },
        { enonce:'En Suisse, on travaille 45 heures.', modele:'En Suisse, on travaille quarante-cinq heures.' },
        { enonce:'En France, on part à la retraite à 62 ans.', modele:'En France, on part à la retraite à soixante-deux ans.' },
        { enonce:'En Belgique, on part à la retraite à 65 ans.', modele:'En Belgique, on part à la retraite à soixante-cinq ans.' }
      ] },

    /* 4 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris. Les nombres, en lettres.',
      q: [
        { texte:'En France, on travaille trente-cinq heures par semaine.' },
        { texte:'En Suisse, il y a quatre semaines de vacances.' },
        { texte:'On part à la retraite à soixante-deux ans.' },
        { texte:'En Belgique, on travaille trente-huit heures.' }
      ] },

    /* 5 */ { t:'prod', etiqueta:'Mon pays', mots:60,
      consigne:'Présente le temps de travail dans ton pays.',
      sous:'60 palabras. Como en la actividad 3 de la p. 83.',
      check: [
        'Cuántas <b>horas</b> se trabaja por semana, con el número en letras.',
        'Los <b>jours fériés</b> y las <b>vacances</b>, aunque sea aproximado.',
        'La edad de la <b>retraite</b>.',
        'Una comparación con <b>plus / moins / autant … que</b>.'
      ],
      modele:'Dans mon pays, on travaille environ quarante-cinq heures par semaine. Il y a une '
           + 'dizaine de jours fériés et deux semaines de vacances par an. On part à la '
           + 'retraite vers soixante-cinq ans. On travaille donc plus qu’en France, et on a '
           + 'moins de vacances.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   4 · LES TRAVAILLEURS DU DIMANCHE   (livre pp. 84-85)
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'u5-p84',
  tipo: 'revision',
  ciclo: 'Nov. 2026 · A2.1',
  fecha: 'Séance du 26 novembre · pp. 84-85',
  titulo: 'Les travailleurs du dimanche — la fréquence',
  resumen: 'Los adverbios de frecuencia (toujours, souvent, parfois, rarement, jamais) y la élision.',
  intro: 'El blog de las pp. 84-85 habla de quienes trabajan el domingo. Para contarlo hacen falta '
       + 'las palabras de la frecuencia, y para leerlo en voz alta, la élision.',

  secciones: [
    { titulo: 'Les adverbes de fréquence',
      sous: 'De «siempre» a «nunca», y dónde va cada uno.',
      rappels: [
        { titulo: 'L’échelle de la fréquence',
          html: `<div class="ex"><b>toujours</b> (100 %) → <b>souvent</b> → <b>parfois</b> →
          <b>rarement</b> → <b>jamais</b> (0 %)</div>
          <ul>
            <li>Van <b>después del verbo conjugado</b>: <i>Je travaille <b>souvent</b> le dimanche.</i></li>
            <li><b>jamais</b> solo existe en frase negativa y va con <b>ne</b>:
                <i>Je <b>ne</b> travaille <b>jamais</b> le dimanche.</i> No se pone <i>pas</i>.</li>
            <li>También se expresa con grupos de palabras: <i>tous les jours, tous les week-ends,
                une fois par semaine, deux fois par mois, tous les quinze jours</i>.</li>
          </ul>
          <div class="piege">«<i>Je travaille jamais</i>» se oye en la conversación, pero por escrito
          y en clase se dice <b>je ne travaille jamais</b>.</div>` }
      ],
      ejercicios: [0, 1, 2]
    },
    { titulo: 'Placer, écrire, produire',
      sous: 'Poner el adverbio en la frase y escribir sobre tus hábitos.',
      rappels: [
        { titulo: 'La élision (fonética 10)',
          html: `<p>Delante de vocal o de <b>h</b> muda, las palabras cortas pierden su vocal y se
          apoyan en la siguiente: <b>je → j’</b>, <b>ne → n’</b>, <b>ce → c’</b>, <b>que → qu’</b>,
          <b>le / la → l’</b>.</p>
          <div class="ex"><b>J’</b>appelle mes parents. · Je <b>n’</b>aime pas travailler le dimanche. ·
          <b>C’</b>est mon jour de repos. · <b>L’</b>infirmière travaille la nuit.</div>
          <p>Por eso no se dice «je appelle» ni «je ne aime pas»: se escribe y se pronuncia
          <i>j’appelle, je n’aime pas</i>.</p>` }
      ],
      ejercicios: [3, 4, 5]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'ordre', etiqueta:'L’échelle',
      consigne:'Du plus fréquent au moins fréquent.',
      items: ['toujours', 'souvent', 'parfois', 'rarement', 'jamais'],
      aide:'De «siempre» (100 %) a «nunca» (0 %).' },

    /* 1 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Choisis la bonne réponse.',
      q: [
        { enonce:'Je téléphone à mes parents ___ : 365 jours par an.',
          o:['tous les jours', 'jamais', 'rarement'], r:0 },
        { enonce:'Il ne fait ___ de sport. <i>(0 %)</i>',
          o:['jamais', 'toujours', 'parfois'], r:0, note:'<b>ne… jamais</b>: el «ne» es obligatorio.' },
        { enonce:'Quelle phrase est correcte&nbsp;?',
          o:['Je travaille souvent le dimanche.', 'Je souvent travaille le dimanche.', 'Je travaille le dimanche souvent.'], r:0,
          note:'El adverbio va justo después del verbo conjugado.' },
        { enonce:'Quelle phrase est correcte&nbsp;?',
          o:['Je travaille jamais le dimanche.', 'Je ne travaille jamais le dimanche.', 'Je ne travaille pas jamais le dimanche.'], r:1 },
        { enonce:'«&nbsp;Une fois par semaine&nbsp;» veut dire…',
          o:['tous les jours', 'sept fois par semaine', 'un jour sur sept'], r:2 }
      ] },

    /* 2 */ { t:'tri', etiqueta:'Classe',
      consigne:'Classe les expressions selon la fréquence.',
      cols: ['tous les jours / toujours', 'de temps en temps', 'presque jamais'],
      items: [
        ['tous les jours', 0], ['toujours', 0],
        ['parfois', 1], ['une fois par semaine', 1], ['deux fois par mois', 1],
        ['rarement', 2], ['jamais', 2], ['une fois par an', 2]
      ] },

    /* 3 */ { t:'transfo', etiqueta:'Ajoute',
      consigne:'Ajoute l’adverbe entre parenthèses.',
      sous:'Cuidado con la posición, y con el «ne» de jamais.',
      q: [
        { enonce:'Je travaille le dimanche. <i>(jamais)</i>', modele:'Je ne travaille jamais le dimanche.' },
        { enonce:'Elle appelle ses parents. <i>(souvent)</i>', modele:'Elle appelle souvent ses parents.' },
        { enonce:'Nous mangeons au restaurant. <i>(parfois)</i>', modele:'Nous mangeons parfois au restaurant.' },
        { enonce:'Ils sortent le samedi. <i>(toujours)</i>', modele:'Ils sortent toujours le samedi.' },
        { enonce:'Tu dors huit heures. <i>(rarement)</i>', modele:'Tu dors rarement huit heures.' }
      ] },

    /* 4 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris. Attention à la élision&nbsp;!',
      q: [
        { texte:'J’appelle mes parents tous les jours.' },
        { texte:'Je ne sors jamais le lundi.' },
        { texte:'Il travaille parfois le dimanche.' },
        { texte:'Elle fait du sport une fois par semaine.' },
        { texte:'Nous ne dormons jamais tard.' }
      ] },

    /* 5 */ { t:'prod', etiqueta:'Écrire', mots:40,
      consigne:'À quelle fréquence fais-tu ces choses&nbsp;?',
      sous:'40 palabras. Como en la actividad 12 de la p. 85: cinco frases.',
      check: [
        'Cinco frases: faire du sport, lire la presse, aller au cinéma, manger au restaurant, voir ses amis.',
        'Un adverbio o una expresión de frecuencia en <b>cada</b> frase.',
        'Una frase con <b>ne… jamais</b>.',
        'Al menos una élision (j’aime, je n’aime pas, j’appelle…).'
      ],
      modele:'Je fais du sport deux fois par semaine. Je lis la presse tous les matins. Je vais '
           + 'rarement au cinéma. Je mange parfois au restaurant. Je vois mes amis tous les '
           + 'week-ends, mais je ne prends jamais le train avec eux.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   5 · LE CALENDRIER, LES JOURS ET LES MOTS   (livre pp. 86-88)
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'u5-p86',
  tipo: 'revision',
  ciclo: 'Nov. 2026 · A2.1',
  fecha: 'Séance du 1er décembre · pp. 86-88',
  titulo: 'Le calendrier, les jours et les mots',
  resumen: 'Meses, estaciones, fechas y días de la semana: en, au, le, du… au, tous les…',
  intro: 'El cierre de la unidad: situar un hecho en el calendario y hablar de los días. Dos '
       + 'bloques con su explicación: los meses y las estaciones, y los días de la semana.',

  secciones: [
    { titulo: 'Les mois, les saisons, les dates',
      sous: 'Qué preposición va con cada cosa.',
      rappels: [
        { titulo: 'Situer dans le temps',
          html: `<p><b>Los meses</b> (sin mayúscula): janvier, février, mars, avril, mai, juin, juillet,
          août, septembre, octobre, novembre, décembre. <b>Las estaciones:</b> le printemps, l’été,
          l’automne, l’hiver.</p>
          <ul>
            <li><b>en</b> + mes: <i>en juillet</i> · <b>en</b> + été / automne / hiver:
                <i>en été, en hiver</i></li>
            <li><b>au</b> + printemps: <i>au printemps</i> (la única excepción)</li>
            <li>una fecha: <b>le</b> + número: <i>le 15 juillet</i>, <i>le premier mai</i> (el 1.º se dice «premier»)</li>
          </ul>
          <div class="ex">Exprimer la durée : <b>du</b> 15 juillet <b>au</b> 13 août ·
          <b>de</b> juin <b>à</b> septembre</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: 'Les jours de la semaine',
      sous: 'Lundi, le lundi, tous les lundis… y la línea de tiempo de un día.',
      rappels: [
        { titulo: 'Lundi, le lundi, tous les lundis',
          html: `<ul>
            <li><b>lundi</b> (sin artículo): ese día concreto, el de esta semana:
                <i>Lundi, je vais chez le médecin.</i></li>
            <li><b>le lundi</b>: <b>todos</b> los lunes, es una costumbre:
                <i>Le lundi, je me réveille à sept heures et demie.</i></li>
            <li><b>tous les lundis</b>: lo mismo, dicho con más fuerza. Los días llevan -s en plural:
                <i>tous les samedis</i>.</li>
            <li><b>du lundi au vendredi</b> = <b>en semaine</b>; <b>le week-end</b> = sábado y domingo.</li>
          </ul>
          <div class="piege">En español decimos «los lunes» y en francés <b>el lunes</b>: <i>le lundi</i>,
          en singular.</div>` }
      ],
      ejercicios: [2, 3, 4, 5, 6, 7]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'paires', etiqueta:'Associe',
      consigne:'Associe le mois et sa saison habituelle.',
      pairs: [
        ['janvier', 'l’hiver'],
        ['avril', 'le printemps'],
        ['juillet', 'l’été'],
        ['octobre', 'l’automne']
      ] },

    /* 1 */ { t:'trous', etiqueta:'Complète',
      consigne:'Complète avec en ou au.',
      q: [
        { enonce:'Mon anniversaire est ___ mars.', r:['en'], taille:6 },
        { enonce:'Il fait chaud ___ été.', r:['en'], taille:6 },
        { enonce:'Les fleurs poussent ___ printemps.', r:['au'], taille:6 },
        { enonce:'On part en vacances ___ juillet.', r:['en'], taille:6 },
        { enonce:'Il neige ___ hiver.', r:['en'], taille:6 },
        { enonce:'Je suis né ___ automne.', r:['en'], taille:6 }
      ] },

    /* 2 */ { t:'qcm', etiqueta:'Choisis',
      consigne:'Choisis la bonne réponse.',
      q: [
        { enonce:'Quelle phrase exprime une habitude&nbsp;?',
          o:['Lundi, je vais au cinéma.', 'Le lundi, je vais au cinéma.', 'Lundi prochain, je vais au cinéma.'], r:1 },
        { enonce:'Comment dit-on «&nbsp;de lunes a viernes&nbsp;»&nbsp;?',
          o:['du lundi au vendredi', 'le lundi au vendredi', 'de lundi à vendredi'], r:0 },
        { enonce:'Comment dit-on «&nbsp;todos los sábados&nbsp;»&nbsp;?',
          o:['tous les samedis', 'toutes les samedis', 'chaque samedis'], r:0 },
        { enonce:'Quelle phrase est correcte&nbsp;?',
          o:['Je pars du 15 juillet au 13 août.', 'Je pars de 15 juillet à 13 août.', 'Je pars le 15 juillet jusqu’août.'], r:0 },
        { enonce:'«&nbsp;En semaine&nbsp;» veut dire…',
          o:['du lundi au vendredi', 'le dimanche', 'toute l’année'], r:0 }
      ] },

    /* 3 */ { t:'ordre', etiqueta:'La semaine',
      consigne:'Remets les jours dans l’ordre.',
      items: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] },

    /* 4 */ { t:'trous', etiqueta:'Complète',
      consigne:'Complète avec le bon jour.',
      q: [
        { enonce:'Après lundi, c’est ___.', r:['mardi'], taille:10 },
        { enonce:'Avant jeudi, c’est ___.', r:['mercredi'], taille:10 },
        { enonce:'Le jour après vendredi, c’est ___.', r:['samedi'], taille:10 },
        { enonce:'Samedi et ___ : c’est le week-end.', r:['dimanche'], taille:10 }
      ] },

    /* 5 */ { t:'transfo', etiqueta:'Transformer',
      consigne:'Dis-le autrement.',
      q: [
        { enonce:'Je vais au cinéma chaque lundi.', modele:'Je vais au cinéma le lundi.' },
        { enonce:'Elle travaille de lundi à vendredi.', modele:'Elle travaille du lundi au vendredi.' },
        { enonce:'Nous mangeons au restaurant chaque samedi.', modele:'Nous mangeons au restaurant tous les samedis.' },
        { enonce:'Je prends mes vacances du 15 juillet jusqu’au 13 août.', modele:'Je prends mes vacances du 15 juillet au 13 août.' }
      ] },

    /* 6 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris.',
      q: [
        { texte:'Le lundi, je me réveille à sept heures et demie.' },
        { texte:'Mon anniversaire, c’est en avril.' },
        { texte:'En été, il fait chaud.' },
        { texte:'Du lundi au vendredi, je travaille.' },
        { texte:'Tous les dimanches, j’appelle mes parents.' }
      ] },

    /* 7 */ { t:'prod', etiqueta:'Défi n° 2', mots:60,
      consigne:'Présente ton jour préféré de la semaine.',
      sous:'60 palabras. Para el calendario de los días favoritos de la clase (défi n.º 2, p. 87).',
      check: [
        'Cuál es tu <b>jour préféré</b> y por qué.',
        'Una costumbre con <b>le</b> + día (le samedi, je…).',
        'Un adverbio de frecuencia (toujours, souvent, parfois, jamais).',
        'Una expresión con <b>tous les…</b> o <b>du… au…</b>.'
      ],
      modele:'Mon jour préféré, c’est le samedi. Je ne travaille pas, je me réveille tard et je '
           + 'prends mon petit-déjeuner avec ma famille. Le samedi, je fais toujours du sport '
           + 'le matin et, le soir, je sors parfois avec des amis. Tous les samedis, j’appelle '
           + 'ma grand-mère. C’est la journée parfaite&nbsp;!' }
  ]
});
