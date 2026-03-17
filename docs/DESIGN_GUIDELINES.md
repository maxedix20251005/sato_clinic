# Design Guidelines / デザインガイドライン

Purpose / 目的
- Keep a calm, trustworthy clinic feel; prioritize clarity for booking, hours, and access.
- 信頼感と落ち着き。予約・診察時間・アクセスを最優先にわかりやすく。

Brand Tone / トーン
- Friendly, clinical, uncluttered; avoid heavy gradients and busy textures.
- 親しみやすく清潔。過度なグラデや装飾は避ける。

Typography / タイポグラフィ
- Font: `Noto Sans JP`, base 16px, line-height 1.8.
- Headings: 20–28px; section titles bold; body 16px; small meta 14px max.
- ラベル・ボタンは 15–16px、英語も同サイズで揃える。

Color System / カラー
- Primary Blue `#0065a8`; Secondary Blue `#1c85d6`; Accent Green `#4caf50`; Light Green BG `#dff4d8`.
- Text main `#1f3d55`; Muted `#567`; Borders `#e1e5ec`.
- Use green for positive/status, blue for links/CTAs, gray for neutral.

Spacing & Layout / 余白・レイアウト
- Container: `min(1180px, 100% - 32px)`.
- Grid gaps: 24px desktop; 16px mobile. Section top/bottom padding: 48–64px.
- Card padding: 24px desktop, 16px mobile. Border radius: cards 22px, pills 999px.

Buttons / ボタン
- Base `.btn-pill`; Primary: blue fill, Secondary: outline blue; Hover: slightly darker fill/outline.
- Minimum touch target 44px height; padding (h) 12–14px.

Navigation / ナビ
- Desktop inline links; Mobile hamburger with overlay and body lock.
- Focus visible ring per `--focus-ring`. Keep text contrast AA+.

Hero / ヒーロー
- Dual CTAs (WEB予約 primary, アクセス secondary).
- Optional alert bar closable; keep copy within 2 lines on mobile.

Hours Section / 診察時間セクション
- Use semantic HTML table (no images). `.lang-toggle` for JA/EN.
- Icons: green dot = open, slash = closed; note text matches left panel size (16px).
- Mobile: stack into card style; day labels from data attributes.

Cards & Lists / カード・リスト
- White background, subtle shadow `var(--shadow-md)`, 1px border `--border-gray`.
- Headings bold, body 16px, links use primary blue.

Imagery / 画像
- Use soft, natural photos; avoid high-saturation. Maintain consistent border-radius (22px) and subtle shadow for inset photos.
- Optimize to reasonable dimensions; keep originals in `image/`.

Icons / アイコン
- Simple line or flat style; unify stroke weight. Use existing handset/tree/service icons where possible.

Language Toggle / 言語切替
- `.lang-toggle` class: show JA by default, show EN when body has `lang-en`.
- Keep duplicated text paired inline to avoid layout shift.
- Update aria-labels or data attributes for bilingual accessibility where applicable.

Accessibility / アクセシビリティ
- Maintain `lang` classes, focus-visible outlines, and ARIA (`aria-expanded`, `aria-label`, `scope` on table headers).
- Ensure minimum contrast ratio 4.5:1 for text, 3:1 for UI elements.
- Touch targets ≥44px, hit areas padded.

Breakpoints / ブレークポイント
- 960px: grids stack to single column; nav switches to hamburger.
- 720px: hours table transforms to cards.
- 600px: hero CTAs stack; text sizes unchanged (no smaller than 15–16px).

Forms / フォーム
- Labels always visible; helper text 14px muted. Error color: accessible red (e.g., `#c62828`).
- Buttons full-width on mobile; left-aligned labels for Japanese readability.

Motion / モーション
- Keep subtle: fade/slide under 200–250ms; no parallax. Avoid motion on critical UI (buttons, forms) except hover/focus.

Footer / フッター
- Three columns on desktop; stack on mobile. Language selector right-aligned; no custom arrows needed.

Content Rules / コンテンツ
- Primary actions first: WEB予約, アクセス/お問い合わせ.
- Keep notices concise; avoid long scrolling marquees on mobile (max one line).
