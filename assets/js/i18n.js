const traducciones = {
    es: {
        "nav.perfil": "Perfil", "nav.servicios": "Servicios", "nav.cursos": "Cursos", "nav.galeria": "Galería", "nav.testimonios": "Testimonios", "nav.ressources": "Recursos", "nav.contacto": "Contacto", "nav.cotizar": "Cotizar / Inscribirse",
        "hero.tagline": "Profesor especialista en la enseñanza del francés como lengua extranjera · FLE · Gestión cultural.",
        "hero.btn.start": "Comenzar clases",
        "hero.btn.contact": "Escribirme",
        "cv.es": "Descargar CV · Español", "cv.fr": "Télécharger CV · Français", "cv.en": "Download CV · English",
        "sec.servicios.eyebrow": "Mis áreas de especialidad", "sec.servicios.title": "Lo que ofrezco",
        "sec.cursos.eyebrow": "Nuestra oferta para aprender francés", "sec.cursos.title": "Cursos y modalidades",
        "sec.galeria.eyebrow": "Momentos y proyectos", "sec.galeria.title": "Galería",
        "sec.testimonios.eyebrow": "Lo que dicen de mí", "sec.testimonios.title": "Testimonios",
        "sec.recursos.eyebrow": "Mediateca abierta", "sec.recursos.title": "Recursos para practicar",
        "sec.contacto.eyebrow": "Hablemos", "sec.contacto.title": "Contáctame"
    },
    fr: {
        "nav.perfil": "Profil", "nav.servicios": "Services", "nav.cursos": "Cours", "nav.galeria": "Galerie", "nav.testimonios": "Témoignages", "nav.ressources": "Ressources", "nav.contacto": "Contact", "nav.cotizar": "S'inscrire",
        "hero.tagline": "Spécialiste de l'enseignement du français langue étrangère · FLE · Direction culturelle.",
        "hero.btn.start": "Commencer les cours",
        "hero.btn.contact": "Me contacter",
        "cv.es": "Télécharger CV · Espagnol", "cv.fr": "Télécharger CV · Français", "cv.en": "Télécharger CV · Anglais",
        "sec.servicios.eyebrow": "Mes domaines d'expertise", "sec.servicios.title": "Domaines d'expertise",
        "sec.cursos.eyebrow": "Notre offre pour apprendre le français", "sec.cursos.title": "Cours et formats",
        "sec.galeria.eyebrow": "Moments et projets", "sec.galeria.title": "Galerie",
        "sec.testimonios.eyebrow": "Ce qu'ils disent", "sec.testimonios.title": "Témoignages",
        "sec.recursos.eyebrow": "Médiathèque ouverte", "sec.recursos.title": "Ressources pour pratiquer",
        "sec.contacto.eyebrow": "Parlons ensemble", "sec.contacto.title": "Me contacter"
    },
    en: {
        "nav.perfil": "Profile", "nav.servicios": "Services", "nav.cursos": "Courses", "nav.galeria": "Gallery", "nav.testimonios": "Testimonials", "nav.ressources": "Resources", "nav.contacto": "Contact", "nav.cotizar": "Enroll / Quote",
        "hero.tagline": "French as a Foreign Language Specialist · FLE Teaching · Cultural Management.",
        "hero.btn.start": "Start classes",
        "hero.btn.contact": "Contact me",
        "cv.es": "Download CV · Spanish", "cv.fr": "Download CV · French", "cv.en": "Download CV · English",
        "sec.servicios.eyebrow": "My areas of expertise", "sec.servicios.title": "What I offer",
        "sec.cursos.eyebrow": "Our offer to learn French", "sec.cursos.title": "Courses & formats",
        "sec.galeria.eyebrow": "Moments & projects", "sec.galeria.title": "Gallery",
        "sec.testimonios.eyebrow": "What they say", "sec.testimonios.title": "Testimonials",
        "sec.recursos.eyebrow": "Open media library", "sec.recursos.title": "Resources to practise",
        "sec.contacto.eyebrow": "Let's talk", "sec.contacto.title": "Get in touch"
    }
};

function setLang(lang) {
    localStorage.setItem('preferenciaIdioma_MT', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(elemento => {
        const clave = elemento.getAttribute('data-i18n');
        if (traducciones[lang] && traducciones[lang][clave]) {
            elemento.innerText = traducciones[lang][clave];
        }
    });
    document.querySelectorAll('.ctrl-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === lang) { btn.classList.add('active'); }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const idiomaGuardado = localStorage.getItem('preferenciaIdioma_MT') || 'es';
    setLang(idiomaGuardado);
});
