# News Update Workflow / おしらせ入力・更新手順

## Purpose / 目的
- バックエンドなしの静的サイト運用で、院内担当者が `news-admin.html` だけでおしらせ更新できるようにする。
- JSONエクスポート/インポートと PowerShell 反映を必須手順から外し、運用を簡素化する。

## Scope / 対象ファイル
- `subpages/news-admin.html`（一覧・1件編集）
- `scripts/news-admin.js`（IndexedDB保存）
- `scripts/news-live.js`（TOP/アーカイブの描画反映）
- `index.html`（TOP最新5件表示）
- `subpages/news.html`（全件表示）

## Update Rule / 更新ルール
- `news-admin.html` で保存したデータを IndexedDB に保持する。
- `index.html` は IndexedDB の新しい順で最新5件を表示する。
- `subpages/news.html` は IndexedDB の全件を新しい順で表示する。
- `id` は可変運用（例: `news-1`, `news-a1b2c3d4`）。
- 反映対象は同一ブラウザ・同一端末に限定される（端末間自動共有なし）。

## Operation Steps / 更新手順
1. `subpages/news-admin.html` を開く。
2. `新規登録` / `編集` / `削除` を実行する。
   - `新規登録` / `編集` を押すと、編集フォーム見出し（`#editor-title`）へ自動スクロールする。
   - `全件削除` は確認モーダルで実行する。チェック項目「内容を理解しました。おしらせを全件削除します。」に同意し、`削除を実行` を押したときのみ削除される。
3. 保存（フォーム `保存` ボタン）を押す。
   - 保存後、`#admin-message`（保存完了メッセージ）へ自動スクロールして状態を確認できる。
4. `index.html` と `subpages/news.html` を同じブラウザで再読み込みして反映を確認する。

## Checklist / 確認項目
- `subpages/news.html` に全件が表示され、日付順が正しい（上ほど新しい）。
- TOPが最新5件（または件数不足時は全件）になっている。
- TOPの各タイトルリンクから該当ニュース本文へ遷移できる。
- 誤字・リンク切れがない。

## Notes / 補足
- 本運用は IndexedDB ベースのため、別ブラウザ/別端末には反映されない。
- `file://` で開いた際に IndexedDB が使えない環境では、`news-admin` は localStorage へフォールバックして継続動作する（同一ブラウザ内のみ）。
- 共有運用が必要な場合は、将来的に CMS かサーバー保存へ移行する。
- `JSONインポート/エクスポート` と `scripts/apply-news-json.ps1` は補助手段として残すが、通常運用では使用しない。
