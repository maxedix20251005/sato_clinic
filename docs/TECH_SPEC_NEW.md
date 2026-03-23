# Tech Spec Sheet / 技術仕様

## Stack / 技術スタック
- Static HTML + CSS + vanilla JS (no build) / 静的HTML/CSS/JSのみ
- Font: Noto Sans JP via Google Fonts / Noto Sans JP
- Assets: `image/` (PNG/JPG) / 画像は `image/`
- Pages: `index.html`, `subpages/booking.html` (WEB予約), `subpages/questionnaire.html` (WEB問診票), `subpages/news.html` (おしらせ), `subpages/services.html` (診察内容), `subpages/about.html` (当院について + 理念・方針詳細), `subpages/access.html` (診療時間・所在地), `subpages/faq.html` (FAQ), `subpages/privacy.html` (プライバシー), `subpages/site-policy.html` (サイトポリシー), `subpages/sitemap.html` (サイトマップ)
- JS modules: `scripts/components.js`（ヘッダー/フッター/グロナビ注入）, `scripts/lang.js`（言語切替・永続化）, `scripts/main.js`（UI動作・予約カレンダー・戻るボタン等）, `scripts/news-admin.js`（IndexedDB保存・JSON入出力）

## Layout & Breakpoints / レイアウト
- Containers: `min(1180px, 100% - 32px)`
- Breakpoints: 960px (grids stack, mobile nav), 600px (hero CTA vertical, text tweaks)

## Design Tokens (`css/style.css`) / トークン
- Colors: `--green-light #dff4d8`, `--blue-main #0065a8`, `--blue-sub #1c85d6`, `--text-main #1f3d55`, `--border-gray #e1e5ec`
- Radii: `--radius-lg 22px`, `--radius-999` pills
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Focus: `--focus-ring 2px solid #1c85d6`

## Components / コンポーネント
- Header/Footer/Global Nav: JSで共通テンプレート挿入。パス名に応じてカレントリンクを自動ハイライト。noscript時は簡易版HTMLを各ページに埋め込み。
- Language switcher: フッター右下のドロップダウン。JA/ENを切替し、localStorageで保持。全ページに適用。
- Navigation: desktop inline links; mobile hamburger + overlay + body lock; scrollでフローティング固定。
- Breadcrumb: `subpages/` 配下ではヘッダー下に `ホーム > 現在ページ` を自動表示。
- Hero: copy + image, dual CTAs, dismissible alert
- Buttons: `.btn-pill` base; `.btn-primary` / `.btn-secondary` variants
- Hours section: semantic HTML table (JA/EN) + time status chip (診療中/Closed) that toggles by current JST
- TOP News: 最新5件のタイトルリンク（5件未満時は存在件数のみ表示）。詳細本文は `subpages/news.html#news-*`。
- News archive list: 本文は一覧ページで表示
- Reservation availability UI (booking): 月表示カレンダー（当月＋2か月、過去不可）＋曜日ヘッダー＋空き状況○△×。日付選択で右カラムの時間帯スロットが展開し、○/△のみ選択可。選択中の日時は薄いグリーンでハイライト。
- Booking layout tuning: `body.booking-page` 時に `.reserve-form-container` を拡張し、カレンダー/時間帯エリアの比率を最適化。
- Reservation form: 希望日時フィールドは選択専用で非活性表示＋hidden値送信。氏名・電話*（自動ハイフン整形）・メール*・症状・要望。Formspree に POST し、件名 `【佐藤医院】WEB予約を受け付けました（予約番号: XXXX）` で通知。payload に `_replyto` を含め返信先を利用者メールに。Formspree 無料プランのため本文リードは固定テンプレートで変更不可。reCAPTCHA 未組み込みのため Formspree 側 CAPTCHA はオフ運用。
- News admin UI: `subpages/news-admin.html` でおしらせ全件を一覧表示し、1件編集（追加/更新/削除）で管理。列見出しクリックで並べ替え可能。IndexedDB下書き保存とJSONエクスポート/インポートに対応。
- Questionnaire form (questionnaire)
- Questionnaire form: フィールドは氏名・生年月日・電話（自動ハイフン整形）・メール・主訴・発症時期・発熱有無・体温・服用薬・アレルギー・妊娠可能性・その他・同意。Formspree に POST し、件名 `【佐藤医院】WEB問診票を受け付けました（受付番号: XXXX）` で通知。payload に `_replyto` を含め返信先を利用者メールに。
- Cards for services/about/policy/staff/greeting
- Staff cards: hover overlayに経歴・コメント全文を表示。長文は小さめ文字＋スクロールで可読性を確保。
- Access block: map iframe + actions
- Back-to-top button: 右下固定、スクロールで表示、`icon_go-to-top.png` 使用

## Accessibility / アクセシビリティ
- `lang="ja"`, focus-visible outlines, high-contrast buttons
- Accordions/nav toggle use `aria-expanded`; alert closable
- Hours table uses `<th scope>` headers, bilingual labels via `.lang-toggle`, and mobile stacking with day labels rendered from data attributes
- Mobile nav overlay prevents background scroll
- カレンダー/時間帯はボタン要素でフォーカス操作可。選択状態のコントラスト確保。
- noscriptフォールバックを明示し、JS無効時も主要ナビと通知を表示

## Performance / パフォーマンス
- Pure static; minimal JS after DOMContentLoaded
- External only Google Fonts; images served as-is (edge compression recommended)

## Behavior / 挙動
- Global navigation is initially between header and hero; when scrolling past the header it fixes to top with semi-transparent background.
- Language selection persists via localStorage and is applied across all pages.
- 診察ステータスはJSTの曜日・時間帯により「診察中 / Closed」を自動表示。

## Page Structure Update / ページ構成の更新
- 個別ページを `subpages/` 配下へ移動し、トップページからリンク。
- WEB問診票を専用ページ `subpages/questionnaire.html` に分離。
- サイトマップページ `subpages/sitemap.html` を追加し、全リンクをツリー表示。
- `subpages/access.html` と `subpages/faq.html` を追加（依頼書の必須ページ要件に対応）。
- `subpages/access.html` と `subpages/faq.html` は JA/EN 切替対応を実装。
- フッターのリンクをサイトマップ・問診票・予約に更新。
- フッターに診察時間・所在地・連絡先の再掲を追加（診察時間と受付時間を併記）。
- プライバシーポリシー専用ページ subpages/privacy.html とサイトポリシー専用ページ subpages/site-policy.html を追加し、フッターからリンク。プライバシーの重複クッキー節は削除。

## Encoding / エンコード
- All HTML/MD are managed as UTF-8 (BOMなし); 文字化け防止のため保存時はUTF-8を指定。
