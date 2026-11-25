/* ═══════════════════════════════════════════════════════════════════════
   DOSSIER B2 · los ocho módulos de b2.html como fichas del espacio de ejercicios
   Generado a partir de estudiantes/b2.html (reglas y usos, y el banco de ejercicios
   de cada módulo). Desde aquí se editan: se ven en el recorrido inmersivo y su avance
   se guarda en la plataforma. b2.html se conserva como archivo de consulta.
   ═══════════════════════════════════════════════════════════════════════ */
(function(){
window.toggleTrad = window.toggleTrad || function(id){ const el = document.getElementById(id); if(el) el.style.display = el.style.display === 'block' ? 'none' : 'block'; };
FICHAS.push({
 "id": "dos-b2-mod1",
 "tipo": "dossier",
 "ciclo": "Dossier B2",
 "fecha": "Dossier B2 · Module 1 / 8",
 "titulo": "Les Indéfinis & Proportions (module 1)",
 "resumen": "L'échelle des proportions · Totalité : tout, chaque, chacun · Majorité, fractions et accord du verbe · Quantité nulle et quantités intermédiaires",
 "intro": "La explicación del módulo, pantalla por pantalla, y 3 series de ejercicios que se corrigen solas, con su explicación.",
 "secciones": [
  {
   "titulo": "1. Règles et usages",
   "sous": "Lee cada explicación; puedes ver la traducción al español cuando la necesites.",
   "rappels": [
    {
     "titulo": "L'échelle des proportions",
     "html": "<div class=\"encadre-grammaire\">\n                    <button class=\"btn-traduction\" onclick=\"toggleTrad('trad-1')\">🇪🇸 Ver en español</button>\n                    \n                    <p>Le français dispose d'une gamme d'expressions qui jalonnent la quantité, de l'absence totale à la totalité. Situer chacune sur cette échelle évite les confusions les plus tenaces.</p>\n\n                    <div class=\"schema\" role=\"img\" aria-label=\"Échelle des proportions de zéro à cent pour cent, avec les expressions françaises correspondantes.\">\n                        <svg viewBox=\"0 0 620 150\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <line x1=\"20\" y1=\"60\" x2=\"600\" y2=\"60\" class=\"s-axe\"/>\n                            <line x1=\"20\" y1=\"52\" x2=\"20\" y2=\"68\" class=\"s-axe\"/>\n                            <line x1=\"310\" y1=\"52\" x2=\"310\" y2=\"68\" class=\"s-axe\"/>\n                            <line x1=\"600\" y1=\"52\" x2=\"600\" y2=\"68\" class=\"s-axe\"/>\n\n                            <text x=\"20\" y=\"40\" class=\"s-grad\">0 %</text>\n                            <text x=\"310\" y=\"40\" class=\"s-grad\">50 %</text>\n                            <text x=\"600\" y=\"40\" class=\"s-grad s-fin\">100 %</text>\n\n                            <circle cx=\"20\" cy=\"60\" r=\"5\" class=\"s-point s-point-nul\"/>\n                            <circle cx=\"120\" cy=\"60\" r=\"5\" class=\"s-point\"/>\n                            <circle cx=\"215\" cy=\"60\" r=\"5\" class=\"s-point\"/>\n                            <circle cx=\"310\" cy=\"60\" r=\"5\" class=\"s-point\"/>\n                            <circle cx=\"420\" cy=\"60\" r=\"5\" class=\"s-point\"/>\n                            <circle cx=\"600\" cy=\"60\" r=\"5\" class=\"s-point s-point-total\"/>\n\n                            <text x=\"20\" y=\"86\" class=\"s-lgd\">aucun</text>\n                            <text x=\"120\" y=\"86\" class=\"s-lgd\">quelques</text>\n                            <text x=\"215\" y=\"86\" class=\"s-lgd\">plusieurs</text>\n                            <text x=\"310\" y=\"86\" class=\"s-lgd\">la moitié</text>\n                            <text x=\"420\" y=\"86\" class=\"s-lgd\">la plupart</text>\n                            <text x=\"600\" y=\"86\" class=\"s-lgd s-fin\">tous</text>\n\n                            <text x=\"20\" y=\"106\" class=\"s-lgd s-gris\">rien</text>\n                            <text x=\"120\" y=\"106\" class=\"s-lgd s-gris\">certains</text>\n                            <text x=\"310\" y=\"106\" class=\"s-lgd s-gris\">un sur deux</text>\n                            <text x=\"420\" y=\"106\" class=\"s-lgd s-gris\">la majorité</text>\n                            <text x=\"600\" y=\"106\" class=\"s-lgd s-gris s-fin\">chaque</text>\n\n                            <text x=\"215\" y=\"134\" class=\"s-lgd s-gris\">un tiers ≈ 33 %<tspan class=\"s-sep\"> · </tspan>un quart = 25 %<tspan class=\"s-sep\"> · </tspan>les trois quarts = 75 %</text>\n                        </svg>\n                    </div>\n\n                    <div id=\"trad-1\" class=\"texte-espanol\">\n                        <b>Traducción explicativa :</b><br>\n                        • <i>Tous les pays / chaque pays</i> (100 %) : \"todos los países\" (plural) / \"cada país\" (singular).<br>\n                        • <i>La plupart des pays</i> (+50 %) : \"la mayoría de los países\", exige verbo en plural.<br>\n                        • <i>Aucun pays</i> (0 %) : \"ningún país\", va en singular y requiere la partícula negativa <i>ne</i>.<br><br>\n                        Dos trampas para hispanohablantes: <i>la plupart des</i> lleva el verbo en <b>plural</b> (al contrario que \"la mayoría de\", que admite ambos), y <i>chaque</i> nunca se usa con plural, mientras que \"cada\" en español sí aparece en giros como \"cada dos días\" (en francés: <i>tous les deux jours</i>).\n                    </div>\n                </div>"
    },
    {
     "titulo": "Totalité : tout, chaque, chacun",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Trois mots proches, trois constructions distinctes. La faute vient presque toujours du nombre du nom qui suit.</p>\n                    <div class=\"enveloppe-tableau\">\n                        <table class=\"tableau-temps\">\n                            <thead><tr><th>Forme</th><th>Nature</th><th>Construction</th></tr></thead>\n                            <tbody>\n                                <tr><td>tout / toute</td><td>adjectif</td><td>+ <b>singulier</b> — <i>tout le pays, toute la classe</i></td></tr>\n                                <tr><td>tous / toutes</td><td>adjectif</td><td>+ <b>pluriel</b> — <i>tous les pays, toutes les régions</i></td></tr>\n                                <tr><td>chaque</td><td>adjectif</td><td>+ <b>singulier</b>, un par un — <i>chaque pays</i></td></tr>\n                                <tr><td>chacun / chacune</td><td>pronom</td><td>seul ou + <i>d'entre</i> — <i>chacun d'entre eux</i></td></tr>\n                            </tbody>\n                        </table>\n                    </div>\n                    <p><b>Attention à la prononciation&nbsp;:</b> dans « tous les pays », le <i>s</i> de « tous » est muet&nbsp;; dans « ils sont tous venus », où « tous » est pronom, il se prononce.</p>\n                </div>"
    },
    {
     "titulo": "Majorité, fractions et accord du verbe",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>C'est ici que se joue l'erreur la plus fréquente en B2&nbsp;: le verbe s'accorde-t-il avec l'expression collective ou avec son complément&nbsp;?</p>\n                    <ul>\n                        <li><b>la plupart des + pluriel</b> ➔ verbe au <b>pluriel</b>, sans exception.\n                            <div class=\"exemple\">La plupart des étudiants <b>ont</b> réussi.</div>\n                        </li>\n                        <li><b>la majorité / la moitié / un tiers de</b> ➔ le <b>singulier</b> reste la norme écrite, l'accord avec le complément étant toléré.\n                            <div class=\"exemple\">La moitié des candidats <b>a été</b> reçue.<span class=\"fleche\">·</span>La majorité <b>s'est</b> abstenue.</div>\n                        </li>\n                        <li><b>Les fractions usuelles&nbsp;:</b> <code>la moitié</code> (50&nbsp;%), <code>un tiers</code> (33&nbsp;%), <code>un quart</code> (25&nbsp;%), <code>les trois quarts</code> (75&nbsp;%).</li>\n                    </ul>\n                </div>"
    },
    {
     "titulo": "Quantité nulle et quantités intermédiaires",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>La quantité nulle réclame toujours la négation <code>ne</code>, et toujours le singulier.</p>\n                    <div class=\"exemple\">\n                        <b>Aucun</b> pays <b>ne</b> refuse cette langue.<span class=\"fleche\">·</span><b>Nul</b> <b>n'</b>est censé ignorer la loi.<br>\n                        <b>Personne n'</b>est venu.<span class=\"fleche\">·</span><b>Rien ne</b> justifie ce retard.\n                    </div>\n                    <p>Entre les deux extrêmes, quatre degrés à distinguer&nbsp;:</p>\n                    <ul>\n                        <li><b>quelques</b> — un petit nombre, vague et modeste.</li>\n                        <li><b>certains</b> — une partie identifiable du groupe, mais non nommée.</li>\n                        <li><b>plusieurs</b> — plus de deux, avec l'idée d'un nombre appréciable.</li>\n                        <li><b>beaucoup de / peu de</b> — l'appréciation subjective de la quantité.</li>\n                    </ul>\n                </div>"
    }
   ],
   "ejercicios": []
  },
  {
   "titulo": "2. Exercices",
   "sous": "Series de práctica con corrección inmediata.",
   "rappels": [],
   "ejercicios": [
    0,
    1,
    2
   ]
  }
 ],
 "ejercicios": [
  {
   "t": "qcm",
   "etiqueta": "QCM 1",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "________ pays de la liste ne présente un taux de francophonie égal à 0&nbsp;%.",
     "o": [
      "Plusieurs",
      "Aucun",
      "Chaque"
     ],
     "r": 1,
     "note": "Exact&#8239;! «&#8239;Aucun&#8239;» est toujours singulier et réclame «&#8239;ne&#8239;» devant le verbe."
    },
    {
     "enonce": "________ pays francophone possède sa propre richesse linguistique.",
     "o": [
      "Tous",
      "Chaque",
      "La plupart"
     ],
     "r": 1,
     "note": "Exact&#8239;! «&#8239;Chaque&#8239;» est suivi d'un nom au singulier et envisage les éléments un par un."
    },
    {
     "enonce": "La plupart des étudiants ________ déjà passé le DELF.",
     "o": [
      "a",
      "ont",
      "avait"
     ],
     "r": 1,
     "note": "Exact&#8239;! Après «&#8239;la plupart des + pluriel&#8239;», le verbe se met au pluriel."
    },
    {
     "enonce": "Choisissez la forme correcte&nbsp;: «&#8239;________ les livres sont rangés.&#8239;»",
     "o": [
      "Tout",
      "Tous",
      "Toute"
     ],
     "r": 1,
     "note": "Exact&#8239;! «&#8239;Tous&#8239;» s'accorde avec «&#8239;les livres&#8239;», masculin pluriel."
    },
    {
     "enonce": "«&#8239;________ d'entre eux a répondu correctement.&#8239;» (un seul, pris isolément)",
     "o": [
      "Chacun",
      "Chaque",
      "Tous"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Chacun&#8239;» est un pronom&nbsp;: il s'emploie seul ou suivi de «&#8239;d'entre&#8239;»."
    }
   ]
  },
  {
   "t": "qcm",
   "etiqueta": "QCM 2",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "Quelle proportion «&#8239;les trois quarts&#8239;» représente-t-il&#8239;?",
     "o": [
      "25 %",
      "75 %",
      "30 %"
     ],
     "r": 1,
     "note": "Exact&#8239;! Trois parts sur quatre, soit 75 %."
    },
    {
     "enonce": "«&#8239;La moitié des candidats ________ reçue.&#8239;» Quel accord&#8239;?",
     "o": [
      "a été",
      "ont été",
      "avaient"
     ],
     "r": 0,
     "note": "Exact&#8239;! Avec «&#8239;la moitié&#8239;», l'accord au singulier reste correct&nbsp;: c'est le collectif qui commande."
    },
    {
     "enonce": "Quelle phrase exprime une quantité <b>intermédiaire</b>, ni nulle ni totale&#8239;?",
     "o": [
      "Aucun étudiant n'est venu.",
      "Certains étudiants sont venus.",
      "Tous les étudiants sont venus."
     ],
     "r": 1,
     "note": "Exact&#8239;! «&#8239;Certains&#8239;», comme «&#8239;quelques&#8239;» ou «&#8239;plusieurs&#8239;», désigne une partie indéterminée du groupe."
    },
    {
     "enonce": "Complétez&nbsp;: «&#8239;Il n'y a ________ raison de s'inquiéter.&#8239;»",
     "o": [
      "aucune",
      "aucun",
      "nulle part"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Raison&#8239;» est féminin&nbsp;: «&#8239;aucune raison&#8239;», au singulier."
    },
    {
     "enonce": "«&#8239;Quelques&#8239;» et «&#8239;plusieurs&#8239;»&nbsp;: quelle différence&#8239;?",
     "o": [
      "« Quelques » suggère un petit nombre, « plusieurs » un nombre plus élevé.",
      "Les deux sont rigoureusement équivalents.",
      "« Quelques » est toujours singulier."
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Quelques&#8239;» reste vague et modeste&#8239;; «&#8239;plusieurs&#8239;» insiste sur la pluralité, au-delà de deux."
    }
   ]
  },
  {
   "t": "trous",
   "etiqueta": "Saisie 1",
   "consigne": "Complétez, en écrivant le mot ou l’expression qui manque.",
   "sous": "Reponde en una palabra o expresión corta.",
   "q": [
    {
     "enonce": "Complétez avec l'indéfini de totalité&nbsp;: «&#8239;___ les régions francophones ont participé.&#8239;» (masculin pluriel)",
     "r": [
      "toutes",
      "Toutes"
     ],
     "taille": 16,
     "note": "«&#8239;Régions&#8239;» est féminin pluriel&nbsp;: l'accord donne «&#8239;toutes&#8239;»."
    },
    {
     "enonce": "Exprimez 50&nbsp;% en toutes lettres&nbsp;: «&#8239;___ des participants sont bilingues.&#8239;»",
     "r": [
      "la moitié"
     ],
     "taille": 16,
     "note": "«&#8239;La moitié&#8239;» exprime exactement 50 %."
    },
    {
     "enonce": "Réécrivez sans «&#8239;ne… pas&#8239;»&nbsp;: «&#8239;Il n'y a pas un seul étudiant absent.&#8239;» ➔ ___ étudiant n'est absent.",
     "r": [
      "aucun"
     ],
     "taille": 16,
     "note": "«&#8239;Aucun&#8239;» condense la négation totale et s'accompagne toujours de «&#8239;ne&#8239;»."
    },
    {
     "enonce": "Complétez&nbsp;: «&#8239;___ des pays africains ont le français comme langue officielle.&#8239;» (plus de la moitié, deux mots)",
     "r": [
      "la plupart"
     ],
     "taille": 16,
     "note": "«&#8239;La plupart des&#8239;» + pluriel&nbsp;: le verbe suit au pluriel."
    },
    {
     "enonce": "Accordez&nbsp;: «&#8239;Chaque candidat ___ (devoir) présenter une pièce d'identité.&#8239;»",
     "r": [
      "doit"
     ],
     "taille": 16,
     "note": "«&#8239;Chaque&#8239;» impose le singulier&nbsp;: le verbe reste au singulier."
    }
   ]
  }
 ]
});
FICHAS.push({
 "id": "dos-b2-mod2",
 "tipo": "dossier",
 "ciclo": "Dossier B2",
 "fecha": "Dossier B2 · Module 2 / 8",
 "titulo": "La Cause et la Conséquence (module 2)",
 "resumen": "Deux sens de lecture · Exprimer la cause : quatre nuances · Exprimer la conséquence · L'intensité qui entraîne une conséquence",
 "intro": "La explicación del módulo, pantalla por pantalla, y 3 series de ejercicios que se corrigen solas, con su explicación.",
 "secciones": [
  {
   "titulo": "1. Règles et usages",
   "sous": "Lee cada explicación; puedes ver la traducción al español cuando la necesites.",
   "rappels": [
    {
     "titulo": "Deux sens de lecture",
     "html": "<div class=\"encadre-grammaire\">\n                    <button class=\"btn-traduction\" onclick=\"toggleTrad('trad-2')\">🇪🇸 Ver en español</button>\n                    \n                    <p>Un même enchaînement peut s'énoncer dans les deux sens. Ce qui change, c'est le connecteur — et la place que la phrase donne au fait initial.</p>\n\n                    <div class=\"schema\" role=\"img\" aria-label=\"Schéma montrant qu'un même enchaînement peut être formulé en partant de la cause ou de la conséquence.\">\n                        <svg viewBox=\"0 0 620 200\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <defs>\n                                <marker id=\"pointe-graphite\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\"\n                                        markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n                                    <path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"var(--graphite)\"/>\n                                </marker>\n                            </defs>\n\n                            <rect x=\"0\" y=\"30\" width=\"230\" height=\"46\" rx=\"4\" class=\"s-sujet\"/>\n                            <text x=\"115\" y=\"52\" class=\"s-mot\">Il neigeait</text>\n                            <text x=\"115\" y=\"68\" class=\"s-lgd s-gris\">la cause</text>\n\n                            <rect x=\"378\" y=\"30\" width=\"230\" height=\"46\" rx=\"4\" class=\"s-objet\"/>\n                            <text x=\"493\" y=\"52\" class=\"s-mot\">Le vol est annulé</text>\n                            <text x=\"493\" y=\"68\" class=\"s-lgd s-gris\">la conséquence</text>\n\n                            <line x1=\"240\" y1=\"45\" x2=\"368\" y2=\"45\" class=\"s-lien\" marker-end=\"url(#pointe-graphite)\"/>\n                            <line x1=\"368\" y1=\"66\" x2=\"240\" y2=\"66\" class=\"s-lien\" marker-end=\"url(#pointe-graphite)\"/>\n\n                            <text x=\"0\" y=\"112\" class=\"s-etiq\">ON PART DE LA CAUSE</text>\n                            <text x=\"0\" y=\"134\" class=\"s-ex s-petit\">Comme il neigeait, le vol a été annulé.</text>\n                            <text x=\"0\" y=\"152\" class=\"s-connecteurs\">comme · puisque · étant donné que</text>\n                            <text x=\"0\" y=\"168\" class=\"s-connecteurs\">car · parce que · vu que</text>\n\n                            <text x=\"318\" y=\"112\" class=\"s-etiq\">ON PART DE LA CONSÉQUENCE</text>\n                            <text x=\"318\" y=\"134\" class=\"s-ex s-petit\">Le vol a été annulé car il neigeait.</text>\n                            <text x=\"318\" y=\"152\" class=\"s-connecteurs\">donc · par conséquent · alors</text>\n                            <text x=\"318\" y=\"168\" class=\"s-connecteurs\">si bien que · c'est pourquoi</text>\n                        </svg>\n                    </div>\n\n                    <div id=\"trad-2\" class=\"texte-espanol\">\n                        <b>Traducción explicativa :</b><br>\n                        • <i>Grâce à</i> : causa con resultado favorable (\"gracias a\").<br>\n                        • <i>À cause de</i> : causa con resultado desfavorable (\"por culpa de\").<br>\n                        • <i>En raison de</i> : causa neutra, registro administrativo (\"debido a\").<br>\n                        • <i>Puisque / Étant donné que</i> : causa ya conocida o probada (\"puesto que / dado que\").<br>\n                        • <i>Tellement… que</i> : intensidad con resultado (\"tanto… que\").<br><br>\n                        Trampa frecuente: <i>car</i> nunca puede empezar la frase, al contrario que \"pues\" o \"porque\" en español. Y <i>du coup</i>, muy oído en Francia, es coloquial: no debe aparecer en un examen escrito.\n                    </div>\n                </div>"
    },
    {
     "titulo": "Exprimer la cause : quatre nuances",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Toutes ces locutions se construisent avec l'<b>indicatif</b>. Elles se distinguent par la nuance et par la construction.</p>\n                    <div class=\"enveloppe-tableau\">\n                        <table class=\"tableau-temps\">\n                            <thead><tr><th>Locution</th><th>Nuance</th><th>Suivi de</th></tr></thead>\n                            <tbody>\n                                <tr><td>parce que</td><td>information nouvelle, réponse à « pourquoi&nbsp;? »</td><td>proposition</td></tr>\n                                <tr><td>car</td><td>justification, registre écrit — <b>jamais en tête</b></td><td>proposition</td></tr>\n                                <tr><td>puisque</td><td>cause déjà connue de l'interlocuteur</td><td>proposition</td></tr>\n                                <tr><td>comme</td><td>cause annoncée d'abord — <b>toujours en tête</b></td><td>proposition</td></tr>\n                                <tr><td>étant donné que / vu que</td><td>fait établi, registre soutenu</td><td>proposition</td></tr>\n                                <tr><td>grâce à</td><td>résultat <b>heureux</b></td><td>nom</td></tr>\n                                <tr><td>à cause de</td><td>résultat <b>fâcheux</b></td><td>nom</td></tr>\n                                <tr><td>en raison de</td><td>neutre, administratif</td><td>nom</td></tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>"
    },
    {
     "titulo": "Exprimer la conséquence",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Le choix se règle presque entièrement sur le <b>registre</b>.</p>\n                    <ul>\n                        <li><b>Courant&nbsp;:</b> <code>donc</code>, <code>alors</code>, <code>c'est pourquoi</code>.</li>\n                        <li><b>Soutenu&nbsp;:</b> <code>par conséquent</code>, <code>en conséquence</code>, <code>de ce fait</code>.</li>\n                        <li><b>Avec proposition&nbsp;:</b> <code>si bien que</code>, <code>de sorte que</code>, <code>au point que</code>.</li>\n                        <li><b>Familier, à éviter à l'écrit&nbsp;:</b> <i>du coup</i>, <i>résultat</i>.</li>\n                    </ul>\n                </div>"
    },
    {
     "titulo": "L'intensité qui entraîne une conséquence",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>C'est la structure la plus productive du module — et celle où l'on se trompe le plus, car la forme dépend de ce qui suit.</p>\n                    <div class=\"enveloppe-tableau\">\n                        <table class=\"tableau-temps\">\n                            <thead><tr><th>Devant</th><th>Structure</th><th>Exemple</th></tr></thead>\n                            <tbody>\n                                <tr><td>un adjectif</td><td>si / tellement + adj. + que</td><td>Il est <b>si</b> fatigué <b>qu'</b>il dort debout.</td></tr>\n                                <tr><td>un adverbe</td><td>si / tellement + adv. + que</td><td>Elle parle <b>si</b> vite <b>que</b> je perds le fil.</td></tr>\n                                <tr><td>un nom</td><td><b>tellement de / tant de</b> + nom + que</td><td>Il y avait <b>tant de</b> monde <b>que</b> nous sommes partis.</td></tr>\n                                <tr><td>un verbe</td><td>verbe + tellement / tant + que</td><td>Il travaille <b>tellement qu'</b>il en oublie de manger.</td></tr>\n                            </tbody>\n                        </table>\n                    </div>\n                    <p><b>La faute à ne pas commettre&nbsp;:</b> « si » ne se met jamais devant un nom. On dit <i>tellement de monde</i>, jamais « si monde ».</p>\n                </div>"
    }
   ],
   "ejercicios": []
  },
  {
   "titulo": "2. Exercices",
   "sous": "Series de práctica con corrección inmediata.",
   "rappels": [],
   "ejercicios": [
    0,
    1,
    2
   ]
  }
 ],
 "ejercicios": [
  {
   "t": "qcm",
   "etiqueta": "QCM 1",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "Il faisait ________ froid que les étudiants sont restés chez eux.",
     "o": [
      "puisque",
      "tellement",
      "grâce à"
     ],
     "r": 1,
     "note": "Exact&#8239;! «&#8239;Tellement / si + adjectif + que&#8239;» exprime l'intensité et sa conséquence."
    },
    {
     "enonce": "________ son travail acharné, elle a obtenu son diplôme avec mention.",
     "o": [
      "À cause de",
      "Grâce à",
      "Faute de"
     ],
     "r": 1,
     "note": "Exact&#8239;! «&#8239;Grâce à&#8239;» signale une cause dont le résultat est heureux."
    },
    {
     "enonce": "Le vol a été annulé ________ mauvais temps.",
     "o": [
      "grâce au",
      "en raison du",
      "malgré le"
     ],
     "r": 1,
     "note": "Exact&#8239;! «&#8239;En raison de&#8239;» est neutre et convient au registre administratif ou journalistique."
    },
    {
     "enonce": "Quel connecteur ne peut <b>pas</b> commencer une phrase&#8239;?",
     "o": [
      "Comme",
      "Puisque",
      "Car"
     ],
     "r": 2,
     "note": "Exact&#8239;! «&#8239;Car&#8239;» relie deux propositions et ne peut jamais ouvrir la phrase. Il appartient de surcroît au registre écrit."
    },
    {
     "enonce": "«&#8239;________ tu connais déjà la réponse, pourquoi poser la question&#8239;?&#8239;» (cause connue de tous)",
     "o": [
      "Puisque",
      "Parce que",
      "Car"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Puisque&#8239;» présente une cause déjà connue de l'interlocuteur, souvent avec une nuance d'évidence."
    }
   ]
  },
  {
   "t": "qcm",
   "etiqueta": "QCM 2",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "Il y avait ________ monde que nous n'avons pas pu entrer.",
     "o": [
      "tellement de",
      "tellement",
      "si"
     ],
     "r": 0,
     "note": "Exact&#8239;! Devant un <b>nom</b>, on emploie «&#8239;tellement de&#8239;» ou «&#8239;tant de&#8239;»."
    },
    {
     "enonce": "Quel connecteur relève du registre le plus <b>formel</b>&#8239;?",
     "o": [
      "Du coup",
      "Par conséquent",
      "Alors"
     ],
     "r": 1,
     "note": "Exact&#8239;! «&#8239;Par conséquent&#8239;» et «&#8239;en conséquence&#8239;» appartiennent au registre soutenu, courant dans les écrits administratifs."
    },
    {
     "enonce": "Elle travaille beaucoup&nbsp;; ________, elle réussit.",
     "o": [
      "c'est pourquoi",
      "parce que",
      "bien que"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;C'est pourquoi&#8239;» introduit la conséquence de ce qui précède."
    },
    {
     "enonce": "Après «&#8239;étant donné que&#8239;», quel mode employer&#8239;?",
     "o": [
      "L'indicatif",
      "Le subjonctif",
      "Le conditionnel"
     ],
     "r": 0,
     "note": "Exact&#8239;! Toutes les locutions de cause — parce que, puisque, comme, étant donné que, vu que — se construisent avec l'indicatif."
    },
    {
     "enonce": "Le train a été supprimé, ________ nous avons dû prendre le car.",
     "o": [
      "si bien que",
      "à cause de",
      "grâce à"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Si bien que&#8239;» introduit une conséquence et se construit avec une proposition complète."
    }
   ]
  },
  {
   "t": "trous",
   "etiqueta": "Saisie 1",
   "consigne": "Complétez, en écrivant le mot ou l’expression qui manque.",
   "sous": "Reponde en una palabra o expresión corta.",
   "q": [
    {
     "enonce": "Cause favorable&nbsp;: «&#8239;___ ton aide, j'ai terminé à temps.&#8239;» (deux mots)",
     "r": [
      "grâce à"
     ],
     "taille": 16,
     "note": "«&#8239;Grâce à&#8239;» + nom&nbsp;: la cause produit un résultat heureux."
    },
    {
     "enonce": "Cause défavorable&nbsp;: «&#8239;Le match a été reporté ___ la pluie.&#8239;» (trois mots)",
     "r": [
      "à cause de"
     ],
     "taille": 16,
     "note": "«&#8239;À cause de&#8239;» + nom&nbsp;: la cause entraîne une conséquence fâcheuse."
    },
    {
     "enonce": "Reliez par l'intensité&nbsp;: «&#8239;Le livre est passionnant. Je l'ai lu en une nuit.&#8239;» ➔ Le livre est ___ passionnant que je l'ai lu en une nuit.",
     "r": [
      "si",
      "tellement"
     ],
     "taille": 16,
     "note": "«&#8239;Si&#8239;» ou «&#8239;tellement&#8239;» + adjectif + «&#8239;que&#8239;»&nbsp;: l'intensité appelle sa conséquence."
    },
    {
     "enonce": "Registre soutenu&nbsp;: «&#8239;Les résultats sont insuffisants&nbsp;; ___, la formation sera prolongée.&#8239;» (deux mots)",
     "r": [
      "par conséquent",
      "en conséquence"
     ],
     "taille": 16,
     "note": "«&#8239;Par conséquent&#8239;» convient au registre formel, à l'écrit administratif comme à l'argumentation."
    },
    {
     "enonce": "Transformez en cause&nbsp;: «&#8239;Il pleuvait. Nous sommes rentrés.&#8239;» ➔ ___ il pleuvait, nous sommes rentrés. (cause en tête de phrase)",
     "r": [
      "comme"
     ],
     "taille": 16,
     "note": "«&#8239;Comme&#8239;» place la cause en tête et prépare la conséquence qui suit."
    }
   ]
  }
 ]
});
FICHAS.push({
 "id": "dos-b2-mod3",
 "tipo": "dossier",
 "ciclo": "Dossier B2",
 "fecha": "Dossier B2 · Module 3 / 8",
 "titulo": "La Forme Passive (module 3)",
 "resumen": "Renverser la perspective · La formation à tous les temps · Le complément d'agent : par ou de · Quand l'employer — et quand l'éviter",
 "intro": "La explicación del módulo, pantalla por pantalla, y 3 series de ejercicios que se corrigen solas, con su explicación.",
 "secciones": [
  {
   "titulo": "1. Règles et usages",
   "sous": "Lee cada explicación; puedes ver la traducción al español cuando la necesites.",
   "rappels": [
    {
     "titulo": "Renverser la perspective",
     "html": "<div class=\"encadre-grammaire\">\n                    <button class=\"btn-traduction\" onclick=\"toggleTrad('trad-3')\">🇪🇸 Ver en español</button>\n                    \n                    <p>À la voix active, le sujet accomplit l'action. À la voix passive, il la <b>subit</b>. Le complément d'objet direct de la phrase active devient sujet, et l'ancien sujet — s'il est mentionné — passe en complément d'agent.</p>\n\n                    <div class=\"schema\" role=\"img\" aria-label=\"Schéma de la transformation d'une phrase active en phrase passive : le complément d'objet devient sujet, le sujet devient complément d'agent.\">\n                        <svg viewBox=\"0 0 620 230\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <defs>\n                                <marker id=\"pointe-sauge\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\"\n                                        markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n                                    <path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"var(--sauge)\"/>\n                                </marker>\n                                <marker id=\"pointe-or\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\"\n                                        markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n                                    <path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"var(--or-academique)\"/>\n                                </marker>\n                            </defs>\n\n                            <text x=\"0\" y=\"14\" class=\"s-etiq\">VOIX ACTIVE</text>\n                            <rect x=\"0\" y=\"26\" width=\"150\" height=\"40\" rx=\"4\" class=\"s-sujet\"/>\n                            <text x=\"75\" y=\"51\" class=\"s-mot\">Le jury</text>\n                            <rect x=\"162\" y=\"26\" width=\"120\" height=\"40\" rx=\"4\" class=\"s-verbe\"/>\n                            <text x=\"222\" y=\"51\" class=\"s-mot s-clair\">a remis</text>\n                            <rect x=\"294\" y=\"26\" width=\"150\" height=\"40\" rx=\"4\" class=\"s-objet\"/>\n                            <text x=\"369\" y=\"51\" class=\"s-mot\">le prix</text>\n\n                            <path d=\"M 369 72 C 369 116, 75 108, 75 152\" class=\"s-fleche s-vers-sujet\"\n                                  marker-end=\"url(#pointe-sauge)\"/>\n                            <path d=\"M 75 72 C 75 120, 411 104, 411 152\" class=\"s-fleche s-vers-agent\"\n                                  marker-end=\"url(#pointe-or)\"/>\n\n                            <text x=\"196\" y=\"100\" class=\"s-note s-note-sauge\">devient sujet</text>\n                            <text x=\"196\" y=\"130\" class=\"s-note s-note-or\">devient agent</text>\n\n                            <text x=\"0\" y=\"176\" class=\"s-etiq\">VOIX PASSIVE</text>\n                            <rect x=\"0\" y=\"186\" width=\"150\" height=\"40\" rx=\"4\" class=\"s-objet\"/>\n                            <text x=\"75\" y=\"211\" class=\"s-mot\">Le prix</text>\n                            <rect x=\"162\" y=\"186\" width=\"160\" height=\"40\" rx=\"4\" class=\"s-verbe\"/>\n                            <text x=\"242\" y=\"211\" class=\"s-mot s-clair\">a été remis</text>\n                            <rect x=\"336\" y=\"186\" width=\"150\" height=\"40\" rx=\"4\" class=\"s-agent\"/>\n                            <text x=\"411\" y=\"211\" class=\"s-mot\">par le jury</text>\n                        </svg>\n                    </div>\n\n                    <p>Le sens ne change pas&nbsp;: ce qui change, c'est <b>ce que la phrase met au premier plan</b>. « Le prix a été remis » attire l'attention sur le prix&nbsp;; « Le jury a remis le prix » sur le jury.</p>\n\n                    <div id=\"trad-3\" class=\"texte-espanol\">\n                        <b>Traducción explicativa :</b><br>\n                        La voz pasiva invierte la perspectiva: el objeto directo pasa a ser sujeto paciente y el sujeto original se convierte en complemento agente, introducido por <i>par</i> o <i>de</i>. Se construye con el auxiliar <i>être</i> conjugado más el participio pasado, que concuerda siempre en género y número con el sujeto. Ejemplo: \"El premio fue entregado por el jurado\".<br><br>\n                        Cuidado con un falso amigo estructural: en español el auxiliar de los tiempos compuestos es <i>haber</i>, mientras que en francés la pasiva usa <i>être</i> en todos los tiempos. <i>A été choisi</i> equivale a \"fue elegido\", no a \"ha sido elegido por sí mismo\".\n                    </div>\n                </div>"
    },
    {
     "titulo": "La formation à tous les temps",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Une seule règle, valable partout&nbsp;: on conjugue <code>être</code> au temps du verbe actif, puis on ajoute le <code>participe passé</code>. C'est donc l'auxiliaire qui porte le temps, jamais le participe.</p>\n\n                    <div class=\"enveloppe-tableau\">\n                        <table class=\"tableau-temps\">\n                            <thead>\n                                <tr><th>Temps</th><th>Voix active</th><th>Voix passive</th></tr>\n                            </thead>\n                            <tbody>\n                                <tr><td>Présent</td><td>Le jury choisit le lauréat.</td><td>Le lauréat <b>est choisi</b> par le jury.</td></tr>\n                                <tr><td>Imparfait</td><td>Le jury choisissait…</td><td>Le lauréat <b>était choisi</b>…</td></tr>\n                                <tr><td>Passé composé</td><td>Le jury a choisi…</td><td>Le lauréat <b>a été choisi</b>…</td></tr>\n                                <tr><td>Plus-que-parfait</td><td>Le jury avait choisi…</td><td>Le lauréat <b>avait été choisi</b>…</td></tr>\n                                <tr><td>Futur simple</td><td>Le jury choisira…</td><td>Le lauréat <b>sera choisi</b>…</td></tr>\n                                <tr><td>Conditionnel</td><td>Le jury choisirait…</td><td>Le lauréat <b>serait choisi</b>…</td></tr>\n                                <tr><td>Subjonctif</td><td>… que le jury choisisse…</td><td>… que le lauréat <b>soit choisi</b>…</td></tr>\n                            </tbody>\n                        </table>\n                    </div>\n\n                    <p><b>L'accord est obligatoire.</b> Le participe passé s'accorde toujours en genre et en nombre avec le sujet — c'est l'erreur la plus fréquente à ce niveau.</p>\n\n                    <div class=\"schema\" role=\"img\" aria-label=\"Schéma de l'accord du participe passé avec le sujet, aux quatre genres et nombres.\">\n                        <svg viewBox=\"0 0 620 150\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <text x=\"0\" y=\"16\" class=\"s-etiq\">L'ACCORD SUIT LE SUJET</text>\n                            <text x=\"0\" y=\"48\" class=\"s-ex\">Le dossier</text>\n                            <text x=\"150\" y=\"48\" class=\"s-ex s-gris\">est</text>\n                            <text x=\"200\" y=\"48\" class=\"s-ex\">accepté</text>\n                            <text x=\"0\" y=\"80\" class=\"s-ex\">La demande</text>\n                            <text x=\"150\" y=\"80\" class=\"s-ex s-gris\">est</text>\n                            <text x=\"200\" y=\"80\" class=\"s-ex\">accepté<tspan class=\"s-marque\">e</tspan></text>\n                            <text x=\"0\" y=\"112\" class=\"s-ex\">Les dossiers</text>\n                            <text x=\"150\" y=\"112\" class=\"s-ex s-gris\">sont</text>\n                            <text x=\"200\" y=\"112\" class=\"s-ex\">accepté<tspan class=\"s-marque\">s</tspan></text>\n                            <text x=\"0\" y=\"144\" class=\"s-ex\">Les demandes</text>\n                            <text x=\"150\" y=\"144\" class=\"s-ex s-gris\">sont</text>\n                            <text x=\"200\" y=\"144\" class=\"s-ex\">accepté<tspan class=\"s-marque\">es</tspan></text>\n                        </svg>\n                    </div>\n                </div>"
    },
    {
     "titulo": "Le complément d'agent : par ou de",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Quand on précise qui accomplit l'action, deux prépositions sont possibles, et le choix n'est pas libre.</p>\n                    <ul>\n                        <li><b>par</b> — action concrète, ponctuelle, avec un agent qui agit véritablement.\n                            <div class=\"exemple\">La loi a été votée <b>par</b> l'Assemblée.<span class=\"fleche\">·</span>Le tableau a été restauré <b>par</b> un spécialiste.</div>\n                        </li>\n                        <li><b>de</b> — verbes de sentiment, d'opinion ou de description, où l'agent n'agit pas mais caractérise un état.\n                            <div class=\"exemple\">Il est <b>respecté de</b> tous.<span class=\"fleche\">·</span>La place était <b>bordée d'</b>arbres.<span class=\"fleche\">·</span>Elle est <b>connue de</b> ses collègues.</div>\n                        </li>\n                    </ul>\n                    <p>À retenir pour « de »&nbsp;: <code>aimé</code>, <code>respecté</code>, <code>apprécié</code>, <code>connu</code>, <code>estimé</code>, <code>suivi</code>, <code>précédé</code>, <code>entouré</code>, <code>couvert</code>, <code>bordé</code>, <code>rempli</code>.</p>\n                </div>"
    },
    {
     "titulo": "Quand l'employer — et quand l'éviter",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Le passif n'est pas un ornement&nbsp;: il répond à des besoins précis, et le plus souvent <b>sans complément d'agent</b>.</p>\n                    <ul>\n                        <li><b>L'auteur de l'action est inconnu.</b> <i>Trois toiles ont été volées cette nuit.</i></li>\n                        <li><b>Il est évident ou sans intérêt.</b> <i>Le musée sera fermé lundi.</i></li>\n                        <li><b>On veut mettre le résultat en avant</b>, dans la presse et les textes administratifs. <i>La réforme a été adoptée.</i></li>\n                        <li><b>On préfère ne pas nommer le responsable.</b> <i>Des erreurs ont été commises.</i></li>\n                    </ul>\n                    <p>En revanche, le français parlé recourt beaucoup moins au passif que l'espagnol ou l'anglais. Trois tournures actives le remplacent avantageusement&nbsp;:</p>\n                    <div class=\"exemple\">\n                        <b>on</b> + verbe actif<span class=\"fleche\">➔</span><i>On a volé trois toiles.</i><br>\n                        <b>se faire</b> + infinitif<span class=\"fleche\">➔</span><i>Il s'est fait voler son sac.</i><br>\n                        forme <b>pronominale</b> de sens passif<span class=\"fleche\">➔</span><i>Ce plat se mange froid.</i>\n                    </div>\n                </div>"
    }
   ],
   "ejercicios": []
  },
  {
   "titulo": "2. Exercices",
   "sous": "Series de práctica con corrección inmediata.",
   "rappels": [],
   "ejercicios": [
    0,
    1,
    2
   ]
  }
 ],
 "ejercicios": [
  {
   "t": "qcm",
   "etiqueta": "QCM 1",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "«&#8239;Le Comité international olympique <b>a choisi</b> un pays.&#8239;» ➔ Un pays ________ par le Comité.",
     "o": [
      "a choisi",
      "a été choisi",
      "est choisissant"
     ],
     "r": 1,
     "note": "Exact ! Le passé composé actif «&#8239;a choisi&#8239;» donne au passif «&#8239;a été choisi&#8239;»&nbsp;: l'auxiliaire «&#8239;être&#8239;» se met au passé composé."
    },
    {
     "enonce": "La cérémonie ________ par le maire de la ville la semaine dernière.",
     "o": [
      "a été ouverte",
      "a ouvert",
      "est ouvrante"
     ],
     "r": 0,
     "note": "Parfait ! Passé composé passif, et le participe s'accorde avec «&#8239;la cérémonie&#8239;»&nbsp;: ouvert<b>e</b>."
    },
    {
     "enonce": "Accord du participe&nbsp;: «&#8239;Les nouvelles mesures ________ par le ministère.&#8239;»",
     "o": [
      "a été annoncé",
      "ont été annoncées",
      "ont été annoncé"
     ],
     "r": 1,
     "note": "Exact ! «&#8239;Les mesures&#8239;» est féminin pluriel&nbsp;: ont été annoncé<b>es</b>. Le participe passé passif s'accorde toujours avec le sujet."
    },
    {
     "enonce": "Complément d'agent&nbsp;: «&#8239;Ce professeur est respecté ________ tous ses étudiants.&#8239;»",
     "o": [
      "par",
      "de",
      "avec"
     ],
     "r": 1,
     "note": "Exact ! Après les verbes de sentiment ou d'état (aimé, respecté, connu, apprécié, estimé), l'agent s'introduit par «&#8239;de&#8239;»."
    },
    {
     "enonce": "«&#8239;La vallée était couverte ________ neige.&#8239;»",
     "o": [
      "par la",
      "de",
      "pour la"
     ],
     "r": 1,
     "note": "Exact ! Les verbes de description (couvert, entouré, bordé, rempli, précédé, suivi) prennent «&#8239;de&#8239;»."
    }
   ]
  },
  {
   "t": "qcm",
   "etiqueta": "QCM 2",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "Quel énoncé relève du <b>registre journalistique</b> le plus courant ?",
     "o": [
      "On a arrêté trois suspects hier soir.",
      "Trois suspects ont été arrêtés hier soir.",
      "Trois suspects, ils les ont arrêtés hier soir."
     ],
     "r": 1,
     "note": "Exact ! Le passif sans agent met l'événement au premier plan et laisse l'auteur de l'action dans l'ombre&nbsp;: c'est la marque du style journalistique."
    },
    {
     "enonce": "Futur simple passif&nbsp;: «&#8239;Les résultats ________ la semaine prochaine.&#8239;»",
     "o": [
      "seront publiés",
      "auront publié",
      "sont publiant"
     ],
     "r": 0,
     "note": "Exact ! «&#8239;Être&#8239;» au futur simple + participe passé accordé&nbsp;: seront publié<b>s</b>."
    },
    {
     "enonce": "Imparfait passif&nbsp;: «&#8239;À cette époque, le courrier ________ à cheval.&#8239;»",
     "o": [
      "était transporté",
      "a été transporté",
      "serait transporté"
     ],
     "r": 0,
     "note": "Exact ! L'imparfait décrit une habitude passée&nbsp;: «&#8239;était&#8239;» + participe passé."
    },
    {
     "enonce": "Pourquoi l'agent est-il absent dans «&#8239;Ce pont a été construit en 1885&#8239;» ?",
     "o": [
      "Parce que la phrase est incorrecte sans agent.",
      "Parce que l'auteur de l'action est inconnu ou sans intérêt ici.",
      "Parce que le passif interdit le complément d'agent."
     ],
     "r": 1,
     "note": "Exact ! On omet l'agent quand il est inconnu, évident, ou quand seul le résultat compte. C'est la raison d'être principale du passif."
    },
    {
     "enonce": "Quelle phrase exprime le <b>même sens</b> que «&#8239;On a volé son sac.&#8239;» ?",
     "o": [
      "Il s'est fait voler son sac.",
      "Il a volé son sac.",
      "Son sac s'est volé."
     ],
     "r": 0,
     "note": "Exact ! «&#8239;Se faire + infinitif&#8239;» exprime un passif où le sujet subit l'action&nbsp;: très fréquent à l'oral."
    }
   ]
  },
  {
   "t": "trous",
   "etiqueta": "Saisie 1",
   "consigne": "Complétez, en écrivant le mot ou l’expression qui manque.",
   "sous": "Reponde en una palabra o expresión corta.",
   "q": [
    {
     "enonce": "Mettez au passif&nbsp;: «&#8239;Le jury <b>remettra</b> le prix.&#8239;» ➔ Le prix ___ par le jury.",
     "r": [
      "sera remis"
     ],
     "taille": 16,
     "note": "Futur simple passif&nbsp;: «&#8239;être&#8239;» au futur + participe accordé au masculin singulier."
    },
    {
     "enonce": "Mettez au passif&nbsp;: «&#8239;Les élèves <b>ont écrit</b> ces lettres.&#8239;» ➔ Ces lettres ___ par les élèves.",
     "r": [
      "ont été écrites"
     ],
     "taille": 16,
     "note": "Passé composé passif, avec accord au féminin pluriel&nbsp;: écrit<b>es</b>."
    },
    {
     "enonce": "Repassez à l'actif&nbsp;: «&#8239;Ce roman a été traduit par une universitaire.&#8239;» ➔ Une universitaire ___ ce roman.",
     "r": [
      "a traduit"
     ],
     "taille": 16,
     "note": "À l'actif, l'agent devient sujet et le participe ne s'accorde plus&nbsp;: «&#8239;a traduit&#8239;»."
    },
    {
     "enonce": "Complétez au présent passif&nbsp;: «&#8239;Chaque année, ce festival ___ (organiser) par la mairie.&#8239;»",
     "r": [
      "est organisé"
     ],
     "taille": 16,
     "note": "Présent passif&nbsp;: «&#8239;est&#8239;» + participe passé, accordé au masculin singulier avec «&#8239;ce festival&#8239;»."
    },
    {
     "enonce": "Évitez le passif avec «&#8239;on&#8239;»&nbsp;: «&#8239;La décision a été prise hier.&#8239;» ➔ ___ la décision hier.",
     "r": [
      "on a pris"
     ],
     "taille": 16,
     "note": "«&#8239;On&#8239;» permet de garder l'agent indéterminé tout en revenant à une tournure active, plus naturelle à l'oral."
    }
   ]
  }
 ]
});
FICHAS.push({
 "id": "dos-b2-mod4",
 "tipo": "dossier",
 "ciclo": "Dossier B2",
 "fecha": "Dossier B2 · Module 4 / 8",
 "titulo": "Pronoms Démonstratifs & Possessifs (module 4)",
 "resumen": "Deux familles, deux fonctions · Les démonstratifs : celui, celle, ceux, celles · Les possessifs : le mien, le tien, le sien…",
 "intro": "La explicación del módulo, pantalla por pantalla, y 3 series de ejercicios que se corrigen solas, con su explicación.",
 "secciones": [
  {
   "titulo": "1. Règles et usages",
   "sous": "Lee cada explicación; puedes ver la traducción al español cuando la necesites.",
   "rappels": [
    {
     "titulo": "Deux familles, deux fonctions",
     "html": "<div class=\"encadre-grammaire\">\n                    <button class=\"btn-traduction\" onclick=\"toggleTrad('trad-4')\">🇪🇸 Ver en español</button>\n                    \n                    <p>Ces pronoms servent tous à ne pas répéter un nom déjà cité. Ils se distinguent par ce qu'ils indiquent&nbsp;: le <b>démonstratif</b> montre et désigne&nbsp;; le <b>possessif</b> attribue.</p>\n\n                    <div class=\"schema\" role=\"img\" aria-label=\"Comparaison entre le pronom démonstratif, qui désigne, et le pronom possessif, qui attribue un possesseur.\">\n                        <svg viewBox=\"0 0 620 180\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <text x=\"0\" y=\"14\" class=\"s-etiq\">DÉMONSTRATIF · IL DÉSIGNE</text>\n                            <rect x=\"0\" y=\"26\" width=\"290\" height=\"56\" rx=\"4\" class=\"s-objet\"/>\n                            <text x=\"145\" y=\"50\" class=\"s-mot\">celui de Paul</text>\n                            <text x=\"145\" y=\"70\" class=\"s-lgd s-gris\">il exige une suite : de, qui, que, -ci, -là</text>\n\n                            <text x=\"330\" y=\"14\" class=\"s-etiq\">POSSESSIF · IL ATTRIBUE</text>\n                            <rect x=\"330\" y=\"26\" width=\"290\" height=\"56\" rx=\"4\" class=\"s-sujet\"/>\n                            <text x=\"475\" y=\"50\" class=\"s-mot\">le mien</text>\n                            <text x=\"475\" y=\"70\" class=\"s-lgd s-gris\">il se suffit à lui-même, avec son article</text>\n\n                            <text x=\"0\" y=\"112\" class=\"s-ex s-petit\">« Ce vélo n'est pas <tspan class=\"s-souligne\">le mien</tspan>, c'est <tspan class=\"s-souligne\">celui de</tspan> mon frère. »</text>\n                            <text x=\"0\" y=\"140\" class=\"s-connecteurs\">Un seul et même nom — « vélo » — repris deux fois sans jamais être répété.</text>\n                            <text x=\"0\" y=\"164\" class=\"s-connecteurs\">Faute courante : « celui » employé seul, ou « le mien de mon frère ».</text>\n                        </svg>\n                    </div>\n\n                    <div id=\"trad-4\" class=\"texte-espanol\">\n                        <b>Traducción explicativa :</b><br>\n                        • Demostrativos (<i>celui, celle, ceux, celles</i>) equivalen a \"el de…\", \"la de…\", \"los que…\".<br>\n                        • Posesivos (<i>le mien, la tienne, les nôtres</i>) equivalen a \"el mío\", \"la tuya\", \"los nuestros\".<br><br>\n                        Diferencia clave con el español: el pronombre posesivo francés <b>siempre lleva artículo</b> (<i>le mien</i>, no \"mien\"), y <i>celui</i> <b>nunca puede ir solo</b>: exige un complemento (<i>celui de</i>, <i>celui qui</i>) o un sufijo (<i>celui-ci</i>). En español \"el mío\" y \"el de Pablo\" funcionan igual, pero conviene no calcar \"el mío de mi hermano\", que en francés es un error.\n                    </div>\n                </div>"
    },
    {
     "titulo": "Les démonstratifs : celui, celle, ceux, celles",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Ils reprennent un nom précis et s'accordent avec lui. <b>Ils ne s'emploient jamais seuls</b>&nbsp;: il leur faut toujours un prolongement.</p>\n                    <div class=\"enveloppe-tableau\">\n                        <table class=\"tableau-temps\">\n                            <thead><tr><th></th><th>Singulier</th><th>Pluriel</th></tr></thead>\n                            <tbody>\n                                <tr><td>Masculin</td><td>celui</td><td>ceux</td></tr>\n                                <tr><td>Féminin</td><td>celle</td><td>celles</td></tr>\n                            </tbody>\n                        </table>\n                    </div>\n                    <p>Trois prolongements possibles&nbsp;:</p>\n                    <div class=\"exemple\">\n                        + <b>de</b> ➔ <i>Mon bureau et <b>celui de</b> ma collègue.</i><br>\n                        + <b>qui / que / dont</b> ➔ <i><b>Ceux qui</b> arrivent en retard attendront.</i><br>\n                        + <b>-ci / -là</b> ➔ <i>Je prends <b>celle-ci</b>, pas <b>celle-là</b>.</i>\n                    </div>\n                    <p><b>Les neutres&nbsp;:</b> <code>ce</code>, <code>ceci</code>, <code>cela</code>, <code>ça</code> ne remplacent pas un nom mais une idée entière. <i>Cela m'inquiète</i> — c'est la situation qui inquiète, non un objet précis.</p>\n                </div>"
    },
    {
     "titulo": "Les possessifs : le mien, le tien, le sien…",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Ils portent l'article défini et s'accordent avec <b>l'objet possédé</b>, jamais avec le possesseur.</p>\n                    <div class=\"enveloppe-tableau\">\n                        <table class=\"tableau-temps\">\n                            <thead><tr><th>Possesseur</th><th>Masc. sing.</th><th>Fém. sing.</th><th>Pluriel</th></tr></thead>\n                            <tbody>\n                                <tr><td>je</td><td>le mien</td><td>la mienne</td><td>les miens / miennes</td></tr>\n                                <tr><td>tu</td><td>le tien</td><td>la tienne</td><td>les tiens / tiennes</td></tr>\n                                <tr><td>il / elle</td><td>le sien</td><td>la sienne</td><td>les siens / siennes</td></tr>\n                                <tr><td>nous</td><td>le nôtre</td><td>la nôtre</td><td>les nôtres</td></tr>\n                                <tr><td>vous</td><td>le vôtre</td><td>la vôtre</td><td>les vôtres</td></tr>\n                                <tr><td>ils / elles</td><td>le leur</td><td>la leur</td><td>les leurs</td></tr>\n                            </tbody>\n                        </table>\n                    </div>\n                    <p><b>L'accent circonflexe distingue tout&nbsp;:</b> <i>notre</i> et <i>votre</i> sont des adjectifs et accompagnent un nom&nbsp;; <i>le nôtre</i> et <i>le vôtre</i> sont des pronoms et le remplacent. La prononciation diffère également&nbsp;: le pronom a une voyelle fermée et longue.</p>\n                </div>"
    }
   ],
   "ejercicios": []
  },
  {
   "titulo": "2. Exercices",
   "sous": "Series de práctica con corrección inmediata.",
   "rappels": [],
   "ejercicios": [
    0,
    1,
    2
   ]
  }
 ],
 "ejercicios": [
  {
   "t": "qcm",
   "etiqueta": "QCM 1",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "J'ai oublié mes lunettes, tu peux me prêter ________&#8239;? (tes lunettes)",
     "o": [
      "celles",
      "les tiennes",
      "la tienne"
     ],
     "r": 1,
     "note": "Exact&#8239;! Possessif féminin pluriel&nbsp;: «&#8239;les tiennes&#8239;» remplace «&#8239;tes lunettes&#8239;»."
    },
    {
     "enonce": "Ce n'est pas mon manteau, c'est ________ de ma sœur.",
     "o": [
      "celui",
      "celle",
      "le sien"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Celui de&#8239;» remplace «&#8239;le manteau de&#8239;», masculin singulier."
    },
    {
     "enonce": "Quelle forme complète correctement&nbsp;: «&#8239;Les résultats de Marie sont meilleurs que ________&#8239;»&#8239;?",
     "o": [
      "les miens",
      "le mien",
      "la mienne"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Les résultats&#8239;» est masculin pluriel&nbsp;: «&#8239;les miens&#8239;»."
    },
    {
     "enonce": "À quoi sert le suffixe «&#8239;-ci&#8239;» dans «&#8239;celui-ci&#8239;»&#8239;?",
     "o": [
      "À désigner ce qui est proche ou vient d'être mentionné.",
      "À marquer le pluriel.",
      "À indiquer la possession."
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;-ci&#8239;» renvoie au proche ou au dernier élément cité&#8239;; «&#8239;-là&#8239;» au lointain ou au premier cité."
    },
    {
     "enonce": "Complétez&nbsp;: «&#8239;________ qui veulent participer doivent s'inscrire.&#8239;»",
     "o": [
      "Ceux",
      "Celui",
      "Ce"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Ceux qui&#8239;» désigne un ensemble de personnes, masculin pluriel."
    }
   ]
  },
  {
   "t": "qcm",
   "etiqueta": "QCM 2",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "«&#8239;Notre&#8239;» ou «&#8239;le nôtre&#8239;»&nbsp;: quelle est la différence&#8239;?",
     "o": [
      "« Notre » accompagne un nom, « le nôtre » le remplace.",
      "Les deux sont interchangeables.",
      "« Le nôtre » accompagne un nom, « notre » le remplace."
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Notre voiture&#8239;» (adjectif + nom) devient «&#8239;la nôtre&#8239;» (pronom, seul). Notez l'accent circonflexe du pronom."
    },
    {
     "enonce": "Ils ont perdu leurs clés et nous avons perdu ________.",
     "o": [
      "les nôtres",
      "les leurs",
      "la nôtre"
     ],
     "r": 0,
     "note": "Exact&#8239;! Le possesseur est «&#8239;nous&#8239;»&nbsp;: «&#8239;les nôtres&#8239;», féminin pluriel comme «&#8239;clés&#8239;»."
    },
    {
     "enonce": "Quel pronom neutre convient&nbsp;: «&#8239;________ m'étonne beaucoup.&#8239;» (en parlant d'un fait)",
     "o": [
      "Cela",
      "Celui",
      "Celle"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Cela&#8239;» (ou «&#8239;ça&#8239;» à l'oral) reprend une idée, un fait, jamais une personne."
    },
    {
     "enonce": "Repérez la forme correcte&nbsp;:",
     "o": [
      "C'est le livre de Paul et celui de Marie.",
      "C'est le livre de Paul et celui Marie.",
      "C'est le livre de Paul et le sien de Marie."
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Celui&#8239;» exige un complément&nbsp;: «&#8239;celui de Marie&#8239;»."
    },
    {
     "enonce": "J'hésite entre ces deux vestes&nbsp;: ________ est plus chaude, mais ________ est plus élégante.",
     "o": [
      "celle-ci … celle-là",
      "celui-ci … celui-là",
      "ceci … cela"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Veste&#8239;» est féminin&nbsp;: «&#8239;celle-ci&#8239;» désigne la plus proche, «&#8239;celle-là&#8239;» l'autre."
    }
   ]
  },
  {
   "t": "trous",
   "etiqueta": "Saisie 1",
   "consigne": "Complétez, en écrivant le mot ou l’expression qui manque.",
   "sous": "Reponde en una palabra o expresión corta.",
   "q": [
    {
     "enonce": "Remplacez «&#8239;ma voiture&#8239;»&nbsp;: «&#8239;Ta voiture est plus rapide que ___.&#8239;» (deux mots)",
     "r": [
      "la mienne"
     ],
     "taille": 16,
     "note": "Possessif féminin singulier, avec l'article&nbsp;: «&#8239;la mienne&#8239;»."
    },
    {
     "enonce": "Complétez avec un démonstratif&nbsp;: «&#8239;Prends ce dossier et donne-moi ___ qui est sur le bureau.&#8239;»",
     "r": [
      "celui"
     ],
     "taille": 16,
     "note": "«&#8239;Celui qui&#8239;» reprend «&#8239;dossier&#8239;», masculin singulier."
    },
    {
     "enonce": "Évitez la répétition&nbsp;: «&#8239;Les problèmes de la ville et les problèmes de la campagne.&#8239;» ➔ Les problèmes de la ville et ___ de la campagne. (deux mots)",
     "r": [
      "ceux"
     ],
     "taille": 16,
     "note": "«&#8239;Ceux de&#8239;» évite la répétition du nom masculin pluriel."
    },
    {
     "enonce": "Possessif de la 3ᵉ personne du pluriel&nbsp;: «&#8239;Nos enfants jouent avec ___.&#8239;» (les enfants d'eux, deux mots)",
     "r": [
      "les leurs"
     ],
     "taille": 16,
     "note": "«&#8239;Les leurs&#8239;»&nbsp;: plusieurs possesseurs, objet possédé au pluriel."
    },
    {
     "enonce": "Neutre&nbsp;: «&#8239;Il est arrivé en retard, et ___ ne m'a pas surpris.&#8239;» (un mot)",
     "r": [
      "cela",
      "ça"
     ],
     "taille": 16,
     "note": "«&#8239;Cela&#8239;» reprend l'ensemble du fait qui précède&#8239;; «&#8239;ça&#8239;» convient à l'oral."
    }
   ]
  }
 ]
});
FICHAS.push({
 "id": "dos-b2-mod5",
 "tipo": "dossier",
 "ciclo": "Dossier B2",
 "fecha": "Dossier B2 · Module 5 / 8",
 "titulo": "Conditionnel & Expression du But (module 5)",
 "resumen": "La règle des deux sujets · Le conditionnel présent : formation · Quatre emplois du conditionnel · Le but : nuances et registres",
 "intro": "La explicación del módulo, pantalla por pantalla, y 3 series de ejercicios que se corrigen solas, con su explicación.",
 "secciones": [
  {
   "titulo": "1. Règles et usages",
   "sous": "Lee cada explicación; puedes ver la traducción al español cuando la necesites.",
   "rappels": [
    {
     "titulo": "La règle des deux sujets",
     "html": "<div class=\"encadre-grammaire\">\n                    <button class=\"btn-traduction\" onclick=\"toggleTrad('trad-5')\">🇪🇸 Ver en español</button>\n                    \n                    <p>Pour exprimer le but, une seule question commande le choix&nbsp;: <b>qui fait quoi&nbsp;?</b> Si le même sujet accomplit les deux actions, on emploie l'infinitif. S'ils diffèrent, il faut une conjonction et le subjonctif.</p>\n\n                    <div class=\"schema\" role=\"img\" aria-label=\"Schéma de la règle du choix entre infinitif et subjonctif selon que les deux verbes partagent ou non le même sujet.\">\n                        <svg viewBox=\"0 0 620 210\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <text x=\"310\" y=\"16\" class=\"s-note s-note-or\">LES DEUX VERBES ONT-ILS LE MÊME SUJET ?</text>\n\n                            <path d=\"M 310 26 L 310 44 L 150 44 L 150 60\" class=\"s-lien\"/>\n                            <path d=\"M 310 26 L 310 44 L 470 44 L 470 60\" class=\"s-lien\"/>\n\n                            <text x=\"150\" y=\"76\" class=\"s-etiq2 s-note-sauge\">OUI · UN SEUL SUJET</text>\n                            <rect x=\"20\" y=\"86\" width=\"260\" height=\"44\" rx=\"4\" class=\"s-objet\"/>\n                            <text x=\"150\" y=\"105\" class=\"s-mot\">pour · afin de</text>\n                            <text x=\"150\" y=\"123\" class=\"s-lgd s-gris\">+ infinitif</text>\n                            <text x=\"150\" y=\"154\" class=\"s-ex s-petit s-centre\">Elle révise <tspan class=\"s-souligne\">pour réussir</tspan>.</text>\n                            <text x=\"150\" y=\"176\" class=\"s-connecteurs s-centre\">elle révise / elle réussit</text>\n\n                            <text x=\"470\" y=\"76\" class=\"s-etiq2 s-note-or\">NON · DEUX SUJETS</text>\n                            <rect x=\"340\" y=\"86\" width=\"260\" height=\"44\" rx=\"4\" class=\"s-sujet\"/>\n                            <text x=\"470\" y=\"105\" class=\"s-mot\">pour que · afin que</text>\n                            <text x=\"470\" y=\"123\" class=\"s-lgd s-gris\">+ subjonctif</text>\n                            <text x=\"470\" y=\"154\" class=\"s-ex s-petit s-centre\">Elle explique <tspan class=\"s-souligne\">pour qu'ils comprennent</tspan>.</text>\n                            <text x=\"470\" y=\"176\" class=\"s-connecteurs s-centre\">elle explique / ils comprennent</text>\n\n                            <text x=\"310\" y=\"202\" class=\"s-connecteurs s-centre\">Erreur la plus fréquente : « pour que » suivi de l'indicatif, ou « pour » suivi d'une proposition.</text>\n                        </svg>\n                    </div>\n\n                    <div id=\"trad-5\" class=\"texte-espanol\">\n                        <b>Traducción explicativa :</b><br>\n                        • Condicional: expresa hipótesis, deseo o cortesía (\"habría\", \"sería\", \"querría\").<br>\n                        • Finalidad: <i>pour / afin de</i> + infinitivo si el sujeto es el mismo; <i>pour que / afin que</i> + subjuntivo si los sujetos cambian.<br><br>\n                        La regla es idéntica en español (\"para estudiar\" frente a \"para que estudien\"), así que puedes apoyarte en tu lengua. La diferencia está en la forma del subjuntivo francés, que hay que memorizar aparte, y en un detalle: tras <i>si</i> el francés <b>nunca</b> admite condicional, mientras que en español \"si tendría\" también es incorrecto pero se oye con frecuencia. Regla fija: <i>si</i> + imperfecto ➔ condicional.\n                    </div>\n                </div>"
    },
    {
     "titulo": "Le conditionnel présent : formation",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Une seule recette, sans exception&nbsp;: <b>le radical du futur simple</b>, auquel on ajoute <b>les terminaisons de l'imparfait</b> (-ais, -ais, -ait, -ions, -iez, -aient).</p>\n                    <div class=\"enveloppe-tableau\">\n                        <table class=\"tableau-temps\">\n                            <thead><tr><th>Infinitif</th><th>Futur (radical)</th><th>Conditionnel présent</th></tr></thead>\n                            <tbody>\n                                <tr><td>parler</td><td>je parler-ai</td><td>je parler<b>ais</b></td></tr>\n                                <tr><td>finir</td><td>je finir-ai</td><td>je finir<b>ais</b></td></tr>\n                                <tr><td>être</td><td>je ser-ai</td><td>je ser<b>ais</b></td></tr>\n                                <tr><td>avoir</td><td>j'aur-ai</td><td>j'aur<b>ais</b></td></tr>\n                                <tr><td>aller</td><td>j'ir-ai</td><td>j'ir<b>ais</b></td></tr>\n                                <tr><td>pouvoir</td><td>je pourr-ai</td><td>je pourr<b>ais</b></td></tr>\n                                <tr><td>vouloir</td><td>je voudr-ai</td><td>je voudr<b>ais</b></td></tr>\n                                <tr><td>faire</td><td>je fer-ai</td><td>je fer<b>ais</b></td></tr>\n                            </tbody>\n                        </table>\n                    </div>\n                    <p>Les verbes irréguliers au futur le restent au conditionnel&nbsp;: le radical se retient une seule fois pour les deux temps.</p>\n                </div>"
    },
    {
     "titulo": "Quatre emplois du conditionnel",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <ul>\n                        <li><b>La politesse</b> — l'emploi le plus quotidien. Il transforme l'exigence en demande.\n                            <div class=\"exemple\">Je <b>voudrais</b> un renseignement.<span class=\"fleche\">·</span><b>Pourriez</b>-vous répéter&nbsp;?</div>\n                        </li>\n                        <li><b>Le souhait et l'imaginaire</b> — pour décrire ce qui n'existe pas encore.\n                            <div class=\"exemple\">Dans ma classe idéale, il y <b>aurait</b> de grandes fenêtres.</div>\n                        </li>\n                        <li><b>L'hypothèse</b> — après une proposition en « si ».\n                            <div class=\"exemple\"><b>Si</b> j'<b>avais</b> le temps, je <b>suivrais</b> ce cours.</div>\n                        </li>\n                        <li><b>L'information non confirmée</b> — courante dans la presse.\n                            <div class=\"exemple\">Le ministre <b>aurait</b> démissionné.</div>\n                        </li>\n                    </ul>\n                    <p><b>La règle absolue&nbsp;:</b> jamais de conditionnel directement après « si ». On écrit <i>si j'avais</i>, jamais « si j'aurais ».</p>\n                </div>"
    },
    {
     "titulo": "Le but : nuances et registres",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <ul>\n                        <li><b>pour</b> + infinitif — la forme la plus courante, tous registres.</li>\n                        <li><b>afin de</b> + infinitif — même sens, registre plus soutenu.</li>\n                        <li><b>pour que / afin que</b> + subjonctif — quand les sujets diffèrent.</li>\n                        <li><b>de peur que / de crainte que</b> + subjonctif — le but <b>négatif</b>, ce qu'on veut éviter.\n                            <div class=\"exemple\">Elle est partie tôt <b>de peur qu'</b>il n'y <b>ait</b> des embouteillages.</div>\n                        </li>\n                        <li><b>en vue de / dans le but de</b> + nom ou infinitif — registre administratif.</li>\n                    </ul>\n                    <p>Ne confondez pas le but et la cause&nbsp;: le but n'est pas encore réalisé, il est <b>visé</b>&nbsp;; la cause, elle, précède et explique.</p>\n                </div>"
    }
   ],
   "ejercicios": []
  },
  {
   "titulo": "2. Exercices",
   "sous": "Series de práctica con corrección inmediata.",
   "rappels": [],
   "ejercicios": [
    0,
    1,
    2
   ]
  }
 ],
 "ejercicios": [
  {
   "t": "qcm",
   "etiqueta": "QCM 1",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "Il travaille dur ________ ses parents soient fiers de lui.",
     "o": [
      "pour",
      "pour que",
      "afin de"
     ],
     "r": 1,
     "note": "Exact&#8239;! Sujets différents (il / ses parents) ➔ «&#8239;pour que&#8239;» + subjonctif."
    },
    {
     "enonce": "Il économise ________ acheter un appartement.",
     "o": [
      "pour que",
      "afin de",
      "pour qu'il"
     ],
     "r": 1,
     "note": "Exact&#8239;! Même sujet (il économise, il achète) ➔ infinitif après «&#8239;afin de&#8239;» ou «&#8239;pour&#8239;»."
    },
    {
     "enonce": "Dans une classe idéale, il ________ des tables à roulettes.",
     "o": [
      "y aura",
      "y aurait",
      "y avait"
     ],
     "r": 1,
     "note": "Exact&#8239;! Le conditionnel présent exprime l'hypothèse et le souhait."
    },
    {
     "enonce": "Comment se forme le conditionnel présent&#8239;?",
     "o": [
      "Radical du futur + terminaisons de l'imparfait.",
      "Radical du présent + terminaisons du futur.",
      "Radical de l'imparfait + terminaisons du présent."
     ],
     "r": 0,
     "note": "Exact&#8239;! <b>je ser-ais, tu ser-ais, il ser-ait</b>&nbsp;: le radical vient du futur, les terminaisons de l'imparfait."
    },
    {
     "enonce": "«&#8239;Si j'avais le temps, je ________ ce roman.&#8239;»",
     "o": [
      "lirais",
      "lirai",
      "lirais eu"
     ],
     "r": 0,
     "note": "Exact&#8239;! <b>Si + imparfait ➔ conditionnel présent.</b> Jamais de conditionnel après «&#8239;si&#8239;»."
    }
   ]
  },
  {
   "t": "qcm",
   "etiqueta": "QCM 2",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "Quel emploi du conditionnel reconnaissez-vous dans «&#8239;Le suspect aurait quitté le pays&#8239;»&#8239;?",
     "o": [
      "Un souhait",
      "Une information non confirmée",
      "Une hypothèse irréelle"
     ],
     "r": 1,
     "note": "Exact&#8239;! C'est le conditionnel journalistique&nbsp;: il rapporte une information sans l'assumer."
    },
    {
     "enonce": "Formule de politesse&nbsp;: laquelle convient à une demande à un professeur&#8239;?",
     "o": [
      "Je veux un rendez-vous.",
      "Je voudrais un rendez-vous.",
      "Je vais vouloir un rendez-vous."
     ],
     "r": 1,
     "note": "Exact&#8239;! Le conditionnel atténue la demande&nbsp;: c'est son emploi le plus courant au quotidien."
    },
    {
     "enonce": "Après «&#8239;pour que&#8239;», quel mode est obligatoire&#8239;?",
     "o": [
      "Le subjonctif",
      "L'indicatif",
      "Le conditionnel"
     ],
     "r": 0,
     "note": "Exact&#8239;! Toutes les locutions de but suivies d'une proposition — pour que, afin que, de peur que — commandent le subjonctif."
    },
    {
     "enonce": "Elle a fermé la fenêtre ________ les enfants n'attrapent froid.",
     "o": [
      "de peur que",
      "grâce à",
      "si bien que"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;De peur que&#8239;» (ou «&#8239;de crainte que&#8239;») exprime un but négatif, ce qu'on cherche à éviter."
    },
    {
     "enonce": "Quelle phrase exprime un <b>but</b>, et non une cause&#8239;?",
     "o": [
      "Il est parti parce qu'il était fatigué.",
      "Il est parti afin de se reposer.",
      "Il est parti, si bien qu'il a manqué la fin."
     ],
     "r": 1,
     "note": "Exact&#8239;! Le but est visé, il se situe après l'action et n'est pas encore réalisé."
    }
   ]
  },
  {
   "t": "trous",
   "etiqueta": "Saisie 1",
   "consigne": "Complétez, en écrivant le mot ou l’expression qui manque.",
   "sous": "Reponde en una palabra o expresión corta.",
   "q": [
    {
     "enonce": "Conditionnel présent&nbsp;: «&#8239;Si nous avions plus de place, nous ___ (organiser) des ateliers.&#8239;»",
     "r": [
      "organiserions"
     ],
     "taille": 16,
     "note": "Radical du futur «&#8239;organiser-&#8239;» + terminaison «&#8239;-ions&#8239;» de l'imparfait."
    },
    {
     "enonce": "Politesse&nbsp;: transformez «&#8239;Je veux vous parler.&#8239;» ➔ «&#8239;Je ___ vous parler.&#8239;»",
     "r": [
      "voudrais"
     ],
     "taille": 16,
     "note": "«&#8239;Je voudrais&#8239;»&nbsp;: le conditionnel transforme l'exigence en demande."
    },
    {
     "enonce": "Même sujet&nbsp;: «&#8239;Elle révise. Elle veut réussir.&#8239;» ➔ Elle révise ___ réussir. (deux mots)",
     "r": [
      "afin de",
      "pour"
     ],
     "taille": 16,
     "note": "Un seul sujet&nbsp;: la locution de but est suivie de l'infinitif."
    },
    {
     "enonce": "Sujets différents&nbsp;: «&#8239;Le professeur répète ___ tous comprennent.&#8239;» (deux mots)",
     "r": [
      "pour que",
      "afin que"
     ],
     "taille": 16,
     "note": "Deux sujets distincts&nbsp;: «&#8239;pour que&#8239;» impose le subjonctif — «&#8239;comprennent&#8239;»."
    },
    {
     "enonce": "Subjonctif après le but&nbsp;: «&#8239;Je t'explique afin que tu ___ (pouvoir) travailler seul.&#8239;»",
     "r": [
      "puisses"
     ],
     "taille": 16,
     "note": "«&#8239;Pouvoir&#8239;» au subjonctif présent, deuxième personne&nbsp;: «&#8239;que tu puisses&#8239;»."
    }
   ]
  }
 ]
});
FICHAS.push({
 "id": "dos-b2-mod6",
 "tipo": "dossier",
 "ciclo": "Dossier B2",
 "fecha": "Dossier B2 · Module 6 / 8",
 "titulo": "Les Émotions et les Sentiments (module 6)",
 "resumen": "Ce qui, ce que, ce dont · Dire l'effet d'une chose sur soi · Le subjonctif après les verbes de sentiment · Le lexique du sentiment",
 "intro": "La explicación del módulo, pantalla por pantalla, y 3 series de ejercicios que se corrigen solas, con su explicación.",
 "secciones": [
  {
   "titulo": "1. Règles et usages",
   "sous": "Lee cada explicación; puedes ver la traducción al español cuando la necesites.",
   "rappels": [
    {
     "titulo": "Ce qui, ce que, ce dont",
     "html": "<div class=\"encadre-grammaire\">\n                    <button class=\"btn-traduction\" onclick=\"toggleTrad('trad-6')\">🇪🇸 Ver en español</button>\n                    \n                    <p>Pour dire ce qui vous touche sans nommer la chose, le français dispose de trois relatifs neutres. Le choix ne dépend pas du sens, mais de la <b>fonction</b> du pronom dans la phrase qui suit.</p>\n\n                    <div class=\"schema\" role=\"img\" aria-label=\"Schéma du choix entre ce qui, ce que et ce dont selon la fonction grammaticale du pronom.\">\n                        <svg viewBox=\"0 0 620 220\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <text x=\"0\" y=\"14\" class=\"s-etiq\">QUELLE FONCTION LE PRONOM OCCUPE-T-IL ?</text>\n\n                            <rect x=\"0\" y=\"30\" width=\"190\" height=\"44\" rx=\"4\" class=\"s-objet\"/>\n                            <text x=\"95\" y=\"49\" class=\"s-mot\">ce qui</text>\n                            <text x=\"95\" y=\"66\" class=\"s-lgd s-gris\">il est SUJET</text>\n                            <text x=\"95\" y=\"96\" class=\"s-ex s-petit s-centre\">ce qui <tspan class=\"s-souligne\">me rend</tspan> heureux</text>\n                            <text x=\"95\" y=\"116\" class=\"s-connecteurs s-centre\">pas d'autre sujet après</text>\n\n                            <rect x=\"215\" y=\"30\" width=\"190\" height=\"44\" rx=\"4\" class=\"s-sujet\"/>\n                            <text x=\"310\" y=\"49\" class=\"s-mot\">ce que</text>\n                            <text x=\"310\" y=\"66\" class=\"s-lgd s-gris\">il est OBJET</text>\n                            <text x=\"310\" y=\"96\" class=\"s-ex s-petit s-centre\">ce que <tspan class=\"s-souligne\">je</tspan> déteste</text>\n                            <text x=\"310\" y=\"116\" class=\"s-connecteurs s-centre\">un sujet suit aussitôt</text>\n\n                            <rect x=\"430\" y=\"30\" width=\"190\" height=\"44\" rx=\"4\" class=\"s-agent\"/>\n                            <text x=\"525\" y=\"49\" class=\"s-mot\">ce dont</text>\n                            <text x=\"525\" y=\"66\" class=\"s-lgd s-gris\">le verbe veut DE</text>\n                            <text x=\"525\" y=\"96\" class=\"s-ex s-petit s-centre\">ce dont <tspan class=\"s-souligne\">j'ai peur</tspan></text>\n                            <text x=\"525\" y=\"116\" class=\"s-connecteurs s-centre\">avoir peur DE, avoir besoin DE</text>\n\n                            <line x1=\"0\" y1=\"146\" x2=\"620\" y2=\"146\" class=\"s-axe\"/>\n                            <text x=\"0\" y=\"170\" class=\"s-ex s-petit\">Le test : retirez « ce » et posez la question au verbe.</text>\n                            <text x=\"0\" y=\"192\" class=\"s-connecteurs\">…me rend heureux — qui est-ce qui rend ? le pronom ➔ SUJET ➔ ce qui</text>\n                            <text x=\"0\" y=\"210\" class=\"s-connecteurs\">je déteste… — je déteste quoi ? le pronom ➔ OBJET ➔ ce que</text>\n                        </svg>\n                    </div>\n\n                    <div id=\"trad-6\" class=\"texte-espanol\">\n                        <b>Traducción explicativa :</b><br>\n                        • <i>Ce qui</i> = \"lo que\" cuando es <b>sujeto</b>: <i>ce qui me rend heureux</i> → \"lo que me hace feliz\".<br>\n                        • <i>Ce que</i> = \"lo que\" cuando es <b>complemento directo</b>: <i>ce que je déteste</i> → \"lo que detesto\".<br>\n                        • <i>Ce dont</i> = \"lo que\" con verbos que piden <i>de</i>: <i>ce dont j'ai peur</i> → \"lo que me da miedo\".<br><br>\n                        Aquí está la dificultad para un hispanohablante: el español usa <b>\"lo que\"</b> en los tres casos, sin distinguir. En francés hay que preguntarse cada vez qué función cumple el pronombre. Truco práctico: si justo después viene un sujeto (<i>je</i>, <i>tu</i>, <i>il</i>…), es <i>ce que</i>; si viene directamente un verbo, es <i>ce qui</i>; si el verbo lleva <i>de</i> (<i>avoir besoin de</i>, <i>avoir peur de</i>, <i>parler de</i>, <i>rêver de</i>), es <i>ce dont</i>.\n                    </div>\n                </div>"
    },
    {
     "titulo": "Dire l'effet d'une chose sur soi",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Quatre verbes se partagent cette expression, et <b>chacun impose sa construction</b>. Les confondre est l'erreur la plus visible à l'oral.</p>\n\n                    <div class=\"enveloppe-tableau\">\n                        <table class=\"tableau-temps\">\n                            <thead><tr><th>Verbe</th><th>Suivi de</th><th>Exemple</th></tr></thead>\n                            <tbody>\n                                <tr><td>rendre</td><td>un <b>adjectif</b></td><td>Ça me rend <b>heureux</b>, <b>nerveuse</b>, <b>triste</b>.</td></tr>\n                                <tr><td>faire</td><td>un <b>nom</b>, sans article</td><td>Ça me fait <b>peur</b>, <b>plaisir</b>, <b>honte</b>.</td></tr>\n                                <tr><td>mettre</td><td><b>en</b> + nom</td><td>Ça me met <b>en colère</b>, <b>en confiance</b>.</td></tr>\n                                <tr><td>donner</td><td>un nom, souvent + <b>de</b></td><td>Ça me donne <b>envie de</b> partir, <b>le courage de</b> continuer.</td></tr>\n                            </tbody>\n                        </table>\n                    </div>\n\n                    <p><b>La faute à ne pas commettre&nbsp;:</b> « ça me fait triste » n'existe pas. Devant un adjectif, c'est toujours <code>rendre</code>.</p>\n                </div>"
    },
    {
     "titulo": "Le subjonctif après les verbes de sentiment",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Dès qu'un sentiment est exprimé et qu'une seconde proposition suit avec <code>que</code>, le verbe passe au <b>subjonctif</b>. Le sentiment n'énonce pas un fait&nbsp;: il réagit à ce fait.</p>\n                    <div class=\"exemple\">\n                        Je suis <b>ravi que</b> tu <b>puisses</b> venir.<span class=\"fleche\">·</span>Il est <b>dommage qu'</b>elle ne <b>soit</b> pas là.<br>\n                        J'ai <b>peur qu'</b>il ne <b>pleuve</b>.<span class=\"fleche\">·</span>Je <b>regrette que</b> vous <b>partiez</b> si tôt.\n                    </div>\n                    <ul>\n                        <li><b>Les adjectifs&nbsp;:</b> être content, heureux, ravi, désolé, triste, surpris, étonné, furieux <b>que</b>…</li>\n                        <li><b>Les verbes&nbsp;:</b> regretter, craindre, avoir peur, s'étonner, se réjouir <b>que</b>…</li>\n                        <li><b>Les tournures impersonnelles&nbsp;:</b> il est dommage, il est regrettable, cela m'ennuie <b>que</b>…</li>\n                    </ul>\n                    <p>Le <b>« ne » explétif</b> apparaît après « avoir peur que » et « craindre que »&nbsp;: <i>j'ai peur qu'il <b>ne</b> soit trop tard</i>. Ce « ne » ne nie rien&nbsp;: il appartient au registre soutenu et peut être omis.</p>\n                </div>"
    },
    {
     "titulo": "Le lexique du sentiment",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Nommer précisément ce qu'on ressent est ce qui distingue un B2 d'un B1. Chaque émotion se décline en intensités.</p>\n                    <div class=\"enveloppe-tableau\">\n                        <table class=\"tableau-temps\">\n                            <thead><tr><th>Émotion</th><th>Faible</th><th>Forte</th></tr></thead>\n                            <tbody>\n                                <tr><td>La joie</td><td>content, satisfait</td><td>ravi, comblé, aux anges</td></tr>\n                                <tr><td>La tristesse</td><td>déçu, morose</td><td>abattu, effondré</td></tr>\n                                <tr><td>La colère</td><td>agacé, contrarié</td><td>furieux, hors de soi</td></tr>\n                                <tr><td>La peur</td><td>inquiet, préoccupé</td><td>angoissé, terrifié</td></tr>\n                                <tr><td>La surprise</td><td>étonné</td><td>stupéfait, abasourdi</td></tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>"
    }
   ],
   "ejercicios": []
  },
  {
   "titulo": "2. Exercices",
   "sous": "Series de práctica con corrección inmediata.",
   "rappels": [],
   "ejercicios": [
    0,
    1,
    2
   ]
  }
 ],
 "ejercicios": [
  {
   "t": "qcm",
   "etiqueta": "QCM 1",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "________ me rend heureux, c'est de retrouver mes amis.",
     "o": [
      "Ce qui",
      "Ce que",
      "Ce dont"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Ce qui&#8239;» est <b>sujet</b> du verbe qui suit&nbsp;: c'est «&#8239;ce&#8239;» qui rend heureux."
    },
    {
     "enonce": "________ je déteste, c'est l'hypocrisie.",
     "o": [
      "Ce qui",
      "Ce que",
      "Ce dont"
     ],
     "r": 1,
     "note": "Exact&#8239;! «&#8239;Ce que&#8239;» est <b>complément d'objet direct</b> de «&#8239;déteste&#8239;», qui a déjà son sujet."
    },
    {
     "enonce": "________ j'ai le plus peur, c'est de parler en public.",
     "o": [
      "Ce qui",
      "Ce que",
      "Ce dont"
     ],
     "r": 2,
     "note": "Exact&#8239;! On dit «&#8239;avoir peur <b>de</b> quelque chose&#8239;»&nbsp;: la préposition impose «&#8239;ce dont&#8239;»."
    },
    {
     "enonce": "Le bruit constant ________ nerveuse.",
     "o": [
      "me fait",
      "me rend",
      "me met"
     ],
     "r": 1,
     "note": "Exact&#8239;! <b>Rendre + adjectif</b>&nbsp;: ça me rend nerveuse, triste, heureuse."
    },
    {
     "enonce": "Cette injustice ________ colère.",
     "o": [
      "me rend en",
      "me met en",
      "me fait en"
     ],
     "r": 1,
     "note": "Exact&#8239;! <b>Mettre en + nom</b>&nbsp;: en colère, en confiance, mal à l'aise."
    }
   ]
  },
  {
   "t": "qcm",
   "etiqueta": "QCM 2",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "Ton message ________ très plaisir.",
     "o": [
      "m'a fait",
      "m'a rendu",
      "m'a mis"
     ],
     "r": 0,
     "note": "Exact&#8239;! <b>Faire + nom</b>&nbsp;: faire plaisir, faire peur, faire honte, faire pitié."
    },
    {
     "enonce": "Je suis ravi que tu ________ venir à la fête.",
     "o": [
      "peux",
      "puisses",
      "pourras"
     ],
     "r": 1,
     "note": "Exact&#8239;! Les verbes et adjectifs de sentiment — être ravi, content, triste, avoir peur — commandent le <b>subjonctif</b>."
    },
    {
     "enonce": "J'ai peur qu'il ________ en retard.",
     "o": [
      "est",
      "soit",
      "sera"
     ],
     "r": 1,
     "note": "Exact&#8239;! «&#8239;Avoir peur que&#8239;» + subjonctif. On rencontre aussi «&#8239;qu'il ne soit&#8239;», avec un «&#8239;ne&#8239;» explétif qui n'est pas une négation."
    },
    {
     "enonce": "Quelle phrase est <b>incorrecte</b>&nbsp;?",
     "o": [
      "Ça me rend triste.",
      "Ça me fait triste.",
      "Ça me met mal à l'aise."
     ],
     "r": 1,
     "note": "Exact&#8239;! C'est l'erreur à retenir&nbsp;: «&#8239;faire&#8239;» ne se construit pas avec un adjectif. On dit «&#8239;ça me rend triste&#8239;»."
    },
    {
     "enonce": "Quel sentiment exprime «&#8239;l'agacement&#8239;»&nbsp;?",
     "o": [
      "Une joie intense",
      "Une irritation légère",
      "Une peur profonde"
     ],
     "r": 1,
     "note": "Exact&#8239;! L'agacement est une contrariété légère, en deçà de la colère."
    }
   ]
  },
  {
   "t": "trous",
   "etiqueta": "Saisie 1",
   "consigne": "Complétez, en écrivant le mot ou l’expression qui manque.",
   "sous": "Reponde en una palabra o expresión corta.",
   "q": [
    {
     "enonce": "Complétez&nbsp;: «&#8239;___ m'inquiète, c'est son silence.&#8239;» (deux mots)",
     "r": [
      "ce qui"
     ],
     "taille": 16,
     "note": "«&#8239;Ce qui&#8239;» est sujet du verbe «&#8239;inquiète&#8239;»."
    },
    {
     "enonce": "Complétez&nbsp;: «&#8239;___ j'ai besoin, c'est d'un peu de calme.&#8239;» (deux mots)",
     "r": [
      "ce dont"
     ],
     "taille": 16,
     "note": "«&#8239;Avoir besoin <b>de</b>&#8239;» impose «&#8239;ce dont&#8239;»."
    },
    {
     "enonce": "Construction correcte&nbsp;: «&#8239;Les examens me ___ anxieux.&#8239;» (un verbe)",
     "r": [
      "rendent"
     ],
     "taille": 16,
     "note": "«&#8239;Anxieux&#8239;» est un adjectif&nbsp;: seul «&#8239;rendre&#8239;» convient, accordé au pluriel."
    },
    {
     "enonce": "Subjonctif&nbsp;: «&#8239;Je suis désolée que vous ne ___ (pouvoir) pas rester.&#8239;»",
     "r": [
      "puissiez"
     ],
     "taille": 16,
     "note": "Après «&#8239;être désolé que&#8239;», subjonctif présent de «&#8239;pouvoir&#8239;»&nbsp;: que vous puissiez."
    },
    {
     "enonce": "Reformulez avec «&#8239;mettre&#8239;»&nbsp;: «&#8239;Cette remarque m'a énervé.&#8239;» ➔ Cette remarque m'a ___ colère. (deux mots)",
     "r": [
      "mis en"
     ],
     "taille": 16,
     "note": "«&#8239;Mettre en colère&#8239;»&nbsp;: le participe «&#8239;mis&#8239;» suivi de la préposition «&#8239;en&#8239;»."
    }
   ]
  }
 ]
});
FICHAS.push({
 "id": "dos-b2-mod7",
 "tipo": "dossier",
 "ciclo": "Dossier B2",
 "fecha": "Dossier B2 · Module 7 / 8",
 "titulo": "Exprimer son Opinion (module 7)",
 "resumen": "L'interrupteur indicatif / subjonctif · Prendre position · L'accord et le désaccord, par degrés · Concéder pour mieux argumenter",
 "intro": "La explicación del módulo, pantalla por pantalla, y 3 series de ejercicios que se corrigen solas, con su explicación.",
 "secciones": [
  {
   "titulo": "1. Règles et usages",
   "sous": "Lee cada explicación; puedes ver la traducción al español cuando la necesites.",
   "rappels": [
    {
     "titulo": "L'interrupteur indicatif / subjonctif",
     "html": "<div class=\"encadre-grammaire\">\n                    <button class=\"btn-traduction\" onclick=\"toggleTrad('trad-7')\">🇪🇸 Ver en español</button>\n                    \n                    <p>C'est le point le plus rentable du module, et le plus souvent manqué. Le même verbe d'opinion change de mode selon la forme de la phrase&nbsp;: affirmative, ou non.</p>\n\n                    <div class=\"schema\" role=\"img\" aria-label=\"Schéma montrant que les verbes d'opinion appellent l'indicatif à la forme affirmative et le subjonctif à la forme négative ou interrogative.\">\n                        <svg viewBox=\"0 0 620 210\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <text x=\"310\" y=\"16\" class=\"s-note s-note-or\">JE PENSE · JE CROIS · JE TROUVE QUE…</text>\n\n                            <path d=\"M 310 26 L 310 44 L 150 44 L 150 60\" class=\"s-lien\"/>\n                            <path d=\"M 310 26 L 310 44 L 470 44 L 470 60\" class=\"s-lien\"/>\n\n                            <text x=\"150\" y=\"76\" class=\"s-etiq2 s-note-sauge\">AFFIRMATIF · CERTITUDE</text>\n                            <rect x=\"20\" y=\"86\" width=\"260\" height=\"44\" rx=\"4\" class=\"s-objet\"/>\n                            <text x=\"150\" y=\"105\" class=\"s-mot\">INDICATIF</text>\n                            <text x=\"150\" y=\"123\" class=\"s-lgd s-gris\">le fait est posé</text>\n                            <text x=\"150\" y=\"156\" class=\"s-ex s-petit s-centre\">Je pense qu'il <tspan class=\"s-souligne\">a</tspan> raison.</text>\n\n                            <text x=\"470\" y=\"76\" class=\"s-etiq2 s-note-or\">NÉGATIF OU INTERROGATIF · DOUTE</text>\n                            <rect x=\"340\" y=\"86\" width=\"260\" height=\"44\" rx=\"4\" class=\"s-sujet\"/>\n                            <text x=\"470\" y=\"105\" class=\"s-mot\">SUBJONCTIF</text>\n                            <text x=\"470\" y=\"123\" class=\"s-lgd s-gris\">le fait est mis en doute</text>\n                            <text x=\"470\" y=\"156\" class=\"s-ex s-petit s-centre\">Je ne pense pas qu'il <tspan class=\"s-souligne\">ait</tspan> raison.</text>\n\n                            <text x=\"310\" y=\"188\" class=\"s-connecteurs s-centre\">Croyez-vous qu'il ait raison ? — l'interrogation par inversion bascule elle aussi au subjonctif.</text>\n                            <text x=\"310\" y=\"206\" class=\"s-connecteurs s-centre\">En revanche : « Est-ce que tu penses qu'il a raison ? » garde l'indicatif.</text>\n                        </svg>\n                    </div>\n\n                    <div id=\"trad-7\" class=\"texte-espanol\">\n                        <b>Traducción explicativa :</b><br>\n                        • <i>Je pense que + indicativo</i> → \"creo que + indicativo\".<br>\n                        • <i>Je ne pense pas que + subjuntivo</i> → \"no creo que + subjuntivo\".<br><br>\n                        Buena noticia: <b>la regla es la misma que en español</b>. \"Creo que tiene razón\" frente a \"no creo que tenga razón\". Puedes apoyarte directamente en tu lengua para este punto.<br><br>\n                        Dos diferencias que sí conviene retener: en francés la interrogación <b>por inversión</b> (<i>Croyez-vous qu'il ait…</i>) también exige subjuntivo, mientras que con <i>est-ce que</i> se mantiene el indicativo. Y <i>c'est n'importe quoi</i>, aunque se oiga mucho, es coloquial: equivale a \"es una tontería\" y no debe aparecer en un examen escrito.\n                    </div>\n                </div>"
    },
    {
     "titulo": "Prendre position",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Avant l'argument vient la formule qui l'annonce. Elle signale à l'auditeur que ce qui suit est un avis, non un fait établi.</p>\n                    <ul>\n                        <li><b>Neutres, tous registres&nbsp;:</b> <code>à mon avis</code>, <code>selon moi</code>, <code>d'après moi</code>, <code>pour moi</code>, <code>personnellement</code>.</li>\n                        <li><b>Avec un verbe d'opinion&nbsp;:</b> <code>je pense que</code>, <code>je crois que</code>, <code>je trouve que</code>, <code>j'estime que</code>, <code>je considère que</code>.</li>\n                        <li><b>Jugement direct, sans proposition&nbsp;:</b> <code>je trouve + nom + adjectif</code> — <i>je trouve ce débat exagéré</i>.</li>\n                    </ul>\n                    <p><b>Ne confondez pas&nbsp;:</b> <i>il paraît que</i> et <i>on dit que</i> rapportent le propos d'autrui&nbsp;; ils n'engagent pas celui qui parle.</p>\n                </div>"
    },
    {
     "titulo": "L'accord et le désaccord, par degrés",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Un débat ne se joue pas en oui ou non. Le jury du DELF attend précisément ces nuances intermédiaires.</p>\n\n                    <div class=\"schema\" role=\"img\" aria-label=\"Échelle allant du désaccord total à l'accord total, avec les formules correspondantes.\">\n                        <svg viewBox=\"0 0 620 130\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <line x1=\"20\" y1=\"46\" x2=\"600\" y2=\"46\" class=\"s-axe\"/>\n                            <circle cx=\"20\" cy=\"46\" r=\"5\" class=\"s-point s-point-nul\"/>\n                            <circle cx=\"180\" cy=\"46\" r=\"5\" class=\"s-point\"/>\n                            <circle cx=\"340\" cy=\"46\" r=\"5\" class=\"s-point\"/>\n                            <circle cx=\"600\" cy=\"46\" r=\"5\" class=\"s-point s-point-total\"/>\n\n                            <text x=\"20\" y=\"30\" class=\"s-etiq\">DÉSACCORD</text>\n                            <text x=\"600\" y=\"30\" class=\"s-etiq s-fin\">ACCORD</text>\n\n                            <text x=\"0\" y=\"70\" class=\"s-lgd s-debut\">Je ne suis pas</text>\n                            <text x=\"0\" y=\"86\" class=\"s-lgd s-debut\">de ton avis.</text>\n                            <text x=\"180\" y=\"70\" class=\"s-lgd\">Je ne partage pas</text>\n                            <text x=\"180\" y=\"86\" class=\"s-lgd\">entièrement…</text>\n                            <text x=\"340\" y=\"70\" class=\"s-lgd\">Je vois ce que</text>\n                            <text x=\"340\" y=\"86\" class=\"s-lgd\">tu veux dire, mais…</text>\n                            <text x=\"600\" y=\"70\" class=\"s-lgd s-fin\">Je partage</text>\n                            <text x=\"600\" y=\"86\" class=\"s-lgd s-fin\">entièrement ton avis.</text>\n\n                            <text x=\"20\" y=\"112\" class=\"s-connecteurs\">Registre familier, à éviter à l'écrit : « C'est n'importe quoi ! » · « Tu as tort. »</text>\n                        </svg>\n                    </div>\n                </div>"
    },
    {
     "titulo": "Concéder pour mieux argumenter",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>La marque d'un argumentateur solide n'est pas de nier l'objection, mais de la reconnaître avant de la dépasser.</p>\n                    <div class=\"exemple\">\n                        <b>Certes</b>, ces mots sont pratiques, <b>mais</b> ils excluent ceux qui ne les comprennent pas.<br>\n                        <b>Il est vrai que</b> le débat est ancien ; <b>cependant</b>, il reste d'actualité.<br>\n                        <b>Bien que</b> l'emprunt <b>soit</b> naturel, son rythme actuel interroge.\n                    </div>\n                    <p><b>Attention&nbsp;:</b> <code>bien que</code> et <code>quoique</code> commandent le <b>subjonctif</b>, à la différence de <code>même si</code>, qui garde l'indicatif.</p>\n                </div>"
    }
   ],
   "ejercicios": []
  },
  {
   "titulo": "2. Exercices",
   "sous": "Series de práctica con corrección inmediata.",
   "rappels": [],
   "ejercicios": [
    0,
    1,
    2
   ]
  }
 ],
 "ejercicios": [
  {
   "t": "qcm",
   "etiqueta": "QCM 1",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "Je pense que cette réforme ________ nécessaire.",
     "o": [
      "soit",
      "est",
      "ait été"
     ],
     "r": 1,
     "note": "Exact&#8239;! <b>Affirmatif ➔ indicatif.</b> L'opinion est présentée comme certaine."
    },
    {
     "enonce": "Je ne pense pas que cette réforme ________ nécessaire.",
     "o": [
      "est",
      "soit",
      "sera"
     ],
     "r": 1,
     "note": "Exact&#8239;! <b>Négatif ➔ subjonctif.</b> Le doute s'installe, et le mode change avec lui."
    },
    {
     "enonce": "Quelle formule appartient au registre <b>familier</b>&nbsp;?",
     "o": [
      "Je ne partage pas ton avis.",
      "C'est n'importe quoi !",
      "Je ne suis pas de ton avis."
     ],
     "r": 1,
     "note": "Exact&#8239;! À réserver aux échanges entre proches&nbsp;: elle est trop abrupte pour un débat ou un examen."
    },
    {
     "enonce": "Croyez-vous qu'il ________ raison&#8239;?",
     "o": [
      "a",
      "ait",
      "aura"
     ],
     "r": 1,
     "note": "Exact&#8239;! L'interrogation par inversion appelle le subjonctif, comme la négation."
    },
    {
     "enonce": "Quelle expression introduit une opinion <b>personnelle</b>&nbsp;?",
     "o": [
      "Il paraît que",
      "À mon avis",
      "On dit que"
     ],
     "r": 1,
     "note": "Exact&#8239;! Comme «&#8239;selon moi&#8239;», «&#8239;personnellement&#8239;», «&#8239;d'après moi&#8239;»&nbsp;: l'énonciateur prend position."
    }
   ]
  },
  {
   "t": "qcm",
   "etiqueta": "QCM 2",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "Marquer un désaccord poli&nbsp;: quelle formule choisir&nbsp;?",
     "o": [
      "Tu as tort.",
      "Je ne partage pas entièrement ton avis.",
      "C'est faux."
     ],
     "r": 1,
     "note": "Exact&#8239;! L'adverbe «&#8239;entièrement&#8239;» nuance le refus et laisse la discussion ouverte&nbsp;: c'est ce qu'attend l'épreuve du DELF."
    },
    {
     "enonce": "Il est vrai que le débat est ancien, ________ il reste actuel.",
     "o": [
      "cependant",
      "parce que",
      "afin que"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Certes… cependant&#8239;» concède d'abord un point, puis rétablit sa position&nbsp;: c'est la structure argumentative attendue en B2."
    },
    {
     "enonce": "«&#8239;Je trouve ce débat exagéré.&#8239;» Quelle construction suit «&#8239;trouver&#8239;» ici&nbsp;?",
     "o": [
      "trouver + nom + adjectif",
      "trouver que + subjonctif",
      "trouver de + infinitif"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;Trouver quelque chose + adjectif&#8239;» exprime un jugement direct, sans proposition."
    },
    {
     "enonce": "Quel énoncé exprime un accord <b>total</b>&nbsp;?",
     "o": [
      "Je partage entièrement ton avis.",
      "Je vois ce que tu veux dire, mais…",
      "Ce n'est pas si simple."
     ],
     "r": 0,
     "note": "Exact&#8239;! L'adverbe «&#8239;entièrement&#8239;» marque l'adhésion sans réserve."
    },
    {
     "enonce": "Dans le débat sur les anglicismes, quel argument relève de l'<b>histoire de la langue</b>&nbsp;?",
     "o": [
      "Ces mots créent des modes inutiles.",
      "Les langues empruntent depuis toujours des mots à d'autres langues.",
      "Il faudrait imiter les Québécois."
     ],
     "r": 1,
     "note": "Exact&#8239;! L'emprunt est un phénomène constant&nbsp;: le français a pris à l'arabe, à l'italien, à l'anglais. C'est l'argument historique."
    }
   ]
  },
  {
   "t": "trous",
   "etiqueta": "Saisie 1",
   "consigne": "Complétez, en écrivant le mot ou l’expression qui manque.",
   "sous": "Reponde en una palabra o expresión corta.",
   "q": [
    {
     "enonce": "Indicatif ou subjonctif&nbsp;? «&#8239;Je crois qu'il ___ (avoir) raison.&#8239;»",
     "r": [
      "a"
     ],
     "taille": 16,
     "note": "Affirmatif&nbsp;: «&#8239;je crois que&#8239;» + indicatif présent."
    },
    {
     "enonce": "Indicatif ou subjonctif&nbsp;? «&#8239;Je ne crois pas qu'il ___ (avoir) raison.&#8239;»",
     "r": [
      "ait"
     ],
     "taille": 16,
     "note": "Négatif&nbsp;: «&#8239;je ne crois pas que&#8239;» + subjonctif présent d'«&#8239;avoir&#8239;»."
    },
    {
     "enonce": "Introduisez une opinion personnelle en trois mots&nbsp;: «&#8239;___, ce débat est utile.&#8239;» (à … avis)",
     "r": [
      "à mon avis"
     ],
     "taille": 16,
     "note": "«&#8239;À mon avis&#8239;» introduit une prise de position personnelle."
    },
    {
     "enonce": "Exprimez un désaccord neutre&nbsp;: «&#8239;Je ne suis pas ___ ton avis.&#8239;» (un mot)",
     "r": [
      "de"
     ],
     "taille": 16,
     "note": "«&#8239;Être de l'avis de quelqu'un&#8239;»&nbsp;: la préposition est «&#8239;de&#8239;»."
    },
    {
     "enonce": "Concession&nbsp;: «&#8239;___ que ces mots sont pratiques, mais ils excluent ceux qui ne les comprennent pas.&#8239;» (deux mots, registre soutenu)",
     "r": [
      "il est vrai",
      "certes"
     ],
     "taille": 16,
     "note": "«&#8239;Il est vrai que… mais…&#8239;» concède un point avant de rétablir sa position."
    }
   ]
  }
 ]
});
FICHAS.push({
 "id": "dos-b2-mod8",
 "tipo": "dossier",
 "ciclo": "Dossier B2",
 "fecha": "Dossier B2 · Module 8 / 8",
 "titulo": "Le Discours Argumenté (module 8)",
 "resumen": "Le plan qui tient debout · Les connecteurs classés par fonction · Trois discours modèles · Expressions utiles",
 "intro": "La explicación del módulo, pantalla por pantalla, y 3 series de ejercicios que se corrigen solas, con su explicación.",
 "secciones": [
  {
   "titulo": "1. Règles et usages",
   "sous": "Lee cada explicación; puedes ver la traducción al español cuando la necesites.",
   "rappels": [
    {
     "titulo": "Le plan qui tient debout",
     "html": "<div class=\"encadre-grammaire\">\n                    <button class=\"btn-traduction\" onclick=\"toggleTrad('trad-8')\">🇪🇸 Ver en español</button>\n                    \n                    <p>Un discours argumenté n'est pas une suite d'idées&nbsp;: c'est un parcours. Chaque étape appelle la suivante, et c'est le connecteur qui rend ce lien audible. Retenez ce plan&nbsp;: il vaut pour l'oral comme pour l'écrit.</p>\n\n                    <div class=\"schema\" role=\"img\" aria-label=\"Plan du discours argumenté en six étapes, de l'introduction à la conclusion, avec le connecteur propre à chaque étape.\">\n                        <svg viewBox=\"0 0 620 290\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <defs>\n                                <marker id=\"pointe-plan\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\"\n                                        markerWidth=\"5\" markerHeight=\"5\" orient=\"auto-start-reverse\">\n                                    <path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"var(--or-academique)\"/>\n                                </marker>\n                            </defs>\n\n                            <rect x=\"0\" y=\"6\" width=\"200\" height=\"34\" rx=\"4\" class=\"s-objet\"/>\n                            <text x=\"100\" y=\"28\" class=\"s-mot\">Tout d'abord</text>\n                            <text x=\"215\" y=\"21\" class=\"s-ex s-petit\">j'annonce mon opinion</text>\n                            <text x=\"215\" y=\"37\" class=\"s-connecteurs\">l'introduction</text>\n                            <line x1=\"100\" y1=\"42\" x2=\"100\" y2=\"54\" class=\"s-lien\" marker-end=\"url(#pointe-plan)\"/>\n\n                            <rect x=\"0\" y=\"56\" width=\"200\" height=\"34\" rx=\"4\" class=\"s-sujet\"/>\n                            <text x=\"100\" y=\"78\" class=\"s-mot\">En effet</text>\n                            <text x=\"215\" y=\"71\" class=\"s-ex s-petit\">je justifie</text>\n                            <text x=\"215\" y=\"87\" class=\"s-connecteurs\">pourquoi je pense cela</text>\n                            <line x1=\"100\" y1=\"92\" x2=\"100\" y2=\"104\" class=\"s-lien\" marker-end=\"url(#pointe-plan)\"/>\n\n                            <rect x=\"0\" y=\"106\" width=\"200\" height=\"34\" rx=\"4\" class=\"s-sujet\"/>\n                            <text x=\"100\" y=\"128\" class=\"s-mot\">De plus</text>\n                            <text x=\"215\" y=\"121\" class=\"s-ex s-petit\">j'ajoute un argument</text>\n                            <text x=\"215\" y=\"137\" class=\"s-connecteurs\">une deuxième raison</text>\n                            <line x1=\"100\" y1=\"142\" x2=\"100\" y2=\"154\" class=\"s-lien\" marker-end=\"url(#pointe-plan)\"/>\n\n                            <rect x=\"0\" y=\"156\" width=\"200\" height=\"34\" rx=\"4\" class=\"s-sujet\"/>\n                            <text x=\"100\" y=\"178\" class=\"s-mot\">Par exemple</text>\n                            <text x=\"215\" y=\"171\" class=\"s-ex s-petit\">j'illustre</text>\n                            <text x=\"215\" y=\"187\" class=\"s-connecteurs\">un cas concret, vécu ou connu</text>\n                            <line x1=\"100\" y1=\"192\" x2=\"100\" y2=\"204\" class=\"s-lien\" marker-end=\"url(#pointe-plan)\"/>\n\n                            <rect x=\"0\" y=\"206\" width=\"200\" height=\"34\" rx=\"4\" class=\"s-sujet\"/>\n                            <text x=\"100\" y=\"228\" class=\"s-mot\">Donc</text>\n                            <text x=\"215\" y=\"221\" class=\"s-ex s-petit\">j'en tire la conséquence</text>\n                            <text x=\"215\" y=\"237\" class=\"s-connecteurs\">ce qu'il faudrait faire</text>\n                            <line x1=\"100\" y1=\"242\" x2=\"100\" y2=\"254\" class=\"s-lien\" marker-end=\"url(#pointe-plan)\"/>\n\n                            <rect x=\"0\" y=\"256\" width=\"200\" height=\"34\" rx=\"4\" class=\"s-agent\"/>\n                            <text x=\"100\" y=\"278\" class=\"s-mot\">Finalement</text>\n                            <text x=\"215\" y=\"271\" class=\"s-ex s-petit\">je conclus</text>\n                            <text x=\"215\" y=\"287\" class=\"s-connecteurs\">je rappelle ma position, nuancée</text>\n                        </svg>\n                    </div>\n\n                    <p>Six étapes, six connecteurs. Un discours d'une minute tient dans ce plan&nbsp;; un discours de trois minutes aussi, en développant chaque étape.</p>\n\n                    <div id=\"trad-8\" class=\"texte-espanol\">\n                        <b>Traducción explicativa :</b><br>\n                        El esquema a memorizar es: <i>Tout d'abord</i> (anuncio mi opinión) → <i>En effet</i> (la justifico) → <i>De plus</i> (añado un segundo argumento) → <i>Par exemple</i> (ilustro) → <i>Donc</i> (saco la consecuencia) → <i>Finalement</i> (concluyo).<br><br>\n                        La lógica es la misma que en español, pero hay una diferencia de <b>densidad</b>: el francés argumentado marca cada paso con un conector explícito, mientras que en español se encadena más por yuxtaposición. En un examen oral, callarse los conectores se percibe como un discurso pobre, aunque las ideas sean buenas. Dicho de otro modo: <b>los conectores no son adorno, son la nota del examen</b>.<br><br>\n                        Cuidado con dos falsos amigos frecuentes: <i>finalement</i> no significa \"finalmente\" en el sentido de \"por fin\", sino \"en conclusión\"; y <i>en effet</i> no es \"en efecto\" como muletilla, sino que introduce una justificación.\n                    </div>\n                </div>"
    },
    {
     "titulo": "Les connecteurs classés par fonction",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Choisir un connecteur, c'est annoncer ce qu'on va faire. Voici les plus rentables, avec leurs équivalents&nbsp;: variez-les pour éviter la répétition.</p>\n                    <div class=\"enveloppe-tableau\">\n                        <table class=\"tableau-temps\">\n                            <thead><tr><th>Fonction</th><th>Connecteurs</th></tr></thead>\n                            <tbody>\n                                <tr><td>Introduire</td><td>tout d'abord, premièrement, pour commencer, d'abord</td></tr>\n                                <tr><td>Justifier</td><td>en effet, car, en fait, c'est pourquoi</td></tr>\n                                <tr><td>Ajouter</td><td>de plus, en plus, ensuite, puis, deuxièmement, par ailleurs</td></tr>\n                                <tr><td>Illustrer</td><td>par exemple, ainsi, notamment, comme</td></tr>\n                                <tr><td>Préciser</td><td>c'est-à-dire, autrement dit, en d'autres termes</td></tr>\n                                <tr><td>Conséquence</td><td>donc, alors, par conséquent, c'est pourquoi</td></tr>\n                                <tr><td>Nuancer</td><td>cependant, toutefois, néanmoins, en revanche, certes… mais</td></tr>\n                                <tr><td>Conclure</td><td>finalement, pour conclure, en conclusion, en somme</td></tr>\n                            </tbody>\n                        </table>\n                    </div>\n                    <p><b>Un conseil d'oral&nbsp;:</b> marquez une courte pause après le connecteur. L'auditeur entend alors la structure, et vous gagnez une seconde pour préparer la suite.</p>\n                </div>"
    },
    {
     "titulo": "Trois discours modèles",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>Même sujet — <i>faut-il dénoncer l'usage des anglicismes&nbsp;?</i> — et trois degrés de développement. Les connecteurs sont mis en évidence&nbsp;: c'est l'ossature à reprendre, en changeant les idées.</p>\n\n                    <div class=\"discours\">\n                        <div class=\"discours-etiquette\">Modèle 1 · discours simple</div>\n                        <p>Bonjour à tous.</p>\n                        <p><span class=\"cx\">Tout d'abord</span>, je pense que l'utilisation excessive des anglicismes pose un problème. <span class=\"cx\">En effet</span>, beaucoup de personnes utilisent des mots anglais alors qu'il existe déjà des mots français.</p>\n                        <p><span class=\"cx\">Deuxièmement</span>, cette habitude peut rendre la communication plus difficile pour certaines personnes. <span class=\"cx\">Par exemple</span>, les personnes âgées ne comprennent pas toujours des termes comme <i>week-end</i>, <i>streaming</i> ou <i>challenge</i>.</p>\n                        <p><span class=\"cx\">Donc</span>, il est important de privilégier les mots français quand c'est possible.</p>\n                        <p><span class=\"cx\">Finalement</span>, les anglicismes peuvent être utiles dans certains contextes, mais il faut les utiliser avec modération.</p>\n                        <p>Merci de votre attention.</p>\n                    </div>\n\n                    <div class=\"discours\">\n                        <div class=\"discours-etiquette\">Modèle 2 · discours argumenté</div>\n                        <p>Bonjour.</p>\n                        <p><span class=\"cx\">Premièrement</span>, les anglicismes prennent une place de plus en plus importante dans la langue française. <span class=\"cx\">C'est pourquoi</span> certaines personnes s'inquiètent pour la richesse du français.</p>\n                        <p><span class=\"cx\">Ensuite</span>, de nombreux mots anglais remplacent des mots français déjà existants. <span class=\"cx\">Par exemple</span>, on dit parfois <i>mail</i> au lieu de <i>courriel</i>.</p>\n                        <p><span class=\"cx\">En plus</span>, cette tendance influence particulièrement les jeunes qui utilisent ces termes dans leur vie quotidienne.</p>\n                        <p><span class=\"cx\">Alors</span>, il est nécessaire de valoriser le vocabulaire français tout en restant ouvert aux échanges internationaux.</p>\n                        <p><span class=\"cx\">Finalement</span>, je pense qu'il faut trouver un équilibre entre modernité et respect de la langue française.</p>\n                        <p>Merci.</p>\n                    </div>\n\n                    <div class=\"discours\">\n                        <div class=\"discours-etiquette\">Modèle 3 · discours élaboré</div>\n                        <p>Bonjour à tous.</p>\n                        <p><span class=\"cx\">Tout d'abord</span>, les anglicismes sont très présents dans les médias, la publicité et les réseaux sociaux. <span class=\"cx\">En fait</span>, ils sont souvent perçus comme modernes et attractifs.</p>\n                        <p><span class=\"cx\">Deuxièmement</span>, leur utilisation excessive peut affaiblir certains mots français. <span class=\"cx\">C'est-à-dire que</span> des expressions françaises disparaissent peu à peu de l'usage quotidien.</p>\n                        <p><span class=\"cx\">De plus</span>, certaines personnes ne comprennent pas toujours ces mots étrangers. <span class=\"cx\">Par exemple</span>, dans le monde du travail, des termes anglais peuvent créer de la confusion.</p>\n                        <p><span class=\"cx\">Donc</span>, il serait préférable d'encourager l'emploi d'équivalents français lorsque cela est possible.</p>\n                        <p><span class=\"cx\">Puis</span>, les écoles et les médias pourraient sensibiliser le public à cette question.</p>\n                        <p><span class=\"cx\">Finalement</span>, je ne suis pas contre tous les anglicismes, mais je pense qu'il faut protéger la diversité et la richesse de la langue française.</p>\n                        <p>Merci de votre attention.</p>\n                    </div>\n\n                    <p><b>Observez la dernière phrase des trois modèles&nbsp;:</b> chacune nuance la position au lieu de la durcir. C'est ce que valorise le jury — une opinion tenue, mais qui reconnaît la part de vrai chez l'autre.</p>\n                </div>"
    },
    {
     "titulo": "Expressions utiles",
     "html": "<div class=\"encadre-grammaire\">\n                    \n                    <p>À garder sous la main pendant la préparation. Une expression par fonction suffit&nbsp;; l'essentiel est de ne pas répéter la même.</p>\n                    <div class=\"enveloppe-tableau\">\n                        <table class=\"tableau-temps\">\n                            <thead><tr><th>Pour…</th><th>Vous pouvez dire</th></tr></thead>\n                            <tbody>\n                                <tr><td>Introduire une opinion</td><td>à mon avis, selon moi, personnellement, je pense que, il me semble que</td></tr>\n                                <tr><td>Ajouter une idée</td><td>de plus, par ailleurs, il faut aussi rappeler que, ajoutons que</td></tr>\n                                <tr><td>Justifier</td><td>en effet, la raison en est simple, cela s'explique par</td></tr>\n                                <tr><td>Donner un exemple</td><td>par exemple, ainsi, prenons le cas de, on peut citer</td></tr>\n                                <tr><td>Exprimer une conséquence</td><td>donc, par conséquent, c'est pourquoi, il en résulte que</td></tr>\n                                <tr><td>Nuancer</td><td>certes… mais, il est vrai que… cependant, dans une certaine mesure</td></tr>\n                                <tr><td>Conclure</td><td>pour conclure, en somme, finalement, je dirais que</td></tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>"
    }
   ],
   "ejercicios": []
  },
  {
   "titulo": "2. Exercices",
   "sous": "Series de práctica con corrección inmediata.",
   "rappels": [],
   "ejercicios": [
    0,
    1,
    2
   ]
  }
 ],
 "ejercicios": [
  {
   "t": "qcm",
   "etiqueta": "QCM 1",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "Quelle est la fonction de <b>«&#8239;en effet&#8239;»</b>&nbsp;?",
     "o": [
      "Conclure",
      "Justifier",
      "Donner un exemple"
     ],
     "r": 1,
     "note": "Exact&#8239;! «&#8239;En effet&#8239;» appuie ce qu'on vient d'affirmer&nbsp;: il donne la raison. Attention, ce n'est pas la béquille «&#8239;en efecto&#8239;» de l'espagnol."
    },
    {
     "enonce": "Quelle est la fonction de <b>«&#8239;finalement&#8239;»</b> dans un discours argumenté&nbsp;?",
     "o": [
      "Conclusion",
      "Addition",
      "Justification"
     ],
     "r": 0,
     "note": "Exact&#8239;! Ici «&#8239;finalement&#8239;» annonce la conclusion — non pas «&#8239;por fin&#8239;», mais «&#8239;en conclusion&#8239;»."
    },
    {
     "enonce": "Quelle est la fonction de <b>«&#8239;donc&#8239;»</b>&nbsp;?",
     "o": [
      "Exemple",
      "Conséquence",
      "Opposition"
     ],
     "r": 1,
     "note": "Exact&#8239;! «&#8239;Donc&#8239;» tire les conséquences de ce qui précède, comme «&#8239;par conséquent&#8239;»."
    },
    {
     "enonce": "Quelle est la fonction de <b>«&#8239;c'est-à-dire&#8239;»</b>&nbsp;?",
     "o": [
      "Préciser une idée",
      "Ajouter un argument",
      "Conclure"
     ],
     "r": 0,
     "note": "Exact&#8239;! «&#8239;C'est-à-dire&#8239;» reformule pour lever une ambiguïté, comme «&#8239;autrement dit&#8239;»."
    },
    {
     "enonce": "Complétez&nbsp;: «&#8239;Les anglicismes sont très présents dans les réseaux sociaux. ________, les jeunes les utilisent tous les jours.&#8239;»",
     "o": [
      "En effet",
      "Cependant",
      "Pour conclure"
     ],
     "r": 0,
     "note": "Exact&#8239;! La deuxième phrase justifie la première&nbsp;: elle en apporte la preuve."
    }
   ]
  },
  {
   "t": "qcm",
   "etiqueta": "QCM 2",
   "consigne": "Choisissez la bonne réponse.",
   "q": [
    {
     "enonce": "Complétez&nbsp;: «&#8239;Certains mots anglais remplacent des mots français. ________, on dit <i>mail</i> au lieu de <i>courriel</i>.&#8239;»",
     "o": [
      "Donc",
      "Par exemple",
      "En revanche"
     ],
     "r": 1,
     "note": "Exact&#8239;! La phrase donne un cas concret&nbsp;: c'est une illustration."
    },
    {
     "enonce": "Complétez&nbsp;: «&#8239;Cette situation pose des problèmes de compréhension. ________, il faut encourager l'usage du français.&#8239;»",
     "o": [
      "Par exemple",
      "Donc",
      "En effet"
     ],
     "r": 1,
     "note": "Exact&#8239;! On passe du constat à ce qu'il faudrait faire&nbsp;: c'est la conséquence."
    },
    {
     "enonce": "Quel est l'ordre correct d'un discours argumenté&nbsp;?",
     "o": [
      "Exemple ➔ introduction ➔ conclusion ➔ argument",
      "Introduction ➔ argument ➔ exemple ➔ conclusion",
      "Conclusion ➔ argument ➔ introduction ➔ exemple"
     ],
     "r": 1,
     "note": "Exact&#8239;! On annonce, on argumente, on illustre, puis on conclut. C'est le plan à mémoriser."
    },
    {
     "enonce": "Dans ce début de discours, quelle phrase vient <b>juste après</b>&nbsp;? «&#8239;Tout d'abord, je pense que les anglicismes posent un problème.&#8239;»",
     "o": [
      "En effet, beaucoup de mots français existent déjà.",
      "Merci de votre attention.",
      "Finalement, il faut trouver un équilibre."
     ],
     "r": 0,
     "note": "Exact&#8239;! Après avoir annoncé son opinion, on la justifie&nbsp;: c'est la deuxième étape du plan."
    },
    {
     "enonce": "Quel connecteur <b>ne convient pas</b> pour conclure&nbsp;?",
     "o": [
      "En somme",
      "Pour conclure",
      "Par ailleurs"
     ],
     "r": 2,
     "note": "Exact&#8239;! «&#8239;Par ailleurs&#8239;» ajoute un argument&nbsp;: l'employer pour conclure laisserait le discours ouvert."
    }
   ]
  },
  {
   "t": "trous",
   "etiqueta": "Saisie 1",
   "consigne": "Complétez, en écrivant le mot ou l’expression qui manque.",
   "sous": "Reponde en una palabra o expresión corta.",
   "q": [
    {
     "enonce": "Remplacez par un équivalent&nbsp;: «&#8239;<b>Premièrement</b>, les anglicismes sont partout.&#8239;» ➔ ___, les anglicismes sont partout. (trois mots, le plus courant à l'oral)",
     "r": [
      "tout d'abord"
     ],
     "taille": 16,
     "note": "«&#8239;Tout d'abord&#8239;» et «&#8239;premièrement&#8239;» ouvrent tous deux le discours&nbsp;: variez-les d'un paragraphe à l'autre."
    },
    {
     "enonce": "Complétez avec un connecteur d'addition (deux mots)&nbsp;: «&#8239;Les anglicismes sont utiles au travail. ___, ils facilitent les échanges internationaux.&#8239;»",
     "r": [
      "de plus",
      "en plus",
      "par ailleurs"
     ],
     "taille": 16,
     "note": "«&#8239;De plus&#8239;», «&#8239;en plus&#8239;» ou «&#8239;par ailleurs&#8239;» ajoutent un second argument de même sens."
    },
    {
     "enonce": "Complétez avec un connecteur de conclusion (deux mots)&nbsp;: «&#8239;___, il faut trouver un équilibre entre modernité et respect du français.&#8239;»",
     "r": [
      "pour conclure",
      "en conclusion",
      "en somme"
     ],
     "taille": 16,
     "note": "«&#8239;Pour conclure&#8239;», «&#8239;en conclusion&#8239;» ou «&#8239;en somme&#8239;» annoncent la dernière étape."
    },
    {
     "enonce": "Nuancez la conclusion&nbsp;: «&#8239;Je ne suis pas contre tous les anglicismes, ___ je pense qu'il faut protéger le français.&#8239;» (un mot)",
     "r": [
      "mais"
     ],
     "taille": 16,
     "note": "La concession suivie de «&#8239;mais&#8239;» est la marque d'une position tenue mais ouverte&nbsp;: c'est ce que valorise le jury."
    },
    {
     "enonce": "Quelle fonction remplit «&#8239;par ailleurs&#8239;»&nbsp;? Répondez en un mot&nbsp;: justification, addition ou conclusion&nbsp;?",
     "r": [
      "addition"
     ],
     "taille": 16,
     "note": "«&#8239;Par ailleurs&#8239;» ajoute un argument, comme «&#8239;de plus&#8239;» et «&#8239;ensuite&#8239;»."
    }
   ]
  }
 ]
});
})();
