# News Update Workflow / おしらせ入力・更新手順

## Purpose / 目的
- バックエンドなしの静的サイト運用で、院内担当者が「おしらせ」を更新する手順を標準化する。

## Scope / 対象ファイル
- `index.html`（TOPのタイトルリンク5件）
- `subpages/news.html`（おしらせ詳細本文）

## Update Rule / 更新ルール
- TOPは「タイトルリンクのみ」。本文は `subpages/news.html` 側に記載する。
- TOPのリンク順は新しい順（上から新着）。
- `subpages/news.html` の対応要素は `id="news-1"` 〜 `id="news-5"` を使用する。
- 仕様書の日本語本文は改変しない。追加文面が必要な場合は承認を得る。

## Operation Steps / 更新手順
1. `subpages/news.html` を開く。
2. `news-1` 〜 `news-5` の各ブロックで、日付・タイトル・本文を更新する。
3. `index.html` を開く。
4. `news-list-simple` 内の5リンク（タイトル）を、`subpages/news.html#news-1` 〜 `#news-5` と対応させて更新する。
5. ブラウザで `index.html` と `subpages/news.html` を確認し、リンク遷移と表示崩れがないことを確認する。

## Checklist / 確認項目
- TOPに5件表示されている。
- 各タイトルリンクから該当ニュース本文へ遷移できる。
- 日付順が正しい（上ほど新しい）。
- 誤字・リンク切れがない。

## Notes / 補足
- 静的HTMLのため、入力画面やデータベースは未使用。
- 将来的に管理画面化する場合は、JSON化 + ビルド生成フロー、またはヘッドレスCMS連携を検討する。

## IndexedDB Option / IndexedDB活用案
- `news-admin.html` で入力した内容を IndexedDB に保存することは可能。
- ただし IndexedDB はブラウザ/端末ローカル保存のため、複数担当者で自動共有はできない。
- 実運用する場合は次の流れを推奨:
1. `news-admin.html` で編集（作成・更新）
2. 全件を JSON エクスポート
3. 反映担当が `index.html` / `subpages/news.html` へ一括反映
- 一括上書きだけでなく、`id`（例: `news-1` など）をキーに差分更新する実装も可能。
