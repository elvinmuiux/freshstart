"use client";

import { useMemo, useState } from "react";
import AboutSection from "./components/AboutSection";
import DeliverySection from "./components/DeliverySection";

const languageLabels = {
  en: "English",
  tr: "Türkçe",
  ru: "Русский",
  de: "Deutsch",
};

const languageFlags = {
  en: "🇬🇧",
  tr: "🇹🇷",
  ru: "🇷🇺",
  de: "🇩🇪",
};


const translations = {
  tr: {
    premiumExperience: "Hoş geldiniz",
    menu: "Menü",
    language: "Dil",
    aboutTitle: "Fresh Start hakkında",
    aboutBody:
      "Fresh Start – Dünya & Türk Mutfağı. Fresh Start, taze malzemelerle hazırlanan Türk ve dünya mutfağından lezzetleri bir araya getirir. Izgara yemeklerden ev yemeklerine, bowl'lardan sandviç ve çorbalara kadar her şey günlük ve özenle hazırlanır. Antalya’da hizmet veriyoruz. Taze & ev yapımı lezzetler. Hızlı paket servis ve gel-al seçenekleri. WhatsApp üzerinden kolayca sipariş verebilir veya menümüzü inceleyebilirsiniz. Gerçek lezzet, temiz mutfak, samimi hizmet.",
    searchPlaceholder: "Ara",
    searchAria: "Arama",
    searchButton: "Arama yap",
    deliveryTitle: "Paket servis",
    deliveryBody: "Hızlı ve güvenli teslimat deneyimi.",
    contactPreference: "İletişim tercihi",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    phone: "Telefon",
    footerLocation: "Antalya · Taze & ev yapımı lezzetler",
    footerRights: "Tüm hakları",
    footerBy: "tarafından korumaktadır",
  },
  en: {
    premiumExperience: "Welcome",
    menu: "Menu",
    language: "Language",
    aboutTitle: "About Fresh Start",
    aboutBody:
      "Fresh Start – World & Turkish Cuisine. We bring together Turkish and world flavors prepared with fresh ingredients. From grilled dishes and home-style meals to bowls, sandwiches, and soups, everything is prepared daily with care. We serve in Antalya, offering fresh & homemade flavors with fast delivery and pick-up options. You can easily order via WhatsApp or browse our menu. Real flavor, clean kitchen, friendly service.",
    searchPlaceholder: "Search",
    searchAria: "Search",
    searchButton: "Search",
    deliveryTitle: "Delivery",
    deliveryBody: "Fast and reliable delivery experience.",
    contactPreference: "Contact preference",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    phone: "Phone",
    footerLocation: "Antalya · Fresh & homemade flavors",
    footerRights: "All rights reserved by",
    footerBy: "",
  },
  ru: {
    premiumExperience: "Добро пожаловать",
    menu: "Меню",
    language: "Язык",
    aboutTitle: "О Fresh Start",
    aboutBody:
      "Fresh Start — мировая и турецкая кухня. Fresh Start объединяет турецкие и мировые блюда, приготовленные из свежих ингредиентов. От блюд на гриле и домашней кухни до боулов, сэндвичей и супов — все готовится ежедневно и с заботой. Мы работаем в Анталье. Свежие и домашние вкусы. Быстрая доставка и самовывоз. Вы можете легко заказать через WhatsApp или ознакомиться с нашим меню. Настоящий вкус, чистая кухня, дружелюбный сервис.",
    searchPlaceholder: "Поиск",
    searchAria: "Поиск",
    searchButton: "Искать",
    deliveryTitle: "Доставка",
    deliveryBody: "Быстрый и надежный сервис доставки.",
    contactPreference: "Способ связи",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    phone: "Телефон",
    footerLocation: "Анталья · Свежие и домашние вкусы",
    footerRights: "Все права защищены компанией",
    footerBy: "",
  },
  de: {
    premiumExperience: "Willkommen",
    menu: "Menü",
    language: "Sprache",
    aboutTitle: "Über Fresh Start",
    aboutBody:
      "Fresh Start – Welt- & türkische Küche. Fresh Start vereint türkische und internationale Gerichte, zubereitet mit frischen Zutaten. Von Grillgerichten und Hausmannskost bis zu Bowls, Sandwiches und Suppen wird alles täglich und sorgfältig zubereitet. Wir sind in Antalya tätig. Frische & hausgemachte Aromen. Schnelle Lieferung und Abholung. Sie können ganz einfach per WhatsApp bestellen oder unser Menü ansehen. Echter Geschmack, saubere Küche, freundlicher Service.",
    searchPlaceholder: "Suchen",
    searchAria: "Suchen",
    searchButton: "Suchen",
    deliveryTitle: "Lieferung",
    deliveryBody: "Schnelle und zuverlässige Lieferung.",
    contactPreference: "Kontaktpräferenz",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    phone: "Telefon",
    footerLocation: "Antalya · Frische & hausgemachte Aromen",
    footerRights: "Alle Rechte vorbehalten von",
    footerBy: "",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<keyof typeof languageLabels>("en");
  const languageText = useMemo(() => languageLabels[language], [language]);
  const languageFlag = useMemo(() => languageFlags[language], [language]);
  const t = useMemo(() => translations[language], [language]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.35),_transparent_60%)]" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-fuchsia-400/30 blur-3xl" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-12 pt-8">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
              {t.premiumExperience}
            </p>
            <h1 className="flex items-center gap-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Fresh Start
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white">
                <img
                  src="/kurye/kurye.png"
                  alt="Kurye"
                  className="h-8 w-8 object-contain"
                  loading="lazy"
                />
              </span>
            </h1>
          </div>
          <div className="flex flex-nowrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-base font-semibold uppercase tracking-wider sm:text-lg">
              <button
                className={`rounded-full px-3 py-1 transition ${
                  language === "en"
                    ? "bg-white text-slate-950"
                    : "text-white/60 hover:text-white"
                }`}
                type="button"
                onClick={() => setLanguage("en")}
                aria-pressed={language === "en"}
                aria-label={languageLabels.en}
                title={languageLabels.en}
              >
                <span aria-hidden="true">{languageFlags.en}</span>
              </button>
              <button
                className={`rounded-full px-3 py-1 transition ${
                  language === "tr"
                    ? "bg-white text-slate-950"
                    : "text-white/60 hover:text-white"
                }`}
                type="button"
                onClick={() => setLanguage("tr")}
                aria-pressed={language === "tr"}
                aria-label={languageLabels.tr}
                title={languageLabels.tr}
              >
                <span aria-hidden="true">{languageFlags.tr}</span>
              </button>
              <button
                className={`rounded-full px-3 py-1 transition ${
                  language === "ru"
                    ? "bg-white text-slate-950"
                    : "text-white/60 hover:text-white"
                }`}
                type="button"
                onClick={() => setLanguage("ru")}
                aria-pressed={language === "ru"}
                aria-label={languageLabels.ru}
                title={languageLabels.ru}
              >
                <span aria-hidden="true">{languageFlags.ru}</span>
              </button>
              <button
                className={`rounded-full px-3 py-1 transition ${
                  language === "de"
                    ? "bg-white text-slate-950"
                    : "text-white/60 hover:text-white"
                }`}
                type="button"
                onClick={() => setLanguage("de")}
                aria-pressed={language === "de"}
                aria-label={languageLabels.de}
                title={languageLabels.de}
              >
                <span aria-hidden="true">{languageFlags.de}</span>
              </button>
            </div>
            <a
              className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition hover:bg-blue-400"
              href="https://freshstartx.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.menu}
              title={t.menu}
            >
              <span>{t.menu}</span>
              <span className="text-white/90">→</span>
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h12" />
              </svg>
            </a>
          </div>
        </header>

        <section className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
          <div className="transform -translate-y-5">
            <AboutSection t={t} />
          </div>
          <DeliverySection t={t} />
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-slate-200/80 -translate-y-6">
          <span>© {new Date().getFullYear()} Fresh Start</span>
          <span>{t.footerLocation}</span>
          <span className="flex flex-wrap items-center gap-2 text-slate-300/80">
            {t.footerRights}
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90 transition hover:bg-white/20"
              href="https://descube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              descube
            </a>
            {t.footerBy}
          </span>
        </footer>
      </main>
    </div>
  );
}
