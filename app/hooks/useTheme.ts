"use client";

import { useEffect, useState } from "react";
import {
  THEME_STORAGE_KEY,
  type ThemeKey,
  isThemeKey,
} from "../lib/theme";

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeKey>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemeKey(stored)) {
      setTheme(stored);
    } else {
      // Sistem tercihini kontrol et
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
    setReady(true);

    const handleThemeChange = () => {
      const next = localStorage.getItem(THEME_STORAGE_KEY);
      if (isThemeKey(next)) {
        setTheme(next);
      }
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) {
        handleThemeChange();
      }
    };
    window.addEventListener("themechange", handleThemeChange);
    window.addEventListener("storage", handleStorage);
    
    // Sistem tema değişikliğini dinle
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      window.removeEventListener("themechange", handleThemeChange);
      window.removeEventListener("storage", handleStorage);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
    window.dispatchEvent(new Event("themechange"));
  }, [theme, ready]);

  return [theme, setTheme] as const;
};
