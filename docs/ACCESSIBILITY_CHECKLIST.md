# Accessibility Checklist / アクセシビリティ確認項目

- Language: `lang="ja"` を各HTMLに指定。
- Typography: ベース16px・行間1.8、Noto Sans JP。
- Contrast: 主要ボタン/本文で 4.5:1 以上を維持。
- Focus visible: リンク/ボタン/フォーム要素に 2px アウトライン。
- Navigation: モバイルメニューは `aria-expanded` を持ち、オーバーレイで背面操作を抑止し、リンククリックで自動クローズ。
- Accordions (news): `aria-expanded` + `hidden` で開閉し、+/- アイコンをトグル。
- Alert: ヒーローのお知らせは閉じるボタンで非表示にでき、キーボード操作可。
- Motion: 最小限。ヒーローのお知らせは横スクロール（マルキー）を使用するため、必要に応じて `prefers-reduced-motion` で無効化することを検討。
- Tap targets: モバイルで44px以上を確保（ボタン/ナビ）。
- Images: すべて意味のある `alt` を付与。
- Forms (WEB予約・WEB問診票): すべての入力にラベルを関連付け、必須項目にマークを表示。送信後は確認アラート→リセット（デモ実装）。
- Error handling: 実装時は入力検証エラーを文言とフォーカス移動で通知すること（TODO）。
- Links: フッター/ナビの内部アンカーやサブページリンクはキーボード操作で到達可能。
