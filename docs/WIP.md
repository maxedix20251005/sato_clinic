# WIP / 次回再開メモ（2026-03-23）

## 今日の到達点
- FB反映 + 追加機能を一通り実装済み。
- News運用を固定5件から可変件数運用へ移行済み。
  - `subpages/news-admin.html`: 一覧 + 1件編集（追加/更新/削除）+ 並べ替え + IndexedDB + JSON入出力
  - `scripts/apply-news-json.ps1`: `index.html` は最新5件、`subpages/news.html` は全件日付降順で再生成
- `news-admin.html` の導線は公開ナビに出さず、`subpages/sitemap.html` のみへ追加済み。
- `apply-news-json.ps1` の `$4` 混入不具合は修正済み（MatchEvaluator方式に変更）。

## 明日再開時の最初の確認
1. `git status` で変更ファイル確認（意図しない差分がないか）。
2. `subpages/news-admin.html` を開いて、次を軽く動作確認。
   - 新規登録
   - 編集保存
   - 削除
   - 列ソート
3. JSONエクスポート後、反映スクリプトを実行。
   - DryRun: `pwsh -File scripts/apply-news-json.ps1 -JsonPath <json-file> -DryRun`
   - Apply: `pwsh -File scripts/apply-news-json.ps1 -JsonPath <json-file>`
4. 表示確認。
   - `index.html`: 最新5件
   - `subpages/news.html`: 全件日付降順
   - TOPリンク遷移が一致

## 作業ルール（継続）
- 変更前に必ずユーザー確認を取る（合意後に編集）。
- 実装後は関連ドキュメントを都度更新する。
- 仕様・FB・実装がずれた場合は、まず差分表で可視化してから修正方針を合意する。
- 既存差分（ユーザー作業分）は巻き戻さない。

## 関連ドキュメント（今回更新済み）
- `docs/NEWS_UPDATE_WORKFLOW.md`
- `docs/PROJECT_OVERVIEW_NEW.md`
- `docs/TECH_SPEC_NEW.md`
- `docs/AI_BUILD_PROMPT.md`
- `docs/DEPLOYMENT.md`
- `README.md`（docs配下ではないが運用説明を現行化）

## 次に着手するとスムーズな項目
- 最終提出用の「残件ゼロチェック表（1ページ）」作成
- 必要なら `docs/operation_manual_sato_clinic_v0.1.docx` との文言同期確認
