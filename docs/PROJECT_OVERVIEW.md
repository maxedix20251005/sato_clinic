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
- 診察時間セクション：HTMLテーブル＋ステータスカード（画像依存なし、JA/EN表示切替対応）
- おしらせアコーディオン
- 院長挨拶・診察内容・当院について・理念・スタッフ紹介
- アクセス/お問い合わせ（地図・連絡先）
- シンプルなフッター
- WEB予約ページ (booking.html): 予約フォーム
- ニュースページ (news.html): 過去のニュースリスト
- 診察内容ページ (services.html): サービス詳細リスト
- 当院についてページ (about.html): 医院詳細と画像
- 理念・方針詳細: `subpages/about.html#clinic-policy` に統合

## UX Goals / UX目標
- Clear primary action, consistent buttons / 主要アクションの明確化と統一ボタン
- Comfortable Japanese typography, balanced spacing / 日本語に適したタイポと余白
- Responsive nav with mobile hamburger overlay / モバイルでのハンバーガーナビ
- Accessible focus states, aria-expanded accordions, dismissible alert / フォーカス可視化・ARIA対応・閉じられるお知らせ

## Navigation behavior
- Global navigation starts between header and hero, then sticks to the top with a translucent backdrop when scrolling down
