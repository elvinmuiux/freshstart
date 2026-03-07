"use client";

import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center rounded-full border p-2 text-xs font-semibold transition-colors ${
        isDark
          ? "border-white/15 bg-white/10 text-white/90 hover:bg-white/20"
          : "border-[#D4C4A8] bg-[#F0E6D2] text-[#5C4A3A] shadow-sm hover:bg-[#E8D5B7]"
      }`}
      aria-label={isDark ? "Açık moda geç" : "Koyu moda geç"}
      title={isDark ? "Açık moda geç" : "Koyu moda geç"}
    >
      {theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
