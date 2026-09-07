const traducciones = {
    es: {
        "nav.perfil": "Perfil",
        "nav.servicios": "Servicios",
        "nav.cursos": "Cursos",
        "nav.galeria": "Galería",
        "nav.testimonios": "Testimonios",
        "nav.ressources": "Recursos",
        "nav.contacto": "Contacto",
        "nav.cotizar": "Cotizar / Inscribirse"
    },
    fr: {
        "nav.perfil": "Profil",
        "nav.servicios": "Services",
        "nav.cursos": "Cours",
        "nav.galeria": "Galerie",
        "nav.testimonios": "Témoignages",
        "nav.ressources": "Ressources",
        "nav.contacto": "Contact",
        "nav.cotizar": "S'inscrire"
    },
    en: {
        "nav.perfil": "Profile",
        "nav.servicios": "Services",
        "nav.cursos": "Courses",
        "nav.galeria": "Gallery",
        "nav.testimonios": "Testimonials",
        "nav.ressources": "Resources",
        "nav.contacto": "Contact",
        "nav.cotizar": "Enroll / Quote"
    }
};

function setLang(lang) {
    // 1. Guardar la preferencia del usuario en la memoria del navegador
    localStorage.setItem('preferenciaIdioma_MT', lang);
    
    // 2. Cambiar el idioma base del documento
    document.documentElement.lang = lang;

    // 3. Buscar todas las anclas de texto y traducir
    document.querySelectorAll('[data-i18n]').forEach(elemento => {
        const clave = elemento.getAttribute('data-i18n');
        if (traducciones[lang] && traducciones[lang][clave]) {
            elemento.innerText = traducciones[lang][clave];
        }
    });

    // 4. Actualizar visualmente el botón activo en la barra superior
    document.querySelectorAll('.ctrl-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === lang) {
            btn.classList.add('active');
        }
    });
}

// 5. Autoejecutar al cargar la página para recordar la selección
document.addEventListener('DOMContentLoaded', () => {
    const idiomaGuardado = localStorage.getItem('preferenciaIdioma_MT') || 'es';
    setLang(idiomaGuardado);
});
