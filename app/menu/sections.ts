import type { LanguageKey } from "../lib/language";

export type MenuSection = {
  slug: string;
  title: string;
  description: string;
  items: {
    name: Partial<Record<LanguageKey, string>>;
    description: Partial<Record<LanguageKey, string>>;
    price: string;
    image: string;
    sortOrder?: number;
  }[];
  image: string;
};

export const menuSections: MenuSection[] = [
  {
    slug: "kahvalti",
    title: "Kahvaltı",
    description: "Güne taze başlangıçlar.",
    items: [],
    image: "/menu_photo/kahvalti.jpeg",
  },
  {
    slug: "atistirmaliklar",
    title: "Atıştırmalıklar",
    description: "Gün içinde hızlı lezzetler.",
    items: [],
    image: "/menu_photo/atishtirlamik.jpeg",
  },
  {
    slug: "izgara",
    title: "Izgara",
    description: "Kömür ateşinde hazırlanan lezzetler.",
    items: [],
    image: "/menu_photo/izgara.jpeg",
  },
  {
    slug: "ekmek-arasi",
    title: "Ekmek Arası",
    description: "Günlük ekmekle taze sandviçler.",
    items: [],
    image: "/menu_photo/ekmekarasi.jpeg",
  },
  {
    slug: "salatalar",
    title: "Salatalar",
    description: "Hafif ve ferah seçenekler.",
    items: [],
    image: "/menu_photo/salatlar.jpeg",
  },
  {
    slug: "bowls",
    title: "Bowls",
    description: "Dengeli ve doyurucu kaseler.",
    items: [],
    image: "/menu_photo/bowles.jpeg",
  },
  {
    slug: "pizza",
    title: "Pizza",
    description: "Odun fırın lezzeti.",
    items: [],
    image: "/menu_photo/pizza.jpeg",
  },
  {
    slug: "gozleme-cesitleri",
    title: "Gözleme Çeşitleri",
    description: "Geleneksel lezzetler.",
    items: [],
    image: "/menu_photo/gozleme.jpeg",
  },
  {
    slug: "ana-yemekler",
    title: "Ana Yemekler",
    description: "Günlük sıcak tabaklar.",
    items: [],
    image: "/menu_photo/anayemekler.jpeg",
  },
  {
    slug: "makarnalar",
    title: "Makarnalar",
    description: "İtalyan esintileri.",
    items: [],
    image: "/menu_photo/makarna.jpeg",
  },
  {
    slug: "burgerler",
    title: "Burgerler",
    description: "Izgara köfte ve özel soslar.",
    items: [],
    image: "/menu_photo/burger.jpeg",
  },
  {
    slug: "corbalar",
    title: "Çorbalar",
    description: "Sıcak başlangıçlar.",
    items: [],
    image: "/menu_photo/corba.jpeg",
  },
  {
    slug: "icekiler",
    title: "İçkiler",
    description: "Serinletici seçenekler.",
    items: [],
    image: "/menu_photo/ickiler.jpeg",
  },
];

const sectionTranslations: Record<
  string,
  Record<LanguageKey, { title: string; description: string }>
> = {
  kahvalti: {
    tr: { title: "Kahvaltı", description: "Güne taze başlangıçlar." },
    en: { title: "Breakfast", description: "A fresh start to your day." },
    ru: { title: "Завтраки", description: "Свежий старт дня." },
    de: { title: "Frühstück", description: "Frischer Start in den Tag." },
  },
  atistirmaliklar: {
    tr: { title: "Atıştırmalıklar", description: "Gün içinde hızlı lezzetler." },
    en: { title: "Snacks", description: "Quick bites during the day." },
    ru: { title: "Закуски", description: "Быстрые перекусы в течение дня." },
    de: { title: "Snacks", description: "Schnelle Happen zwischendurch." },
  },
  izgara: {
    tr: { title: "Izgara", description: "Kömür ateşinde hazırlanan lezzetler." },
    en: { title: "Grill", description: "Charcoal-grilled favorites." },
    ru: { title: "Гриль", description: "Блюда на гриле." },
    de: { title: "Grill", description: "Köstlichkeiten vom Grill." },
  },
  "ekmek-arasi": {
    tr: { title: "Ekmek Arası", description: "Günlük ekmekle taze sandviçler." },
    en: { title: "Sandwiches", description: "Fresh sandwiches with daily bread." },
    ru: {
      title: "Сэндвичи",
      description: "Свежие сэндвичи на ежедневном хлебе.",
    },
    de: {
      title: "Sandwiches",
      description: "Frische Sandwiches mit Tagesbrot.",
    },
  },
  salatalar: {
    tr: { title: "Salatalar", description: "Hafif ve ferah seçenekler." },
    en: { title: "Salads", description: "Light and fresh options." },
    ru: { title: "Салаты", description: "Легкие и свежие варианты." },
    de: { title: "Salate", description: "Leichte und frische Optionen." },
  },
  bowls: {
    tr: { title: "Bowls", description: "Dengeli ve doyurucu kaseler." },
    en: { title: "Bowls", description: "Balanced and hearty bowls." },
    ru: { title: "Боулы", description: "Сбалансированные и сытные боулы." },
    de: { title: "Bowls", description: "Ausgewogene, sättigende Bowls." },
  },
  pizza: {
    tr: { title: "Pizza", description: "Odun fırın lezzeti." },
    en: { title: "Pizza", description: "Wood-fired flavor." },
    ru: { title: "Пицца", description: "Вкус дровяной печи." },
    de: { title: "Pizza", description: "Geschmack aus dem Holzofen." },
  },
  "gozleme-cesitleri": {
    tr: { title: "Gözleme Çeşitleri", description: "Geleneksel lezzetler." },
    en: { title: "Gozleme Varieties", description: "Traditional flavors." },
    ru: { title: "Гёзлеме", description: "Традиционные вкусы." },
    de: { title: "Gözleme", description: "Traditionelle Aromen." },
  },
  "ana-yemekler": {
    tr: { title: "Ana Yemekler", description: "Günlük sıcak tabaklar." },
    en: { title: "Main Dishes", description: "Daily hot plates." },
    ru: { title: "Основные блюда", description: "Ежедневные горячие блюда." },
    de: { title: "Hauptgerichte", description: "Täglich frisch gekocht." },
  },
  makarnalar: {
    tr: { title: "Makarnalar", description: "İtalyan esintileri." },
    en: { title: "Pastas", description: "Italian inspirations." },
    ru: { title: "Паста", description: "Итальянские мотивы." },
    de: { title: "Pasta", description: "Italienische Inspirationen." },
  },
  burgerler: {
    tr: { title: "Burgerler", description: "Izgara köfte ve özel soslar." },
    en: { title: "Burgers", description: "Grilled patties and special sauces." },
    ru: { title: "Бургеры", description: "Гриль котлеты и соусы." },
    de: { title: "Burger", description: "Gegrillte Patties und besondere Saucen." },
  },
  corbalar: {
    tr: { title: "Çorbalar", description: "Sıcak başlangıçlar." },
    en: { title: "Soups", description: "Warm starters." },
    ru: { title: "Супы", description: "Теплые закуски." },
    de: { title: "Suppen", description: "Warme Vorspeisen." },
  },
  icekiler: {
    tr: { title: "İçkiler", description: "Serinletici seçenekler." },
    en: { title: "Drinks", description: "Refreshing options." },
    ru: { title: "Напитки", description: "Освежающие варианты." },
    de: { title: "Getränke", description: "Erfrischende Optionen." },
  },
};

export const getLocalizedSection = (
  section: MenuSection,
  language: LanguageKey
) => {
  const translation = sectionTranslations[section.slug]?.[language];
  return {
    title: translation?.title ?? section.title,
    description: translation?.description ?? section.description,
  };
};

export const getSectionBySlug = (slug: string) =>
  menuSections.find((section) => section.slug === slug);
