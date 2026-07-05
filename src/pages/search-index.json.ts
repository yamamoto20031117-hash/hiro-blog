import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { PRODUCTS } from '@/data/products';

export const prerender = true;

// クライアント側検索用のインデックス（記事＋商品レビュー）をビルド時に生成。
export const GET: APIRoute = async () => {
  const posts = (await getCollection('posts')).filter((p) => !p.data.draft);
  const items = [
    ...posts.map((p) => ({
      type: '記事',
      title: p.data.title,
      desc: p.data.description ?? '',
      url: `/posts/${p.slug}`,
      category: p.data.category ?? '',
      tags: (p.data.tags ?? []).join(' '),
    })),
    ...PRODUCTS.map((p) => ({
      type: 'レビュー',
      title: p.name,
      desc: p.tagline,
      url: `/products/${p.slug}`,
      category: p.category,
      tags: [p.brand ?? '', p.emoji].join(' '),
    })),
  ];
  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
