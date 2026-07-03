// ===== Amazonアソシエイト設定 =====
// ↓ アソシエイト管理画面のトラッキングID（例: hiroblog-22）に置き換えてください。
//   これ1箇所を直せば、サイト内の全Amazonリンクに自動でタグが付きます。
export const AMAZON_TAG = 'hiroakilifeha-22';

/** 商品ページ（ASIN）へのアフィリエイトリンクを生成。
 *  例: amazonUrl('B08XXXX') → https://www.amazon.co.jp/dp/B08XXXX/?tag=... */
export function amazonUrl(asin: string): string {
  return `https://www.amazon.co.jp/dp/${asin}/?tag=${AMAZON_TAG}`;
}

/** キーワード検索へのアフィリエイトリンク。
 *  ASINがまだ分からない商品の「暫定リンク」として使えます（後でamazonUrlに差し替え推奨）。 */
export function amazonSearch(keyword: string): string {
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}&tag=${AMAZON_TAG}`;
}
