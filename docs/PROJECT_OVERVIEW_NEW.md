# Project Overview / プロジェクト概要

## Purpose / 目的
Create a welcoming, trustworthy clinic homepage that makes online booking obvious while keeping phone access easy.
オンライン予約を分かりやすく、電話もしやすい信頼感のあるクリニックサイトを目指します。

## Audience / 想定ユーザー
- Existing patients checking hours/access / 既存患者の確認用途
- New patients seeking services/staff info / 新規患者の情報収集
- Mobile users needing quick booking/directions / スマホで素早く予約やルートを探す人

## Page Sections / ページ構成
- Hero with promise, dual CTAs (WEB予約 primary, アクセス secondary)
- 診察時間セクション：HTMLテーブル＋ステータスカード（曜日・注記を日英切替対応。JST現在時刻で「診察中 / Closed」を自動表示）
- おしらせ（TOPは最新5件タイトルリンク、詳細は一覧ページ）
- 院長挨拶・診察内容・当院について・理念・スタッフ紹介
- アクセス／お問い合わせ（地図・連絡先）
- シンプルなフッター
- WEB予約ページ (subpages/booking.html): 予約カレンダー＋時間帯スロットで空き状況○△×を表示し、選択した日時をフォームに自動反映。Formspree に送信し、登録メールへ通知（件名: `【佐藤医院】WEB予約を受け付けました（予約番号: XXXX）`）。本文のリード文は Formspree 無料プランの固定テンプレートで変更不可。
- WEB問診票ページ (subpages/questionnaire.html): 事前問診フォーム（電話は自動ハイフン整形）。Formspree に送信し、件名 `【佐藤医院】WEB問診票を受け付けました（受付番号: XXXX）` で通知。`_replyto` で返信先に利用者メールを指定。
- ニュースページ (subpages/news.html): おしらせ全件一覧（日付降順）
- 診察内容ページ (subpages/services.html): サービス詳細
- 当院についてページ (subpages/about.html): 医院詳細と画像
- 理念・方針詳細: `subpages/about.html#clinic-policy` に統合
- 診療時間・所在地ページ (subpages/access.html): 診療時間、診療科目、所在地、交通案内、地図、連絡先
- よくあるご質問ページ (subpages/faq.html): FAQ
- おしらせ更新管理ページ (subpages/news-admin.html): 一覧表示 + 1件編集（追加/更新/削除、並べ替え、IndexedDB保存）。保存後は同ブラウザで TOP/ニュース一覧へ即時反映（再読み込みで確認）。
- プライバシーポリシー (subpages/privacy.html) と サイトポリシー (subpages/site-policy.html)
- サイトマップページ (subpages/sitemap.html): 全ページのリンクツリー

## UX Goals / UX目標
- Clear primary action, consistent buttons / 主要アクションの明確化と統一ボタン
- Comfortable Japanese typography, balanced spacing / 日本語に適したタイポと余白
- Responsive nav with mobile hamburger overlay / モバイルでのハンバーガーナビ
- Breadcrumb navigation on subpages / サブページにパンくずナビを表示
- Accessible focus states, aria-expanded accordions, dismissible alert / フォーカス可視化・ARIA対応・閉じられるお知らせ
- 言語選択（JA/EN）が全ページに引き継がれ、localStorageで保持
- 予約カレンダーはキーボード操作と選択ハイライトに対応
- Back-to-top ボタンで長いページでも移動が容易
- メール送信: Formspree 無料プランを使用。reCAPTCHA を未組み込みのため Formspree 側 CAPTCHA はオフ運用。リード文は固定、件名は `_subject` でカスタム。

## Navigation behavior
- Global navigation starts between header and hero; when scrolling past the header it becomes fixed to the top with a semi-transparent background.
- ヘッダー/フッター/グロナビは共通テンプレートを JS で挿入し、ページ側は占位要素のみ。noscript時は簡易版を表示。

## IA Change / 情報設計の変更
- All individual pages moved under `subpages/` and linked from the top page.
- 個別ページを `subpages/` 配下に集約し、トップページからリンク。
- Added dedicated WEB問診票ページ `subpages/questionnaire.html`; footer/ナビから遷移可能。
- サイトマップページ `subpages/sitemap.html` を追加し、全セクションをツリー表示。
- 必須ページ要件に合わせ `subpages/access.html`（診療時間・所在地）と `subpages/faq.html`（よくあるご質問）を追加。

## Recent Updates / 直近の更新
- 診察時間画像を廃止し、アクセシブルなHTMLテーブルに置換（曜日・注記を日英切替対応）。
- 予約導線を強化：カレンダー＋時間帯スロットで空き状況を提示し、希望日時はフォーム上で非活性表示。
- フッターのリンクをサイトマップ・問診票・予約に更新。言語切替ドロップダウンを追加。
- グローバルナビに現在地ハイライトを追加（表示中ページを青で強調）。
- TOPのおしらせを「タイトルリンクのみ（最新5件）」に変更し、詳細は `subpages/news.html#news-*` へ遷移。
- スタッフ紹介のホバー説明を長文対応（文字サイズ調整＋スクロール）。
- `subpages/access.html` / `subpages/faq.html` のJA/EN切替を有効化。
- `subpages/news-admin.html` / `scripts/news-admin.js` / `scripts/news-live.js` でニュース更新を一本化（IndexedDB保存 -> TOP/ニュース一覧へ同ブラウザ即時反映）。
- プライバシー/サイトポリシーを分離し重複を解消。全ページでバイリンガル対応完了。
- Back-to-top ボタンを追加し、長ページでも操作性を確保。
- 予約ページのレイアウトを調整し、カレンダーと時間帯エリアの幅バランスを改善。
- 文字化け防止のため全ファイルを UTF-8 (BOMなし) で管理。

