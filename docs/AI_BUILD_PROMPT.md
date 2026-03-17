# Prompt to Rebuild This Site with an AI / AI向け再構築プロンプト

You are coding a static Japanese clinic website. Recreate the site with the structure and rules below.  
静的な日本語クリニックサイトを、以下の構成とルールで再構築してください。

## File Map / ファイル構成
- `index.html`（トップ）: hero, 診察時間、 おしらせ(アコーディオン)、院長挨拶、診察内容概要、当院について、理念・方針、スタッフ、アクセス/お問い合わせ、フッター
- `subpages/booking.html` : WEB予約フォーム
- `subpages/questionnaire.html` : WEB問診票フォーム
- `subpages/news.html` : おしらせ一覧
- `subpages/services.html` : 診察内容詳細
- `subpages/about.html` : 当院について詳細
- `subpages/policy.html` : 医院の理念・方針
- `subpages/privacy.html` : プライバシーポリシー
- `subpages/site-policy.html` : サイトポリシー
- `subpages/sitemap.html` : サイトマップ（ツリー表示）
- `css/style.css` : トークン/レイアウト/コンポーネント/レスポンシブ
- `image/` : Logo.png, hero/section用画像, director.jpg, staff写真, serviceアイコン, handsetアイコン 等

## Visual System / ビジュアル
- Colors: `--green-light #dff4d8`, `--blue-main #0065a8`, `--blue-sub #1c85d6`, `--text-main #1f3d55`, `--border-gray #e1e5ec`
- Typography: Noto Sans JP, base 16px, line-height 1.8, headings 20–28px
- Radii: cards 22px, pill buttons 999px; Shadows sm/md/lg
- Layout: container `min(1180px, 100% - 32px)`; `.main-container` は白背景＋radius＋shadow on green-light bg
- Breakpoints: 960px（グリッド縦積み）, 600px（hero CTA縦積み）

## Interaction / インタラクション
- News accordion: `aria-expanded`, `hidden`, +/− トグル
- Hero alert: 閉じるボタンで非表示
- Mobile nav: ハンバーガーで開閉、オーバーレイ＆bodyロック、リンク/overlayクリックで閉じる
- Forms: 送信時はアラート表示→リセット（デモ動作）

## Sections & Navigation / セクションとナビ
- Top nav links to `subpages/...`（個別ページ）とトップ内アンカー（#time, #news, #greeting, #services, #about, #policy, #staff, #access）
- フッター3カラム:
  - ご案内: サイトマップ(`subpages/sitemap.html` or `sitemap.html`), プライバシーポリシー, サイトポリシー
  - 当院について: 院長挨拶(#greeting), 医師・スタッフ(#staff), 診察内容(#services)
  - ご予約: WEB予約（booking.html）、WEB問診票（questionnaire.html）、アクセス／お問い合わせ(#access)
- サイトマップページはツリー状にトップセクションと各 subpages を列挙

## Forms / フォーム
- WEB予約（booking.html）: 氏名*・電話*・メール・希望日*・希望時間*（選択）・症状/相談・その他要望、送信/リセット
- WEB問診票（questionnaire.html）: 氏名*・生年月日*・電話*・メール・主訴*・発症時期・発熱有無・体温・服用薬・アレルギー・妊娠可能性・その他・同意チェック*、送信/リセット

## Policies / ポリシー
- プライバシー: 個人情報の取得・利用目的・第三者提供・委託・安全管理・開示等・お問い合わせ・改定（クッキー項目はサイトポリシー側に集約）
- サイトポリシー: 著作権、免責、リンク方針、外部サイト、推奨環境、セキュリティ、クッキー、アクセス解析、準拠法・管轄、改定

## JavaScript / JS
- DOMContentLoaded 後に実行。用途はアコーディオン、ヒーローアラート閉じ、モバイルナビ開閉、フォーム送信の簡易アラートのみ。

## Accessibility / アクセシビリティ
- `lang="ja"`, focus-visible のアウトライン、コントラスト保持。ARIA属性はナビ/アコーディオンで利用。

## Hosting / ホスティング
- ビルドなしの静的サイト。`index.html` をブラウザで開けば動作すること。
