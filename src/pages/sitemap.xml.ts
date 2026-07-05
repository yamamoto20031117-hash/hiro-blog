import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/site';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.toString() || 'https://hiroblog-lifehack.com').replace(/\/$/, '');
  const urls: { loc: string; lastmod?: string }[] = [];
  const add = (path: string, lastmod?: Date) =>
    urls.push({ loc: base + path, lastmod: lastmod ? lastmod.toISOString() : undefined });

  // 主要ページ
  add('/');
  ['/ranking', '/products', '/shindan', '/about', '/editorial-policy', '/disclaimer', '/privacy', '/contact'].forEach((p) => add(p));
  // カテゴリ
  CATEGORIES.forEach((c) => add(`/category/${c.slug}`));
  // 記事
  const posts = (await getCollection('posts')).filter((p) => !p.data.draft);
  posts.forEach((p) => add(`/posts/${p.slug}`, p.data.updatedDate ?? p.data.pubDate));
  // 商品レビューLP
  PRODUCTS.forEach((p) => add(`/products/${p.slug}`));

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
      .join('\n') +
    `\n</urlset>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
