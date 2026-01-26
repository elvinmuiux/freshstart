export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl font-semibold tracking-tight">Fresh Start</h1>
          <a
            className="inline-flex items-center rounded-full border border-black px-5 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white"
            href="https://freshstartx.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Menü
          </a>
        </header>

        <section className="flex flex-wrap items-center gap-6">
          <a
            className="inline-flex items-center gap-3 rounded-full border border-black px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white"
            href="https://wa.me/905468783146"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile iletişim"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
              >
                <path d="M12 2a10 10 0 0 0-8.74 14.88L2 22l5.27-1.38A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 6.93 12.01.98.98 0 0 0-.1.74l.75 2.8-2.9-.76a.98.98 0 0 0-.73.1A8 8 0 1 1 12 4zm4.07 10.17c-.22-.11-1.28-.63-1.48-.7-.2-.08-.35-.11-.5.11-.14.22-.56.7-.68.85-.13.14-.25.16-.47.05-.22-.11-.92-.34-1.75-1.08-.64-.57-1.08-1.29-1.2-1.5-.12-.22-.01-.34.09-.46.09-.09.22-.24.33-.36.11-.12.14-.2.22-.34.07-.14.04-.26-.02-.37-.06-.11-.5-1.2-.7-1.64-.18-.43-.38-.37-.5-.37h-.43c-.15 0-.37.05-.57.26-.19.22-.75.74-.75 1.8s.77 2.09.88 2.23c.11.14 1.52 2.32 3.68 3.26.51.22.92.35 1.23.45.52.16.99.14 1.37.08.42-.06 1.28-.52 1.46-1.02.18-.5.18-.93.13-1.02-.05-.09-.2-.14-.42-.25z" />
              </svg>
            </span>
            +90 546 878 3146
          </a>

          <form
            className="flex flex-1 min-w-[220px] items-center gap-3 rounded-full border border-black px-4 py-2"
            action="https://www.google.com/search"
            method="get"
            target="_blank"
            rel="noreferrer"
          >
            <input
              className="w-full bg-transparent text-sm outline-none"
              type="search"
              name="q"
              placeholder="Ara"
              aria-label="Arama"
              required
            />
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black transition-colors hover:bg-black hover:text-white"
              type="submit"
              aria-label="Arama yap"
            >
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
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </button>
          </form>
        </section>

        <section className="flex items-center gap-3 text-sm font-medium">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black">
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
              <path d="M3 7h11l3 5h4v6h-2" />
              <path d="M3 7v11h10" />
              <circle cx="7" cy="18" r="2" />
              <circle cx="18" cy="18" r="2" />
            </svg>
          </span>
          Çatdırılma
        </section>
      </main>
    </div>
  );
}
