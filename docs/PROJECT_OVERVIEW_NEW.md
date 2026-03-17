# Project Overview / プロジェクト概要

## Purpose / 目的
Create a welcoming, trustworthy clinic homepage that makes online booking obvious while keeping phone access easy.
オンライン予約を分かりやすく、電話もしやすい信頼感のあるクリニックサイトを目指します。

## Audience / 想定ユーザー
- Existing patients checking hours/access / 既存患者の確認用途
- New patients seeking services/staff info / 新規患者の情報収集
- Mobile users needing quick booking/directions / スマホで素早く予約やルートを探す人

## Page Sections / ページ構成
- Hero with promise, dual CTAs (WEB予約 primary, アクセス secondary), alert for notices
- 診察時間カード（ステータス＋予約ボタン）
- おしらせアコーディオン
- 院長挨拶・診察内容・当院について・理念・スタッフ紹介
- アクセス／お問い合わせ（地図・連絡先）
- シンプルなフッター
- WEB予約ページ (subpages/booking.html): 予約フォーム
- WEB問診票ページ (subpages/questionnaire.html): 事前問診フォーム
- ニュースページ (subpages/news.html): 過去のおしらせ一覧
- 診察内容ページ (subpages/services.html): サービス詳細
- 当院についてページ (subpages/about.html): 医院詳細と画像
- 理念・方針ページ (subpages/policy.html): 医院の理念・方針詳細
- サイトマップページ (subpages/sitemap.html): 全ページのリンクツリー

## UX Goals / UX目標
- Clear primary action, consistent buttons / 主要アクションの明確化と統一ボタン
- Comfortable Japanese typography, balanced spacing / 日本語に適したタイポと余白
- Responsive nav with mobile hamburger overlay / モバイルでのハンバーガーナビ
- Accessible focus states, aria-expanded accordions, dismissible alert / フォーカス可視化・ARIA対応・閉じられるお知らせ

## Navigation behavior
- Global navigation starts between header and hero; when scrolling past the header it becomes fixed to the top with a semi-transparent background.
- ヘッダーとヒーローの間にナビを配置し、スクロールで上部固定＋半透明背景に変化。

## IA Change / 情報設計の変更
- All individual pages moved under `subpages/` and linked from the top page.
- 個別ページを `subpages/` 配下に集約し、トップページからリンク。
- Added dedicated WEB問診票ページ `subpages/questionnaire.html`; footer/ナビから遷移可能。
- サイトマップページ `subpages/sitemap.html` を追加し、全セクションをツリー表示。

## Recent Updates / 直近の更新
- フッターのリンクをサイトマップに更新し、予約・問診・アクセスの導線を整理。
- 文字化け対策として全ファイルを UTF-8 (BOMなし) で管理。
- プライバシーポリシーを独立ページ subpages/privacy.html として公開し、全ページのフッターからリンク。 / Published a standalone privacy page (subpages/privacy.html) and wired all footers to it.
- サイトポリシーを独立ページ subpages/site-policy.html として追加し、全ページのフッターからリンク。 / Added a standalone site policy page (subpages/site-policy.html) and wired all footers to it.
- プライバシーポリシーからクッキー重複項目を削除（サイトポリシーに集約）。 / Removed duplicate cookie clause from privacy policy; kept in site policy.
