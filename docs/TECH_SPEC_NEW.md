# Tech Spec Sheet / 技術仕様

## Stack / 技術スタック
- Static HTML + CSS + vanilla JS (no build) / 静的HTML/CSS/JSのみ
- Font: Noto Sans JP via Google Fonts / Noto Sans JP
- Assets: `image/` (PNG/JPG) / 画像は `image/`
- Pages: `index.html`, `subpages/booking.html` (WEB予約), `subpages/questionnaire.html` (WEB問診票), `subpages/news.html` (おしらせ), `subpages/services.html` (診察内容), `subpages/about.html` (当院について), `subpages/policy.html` (理念・方針), `subpages/sitemap.html` (サイトマップ)

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
- Time card: status chip + reserve CTA
- News accordion: `aria-expanded`, `hidden`, +/- icon toggle
- News archive list
- Reservation form (booking)
- Questionnaire form (questionnaire)
- Cards for services/about/policy/staff/greeting
- Access block: map iframe + actions

## Accessibility / アクセシビリティ
- `lang="ja"`, focus-visible outlines, high-contrast buttons
- Accordions/nav toggle use `aria-expanded`; alert closable
- Mobile nav overlay prevents background scroll

## Performance / パフォーマンス
- Pure static; minimal JS after DOMContentLoaded
- External only Google Fonts; images served as-is (edge compression recommended)

## Behavior / 挙動
- Global navigation is initially between header and hero; when scrolling past the header it fixes to top with semi-transparent background.
- ヘッダーとヒーローの間から始まり、スクロールで上部固定＋半透明背景に変化。

## Page Structure Update / ページ構成の更新
- 個別ページを `subpages/` 配下へ移動し、トップページからリンク。
- WEB問診票を専用ページ `subpages/questionnaire.html` に分離。
- サイトマップページ `subpages/sitemap.html` を追加し、全リンクを一覧化。
- フッターのリンクをサイトマップ・問診票・予約に更新。

## Encoding / エンコード
- All HTML/MD are managed as UTF-8 (BOMなし); 文字化け防止のため保存時はUTF-8を指定。
- Added dedicated privacy page subpages/privacy.html and pointed footer links to it. / プライバシーポリシー専用ページ subpages/privacy.html を追加し、フッターリンクを差し替え。
- Added standalone site policy page subpages/site-policy.html and updated footer links. / サイトポリシー専用ページ subpages/site-policy.html を追加し、フッターリンクを更新。
- Privacy page trimmed to remove cookie section duplicated in site policy. / サイトポリシーと重複していたクッキー項目をプライバシーポリシーから削除。
