"use client";

import { useMemo, memo } from "react";
import { useLanguage } from "./hooks/useLanguage";
import { useTheme } from "./hooks/useTheme";
import AboutSection from "./components/AboutSection";
import DeliverySection from "./components/DeliverySection";
import LanguageSelector from "./components/LanguageSelector";
import Link from "next/link";


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
    locationLabel: "Konum",
    fastDelivery: "Hızlı teslimat",
    fastOrderFor: "Hızlı sipariş için",
    latestContentFor: "Güncel içerikler için",
    directCallFor: "Direkt arama için",
    footerLocation: "Antalya · Taze & ev yapımı lezzetler",
    footerRights: "Tüm hakları",
    footerBy: "tarafından korumaktadır",
    footerMadeWith: "Antalya'da ❤️ ile yapıldı",
    footerSupportedBy: "Tərəfindən dəstəklənir",
    whatsappMessage: "Merhaba! Fresh Start Ekibi\n\nSipariş vermek istiyorum.",
    whatsappDeliveryMessage: "Merhaba! Fresh Start Ekibi\n\nPaket servis ile sipariş vermek istiyorum.",
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
    locationLabel: "Location",
    fastDelivery: "Fast delivery",
    fastOrderFor: "For fast order",
    latestContentFor: "For latest content",
    directCallFor: "For direct call",
    footerLocation: "Antalya · Fresh & homemade flavors",
    footerRights: "All rights reserved by",
    footerBy: "",
    footerMadeWith: "Made with ❤️ in Antalya",
    footerSupportedBy: "Supported by",
    whatsappMessage: "Hello! Fresh Start Team\n\nI would like to place an order.",
    whatsappDeliveryMessage: "Hello! Fresh Start Team\n\nI would like to order for delivery.",
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
    locationLabel: "Местоположение",
    fastDelivery: "Быстрая доставка",
    fastOrderFor: "Для быстрого заказа",
    latestContentFor: "Для актуального контента",
    directCallFor: "Для прямого звонка",
    footerLocation: "Анталья · Свежие и домашние вкусы",
    footerRights: "Все права защищены компанией",
    footerBy: "",
    footerMadeWith: "Сделано с ❤️ в Анталье",
    footerSupportedBy: "Поддерживается",
    whatsappMessage: "Здравствуйте! Команда Fresh Start\n\nЯ хотел бы сделать заказ.",
    whatsappDeliveryMessage: "Здравствуйте! Команда Fresh Start\n\nЯ хотел бы заказать доставку.",
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
    locationLabel: "Standort",
    fastDelivery: "Schnelle Lieferung",
    fastOrderFor: "Für schnelle Bestellung",
    latestContentFor: "Für aktuelle Inhalte",
    directCallFor: "Für direkten Anruf",
    footerLocation: "Antalya · Frische & hausgemachte Aromen",
    footerRights: "Alle Rechte vorbehalten von",
    footerBy: "",
    footerMadeWith: "Mit ❤️ in Antalya gemacht",
    footerSupportedBy: "Unterstützt von",
    whatsappMessage: "Hallo! Fresh Start Team\n\nIch möchte eine Bestellung aufgeben.",
    whatsappDeliveryMessage: "Hallo! Fresh Start Team\n\nIch möchte eine Lieferung bestellen.",
  },
};

export default function Home() {
  const [language] = useLanguage();
  const [theme] = useTheme();
  const t = useMemo(() => translations[language], [language]);

  const isDark = theme === "dark";

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${
      isDark ? "bg-[#0c1113] text-white" : "bg-[#E8D5B7] text-[#1e293b]"
    }`}>
      <main className="relative mx-auto flex w-full max-w-md flex-col gap-6 px-4 pb-12 pt-8 lg:max-w-none lg:px-10 lg:pb-16 lg:pt-10 xl:px-14">
        <header className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full overflow-hidden ${
                isDark ? "border border-white/15 bg-white/10" : "border border-[#D4C4A8] bg-[#F0E6D2] shadow-sm"
              }`}>
                <img
                  src="/logo/logo.jpeg"
                  alt="Fresh Start Logo"
                  className="h-full w-full object-cover rounded-full"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </span>
              <div>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${
                  isDark ? "text-emerald-200/80" : "text-[#5C4A3A]"
                }`}>
                  {t.premiumExperience}
                </p>
                <h1 className="text-2xl font-semibold">Fresh Start</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
            </div>
          </div>
        </header>

        <section className="-mt-4 space-y-4 lg:mt-0">
          <div className={`relative overflow-hidden rounded-[28px] shadow-2xl transition-colors duration-300 ${
            isDark 
              ? "border border-white/10 bg-[#11181b] shadow-black/60" 
              : "border border-[#D4C4A8] bg-[#F0E6D2] shadow-[#D4C4A8]/30"
          }`}>
            <img
              src="/menu/hero.png"
              alt={t.menu}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                isDark ? "opacity-35" : "opacity-20"
              }`}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            <div className={`absolute inset-0 transition-colors duration-300 ${
              isDark 
                ? "bg-gradient-to-r from-black/80 via-black/50 to-transparent" 
                : "bg-gradient-to-r from-[#F0E6D2]/90 via-[#E8D5B7]/70 to-transparent"
            }`} />
            <div className="relative space-y-3 p-5">
              <p className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${
                isDark ? "text-emerald-200/80" : "text-[#5C4A3A]"
              }`}>
                {t.premiumExperience}
              </p>
              <h2 className="text-xl font-semibold">{t.heroTitle}</h2>
              <p className={`text-[11px] ${
                isDark ? "text-slate-200/75" : "text-[#5C4A3A]"
              }`}>{t.heroBody}</p>
              <Link
                className={`group relative inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-widest shadow-lg transition-transform hover:-translate-y-0.5 overflow-hidden ${
                  isDark
                    ? "border-emerald-400/40 text-emerald-100 shadow-emerald-500/20"
                    : "border-emerald-400/60 text-emerald-800 shadow-emerald-300/40 bg-emerald-100 hover:bg-emerald-200"
                }`}
                href="/menu"
                aria-label={t.menu}
                title={t.menu}
                style={isDark ? {
                  background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.25) 0%, rgba(34, 211, 238, 0.3) 16.66%, rgba(52, 211, 153, 0.35) 33.33%, rgba(20, 184, 166, 0.3) 50%, rgba(16, 185, 129, 0.4) 66.66%, rgba(34, 211, 238, 0.3) 83.33%, rgba(52, 211, 153, 0.25) 100%)',
                } : undefined}
              >
                <span className="relative z-10">{t.menu}</span>
                <span className={`relative z-10 transition-transform group-hover:translate-x-1 ${
                  isDark ? "text-emerald-200" : "text-emerald-700"
                }`}>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="-mt-2 space-y-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6 lg:space-y-0">
          <AboutSection t={t} language={language} theme={theme} />
          <DeliverySection t={t} language={language} theme={theme} />
        </section>

        <footer className={`relative overflow-hidden rounded-[24px] px-6 py-5 shadow-xl transition-colors duration-300 ${
          isDark
            ? "border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent shadow-emerald-500/10"
            : "border border-[#D4C4A8] bg-gradient-to-br from-[#E8D5B7] via-[#E8D5B7]/50 to-[#F0E6D2] shadow-[#D4C4A8]/20"
        }`}>
          <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] transition-colors duration-300 ${
            isDark ? "from-emerald-400/10 via-transparent to-transparent" : "from-[#E8D5B7]/20 via-transparent to-transparent"
          }`} />
          <div className="relative flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <p className={`text-xs font-bold ${
                  isDark ? "text-emerald-200/90" : "text-[#5C4A3A]"
                }`}>
                  © {new Date().getFullYear()} Fresh Start
                </p>
                <p className={`text-[11px] ${
                  isDark ? "text-slate-200/70" : "text-[#5C4A3A]"
                }`}>{t.footerLocation}</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <p className={`text-[10px] ${
                isDark ? "text-slate-300/60" : "text-[#5C4A3A]/70"
              }`}>
                {t.footerSupportedBy}{" "}
                <Link
                  href="https://descube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-semibold transition-colors hover:underline ${
                    isDark ? "text-emerald-300 hover:text-emerald-200" : "text-emerald-700 hover:text-emerald-800"
                  }`}
                >
                  descube
                </Link>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
