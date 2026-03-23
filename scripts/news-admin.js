(() => {
  const DB_NAME = 'satoClinicNewsAdmin';
  const DB_VERSION = 1;
  const STORE = 'drafts';
  const KEY = 'news_all';

  const DEFAULT_ITEMS = [
    {
      id: 'news-1',
      date_ja: '2024年12月1日',
      date_en: 'Dec 1, 2024',
      title_ja: '年末年始の休診について',
      title_en: 'Year-End / New Year Schedule',
      body_ja: '年末年始の休診日は、12月29日（金）〜1月4日（木） となります。年始は1月5日（金）より通常診療を再開いたします。皆様にはご不便をおかけしますが、何卒ご了承くださいますようお願いいたします。',
      body_en: 'We will be closed from Dec 29 to Jan 4. Regular consultations resume on Jan 5.',
    },
    {
      id: 'news-2',
      date_ja: '2024年10月1日',
      date_en: 'Oct 1, 2024',
      title_ja: 'インフルエンザ予防接種について',
      title_en: 'Influenza Vaccinations',
      body_ja: '今年もインフルエンザの予防接種を開始いたしました。予約制となっておりますので、お電話または受付にてご予約をお願いいたします。例年、予約が集中しやすいため、早めのご予約をおすすめいたします。',
      body_en: 'Flu vaccinations are now available this season. Please make a reservation by phone or at reception.',
    },
    {
      id: 'news-3',
      date_ja: '2024年9月15日',
      date_en: 'Sep 15, 2024',
      title_ja: '健康診断のご案内',
      title_en: 'Health Checkups',
      body_ja: '今年も健康診断を実施しております。定期的な健康チェックは、病気の早期発見・予防にとても重要です。各種健康診断メニューをご用意しておりますので、ご希望の方はお電話にてお申し込みください。',
      body_en: 'We are offering annual health checkups. Regular checks are important for early detection and prevention.',
    },
    {
      id: 'news-4',
      date_ja: '2024年3月1日',
      date_en: 'Mar 1, 2024',
      title_ja: 'オンライン診療の導入について',
      title_en: 'Online Consultations',
      body_ja: '2024年より、オンライン診療を一部導入いたしました。通院が難しい方や、遠方にお住まいの方にご利用いただけます。ご希望の方は、当院スタッフまでお問い合わせください。 皆様の健康をサポートできるよう、スタッフ一同努めてまいります。何かご不明な点がございましたら、お気軽にお問い合わせください。',
      body_en: 'We have introduced partial online consultations from 2024 for patients with difficulty visiting the clinic.',
    },
    {
      id: 'news-5',
      date_ja: '2024年1月10日',
      date_en: 'Jan 10, 2024',
      title_ja: '新型コロナウイルス対策について',
      title_en: 'COVID-19 Measures',
      body_ja: '当院では引き続き、新型コロナウイルス感染症対策を徹底しております。ご来院の際には、マスクの着用、手指消毒にご協力をお願いいたします。また、発熱や風邪症状のある方は、事前にお電話でご相談いただけるとスムーズにご案内が可能です。',
      body_en: 'We continue strict COVID-19 measures. Please wear a mask and sanitize your hands when visiting.',
    },
  ];

  const tableBody = document.getElementById('news-table-body');
  const message = document.getElementById('admin-message');
  const form = document.getElementById('news-editor-form');
  const editorTitle = document.getElementById('editor-title');
  const btnAdd = document.getElementById('add-news');
  const btnLoad = document.getElementById('load-draft');
  const btnSave = document.getElementById('save-draft');
  const btnExport = document.getElementById('export-json');
  const btnClear = document.getElementById('clear-draft');
  const btnCancel = document.getElementById('cancel-edit');
  const fileInput = document.getElementById('import-json');

  if (!tableBody || !message || !form) return;

  const state = {
    items: [],
    sortKey: 'date',
    sortDir: 'desc',
    editingId: null,
  };

  const showMessage = (text, isError = false) => {
    message.textContent = text;
    message.classList.toggle('is-error', isError);
  };

  const nowIso = () => new Date().toISOString();

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
    if (!Number.isNaN(enStamp)) return enStamp;
    return 0;
  };

  const compareText = (a, b) => a.localeCompare(b, 'ja');

  const sortedItems = () => {
    const rows = [...state.items];
    rows.sort((a, b) => {
      let cmp = 0;
      if (state.sortKey === 'date') {
        cmp = parseDateToStamp(a) - parseDateToStamp(b);
      } else if (state.sortKey === 'updated_at') {
        cmp = Date.parse(a.updated_at || '') - Date.parse(b.updated_at || '');
      } else if (state.sortKey === 'title_ja' || state.sortKey === 'title_en') {
        cmp = compareText(String(a[state.sortKey] || ''), String(b[state.sortKey] || ''));
      }
      if (cmp === 0) cmp = compareText(String(a.id || ''), String(b.id || ''));
      return state.sortDir === 'asc' ? cmp : -cmp;
    });
    return rows;
  };

  const openDb = () =>
    new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

  const withStore = async (mode, run) => {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const store = tx.objectStore(STORE);
      const result = run(store);
      tx.oncomplete = () => {
        db.close();
        resolve(result);
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
  };

  const normalizeItem = (src) => {
    const id = String(src?.id || `news-${Date.now()}`);
    const created = String(src?.created_at || nowIso());
    const updated = String(src?.updated_at || created);
    return {
      id,
      date_ja: String(src?.date_ja || ''),
      date_en: String(src?.date_en || ''),
      title_ja: String(src?.title_ja || ''),
      title_en: String(src?.title_en || ''),
      body_ja: String(src?.body_ja || ''),
      body_en: String(src?.body_en || ''),
      created_at: created,
      updated_at: updated,
    };
  };

  const exportPayload = () => ({
    version: 2,
    generated_at: nowIso(),
    items: sortedItems().map((x) => ({
      id: x.id,
      date_ja: x.date_ja,
      date_en: x.date_en,
      title_ja: x.title_ja,
      title_en: x.title_en,
      body_ja: x.body_ja,
      body_en: x.body_en,
      created_at: x.created_at,
      updated_at: x.updated_at,
    })),
  });

  const saveDraft = async () => {
    await withStore('readwrite', (store) => store.put(exportPayload(), KEY));
  };

  const loadDraft = async () => {
    const data = await withStore('readonly', (store) =>
      new Promise((resolve, reject) => {
        const req = store.get(KEY);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      }));
    if (!data || !Array.isArray(data.items)) return null;
    return data;
  };

  const createId = () => {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return `news-${window.crypto.randomUUID().slice(0, 8)}`;
    }
    return `news-${Date.now()}`;
  };

  const renderSortState = () => {
    document.querySelectorAll('.admin-sort-btn').forEach((btn) => {
      const key = btn.dataset.sortKey;
      const mark = key === state.sortKey ? (state.sortDir === 'asc' ? ' ▲' : ' ▼') : '';
      const ja = btn.querySelector('.lang-ja');
      const en = btn.querySelector('.lang-en');
      if (ja) {
        const base = ja.textContent.replace(/[ ▲▼]$/, '');
        ja.textContent = `${base}${mark}`;
      }
      if (en) {
        const base = en.textContent.replace(/[ ▲▼]$/, '');
        en.textContent = `${base}${mark}`;
      }
    });
  };

  const renderTable = () => {
    const rows = sortedItems();
    if (rows.length === 0) {
      tableBody.innerHTML = `
        <tr><td colspan="5"><span class="lang-toggle lang-ja">おしらせがありません。新規登録してください。</span><span class="lang-toggle lang-en">No items. Please add a new one.</span></td></tr>
      `;
      return;
    }

    tableBody.innerHTML = rows.map((item) => {
      const updated = item.updated_at ? new Date(item.updated_at).toLocaleString() : '-';
      return `
        <tr data-row-id="${item.id}">
          <td>${item.date_ja || '-'}</td>
          <td>${item.title_ja || '-'}</td>
          <td>${item.title_en || '-'}</td>
          <td>${updated}</td>
          <td class="admin-actions-cell">
            <button type="button" class="admin-table-btn edit" data-action="edit" data-id="${item.id}"><span class="lang-toggle lang-ja">編集</span><span class="lang-toggle lang-en">Edit</span></button>
            <button type="button" class="admin-table-btn delete" data-action="delete" data-id="${item.id}"><span class="lang-toggle lang-ja">削除</span><span class="lang-toggle lang-en">Delete</span></button>
          </td>
        </tr>
      `;
    }).join('');
  };

  const resetEditor = () => {
    state.editingId = null;
    form.reset();
    const idField = form.querySelector('#edit-id');
    if (idField) idField.value = '';
    if (editorTitle) {
      editorTitle.innerHTML = '<span class="lang-toggle lang-ja">おしらせ編集（新規）</span><span class="lang-toggle lang-en">Edit News (New)</span>';
    }
  };

  const setEditor = (item) => {
    if (!item) return;
    state.editingId = item.id;
    const set = (id, v) => {
      const el = form.querySelector(`#${id}`);
      if (el) el.value = v || '';
    };
    set('edit-id', item.id);
    set('edit-date-ja', item.date_ja);
    set('edit-date-en', item.date_en);
    set('edit-title-ja', item.title_ja);
    set('edit-title-en', item.title_en);
    set('edit-body-ja', item.body_ja);
    set('edit-body-en', item.body_en);
    if (editorTitle) {
      editorTitle.innerHTML = '<span class="lang-toggle lang-ja">おしらせ編集（1件）</span><span class="lang-toggle lang-en">Edit News (Single)</span>';
    }
  };

  const upsertItem = (item) => {
    const idx = state.items.findIndex((x) => x.id === item.id);
    if (idx >= 0) state.items[idx] = item;
    else state.items.push(item);
  };

  const removeItem = (id) => {
    state.items = state.items.filter((x) => x.id !== id);
    if (state.editingId === id) resetEditor();
  };

  const handleSaveEditor = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const id = String(formData.get('id') || '').trim() || createId();
    const before = state.items.find((x) => x.id === id);
    const now = nowIso();
    const next = normalizeItem({
      id,
      date_ja: formData.get('date_ja'),
      date_en: formData.get('date_en'),
      title_ja: formData.get('title_ja'),
      title_en: formData.get('title_en'),
      body_ja: formData.get('body_ja'),
      body_en: formData.get('body_en'),
      created_at: before?.created_at || now,
      updated_at: now,
    });

    upsertItem(next);
    renderTable();
    renderSortState();
    setEditor(next);
    await saveDraft();
    showMessage('保存しました。下書きにも反映済みです / Saved and draft updated.');
  };

  const onTableClick = async (event) => {
    const btn = event.target.closest('button[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    const item = state.items.find((x) => x.id === id);
    if (!id || !item) return;
    if (action === 'edit') {
      setEditor(item);
      showMessage('一覧から選択したおしらせを編集中です / Editing selected item.');
      return;
    }
    if (action === 'delete') {
      const ok = confirm('このおしらせを削除します。よろしいですか？ / Delete this news item?');
      if (!ok) return;
      removeItem(id);
      renderTable();
      await saveDraft();
      showMessage('削除しました。下書きにも反映済みです / Deleted and draft updated.');
    }
  };

  const onSortClick = (event) => {
    const btn = event.target.closest('.admin-sort-btn');
    if (!btn) return;
    const key = btn.dataset.sortKey;
    if (!key) return;
    if (state.sortKey === key) {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortKey = key;
      state.sortDir = key === 'date' || key === 'updated_at' ? 'desc' : 'asc';
    }
    renderTable();
    renderSortState();
  };

  const exportJson = () => {
    const payload = exportPayload();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    a.href = url;
    a.download = `sato_clinic_news_${ts}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file) => {
    const text = await file.text();
    const data = JSON.parse(text);
    if (!data || !Array.isArray(data.items)) throw new Error('invalid format');
    state.items = data.items.map(normalizeItem);
    renderTable();
    renderSortState();
    resetEditor();
    await saveDraft();
    showMessage('JSONを読み込みました / JSON imported.');
  };

  const seedIfEmpty = async () => {
    const loaded = await loadDraft();
    if (loaded && Array.isArray(loaded.items) && loaded.items.length > 0) {
      state.items = loaded.items.map(normalizeItem);
      return;
    }
    state.items = DEFAULT_ITEMS.map((item, idx) => {
      const created = new Date(Date.now() - (DEFAULT_ITEMS.length - idx) * 60000).toISOString();
      return normalizeItem({ ...item, created_at: created, updated_at: created });
    });
    await saveDraft();
    showMessage('初期データ（5件）をセットしました / Seeded with 5 default items.');
  };

  const wireEvents = () => {
    form.addEventListener('submit', (e) => {
      handleSaveEditor(e).catch(() => showMessage('保存に失敗しました / Failed to save.', true));
    });

    tableBody.addEventListener('click', (e) => {
      onTableClick(e).catch(() => showMessage('操作に失敗しました / Action failed.', true));
    });

    document.querySelectorAll('.admin-sort-btn').forEach((btn) => {
      btn.addEventListener('click', onSortClick);
    });

    btnAdd?.addEventListener('click', () => {
      resetEditor();
      showMessage('新規入力モードです / New item mode.');
    });

    btnCancel?.addEventListener('click', () => {
      resetEditor();
      showMessage('編集をキャンセルしました / Edit canceled.');
    });

    btnSave?.addEventListener('click', async () => {
      try {
        await saveDraft();
        showMessage('下書きを保存しました / Draft saved.');
      } catch {
        showMessage('下書き保存に失敗しました / Failed to save draft.', true);
      }
    });

    btnLoad?.addEventListener('click', async () => {
      try {
        const data = await loadDraft();
        if (!data || !Array.isArray(data.items)) {
          showMessage('保存済み下書きがありません / No saved draft.', true);
          return;
        }
        state.items = data.items.map(normalizeItem);
        renderTable();
        renderSortState();
        resetEditor();
        showMessage('下書きを読み込みました / Draft loaded.');
      } catch {
        showMessage('下書き読込に失敗しました / Failed to load draft.', true);
      }
    });

    btnClear?.addEventListener('click', async () => {
      const ok = confirm('下書きを全削除します。よろしいですか？ / Clear all draft data?');
      if (!ok) return;
      try {
        await withStore('readwrite', (store) => store.delete(KEY));
        state.items = [];
        renderTable();
        resetEditor();
        showMessage('下書きを削除しました / Draft cleared.');
      } catch {
        showMessage('下書き削除に失敗しました / Failed to clear draft.', true);
      }
    });

    btnExport?.addEventListener('click', () => {
      try {
        exportJson();
        showMessage('JSONをエクスポートしました / JSON exported.');
      } catch {
        showMessage('JSONエクスポートに失敗しました / Failed to export JSON.', true);
      }
    });

    fileInput?.addEventListener('change', async () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      try {
        await importJson(file);
      } catch {
        showMessage('JSONインポートに失敗しました / Failed to import JSON.', true);
      } finally {
        fileInput.value = '';
      }
    });
  };

  const init = async () => {
    try {
      await seedIfEmpty();
      renderTable();
      renderSortState();
      resetEditor();
      wireEvents();
    } catch {
      showMessage('初期化に失敗しました。ブラウザ設定をご確認ください / Initialization failed.', true);
    }
  };

  init();
})();
