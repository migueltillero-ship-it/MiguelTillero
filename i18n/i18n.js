/**
 * Sistema de Internacionalización (i18n) para MiguelTillero.com
 * Soporta: ES, EN, FR
 */

const i18n = {
  currentLang: 'es',
  defaultLang: 'es',
  supportedLanguages: ['es', 'en', 'fr'],
  translations: {},

  /**
   * Inicializar el sistema i18n
   */
  async init() {
    try {
      // Recuperar idioma guardado o usar el del navegador o por defecto
      this.currentLang = this.getSavedLanguage();

      // Cargar todas las traducciones disponibles
      for (const lang of this.supportedLanguages) {
        await this.loadLanguage(lang);
      }

      // Aplicar idioma inicial
      await this.setLanguage(this.currentLang);
    } catch (error) {
      console.error('Error al inicializar i18n:', error);
      // Fallback a español
      this.currentLang = this.defaultLang;
    }
  },

  /**
   * Cargar un archivo de traducción JSON
   */
  async loadLanguage(lang) {
    try {
      const response = await fetch(`${window.I18N_BASE || ''}i18n/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${lang}.json`);
      }
      this.translations[lang] = await response.json();
    } catch (error) {
      console.error(`Error loading language file ${lang}:`, error);
      // Crear objeto vacío para evitar errores posteriores
      this.translations[lang] = {};
    }
  },

  /**
   * Obtener idioma guardado en localStorage o del navegador
   */
  getSavedLanguage() {
    try {
      // Verificar localStorage primero
      const saved = localStorage.getItem('mt_lang');
      if (saved && this.supportedLanguages.includes(saved)) {
        return saved;
      }
    } catch (e) {
      // localStorage no disponible
    }

    // Detectar idioma del navegador
    const browserLang = (navigator.language || navigator.userLanguage || 'es')
      .split('-')[0]
      .toLowerCase();

    if (this.supportedLanguages.includes(browserLang)) {
      return browserLang;
    }

    return this.defaultLang;
  },

  /**
   * Cambiar idioma activo
   */
  async setLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.warn(`Idioma no soportado: ${lang}`);
      return;
    }

    this.currentLang = lang;

    // Guardar en localStorage
    try {
      localStorage.setItem('mt_lang', lang);
    } catch (e) {
      console.warn('No se puede guardar en localStorage');
    }

    // Actualizar atributo lang en HTML
    document.documentElement.lang = lang;

    // Actualizar todo el contenido
    this.updateContent();

    // Actualizar botones de idioma activo
    this.updateLanguageButtons();

    // Disparar evento personalizado
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  },

  /**
   * Obtener una traducción por clave
   * Ej: i18n.t('nav.about') → "Acerca de"
   */
  t(key, defaultValue = key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }

    return typeof value === 'string' ? value : defaultValue;
  },

  /**
   * Actualizar contenido de la página
   */
  updateContent() {
    // Actualizar elementos con atributo data-i18n (nuevo sistema)
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.hasAttribute('data-i18n-placeholder')) {
          el.placeholder = translation;
        } else {
          el.value = translation;
        }
      } else if (el.tagName === 'OPTION') {
        el.textContent = translation;
      } else {
        el.textContent = translation;
      }
    });

    // Actualizar elementos con atributo data-i18n-html (para HTML)
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const translation = this.t(key);
      el.innerHTML = translation;
    });

    // Actualizar atributos específicos (title, aria-label, etc.)
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const attrs = el.getAttribute('data-i18n-attr').split(',');
      attrs.forEach((attr) => {
        const [attrName, key] = attr.trim().split(':');
        if (key) {
          const translation = this.t(key);
          el.setAttribute(attrName, translation);
        }
      });
    });

    // Compatibilidad: Actualizar elementos con atributos data-es, data-en, data-fr (sistema antiguo)
    document.querySelectorAll(`[data-${this.currentLang}]`).forEach((el) => {
      const translation = el.getAttribute(`data-${this.currentLang}`);
      if (translation) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translation;
        } else if (el.tagName === 'OPTION') {
          el.text = translation;
        } else {
          el.innerHTML = translation;
        }
      }
    });
  },

  /**
   * Actualizar estado de botones de idioma
   */
  updateLanguageButtons() {
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      const lang = btn.getAttribute('data-lang-btn');
      btn.classList.toggle('active', lang === this.currentLang);
    });

    // Mantener compatibilidad con sistema anterior
    document.querySelectorAll('.ctrl-btn, .footer-lb').forEach((btn) => {
      const btnText = btn.textContent.toLowerCase();
      btn.classList.toggle('active', btnText === this.currentLang);
    });
  },

  /**
   * Alias para compatibilidad con código anterior
   */
  setLang(lang) {
    this.setLanguage(lang);
  }
};

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}

// Exponer globalmente para ser usado en HTML
window.i18n = i18n;
window.setLang = (lang) => i18n.setLanguage(lang);
