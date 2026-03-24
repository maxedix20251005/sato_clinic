(() => {
  const DB_NAME = 'satoClinicNewsAdmin';
  const DB_VERSION = 1;
  const STORE = 'drafts';
  const KEY = 'news_all';
  const LS_FALLBACK_KEY = 'satoClinicNewsAdmin_news_all';

  const parseDateToStamp = (item) => {
    const ja = String(item?.date_ja || '');
    const m = ja.match(/(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日/);
    if (m) {
      const y = Number(m[1]);
      const mm = Number(m[2]) - 1;
      const d = Number(m[3]);
      return Date.UTC(y, mm, d);
    }
    const enStamp = Date.parse(String(item?.date_en || ''));
    return Number.isNaN(enStamp) ? 0 : enStamp;
  };

  const openDb = () =>
    new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

  const loadItemsFromIndexedDb = async () => {
    const db = await openDb();
    try {
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const store = tx.objectStore(STORE);
        const req = store.get(KEY);
        req.onsuccess = () => {
          const data = req.result;
          if (!data || !Array.isArray(data.items)) {
            resolve([]);
            return;
          }
          resolve(data.items);
        };
        req.onerror = () => reject(req.error);
      });
    } finally {
      db.close();
    }
  };

  const loadItems = async () => {
    try {
      return await loadItemsFromIndexedDb();
    } catch {
      try {
        const raw = localStorage.getItem(LS_FALLBACK_KEY);
        if (!raw) return [];
        const data = JSON.parse(raw);
        if (!data || !Array.isArray(data.items)) return [];
        return data.items;
      } catch {
        return [];
      }
    }
  };

  const renderTopNews = (items) => {
    const list = document.querySelector('#news .news-list-simple');
    if (!list || items.length === 0) return;
    const top5 = [...items].sort((a, b) => parseDateToStamp(b) - parseDateToStamp(a)).slice(0, 5);
    list.innerHTML = top5.map((item) => {
      const id = String(item.id || '');
      const titleJa = String(item.title_ja || '');
      const titleEn = String(item.title_en || '');
      return `<li><a href="subpages/news.html#${id}"><span class="lang-toggle lang-ja">${titleJa}</span><span class="lang-toggle lang-en">${titleEn}</span></a></li>`;
    }).join('');
  };

  const renderArchiveNews = (items) => {
    const list = document.querySelector('.news-archive-list');
    if (!list || items.length === 0) return;
    const rows = [...items].sort((a, b) => parseDateToStamp(b) - parseDateToStamp(a));
    list.innerHTML = rows.map((item) => {
      const id = String(item.id || '');
      const dateJa = String(item.date_ja || '');
      const titleJa = String(item.title_ja || '');
      const titleEn = String(item.title_en || '');
      const bodyJa = String(item.body_ja || '');
      const bodyEn = String(item.body_en || '');
      return `<div class="news-archive-item" id="${id}">
        <div class="news-archive-date">${dateJa}</div>
        <h3 class="news-archive-title"><span class="lang-toggle lang-ja">${titleJa}</span><span class="lang-toggle lang-en">${titleEn}</span></h3>
        <p><span class="lang-toggle lang-ja">${bodyJa}</span><span class="lang-toggle lang-en">${bodyEn}</span></p>
      </div>`;
    }).join('');
  };

  const init = async () => {
    try {
      const items = await loadItems();
      renderTopNews(items);
      renderArchiveNews(items);
      if (window.applyLanguage) window.applyLanguage();
    } catch {
      // Keep static fallback when IndexedDB is unavailable.
    }
  };

  document.addEventListener('DOMContentLoaded', init);
})();
