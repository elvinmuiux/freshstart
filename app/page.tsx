"use client";

import { useMemo } from "react";
import { useLanguage } from "./hooks/useLanguage";
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
    heroTitle: "Taze ve ev yapımı lezzetler",
    heroBody: "WhatsApp üzerinden kolayca sipariş verin, hızlı teslimat alın.",
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
    heroTitle: "Fresh & homemade flavors",
    heroBody: "Order easily via WhatsApp for fast delivery.",
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
    heroTitle: "Свежие и домашние вкусы",
    heroBody: "Заказывайте легко через WhatsApp для быстрой доставки.",
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
    heroTitle: "Frische & hausgemachte Aromen",
    heroBody: "Bestellen Sie einfach über WhatsApp für schnelle Lieferung.",
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
  const [language, setLanguage] = useLanguage();
  const t = useMemo(() => translations[language], [language]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0c1113] text-white">
      <main className="relative mx-auto flex w-full max-w-md flex-col gap-6 px-4 pb-12 pt-8">
        <header className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 overflow-hidden">
                <img
                  src="/logo/logo.jpeg"
                  alt="Fresh Start Logo"
                  className="h-full w-full object-cover rounded-full"
                  loading="lazy"
                />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
                  {t.premiumExperience}
                </p>
                <h1 className="text-2xl font-semibold">Fresh Start</h1>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-1 text-xs font-semibold uppercase tracking-wider">
              <button
                className={`rounded-full px-2 py-1 transition ${
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
                className={`rounded-full px-2 py-1 transition ${
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
                className={`rounded-full px-2 py-1 transition ${
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
                className={`rounded-full px-2 py-1 transition ${
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
          </div>
        </header>

        <section className="space-y-4">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#11181b] shadow-2xl shadow-black/60">
            <img
              src="/menu/hero.png"
              alt={t.menu}
              className="absolute inset-0 h-full w-full object-cover opacity-35"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative space-y-3 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
                {t.premiumExperience}
              </p>
              <h2 className="text-xl font-semibold">{t.heroTitle}</h2>
              <p className="text-[11px] text-slate-200/75">{t.heroBody}</p>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/90 transition hover:bg-white/20"
                href="/menu"
                aria-label={t.menu}
                title={t.menu}
              >
                <span>{t.menu}</span>
                <span className="text-white/90">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <AboutSection t={t} />
          <DeliverySection t={t} />
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-xs text-slate-200/80">
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
