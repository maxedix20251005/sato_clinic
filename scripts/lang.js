(() => {
  const LS_KEY = 'siteLang';

  const applyLang = (lang) => {
    const body = document.body;
    if (!body) return;
    body.classList.toggle('lang-en', lang === 'en');
    body.classList.toggle('lang-ja', lang !== 'en');
    document.querySelectorAll('.footer-lang-select').forEach(sel => sel.value = lang);
    document.querySelectorAll('[data-placeholder-ja],[data-placeholder-en]').forEach(el => {
      const text = lang === 'en'
        ? el.getAttribute('data-placeholder-en') || el.getAttribute('placeholder')
        : el.getAttribute('data-placeholder-ja') || el.getAttribute('placeholder');
      if (text !== null) {
        el.setAttribute('placeholder', text);
      }
    });
    try { localStorage.setItem(LS_KEY, lang); } catch (e) { /* ignore */ }
  };

  const saved = (() => {
    try { return localStorage.getItem(LS_KEY) || 'ja'; }
    catch { return 'ja'; }
  })();

  applyLang(saved);

  const currentLang = () => {
    if (document.body?.classList.contains('lang-en')) return 'en';
    if (document.body?.classList.contains('lang-ja')) return 'ja';
    try { return localStorage.getItem(LS_KEY) || 'ja'; }
    catch { return 'ja'; }
  };

  // Header/Footer are injected after this script runs, so re-sync selector value.
  window.addEventListener('layout-ready', () => {
    applyLang(currentLang());
  });

  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t && t.classList && t.classList.contains('footer-lang-select')) {
      applyLang(t.value);
    }
  });
})();
