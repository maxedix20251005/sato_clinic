# Deployment Guide / デプロイ手順

## Local Preview / ローカル確認
- ブラウザで `index.html` を開く（ビルド不要）。
- サブページは `subpages/booking.html`, `questionnaire.html`, `news.html`, `services.html`, `about.html`, `access.html`, `faq.html`, `privacy.html`, `site-policy.html`, `sitemap.html`, `news-admin.html` を直接開いて確認。
- 簡易サーバー例: `python3 -m http.server 8000` → `http://localhost:8000`。

## Production Hosting / 本番ホスティング
- 静的ホスティング（GitHub Pages / Netlify / Vercel / Cloudflare Pages / S3 等）。
- デプロイするディレクトリ構成: ルートに `index.html`, `css/`, `image/`, `subpages/`, `docs/`。
- キャッシュ: 画像/CSS は長期、HTML は短期または no-cache。gzip/brotli を有効化できれば有効化。
- 外部取得: Google Fonts (Noto Sans JP) 用に `fonts.googleapis.com` / `fonts.gstatic.com` へのアクセスを許可。

## Verification Checklist / 動作確認
- レイアウト: デスクトップ/モバイル(>=360px)で崩れない。
- ナビ: ハンバーガー開閉、オーバーレイで背面スクロール抑止、リンクタップで閉じる。
- おしらせアコーディオン: キーボードで開閉可、`aria-expanded`/`hidden` 反映。
- ヒーローアラート: 閉じるボタンで隠せる。
- フォーム: `booking.html` と `questionnaire.html` でラベル/必須表示があること、送信時アラート→リセット（デモ動作）。
- フッターリンク: サイトマップ・プライバシー・サイトポリシー・WEB予約・WEB問診票が正しく遷移。
- マップ: アクセスセクションの iframe が表示されること。
- 文字コード: すべて UTF-8 (BOMなし) で保存されていること。

## Notes / 補足
- 依存パッケージ・環境変数なしの純静的サイト。
- 画像は `image/` 配下で相対参照。新規画像追加時は適切に圧縮・リサイズすること。
