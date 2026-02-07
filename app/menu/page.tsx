"use client";

import { useMemo } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { getLocalizedSection, menuSections } from "./sections";
import LanguageSelector from "../components/LanguageSelector";

const translations = {
  tr: {
    menu: "Menü",
    title: "Fresh Start Menü",
    description: "Bölümlere ayrılmış menüden seçiminizi yapın.",
    spotlight: "Günün seçkisi",
    spotlightTitle: "Taze hazırlanan bölümler",
    spotlightBody: "WhatsApp üzerinden kolayca sipariş verin, hızlı teslimat alın.",
    badgeFresh: "Günlük hazırlanır",
    badgeDelivery: "Paket servis",
    badgePickup: "Gel-al",
    imageAlt: "Menü görseli",
    sectionImageAlt: (title: string) => `${title} örnek görseli`,
    back: "Geri",
  },
  en: {
    menu: "Menu",
    title: "Fresh Start Menu",
    description: "Choose from the menu sections.",
    spotlight: "Today's selection",
    spotlightTitle: "Freshly prepared sections",
    spotlightBody: "Order easily via WhatsApp for fast delivery.",
    badgeFresh: "Prepared daily",
    badgeDelivery: "Delivery",
    badgePickup: "Pick-up",
    imageAlt: "Menu visual",
    sectionImageAlt: (title: string) => `${title} sample visual`,
    back: "Back",
  },
  ru: {
    menu: "Меню",
    title: "Меню Fresh Start",
    description: "Выберите раздел из меню.",
    spotlight: "Выбор дня",
    spotlightTitle: "Свежие разделы",
    spotlightBody: "Легко оформляйте заказ через WhatsApp для быстрой доставки.",
    badgeFresh: "Готовим ежедневно",
    badgeDelivery: "Доставка",
    badgePickup: "Самовывоз",
    imageAlt: "Изображение меню",
    sectionImageAlt: (title: string) => `Пример: ${title}`,
    back: "Назад",
  },
  de: {
    menu: "Menü",
    title: "Fresh Start Menü",
    description: "Wähle einen Bereich aus dem Menü.",
    spotlight: "Tagesauswahl",
    spotlightTitle: "Frisch zubereitete Bereiche",
    spotlightBody: "Bestellen Sie einfach über WhatsApp für eine schnelle Lieferung.",
    badgeFresh: "Täglich frisch",
    badgeDelivery: "Lieferung",
    badgePickup: "Abholung",
    imageAlt: "Menübild",
    sectionImageAlt: (title: string) => `Beispiel: ${title}`,
    back: "Zurück",
  },
};

export default function MenuPage() {
  const [language] = useLanguage();
  const t = translations[language];
  const localizedSections = useMemo(
    () =>
      menuSections.map((section) => ({
        ...section,
        ...getLocalizedSection(section, language),
      })),
    [language]
  );

  return (
    <div className="min-h-screen bg-[#0c1113] text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pb-12 pt-8">
        <header className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/90 transition hover:bg-white/20"
              href="/"
            >
              ← {t.back}
            </a>
            <LanguageSelector />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
            {t.menu}
          </p>
          <h1 className="text-2xl font-semibold">{t.title}</h1>
          <p className="text-[11px] text-slate-200/75">{t.description}</p>
        </header>

        <section className="space-y-4">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#11181b] shadow-2xl shadow-black/60">
            <img
              src="/menu/hero.png"
              alt={t.imageAlt}
              className="absolute inset-0 h-full w-full object-cover opacity-35"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative space-y-3 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
                {t.spotlight}
              </p>
              <h2 className="text-lg font-semibold">{t.spotlightTitle}</h2>
              <p className="text-[11px] text-slate-200/75">{t.spotlightBody}</p>
              <div className="flex flex-wrap gap-2 text-[10px] text-slate-200/70">
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">
                  {t.badgeFresh}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">
                  {t.badgeDelivery}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1">
                  {t.badgePickup}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {localizedSections.map((section) => (
              <a
                key={section.slug}
                href={`/menu/${section.slug}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 shadow-lg shadow-black/40"
              >
                <div className="h-14 w-14 overflow-hidden rounded-xl border border-white/10 bg-black/40">
                  <img
                    src={section.image}
                    alt={t.sectionImageAlt(section.title)}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/menu/hero.png';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{section.title}</p>
                  <p className="text-[11px] text-slate-200/70">
                    {section.description}
                  </p>
                </div>
                <span className="text-sm text-emerald-200/80">→</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
