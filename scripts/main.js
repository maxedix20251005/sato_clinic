// Main site interactions
document.addEventListener('DOMContentLoaded', () => {
  // Accordion (news)
  document.querySelectorAll('.news-item-header').forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.closest('.news-item');
      const panel = item?.querySelector('.news-item-content');
      const isOpen = item?.classList.toggle('open');
      if (header) header.setAttribute('aria-expanded', isOpen);
      if (panel) panel.toggleAttribute('hidden', !isOpen);
      const icon = header.querySelector('.news-item-icon');
      if (icon) icon.textContent = isOpen ? '−' : '+';
    });
  });

  // Hero alert dismiss
  const alertClose = document.querySelector('.hero-alert-close');
  const alertBox = document.querySelector('.hero-alert');
  alertClose?.addEventListener('click', () => alertBox?.classList.add('is-hidden'));

  // Hero alert marquee fallback
  const marqueeBody = document.querySelector('.hero-alert-body');
  const marqueeText = document.querySelector('.hero-alert-marquee');
  if (marqueeBody && marqueeText) {
    const clone = marqueeText.cloneNode(true);
    marqueeBody.appendChild(clone);
    marqueeBody.style.display = 'flex';
    marqueeBody.style.gap = '0';
    marqueeBody.style.alignItems = 'center';

    let x = 0;
    let last = null;
    const speedPxPerSec = 60;
    const tick = (ts) => {
      if (last === null) {
        last = ts;
        return requestAnimationFrame(tick);
      }
      const dt = ts - last;
      last = ts;
      const w = marqueeText.offsetWidth || 1;
      x -= (speedPxPerSec * dt) / 1000;
      if (-x >= w) x += w;
      marqueeText.style.transform = `translateX(${x}px)`;
      clone.style.transform = `translateX(${x + w}px)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');
  const closeNav = () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    navLinks?.classList.remove('is-open');
  };
  navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', (!isOpen).toString());
    navLinks?.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });
  navOverlay?.addEventListener('click', closeNav);
  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

  // Sticky nav
  const siteNav = document.querySelector('.site-nav');
  const headerTop = document.querySelector('.site-header-top');
  const updateStickyNav = () => {
    if (!siteNav || !headerTop) return;
    const trigger = headerTop.getBoundingClientRect().bottom + window.scrollY;
    const shouldFix = window.scrollY >= trigger;
    siteNav.classList.toggle('fixed', shouldFix);
  };
  window.addEventListener('scroll', updateStickyNav, { passive: true });
  window.addEventListener('resize', updateStickyNav);
  updateStickyNav();

  // Form validation helpers
  const showFieldError = (field) => {
    const group = field.closest('.form-group');
    if (!group) return;
    let err = group.querySelector('.field-error');
    if (!err) {
      err = document.createElement('div');
      err.className = 'field-error';
      group.appendChild(err);
    }
    err.textContent = field.validationMessage;
    group.classList.add('invalid');
  };
  const clearFieldError = (field) => {
    const group = field.closest('.form-group');
    if (!group) return;
    group.classList.remove('invalid');
    const err = group.querySelector('.field-error');
    if (err) err.textContent = '';
  };
  const randomCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();
  const showToast = (message) => {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  };
  const attachFieldValidation = (form) => {
    const fields = form.querySelectorAll('input:not([type="hidden"]), select, textarea');

    const formatPhone = (raw) => {
      const trimmed = raw.trim();
      const hasPlus = trimmed.startsWith('+');
      const digits = trimmed.replace(/[^0-9]/g, '');
      let formatted = hasPlus ? '+' : '';
      if (hasPlus) {
        formatted += digits;
      } else {
        if (digits.length <= 3) {
          formatted += digits;
        } else if (digits.length <= 7) {
          formatted += `${digits.slice(0, 3)}-${digits.slice(3)}`;
        } else if (digits.length <= 11) {
          formatted += `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
        } else {
          formatted += `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 15)}`;
        }
      }
      return { formatted, digits, hasPlus };
    };

    fields.forEach((field) => {
      const isPhone = field.id === 'phone';

      const runValidation = () => {
        if (isPhone) {
          const { formatted, digits } = formatPhone(field.value);
          if (formatted !== field.value) field.value = formatted;
          if (digits.length < 10 || digits.length > 15) {
            field.setCustomValidity('電話番号は10〜15桁の数字で入力してください。+は先頭のみ使用できます。');
          } else {
            field.setCustomValidity('');
          }
        }
        if (!field.checkValidity()) {
          showFieldError(field);
        } else {
          clearFieldError(field);
        }
      };

      field.addEventListener('blur', runValidation);
      field.addEventListener('input', () => {
        runValidation();
        updateSubmitState(form);
      });
      field.addEventListener('change', () => {
        runValidation();
        updateSubmitState(form);
      });
    });
  };

  const updateSubmitState = (form) => {
    const submit = form.querySelector('#submit-btn');
    if (!submit) return;
    const hiddenDate = form.querySelector('#date-value');
    const hiddenTime = form.querySelector('#time-value');
    const consent = form.querySelector('#consent');
    const valid = form.checkValidity();
    const readyDate = hiddenDate ? !!hiddenDate.value : true;
    const readyTime = hiddenTime ? !!hiddenTime.value : true;
    const readyConsent = consent ? consent.checked : true;
    submit.disabled = !(valid && readyDate && readyTime && readyConsent);
  };

  // Demo form submit (booking & questionnaire) with inline validation
  document.querySelectorAll('.reserve-form').forEach((form) => {
    attachFieldValidation(form);
    updateSubmitState(form);
    form.addEventListener('submit', (e) => {
      const hiddenDate = form.querySelector('#date-value');
      const hiddenTime = form.querySelector('#time-value');
      const availability = document.getElementById('booking-availability');
      if (hiddenDate || hiddenTime) {
        if (!hiddenDate?.value || !hiddenTime?.value) {
          e.preventDefault();
          alert('希望日時をカレンダーから選択してください。\nPlease select your date and time from the calendar.');
          if (availability) availability.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      let valid = form.checkValidity();
      if (!valid) {
        e.preventDefault();
        form.querySelectorAll('input:not([type="hidden"]), select, textarea').forEach((f) => {
          if (!f.checkValidity()) showFieldError(f);
        });
        form.reportValidity();
        updateSubmitState(form);
        return;
      }
      e.preventDefault();
      const code = randomCode();
      const dateVal = hiddenDate?.value || '';
      const timeVal = hiddenTime?.value || '';
      const nameVal = form.querySelector('#name')?.value || '';
      const phoneVal = form.querySelector('#phone')?.value || '';
      const emailVal = form.querySelector('#email')?.value || '';
      const symptomsVal = form.querySelector('#symptoms')?.value || '';
      const notesVal = form.querySelector('#notes')?.value || '';
      const bodyJa = `ご予約ありがとうございます。\n予約番号: ${code}\nご希望日時: ${dateVal} ${timeVal}\nお名前: ${nameVal}\n電話: ${phoneVal}\nメール: ${emailVal}\n症状・相談: ${symptomsVal}\nその他: ${notesVal}`;
      const mailto = `mailto:${encodeURIComponent(emailVal)}?subject=${encodeURIComponent('【佐藤医院】予約受付のお知らせ ('+code+')')}&body=${encodeURIComponent(bodyJa)}`;
      window.location.href = mailto;
      showToast(`予約を受け付けました (${code})`);
      form.reset();
      form.querySelectorAll('.field-error').forEach((el) => (el.textContent = ''));
      form.querySelectorAll('.form-group').forEach((g) => g.classList.remove('invalid'));
      const selectedSummary = document.getElementById('selected-summary');
      if (selectedSummary) selectedSummary.textContent = '';
      updateSubmitState(form);
    });
  });

  // Clinic open/closed indicator (JST)
  const statusChip = document.getElementById('status-chip');
  if (statusChip) {
    const schedule = {
      0: [],
      1: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '19:00' },
      ],
      2: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '19:00' },
      ],
      3: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '19:00' },
      ],
      4: [],
      5: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '19:00' },
      ],
      6: [{ start: '09:00', end: '12:00' }],
    };

    const toMinutes = (hhmm) => {
      const [h, m] = hhmm.split(':').map(Number);
      return h * 60 + m;
    };

    const now = new Date();
    const jst = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    const day = jst.getDay();
    const minutes = jst.getHours() * 60 + jst.getMinutes();
    const slots = schedule[day] || [];
    const openNow = slots.some((slot) => minutes >= toMinutes(slot.start) && minutes < toMinutes(slot.end));

    statusChip.classList.remove('status-open', 'status-closed');
    statusChip.classList.add(openNow ? 'status-open' : 'status-closed');
    statusChip.innerHTML = openNow
      ? '<span class="lang-toggle lang-ja">ただいま診察中</span><span class="lang-toggle lang-en">Open now</span>'
      : '<span class="lang-toggle lang-ja">休診中</span><span class="lang-toggle lang-en">Closed</span>';
  }

  // Booking availability (month view, mock data)
  const availabilityRoot = document.getElementById('booking-availability');
  if (availabilityRoot) {
    const dateInput = document.getElementById('date');
    const hiddenDate = document.getElementById('date-value');
    const timeSelect = document.getElementById('time');
    const hiddenTime = document.getElementById('time-value');
    const nameInput = document.getElementById('name');
    const calendarEl = availabilityRoot.querySelector('.calendar-days');
    const monthLabel = availabilityRoot.querySelector('.calendar-month-label');
    const navButtons = availabilityRoot.querySelectorAll('.calendar-nav');
    const slotsPanel = availabilityRoot.querySelector('.time-slots');
    const slotsLabel = availabilityRoot.querySelector('.time-slots-selected');
    const slotsEl = availabilityRoot.querySelector('.time-slots-list');
    let selectedDay = null;
    let selectedSlot = null;

    const nowJst = () => {
      const now = new Date();
      return new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    };

    const slotsTemplate = ['09:00','10:00','11:00','14:00','15:00','16:00','17:00','18:00'];
    const closedWeekdays = [0,4]; // Sun, Thu

    const availability = new Map();

    const keyForMonth = (year, month) => `${year}-${String(month+1).padStart(2,'0')}`;
    const daysInMonth = (y,m) => new Date(y, m+1, 0).getDate();

    const buildMonthData = (y, m) => {
      const key = keyForMonth(y,m);
      if (availability.has(key)) return availability.get(key);
      const data = {};
      const dim = daysInMonth(y,m);
      for (let d=1; d<=dim; d++) {
        const iso = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const day = new Date(iso).getDay();
        if (closedWeekdays.includes(day)) { data[iso] = {}; continue; }
        slotsTemplate.forEach((t)=>{
          const rnd = Math.random();
          const stat = rnd > 0.9 ? 'x' : rnd > 0.7 ? 'm' : 'o';
          if (!data[iso]) data[iso]={};
          data[iso][t]=stat;
        });
      }
      availability.set(key,data);
      return data;
    };

    const statusMark = (s) => (s === 'o' ? '〇' : s === 'm' ? '△' : '×');
    const statusClass = (s) => (s === 'o' ? 'day-open' : s === 'm' ? 'day-limited' : 'day-full');

    const summarizeDay = (slotsObj, iso) => {
      const vals = Object.entries(slotsObj || {});
      if (!vals.length) return 'x';
      const now = nowJst();
      const todayIso = now.toISOString().slice(0,10);
      const currentMinutes = now.getHours()*60 + now.getMinutes();
      let hasOpen=false, hasLimited=false;
      vals.forEach(([time,stat])=>{
        let effective = stat;
        if (iso === todayIso) {
          const [h,m] = time.split(':').map(Number);
          if (h*60+m <= currentMinutes) effective = 'x';
        }
        if (effective==='o') hasOpen=true; else if (effective==='m') hasLimited=true;
      });
      if (hasOpen) return 'o';
      if (hasLimited) return 'm';
      return 'x';
    };

    let monthOffset = 0; // 0 current, 1 next, 2 next+1

    const renderCalendar = () => {
      const base = nowJst();
      const viewDate = new Date(base.getFullYear(), base.getMonth()+monthOffset, 1);
      const y = viewDate.getFullYear();
      const m = viewDate.getMonth();
      const monthData = buildMonthData(y,m);
      const dim = daysInMonth(y,m);
      const today = nowJst();
      const todayIso = today.toISOString().slice(0,10);

      if (monthLabel) monthLabel.textContent = `${y} / ${m+1}`;
      navButtons.forEach(btn=>{
        const dir = Number(btn.dataset.dir);
        const nextOffset = monthOffset + dir;
        btn.disabled = nextOffset < 0 || nextOffset > 2;
      });

      calendarEl.innerHTML='';
      const firstDay = new Date(`${y}-${String(m+1).padStart(2,'0')}-01`).getDay();
      const offset = (firstDay + 6) % 7; // Mon start
      for (let i=0; i<offset; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty';
        calendarEl.appendChild(empty);
      }
      for (let d=1; d<=dim; d++) {
        const iso = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const status = summarizeDay(monthData[iso], iso);
        const isPast = new Date(iso) < new Date(todayIso);
        const btn = document.createElement('button');
        btn.type='button';
        btn.className = `calendar-day ${statusClass(status)}`;
        btn.dataset.date = iso;
        btn.innerHTML = `<div class="day-label">${d}</div><div class="day-mark">${statusMark(status)}</div>`;
        btn.disabled = status === 'x' || isPast;
        btn.addEventListener('click', () => selectDay(iso, monthData[iso]));
        calendarEl.appendChild(btn);
      }
      highlightSelectedDay();
    };

    const renderSlots = (iso, slotsObj) => {
      slotsEl.innerHTML='';
      const now = nowJst();
      const todayIso = now.toISOString().slice(0,10);
      const currentMinutes = now.getHours()*60+now.getMinutes();
      Object.entries(slotsObj || {}).forEach(([time,stat])=>{
        let effective = stat;
        if (iso===todayIso) {
          const [h,m] = time.split(':').map(Number);
          if (h*60+m <= currentMinutes) effective='x';
        }
        const btn = document.createElement('button');
        btn.type='button';
        btn.className = `slot ${statusClass(effective)}`;
        btn.textContent = `${time} ${statusMark(effective)}`;
        btn.disabled = effective==='x';
        btn.addEventListener('click', () => selectSlot(iso, time));
        slotsEl.appendChild(btn);
      });
      if (slotsPanel) slotsPanel.classList.add('open');
      updateSlotsLabel();
      highlightSelectedSlot();
    };

    const selectDay = (iso, slotsObj) => {
      selectedDay = iso;
      selectedSlot = null;
      renderSlots(iso, slotsObj);
      if (dateInput) dateInput.value = iso;
      if (hiddenDate) hiddenDate.value = iso;
      highlightSelectedDay();
      updateSlotsLabel();
      const bookingForm = document.querySelector('.reserve-form');
      if (bookingForm) updateSubmitState(bookingForm);
    };

    const selectSlot = (iso, time) => {
      if (dateInput) dateInput.value = iso;
      if (hiddenDate) hiddenDate.value = iso;
      if (timeSelect) {
        timeSelect.innerHTML='';
        const opt = document.createElement('option');
        opt.value = time;
        opt.textContent = time;
        timeSelect.appendChild(opt);
        timeSelect.value = time;
      }
      if (hiddenTime) hiddenTime.value = time;
      selectedDay = iso;
      selectedSlot = time;
      highlightSelectedDay();
      highlightSelectedSlot();
      updateSlotsLabel();
      if (nameInput) {
        nameInput.focus();
        nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      const bookingForm = document.querySelector('.reserve-form');
      if (bookingForm) updateSubmitState(bookingForm);
    };

    const updateSlotsLabel = () => {
      if (!slotsLabel) return;
      if (!selectedDay) { slotsLabel.textContent = ''; return; }
      const d = new Date(selectedDay);
      const label = `${d.getMonth()+1}/${d.getDate()}`;
      slotsLabel.textContent = selectedSlot ? `${label} - ${selectedSlot}` : `${label}`;
    };

    const highlightSelectedDay = () => {
      calendarEl.querySelectorAll('.calendar-day').forEach((el)=>{
        el.classList.toggle('selected', selectedDay && el.dataset.date === selectedDay);
      });
    };

    const highlightSelectedSlot = () => {
      slotsEl.querySelectorAll('.slot').forEach((el)=>{
        el.classList.toggle('selected', selectedSlot && el.textContent.startsWith(selectedSlot));
      });
    };

    navButtons.forEach((btn)=>{
      btn.addEventListener('click', ()=>{
        const dir = Number(btn.dataset.dir);
        const next = monthOffset + dir;
        if (next < 0 || next > 2) return;
        monthOffset = next;
        renderCalendar();
        slotsEl.innerHTML='';
        if (slotsPanel) slotsPanel.classList.remove('open');
        selectedDay = null; selectedSlot = null; updateSlotsLabel(); highlightSelectedDay();
      });
    });

    renderCalendar();
  }  // Back-to-top button
  const initBackToTop = () => {
    const isSub = location.pathname.includes('/subpages/');
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'ページ先頭へ');
    btn.innerHTML = `<img src="${isSub ? '..' : '.'}/image/icons/icon_go-to-top.png" alt="go to top">`;
    document.body.appendChild(btn);

    const toggle = () => {
      if (window.scrollY > 200) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    };

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  };
  initBackToTop();
});




