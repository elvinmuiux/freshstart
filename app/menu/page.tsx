"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { getLocalizedSection, menuSections } from "./sections";
import LanguageSelector from "../components/LanguageSelector";
import Link from "next/link";

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
  const [theme] = useTheme();
  const t = translations[language];
  const isDark = theme === "dark";
  const localizedSections = useMemo(
    () =>
      menuSections.map((section) => ({
        ...section,
        ...getLocalizedSection(section, language),
      })),
    [language]
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? "bg-[#0c1113] text-white" : "bg-[#E8D5B7] text-[#1e293b]"
    }`}>
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pb-12 pt-8 lg:max-w-none lg:px-10 lg:pb-16 lg:pt-10 xl:px-14">
        <header className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <Link
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest transition shrink-0 ${
                isDark
                  ? "border-white/15 bg-white/10 text-white/90 hover:bg-white/20"
                  : "border-[#D4C4A8] bg-[#F0E6D2] text-[#5C4A3A] shadow-sm hover:bg-[#E8D5B7]"
              }`}
              href="/"
            >
              ← {t.back}
            </Link>
            <div className="flex items-center gap-2 shrink-0">
              <LanguageSelector />
            </div>
          </div>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${
            isDark ? "text-emerald-200/80" : "text-emerald-600"
          }`}>
            {t.menu}
          </p>
          <h1 className="text-2xl font-semibold">{t.title}</h1>
          <p className={`text-[11px] ${
            isDark ? "text-slate-200/75" : "text-[#5C4A3A]"
          }`}>{t.description}</p>
        </header>

        <section className="space-y-4 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-6 lg:space-y-0">
          <div className={`relative overflow-hidden rounded-[28px] shadow-2xl transition-colors duration-300 lg:sticky lg:top-8 ${
            isDark
              ? "border border-white/10 bg-[#11181b] shadow-black/60"
              : "border border-[#D4C4A8] bg-[#F0E6D2] shadow-[#D4C4A8]/30"
          }`}>
            <Image
              src="/menu/hero.png"
              alt={t.imageAlt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                isDark ? "opacity-35" : "opacity-20"
              }`}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              quality={65}
              fetchPriority="high"
            />
            <div className={`absolute inset-0 transition-colors duration-300 ${
              isDark
                ? "bg-gradient-to-r from-black/80 via-black/50 to-transparent"
                : "bg-gradient-to-r from-white/90 via-white/70 to-transparent"
            }`} />
            <div className="relative space-y-3 p-5">
              <p className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${
                isDark ? "text-emerald-200/80" : "text-emerald-600"
              }`}>
                {t.spotlight}
              </p>
              <h2 className="text-lg font-semibold">{t.spotlightTitle}</h2>
              <p className={`text-[11px] ${
                isDark ? "text-slate-200/75" : "text-[#5C4A3A]"
              }`}>{t.spotlightBody}</p>
              <div className={`flex flex-wrap gap-2 text-[10px] ${
                isDark ? "text-slate-200/70" : "text-slate-600"
              }`}>
                <span className={`rounded-full border px-2.5 py-1 transition-colors ${
                  isDark
                    ? "border-white/15 bg-white/5"
                    : "border-[#D4C4A8] bg-[#E8D5B7]"
                }`}>
                  {t.badgeFresh}
                </span>
                <span className={`rounded-full border px-2.5 py-1 transition-colors ${
                  isDark
                    ? "border-white/15 bg-white/5"
                    : "border-[#D4C4A8] bg-[#E8D5B7]"
                }`}>
                  {t.badgeDelivery}
                </span>
                <span className={`rounded-full border px-2.5 py-1 transition-colors ${
                  isDark
                    ? "border-white/15 bg-white/5"
                    : "border-[#D4C4A8] bg-[#E8D5B7]"
                }`}>
                  {t.badgePickup}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
            {localizedSections.map((section) => (
              <Link
                key={section.slug}
                href={`/menu/${section.slug}`}
                className={`flex items-center gap-3 rounded-2xl border px-3 py-3 shadow-lg transition-colors duration-300 ${
                  isDark
                    ? "border-white/10 bg-white/5 shadow-black/40 hover:bg-white/10"
                    : "border-[#D4C4A8] bg-[#F0E6D2] shadow-[#D4C4A8]/20 hover:bg-[#E8D5B7]"
                }`}
              >
                <div className={`h-14 w-14 overflow-hidden rounded-xl border shrink-0 transition-colors ${
                  isDark
                    ? "border-white/10 bg-black/40"
                    : "border-[#D4C4A8] bg-[#E8D5B7]"
                }`}>
                  <Image
                    src={section.image}
                    alt={t.sectionImageAlt(section.title)}
                    className="h-full w-full object-cover"
                    width={56}
                    height={56}
                    sizes="56px"
                    quality={58}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{section.title}</p>
                  <p className={`text-[11px] ${
                    isDark ? "text-slate-200/70" : "text-slate-600"
                  }`}>
                    {section.description}
                  </p>
                </div>
                <span className={`text-sm ${
                  isDark ? "text-emerald-200/80" : "text-emerald-600"
                }`}>→</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
