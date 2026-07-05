# 実商品写真の入れ方（PA-API）

商品カード・レビューLPは、いま「絵文字タイル」で表示しています。
Amazonの**実商品写真**に差し替えるには、以下を行います。

## 前提
- Amazonアソシエイトの **PA-API（Product Advertising API）** の利用資格が必要。
- 資格はおおむね「**180日以内に3件程度の売上**」で解禁（アカウント状況で変動）。
- 管理画面「ツール > Product Advertising API」でアクセスキー等を発行できるか確認。

## 手順（解禁後）
```bash
cd ~/Desktop/affiliate-blog
npm i -D amazon-paapi

export PAAPI_ACCESS_KEY="発行したアクセスキー"
export PAAPI_SECRET_KEY="発行したシークレットキー"
export PAAPI_PARTNER_TAG="hiroakilifeha-22"

node scripts/fetch-product-images.mjs
```
- `src/data/products.ts` と記事(mdx)内のASINを自動収集し、画像URLを取得。
- 結果を `src/data/product-images.json` に `{ "ASIN": "画像URL" }` で書き込み。
- あとは **コミット→push** すれば、本番で全カード/LPが自動的に実写真に切り替わります
  （`image` 欄は全コンポーネントに配線済み。JSONが空なら絵文字、埋まれば写真）。

## 補足・コンプライアンス
- **画像はPA-APIが返す公式URLを使用**（ホットリンク＝規約違反は行いません）。
- **価格はAPIから固定保存しません**（PA-APIの価格は24時間キャッシュ制限があるため）。
  サイトは「¥X前後」表記＋Amazonリンクで最新価格を確認する方式を維持します。
- 画像URLは静的ですが、**定期的に再実行**して鮮度を保つのが安全です。

## 自分で撮った写真を使う場合（実物がある商品）
- `src/data/product-images.json` に手動で `"ASIN": "/images/products/xxx.jpg"` を追記し、
  画像を `public/images/products/` に置くだけでもOK（自前写真は完全合法）。
