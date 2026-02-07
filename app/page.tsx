"use client";

import { useMemo, memo } from "react";
import { useLanguage } from "./hooks/useLanguage";
import AboutSection from "./components/AboutSection";
import DeliverySection from "./components/DeliverySection";
import LanguageSelector from "./components/LanguageSelector";


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
  },
};

export default function Home() {
  const [language] = useLanguage();
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
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
                  {t.premiumExperience}
                </p>
                <h1 className="text-2xl font-semibold">Fresh Start</h1>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </header>

        <section className="-mt-4 space-y-4">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#11181b] shadow-2xl shadow-black/60">
            <img
              src="/menu/hero.png"
              alt={t.menu}
              className="absolute inset-0 h-full w-full object-cover opacity-35"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative space-y-3 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
                {t.premiumExperience}
              </p>
              <h2 className="text-xl font-semibold">{t.heroTitle}</h2>
              <p className="text-[11px] text-slate-200/75">{t.heroBody}</p>
              <a
                className="group relative inline-flex items-center gap-2 rounded-full border border-emerald-400/40 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-emerald-100 shadow-lg shadow-emerald-500/20 transition-transform hover:-translate-y-0.5 overflow-hidden"
                href="/menu"
                aria-label={t.menu}
                title={t.menu}
                style={{
                  background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.25) 0%, rgba(34, 211, 238, 0.3) 16.66%, rgba(52, 211, 153, 0.35) 33.33%, rgba(20, 184, 166, 0.3) 50%, rgba(16, 185, 129, 0.4) 66.66%, rgba(34, 211, 238, 0.3) 83.33%, rgba(52, 211, 153, 0.25) 100%)',
                }}
              >
                <span className="relative z-10">{t.menu}</span>
                <span className="relative z-10 text-emerald-200 transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="-mt-2 space-y-4">
          <AboutSection t={t} />
          <DeliverySection t={t} />
        </section>

        <footer className="relative overflow-hidden rounded-[24px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent px-6 py-5 shadow-xl shadow-emerald-500/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-emerald-400/10 via-transparent to-transparent" />
          <div className="relative flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-emerald-200/90">
                  © {new Date().getFullYear()} Fresh Start
                </p>
                <p className="text-[11px] text-slate-200/70">{t.footerLocation}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent" />
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-200/80">
                  <span>{t.footerRights}</span>
                  <a
                    className="group inline-flex items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-100 transition-all hover:border-emerald-400/50 hover:bg-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5"
                    href="https://descube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="relative z-10">descube</span>
                  </a>
                  <span>{t.footerBy}</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
