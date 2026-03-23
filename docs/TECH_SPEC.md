# Tech Spec Sheet / 技術仕様

## Stack / 技術スタック
- Static HTML + CSS + vanilla JS (no build) / 静的HTML/CSS/JSのみ
- Font: Noto Sans JP via Google Fonts / Noto Sans JP
- Assets: `image/` (PNG/JPG) / 画像は `image/`
- Pages: `index.html`, `booking.html` (WEB予約), `news.html` (ニュース), `services.html` (診察内容), `about.html` (当院について + 理念・方針詳細)

## Layout & Breakpoints / レイアウト
- Containers: `min(1180px, 100% - 32px)`
- Breakpoints: 960px (grids stack, mobile nav), 600px (hero CTA vertical, text tweaks)

## Design Tokens (`css/style.css`) / トークン
- Colors: `--green-light #dff4d8`, `--blue-main #0065a8`, `--blue-sub #1c85d6`, `--text-main #1f3d55`, `--border-gray #e1e5ec`
- Radii: `--radius-lg 22px`, `--radius-999` pills
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Focus: `--focus-ring 2px solid #1c85d6`

## Components / コンポーネント
- Navigation: desktop inline links; mobile hamburger + overlay + body lock
- Hero: copy + image, dual CTAs, dismissible alert
- Buttons: `.btn-pill` base; `.btn-primary` / `.btn-secondary` variants
- Hours section: semantic HTML table (JA/EN) plus status chip + reserve CTA card
- News accordion: `aria-expanded`, `hidden`, +/- icon toggle
- News archive: list of past news with dates and content
- Reservation form: input fields with labels, submit button
- Cards: unified padding/radius for services/about/policy/staff/greeting
- Access: map iframe + actions; structured contact blocks

## Accessibility / アクセシビリティ
- `lang="ja"`, focus-visible outlines, high-contrast buttons
- Accordions/nav toggle use `aria-expanded`; alert closable
- Mobile nav overlay prevents background scroll
- Hours table uses `<th scope>` headers and bilingual `.lang-toggle` labels; mobile view shows day labels from data attributes

## Performance / パフォーマンス
- Pure static; minimal JS after DOMContentLoaded
- External only Google Fonts; images served as-is (edge compression recommended)

## Behavior / 挙動
- Global navigation starts between header and hero, then sticks to the top with a translucent backdrop when scrolling down
