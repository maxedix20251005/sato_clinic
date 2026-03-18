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

  // Demo form submit (booking & questionnaire)
  document.querySelectorAll('.reserve-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('送信ありがとうございました。内容を確認後ご連絡いたします。');
      form.reset();
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
});
