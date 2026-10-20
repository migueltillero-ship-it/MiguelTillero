/* ═══════════════════════════════════════════════════════════════════════
   EJERCICIOS COMPLEMENTARIOS · A1.4 HÍBRIDO — OCTUBRE 2026
   ═══════════════════════════════════════════════════════════════════════
   Lo trabajado en clase: los adjetivos posesivos, los pronombres posesivos,
   los números —con las reglas de ortografía y los difíciles, 70, 80, 90—,
   y la concordancia de género y número con sus excepciones.

   Cada ficha tiene dos partes: «Lo que ya viste», para volver sobre lo de
   clase por otro camino, y «Un paso más», con lo que no dio tiempo a ver.

   No hay nombres ni datos de estudiantes en este archivo: se publica con el
   sitio. Los números de teléfono de los ejercicios están inventados.

   Tipos de ejercicio (motor en assets/js/fichas-ejercicios.js):
     qcm · trous · tri · paires · transfo · dictee · prod
   ═══════════════════════════════════════════════════════════════════════ */

const FICHAS = [];

/* ───────────────────────────────────────────────────────────────────────
   1 · LES ADJECTIFS POSSESSIFS
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'posesivos',
  tipo: 'revision',
  fecha: 'Fiche 1 · Grammaire',
  titulo: 'Mon, ma, mes — les adjectifs possessifs',
  resumen: 'Lo del pizarrón: mon ton son / ma ta sa / mes tes ses, y por qué se dice «mon amie».',
  intro: 'La regla que lo cambia todo: en francés el posesivo concuerda con la cosa, '
       + 'no con el dueño. Por eso «sa maison» puede ser la casa de él o la de ella.',

  secciones: [
    { titulo: 'Lo que ya viste',
      sous: 'El cuadro del pizarrón, ahora clasificando y completando.',
      rappels: [
        { titulo: 'Le tableau complet',
          html: `<table style="width:100%;border-collapse:collapse;margin:.6rem 0">
            <tr><th style="text-align:left;padding:.3rem">&nbsp;</th>
                <th style="text-align:left;padding:.3rem">masculin</th>
                <th style="text-align:left;padding:.3rem">féminin</th>
                <th style="text-align:left;padding:.3rem">pluriel</th></tr>
            <tr><td style="padding:.3rem">je</td><td><b>mon</b> frère</td><td><b>ma</b> sœur</td><td><b>mes</b> parents</td></tr>
            <tr><td style="padding:.3rem">tu</td><td><b>ton</b> frère</td><td><b>ta</b> sœur</td><td><b>tes</b> parents</td></tr>
            <tr><td style="padding:.3rem">il / elle</td><td><b>son</b> frère</td><td><b>sa</b> sœur</td><td><b>ses</b> parents</td></tr>
            <tr><td style="padding:.3rem">nous</td><td colspan="2"><b>notre</b> maison</td><td><b>nos</b> amis</td></tr>
            <tr><td style="padding:.3rem">vous</td><td colspan="2"><b>votre</b> maison</td><td><b>vos</b> amis</td></tr>
            <tr><td style="padding:.3rem">ils / elles</td><td colspan="2"><b>leur</b> maison</td><td><b>leurs</b> amis</td></tr>
          </table>
          <div class="piege"><b>La diferencia con el español:</b> el posesivo concuerda con
          <b>la cosa</b>, no con el dueño. <i>Paul aime <b>sa</b> mère</i> y
          <i>Marie aime <b>sa</b> mère</i>: la misma forma. Y <i>Paul aime <b>son</b> père</i>,
          porque <i>père</i> es masculino.</div>` },
        { titulo: 'La regla de «mon amie»',
          html: `<p>Delante de una palabra <b>femenina</b> que empieza por <b>vocal o h muda</b>,
          se usa <b>mon, ton, son</b> — nunca ma, ta, sa. Es para no juntar dos vocales.</p>
          <div class="ex">mon amie · ton école · son histoire · mon habitude
          <br><s>ma amie</s> · <s>ta école</s> · <s>sa histoire</s></div>` }
      ],
      ejercicios: [0, 1, 2]
    },
    { titulo: 'Un paso más',
      sous: 'Leur / leurs, que casi nadie distingue, y una pequeña producción.',
      rappels: [
        { titulo: 'Leur ou leurs ?',
          html: `<ul>
            <li><b>leur</b> + una cosa: <i>Les enfants aiment <b>leur</b> maison.</i>
                (una sola casa)</li>
            <li><b>leurs</b> + varias cosas: <i>Les enfants aiment <b>leurs</b> amis.</i></li>
          </ul>
          <div class="piege">Ojo: existe otro <b>leur</b>, el que significa «les»
          (<i>Je <b>leur</b> parle</i> = les hablo). Ese <b>nunca</b> lleva S.</div>` }
      ],
      ejercicios: [3, 4, 5]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'tri', etiqueta:'Clasificar',
      consigne:'¿Mon, ma o mes? Clasifica cada palabra.',
      cols: ['mon', 'ma', 'mes'],
      items: [
        ['frère', 0], ['livre', 0], ['père', 0],
        ['sœur', 1], ['maison', 1], ['voiture', 1],
        ['parents', 2], ['cahiers', 2], ['amies', 2],
        ['amie', 0], ['école', 0]
      ],
      aide:'<b>amie</b> y <b>école</b> son femeninas, pero empiezan por vocal: por eso '
         + '«mon amie», «mon école». Es la trampa clásica del nivel.' },

    /* 1 */ { t:'trous', etiqueta:'Completar',
      consigne:'Complète avec mon, ma, mes, ton, ta, tes, son, sa ou ses.',
      q: [
        { enonce:'Je te présente ___ sœur, elle s’appelle Camille.', r:['ma'], taille:8 },
        { enonce:'C’est ___ ami Antoine. <i>(je)</i>', r:['mon'], taille:8 },
        { enonce:'Tu as ___ cahier&nbsp;? <i>(tu)</i>', r:['ton'], taille:8 },
        { enonce:'Elle habite avec ___ parents. <i>(elle)</i>', r:['ses'], taille:8 },
        { enonce:'Paul aime beaucoup ___ mère. <i>(il)</i>', r:['sa'], taille:8,
          note:'<b>mère</b> es femenino → <b>sa</b>, aunque el dueño sea Paul.' },
        { enonce:'Marie cherche ___ frère. <i>(elle)</i>', r:['son'], taille:8,
          note:'<b>frère</b> es masculino → <b>son</b>, aunque la dueña sea Marie.' },
        { enonce:'Où est ___ école&nbsp;? <i>(tu)</i>', r:['ton'], taille:8 },
        { enonce:'J’adore ___ amies. <i>(je)</i>', r:['mes'], taille:8 }
      ] },

    /* 2 */ { t:'transfo', etiqueta:'Transformar',
      consigne:'Dis-le autrement, avec un possessif.',
      q: [
        { enonce:'C’est le livre de Paul.', modele:'C’est son livre.' },
        { enonce:'C’est la maison de mes parents.', modele:'C’est leur maison.' },
        { enonce:'Ce sont les cahiers de Marie.', modele:'Ce sont ses cahiers.' },
        { enonce:'C’est l’amie de Sophie.', modele:'C’est son amie.',
          note:'<b>amie</b> empieza por vocal → <b>son</b>, no «sa».' },
        { enonce:'C’est la voiture de nous deux.', modele:'C’est notre voiture.' }
      ] },

    /* 3 */ { t:'qcm', etiqueta:'Leur / leurs',
      consigne:'Choisis la bonne forme.',
      q: [
        { enonce:'Les élèves apportent ___ cahier.',
          o:['leur', 'leurs', 'leur’s'], r:0, note:'Un cuaderno cada uno, pero un solo objeto → <b>leur</b>.' },
        { enonce:'Les enfants aiment ___ grands-parents.',
          o:['leur', 'leurs', 'ses'], r:1 },
        { enonce:'Je ___ parle tous les jours.',
          o:['leur', 'leurs', 'leurs’'], r:0, note:'Aquí <b>leur</b> significa «les»: nunca lleva S.' },
        { enonce:'___ maison est très grande. <i>(nous)</i>',
          o:['Nos', 'Notre', 'Nôtre'], r:1, note:'<b>Notre</b> sin acento es el adjetivo. El acento sale en «le nôtre».' },
        { enonce:'Vous avez ___ passeports&nbsp;?',
          o:['votre', 'vos', 'vôtres'], r:1 },
        { enonce:'Elles sont ___ amies.',
          o:['mon', 'ma', 'mes'], r:2, note:'Del pizarrón: <i>elles sont mes amies</i>.' }
      ] },

    /* 4 */ { t:'dictee', etiqueta:'Escuchar',
      consigne:'Écoute et écris. Attention: on entend la liaison.',
      sous:'La liaison es la pista: «mon ami» suena /mon-nami/ y «mes amis» suena /me-zami/.',
      q: [
        { texte:'Il est mon ami.' },
        { texte:'Ils sont mes amis.' },
        { texte:'Elles sont mes amies.' },
        { texte:'Sa sœur habite avec ses parents.' },
        { texte:'Notre maison est à côté de leur école.' }
      ] },

    /* 5 */ { t:'prod', etiqueta:'Écrire', mots:60,
      consigne:'Présente ta famille en six phrases.',
      sous:'60 palabras. Una foto de tu familia en francés.',
      check: [
        'Cinco posesivos distintos por lo menos (mon, ma, mes, notre, leur…).',
        'Un «mon» delante de una palabra femenina con vocal (mon amie, mon école).',
        'La edad de dos personas, con los números en letras.',
        'Un adjetivo para cada persona, bien concordado.'
      ],
      modele:'Ma famille n’est pas très grande. Mon père s’appelle Carlos et ma mère '
           + 'Teresa. Mon frère a quatorze ans et ma sœur a dix-huit ans&nbsp;; elle est '
           + 'très sportive. Nos grands-parents habitent près de chez nous, et leur maison '
           + 'est plus grande que la nôtre. Mon amie Sofía vient souvent&nbsp;: ses parents '
           + 'sont amis avec mes parents.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   2 · LES PRONOMS POSSESSIFS
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'pronombres',
  fecha: 'Fiche 2 · Grammaire',
  titulo: 'Le mien, le tien — les pronoms possessifs',
  resumen: 'El que sustituye al nombre entero: «mon livre» → «le mien». Con su acento circunflejo.',
  intro: 'El adjetivo acompaña al nombre (mon livre). El pronombre lo reemplaza '
       + '(le mien). En español haces lo mismo: mi libro → el mío.',

  secciones: [
    { titulo: 'Lo que ya viste',
      sous: 'Del adjetivo al pronombre, que es el mismo paso que en español.',
      rappels: [
        { titulo: 'Le tableau',
          html: `<table style="width:100%;border-collapse:collapse;margin:.6rem 0">
            <tr><th style="text-align:left;padding:.3rem">&nbsp;</th>
                <th style="text-align:left;padding:.3rem">masc. sing.</th>
                <th style="text-align:left;padding:.3rem">fém. sing.</th>
                <th style="text-align:left;padding:.3rem">pluriel</th></tr>
            <tr><td style="padding:.3rem">je</td><td>le mien</td><td>la mienne</td><td>les miens / les miennes</td></tr>
            <tr><td style="padding:.3rem">tu</td><td>le tien</td><td>la tienne</td><td>les tiens / les tiennes</td></tr>
            <tr><td style="padding:.3rem">il / elle</td><td>le sien</td><td>la sienne</td><td>les siens / les siennes</td></tr>
            <tr><td style="padding:.3rem">nous</td><td>le nôtre</td><td>la nôtre</td><td>les nôtres</td></tr>
            <tr><td style="padding:.3rem">vous</td><td>le vôtre</td><td>la vôtre</td><td>les vôtres</td></tr>
            <tr><td style="padding:.3rem">ils / elles</td><td>le leur</td><td>la leur</td><td>les leurs</td></tr>
          </table>
          <div class="piege"><b>El acento circunflejo es la clave:</b>
          <i>notre</i> y <i>votre</i> (adjetivos, sin acento) ≠
          <i>le nôtre</i> y <i>le vôtre</i> (pronombres, con acento <b>ô</b>).
          Y el acento cambia el sonido: <i>notre</i> suena /nɔtʁ/, <i>nôtre</i> suena /notʁ/.</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: 'Un paso más',
      sous: 'Usarlo en la frase, que es donde cuesta.',
      rappels: [
        { titulo: 'Cómo se usa de verdad',
          html: `<ul>
            <li>Para comparar: <i>Ma voiture est vieille, <b>la tienne</b> est neuve.</i></li>
            <li>Para no repetir: <i>— C’est ton stylo&nbsp;? — Oui, c’est <b>le mien</b>.</i></li>
            <li>Con preposición, se contrae: <i>à + le mien = <b>au mien</b></i> ·
                <i>de + les miens = <b>des miens</b></i>.</li>
          </ul>
          <div class="ex">— À qui est ce sac&nbsp;? — Ce n’est pas <b>le mien</b>, c’est
          <b>le sien</b>.</div>` }
      ],
      ejercicios: [2, 3, 4]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'paires', etiqueta:'Emparejar',
      consigne:'Del adjetivo al pronombre.',
      pairs: [
        ['mon livre', 'le mien'],
        ['ma maison', 'la mienne'],
        ['mes amis', 'les miens'],
        ['ton stylo', 'le tien'],
        ['ta voiture', 'la tienne'],
        ['son chien', 'le sien'],
        ['notre classe', 'la nôtre'],
        ['votre adresse', 'la vôtre'],
        ['leur maison', 'la leur'],
        ['leurs enfants', 'les leurs']
      ] },

    /* 1 */ { t:'trous', etiqueta:'Completar',
      consigne:'Complète avec le pronom possessif qui convient.',
      q: [
        { enonce:'— C’est ton cahier&nbsp;? — Oui, c’est ___.', r:['le mien'], taille:12 },
        { enonce:'Ma sœur a dix-huit ans&nbsp;; ___ en a vingt. <i>(ta sœur)</i>',
          r:['la tienne'], taille:12 },
        { enonce:'Nos cahiers sont sur la table, ___ sont dans le sac. <i>(vos cahiers)</i>',
          r:['les vôtres'], taille:12 },
        { enonce:'Ce ne sont pas mes clés, ce sont ___. <i>(ses clés)</i>',
          r:['les siennes'], taille:12 },
        { enonce:'Leur maison est grande, ___ est petite. <i>(notre maison)</i>',
          r:['la nôtre'], taille:12,
          note:'Con acento circunflejo: <b>la nôtre</b>.' }
      ] },

    /* 2 */ { t:'qcm', etiqueta:'El acento',
      consigne:'Con acento o sin acento: elige.',
      q: [
        { enonce:'___ professeur est très gentil. <i>(nous)</i>',
          o:['Notre', 'Nôtre', 'Nos'], r:0, note:'Adjetivo, delante del nombre → <b>notre</b>, sin acento.' },
        { enonce:'Cette voiture&nbsp;? C’est ___.',
          o:['la notre', 'la nôtre', 'le nôtre'], r:1, note:'Pronombre → acento, y <i>voiture</i> es femenino.' },
        { enonce:'___ adresse, s’il vous plaît&nbsp;?',
          o:['Votre', 'Vôtre', 'Vos'], r:0 },
        { enonce:'Nos enfants et ___.',
          o:['les votres', 'les vôtres', 'les vôtre'], r:1 },
        { enonce:'C’est la maison de Paul&nbsp;? Oui, c’est ___.',
          o:['la sienne', 'le sien', 'la leur'], r:0 }
      ] },

    /* 3 */ { t:'transfo', etiqueta:'Transformar',
      consigne:'Évite la répétition&nbsp;: remplace par un pronom possessif.',
      q: [
        { enonce:'Mon téléphone est cassé, ton téléphone marche bien.',
          modele:'Mon téléphone est cassé, le tien marche bien.' },
        { enonce:'Ma chambre est petite, sa chambre est grande.',
          modele:'Ma chambre est petite, la sienne est grande.' },
        { enonce:'Nos résultats sont bons, vos résultats aussi.',
          modele:'Nos résultats sont bons, les vôtres aussi.' },
        { enonce:'Ce sont tes affaires ou ce sont mes affaires&nbsp;?',
          modele:'Ce sont les tiennes ou les miennes&nbsp;?' },
        { enonce:'Je parle de mes parents, pas de tes parents.',
          modele:'Je parle des miens, pas des tiens.',
          note:'de + les miens = <b>des miens</b>.' }
      ] },

    /* 4 */ { t:'dictee', etiqueta:'Escuchar',
      consigne:'Écoute et écris.',
      q: [
        { texte:'Ce n’est pas le mien, c’est le sien.' },
        { texte:'Notre classe est plus grande que la vôtre.' },
        { texte:'Mes clés sont ici&nbsp;; où sont les tiennes&nbsp;?' },
        { texte:'Leur maison et la nôtre sont dans la même rue.' }
      ] }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   3 · LES NOMBRES : LES ÉCRIRE
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'numeros-escribir',
  fecha: 'Fiche 3 · Les nombres',
  titulo: 'Écrire les nombres — et les pièges de 70, 80, 90',
  resumen: 'Por qué 70 es «sesenta-diez», cuándo lleva S «quatre-vingts» y cuándo no, y el guion.',
  intro: 'Los números franceses tienen tres dificultades distintas: decirlos, escribirlos '
       + 'y oírlos. Esta ficha es la segunda; la siguiente es la tercera.',

  secciones: [
    { titulo: 'Lo que ya viste',
      sous: 'Los números hasta 100, con los tres tramos difíciles.',
      rappels: [
        { titulo: 'Por qué 70, 80 y 90 son raros',
          html: `<p>El francés cuenta en veintenas a partir del 70. Es una herencia
          antigua, y hay que aprendérsela, pero tiene lógica:</p>
          <ul>
            <li><b>70 = soixante-dix</b> (60 + 10) · 71 = soixante <b>et</b> onze ·
                72 = soixante-douze … 79 = soixante-dix-neuf</li>
            <li><b>80 = quatre-vingt<b>s</b></b> (4 × 20) · 81 = quatre-vingt-un
                <b>(sin «et»)</b> … 89 = quatre-vingt-neuf</li>
            <li><b>90 = quatre-vingt-dix</b> · 91 = quatre-vingt-onze …
                99 = quatre-vingt-dix-neuf</li>
          </ul>
          <div class="piege"><b>El «et» solo aparece en:</b> 21, 31, 41, 51, 61 y <b>71</b>.
          En 81 y 91 <b>no</b>: quatre-vingt-un, quatre-vingt-onze.</div>
          <div class="ex"><b>Dato curioso:</b> en Bélgica y en Suiza dicen
          <b>septante</b> (70) y <b>nonante</b> (90), y en Suiza también
          <b>huitante</b> (80). Es francés correcto, pero no el de Francia ni el del DELF.</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: 'Un paso más',
      sous: 'Las reglas de ortografía que se preguntan siempre.',
      rappels: [
        { titulo: 'Las cuatro reglas que hay que saber',
          html: `<ul>
            <li><b>VINGT y CENT llevan S</b> cuando están multiplicados <b>y terminan</b>
                el número: <i>quatre-vingt<b>s</b></i>, <i>deux cent<b>s</b></i>.
                Si va algo detrás, pierden la S:
                <i>quatre-vingt-un</i>, <i>deux cent trois</i>.</li>
            <li><b>MILLE no cambia nunca</b>: <i>deux mille</i>, <i>dix mille</i>.</li>
            <li><b>MILLION y MILLIARD son nombres</b>: llevan S y piden <b>de</b>:
                <i>deux million<b>s</b> <b>d’</b>habitants</i>.</li>
            <li><b>El guion</b> va entre las partes del número menores de cien:
                <i>vingt-deux</i>, <i>quatre-vingt-dix-sept</i>. Donde hay «et», no hay guion:
                <i>vingt et un</i>.</li>
          </ul>
          <div class="piege"><b>UN concuerda:</b> <i>vingt et un<b>e</b> filles</i>,
          <i>quatre-vingt-un<b>e</b> pages</i>. Es el único número que cambia de género.</div>` }
      ],
      ejercicios: [2, 3, 4]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'paires', etiqueta:'Leer',
      consigne:'Cada número con su cifra.',
      pairs: [
        ['soixante-dix', '70'],
        ['soixante et onze', '71'],
        ['quatre-vingts', '80'],
        ['quatre-vingt-un', '81'],
        ['quatre-vingt-dix', '90'],
        ['quatre-vingt-onze', '91'],
        ['quatre-vingt-dix-sept', '97'],
        ['soixante-seize', '76'],
        ['cent un', '101'],
        ['deux cents', '200']
      ] },

    /* 1 */ { t:'trous', etiqueta:'Escribir',
      consigne:'Écris le nombre en lettres.',
      sous:'Con guiones donde toca. Se aceptan las dos normas del guion.',
      q: [
        { enonce:'70 → ___', r:['soixante-dix','soixante dix'], taille:22 },
        { enonce:'71 → ___', r:['soixante et onze','soixante-et-onze'], taille:22 },
        { enonce:'80 → ___', r:['quatre-vingts','quatre vingts'], taille:22 },
        { enonce:'81 → ___', r:['quatre-vingt-un','quatre vingt un'], taille:22 },
        { enonce:'91 → ___', r:['quatre-vingt-onze','quatre vingt onze'], taille:22 },
        { enonce:'99 → ___', r:['quatre-vingt-dix-neuf','quatre vingt dix neuf'], taille:26 },
        { enonce:'200 → ___', r:['deux cents','deux-cents'], taille:22 },
        { enonce:'203 → ___', r:['deux cent trois','deux-cent-trois'], taille:22,
          note:'Aquí <b>cent</b> pierde la S porque le sigue «trois».' }
      ] },

    /* 2 */ { t:'tri', etiqueta:'La S',
      consigne:'¿Lleva S o no lleva S?',
      cols: ['Lleva S', 'No lleva S'],
      items: [
        ['quatre-vingt__ (80)', 0],
        ['deux cent__ (200)', 0],
        ['trois cent__ (300)', 0],
        ['quatre-vingt__-deux (82)', 1],
        ['deux cent__ cinquante (250)', 1],
        ['quatre-vingt__-dix (90)', 1],
        ['deux mille__ (2000)', 1],
        ['quatre-vingt__ ans (80 años)', 0]
      ],
      aide:'La regla en una frase: <b>vingt</b> y <b>cent</b> llevan S cuando están '
         + 'multiplicados y nada les sigue. <b>Mille</b> nunca.' },

    /* 3 */ { t:'qcm', etiqueta:'Ortografía',
      consigne:'Elige la forma correcta.',
      q: [
        { enonce:'Il a ___ ans. (80)',
          o:['quatre-vingt', 'quatre-vingts', 'quatre vingt'], r:1,
          note:'Nada le sigue → lleva S.' },
        { enonce:'Le livre a ___ pages. (280)',
          o:['deux cent quatre-vingts', 'deux cents quatre-vingt', 'deux cent quatre-vingt'], r:0,
          note:'<b>cent</b> pierde la S (le sigue algo), <b>vingt</b> la lleva (termina).' },
        { enonce:'La ville a ___ habitants. (2 000 000)',
          o:['deux million habitants', 'deux millions d’habitants', 'deux millions habitants'], r:1,
          note:'<b>Million</b> es un nombre: lleva S y pide <b>de</b>.' },
        { enonce:'Il y a ___ personnes. (21, mujeres)',
          o:['vingt et un personnes', 'vingt et une personnes', 'vingt-et-un personnes'], r:1,
          note:'<i>personne</i> es femenino → <b>une</b>.' },
        { enonce:'Nous sommes en ___. (2026)',
          o:['deux milles vingt-six', 'deux mille vingt-six', 'deux mil vingt-six'], r:1,
          note:'<b>Mille</b> nunca lleva S.' },
        { enonce:'¿Cuál es correcta para 71?',
          o:['soixante-et-onze o soixante et onze', 'soixante-onze', 'septante-un'], r:0,
          note:'«Septante» se dice en Bélgica y Suiza, no en Francia.' }
      ] },

    /* 4 */ { t:'prod', etiqueta:'Escribir', mots:50,
      consigne:'Escribe cinco cifras de tu vida, en letras y en frase completa.',
      sous:'Por ejemplo: tu edad, el año en que naciste, el número de tu casa, cuánto '
         + 'cuesta algo, cuántos habitantes tiene tu ciudad.',
      check: [
        'Las cinco cifras escritas <b>en letras</b>.',
        'Una de ellas entre 70 y 99.',
        'Una de ellas por encima de mil.',
        'Si usas «millions», no olvides el <b>de</b>.'
      ],
      modele:'J’ai dix-sept ans et je suis né en deux mille neuf. J’habite au numéro '
           + 'quatre-vingt-treize de la rue principale. Mon livre de français coûte '
           + 'trois cent cinquante pesos. Ma ville a environ deux cent mille habitants, '
           + 'et le Mexique a plus de cent vingt millions d’habitants.' }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   4 · LES NOMBRES : LES ENTENDRE
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'numeros-oir',
  fecha: 'Fiche 4 · Compréhension orale',
  titulo: 'Entendre les grands nombres',
  resumen: 'Teléfonos, precios, años y las parejas que se confunden: 13/30, 2/12, 60/70.',
  intro: 'Entender un número al vuelo es otra competencia distinta de saber escribirlo. '
       + 'Aquí solo se escucha. Puedes repetir cada audio las veces que quieras.',

  secciones: [
    { titulo: 'Lo que ya viste',
      sous: 'Los números de clase, ahora solo de oído.',
      rappels: [
        { titulo: 'Las parejas que se confunden',
          html: `<ul>
            <li><b>deux</b> /dø/ ≠ <b>douze</b> /duz/ — la boca es distinta.</li>
            <li><b>treize</b> /tʁɛz/ ≠ <b>trente</b> /tʁɑ̃t/ — la segunda es nasal.</li>
            <li><b>quatre</b> ≠ <b>quatorze</b> · <b>six</b> /sis/ ≠ <b>seize</b> /sɛz/.</li>
            <li><b>soixante…</b> puede seguir con <b>-dix</b> (70) o no (60):
                hay que esperar al final.</li>
            <li><b>cent</b> /sɑ̃/ ≠ <b>cinq</b> /sɛ̃k/ ≠ <b>sans</b> /sɑ̃/.</li>
          </ul>
          <div class="piege"><b>Consonante final:</b> <i>six</i> y <i>dix</i> suenan
          /sis/ y /dis/ cuando van solos, pero /si/ y /di/ delante de consonante
          (<i>six personnes</i>) y /siz/, /diz/ delante de vocal (<i>six ans</i>).</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: 'Un paso más',
      sous: 'Teléfonos, precios y años, como en la vida real.',
      rappels: [
        { titulo: 'Un numéro de téléphone à la française',
          html: `<p>En Francia los números se dicen <b>de dos en dos</b>:
          01 45 67 89 10 se lee <i>zéro un, quarante-cinq, soixante-sept,
          quatre-vingt-neuf, dix</i>. Por eso hay que oír números de dos cifras,
          no cifra por cifra.</p>
          <div class="ex">En México se dice de otra forma, y los dos modos son válidos&nbsp;:
          lo que importa es entender el francés cuando te lo dictan.</div>` }
      ],
      ejercicios: [2, 3, 4]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'qcm', etiqueta:'¿Cuál oyes?',
      consigne:'Escucha y elige el número que oyes.',
      q: [
        { enonce:'Número 1', audio:'Il y a treize personnes.', o:['13', '30', '3'], r:0 },
        { enonce:'Número 2', audio:'J’ai douze cahiers.', o:['2', '12', '20'], r:1 },
        { enonce:'Número 3', audio:'Elle a soixante-dix ans.', o:['60', '70', '76'], r:1 },
        { enonce:'Número 4', audio:'Le livre coûte quatre-vingt-quinze pesos.',
          o:['85', '95', '415'], r:1 },
        { enonce:'Número 5', audio:'Il y a cent cinq élèves.', o:['105', '150', '500'], r:0 },
        { enonce:'Número 6', audio:'Nous sommes seize dans la classe.', o:['6', '16', '60'], r:1 }
      ],
      aide:'Si fallas varias, vuelve a escucharlas seguidas: el oído aprende por contraste, '
         + 'no de una en una.' },

    /* 1 */ { t:'trous', etiqueta:'En cifras',
      consigne:'Escucha y escribe el número en cifras.',
      q: [
        { enonce:'___', audio:'soixante-quinze', r:['75'], taille:8 },
        { enonce:'___', audio:'quatre-vingt-trois', r:['83'], taille:8 },
        { enonce:'___', audio:'quatre-vingt-dix-huit', r:['98'], taille:8 },
        { enonce:'___', audio:'cent soixante-douze', r:['172'], taille:8 },
        { enonce:'___', audio:'deux cent quarante', r:['240'], taille:8 },
        { enonce:'___', audio:'mille neuf cent quatre-vingt-dix', r:['1990'], taille:8 },
        { enonce:'___', audio:'trois mille cinq cents', r:['3500'], taille:8 }
      ] },

    /* 2 */ { t:'dictee', etiqueta:'Teléfonos',
      consigne:'Escucha el número de teléfono y escríbelo en letras, tal como lo oyes.',
      sous:'Son números inventados, de ejemplo.',
      q: [
        { texte:'zéro un, quarante-cinq, soixante-sept, quatre-vingt-neuf, dix' },
        { texte:'zéro six, douze, trente-quatre, soixante-seize, quatre-vingt-dix-huit' },
        { texte:'zéro quatre, soixante et onze, vingt-deux, quatre-vingt-trois, cinquante' }
      ],
      aide:'Si lo escribes en cifras te sale: 01 45 67 89 10 · 06 12 34 76 98 · '
         + '04 71 22 83 50. Lo difícil no es el número: es cortarlo en parejas.' },

    /* 3 */ { t:'dictee', etiqueta:'Precios y años',
      consigne:'Écoute et écris la phrase complète.',
      q: [
        { texte:'Ça coûte quatre-vingt-dix-neuf euros.' },
        { texte:'Je suis né en deux mille neuf.' },
        { texte:'Il y a quatre-vingt-quatorze élèves dans l’école.' },
        { texte:'La chambre numéro soixante-dix-huit est libre.' },
        { texte:'Le billet coûte deux cent quarante pesos.' }
      ] },

    /* 4 */ { t:'qcm', etiqueta:'Pronunciación',
      consigne:'Tres reglas que se oyen.',
      q: [
        { enonce:'«six» en «six personnes» se pronuncia…',
          o:['/sis/', '/si/', '/siz/'], r:1,
          note:'Delante de consonante, la consonante final cae.' },
        { enonce:'«six» en «six ans» se pronuncia…',
          o:['/sis/', '/si/', '/siz/'], r:2,
          note:'Delante de vocal hay liaison, y suena /z/.' },
        { enonce:'«vingt» solo (20) se pronuncia…',
          o:['/vɛ̃/', '/vɛ̃t/', '/vɛ̃g/'], r:0,
          note:'Pero en 22-29 sí suena la T: <i>vingt-deux</i> /vɛ̃tdø/.' },
        { enonce:'«neuf ans» se pronuncia…',
          o:['/nœf ɑ̃/', '/nœv ɑ̃/', '/nœ ɑ̃/'], r:1,
          note:'Caso único: <i>neuf</i> suena /v/ delante de <i>ans</i> y de <i>heures</i>.' }
      ] }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   5 · GENRE ET NOMBRE
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'genero-numero',
  fecha: 'Fiche 5 · Grammaire',
  titulo: 'Masculin / féminin, singulier / pluriel',
  resumen: 'Las reglas, y sobre todo las excepciones: -al → -aux, los siete en -ou, los invariables.',
  intro: 'Del pizarrón: Genre — Masculin / Féminin · Nombre — Singulier / Pluriel. '
       + 'Las reglas se aprenden rápido; las excepciones son las que hay que trabajar.',

  secciones: [
    { titulo: 'Lo que ya viste',
      sous: 'El femenino de los adjetivos, con los irregulares que hay que saberse.',
      rappels: [
        { titulo: 'Le féminin des adjectifs',
          html: `<ul>
            <li><b>Regla general:</b> + e — grand → grand<b>e</b>.</li>
            <li>Ya termina en <b>-e</b>: no cambia — rouge, facile, jeune.</li>
            <li><b>-er → -ère</b>: cher → ch<b>ère</b> · dernier → derni<b>ère</b>.</li>
            <li><b>-eux → -euse</b>: heureux → heur<b>euse</b> · sérieux → séri<b>euse</b>.</li>
            <li><b>-f → -ve</b>: sportif → sporti<b>ve</b> · neuf → neu<b>ve</b>.</li>
            <li><b>-en / -on / -el</b> doblan la consonante: italien → italien<b>ne</b> ·
                bon → bon<b>ne</b> · naturel → naturel<b>le</b>.</li>
            <li><b>-teur → -trice</b>: acteur → ac<b>trice</b> ·
                pero travailleur → travaill<b>euse</b>.</li>
          </ul>
          <div class="piege"><b>Los irregulares de memoria:</b> beau → <b>belle</b> ·
          nouveau → <b>nouvelle</b> · vieux → <b>vieille</b> · blanc → <b>blanche</b> ·
          long → <b>longue</b> · doux → <b>douce</b> · faux → <b>fausse</b> ·
          frais → <b>fraîche</b> · gentil → <b>gentille</b> · sec → <b>sèche</b>.</div>` }
      ],
      ejercicios: [0, 1]
    },
    { titulo: 'Un paso más',
      sous: 'El plural y sus excepciones, que es lo que pediste trabajar.',
      rappels: [
        { titulo: 'Le pluriel, et ses exceptions',
          html: `<ul>
            <li><b>Regla general:</b> + s.</li>
            <li>Ya termina en <b>-s, -x, -z</b>: no cambia — un fil<b>s</b> → des fil<b>s</b> ·
                heureu<b>x</b> → heureu<b>x</b> · un ne<b>z</b> → des ne<b>z</b>.</li>
            <li><b>-eau → -eaux</b>: un gâteau → des gâteau<b>x</b> · beau → beau<b>x</b>.</li>
            <li><b>-al → -aux</b>: un journal → des journ<b>aux</b> · un animal → des anim<b>aux</b>.
                <b>Excepciones</b> (+ s): <i>bal, carnaval, festival, chacal, récital, régal</i>
                y los adjetivos <i>final, fatal, natal, naval</i>.</li>
            <li><b>-ou → + s</b>, salvo <b>siete palabras</b> que hacen <b>-oux</b>:
                <i>bijou, caillou, chou, genou, hibou, joujou, pou</i>.</li>
            <li><b>-ail → + s</b>, salvo <i>travail → travaux</i>, <i>vitrail → vitraux</i>,
                <i>corail → coraux</i>, <i>émail → émaux</i>, <i>bail → baux</i>.</li>
          </ul>
          <div class="ex"><b>Truco para los siete en -ou:</b> hay una frase que los junta —
          <i>«Viens, mon chou, sur mes genoux, et jette des cailloux à ce hibou plein de poux
          qui a volé mes bijoux et mes joujoux.»</i></div>
          <div class="piege"><b>Casi nada de esto se oye.</b> <i>un ami</i> y <i>des amis</i>
          se distinguen por el artículo y por la liaison, no por la S. Por eso el plural
          es sobre todo un problema de escritura.</div>` }
      ],
      ejercicios: [2, 3, 4, 5]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'trous', etiqueta:'Femenino',
      consigne:'Mets l’adjectif au féminin.',
      q: [
        { enonce:'Il est grand. → Elle est ___.', r:['grande'], taille:12 },
        { enonce:'Il est sportif. → Elle est ___.', r:['sportive'], taille:12 },
        { enonce:'Il est heureux. → Elle est ___.', r:['heureuse'], taille:12 },
        { enonce:'Il est italien. → Elle est ___.', r:['italienne'], taille:12 },
        { enonce:'Il est beau. → Elle est ___.', r:['belle'], taille:12 },
        { enonce:'Il est vieux. → Elle est ___.', r:['vieille'], taille:12 },
        { enonce:'Il est gentil. → Elle est ___.', r:['gentille'], taille:12 },
        { enonce:'Il est travailleur. → Elle est ___.', r:['travailleuse'], taille:12,
          note:'Cuidado: <i>travailleur</i> hace <b>-euse</b>, no «-trice».' }
      ] },

    /* 1 */ { t:'paires', etiqueta:'Irregulares',
      consigne:'Cada masculino con su femenino. Son los que hay que saberse de memoria.',
      pairs: [
        ['beau', 'belle'], ['nouveau', 'nouvelle'], ['vieux', 'vieille'],
        ['blanc', 'blanche'], ['long', 'longue'], ['doux', 'douce'],
        ['faux', 'fausse'], ['frais', 'fraîche'], ['sec', 'sèche'],
        ['acteur', 'actrice']
      ] },

    /* 2 */ { t:'tri', etiqueta:'Plural',
      consigne:'¿Cómo hace el plural cada palabra?',
      cols: ['+ s', '-aux', '-x', 'No cambia'],
      items: [
        ['un livre', 0], ['une table', 0], ['un festival', 0],
        ['un journal', 1], ['un animal', 1], ['un cheval', 1],
        ['un gâteau', 2], ['un bijou', 2], ['un genou', 2],
        ['un fils', 3], ['heureux', 3], ['un nez', 3]
      ],
      aide:'<b>festival</b> es de las seis excepciones en -al: bal, carnaval, festival, '
         + 'chacal, récital, régal. Todas hacen <b>+ s</b>.' },

    /* 3 */ { t:'qcm', etiqueta:'Excepciones',
      consigne:'Las trampas del plural.',
      q: [
        { enonce:'Le pluriel de «un festival»&nbsp;:',
          o:['des festivaux', 'des festivals', 'des festival'], r:1,
          note:'Excepción: bal, carnaval, <b>festival</b>, chacal, récital, régal.' },
        { enonce:'Le pluriel de «un hibou»&nbsp;:',
          o:['des hibous', 'des hiboux', 'des hibouds'], r:1,
          note:'Uno de los siete: bijou, caillou, chou, genou, <b>hibou</b>, joujou, pou.' },
        { enonce:'Le pluriel de «un trou»&nbsp;:',
          o:['des trous', 'des troux', 'des trou'], r:0,
          note:'<i>Trou</i> no está en la lista de los siete → <b>+ s</b>.' },
        { enonce:'Le pluriel de «le travail»&nbsp;:',
          o:['les travails', 'les travaux', 'les travailles'], r:1 },
        { enonce:'Le pluriel de «un détail»&nbsp;:',
          o:['des détails', 'des détaux', 'des détaux'], r:0,
          note:'Solo travail, vitrail, corail, émail y bail hacen -aux.' },
        { enonce:'Le pluriel de «un fils»&nbsp;:',
          o:['des filss', 'des fils', 'des filses'], r:1,
          note:'Ya termina en -s: no cambia.' }
      ] },

    /* 4 */ { t:'transfo', etiqueta:'Toda la frase',
      consigne:'Mets toute la phrase au féminin pluriel.',
      sous:'Hay que cambiar el sujeto, el artículo, el nombre y los adjetivos.',
      q: [
        { enonce:'Il est un étudiant sérieux et travailleur.',
          modele:'Elles sont des étudiantes sérieuses et travailleuses.' },
        { enonce:'C’est un vieux journal national.',
          modele:'Ce sont de vieilles revues nationales.',
          note:'Si cambias <i>journal</i> por un nombre femenino, el plural es <b>-ales</b>. '
             + 'Y delante de adjetivo, <i>des</i> se vuelve <b>de</b>: <i>de vieilles revues</i>.' },
        { enonce:'Mon ami est beau et gentil.',
          modele:'Mes amies sont belles et gentilles.' },
        { enonce:'Le nouvel élève est italien.',
          modele:'Les nouvelles élèves sont italiennes.' },
        { enonce:'Ce cheval est blanc.',
          modele:'Ces juments sont blanches.',
          note:'En femenino, <i>cheval</i> se vuelve <i>jument</i>. Si prefieres mantener '
             + 'el animal: <i>Ces chevaux sont blancs</i>.' }
      ] },

    /* 5 */ { t:'dictee', etiqueta:'Escuchar',
      consigne:'Singular o plural: la liaison lo dice.',
      sous:'Lo que no se oye en la S, se oye en el artículo y en la liaison.',
      q: [
        { texte:'C’est mon ami.' },
        { texte:'Ce sont mes amis.' },
        { texte:'Elle est heureuse.' },
        { texte:'Elles sont heureuses.' },
        { texte:'Les nouveaux journaux sont sur la table.' }
      ] }
  ]
});

/* ───────────────────────────────────────────────────────────────────────
   6 · RÉVISION
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'repaso',
  tipo: 'eval',
  fecha: 'Fiche 6 · Bilan',
  titulo: 'Tout ensemble — le bilan',
  resumen: 'Un diagnóstico de las cinco fichas, y una producción escrita que las usa todas.',
  intro: 'Si fallas algo aquí, la nota te dice a qué ficha volver. Hazlo sin mirar nada.',

  secciones: [
    { titulo: 'Diagnostic',
      sous: 'Veinte preguntas de todo lo del mes.',
      rappels: [],
      ejercicios: [0, 1, 2]
    },
    { titulo: 'Production',
      sous: 'Todo junto, en un texto tuyo.',
      rappels: [],
      ejercicios: [3]
    }
  ],

  ejercicios: [
    /* 0 */ { t:'qcm', etiqueta:'Diagnóstico',
      consigne:'Diez preguntas. Cada respuesta dice a qué ficha volver.',
      q: [
        { enonce:'C’est ___ amie Claire. <i>(je)</i>',
          o:['ma', 'mon', 'mes'], r:1, note:'→ Ficha 1: vocal detrás, aunque sea femenino.' },
        { enonce:'Les enfants rangent ___ chambres.',
          o:['leur', 'leurs', 'ses'], r:1, note:'→ Ficha 1.' },
        { enonce:'— C’est ta voiture&nbsp;? — Oui, c’est ___.',
          o:['la mienne', 'le mien', 'la mien'], r:0, note:'→ Ficha 2.' },
        { enonce:'___ maison est jolie. <i>(nous)</i>',
          o:['Nôtre', 'Notre', 'Nos'], r:1, note:'→ Ficha 2: sin acento, es adjetivo.' },
        { enonce:'81 s’écrit…',
          o:['quatre-vingt-et-un', 'quatre-vingt-un', 'quatre-vingts-un'], r:1,
          note:'→ Ficha 3: el «et» solo hasta 71.' },
        { enonce:'300 s’écrit…',
          o:['trois cent', 'trois cents', 'trois-cent'], r:1, note:'→ Ficha 3.' },
        { enonce:'2026 s’écrit…',
          o:['deux milles vingt-six', 'deux mille vingt-six', 'deux mil vingt-six'], r:1,
          note:'→ Ficha 3: mille no cambia nunca.' },
        { enonce:'Le pluriel de «un animal»&nbsp;:',
          o:['des animals', 'des animaux', 'des animal'], r:1, note:'→ Ficha 5.' },
        { enonce:'Le pluriel de «un carnaval»&nbsp;:',
          o:['des carnavaux', 'des carnavals', 'des carnaval'], r:1,
          note:'→ Ficha 5: una de las seis excepciones.' },
        { enonce:'Elle est ___. <i>(sportif)</i>',
          o:['sportife', 'sportive', 'sportieuse'], r:1, note:'→ Ficha 5: -f → -ve.' }
      ] },

    /* 1 */ { t:'trous', etiqueta:'Diagnóstico',
      consigne:'Completa. Una palabra por hueco.',
      q: [
        { enonce:'Marie parle avec ___ frère. <i>(elle)</i>', r:['son'], taille:8 },
        { enonce:'Mes clés sont là&nbsp;; où sont ___&nbsp;? <i>(tes clés)</i>',
          r:['les tiennes'], taille:14 },
        { enonce:'70 → ___', r:['soixante-dix','soixante dix'], taille:20 },
        { enonce:'91 → ___', r:['quatre-vingt-onze','quatre vingt onze'], taille:22 },
        { enonce:'Il est vieux. → Elle est ___.', r:['vieille'], taille:12 },
        { enonce:'Un journal → des ___.', r:['journaux'], taille:12 },
        { enonce:'Un bijou → des ___.', r:['bijoux'], taille:12 },
        { enonce:'Il est heureux. → Elles sont ___.', r:['heureuses'], taille:12 }
      ] },

    /* 2 */ { t:'dictee', etiqueta:'Escucha',
      consigne:'Cinco frases con todo lo del mes.',
      q: [
        { texte:'Mon amie a quatre-vingt-trois ans.' },
        { texte:'Ce ne sont pas mes cahiers, ce sont les siens.' },
        { texte:'Les nouveaux journaux coûtent soixante-quinze pesos.' },
        { texte:'Leurs filles sont très gentilles.' },
        { texte:'Notre numéro est le zéro six, quatorze, trente, quatre-vingt-douze, dix-sept.' }
      ] },

    /* 3 */ { t:'prod', etiqueta:'Producción escrita', mots:90,
      consigne:'Escribe una presentación tuya para un correspondiente francés.',
      sous:'90 palabras. Tiene que llevar todo lo del mes.',
      check: [
        'Cuatro posesivos distintos (mon, ma, mes, notre, leur…).',
        'Un pronombre posesivo (le mien, la tienne…).',
        'Tres números en letras, uno de ellos entre 70 y 99.',
        'Tu número de teléfono inventado, en letras.',
        'Dos adjetivos en femenino y dos en plural, bien concordados.',
        'Al final, una pregunta para tu corresponsal.'
      ],
      modele:'Salut&nbsp;! Je m’appelle Diego et j’ai seize ans. J’habite à San Cristóbal '
           + 'avec mes parents et ma sœur. Notre maison est petite mais très jolie&nbsp;; '
           + 'celle de mes grands-parents est plus grande que la nôtre. Ma mère est '
           + 'infirmière et mon père est professeur&nbsp;: ils sont tous les deux très '
           + 'travailleurs. Mes amies Lucía et Ana sont mexicaines aussi, et elles sont '
           + 'très gentilles. Mon numéro, c’est le zéro un, quarante-cinq, soixante-dix-huit, '
           + 'quatre-vingt-treize, vingt. Et toi, tu as des frères et sœurs&nbsp;?' }
  ]
});
