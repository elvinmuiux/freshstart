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
};

export default function AboutSection({ t }: AboutSectionProps) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#11181b] shadow-2xl shadow-black/60">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-white/5 to-transparent" />
      <div className="relative space-y-5 p-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
                {t.menu}
              </p>
              <h2 className="text-xl font-semibold">{t.aboutTitle}</h2>
            </div>
          </div>
          <p className="text-[12px] leading-relaxed text-slate-200/85">
            {t.aboutBody}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-semibold text-white/90">
              Taze
            </span>
            <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-semibold text-white/90">
              Günlük
            </span>
            <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-semibold text-white/90">
              Hızlı
            </span>
            <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-semibold text-white/90">
              Paket
            </span>
            <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-semibold text-white/90">
              Kolay
            </span>
            <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-semibold text-white/90">
              Gel-al
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-2 text-xs font-semibold text-emerald-100 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500/25"
              href={`https://wa.me/905468783146?text=${encodeURIComponent(t.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp ile iletişim"
            >
              {t.whatsapp}
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/15 px-4 py-2 text-xs font-semibold text-sky-100 shadow-lg shadow-sky-500/20 transition hover:bg-sky-500/25"
              href="tel:+905468783146"
              aria-label="Telefonla arama"
            >
              {t.phone}
            </a>
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
      </div>
    </div>
  );
}
