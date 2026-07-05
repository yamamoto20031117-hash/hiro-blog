// ===== サイト全体のブランド・構成（ここ1箇所を変えれば全ページ反映） =====

export const SITE_NAME = '売れ筋ナビ';
export const SITE_TAGLINE = 'ガジェット・家電の"買って正解"をレビューと比較で';
export const SITE_DESCRIPTION =
  'イヤホン・モバイルバッテリー・充電器・スマート家電から一人暮らし家電まで、いま買うべきガジェット・家電を実レビューと徹底比較・ランキングで紹介。失敗しない買い物ガイド。';
export const SITE_KEYWORDS =
  'ガジェット,レビュー,比較,ランキング,おすすめ,イヤホン,モバイルバッテリー,充電器,家電,一人暮らし,買ってよかった';
export const SITE_LOGO_EMOJI = '🎧';

// ===== ヘッダーのナビ =====
export const NAV = [
  { label: 'ランキング', href: '/ranking', icon: '🔥' },
  { label: '商品レビュー', href: '/products', icon: '📝' },
  { label: 'ガジェット', href: '/category/gadget', icon: '📱' },
  { label: '家電・生活', href: '/category/home', icon: '🏠' },
];

// ===== カテゴリ体系 =====
// label = 記事frontmatterの category と一致させる文字列 / slug = URL
export interface Category {
  slug: string;
  label: string;
  icon: string;
  color: string; // blue|green|orange|teal|purple
  desc: string;
}

export const CATEGORIES: Category[] = [
  { slug: 'gadget',      label: 'ガジェット', icon: '📱', color: 'blue',   desc: 'スマホ周辺・PC・イヤホンなど、今売れているガジェットを比較・ランキング。' },
  { slug: 'home',        label: '家電・生活', icon: '🏠', color: 'teal',   desc: '一人暮らし家電から生活雑貨まで、買ってよかったものを厳選。' },
  { slug: 'money',       label: '節約・副業', icon: '💰', color: 'green',  desc: '節約術・ポイ活・副業に効く商品とサービスをまとめて紹介。' },
  { slug: 'book',        label: '本・学び',   icon: '📚', color: 'purple', desc: 'お金・スキル・暮らしが変わる話題の本をピックアップ。' },
  // ↓ 既存コンテンツ（「節約・副業」配下の実カテゴリとして継続）
  { slug: 'uber',        label: 'Uber稼ぎ方', icon: '🚗', color: 'green',  desc: 'Uber Eatsの配達効率・稼ぎ方と、必要な装備を徹底解説。' },
  { slug: 'credit-card', label: 'クレカ修行', icon: '💳', color: 'blue',   desc: 'クレジットカードのポイント・マイルを最大効率で貯める方法。' },
  { slug: 'tax',         label: '扶養・税金', icon: '📊', color: 'orange', desc: '副業収入と扶養・確定申告の関係をわかりやすく解説。' },
];

export function getCategoryByLabel(label?: string): Category | undefined {
  return CATEGORIES.find((c) => c.label === label);
}

// バッジ/ヒーロー用のカラークラス（全ページ共通）
export const COLOR_MAP: Record<string, { bg: string; text: string; border: string; btn: string; hero: string }> = {
  blue:   { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200',   btn: 'bg-blue-600 hover:bg-blue-700',     hero: 'from-blue-600 to-blue-800' },
  green:  { bg: 'bg-green-50',  text: 'text-green-700',  border: 'border-green-200',  btn: 'bg-green-600 hover:bg-green-700',   hero: 'from-green-600 to-green-800' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', btn: 'bg-orange-500 hover:bg-orange-600', hero: 'from-orange-500 to-orange-700' },
  teal:   { bg: 'bg-teal-50',   text: 'text-teal-700',   border: 'border-teal-200',   btn: 'bg-teal-600 hover:bg-teal-700',     hero: 'from-teal-600 to-teal-800' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', btn: 'bg-purple-600 hover:bg-purple-700', hero: 'from-purple-600 to-purple-800' },
};

// ===== 診断ハブに並べる診断一覧 =====
export const DIAGNOSES = [
  {
    href: '/shindan/uber-haitatsu',
    icon: '🛵',
    title: 'Uber Eats配達スタイル診断',
    desc: '移動手段・稼働スタイルから、あなたに必要な配達装備を提案。',
    tag: '副業・装備',
  },
];
