"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { getLocalizedSection, type MenuSection } from "./sections";
import type { LanguageKey } from "../lib/language";

type CustomMenuItem = {
  id: string;
  sectionSlug: string;
  name: Partial<Record<LanguageKey, string>>;
  description: Partial<Record<LanguageKey, string>>;
  price: string;
  image: string;
  sortOrder?: number;
};

// Cache için basit bir in-memory cache
let cachedItems: CustomMenuItem[] | null = null;
let cacheTime = 0;
const CACHE_DURATION = 60000; // 60 saniye

const fetchItems = async (): Promise<CustomMenuItem[]> => {
  // Cache kontrolü
  const now = Date.now();
  if (cachedItems && (now - cacheTime) < CACHE_DURATION) {
    return cachedItems;
  }

  try {
    const response = await fetch("/api/menu-items", {
      cache: 'force-cache',
    });
    if (!response.ok) {
      return cachedItems || [];
    }
    const data = (await response.json()) as { items?: CustomMenuItem[] };
    const items = Array.isArray(data.items) ? data.items : [];
    
    // Cache'i güncelle
    cachedItems = items;
    cacheTime = now;
    
    return items;
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return cachedItems || [];
  }
};

const translations = {
  tr: {
    menu: "Menü",
    back: "Menü",
    spotlight: "Günün önerisi",
    spotlightSuffix: "seçenekleri",
    spotlightBody: "Günlük taze ürünlerle hazırlanır.",
    listTitle: "Menü listesi",
    empty: "Henüz eklenen ürün yok.",
    order: "Sipariş Ver",
  },
  en: {
    menu: "Menu",
    back: "Menu",
    spotlight: "Today's pick",
    spotlightSuffix: "selection",
    spotlightBody: "Prepared daily with fresh ingredients.",
    listTitle: "Menu list",
    empty: "No items added yet.",
    order: "Order",
  },
  ru: {
    menu: "Меню",
    back: "Меню",
    spotlight: "Выбор дня",
    spotlightSuffix: "подборка",
    spotlightBody: "Готовим ежедневно из свежих продуктов.",
    listTitle: "Список меню",
    empty: "Добавленных блюд пока нет.",
    order: "Заказать",
  },
  de: {
    menu: "Menü",
    back: "Menü",
    spotlight: "Tagesempfehlung",
    spotlightSuffix: "Auswahl",
    spotlightBody: "Täglich frisch zubereitet.",
    listTitle: "Menüliste",
    empty: "Noch keine Einträge hinzugefügt.",
    order: "Bestellen",
  },
};

type SectionLayoutProps = {
  section?: MenuSection;
};

export default function SectionLayout({ section }: SectionLayoutProps) {
  if (!section) {
    return <div className="min-h-screen bg-[#0f1516]" />;
  }

  const [language] = useLanguage();
  const t = translations[language];
  const localized = useMemo(
    () => getLocalizedSection(section, language),
    [language, section]
  );

  const [customItems, setCustomItems] = useState<CustomMenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const refresh = async () => {
      setIsLoading(true);
      try {
        const items = await fetchItems();
        // Debounce ile UI güncellemesi
        timeoutId = setTimeout(() => {
          if (isActive) {
            setCustomItems(items);
            setIsLoading(false);
          }
        }, 50);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
        if (isActive) {
          setCustomItems([]);
          setIsLoading(false);
        }
      }
    };
    
    refresh();
    
    return () => {
      isActive = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const mergedItems = useMemo(() => {
    const extra = customItems.filter(
      (item) => item.sectionSlug === section.slug
    );
    // section.items'ı CustomMenuItem formatına çevir (id ekle)
    const sectionItemsWithId = section.items.map((item, index) => ({
      ...item,
      id: `static-${section.slug}-${index}`,
      sectionSlug: section.slug,
    }));
    const combined = [...sectionItemsWithId, ...extra];
    return combined.sort(
      (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    );
  }, [customItems, section.items, section.slug]);

  const getText = (
    field: Partial<Record<LanguageKey, string>>,
    fallback: string
  ) => field[language] || field.tr || fallback;

  const createWhatsAppOrderLink = (
    name: string,
    description: string,
    price: string
  ) => {
    const whatsappNumber = "905468783146";
    const message = `Merhaba! ${name} sipariş etmek istiyorum.\n\n${description ? `Açıklama: ${description}\n` : ""}Fiyat: ${price}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen bg-[#0f1516] text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pb-12 pt-8 lg:max-w-none lg:px-10 lg:pb-16 lg:pt-10 xl:px-14">
        <header className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
              {t.menu}
            </p>
            <h1 className="text-2xl font-semibold">{localized.title}</h1>
            <p className="text-[11px] text-slate-200/75">
              {localized.description}
            </p>
          </div>
          <a
            className="inline-flex shrink-0 items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/90 transition hover:bg-white/20"
            href="/menu"
          >
            ← {t.back}
          </a>
        </header>

        <section className="space-y-4 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-6 lg:space-y-0">
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-emerald-500/10 via-white/5 to-transparent p-5 shadow-xl shadow-black/50 lg:sticky lg:top-8">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-black/40">
                <img
                  src={section.image}
                  alt={`${localized.title} görseli`}
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/menu/hero.png';
                  }}
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                  {t.spotlight}
                </p>
                <p className="text-sm font-semibold">
                  {localized.title} {t.spotlightSuffix}
                </p>
                <p className="text-[11px] text-slate-200/70">
                  {t.spotlightBody}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200/70">
              {t.listTitle}
            </p>
            <div className="mt-4 space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
              {isLoading && (
                <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-3 text-[11px] text-slate-200/70 text-center">
                  Yükleniyor...
                </div>
              )}
              {!isLoading && mergedItems.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-3 text-[11px] text-slate-200/70">
                  {t.empty}
                </div>
              )}
              {!isLoading && mergedItems.map((item) => {
                const itemName = getText(item.name, "Ürün");
                const itemDescription = getText(item.description, "");
                const whatsappLink = createWhatsAppOrderLink(
                  itemName,
                  itemDescription,
                  item.price
                );

                return (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 px-3 py-3"
                  >
                    <div className="h-14 w-14 overflow-hidden rounded-xl border border-white/10 bg-black/40 shrink-0">
                      <img
                        src={item.image || '/menu/hero.png'}
                        alt={itemName}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width={56}
                        height={56}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== '/menu/hero.png') {
                            target.src = '/menu/hero.png';
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-semibold">
                            {itemName}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-200/70">
                            {itemDescription}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="rounded-full border border-emerald-200/30 bg-emerald-200/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-100">
                            {item.price}
                          </span>
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1.5 text-[10px] font-semibold text-emerald-100 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5"
                          >
                            {t.order}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
