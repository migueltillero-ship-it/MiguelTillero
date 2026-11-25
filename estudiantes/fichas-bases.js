/* ═══════════════════════════════════════════════════════════════════════
   LES BASES · nueve fichas que comparten TODOS los espacios de ejercicios
   (A1, A2.1, B2 y el espacio de bases de las clases particulares).
   Se cargan después del archivo de fichas de cada espacio y se colocan al
   principio. En A2.1 cuentan para la nota; en los demás son de refuerzo
   (en el catálogo, cuenta = false), para no cambiar notas de ciclos ya
   cerrados.
   ═══════════════════════════════════════════════════════════════════════ */
(function(){
/* ═══════════════════════════════════════════════════════════════════════
   0 · REMISE À NIVEAU — LES BASES   (recorrido obligatorio del A2.1)
   Nueve fichas que recuperan lo de base que la Unité 5 dejó ver como poco
   firme: vocales y nasales, los números (60 a 99), la hora, los verbos de
   los tres grupos y, al final, los verbos de la rutina con el paso al
   passé composé. Cada ficha empieza por su explicación (rappels) y sigue
   con la práctica; la última es un balance que mezcla todo.
   ═══════════════════════════════════════════════════════════════════════ */
const RN = { tipo: 'bases', ciclo: window.MT_CICLO_ACTUAL || '' };
const __B = [];
const TBL = 'style="width:100%;border-collapse:collapse;margin:.6rem 0"';

__B.push(Object.assign({}, RN, {
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

__B.push(Object.assign({}, RN, {
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

__B.push(Object.assign({}, RN, {
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

__B.push(Object.assign({}, RN, {
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

__B.push(Object.assign({}, RN, {
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

__B.push(Object.assign({}, RN, {
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

__B.push(Object.assign({}, RN, {
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

__B.push(Object.assign({}, RN, {
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

__B.push(Object.assign({}, RN, {
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



FICHAS.unshift.apply(FICHAS, __B);
})();
