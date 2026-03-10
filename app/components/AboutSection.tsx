import Link from "next/link";

type AboutSectionTranslations = {
  aboutTitle: string;
  aboutBody: string;
  menu: string;
  phone: string;
  whatsapp: string;
  whatsappMessage: string;
};

type AboutSectionProps = {
  t: AboutSectionTranslations;
  language: "tr" | "en" | "ru" | "de";
  theme: "dark" | "light";
};

export default function AboutSection({ t, theme }: AboutSectionProps) {
  const isDark = theme === "dark";
  
  return (
    <div className={`relative overflow-hidden rounded-[28px] shadow-2xl transition-colors duration-300 lg:h-full ${
      isDark
        ? "border border-white/10 bg-[#11181b] shadow-black/60"
        : "border border-[#D4C4A8] bg-[#F0E6D2] shadow-[#D4C4A8]/30"
    }`}>
      <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-300 ${
        isDark
          ? "from-emerald-500/10 via-white/5 to-transparent"
          : "from-[#E8D5B7]/30 via-[#E8D5B7]/20 to-transparent"
      }`} />
      <div className="relative space-y-5 p-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <p className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${
                isDark ? "text-emerald-200/80" : "text-[#5C4A3A]"
              }`}>
                {t.menu}
              </p>
              <h2 className="text-xl font-semibold">{t.aboutTitle}</h2>
            </div>
          </div>
          <p className={`text-[12px] leading-relaxed lg:text-[13px] ${
            isDark ? "text-slate-200/85" : "text-[#5C4A3A]"
          }`}>
            {t.aboutBody}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-300 ${
              isDark
                ? "border border-white/10 bg-black/30 text-white/90"
                : "border border-[#D4C4A8] bg-[#E8D5B7] text-[#5C4A3A]"
            }`}>
              Taze
            </span>
            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-300 ${
              isDark
                ? "border border-white/10 bg-black/30 text-white/90"
                : "border border-[#D4C4A8] bg-[#E8D5B7] text-[#5C4A3A]"
            }`}>
              Günlük
            </span>
            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-300 ${
              isDark
                ? "border border-white/10 bg-black/30 text-white/90"
                : "border border-[#D4C4A8] bg-[#E8D5B7] text-[#5C4A3A]"
            }`}>
              Hızlı
            </span>
            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-300 ${
              isDark
                ? "border border-white/10 bg-black/30 text-white/90"
                : "border border-[#D4C4A8] bg-[#E8D5B7] text-[#5C4A3A]"
            }`}>
              Paket
            </span>
            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-300 ${
              isDark
                ? "border border-white/10 bg-black/30 text-white/90"
                : "border border-[#D4C4A8] bg-[#E8D5B7] text-[#5C4A3A]"
            }`}>
              Kolay
            </span>
            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors duration-300 ${
              isDark
                ? "border border-white/10 bg-black/30 text-white/90"
                : "border border-[#D4C4A8] bg-[#E8D5B7] text-[#5C4A3A]"
            }`}>
              Gel-al
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-lg transition hover:opacity-90 ${
                isDark
                  ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-100 shadow-emerald-500/20 hover:bg-emerald-500/25"
                  : "border-emerald-400/60 bg-emerald-100 text-emerald-800 shadow-emerald-300/40 hover:bg-emerald-200"
              }`}
              href={`https://wa.me/905468783146?text=${encodeURIComponent(t.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp ile iletişim"
            >
              {t.whatsapp}
            </Link>
            <Link
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-lg transition hover:opacity-90 ${
                isDark
                  ? "border-sky-400/40 bg-sky-500/15 text-sky-100 shadow-sky-500/20 hover:bg-sky-500/25"
                  : "border-sky-400/60 bg-sky-100 text-sky-800 shadow-sky-300/40 hover:bg-sky-200"
              }`}
              href="tel:+905468783146"
              aria-label="Telefonla arama"
            >
              {t.phone}
            </Link>
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
      </div>
    </div>
  );
}
