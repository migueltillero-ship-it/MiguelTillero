/* ═══════════════════════════════════════════════════════════════════════
   EJERCICIOS COMPLEMENTARIOS · A1.4 HÍBRIDO — OCTUBRE 2026
   ═══════════════════════════════════════════════════════════════════════
   Lo trabajado en clase: los adjetivos posesivos, los pronombres posesivos,
   los números —con las reglas de ortografía y los difíciles, 70, 80, 90—,
   la concordancia de género y número con sus excepciones, y el passé
   composé, que empezó el 27 de octubre.

   Las seis primeras fichas tienen dos partes: «Lo que ya viste», para volver
   sobre lo de clase por otro camino, y «Un paso más», con lo que no dio
   tiempo a ver. La séptima funciona de otra manera: siete etapas cerradas
   con llave, cada una abierta solo cuando la anterior está entera y al 80 %.

   No hay nombres ni datos de estudiantes en este archivo: se publica con el
   sitio. Los números de teléfono de los ejercicios están inventados.

   Tipos de ejercicio (motor en assets/js/fichas-ejercicios.js):
     qcm · trous · tri · paires · transfo · dictee · prod · ordre
   ═══════════════════════════════════════════════════════════════════════ */

const FICHAS = [];

/* ───────────────────────────────────────────────────────────────────────
   1 · LES ADJECTIFS POSSESSIFS
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'posesivos',
  tipo: 'revision',
  ciclo: 'Oct. 2026 · A1.4',
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
    /* 0 */ { t:'tri', etiqueta:'Classe',
      consigne:'Mon, ma ou mes ? Classe chaque mot.',
      sous:'Clasifica cada palabra en su columna.',
      cols: ['mon', 'ma', 'mes'],
      items: [
        ['frère', 0], ['livre', 0], ['père', 0],
        ['sœur', 1], ['maison', 1], ['voiture', 1],
        ['parents', 2], ['cahiers', 2], ['amies', 2],
        ['amie', 0], ['école', 0]
      ],
      aide:'<b>amie</b> y <b>école</b> son femeninas, pero empiezan por vocal: por eso '
         + '«mon amie», «mon école». Es la trampa clásica del nivel.' },

    /* 1 */ { t:'trous', etiqueta:'Complète',
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

    /* 2 */ { t:'transfo', etiqueta:'Transformer',
      consigne:'Dis-le autrement, avec un possessif.',
      sous:'Dilo de otra forma, con un posesivo.',
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

    /* 4 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Écoute et écris. Attention ! On entend la liaison.',
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
  ciclo: 'Oct. 2026 · A1.4',
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
    /* 0 */ { t:'paires', etiqueta:'Associe',
      consigne:'De l’adjectif au pronom.',
      sous:'Del adjetivo posesivo al pronombre: «mon livre» → «le mien».',
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

    /* 1 */ { t:'trous', etiqueta:'Complète',
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

    /* 2 */ { t:'qcm', etiqueta:'L’accent',
      consigne:'Avec ou sans accent circonflexe ? Choisis.',
      sous:'Notre y votre, sin acento; le nôtre y le vôtre, con acento.',
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

    /* 3 */ { t:'transfo', etiqueta:'Transformer',
      consigne:'Évite la répétition : remplace par un pronom possessif.',
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

    /* 4 */ { t:'dictee', etiqueta:'Écoute',
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
  ciclo: 'Oct. 2026 · A1.4',
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
    /* 0 */ { t:'paires', etiqueta:'Lire',
      consigne:'Associe chaque nombre à son chiffre.',
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

    /* 1 */ { t:'trous', etiqueta:'Écrire',
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

    /* 2 */ { t:'tri', etiqueta:'Le S',
      consigne:'Avec un S, ou sans S ?',
      sous:'Vingt y cent llevan S cuando están multiplicados y terminan el número.',
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

    /* 3 */ { t:'qcm', etiqueta:'Orthographe',
      consigne:'Choisis la forme correcte.',
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

    /* 4 */ { t:'prod', etiqueta:'Écrire', mots:50,
      consigne:'Écris cinq chiffres de ta vie, en lettres et en phrases complètes.',
      sous:'Cinco cifras tuyas, escritas con letras y dentro de una frase.',
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
  ciclo: 'Oct. 2026 · A1.4',
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
    /* 0 */ { t:'qcm', etiqueta:'Quel nombre ?',
      consigne:'Écoute et choisis le nombre que tu entends.',
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

    /* 1 */ { t:'trous', etiqueta:'En chiffres',
      consigne:'Écoute et écris le nombre en chiffres.',
      q: [
        { enonce:'___', audio:'soixante-quinze', r:['75'], taille:8 },
        { enonce:'___', audio:'quatre-vingt-trois', r:['83'], taille:8 },
        { enonce:'___', audio:'quatre-vingt-dix-huit', r:['98'], taille:8 },
        { enonce:'___', audio:'cent soixante-douze', r:['172'], taille:8 },
        { enonce:'___', audio:'deux cent quarante', r:['240'], taille:8 },
        { enonce:'___', audio:'mille neuf cent quatre-vingt-dix', r:['1990'], taille:8 },
        { enonce:'___', audio:'trois mille cinq cents', r:['3500'], taille:8 }
      ] },

    /* 2 */ { t:'dictee', etiqueta:'Numéros de téléphone',
      consigne:'Écoute le numéro de téléphone et écris-le en lettres, tel que tu l’entends.',
      sous:'Son números inventados, de ejemplo.',
      q: [
        { texte:'zéro un, quarante-cinq, soixante-sept, quatre-vingt-neuf, dix' },
        { texte:'zéro six, douze, trente-quatre, soixante-seize, quatre-vingt-dix-huit' },
        { texte:'zéro quatre, soixante et onze, vingt-deux, quatre-vingt-trois, cinquante' }
      ],
      aide:'Si lo escribes en cifras te sale: 01 45 67 89 10 · 06 12 34 76 98 · '
         + '04 71 22 83 50. Lo difícil no es el número: es cortarlo en parejas.' },

    /* 3 */ { t:'dictee', etiqueta:'Prix et années',
      consigne:'Écoute et écris la phrase complète.',
      q: [
        { texte:'Ça coûte quatre-vingt-dix-neuf euros.' },
        { texte:'Je suis né en deux mille neuf.' },
        { texte:'Il y a quatre-vingt-quatorze élèves dans l’école.' },
        { texte:'La chambre numéro soixante-dix-huit est libre.' },
        { texte:'Le billet coûte deux cent quarante pesos.' }
      ] },

    /* 4 */ { t:'qcm', etiqueta:'Prononciation',
      consigne:'Trois règles qui s’entendent.',
      sous:'La consonante final de six, dix, vingt y neuf cambia según lo que sigue.',
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
  ciclo: 'Oct. 2026 · A1.4',
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
    /* 0 */ { t:'trous', etiqueta:'Le féminin',
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

    /* 1 */ { t:'paires', etiqueta:'Les irréguliers',
      consigne:'Associe chaque masculin à son féminin.',
      sous:'Son los irregulares: hay que sabérselos de memoria.',
      pairs: [
        ['beau', 'belle'], ['nouveau', 'nouvelle'], ['vieux', 'vieille'],
        ['blanc', 'blanche'], ['long', 'longue'], ['doux', 'douce'],
        ['faux', 'fausse'], ['frais', 'fraîche'], ['sec', 'sèche'],
        ['acteur', 'actrice']
      ] },

    /* 2 */ { t:'tri', etiqueta:'Le pluriel',
      consigne:'Comment chaque mot fait-il son pluriel ?',
      cols: ['+ s', '-aux', '-x', 'No cambia'],
      items: [
        ['un livre', 0], ['une table', 0], ['un festival', 0],
        ['un journal', 1], ['un animal', 1], ['un cheval', 1],
        ['un gâteau', 2], ['un bijou', 2], ['un genou', 2],
        ['un fils', 3], ['heureux', 3], ['un nez', 3]
      ],
      aide:'<b>festival</b> es de las seis excepciones en -al: bal, carnaval, festival, '
         + 'chacal, récital, régal. Todas hacen <b>+ s</b>.' },

    /* 3 */ { t:'qcm', etiqueta:'Les exceptions',
      consigne:'Les pièges du pluriel.',
      sous:'Las excepciones: -al, los siete en -ou, los invariables.',
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

    /* 4 */ { t:'transfo', etiqueta:'Toute la phrase',
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

    /* 5 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Singulier ou pluriel ? La liaison te le dit.',
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
  ciclo: 'Oct. 2026 · A1.4',
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
    /* 0 */ { t:'qcm', etiqueta:'Diagnostic',
      consigne:'Dix questions. Chaque réponse dit à quelle fiche revenir.',
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

    /* 1 */ { t:'trous', etiqueta:'Diagnostic',
      consigne:'Complète. Un mot par trou.',
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

    /* 2 */ { t:'dictee', etiqueta:'Écoute',
      consigne:'Cinq phrases avec tout ce qu’on a vu ce mois-ci.',
      q: [
        { texte:'Mon amie a quatre-vingt-trois ans.' },
        { texte:'Ce ne sont pas mes cahiers, ce sont les siens.' },
        { texte:'Les nouveaux journaux coûtent soixante-quinze pesos.' },
        { texte:'Leurs filles sont très gentilles.' },
        { texte:'Notre numéro est le zéro six, quatorze, trente, quatre-vingt-douze, dix-sept.' }
      ] },

    /* 3 */ { t:'prod', etiqueta:'Production écrite', mots:90,
      consigne:'Écris ta présentation pour un correspondant français.',
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


/* ───────────────────────────────────────────────────────────────────────
   7 · LE PASSÉ COMPOSÉ — clase del 27 de octubre
   ---------------------------------------------------------------------
   Siete etapas cerradas con llave. No se abre la siguiente hasta tener
   la anterior entera y al 80 %: es lo que impide «pasar» una gramática
   clicando hasta acertar.

   El orden no es decorativo, es el de la adquisición:
     reconocer → elegir el auxiliar → formar el participio → acordar →
     negar → contar → salir de la plataforma (TV5MONDE).
   La producción llega al final, cuando las piezas están.
   ─────────────────────────────────────────────────────────────────────── */
FICHAS.push({
  id: 'passe-compose',
  tipo: 'outil',
  ciclo: 'Oct. 2026 · A1.4',
  fecha: 'Fiche 7 · Séance du 27 octobre',
  titulo: 'Le passé composé, étape par étape',
  resumen: 'Siete etapas que se abren una a una: reconocerlo, elegir el auxiliar, formar el '
         + 'participio, acordar, negar y contar. No se avanza sin superar la anterior.',
  intro: 'Lo de la clase del 27, para asentarlo solo. Cada etapa se abre cuando la anterior '
       + 'está completa y con un 80 % — y no por capricho: si la base no está, lo que sigue '
       + 'no sirve de nada. Al final hay dos actividades de TV5MONDE que también hay que hacer.',

  secciones: [
    /* 0 ─ IDENTIFICACIÓN ─────────────────────────────────────────────── */
    { titulo: 'Étape 1 · Le reconnaître',
      sous: 'Antes de formarlo hay que verlo. Un passé composé tiene siempre dos partes.',
      rappels: [
        { titulo: 'Deux parties, toujours',
          html: `<p>El <b>passé composé</b> es un tiempo <b>compuesto</b>: nunca es una sola
          palabra.</p>
          <div class="ex"><b>auxiliaire</b> (être o avoir, <u>en présent</u>)
          + <b>participe passé</b><br>
          il <b>a</b> appelé &nbsp;·&nbsp; il <b>est</b> allé &nbsp;·&nbsp;
          nous <b>avons</b> mangé &nbsp;·&nbsp; elle <b>est</b> partie</div>
          <p>Sirve para contar un acontecimiento <b>pasado, terminado y limitado en el
          tiempo</b>: lo que hiciste ayer, lo que pasó el sábado.</p>
          <div class="piege">Cuidado con el <b>futur proche</b>, que también tiene dos partes:
          <i>il <b>va</b> aller</i> (mañana) ≠ <i>il <b>est</b> allé</i> (ayer). Lo que cambia
          es el auxiliar, no el resto.</div>` }
      ],
      ejercicios: [0, 1, 2]
    },

    /* 1 ─ EL AUXILIAR ────────────────────────────────────────────────── */
    { titulo: 'Étape 2 · Être ou avoir ?',
      sous: 'La pregunta que decide todo. Hay una lista corta que hay que saberse.',
      requiere: { de: 0, pct: 80 },
      rappels: [
        { titulo: 'La maison d’être',
          html: `<p>Con la <b>mayoría</b> de los verbos el auxiliar es <b>avoir</b>.
          Pero hay un grupo que va con <b>être</b>, y son los diez de la casa:</p>
          <div class="ex"><b>aller · venir · arriver · partir · entrer · sortir ·
          monter · descendre · rester · tomber</b></div>
          <p>Y además: <b>naître, mourir, devenir, retourner, passer</b> — y
          <b>todos los verbos pronominales</b> (se lever, se promener, se coucher).</p>
          <div class="piege">Casi todos son verbos de <b>movimiento</b> o de <b>cambio de
          estado</b>. No es una regla perfecta, pero ayuda: <i>manger</i> no te mueve de
          sitio; <i>partir</i>, sí.</div>` }
      ],
      ejercicios: [3, 4, 5]
    },

    /* 2 ─ EL PARTICIPIO ──────────────────────────────────────────────── */
    { titulo: 'Étape 3 · Former le participe passé',
      sous: 'Tres familias: las dos regulares, y la que hay que aprender de memoria.',
      requiere: { de: 1, pct: 80 },
      rappels: [
        { titulo: 'Les trois familles',
          html: `<ul>
            <li>Verbos en <b>-er</b> → <b>-é</b>: parler → parl<b>é</b>,
                manger → mang<b>é</b>, aller → all<b>é</b>.</li>
            <li>Verbos en <b>-ir</b> → <b>-i</b>: finir → fin<b>i</b>,
                partir → part<b>i</b>, dormir → dorm<b>i</b>.</li>
            <li>Los demás (<b>-re</b>, <b>-oir</b>) no tienen regla: voir → <b>vu</b>,
                pouvoir → <b>pu</b>, connaître → <b>connu</b>, apprendre → <b>appris</b>,
                faire → <b>fait</b>, prendre → <b>pris</b>.</li>
          </ul>
          <div class="ex">Los dos más útiles de todos: <b>être → été</b> y
          <b>avoir → eu</b> (que se pronuncia como la <i>u</i> de <i>tu</i>).</div>
          <div class="piege"><b>Aller</b> engaña: lleva <i>être</i> como auxiliar, pero su
          participio es regular, <b>allé</b>. Elegir el auxiliar y formar el participio son
          dos decisiones distintas.</div>` }
      ],
      ejercicios: [6, 7, 8]
    },

    /* 3 ─ EL ACUERDO ─────────────────────────────────────────────────── */
    { titulo: 'Étape 4 · L’accord avec être',
      sous: 'Con être, el participio concuerda con el sujeto. Con avoir, no.',
      requiere: { de: 2, pct: 80 },
      rappels: [
        { titulo: 'La règle, en une ligne',
          html: `<p>Con <b>être</b>, el participio se porta como un adjetivo: concuerda con
          el <b>sujeto</b>.</p>
          <div class="ex">Il est all<b>é</b> &nbsp;·&nbsp; Elle est all<b>ée</b> &nbsp;·&nbsp;
          Ils sont all<b>és</b> &nbsp;·&nbsp; Elles sont all<b>ées</b></div>
          <p>Con <b>avoir</b>, <b>no</b> hay acuerdo con el sujeto:</p>
          <div class="ex">Elle a mang<b>é</b> &nbsp;·&nbsp; Elles ont mang<b>é</b>
          &nbsp; <i>(nunca «&nbsp;mangées&nbsp;» aquí)</i></div>
          <div class="piege">En el oral casi no se oye —<i>allé</i> y <i>allée</i> suenan
          igual—, pero en el escrito <b>cuenta</b>. Es de las cosas que más se corrigen en
          un examen.</div>` }
      ],
      ejercicios: [9, 10, 11]
    },

    /* 4 ─ LA NEGACIÓN ────────────────────────────────────────────────── */
    { titulo: 'Étape 5 · La négation',
      sous: 'El ne y el pas abrazan al auxiliar. Al auxiliar, no al participio.',
      requiere: { de: 3, pct: 80 },
      rappels: [
        { titulo: 'Où mettre ne… pas',
          html: `<div class="ex">Je <b>ne</b> suis <b>pas</b> allé à l’université.<br>
          Tu <b>n’</b>as <b>pas</b> travaillé.<br>
          Nous <b>n’</b>avons <b>pas</b> mangé.</div>
          <p>Con los <b>pronominales</b>, el <i>ne</i> va <b>antes del pronombre</b>:</p>
          <div class="ex">Je <b>ne</b> me suis <b>pas</b> promené.<br>
          Elle <b>ne</b> s’est <b>pas</b> levée tôt.</div>
          <div class="piege">El error más común del nivel: «&nbsp;<s>j’ai mangé pas</s>&nbsp;».
          El <b>pas</b> va <b>antes</b> del participio, siempre. Orden fijo:
          <b>ne + (pronombre) + auxiliaire + pas + participe</b>.</div>` }
      ],
      ejercicios: [12, 13]
    },

    /* 5 ─ ASIMILACIÓN ────────────────────────────────────────────────── */
    { titulo: 'Étape 6 · Raconter',
      sous: 'Todas las piezas juntas, que es para lo que servían.',
      requiere: { de: 4, pct: 80 },
      rappels: [
        { titulo: 'Le voyage d’Ousmane',
          html: `<p>La historia del vídeo de clase: <i>il a appelé un taxi, il est allé à
          l’aéroport, il a lu un livre, il a dormi dans l’avion, il est sorti de l’avion,
          il est arrivé chez sa sœur Mani.</i></p>
          <p>Fíjate en que no hay ni un adorno: una acción detrás de otra, en orden. Eso es
          exactamente lo que sirve el passé composé — y por eso un relato en passé composé
          avanza tan rápido.</p>` }
      ],
      ejercicios: [14, 15, 16]
    },

    /* 6 ─ FUERA DE LA PLATAFORMA ─────────────────────────────────────── */
    { titulo: 'Étape 7 · Pour aller plus loin',
      sous: 'Dos actividades de TV5MONDE, fuera de la plataforma. Hazlas y vuelve aquí.',
      requiere: { de: 5, pct: 80 },
      rappels: [
        { titulo: 'Deux exercices de TV5MONDE',
          html: `<p>Se abren en otra pestaña, se corrigen allí mismo y están hechos por
          profesores de francés como lengua extranjera. Valen la pena.</p>
          <ul>
            <li><a href="https://apprendre.tv5monde.com/fr/exercices/a1-debutant/le-lycee-cest-fini"
                   target="_blank" rel="noopener"><b>Le lycée, c’est fini</b></a>
                — nivel A1. El más cercano a lo de hoy: empieza por aquí.</li>
            <li><a href="https://apprendre.tv5monde.com/fr/exercices/a2-elementaire/reconnaitre-la-forme-du-passe-compose"
                   target="_blank" rel="noopener"><b>Reconnaître la forme du passé
                   composé</b></a> — nivel A2. Un paso por encima del tuyo: hazlo después,
                   y sin agobiarte si fallas.</li>
          </ul>
          <div class="piege">Si en el A2 sacas menos de la mitad, no es mala señal: es un
          nivel por encima. Lo que me interesa es que me digas <b>qué</b> falló.</div>` }
      ],
      ejercicios: [17]
    }
  ],

  ejercicios: [
    /* ══ Étape 1 ══════════════════════════════════════════════════════ */
    /* 0 */ { t:'tri', etiqueta:'Reconnaître',
      consigne:'Présent, passé composé ou futur proche ? Classe les neuf phrases.',
      sous:'Fíjate solo en la forma del verbo, no en el sentido de la frase.',
      cols: ['Présent', 'Passé composé', 'Futur proche'],
      items: [
        ['Il mange une pomme.', 0],
        ['Nous habitons à Paris.', 0],
        ['Elle part demain.', 0],
        ['Il a mangé une pomme.', 1],
        ['Nous sommes allés à Paris.', 1],
        ['Elle est partie hier.', 1],
        ['Il va manger une pomme.', 2],
        ['Nous allons habiter à Paris.', 2],
        ['Elle va partir demain.', 2]
      ],
      aide:'La trampa está entre <b>elle est partie</b> (pasado) y <b>elle va partir</b> '
         + '(futuro): las dos tienen dos partes. Y entre <b>elle part demain</b>, que es un '
         + 'presente con valor de futuro, y las otras dos.' },

    /* 1 */ { t:'qcm', etiqueta:'Comprendre la règle',
      consigne:'Cuatro preguntas para comprobar que la regla está clara.',
      sous:'No es de memoria: piensa antes de responder.',
      q: [
        { enonce:'Un verbe au passé composé est formé de…',
          o:['une seule partie',
             'deux parties : un auxiliaire et un participe passé',
             'trois parties'], r:1 },
        { enonce:'Dans «&nbsp;il est allé&nbsp;», l’auxiliaire est…',
          o:['allé', 'est', 'il'], r:1,
          note:'<b>est</b> es el verbo <i>être</i> en presente; <b>allé</b> es el participio '
             + 'pasado de <i>aller</i>.' },
        { enonce:'L’auxiliaire se met toujours…',
          o:['au présent', 'au passé', 'à l’infinitif'], r:0,
          note:'Por eso se llama <b>composé</b>: un presente + un participio dan un pasado. '
             + 'Si pones el auxiliar en pasado, ya es otro tiempo.' },
        { enonce:'On utilise le passé composé pour…',
          o:['décrire un paysage ou une habitude',
             'raconter un événement passé et terminé',
             'parler de demain'], r:1,
          note:'Describir o hablar de costumbres en el pasado es trabajo del <i>imparfait</i>, '
             + 'que veremos más adelante.' }
      ] },

    /* 2 */ { t:'trous', etiqueta:'Repérer',
      consigne:'Écris l’auxiliaire de chaque phrase, et rien d’autre.',
      sous:'Solo el auxiliar: una palabra.',
      q: [
        { enonce:'Il a appelé un taxi. → ___', r:['a'], taille:8 },
        { enonce:'Elle est arrivée à midi. → ___', r:['est'], taille:8 },
        { enonce:'Nous avons mangé ensemble. → ___', r:['avons'], taille:8 },
        { enonce:'Ils sont partis très tôt. → ___', r:['sont'], taille:8 },
        { enonce:'Tu as dormi dans l’avion. → ___', r:['as'], taille:8 },
        { enonce:'Je me suis levée à six heures. → ___', r:['suis'], taille:8,
          note:'El pronombre <b>me</b> no es el auxiliar: se cuela entre el sujeto y el '
             + 'auxiliar, pero el auxiliar es <b>suis</b>.' }
      ] },

    /* ══ Étape 2 ══════════════════════════════════════════════════════ */
    /* 3 */ { t:'tri', etiqueta:'La maison d’être',
      consigne:'Ce verbe se conjugue avec être ou avec avoir ?',
      sous:'Catorce verbos. Diez de la casa no están todos aquí: busca el criterio.',
      cols: ['Avec être', 'Avec avoir'],
      items: [
        ['aller', 0], ['venir', 0], ['partir', 0], ['arriver', 0],
        ['monter', 0], ['tomber', 0], ['se lever', 0],
        ['manger', 1], ['faire', 1], ['lire', 1], ['dormir', 1],
        ['appeler', 1], ['voir', 1], ['travailler', 1]
      ],
      aide:'<b>Se lever</b> es pronominal, y <u>todos</u> los pronominales van con être: si el '
         + 'verbo lleva <i>se</i> delante, no hay que pensarlo. Y ojo con <b>dormir</b>: es '
         + 'de los que acaban en -ir pero no es de la casa — va con <b>avoir</b>.' },

    /* 4 */ { t:'trous', etiqueta:'Choisir',
      consigne:'Complète avec l’auxiliaire au présent.',
      q: [
        { enonce:'Il ___ allé à l’aéroport.', r:['est'], taille:8 },
        { enonce:'Tu ___ passé un examen.', r:['as'], taille:8 },
        { enonce:'Nous ___ mangé ensemble.', r:['avons'], taille:8 },
        { enonce:'Elles ___ parties à huit heures.', r:['sont'], taille:8 },
        { enonce:'J’___ lu un livre dans l’avion.', r:['ai'], taille:8 },
        { enonce:'Vous ___ restés à la maison.', r:['êtes'], taille:8 },
        { enonce:'Je me ___ promené dans le parc.', r:['suis'], taille:8,
          note:'Pronominal → <b>être</b>. Y fíjate en el orden: <i>je <b>me suis</b> '
             + 'promené</i>, no «&nbsp;<s>je suis me promené</s>&nbsp;».' },
        { enonce:'Elle ___ eu un petit garçon.', r:['a'], taille:8,
          note:'<i>Avoir</i> se conjuga con <b>avoir</b>: <i>elle a eu</i>.' }
      ] },

    /* 5 */ { t:'qcm', etiqueta:'Pourquoi ?',
      consigne:'Explique le choix de l’auxiliaire. C’est ça qui compte, pas la réponse.',
      sous:'Aquí no se adivina: hay que saber por qué. Es la pregunta que te vas a hacer tú '
         + 'sola o solo cada vez que escribas una frase.',
      q: [
        { enonce:'«&nbsp;Elle est partie&nbsp;» → pourquoi <i>être</i> ?',
          o:['parce que le sujet est une femme',
             'parce que partir est un verbe de la maison d’être',
             'parce que le participe est au féminin'], r:1,
          note:'El sujeto no decide nunca el auxiliar. <b>El verbo</b>, sí. El sujeto decide '
             + 'otra cosa: el acuerdo — etapa 4.' },
        { enonce:'«&nbsp;Ils ont mangé&nbsp;» → pourquoi <i>avoir</i> ?',
          o:['parce qu’ils sont plusieurs',
             'parce que manger n’est pas dans la liste d’être',
             'parce que c’est masculin'], r:1 },
        { enonce:'«&nbsp;Je me suis levé&nbsp;» → pourquoi <i>être</i> ?',
          o:['parce que le verbe est pronominal',
             'parce que c’est le matin',
             'parce que je parle de moi'], r:0 },
        { enonce:'«&nbsp;Nous avons fait un gâteau&nbsp;» → et si «&nbsp;nous&nbsp;» '
               + 'était deux femmes ?',
          o:['l’auxiliaire changerait',
             'rien ne changerait',
             'il faudrait écrire «&nbsp;faites&nbsp;»'], r:1,
          note:'Con <b>avoir</b> no cambia nada por el sujeto: ni el auxiliar ni el '
             + 'participio. Con <b>être</b> sí cambiaría — lo verás en la etapa 4.' },
        { enonce:'Tu veux dire «&nbsp;he dormido&nbsp;». Tu hésites entre <i>j’ai dormi</i> '
               + 'et <i>je suis dormi</i>. Comment tranches-tu ?',
          o:['je choisis être, parce que dormir finit en -ir',
             'je vérifie si dormir est dans la liste d’être : il n’y est pas, donc avoir',
             'je choisis au hasard, les deux existent'], r:1,
          note:'La terminación del infinitivo no dice nada sobre el auxiliar. Lo único que '
             + 'decide es la lista.' }
      ] },

    /* ══ Étape 3 ══════════════════════════════════════════════════════ */
    /* 6 */ { t:'tri', etiqueta:'Trois familles',
      consigne:'Quel participe passé ? Classe chaque infinitif dans sa famille.',
      cols: ['en -é', 'en -i', 'irrégulier'],
      items: [
        ['parler', 0], ['manger', 0], ['aller', 0], ['travailler', 0],
        ['finir', 1], ['partir', 1], ['dormir', 1], ['sortir', 1],
        ['voir', 2], ['faire', 2], ['prendre', 2], ['être', 2]
      ],
      aide:'<b>Aller</b> está en la primera columna: su participio es regular (<i>allé</i>), '
         + 'aunque su auxiliar sea <i>être</i>. Son dos cosas independientes, y confundirlas '
         + 'es el error más frecuente.' },

    /* 7 */ { t:'trous', etiqueta:'Former',
      consigne:'Écris le participe passé de l’infinitif entre parenthèses.',
      q: [
        { enonce:'<i>(manger)</i> → ___', r:['mangé'], taille:12 },
        { enonce:'<i>(finir)</i> → ___', r:['fini'], taille:12 },
        { enonce:'<i>(aller)</i> → ___', r:['allé'], taille:12 },
        { enonce:'<i>(dormir)</i> → ___', r:['dormi'], taille:12 },
        { enonce:'<i>(voir)</i> → ___', r:['vu'], taille:12 },
        { enonce:'<i>(faire)</i> → ___', r:['fait'], taille:12 },
        { enonce:'<i>(être)</i> → ___', r:['été'], taille:12 },
        { enonce:'<i>(avoir)</i> → ___', r:['eu'], taille:12,
          note:'Se escribe <b>eu</b> y se pronuncia como la <i>u</i> de <i>tu</i>. '
             + 'Dos letras, un solo sonido.' },
        { enonce:'<i>(prendre)</i> → ___', r:['pris'], taille:12 },
        { enonce:'<i>(apprendre)</i> → ___', r:['appris'], taille:12,
          note:'Los compuestos siguen al simple: <i>prendre → pris</i>, '
             + 'luego <i>apprendre → appris</i>, <i>comprendre → compris</i>.' }
      ] },

    /* 8 */ { t:'paires', etiqueta:'Les irréguliers',
      consigne:'Associe chaque infinitif à son participe passé.',
      sous:'Estos no tienen regla: se aprenden. Son los diez más frecuentes.',
      pairs: [
        ['voir', 'vu'], ['pouvoir', 'pu'], ['connaître', 'connu'],
        ['apprendre', 'appris'], ['faire', 'fait'], ['prendre', 'pris'],
        ['lire', 'lu'], ['boire', 'bu'], ['être', 'été'], ['avoir', 'eu']
      ],
      aide:'Hay un atajo: <b>vu, pu, connu, lu, bu, eu</b> acaban todos en <b>-u</b>. '
         + 'Si dudas con un verbo en -oir o -re corto, prueba con -u.' },

    /* ══ Étape 4 ══════════════════════════════════════════════════════ */
    /* 9 */ { t:'trous', etiqueta:'Accorder',
      consigne:'Complète la fin du participe passé. Attention à l’accord.',
      sous:'Solo hay acuerdo con être. Escribe solo la terminación.',
      q: [
        { enonce:'Elle est all___ à l’université.', r:['ée'], taille:8 },
        { enonce:'Ils sont arriv___ en retard.', r:['és'], taille:8 },
        { enonce:'Elles sont parti___ ensemble.', r:['es'], taille:8 },
        { enonce:'Il est mont___ dans l’avion.', r:['é'], taille:8 },
        { enonce:'Elle a mang___ une pomme.', r:['é'], taille:8,
          note:'Auxiliar <b>avoir</b> → sin acuerdo con el sujeto: <i>mangé</i>, '
             + 'aunque el sujeto sea «&nbsp;elle&nbsp;».' },
        { enonce:'Nous sommes all___ à Paris. <i>(nous = deux femmes)</i>',
          r:['ées'], taille:8,
          note:'Femenino plural: <b>-ées</b>. Es el ejemplo de la ficha de clase.' },
        { enonce:'Elles ont travaill___ toute la journée.', r:['é'], taille:8,
          note:'Otra vez <b>avoir</b>: femenino plural, pero el participio no se mueve.' }
      ] },

    /* 10 */ { t:'transfo', etiqueta:'Changer de sujet',
      consigne:'Réécris la phrase avec le sujet entre parenthèses.',
      sous:'Escribe tu frase y compárala después con el modelo. Lo que importa es el acuerdo.',
      q: [
        { enonce:'Il est allé au cinéma. <i>(elle)</i>',
          modele:'Elle est allée au cinéma.' },
        { enonce:'Il est parti à huit heures. <i>(elles)</i>',
          modele:'Elles sont parties à huit heures.' },
        { enonce:'Elle est restée à la maison. <i>(ils)</i>',
          modele:'Ils sont restés à la maison.' },
        { enonce:'Il a travaillé toute la journée. <i>(elle)</i>',
          modele:'Elle a travaillé toute la journée.',
          note:'Con <b>avoir</b> no cambia nada más que el pronombre.' },
        { enonce:'Je me suis levé tôt. <i>(ma sœur)</i>',
          modele:'Ma sœur s’est levée tôt.',
          note:'Cambian tres cosas: el pronombre (<i>me</i> → <i>se</i>), el auxiliar '
             + '(<i>suis</i> → <i>est</i>) y el acuerdo (<i>levé</i> → <i>levée</i>).' }
      ] },

    /* 11 */ { t:'dictee', etiqueta:'Écoute et écris',
      consigne:'Écoute et écris la phrase complète.',
      sous:'El acuerdo casi no se oye: hay que deducirlo del sujeto que escuchas.',
      q: [
        { texte:'Elle est allée à l’université.' },
        { texte:'Ils sont arrivés à midi.' },
        { texte:'Nous avons mangé ensemble.' },
        { texte:'Elles sont parties très tôt.' },
        { texte:'Je ne me suis pas levé à six heures.' }
      ],
      aide:'En las cuatro primeras, lo que te dice la terminación es el <b>sujeto</b>: '
         + '«&nbsp;elles sont parties&nbsp;» suena igual que «&nbsp;elle est partie&nbsp;» '
         + 'salvo por el auxiliar. Escucha el auxiliar.' },

    /* ══ Étape 5 ══════════════════════════════════════════════════════ */
    /* 12 */ { t:'transfo', etiqueta:'Nier',
      consigne:'Mets la phrase à la forme négative.',
      q: [
        { enonce:'Il est allé à l’université.',
          modele:'Il n’est pas allé à l’université.' },
        { enonce:'Tu as travaillé hier.',
          modele:'Tu n’as pas travaillé hier.' },
        { enonce:'Nous avons mangé au restaurant.',
          modele:'Nous n’avons pas mangé au restaurant.' },
        { enonce:'Je me suis promené dans le parc.',
          modele:'Je ne me suis pas promené dans le parc.',
          note:'Pronominal: el <b>ne</b> va antes del <i>me</i>, no antes del auxiliar.' },
        { enonce:'Elles sont sorties samedi.',
          modele:'Elles ne sont pas sorties samedi.' }
      ] },

    /* 13 */ { t:'qcm', etiqueta:'Où va le pas ?',
      consigne:'Choisis la seule phrase correcte.',
      q: [
        { enonce:'Hier soir, je n’ai rien mangé.',
          o:['Je n’ai mangé pas.', 'Je n’ai pas mangé.', 'Je ne mangé pas ai.'], r:1 },
        { enonce:'Elle n’était pas là.',
          o:['Elle n’est pas venue.', 'Elle n’est venue pas.',
             'Elle ne venue pas est.'], r:0 },
        { enonce:'Ce matin, j’ai dormi jusqu’à midi.',
          o:['Je me ne suis pas levé tôt.', 'Je ne me suis pas levé tôt.',
             'Je ne me pas suis levé tôt.'], r:1,
          note:'Orden fijo: <b>ne + pronombre + auxiliaire + pas + participe</b>.' },
        { enonce:'Et au futur proche, pour comparer :',
          o:['Je ne vais pas sortir.', 'Je vais ne pas sortir.',
             'Je ne sortir vais pas.'], r:0,
          note:'La lógica es la misma en los dos tiempos: <i>ne… pas</i> abraza el verbo '
             + 'conjugado (el auxiliar, o <i>aller</i>), nunca el infinitivo ni el '
             + 'participio.' }
      ] },

    /* ══ Étape 6 ══════════════════════════════════════════════════════ */
    /* 14 */ { t:'ordre', etiqueta:'Le voyage d’Ousmane',
      consigne:'Remets le voyage d’Ousmane dans l’ordre.',
      sous:'Es la historia del vídeo de clase. Seis acciones.',
      items: [
        'Il a appelé un taxi.',
        'Il est allé à l’aéroport.',
        'Il a lu un livre.',
        'Il a dormi dans l’avion.',
        'Il est sorti de l’avion.',
        'Il est arrivé chez sa sœur Mani.'
      ],
      aide:'Seis acciones, una detrás de otra, sin descripciones y sin explicaciones. '
         + 'Así se cuenta en passé composé: el relato avanza solo.' },

    /* 15 */ { t:'transfo', etiqueta:'Du présent au passé',
      consigne:'Réécris la phrase au passé composé.',
      sous:'Dos decisiones cada vez: qué auxiliar, y qué participio.',
      q: [
        { enonce:'Je mange une pomme.', modele:'J’ai mangé une pomme.' },
        { enonce:'Elle va à l’université.', modele:'Elle est allée à l’université.' },
        { enonce:'Nous faisons un gâteau.', modele:'Nous avons fait un gâteau.' },
        { enonce:'Ils partent à sept heures.', modele:'Ils sont partis à sept heures.' },
        { enonce:'Tu lis un livre.', modele:'Tu as lu un livre.' },
        { enonce:'Je me lève à six heures.', modele:'Je me suis levé à six heures.',
          note:'Si eres mujer: <i>je me suis levé<b>e</b></i>.' },
        { enonce:'Elle ne sort pas le samedi.', modele:'Elle n’est pas sortie samedi.',
          note:'Aquí se juntan las tres cosas: auxiliar <i>être</i>, acuerdo en femenino '
             + 'y la negación alrededor del auxiliar.' }
      ] },

    /* 16 */ { t:'prod', etiqueta:'Raconter hier', mots:60,
      consigne:'Raconte ta journée d’hier en six phrases.',
      sous:'60 palabras. Seis acciones, una detrás de otra, como Ousmane.',
      check: [
        'Seis frases en passé composé.',
        'Al menos <b>dos</b> con el auxiliar <b>être</b>.',
        'Al menos <b>tres</b> con <b>avoir</b>.',
        'Una frase en <b>negativa</b>.',
        'Si eres mujer, cuidado con el acuerdo: <i>je suis allé<b>e</b></i>.',
        'Un momento del día en cada frase (à huit heures, le matin, après, le soir…).'
      ],
      modele:'Hier matin, je me suis levée à six heures et j’ai pris mon petit-déjeuner très '
           + 'vite. Je suis allée au lycée à sept heures et demie. J’ai eu un examen de '
           + 'mathématiques&nbsp;: il a été difficile. À midi, j’ai mangé avec mes amies à la '
           + 'cafétéria. Je ne suis pas sortie l’après-midi, parce qu’il a plu. Le soir, j’ai '
           + 'lu un peu et je me suis couchée tôt.' },

    /* ══ Étape 7 ══════════════════════════════════════════════════════ */
    /* 17 */ { t:'prod', etiqueta:'TV5MONDE', mots:40,
      consigne:'Fais les deux exercices de TV5MONDE, puis note ici ce qui s’est passé.',
      sous:'40 palabras. Lo que me interesa no es la nota, sino qué te costó y por qué.',
      check: [
        'Tu resultado en «&nbsp;Le lycée, c’est fini&nbsp;» (A1).',
        'Tu resultado en «&nbsp;Reconnaître la forme du passé composé&nbsp;» (A2).',
        'Un fallo concreto, y a qué etapa de esta ficha corresponde.',
        'Una palabra nueva que aprendiste allí.'
      ],
      modele:'Dans «&nbsp;Le lycée, c’est fini&nbsp;», j’ai eu 8 sur 10. J’ai fait deux '
           + 'fautes avec l’auxiliaire&nbsp;: j’ai écrit «&nbsp;il a resté&nbsp;» au lieu de '
           + '«&nbsp;il est resté&nbsp;» — c’est l’étape 2. Dans l’exercice A2, j’ai eu 6 sur '
           + '10, parce qu’il y avait des participes irréguliers que je ne connaissais pas. '
           + 'J’ai appris le mot «&nbsp;diplôme&nbsp;».' }
  ]
});
