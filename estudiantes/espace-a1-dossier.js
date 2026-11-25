/* ═══════════════════════════════════════════════════════════════════════
   DOSSIER A1 · los cuatro módulos de a1.html como fichas del espacio de ejercicios
   Generado a partir de estudiantes/a1.html (explicaciones, vocabulario y quiz de
   cada módulo). Desde aquí se editan: así se ven en el recorrido inmersivo y su
   avance se guarda en la plataforma. a1.html se conserva como archivo de consulta.
   ═══════════════════════════════════════════════════════════════════════ */
(function(){
FICHAS.push({
 "id": "dos-a1-mod1",
 "tipo": "dossier",
 "ciclo": "Dossier A1",
 "fecha": "Dossier A1 · Module 1 / 4",
 "titulo": "Premiers Contacts (module 1)",
 "resumen": "Saluer et prendre congé · Se présenter : Le verbe s'appeler · Les Pronoms Personnels · Les Articles : Le, La, Les / Un, Une, Des · Les Verbes en -ER au présent · Vocabulaire : Nationalités et jours de la semaine",
 "intro": "Todo el módulo, explicación por explicación, con el vocabulario y un quiz final que se corrige solo. Dossier de Découverte",
 "secciones": [
  {
   "titulo": "1. Le cours",
   "sous": "Lee cada explicación y escucha los ejemplos con el altavoz.",
   "rappels": [
    {
     "titulo": "Saluer et prendre congé",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Le registre formel vs informel</h4>\n                    <p>En français, on adapte ses salutations selon la personne à qui l'on s'adresse.</p>\n                    <table class=\"tableau-temps\">\n                        <thead><tr><th>Formel (Vous)</th><th>Informel (Tu)</th></tr></thead>\n                        <tbody>\n                            <tr><td>Bonjour, Monsieur / Madame. <button class=\"btn-audio btn-voz\" onclick=\"hablar('Bonjour Monsieur, bonjour Madame.', this)\">🔊</button></td><td>Salut ! <button class=\"btn-audio btn-voz\" onclick=\"hablar('Salut !', this)\">🔊</button></td></tr>\n                            <tr><td>Comment allez-vous ? <button class=\"btn-audio btn-voz\" onclick=\"hablar('Comment allez-vous ?', this)\">🔊</button></td><td>Comment ça va ? / Ça va ? <button class=\"btn-audio btn-voz\" onclick=\"hablar('Comment ça va ?', this)\">🔊</button></td></tr>\n                            <tr><td>Au revoir.</td><td>Salut ! / Ciao !</td></tr>\n                            <tr><td>Bonne journée.</td><td>À plus !</td></tr>\n                        </tbody>\n                    </table>\n                </div>"
    },
    {
     "titulo": "Se présenter : Le verbe s'appeler",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Conjugaison au présent</h4>\n                    <p>Le verbe <b>s'appeler</b> est un verbe pronominal (il utilise un pronom réfléchi). Attention au doublement de la lettre <b>L</b> pour je, tu, il/elle/on et ils/elles.</p>\n                    <table class=\"tableau-temps\">\n                        <tbody>\n                            <tr><td>Je <b>m'appelle</b></td><td>Nous <b>nous appelons</b></td></tr>\n                            <tr><td>Tu <b>t'appelles</b></td><td>Vous <b>vous appelez</b></td></tr>\n                            <tr><td>Il/Elle/On <b>s'appelle</b></td><td>Ils/Elles <b>s'appellent</b></td></tr>\n                        </tbody>\n                    </table>\n                    <div class=\"exemple\">Je m'appelle Miguel. <button class=\"btn-audio btn-voz\" onclick=\"hablar('Je m\\'appelle Miguel.', this)\">🔊</button></div>\n                </div>"
    },
    {
     "titulo": "Les Pronoms Personnels",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Sujets et Toniques</h4>\n                    <p>Les pronoms <b>sujets</b> font l'action du verbe. Les pronoms <b>toniques</b> s'utilisent pour insister sur la personne, souvent placés en début de phrase ou après une préposition.</p>\n                    <table class=\"tableau-temps\">\n                        <thead><tr><th>Pronoms Sujets</th><th>Pronoms Toniques</th></tr></thead>\n                        <tbody>\n                            <tr><td><b>Je</b> m'appelle...</td><td><b>Moi</b>, je m'appelle...</td></tr>\n                            <tr><td><b>Tu</b> t'appelles...</td><td>Et <b>toi</b> ?</td></tr>\n                            <tr><td><b>Il / Elle</b> s'appelle...</td><td>C'est <b>lui</b> / C'est <b>elle</b>.</td></tr>\n                            <tr><td><b>Nous</b> sommes...</td><td><b>Nous</b>, nous sommes...</td></tr>\n                            <tr><td><b>Vous</b> êtes...</td><td>Et <b>vous</b> ?</td></tr>\n                            <tr><td><b>Ils / Elles</b> sont...</td><td>Ce sont <b>eux</b> / Ce sont <b>elles</b>.</td></tr>\n                        </tbody>\n                    </table>\n                </div>"
    },
    {
     "titulo": "Les Articles : Le, La, Les / Un, Une, Des",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Articles définis vs indéfinis</h4>\n                    <p>Les <b>articles définis</b> (le, la, l', les) désignent une chose précise ou déjà connue. Les <b>articles indéfinis</b> (un, une, des) désignent une chose non précisée ou comptée.</p>\n                    <table class=\"tableau-temps\">\n                        <thead><tr><th>Définis</th><th>Indéfinis</th></tr></thead>\n                        <tbody>\n                            <tr><td><b>le</b> professeur</td><td><b>un</b> professeur</td></tr>\n                            <tr><td><b>la</b> salle</td><td><b>une</b> salle</td></tr>\n                            <tr><td><b>l'</b>étudiant (voyelle)</td><td><b>un</b> étudiant</td></tr>\n                            <tr><td><b>les</b> professeurs</td><td><b>des</b> professeurs</td></tr>\n                        </tbody>\n                    </table>\n                    <p style=\"margin-top: 1rem;\"><b>Attention :</b> devant une voyelle ou un <b>h</b> muet, <i>le</i> et <i>la</i> deviennent toujours <b>l'</b> (l'ami, l'heure).</p>\n                </div>"
    },
    {
     "titulo": "Les Verbes en -ER au présent",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>La conjugaison régulière (1er groupe)</h4>\n                    <p>La majorité des verbes français se terminent par <b>-er</b> à l'infinitif. Ils suivent tous le même modèle de terminaisons : <code>-e, -es, -e, -ons, -ez, -ent</code>.</p>\n                    <table class=\"tableau-temps\">\n                        <thead><tr><th>Parler</th><th>Habiter</th></tr></thead>\n                        <tbody>\n                            <tr><td>Je <b>parl</b>e</td><td>J'<b>habit</b>e</td></tr>\n                            <tr><td>Tu <b>parl</b>es</td><td>Tu <b>habit</b>es</td></tr>\n                            <tr><td>Il/Elle/On <b>parl</b>e</td><td>Il/Elle/On <b>habit</b>e</td></tr>\n                            <tr><td>Nous <b>parl</b>ons</td><td>Nous <b>habit</b>ons</td></tr>\n                            <tr><td>Vous <b>parl</b>ez</td><td>Vous <b>habit</b>ez</td></tr>\n                            <tr><td>Ils/Elles <b>parl</b>ent</td><td>Ils/Elles <b>habit</b>ent</td></tr>\n                        </tbody>\n                    </table>\n                    <div class=\"exemple\">Autres verbes courants : <b>aimer</b>, <b>étudier</b>, <b>travailler</b>, <b>écouter</b>, <b>regarder</b>, <b>chercher</b>, <b>habiter (à / en)</b>.</div>\n                </div>"
    },
    {
     "titulo": "Vocabulaire : Nationalités et jours de la semaine",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Quelques nationalités courantes</h4>\n                    <div class=\"grille-vocab\">\n                        <div class=\"item-vocab\"><b>mexicain(e)</b> — Mexique <button class=\"btn-audio btn-voz\" onclick=\"hablar('mexicain, mexicaine', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>français(e)</b> — France <button class=\"btn-audio btn-voz\" onclick=\"hablar('français, française', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>espagnol(e)</b> — Espagne <button class=\"btn-audio btn-voz\" onclick=\"hablar('espagnol, espagnole', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>américain(e)</b> — États-Unis <button class=\"btn-audio btn-voz\" onclick=\"hablar('américain, américaine', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>canadien(ne)</b> — Canada <button class=\"btn-audio btn-voz\" onclick=\"hablar('canadien, canadienne', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>brésilien(ne)</b> — Brésil <button class=\"btn-audio btn-voz\" onclick=\"hablar('brésilien, brésilienne', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>allemand(e)</b> — Allemagne <button class=\"btn-audio btn-voz\" onclick=\"hablar('allemand, allemande', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>italien(ne)</b> — Italie <button class=\"btn-audio btn-voz\" onclick=\"hablar('italien, italienne', this)\">🔊</button></div>\n                    </div>\n                    <h4 style=\"margin-top: 2rem;\">Les jours de la semaine</h4>\n                    <p>lundi, mardi, mercredi, jeudi, vendredi, samedi, <b>dimanche</b>. <button class=\"btn-audio btn-voz\" onclick=\"hablar('lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche', this)\">🔊</button> En français, la semaine commence le <b>lundi</b> et les jours ne prennent <b>pas</b> de majuscule.</p>\n                </div>\n\n                <div class=\"encadre-culture\">\n                    <h4>Le savais-tu ?</h4>\n                    <p>En français, on ne dit jamais « Bonjour Monsieur Tillero » à quelqu'un qu'on connaît bien : le prénom suffit souvent entre collègues, mais on garde le vouvoiement avec un professeur ou une personne âgée, même en l'appelant par son prénom.</p>\n                </div>"
    }
   ],
   "ejercicios": [
    0
   ]
  },
  {
   "titulo": "2. Le quiz du module",
   "sous": "Cinco preguntas para comprobar el módulo.",
   "rappels": [],
   "ejercicios": [
    1
   ]
  }
 ],
 "ejercicios": [
  {
   "t": "paires",
   "etiqueta": "Vocabulaire",
   "consigne": "Associe chaque expression française à sa traduction.",
   "pairs": [
    [
     "Bonjour",
     "Buenos días / Hola (formal)"
    ],
    [
     "Salut",
     "Hola (informal)"
    ],
    [
     "Merci",
     "Gracias"
    ],
    [
     "S'il vous plaît",
     "Por favor (formal)"
    ],
    [
     "Au revoir",
     "Adiós"
    ],
    [
     "Je m'appelle...",
     "Me llamo..."
    ],
    [
     "Comment allez-vous ?",
     "¿Cómo está usted?"
    ],
    [
     "Enchanté(e)",
     "Encantado/a"
    ]
   ]
  },
  {
   "t": "qcm",
   "etiqueta": "Quiz",
   "consigne": "Choisis la bonne réponse.",
   "q": [
    {
     "enonce": "Comment dit-on « Hola » de manière informelle ?",
     "o": [
      "Bonjour",
      "Salut",
      "Au revoir",
      "Comment allez-vous ?"
     ],
     "r": 1,
     "note": "« Salut » s'utilise entre amis, en famille ou avec des personnes que l'on tutoie."
    },
    {
     "enonce": "Complétez : « Nous ___ Sophie et Marc. » (s'appeler)",
     "o": [
      "nous appelons",
      "vous appelez",
      "s'appelle",
      "m'appelle"
     ],
     "r": 0,
     "note": "Avec « nous », le verbe pronominal « s'appeler » donne « nous nous appelons »."
    },
    {
     "enonce": "Quel est le pronom tonique pour insister sur « nous » ?",
     "o": [
      "Moi",
      "Nous",
      "Vous",
      "Eux"
     ],
     "r": 1,
     "note": "Le pronom tonique de « nous » reste « nous » : « Nous, nous sommes étudiants. »"
    },
    {
     "enonce": "« C'est ___ professeur patient. » (article indéfini masculin)",
     "o": [
      "le",
      "un",
      "la",
      "une"
     ],
     "r": 1,
     "note": "Devant un nom masculin non précisé, on utilise l'article indéfini « un »."
    },
    {
     "enonce": "Quelle est la forme correcte du verbe « habiter » pour « vous » ?",
     "o": [
      "habites",
      "habitez",
      "habitons",
      "habite"
     ],
     "r": 1,
     "note": "Les verbes en -er prennent « -ez » à la 2e personne du pluriel : vous habitez."
    }
   ]
  }
 ]
});
FICHAS.push({
 "id": "dos-a1-mod2",
 "tipo": "dossier",
 "ciclo": "Dossier A1",
 "fecha": "Dossier A1 · Module 2 / 4",
 "titulo": "Portrait-robot & Nombres (module 2)",
 "resumen": "Les Verbes Être et Avoir · Le Féminin des Métiers · Les Nombres · Le Verbe Faire · Dire l'heure · Les Nombres Ordinaux",
 "intro": "Todo el módulo, explicación por explicación, con el vocabulario y un quiz final que se corrige solo. Unité 1",
 "secciones": [
  {
   "titulo": "1. Le cours",
   "sous": "Lee cada explicación y escucha los ejemplos con el altavoz.",
   "rappels": [
    {
     "titulo": "Les Verbes Être et Avoir",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Dire son âge (Le verbe AVOIR)</h4>\n                    <p>En français, on utilise obligatoirement le verbe <b>avoir</b> pour exprimer l'âge.</p>\n                    <table class=\"tableau-temps\">\n                        <tbody>\n                            <tr><td>J'<b>ai</b> 21 ans.</td><td>Nous <b>avons</b> 30 ans.</td></tr>\n                            <tr><td>Tu <b>as</b> 25 ans.</td><td>Vous <b>avez</b> 40 ans.</td></tr>\n                            <tr><td>Il/Elle/On <b>a</b> 32 ans.</td><td>Ils/Elles <b>ont</b> 50 ans.</td></tr>\n                        </tbody>\n                    </table>\n                    <div class=\"exemple\">Quel âge as-tu ? <button class=\"btn-audio btn-voz\" onclick=\"hablar('Quel âge as-tu ?', this)\">🔊</button></div>\n                </div>\n                \n                <div class=\"encadre-grammaire\">\n                    <h4>Dire sa profession (Le verbe ÊTRE)</h4>\n                    <p>On utilise le verbe <b>être</b> suivi directement de la profession. On ne met <b>jamais</b> d'article (un/une) entre le verbe et le métier.</p>\n                    <table class=\"tableau-temps\">\n                        <tbody>\n                            <tr><td>Je <b>suis</b></td><td>Nous <b>sommes</b></td></tr>\n                            <tr><td>Tu <b>es</b></td><td>Vous <b>êtes</b></td></tr>\n                            <tr><td>Il/Elle/On <b>est</b></td><td>Ils/Elles <b>sont</b></td></tr>\n                        </tbody>\n                    </table>\n                    <div class=\"exemple\">Je suis infirmier. <button class=\"btn-audio btn-voz\" onclick=\"hablar('Je suis infirmier.', this)\">🔊</button><br>Elle est avocate. <button class=\"btn-audio btn-voz\" onclick=\"hablar('Elle est avocate.', this)\">🔊</button></div>\n                </div>"
    },
    {
     "titulo": "Le Féminin des Métiers",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Formation du féminin</h4>\n                    <p>En général, le féminin se forme avec le masculin + <b>e</b> (ex : <i>étudiant</i> ➔ <i>étudiant<b>e</b></i>).</p>\n                    <p>Quand le masculin se termine déjà par un <b>-e</b>, le féminin a exactement la même forme.</p>\n                    <p style=\"margin-top: 1.5rem; font-weight: 700; color: var(--bleu-institutionnel);\">Certains féminins ont une formation particulière :</p>\n                    <ul>\n                        <li><b>-er</b> ➔ <b>-ère</b> (infirmier ➔ infirmière)</li>\n                        <li><b>-ien</b> ➔ <b>-ienne</b> (informaticien ➔ informaticienne)</li>\n                        <li><b>-eur</b> ➔ <b>-euse</b> (vendeur ➔ vendeuse)</li>\n                        <li><b>-teur</b> ➔ <b>-trice</b> (agriculteur ➔ agricultrice)</li>\n                    </ul>\n                </div>"
    },
    {
     "titulo": "Les Nombres",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Les nombres à partir de 20</h4>\n                    <p>Faites très attention aux nombres composés et aux spécificités de la numération à partir de 70.</p>\n                    <ul>\n                        <li><b>21, 31, 41...</b> prennent la conjonction « et » (vingt-et-un). Les autres prennent un tiret (vingt-deux).</li>\n                        <li><b>70</b> s'écrit soixante-dix (60 + 10).</li>\n                        <li><b>80</b> s'écrit quatre-vingts. Attention, il prend un \"s\" seulement s'il n'est pas suivi d'un autre nombre (quatre-vingt-deux).</li>\n                        <li><b>90</b> s'écrit quatre-vingt-dix (80 + 10).</li>\n                    </ul>\n                    <button class=\"btn-audio btn-voz\" onclick=\"hablar('vingt-et-un, trente-deux, soixante-dix, quatre-vingts, quatre-vingt-dix', this)\" style=\"margin-top: 0.5rem;\">🔊 Écouter des exemples</button>\n                </div>"
    },
    {
     "titulo": "Le Verbe Faire",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Un verbe très utile (irrégulier)</h4>\n                    <p>Le verbe <b>faire</b> sert à parler des activités, du sport, de la météo et de beaucoup d'expressions figées.</p>\n                    <table class=\"tableau-temps\">\n                        <tbody>\n                            <tr><td>Je <b>fais</b></td><td>Nous <b>faisons</b></td></tr>\n                            <tr><td>Tu <b>fais</b></td><td>Vous <b>faites</b></td></tr>\n                            <tr><td>Il/Elle/On <b>fait</b></td><td>Ils/Elles <b>font</b></td></tr>\n                        </tbody>\n                    </table>\n                    <div class=\"exemple\">Je <b>fais</b> du sport. Il <b>fait</b> beau. Vous <b>faites</b> vos devoirs.</div>\n                </div>"
    },
    {
     "titulo": "Dire l'heure",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Quelle heure est-il ?</h4>\n                    <p>On utilise toujours <b>il est</b> pour donner l'heure, suivi du nombre d'heures et de minutes.</p>\n                    <table class=\"tableau-temps\">\n                        <tbody>\n                            <tr><td>8h00</td><td>Il est huit heures.</td></tr>\n                            <tr><td>8h15</td><td>Il est huit heures <b>et quart</b>.</td></tr>\n                            <tr><td>8h30</td><td>Il est huit heures <b>et demie</b>.</td></tr>\n                            <tr><td>8h45</td><td>Il est neuf heures <b>moins le quart</b>.</td></tr>\n                            <tr><td>12h00 / 00h00</td><td>Il est <b>midi</b> / Il est <b>minuit</b>.</td></tr>\n                        </tbody>\n                    </table>\n                    <button class=\"btn-audio btn-voz\" onclick=\"hablar('Quelle heure est-il ? Il est huit heures et quart.', this)\" style=\"margin-top: 0.5rem;\">🔊 Écouter</button>\n                </div>"
    },
    {
     "titulo": "Les Nombres Ordinaux",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Premier, deuxième, troisième...</h4>\n                    <p>Les nombres ordinaux se forment généralement avec le nombre + <b>-ième</b> (sauf <i>premier/première</i>).</p>\n                    <div class=\"grille-vocab\">\n                        <div class=\"item-vocab\">1<sup>er</sup> — <b>premier</b> / 1<sup>ère</sup> — <b>première</b></div>\n                        <div class=\"item-vocab\">2<sup>e</sup> — <b>deuxième</b></div>\n                        <div class=\"item-vocab\">3<sup>e</sup> — <b>troisième</b></div>\n                        <div class=\"item-vocab\">4<sup>e</sup> — <b>quatrième</b></div>\n                        <div class=\"item-vocab\">5<sup>e</sup> — <b>cinquième</b></div>\n                        <div class=\"item-vocab\">9<sup>e</sup> — <b>neuvième</b> (attention : f → v)</div>\n                    </div>\n                </div>\n\n                <div class=\"encadre-culture\">\n                    <h4>Astuce de prononciation</h4>\n                    <p>À l'oral, on utilise souvent l'heure « courante » (8h du matin, 3h de l'après-midi) plutôt que le système de 24 heures, réservé aux horaires officiels (transports, administration).</p>\n                </div>"
    }
   ],
   "ejercicios": [
    0
   ]
  },
  {
   "titulo": "2. Le quiz du module",
   "sous": "Cinco preguntas para comprobar el módulo.",
   "rappels": [],
   "ejercicios": [
    1
   ]
  }
 ],
 "ejercicios": [
  {
   "t": "paires",
   "etiqueta": "Vocabulaire",
   "consigne": "Associe chaque expression française à sa traduction.",
   "pairs": [
    [
     "Quel âge as-tu ?",
     "¿Cuántos años tienes?"
    ],
    [
     "Quelle heure est-il ?",
     "¿Qué hora es?"
    ],
    [
     "un médecin",
     "un médico"
    ],
    [
     "une avocate",
     "una abogada"
    ],
    [
     "vingt-et-un",
     "veintiuno"
    ],
    [
     "soixante-dix",
     "setenta"
    ],
    [
     "premier / première",
     "primero / primera"
    ],
    [
     "faire du sport",
     "hacer deporte"
    ]
   ]
  },
  {
   "t": "qcm",
   "etiqueta": "Quiz",
   "consigne": "Choisis la bonne réponse.",
   "q": [
    {
     "enonce": "Quel verbe utilise-t-on pour dire son âge ?",
     "o": [
      "être",
      "avoir",
      "faire",
      "aller"
     ],
     "r": 1,
     "note": "En français, l'âge s'exprime toujours avec le verbe « avoir » : j'ai 20 ans."
    },
    {
     "enonce": "« Elle ___ architecte. » (être)",
     "o": [
      "es",
      "est",
      "suis",
      "sont"
     ],
     "r": 1,
     "note": "À la 3e personne du singulier, le verbe être donne « est »."
    },
    {
     "enonce": "Comment écrit-on 91 en lettres ?",
     "o": [
      "quatre-vingt-onze",
      "quatre-vingt-dix-un",
      "neuf-vingt-un",
      "quatre-vingts-onze"
     ],
     "r": 0,
     "note": "91 = 80 + 11, donc « quatre-vingt-onze » (sans « s » car suivi d'un autre nombre)."
    },
    {
     "enonce": "Il est 14h30. Comment dit-on l'heure à l'oral courant ?",
     "o": [
      "Il est deux heures et quart",
      "Il est deux heures et demie",
      "Il est trois heures moins le quart",
      "Il est quatre heures et demie"
     ],
     "r": 1,
     "note": "14h30 = 2h30 de l'après-midi = « il est deux heures et demie »."
    },
    {
     "enonce": "Quel est le féminin de « vendeur » ?",
     "o": [
      "vendeuse",
      "vendeure",
      "vendrice",
      "vendeuxe"
     ],
     "r": 0,
     "note": "Les métiers en « -eur » forment leur féminin en « -euse » : vendeur ➔ vendeuse."
    }
   ]
  }
 ]
});
FICHAS.push({
 "id": "dos-a1-mod3",
 "tipo": "dossier",
 "ciclo": "Dossier A1",
 "fecha": "Dossier A1 · Module 3 / 4",
 "titulo": "État Civil & Identité (module 3)",
 "resumen": "L'Accord de l'Adjectif et des Nationalités · Présenter quelqu'un : C'est vs Il / Elle est · Les Adjectifs Possessifs · Vocabulaire : La Famille · Décrire le caractère",
 "intro": "Todo el módulo, explicación por explicación, con el vocabulario y un quiz final que se corrige solo. Unité 3",
 "secciones": [
  {
   "titulo": "1. Le cours",
   "sous": "Lee cada explicación y escucha los ejemplos con el altavoz.",
   "rappels": [
    {
     "titulo": "L'Accord de l'Adjectif et des Nationalités",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>La règle générale</h4>\n                    <p>En français, le féminin se forme généralement en ajoutant un <b>-e</b> à l'adjectif masculin. Le pluriel se forme en ajoutant un <b>-s</b>.</p>\n                    <table class=\"tableau-temps\">\n                        <thead><tr><th>Masculin</th><th>Féminin</th></tr></thead>\n                        <tbody>\n                            <tr><td>marié</td><td>marié<b>e</b></td></tr>\n                            <tr><td>divorcé</td><td>divorcé<b>e</b></td></tr>\n                            <tr><td>espagnol</td><td>espagnol<b>e</b></td></tr>\n                        </tbody>\n                    </table>\n                    <p style=\"margin-top: 1rem;\"><b>Attention :</b> Quand l'adjectif masculin se termine déjà par un <b>-e</b>, le féminin a la même forme.</p>\n                </div>\n\n                <div class=\"encadre-grammaire\">\n                    <h4>Le cas particulier des nationalités</h4>\n                    <p>Quand l'adjectif de nationalité se termine par <b>-ien</b> au masculin, la consonne double au féminin pour devenir <b>-ienne</b>.</p>\n                    <div class=\"exemple\">\n                        Il est Ital<b>ien</b>. ➔ Elle est Ital<b>ienne</b>.<br>\n                        Il est Canad<b>ien</b>. ➔ Elle est Canad<b>ienne</b>.\n                    </div>\n                </div>"
    },
    {
     "titulo": "Présenter quelqu'un : C'est vs Il / Elle est",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Identifier ou présenter avec C'EST</h4>\n                    <p>On utilise <b>C'est</b> pour présenter une personne spécifique ou pour identifier quelque chose. Il est toujours suivi d'un déterminant ou d'un nom propre.</p>\n                    <div class=\"exemple\">\n                        <b>C'est + Nom propre :</b> C'est François. C'est Nicolas.<br>\n                        <b>C'est + Article + Nom commun :</b> C'est mon mari. C'est un étudiant.\n                    </div>\n                </div>\n\n                <div class=\"encadre-grammaire\">\n                    <h4>Caractériser avec IL EST / ELLE EST</h4>\n                    <p>On utilise <b>Il est</b> ou <b>Elle est</b> pour donner une caractéristique (profession, nationalité, état civil). On n'utilise <b>jamais</b> d'article devant les professions dans ce cas.</p>\n                    <div class=\"exemple\">\n                        <b>Il/Elle est + Adjectif (état civil / nationalité) :</b> Elle est divorcée. Il est français.<br>\n                        <b>Il/Elle est + Profession (sans article) :</b> Elle est journaliste. Il est professeur.\n                    </div>\n                </div>"
    },
    {
     "titulo": "Les Adjectifs Possessifs",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Mon, ma, mes... : exprimer la possession</h4>\n                    <p>L'adjectif possessif s'accorde avec le nom qui suit, <b>pas</b> avec la personne qui possède.</p>\n                    <table class=\"tableau-temps\">\n                        <thead><tr><th>Masculin sing.</th><th>Féminin sing.</th><th>Pluriel</th></tr></thead>\n                        <tbody>\n                            <tr><td><b>mon</b> père</td><td><b>ma</b> mère</td><td><b>mes</b> parents</td></tr>\n                            <tr><td><b>ton</b> frère</td><td><b>ta</b> sœur</td><td><b>tes</b> frères</td></tr>\n                            <tr><td><b>son</b> mari</td><td><b>sa</b> femme</td><td><b>ses</b> enfants</td></tr>\n                            <tr><td><b>notre</b> famille</td><td><b>notre</b> famille</td><td><b>nos</b> familles</td></tr>\n                            <tr><td><b>votre</b> cousin</td><td><b>votre</b> cousine</td><td><b>vos</b> cousins</td></tr>\n                            <tr><td><b>leur</b> fils</td><td><b>leur</b> fille</td><td><b>leurs</b> enfants</td></tr>\n                        </tbody>\n                    </table>\n                    <p style=\"margin-top: 1rem;\"><b>Attention :</b> devant un nom féminin qui commence par une voyelle, on utilise <b>mon/ton/son</b> (et non ma/ta/sa) : <b>mon</b> amie (et non « ma amie »).</p>\n                </div>"
    },
    {
     "titulo": "Vocabulaire : La Famille",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Les membres de la famille</h4>\n                    <div class=\"grille-vocab\">\n                        <div class=\"item-vocab\"><b>le père</b> / la mère <button class=\"btn-audio btn-voz\" onclick=\"hablar('le père, la mère', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>le frère</b> / la sœur <button class=\"btn-audio btn-voz\" onclick=\"hablar('le frère, la sœur', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>le fils</b> / la fille <button class=\"btn-audio btn-voz\" onclick=\"hablar('le fils, la fille', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>le mari</b> / la femme <button class=\"btn-audio btn-voz\" onclick=\"hablar('le mari, la femme', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>le grand-père</b> / la grand-mère <button class=\"btn-audio btn-voz\" onclick=\"hablar('le grand-père, la grand-mère', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>l'oncle</b> / la tante <button class=\"btn-audio btn-voz\" onclick=\"hablar('l\\'oncle, la tante', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>le cousin</b> / la cousine <button class=\"btn-audio btn-voz\" onclick=\"hablar('le cousin, la cousine', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>le neveu</b> / la nièce <button class=\"btn-audio btn-voz\" onclick=\"hablar('le neveu, la nièce', this)\">🔊</button></div>\n                    </div>\n                </div>"
    },
    {
     "titulo": "Décrire le caractère",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Adjectifs de personnalité et leur accord</h4>\n                    <table class=\"tableau-temps\">\n                        <thead><tr><th>Masculin</th><th>Féminin</th></tr></thead>\n                        <tbody>\n                            <tr><td>sympathique</td><td>sympathique <i>(invariable)</i></td></tr>\n                            <tr><td>gentil</td><td>gentil<b>le</b></td></tr>\n                            <tr><td>sérieux</td><td>séri<b>euse</b></td></tr>\n                            <tr><td>travailleur</td><td>travaill<b>euse</b></td></tr>\n                            <tr><td>timide</td><td>timide <i>(invariable)</i></td></tr>\n                        </tbody>\n                    </table>\n                </div>\n\n                <div class=\"encadre-culture\">\n                    <h4>Le savais-tu ?</h4>\n                    <p>En France, on dit souvent <b>« beau-père »</b> et <b>« belle-mère »</b> aussi bien pour le parent du conjoint que pour le nouveau conjoint d'un parent : le contexte précise le sens !</p>\n                </div>"
    }
   ],
   "ejercicios": [
    0
   ]
  },
  {
   "titulo": "2. Le quiz du module",
   "sous": "Cinco preguntas para comprobar el módulo.",
   "rappels": [],
   "ejercicios": [
    1
   ]
  }
 ],
 "ejercicios": [
  {
   "t": "paires",
   "etiqueta": "Vocabulaire",
   "consigne": "Associe chaque expression française à sa traduction.",
   "pairs": [
    [
     "le mari / la femme",
     "el esposo / la esposa"
    ],
    [
     "le frère / la sœur",
     "el hermano / la hermana"
    ],
    [
     "les grands-parents",
     "los abuelos"
    ],
    [
     "célibataire",
     "soltero/a"
    ],
    [
     "marié(e)",
     "casado/a"
    ],
    [
     "sympathique",
     "simpático/a"
    ],
    [
     "gentil(le)",
     "amable"
    ],
    [
     "C'est mon cousin",
     "Es mi primo"
    ]
   ]
  },
  {
   "t": "qcm",
   "etiqueta": "Quiz",
   "consigne": "Choisis la bonne réponse.",
   "q": [
    {
     "enonce": "« ___ Camille, elle est ingénieure. » (identifier quelqu'un)",
     "o": [
      "Elle est",
      "C'est",
      "Il est",
      "Ce sont"
     ],
     "r": 1,
     "note": "Pour identifier une personne par son nom propre, on utilise « C'est »."
    },
    {
     "enonce": "Complétez : « Voici ___ sœur. » (mon/ma)",
     "o": [
      "mon",
      "ma",
      "mes",
      "son"
     ],
     "r": 1,
     "note": "« sœur » est féminin singulier, donc « ma sœur »."
    },
    {
     "enonce": "Quel est le féminin de « sérieux » ?",
     "o": [
      "sérieuse",
      "sérieuxe",
      "seriose",
      "sérieux"
     ],
     "r": 0,
     "note": "Les adjectifs en « -eux » forment leur féminin en « -euse » : sérieux ➔ sérieuse."
    },
    {
     "enonce": "« Il est ___. » (nationalité italienne, masculin)",
     "o": [
      "italien",
      "italienne",
      "italie",
      "italiens"
     ],
     "r": 0,
     "note": "Au masculin singulier, on dit « italien » (sans le « ne » du féminin)."
    },
    {
     "enonce": "Comment dit-on « mis abuelos » en français ?",
     "o": [
      "mes grands-parents",
      "ma grand-mère",
      "mon grand-père",
      "leurs grands-parents"
     ],
     "r": 0,
     "note": "« Mes » (pluriel) + « grands-parents » = « mes grands-parents »."
    }
   ]
  }
 ]
});
FICHAS.push({
 "id": "dos-a1-mod4",
 "tipo": "dossier",
 "ciclo": "Dossier A1",
 "fecha": "Dossier A1 · Module 4 / 4",
 "titulo": "Le Logement et l'Espace (module 4)",
 "resumen": "Décrire l'existence avec IL Y A · Les prépositions de localisation · Exprimer l'obligation · Le Verbe Aller et les Lieux · Vocabulaire : Les meubles et les pièces · La Place de l'Adjectif",
 "intro": "Todo el módulo, explicación por explicación, con el vocabulario y un quiz final que se corrige solo. Unité 4",
 "secciones": [
  {
   "titulo": "1. Le cours",
   "sous": "Lee cada explicación y escucha los ejemplos con el altavoz.",
   "rappels": [
    {
     "titulo": "Décrire l'existence avec IL Y A",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>L'affirmation et la négation</h4>\n                    <p>Pour indiquer la présence de quelque chose dans une pièce, on utilise <b>Il y a</b> suivi d'un article indéfini (un, une, des) ou d'un chiffre.</p>\n                    <div class=\"exemple\">\n                        Dans la maison, <b>il y a</b> une véranda.<br>\n                        À l'étage, <b>il y a</b> trois chambres.\n                    </div>\n                    <p style=\"margin-top: 1rem;\">À la forme négative, les articles se transforment toujours en <b>de</b> ou <b>d'</b>.</p>\n                    <div class=\"exemple\">\n                        Dans cette maison, <b>il n'y a pas de</b> véranda.<br>\n                        Chez moi, <b>il n'y a pas d'</b>ascenseur.\n                    </div>\n                </div>"
    },
    {
     "titulo": "Les prépositions de localisation",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Situer les meubles dans l'espace</h4>\n                    <p>Pour aménager un espace, l'utilisation des prépositions est essentielle.</p>\n                    <table class=\"tableau-temps\">\n                        <tbody>\n                            <tr><td><b>à gauche (de)</b></td><td>Le bureau est à gauche de la porte.</td></tr>\n                            <tr><td><b>à droite (de)</b></td><td>Le fauteuil est à droite du canapé.</td></tr>\n                            <tr><td><b>à côté (de)</b></td><td>La table est à côté de la fenêtre.</td></tr>\n                            <tr><td><b>devant / derrière</b></td><td>Ne placez pas le bureau devant un mur.</td></tr>\n                            <tr><td><b>en face (de)</b></td><td>Mettez les fauteuils en face du canapé.</td></tr>\n                            <tr><td><b>entre</b></td><td>La table basse est entre les deux fauteuils.</td></tr>\n                            <tr><td><b>sur / sous</b></td><td>Le chat est sous la table.</td></tr>\n                        </tbody>\n                    </table>\n                </div>"
    },
    {
     "titulo": "Exprimer l'obligation",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Il faut vs Devoir</h4>\n                    <p>Pour donner des conseils, on utilise l'obligation impersonnelle (<b>Il faut</b>) ou personnelle (le verbe <b>Devoir</b>).</p>\n                    <div class=\"exemple\">\n                        <b>Il faut + Infinitif :</b> Il faut mettre les plantes dans les coins.<br>\n                        <b>Il ne faut pas + Infinitif :</b> Il ne faut pas placer le canapé devant la fenêtre.\n                    </div>\n                    <p style=\"margin-top: 1rem;\">Le verbe <b>Devoir</b> s'accorde avec le sujet.</p>\n                    <div class=\"exemple\">\n                        Pour avoir une maison feng shui, <b>vous devez suivre</b> quelques règles.\n                    </div>\n                </div>"
    },
    {
     "titulo": "Le Verbe Aller et les Lieux",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Aller + article contracté</h4>\n                    <p>Le verbe <b>aller</b> est irrégulier. Avec un lieu, la préposition <b>à</b> se contracte souvent avec l'article défini.</p>\n                    <table class=\"tableau-temps\">\n                        <tbody>\n                            <tr><td>Je <b>vais</b></td><td>Nous <b>allons</b></td></tr>\n                            <tr><td>Tu <b>vas</b></td><td>Vous <b>allez</b></td></tr>\n                            <tr><td>Il/Elle/On <b>va</b></td><td>Ils/Elles <b>vont</b></td></tr>\n                        </tbody>\n                    </table>\n                    <table class=\"tableau-temps\" style=\"margin-top: 1rem;\">\n                        <thead><tr><th>Article + lieu</th><th>Contraction</th></tr></thead>\n                        <tbody>\n                            <tr><td>à + le salon</td><td>Je vais <b>au</b> salon.</td></tr>\n                            <tr><td>à + la cuisine</td><td>Je vais <b>à la</b> cuisine.</td></tr>\n                            <tr><td>à + l'école</td><td>Je vais <b>à l'</b>école.</td></tr>\n                            <tr><td>à + les toilettes</td><td>Je vais <b>aux</b> toilettes.</td></tr>\n                        </tbody>\n                    </table>\n                </div>"
    },
    {
     "titulo": "Vocabulaire : Les meubles et les pièces",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Enrichir la description du logement</h4>\n                    <div class=\"grille-vocab\">\n                        <div class=\"item-vocab\"><b>le salon</b> — la salle à manger <button class=\"btn-audio btn-voz\" onclick=\"hablar('le salon, la salle à manger', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>la chambre</b> — la cuisine <button class=\"btn-audio btn-voz\" onclick=\"hablar('la chambre, la cuisine', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>la salle de bains</b> — les toilettes <button class=\"btn-audio btn-voz\" onclick=\"hablar('la salle de bains, les toilettes', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>le lit</b> — l'armoire <button class=\"btn-audio btn-voz\" onclick=\"hablar('le lit, l\\'armoire', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>le canapé</b> — le fauteuil <button class=\"btn-audio btn-voz\" onclick=\"hablar('le canapé, le fauteuil', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>la table</b> — la chaise <button class=\"btn-audio btn-voz\" onclick=\"hablar('la table, la chaise', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>l'étagère</b> — le tapis <button class=\"btn-audio btn-voz\" onclick=\"hablar('l\\'étagère, le tapis', this)\">🔊</button></div>\n                        <div class=\"item-vocab\"><b>la fenêtre</b> — la porte <button class=\"btn-audio btn-voz\" onclick=\"hablar('la fenêtre, la porte', this)\">🔊</button></div>\n                    </div>\n                </div>"
    },
    {
     "titulo": "La Place de l'Adjectif",
     "html": "<div class=\"encadre-grammaire\">\n                    <h4>Avant ou après le nom ?</h4>\n                    <p>La plupart des adjectifs se placent <b>après</b> le nom (couleur, nationalité, forme). Un petit groupe d'adjectifs courts et fréquents se placent <b>avant</b> le nom.</p>\n                    <div class=\"exemple\">\n                        <b>Après le nom :</b> un canapé <i>bleu</i>, une table <i>ronde</i>, un appartement <i>moderne</i>.<br>\n                        <b>Avant le nom :</b> un <i>grand</i> salon, une <i>petite</i> chambre, un <i>joli</i> jardin, une <i>bonne</i> idée.\n                    </div>\n                </div>\n\n                <div class=\"encadre-culture\">\n                    <h4>Le savais-tu ?</h4>\n                    <p>Dans les petits appartements français (studios), il n'est pas rare que la « chambre » et le « salon » soient <b>la même pièce</b> — on parle alors d'un <b>studio</b> ou d'un <b>T1</b> (T pour « type »).</p>\n                </div>"
    }
   ],
   "ejercicios": [
    0
   ]
  },
  {
   "titulo": "2. Le quiz du module",
   "sous": "Cinco preguntas para comprobar el módulo.",
   "rappels": [],
   "ejercicios": [
    1
   ]
  }
 ],
 "ejercicios": [
  {
   "t": "paires",
   "etiqueta": "Vocabulaire",
   "consigne": "Associe chaque expression française à sa traduction.",
   "pairs": [
    [
     "le salon",
     "la sala"
    ],
    [
     "la chambre",
     "la habitación"
    ],
    [
     "la cuisine",
     "la cocina"
    ],
    [
     "la salle de bains",
     "el baño"
    ],
    [
     "à côté de",
     "al lado de"
    ],
    [
     "il y a",
     "hay"
    ],
    [
     "le canapé",
     "el sofá"
    ],
    [
     "il faut",
     "hay que / es necesario"
    ]
   ]
  },
  {
   "t": "qcm",
   "etiqueta": "Quiz",
   "consigne": "Choisis la bonne réponse.",
   "q": [
    {
     "enonce": "« Il n'y a pas ___ balcon. » (forme négative)",
     "o": [
      "de",
      "un",
      "du",
      "des"
     ],
     "r": 0,
     "note": "À la forme négative, les articles indéfinis se transforment toujours en « de »."
    },
    {
     "enonce": "« Je vais ___ marché. » (à + le)",
     "o": [
      "au",
      "à la",
      "à l'",
      "aux"
     ],
     "r": 0,
     "note": "à + le = au (contraction obligatoire) : je vais au marché."
    },
    {
     "enonce": "Le fauteuil est juste devant la télévision. Quelle préposition utiliser ?",
     "o": [
      "en face de",
      "à côté de",
      "sous",
      "entre"
     ],
     "r": 0,
     "note": "« En face de » indique une position opposée, directement devant."
    },
    {
     "enonce": "Quel adjectif se place normalement AVANT le nom ?",
     "o": [
      "grand",
      "bleu",
      "moderne",
      "français"
     ],
     "r": 0,
     "note": "« Grand » fait partie du petit groupe d'adjectifs courts et fréquents placés avant le nom."
    },
    {
     "enonce": "« Il ___ ranger la chambre. » (obligation impersonnelle)",
     "o": [
      "faut",
      "fait",
      "faits",
      "fallait"
     ],
     "r": 0,
     "note": "« Il faut + infinitif » exprime une obligation impersonnelle au présent."
    }
   ]
  }
 ]
});
})();
