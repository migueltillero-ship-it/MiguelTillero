const I18N_CONFIG = {
  es: {
    'nav.perfil': 'Perfil',
    'nav.servicios': 'Servicios',
    'nav.cursos': 'Cursos',
    'nav.galeria': 'Galería',
    'nav.testimonios': 'Testimonios',
    'nav.ressources': 'Recursos',
    'nav.contacto': 'Contacto',
    'nav.cotizar': 'Cotizar / Inscribirse',
    'hero.title': 'Excelencia, rigor y cercanía en la enseñanza del francés'
  },
  fr: {
    'nav.perfil': 'Profil',
    'nav.servicios': 'Services',
    'nav.cursos': 'Cours',
    'nav.galeria': 'Galerie',
    'nav.testimonios': 'Témoignages',
    'nav.ressources': 'Ressources',
    'nav.contacto': 'Contact',
    'nav.cotizar': 'Devis / Inscription',
    'hero.title': 'Excellence, rigueur et proximité dans l’enseignement du français'
  },
  en: {
    'nav.perfil': 'Profile',
    'nav.servicios': 'Services',
    'nav.cursos': 'Courses',
    'nav.galeria': 'Gallery',
    'nav.testimonios': 'Testimonials',
    'nav.ressources': 'Resources',
    'nav.contacto': 'Contact',
    'nav.cotizar': 'Quote / Enroll',
    'hero.title': 'Excellence, rigor and proximity in teaching French'
  }
};

function setLang(lang) {
  document.documentElement.lang = lang;
  try { localStorage.setItem('user_lang', lang); } catch(e) {}
  const dict = I18N_CONFIG[lang] || I18N_CONFIG.es;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('.ctrl-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === lang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = (() => { try { return localStorage.getItem('user_lang'); } catch(e){ return null; } })();
  setLang(saved || 'es');
});
