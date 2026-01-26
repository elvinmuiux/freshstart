type DeliverySectionTranslations = {
  deliveryTitle: string;
  deliveryBody: string;
  contactPreference: string;
  whatsapp: string;
  instagram: string;
  phone: string;
};

type DeliverySectionProps = {
  t: DeliverySectionTranslations;
};

export default function DeliverySection({ t }: DeliverySectionProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-500/20 backdrop-blur">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
            <img
              src="/kurye/kurye.png"
              alt="Kurye"
              className="h-12 w-12 object-contain"
              loading="lazy"
            />
          </span>
          <p className="text-lg font-semibold">{t.deliveryTitle}</p>
        </div>
        <p className="text-sm text-slate-200/80">{t.deliveryBody}</p>
      </div>
      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-medium text-slate-100/90">
          {t.contactPreference}
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <a
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-100 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-500/25"
            href="https://wa.me/905468783146"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile iletişim"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/30">
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
          <a
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-fuchsia-400/30 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:from-pink-500/30 hover:via-purple-500/30 hover:to-indigo-500/30"
            href="https://instagram.com/freshstartkundu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
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
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                <path d="M16 11.37a4 4 0 1 1-7.75 1.76 4 4 0 0 1 7.75-1.76z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </span>
            {t.instagram}
          </a>
          <a
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-100 shadow-lg shadow-sky-500/20 transition hover:bg-sky-500/25"
            href="tel:+905468783146"
            aria-label="Telefonla arama"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/30">
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
        </div>
      </div>
    </div>
  );
}
