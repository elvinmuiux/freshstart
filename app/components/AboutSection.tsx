type AboutSectionTranslations = {
  aboutTitle: string;
  aboutBody: string;
  menu: string;
  phone: string;
  whatsapp: string;
};

type AboutSectionProps = {
  t: AboutSectionTranslations;
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
              href="https://wa.me/905468783146"
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
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 transition hover:bg-white/20"
              href="/menu"
              aria-label={t.menu}
              title={t.menu}
            >
              {t.menu}
              <span className="text-white/90">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
