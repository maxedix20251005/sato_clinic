// Lightweight shared header/footer using light DOM (no Shadow DOM)
(() => {
  const basePath = () => (location.pathname.includes('/subpages/') ? '..' : '.');
  const p = basePath();

  const page = (name) => (p === ".." ? `${name}.html` : `subpages/${name}.html`);
  const headerHTML = `
    <div class="site-header-top">
      <div class="container site-header-top-inner">
        <div class="header-logo-frame frame">
          <img src="${p}/image/Logo.png" alt="佐藤医院ロゴ">
        </div>
        <div class="header-hours">
          <div class="header-hours-tags">
            <span class="chip lang-toggle lang-ja">診察</span><span class="chip lang-toggle lang-en">Open</span>
            <span class="chip lang-toggle lang-ja">午前</span><span class="chip lang-toggle lang-en">AM</span>
            <span class="chip lang-toggle lang-ja">午後</span><span class="chip lang-toggle lang-en">PM</span>
          </div>
          <div>
            <div class="header-hours-text lang-toggle lang-ja">月、火、水、金、土（休診：木日祝）</div>
            <div class="header-hours-text lang-toggle lang-en">Mon, Tue, Wed, Fri, Sat (Closed Thu/Sun/Holidays)</div>
            <div class="header-hours-text">09:00-12:00</div>
            <div class="header-hours-text">14:00-19:00</div>
          </div>
        </div>
        <div class="header-cta-area">
          <div class="header-cta-buttons">
            <a href="${p === '..' ? 'booking.html' : 'subpages/booking.html'}" class="btn-pill btn-pill-header"><span class="lang-toggle lang-ja">WEB予約</span><span class="lang-toggle lang-en">Book Online</span></a>
            <a href="${p === '..' ? '../index.html#access' : '#access'}" class="btn-pill btn-pill-header"><span class="lang-toggle lang-ja">アクセス／お問い合わせ</span><span class="lang-toggle lang-en">Access / Contact</span></a>
          </div>
          <a href="tel:0000000000" class="header-phone">
            <div class="header-phone-icon"><img src="${p}/image/handset_blue.png" alt="Handset"></div>
            <span>00-0000-0000</span>
          </a>
        </div>
      </div>
    </div>
    <nav class="site-nav" aria-label="Global navigation">
      <div class="container site-nav-inner">
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" type="button">
          <span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span>
          <span class="nav-toggle-label lang-toggle lang-ja">メニュー</span><span class="nav-toggle-label lang-toggle lang-en">Menu</span>
        </button>
        <div class="nav-links" id="nav-links">
          <a href="${p === '..' ? '../index.html' : '#home'}"><span class="lang-toggle lang-ja">ホーム</span><span class="lang-toggle lang-en">Home</span></a>
          <a href="${page('news')}"><span class="lang-toggle lang-ja">おしらせ</span><span class="lang-toggle lang-en">News</span></a>
          <a href="${page('services')}"><span class="lang-toggle lang-ja">診察内容</span><span class="lang-toggle lang-en">Services</span></a>
          <a href="${page('about')}"><span class="lang-toggle lang-ja">当院について</span><span class="lang-toggle lang-en">About</span></a>
          <a href="${page('access')}"><span class="lang-toggle lang-ja">診療時間・所在地</span><span class="lang-toggle lang-en">Hours & Access</span></a>
          <a href="${page('faq')}"><span class="lang-toggle lang-ja">よくあるご質問</span><span class="lang-toggle lang-en">FAQ</span></a>
          <a href="${page('policy')}"><span class="lang-toggle lang-ja">理念・方針</span><span class="lang-toggle lang-en">Philosophy</span></a>
          <a href="${p === '..' ? '../index.html#access' : '#access'}"><span class="lang-toggle lang-ja">アクセス／お問い合わせ</span><span class="lang-toggle lang-en">Access / Contact</span></a>
        </div>
      </div>
      <div class="nav-overlay" aria-hidden="true"></div>
    </nav>
    <div class="nav-spacer" aria-hidden="true"></div>
  `;

  const footerHTML = `
    <div class="footer-top">
      <div class="container footer-links">
        <div>
          <div class="footer-column-title"><span class="lang-toggle lang-ja">ご案内</span><span class="lang-toggle lang-en">Info</span></div>
          <a href="${page('access')}" class="footer-link"><span class="lang-toggle lang-ja">診療時間・所在地</span><span class="lang-toggle lang-en">Hours & Access</span></a>
          <a href="${page('faq')}" class="footer-link"><span class="lang-toggle lang-ja">よくあるご質問</span><span class="lang-toggle lang-en">FAQ</span></a>
          <a href="${page('sitemap')}" class="footer-link"><span class="lang-toggle lang-ja">サイトマップ</span><span class="lang-toggle lang-en">Sitemap</span></a>
          <a href="${page('privacy')}" class="footer-link"><span class="lang-toggle lang-ja">プライバシーポリシー</span><span class="lang-toggle lang-en">Privacy Policy</span></a>
          <a href="${page('site-policy')}" class="footer-link"><span class="lang-toggle lang-ja">サイトポリシー</span><span class="lang-toggle lang-en">Site Policy</span></a>
        </div>
        <div>
          <div class="footer-column-title"><span class="lang-toggle lang-ja">当院について</span><span class="lang-toggle lang-en">About Clinic</span></div>
          <a href="${p === '..' ? '../index.html#greeting' : '#greeting'}" class="footer-link"><span class="lang-toggle lang-ja">院長挨拶</span><span class="lang-toggle lang-en">Director</span></a>
          <a href="${p === '..' ? '../index.html#staff' : '#staff'}" class="footer-link"><span class="lang-toggle lang-ja">医師・スタッフ</span><span class="lang-toggle lang-en">Staff</span></a>
          <a href="${p === '..' ? '../index.html#services' : '#services'}" class="footer-link"><span class="lang-toggle lang-ja">診察内容</span><span class="lang-toggle lang-en">Services</span></a>
        </div>
        <div>
          <div class="footer-column-title"><span class="lang-toggle lang-ja">ご予約はこちらから</span><span class="lang-toggle lang-en">Reservations</span></div>
          <a href="${p === '..' ? 'booking.html' : 'subpages/booking.html'}" class="footer-link"><span class="lang-toggle lang-ja">WEB予約</span><span class="lang-toggle lang-en">Book Online</span></a>
          <a href="${p === '..' ? 'questionnaire.html' : 'subpages/questionnaire.html'}" class="footer-link"><span class="lang-toggle lang-ja">WEB問診票</span><span class="lang-toggle lang-en">Intake Form</span></a>
          <a href="${p === '..' ? '../index.html#access' : '#access'}" class="footer-link"><span class="lang-toggle lang-ja">アクセス／お問い合わせ</span><span class="lang-toggle lang-en">Access / Contact</span></a>
        </div>
        <div>
          <div class="footer-column-title"><span class="lang-toggle lang-ja">診療時間・連絡先</span><span class="lang-toggle lang-en">Hours & Contact</span></div>
          <div class="footer-link"><span class="lang-toggle lang-ja">受付時間：9時〜12時 / 13時〜18時</span><span class="lang-toggle lang-en">Reception: 9:00-12:00 / 13:00-18:00</span></div>
          <div class="footer-link"><span class="lang-toggle lang-ja">休診日：木曜・土曜午後・日曜</span><span class="lang-toggle lang-en">Closed: Thu, Sat PM, Sun</span></div>
          <div class="footer-link"><span class="lang-toggle lang-ja">〒123-4567 東京都台東区上野0丁目0-0</span><span class="lang-toggle lang-en">0-0 Ueno 0-chome, Taito-ku, Tokyo 123-4567</span></div>
          <div class="footer-link">TEL: 00-0000-0000</div>
          <div class="footer-link">FAX: 00-0000-0000</div>
          <div class="footer-link">E-mail: info@sato-clinic-test.jp</div>
        </div>
        <div class="footer-lang">
          <div class="footer-lang-selector">
            <select aria-label="Language" class="footer-lang-select">
              <option value="ja">日本語</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      Copyright © 佐藤医院 All rights reserved<br />
      Produced by 20251005
    </div>
  `;

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = headerHTML;
      this.highlightCurrentNav();
      this.dispatchReady();
    }
    highlightCurrentNav() {
      const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      const targetMap = {
        'index.html': ['#home', '../index.html'],
        'news.html': ['news.html'],
        'services.html': ['services.html'],
        'about.html': ['about.html'],
        'access.html': ['access.html'],
        'faq.html': ['faq.html'],
        'policy.html': ['policy.html'],
        'booking.html': ['booking.html'],
        'questionnaire.html': ['questionnaire.html'],
      };
      const targets = targetMap[file] || [];
      const links = this.querySelectorAll('.nav-links a');
      links.forEach((a) => {
        const href = (a.getAttribute('href') || '').toLowerCase();
        if (targets.some((t) => href.includes(t))) {
          a.classList.add('is-active');
          a.setAttribute('aria-current', 'page');
        }
      });
    }
    dispatchReady() {
      window.dispatchEvent(new Event('layout-ready'));
    }
  }
  class SiteFooter extends HTMLElement {
    connectedCallback() {
      this.innerHTML = footerHTML;
      this.dispatchReady();
    }
    dispatchReady() {
      window.dispatchEvent(new Event('layout-ready'));
    }
  }

  customElements.define('site-header', SiteHeader);
  customElements.define('site-footer', SiteFooter);
})();
