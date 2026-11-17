/* ═══════════════════════════════════════════════════════════════════════
   EJERCICIOS COMPLEMENTARIOS · A2.1 — NOVIEMBRE 2026 · UNITÉ 5
   ═══════════════════════════════════════════════════════════════════════
   Défi 1, Unité 5 «Métro, boulot, dodo»: una ficha por cada clase del ciclo
   (pp. 80, 81, 82-83, 84-85 y 86-88). Cada ficha empieza por la explicación
   del tema y sigue con la práctica; ningún tema nuevo va sin su explicación.

   No hay nombres ni datos de estudiantes en este archivo: se publica con el
   sitio. Las cifras de la ficha 3 son las de la infografía del libro (p. 82).

   Tipos de ejercicio (motor en assets/js/fichas-ejercicios.js):
     qcm · trous · tri · paires · transfo · dictee · prod · ordre
   ═══════════════════════════════════════════════════════════════════════ */

const FICHAS = [];

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
