type DeliverySectionTranslations = {
  deliveryTitle: string;
  deliveryBody: string;
  contactPreference: string;
  whatsapp: string;
  instagram: string;
  phone: string;
  locationLabel: string;
  fastDelivery: string;
  fastOrderFor: string;
  latestContentFor: string;
  directCallFor: string;
  whatsappDeliveryMessage: string;
};

type DeliverySectionProps = {
  t: DeliverySectionTranslations;
  language: "tr" | "en" | "ru" | "de";
  theme: "dark" | "light";
};

export default function DeliverySection({ t, theme }: DeliverySectionProps) {
  const isDark = theme === "dark";
  
  return (
    <div className="space-y-4 lg:h-full">
      {/* Header Card */}
      <div className={`relative overflow-hidden rounded-[24px] p-6 shadow-xl transition-colors duration-300 ${
        isDark
          ? "border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent shadow-emerald-500/10"
          : "border border-emerald-300/60 bg-gradient-to-br from-emerald-50 via-emerald-100/50 to-emerald-50 shadow-emerald-200/40"
      }`}>
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] transition-colors duration-300 ${
          isDark
            ? "from-emerald-400/10 via-transparent to-transparent"
            : "from-emerald-100/30 via-transparent to-transparent"
        }`} />
        <div className="relative flex items-center gap-4">
          <div className="flex-shrink-0 self-center">
            <div className="relative flex flex-col gap-4">
              <a
                href="https://maps.app.goo.gl/75gPMBxt7wVTRN5z8?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 cursor-pointer transition-transform hover:scale-105"
                aria-label="Google Maps'te konumu aç"
                title="Google Maps'te konumu aç"
              >
                <div className="relative flex-shrink-0">
                  <div className={`absolute inset-0 rounded-2xl blur-lg transition-all ${
                    isDark ? "bg-emerald-400/20 group-hover:bg-emerald-400/30" : "bg-emerald-200/40 group-hover:bg-emerald-300/50"
                  }`} />
                  <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border transition-all ${
                    isDark
                      ? "border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 group-hover:border-emerald-400/50"
                      : "border-emerald-300/60 bg-gradient-to-br from-emerald-100 to-emerald-50 group-hover:border-emerald-400/70"
                  }`}>
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-8 w-8 transition-colors ${
                        isDark ? "text-emerald-300 group-hover:text-emerald-200" : "text-emerald-700 group-hover:text-emerald-800"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold ${
                    isDark ? "text-emerald-200/90" : "text-emerald-800"
                  }`}>{t.locationLabel}</p>
                  <p className={`text-[11px] leading-tight ${
                    isDark ? "text-slate-200/70" : "text-[#5C4A3A]"
                  }`}>Antalya, Kundu</p>
                </div>
              </a>
              <a
                href="/menu"
                className="group relative flex items-center gap-3 cursor-pointer transition-transform hover:scale-105"
                aria-label="Menü sayfasına git"
                title="Menü sayfasına git"
              >
                <div className="relative flex-shrink-0">
                  <div className={`absolute inset-0 rounded-2xl blur-lg transition-all ${
                    isDark ? "bg-emerald-400/20 group-hover:bg-emerald-400/30" : "bg-emerald-200/40 group-hover:bg-emerald-300/50"
                  }`} />
                  <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border overflow-hidden transition-all ${
                    isDark
                      ? "border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 group-hover:border-emerald-400/50"
                      : "border-emerald-300/60 bg-gradient-to-br from-emerald-100 to-emerald-50 group-hover:border-emerald-400/70"
                  }`}>
                    <img
                      src="/kurye/kurye.png"
                      alt="Kurye"
                      className={`h-full w-full object-contain p-1 transition-opacity group-hover:opacity-90 ${
                        isDark ? "brightness-0 invert" : ""
                      }`}
                      loading="lazy"
                      decoding="async"
                      style={isDark ? { filter: 'brightness(0) invert(1)' } : undefined}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[11px] leading-tight ${
                    isDark ? "text-slate-200/70" : "text-[#5C4A3A]"
                  }`}>{t.fastDelivery}</p>
                </div>
              </a>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="space-y-2">
              <div className="flex flex-col items-start gap-2">
                <div className="relative">
                  <div className={`absolute inset-0 h-2 w-12 rounded-full ${
                    isDark ? "bg-emerald-500/30" : "bg-emerald-200/30"
                  }`} />
                  <div className={`relative h-2 w-12 rounded-full transition-colors ${
                    isDark 
                      ? "bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-200"
                      : "bg-gradient-to-r from-emerald-300 via-emerald-200 to-emerald-100"
                  }`} />
                </div>
                <div className="flex flex-col items-start gap-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isDark ? "text-emerald-200" : "text-emerald-800"
                  }`}>
                    {t.deliveryTitle}
                  </span>
                </div>
              </div>
            </div>
            <p className={`text-sm leading-relaxed ${
              isDark ? "text-slate-200/80" : "text-[#5C4A3A]"
            }`}>
              {t.deliveryBody}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Icons Row */}
      <div className="space-y-3">
        <p className={`text-center text-[10px] font-semibold uppercase tracking-[0.35em] ${
          isDark ? "text-slate-300/60" : "text-[#5C4A3A]/70"
        }`}>
          {t.contactPreference}
        </p>
        <div className="flex items-center justify-center gap-4 lg:justify-start">
          {/* WhatsApp */}
          <a
            className={`group relative flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg transition-all duration-300 hover:-translate-y-1 ${
              isDark
                ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 to-emerald-600/10 shadow-emerald-500/10 hover:border-emerald-400/50 hover:shadow-xl hover:shadow-emerald-500/20"
                : "border-emerald-400/60 bg-gradient-to-br from-emerald-100 to-emerald-50 shadow-emerald-300/40 hover:border-emerald-500/70 hover:shadow-xl hover:shadow-emerald-400/50"
            }`}
            href={`https://wa.me/905468783146?text=${encodeURIComponent(t.whatsappDeliveryMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile iletişim"
            title={t.whatsapp}
          >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br transition-all duration-300 ${
              isDark
                ? "from-emerald-400/0 via-emerald-400/0 to-emerald-500/0 group-hover:from-emerald-400/10 group-hover:via-emerald-400/5 group-hover:to-emerald-500/10"
                : "from-emerald-200/0 via-emerald-200/0 to-emerald-300/0 group-hover:from-emerald-200/30 group-hover:via-emerald-200/20 group-hover:to-emerald-300/30"
            }`} />
            <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl ring-2 transition-all ${
              isDark
                ? "bg-emerald-500/20 ring-emerald-400/20 group-hover:ring-emerald-400/40"
                : "bg-emerald-100 ring-emerald-400/40 group-hover:ring-emerald-500/60"
            }`}>
              <svg
                viewBox="0 0 24 24"
                className={`h-7 w-7 ${isDark ? "text-emerald-300" : "text-emerald-700"}`}
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 0 0-8.74 14.88L2 22l5.27-1.38A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 6.93 12.01.98.98 0 0 0-.1.74l.75 2.8-2.9-.76a.98.98 0 0 0-.73.1A8 8 0 1 1 12 4zm4.07 10.17c-.22-.11-1.28-.63-1.48-.7-.2-.08-.35-.11-.5.11-.14.22-.56.7-.68.85-.13.14-.25.16-.47.05-.22-.11-.92-.34-1.75-1.08-.64-.57-1.08-1.29-1.2-1.5-.12-.22-.01-.34.09-.46.09-.09.22-.24.33-.36.11-.12.14-.2.22-.34.07-.14.04-.26-.02-.37-.06-.11-.5-1.2-.7-1.64-.18-.43-.38-.37-.5-.37h-.43c-.15 0-.37.05-.57.26-.19.22-.75.74-.75 1.8s.77 2.09.88 2.23c.11.14 1.52 2.32 3.68 3.26.51.22.92.35 1.23.45.52.16.99.14 1.37.08.42-.06 1.28-.52 1.46-1.02.18-.5.18-.93.13-1.02-.05-.09-.2-.14-.42-.25z" />
              </svg>
            </div>
          </a>

          {/* Phone */}
          <a
            className={`group relative flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg transition-all duration-300 hover:-translate-y-1 ${
              isDark
                ? "border-sky-500/30 bg-gradient-to-br from-sky-500/15 to-blue-500/10 shadow-sky-500/10 hover:border-sky-400/50 hover:shadow-xl hover:shadow-sky-500/20"
                : "border-sky-400/60 bg-gradient-to-br from-sky-100 to-sky-50 shadow-sky-300/40 hover:border-sky-500/70 hover:shadow-xl hover:shadow-sky-400/50"
            }`}
            href="tel:+905468783146"
            aria-label="Telefonla arama"
            title={t.phone}
          >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br transition-all duration-300 ${
              isDark
                ? "from-sky-400/0 to-blue-400/0 group-hover:from-sky-400/10 group-hover:to-blue-400/10"
                : "from-sky-200/0 to-sky-300/0 group-hover:from-sky-200/30 group-hover:to-sky-300/30"
            }`} />
            <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl ring-2 transition-all ${
              isDark
                ? "bg-sky-500/20 ring-sky-400/20 group-hover:ring-sky-400/40"
                : "bg-sky-100 ring-sky-400/40 group-hover:ring-sky-500/60"
            }`}>
              <svg
                viewBox="0 0 24 24"
                className={`h-7 w-7 ${isDark ? "text-sky-300" : "text-sky-700"}`}
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
          </a>

          {/* Instagram */}
          <a
            className={`group relative flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg transition-all duration-300 hover:-translate-y-1 ${
              isDark
                ? "border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/15 via-pink-500/10 to-purple-500/10 shadow-fuchsia-500/10 hover:border-fuchsia-400/50 hover:shadow-xl hover:shadow-fuchsia-500/20"
                : "border-fuchsia-400/60 bg-gradient-to-br from-fuchsia-100 via-pink-100 to-purple-100 shadow-fuchsia-300/40 hover:border-fuchsia-500/70 hover:shadow-xl hover:shadow-fuchsia-400/50"
            }`}
            href="https://instagram.com/freshstartkundu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title={t.instagram}
          >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br transition-all duration-300 ${
              isDark
                ? "from-fuchsia-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-fuchsia-400/10 group-hover:via-pink-400/5 group-hover:to-purple-400/10"
                : "from-fuchsia-200/0 via-pink-200/0 to-purple-200/0 group-hover:from-fuchsia-200/30 group-hover:via-pink-200/20 group-hover:to-purple-200/30"
            }`} />
            <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ring-2 transition-all ${
              isDark
                ? "from-fuchsia-500/20 to-pink-500/20 ring-fuchsia-400/20 group-hover:ring-fuchsia-400/40"
                : "from-fuchsia-100 to-pink-100 ring-fuchsia-400/40 group-hover:ring-fuchsia-500/60"
            }`}>
              <svg
                viewBox="0 0 24 24"
                className={`h-7 w-7 ${isDark ? "text-white" : "text-fuchsia-700"}`}
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                <path d="M16 11.37a4 4 0 1 1-7.75 1.76 4 4 0 0 1 7.75-1.76z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
