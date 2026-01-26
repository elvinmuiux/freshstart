type AboutSectionTranslations = {
  aboutTitle: string;
  aboutBody: string;
  phone: string;
  whatsapp: string;
};

type AboutSectionProps = {
  t: AboutSectionTranslations;
};

export default function AboutSection({ t }: AboutSectionProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-fuchsia-500/20 backdrop-blur">
      <h2 className="text-2xl font-semibold">{t.aboutTitle}</h2>
      <p className="text-sm text-slate-200/90">{t.aboutBody}</p>
      <div className="flex flex-wrap items-center gap-4">
        <a
          className="inline-flex items-center gap-3 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:bg-sky-400"
          href="tel:+905468783146"
          aria-label="Telefonla arama"
          title={t.phone}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
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
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </span>
          {t.phone}
        </a>
        <a
          className="inline-flex items-center gap-3 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400"
          href="https://wa.me/905468783146"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp ile iletişim"
          title="WhatsApp"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
            >
              <path d="M12 2a10 10 0 0 0-8.74 14.88L2 22l5.27-1.38A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 6.93 12.01.98.98 0 0 0-.1.74l.75 2.8-2.9-.76a.98.98 0 0 0-.73.1A8 8 0 1 1 12 4zm4.07 10.17c-.22-.11-1.28-.63-1.48-.7-.2-.08-.35-.11-.5.11-.14.22-.56.7-.68.85-.13.14-.25.16-.47.05-.22-.11-.92-.34-1.75-1.08-.64-.57-1.08-1.29-1.2-1.5-.12-.22-.01-.34.09-.46.09-.09.22-.24.33-.36.11-.12.14-.2.22-.34.07-.14.04-.26-.02-.37-.06-.11-.5-1.2-.7-1.64-.18-.43-.38-.37-.5-.37h-.43c-.15 0-.37.05-.57.26-.19.22-.75.74-.75 1.8s.77 2.09.88 2.23c.11.14 1.52 2.32 3.68 3.26.51.22.92.35 1.23.45.52.16.99.14 1.37.08.42-.06 1.28-.52 1.46-1.02.18-.5.18-.93.13-1.02-.05-.09-.2-.14-.42-.25z" />
            </svg>
          </span>
          {t.whatsapp}
        </a>
      </div>
    </div>
  );
}
