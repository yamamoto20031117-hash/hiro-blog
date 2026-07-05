#!/usr/bin/env node
/**
 * PA-API(Amazon Product Advertising API)で商品画像URLを取得し、
 * src/data/product-images.json を { "<ASIN>": "<画像URL>" } で更新するスクリプト。
 *
 * 【前提】アソシエイトのPA-API利用資格（売上3件程度）が必要。解禁後に:
 *   1) cd ~/Desktop/affiliate-blog && npm i -D amazon-paapi
 *   2) 環境変数をセット:
 *        export PAAPI_ACCESS_KEY="..."       # アクセスキー
 *        export PAAPI_SECRET_KEY="..."       # シークレットキー
 *        export PAAPI_PARTNER_TAG="hiroakilifeha-22"  # トラッキングID
 *   3) node scripts/fetch-product-images.mjs
 *   4) 生成された src/data/product-images.json をコミット→push（自動デプロイで実写真化）
 *
 * ※価格はここでは取得しません（PA-APIの価格は24時間キャッシュ制限があるため、
 *   サイトは「¥X前後」表記＋Amazonリンクで最新価格を確認する方式を維持）。
 * ※画像URLは定期的に再取得（再実行）して鮮度を保つのが安全です。
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'src/data/product-images.json');

const ACCESS_KEY = process.env.PAAPI_ACCESS_KEY;
const SECRET_KEY = process.env.PAAPI_SECRET_KEY;
const PARTNER_TAG = process.env.PAAPI_PARTNER_TAG || 'hiroakilifeha-22';

if (!ACCESS_KEY || !SECRET_KEY) {
  console.error('❌ PAAPI_ACCESS_KEY / PAAPI_SECRET_KEY が未設定です。README-product-images.md を参照してください。');
  process.exit(1);
}

// --- ソースからASINを収集（products.ts と content/posts/*.mdx を走査） ---
function collectAsins() {
  const asins = new Set();
  const re = /asin:\s*["']([A-Z0-9]{10})["']/g;
  const files = [
    join(ROOT, 'src/data/products.ts'),
    ...readdirSync(join(ROOT, 'src/content/posts'))
      .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
      .map((f) => join(ROOT, 'src/content/posts', f)),
  ];
  for (const file of files) {
    let text = '';
    try { text = readFileSync(file, 'utf8'); } catch { continue; }
    let m;
    while ((m = re.exec(text))) asins.add(m[1]);
  }
  return [...asins];
}

const chunk = (arr, n) => Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const { default: amazonPaapi } = await import('amazon-paapi');
  const asins = collectAsins();
  if (!asins.length) { console.error('ASINが見つかりませんでした。'); process.exit(1); }
  console.log(`🔎 ${asins.length} 件のASINを取得します:`, asins.join(', '));

  const common = {
    AccessKey: ACCESS_KEY,
    SecretKey: SECRET_KEY,
    PartnerTag: PARTNER_TAG,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.co.jp',
  };

  const map = {};
  for (const group of chunk(asins, 10)) { // GetItemsは最大10件/回
    const params = { ItemIds: group, ItemIdType: 'ASIN', Resources: ['Images.Primary.Large'] };
    try {
      const data = await amazonPaapi.GetItems(common, params);
      for (const item of data?.ItemsResult?.Items ?? []) {
        const url = item?.Images?.Primary?.Large?.URL;
        if (item.ASIN && url) { map[item.ASIN] = url; console.log(`  ✅ ${item.ASIN} → ${url}`); }
        else console.warn(`  ⚠️ ${item.ASIN}: 画像URL取得できず`);
      }
    } catch (e) {
      console.error('  ❌ APIエラー:', e?.message || e);
    }
    await sleep(1200); // レート制限対策
  }

  // 既存を尊重してマージ（取得できたものだけ上書き）
  let existing = {};
  try { existing = JSON.parse(readFileSync(OUT, 'utf8')); } catch {}
  const merged = { ...existing, ...map };
  writeFileSync(OUT, JSON.stringify(merged, null, 2) + '\n');
  console.log(`\n💾 ${OUT} に ${Object.keys(map).length} 件を書き込みました（合計 ${Object.keys(merged).length} 件）。`);
  console.log('👉 変更をコミット→pushすれば、本番で実写真に切り替わります。');
}

main().catch((e) => { console.error(e); process.exit(1); });
