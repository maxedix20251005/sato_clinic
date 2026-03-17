# Image Optimization Notes / 画像最適化メモ

## Current Assets / 現状
- `image/` 配下に hero/診察時間/院長/スタッフ/サービス/アイコン等が格納。拡張子は主に JPG/PNG。
- `director.jpg` 差し替え済み（中身が空でないことを要確認）。

## Recommended Steps / 推奨手順
- リサイズ: ヒーロー/大画像 ~1200px幅、スタッフ~500px高、サービス/アイコン~150px角を目安に。
- 圧縮: JPG は mozjpeg などで 70–80 品質、PNG は pngquant/oxipng。大きな画像は <200KB、小さなものは <50KB を目標。
- 形式: WebP を並行生成（hero、院長、スタッフ、サービス、about/policy画像）。互換性のため JPG/PNG も残す。
- 属性: HTML/CSS で幅・高さを明示し、折りたたみ以降の画像は `loading="lazy"` を検討。
- カラープロファイル: sRGB へ統一。

## Workflow / ワークフロー例
- リサイズ＆変換例（sharp-cli）: `npx sharp-cli image/director.jpg --resize 1200 --quality 78 --output image/director.jpg`
- バッチ圧縮後に実機（retina/標準）で画質確認。

## Delivery / 配信
- ホスティングで gzip/brotli、自動 WebP 変換（Cloudflare Polish, Netlify Image CDN 等）が使える場合は有効化。
- キャッシュ: 画像は長期キャッシュ推奨。

## Checklist / 確認事項
- 意味のある `alt` を付けているか。
- 表示サイズに対して過剰な解像度でないか。
- Lazy-load を適用する画像を選定したか（fold 以降）。
- 差し替えた画像ファイルが 0 バイトになっていないか（例: director.jpg）。
