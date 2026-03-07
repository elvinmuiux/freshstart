"use client";

import { useCallback } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

const languageLabels = {
  en: "English",
  tr: "Türkçe",
  ru: "Русский",
  de: "Deutsch",
};

const languageFlags = {
  en: "🇬🇧",
  tr: "🇹🇷",
  ru: "🇷🇺",
  de: "🇩🇪",
};

export default function LanguageSelector() {
  const [language, setLanguage] = useLanguage();
  const [theme] = useTheme();
  const isDark = theme === "dark";

  const handleLanguageChange = useCallback((lang: "en" | "tr" | "ru" | "de") => {
    setLanguage(lang);
  }, [setLanguage]);

  return (
    <div className={`flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
      isDark
        ? "border-white/15 bg-white/10"
        : "border-[#D4C4A8] bg-[#F0E6D2] shadow-sm"
    }`}>
      <button
        className={`rounded-full px-2 py-1 transition-colors ${
          language === "en"
            ? isDark
              ? "bg-white text-slate-950"
              : "bg-[#5C4A3A] text-[#F0E6D2]"
            : isDark
              ? "text-white/60 hover:text-white"
              : "text-[#5C4A3A] hover:text-[#3D2F1F]"
        }`}
        type="button"
        onClick={() => handleLanguageChange("en")}
        aria-pressed={language === "en"}
        aria-label={languageLabels.en}
        title={languageLabels.en}
      >
        <span aria-hidden="true">{languageFlags.en}</span>
      </button>
      <button
        className={`rounded-full px-2 py-1 transition-colors ${
          language === "tr"
            ? isDark
              ? "bg-white text-slate-950"
              : "bg-[#5C4A3A] text-[#F0E6D2]"
            : isDark
              ? "text-white/60 hover:text-white"
              : "text-[#5C4A3A] hover:text-[#3D2F1F]"
        }`}
        type="button"
        onClick={() => handleLanguageChange("tr")}
        aria-pressed={language === "tr"}
        aria-label={languageLabels.tr}
        title={languageLabels.tr}
      >
        <span aria-hidden="true">{languageFlags.tr}</span>
      </button>
      <button
        className={`rounded-full px-2 py-1 transition-colors ${
          language === "ru"
            ? isDark
              ? "bg-white text-slate-950"
              : "bg-[#5C4A3A] text-[#F0E6D2]"
            : isDark
              ? "text-white/60 hover:text-white"
              : "text-[#5C4A3A] hover:text-[#3D2F1F]"
        }`}
        type="button"
        onClick={() => handleLanguageChange("ru")}
        aria-pressed={language === "ru"}
        aria-label={languageLabels.ru}
        title={languageLabels.ru}
      >
        <span aria-hidden="true">{languageFlags.ru}</span>
      </button>
      <button
        className={`rounded-full px-2 py-1 transition-colors ${
          language === "de"
            ? isDark
              ? "bg-white text-slate-950"
              : "bg-[#5C4A3A] text-[#F0E6D2]"
            : isDark
              ? "text-white/60 hover:text-white"
              : "text-[#5C4A3A] hover:text-[#3D2F1F]"
        }`}
        type="button"
        onClick={() => handleLanguageChange("de")}
        aria-pressed={language === "de"}
        aria-label={languageLabels.de}
        title={languageLabels.de}
      >
        <span aria-hidden="true">{languageFlags.de}</span>
      </button>
    </div>
  );
}
