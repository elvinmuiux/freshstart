"use client";

import { useEffect, useState } from "react";
import {
  LANGUAGE_STORAGE_KEY,
  type LanguageKey,
  isLanguageKey,
} from "../lib/language";

export const useLanguage = () => {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguageKey(stored)) {
      setLanguage(stored);
    }
    setReady(true);

    const handleLanguageChange = () => {
      const next = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (isLanguageKey(next)) {
        setLanguage(next);
      }
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === LANGUAGE_STORAGE_KEY) {
        handleLanguageChange();
      }
    };
    window.addEventListener("languagechange", handleLanguageChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
    window.dispatchEvent(new Event("languagechange"));
  }, [language, ready]);

  return [language, setLanguage] as const;
};
