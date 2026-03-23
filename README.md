# Sato Clinic Web Revamp / 佐藤医院サイト改修

Static clinic website built with vanilla HTML/CSS/JS.
町のクリニック向け静的サイト（HTML/CSS/JS）です。

## Quick Start / 使い方
- Open `index.html` in a browser (no build step required).
- `subpages/` contains detailed pages.

## Structure / 構成
- `index.html` : TOP page
- `subpages/` : detail pages (`news.html`, `services.html`, `about.html`, etc.)
- `css/style.css` : styles
- `scripts/` : common components and UI scripts
- `docs/` : operation manuals and specs

## News Update Operation / おしらせ更新運用
- News is managed via `subpages/news-admin.html` (internal operation page).
- Draft data is stored in IndexedDB (local browser).
- Export JSON from admin screen, then apply to HTML:
  - DryRun: `pwsh -File scripts/apply-news-json.ps1 -JsonPath <json-file> -DryRun`
  - Apply: `pwsh -File scripts/apply-news-json.ps1 -JsonPath <json-file>`
- Rendering rule:
  - `index.html`: latest 5 items
  - `subpages/news.html`: all items in descending date order

## Notes / 補足
- This project has no backend/CMS.
- News admin link is intentionally not in global navigation; access from `subpages/sitemap.html`.
