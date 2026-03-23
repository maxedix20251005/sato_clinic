# News Update Workflow / おしらせ入力・更新手順

## Purpose / 目的
- バックエンドなしの静的サイト運用で、院内担当者が「おしらせ」を更新する手順を標準化する。
- 本手順は `docs/operation_manual_sato_clinic_v0.1.docx` の運用手順を補完する「おしらせ更新専用ガイド」として扱う。

## Scope / 対象ファイル
- `index.html`（TOPの最新5件タイトルリンク）
- `subpages/news.html`（おしらせ全件の詳細本文）
- `subpages/news-admin.html`（おしらせ一覧・1件編集・JSON入出力）
- `scripts/news-admin.js`（IndexedDB保存・JSON入出力）
- `scripts/apply-news-json.ps1`（JSONをHTMLへ反映）

## Update Rule / 更新ルール
- TOPは「タイトルリンクのみ」。本文は `subpages/news.html` 側に記載する。
- TOPは常に最新5件を表示する（5件未満の場合は存在件数のみ表示）。
- `subpages/news.html` は全件を日付の新しい順で表示する。
- `id` は固定5件ではなく可変運用（例: `news-1`, `news-a1b2c3d4`）。
- 仕様書の日本語本文は改変しない。追加文面が必要な場合は承認を得る。

## Operation Steps / 更新手順
1. `subpages/news-admin.html` を開く。
2. 一覧で対象を確認し、`新規登録` / `編集` / `削除` を行う（1件編集画面）。
3. 必要に応じて列見出しクリックで並べ替える（例: 日付、タイトル、更新日時）。
4. 必要に応じて「下書きを保存」を押す（IndexedDB保存）。
5. 更新が確定したら「JSONをエクスポート」を押し、全件JSONを出力する。
6. 反映担当がJSON内容を元に補助スクリプトを実行する。  
   事前確認: `pwsh -File scripts/apply-news-json.ps1 -JsonPath <exported.json> -DryRun`  
   本反映: `pwsh -File scripts/apply-news-json.ps1 -JsonPath <exported.json>`
7. `index.html` と `subpages/news.html` を確認し、リンク遷移と表示崩れがないことを確認する。

## Checklist / 確認項目
- `subpages/news.html` に全件が表示され、日付順が正しい（上ほど新しい）。
- TOPが最新5件（または件数不足時は全件）になっている。
- TOPの各タイトルリンクから該当ニュース本文へ遷移できる。
- 誤字・リンク切れがない。
- 反映スクリプト実行後、`index.html` と `subpages/news.html` のタイトルが一致している。

## Notes / 補足
- 本サイトは静的HTML運用だが、`subpages/news-admin.html` を入力補助画面として利用できる。
- `subpages/news-admin.html` への導線は公開ナビには出さず、`subpages/sitemap.html` からアクセスする。
- 下書き保存はブラウザローカルの IndexedDB を利用するため、端末間での自動共有はされない。
- 初回は既存5件が初期データとして IndexedDB に投入される。
- 将来的に本格的な管理画面化を行う場合は、JSON化 + ビルド生成フロー、またはヘッドレスCMS連携を検討する。

## IndexedDB Option / IndexedDB活用案
- `news-admin.html` では次の機能を提供する:
1. 一覧表示（全件）
2. 1件編集（新規追加・更新・削除）
3. タイトル/日付/更新日時の並べ替え
4. 下書き保存（IndexedDB）
5. JSONインポート/エクスポート
- IndexedDB はブラウザ/端末ローカル保存のため、複数担当者で自動共有はできない。
- 反映は `scripts/apply-news-json.ps1` で `index.html` / `subpages/news.html` を一括生成する。
