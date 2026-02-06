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
};

const fetchItems = async () => {
  const response = await fetch("/api/menu-items", { cache: "no-store" });
  if (!response.ok) {
    return [];
  }
  const data = (await response.json()) as { items?: CustomMenuItem[] };
  return Array.isArray(data.items) ? data.items : [];
};

const translations = {
  tr: {
    menu: "Menü",
    back: "Menü",
    spotlight: "Günün önerisi",
    spotlightSuffix: "seçkisi",
    spotlightBody: "Günlük taze ürünlerle hazırlanır.",
    listTitle: "Menü listesi",
    empty: "Henüz eklenen ürün yok.",
  },
  en: {
    menu: "Menu",
    back: "Menu",
    spotlight: "Today's pick",
    spotlightSuffix: "selection",
    spotlightBody: "Prepared daily with fresh ingredients.",
    listTitle: "Menu list",
    empty: "No items added yet.",
  },
  ru: {
    menu: "Меню",
    back: "Меню",
    spotlight: "Выбор дня",
    spotlightSuffix: "подборка",
    spotlightBody: "Готовим ежедневно из свежих продуктов.",
    listTitle: "Список меню",
    empty: "Добавленных блюд пока нет.",
  },
  de: {
    menu: "Menü",
    back: "Menü",
    spotlight: "Tagesempfehlung",
    spotlightSuffix: "Auswahl",
    spotlightBody: "Täglich frisch zubereitet.",
    listTitle: "Menüliste",
    empty: "Noch keine Einträge hinzugefügt.",
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
  const t = useMemo(() => translations[language], [language]);
  const localized = useMemo(
    () => getLocalizedSection(section, language),
    [language, section]
  );

  const [customItems, setCustomItems] = useState<CustomMenuItem[]>([]);

  useEffect(() => {
    fetchItems().then(setCustomItems);
  }, []);

  const mergedItems = useMemo(() => {
    const extra = customItems.filter(
      (item) => item.sectionSlug === section.slug
    );
    return [...section.items, ...extra];
  }, [customItems, section.items, section.slug]);

  const getText = (
    field: Partial<Record<LanguageKey, string>>,
    fallback: string
  ) => field[language] || field.tr || fallback;

  return (
    <div className="min-h-screen bg-[#0f1516] text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pb-12 pt-8">
        <header className="flex items-center justify-between">
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
            className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/90 transition hover:bg-white/20"
            href="/menu"
          >
            ← {t.back}
          </a>
        </header>

        <section className="space-y-4">
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-emerald-500/10 via-white/5 to-transparent p-5 shadow-xl shadow-black/50">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-black/40">
                <img
                  src={section.image}
                  alt={`${localized.title} görseli`}
                  className="h-full w-full object-cover"
                  loading="lazy"
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
            <div className="mt-4 space-y-3">
              {mergedItems.length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-black/30 px-3 py-3 text-[11px] text-slate-200/70">
                  {t.empty}
                </div>
              )}
              {mergedItems.map((item) => (
                <div
                  key={`${getText(item.name, "item")}-${item.price}`}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-black/30 px-3 py-3"
                >
                  <div className="h-14 w-14 overflow-hidden rounded-xl border border-white/10 bg-black/40">
                    <img
                      src={item.image}
                      alt={getText(item.name, "Ürün")}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">
                        {getText(item.name, "Ürün")}
                      </p>
                      <span className="rounded-full border border-emerald-200/30 bg-emerald-200/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-100">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-200/70">
                      {getText(item.description, "")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
