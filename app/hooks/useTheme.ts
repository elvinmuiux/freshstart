"use client";

import { useEffect } from "react";
import type { ThemeKey } from "../lib/theme";

export const useTheme = () => {
  const theme: ThemeKey = "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  }, [theme]);

  const setTheme = () => {};
  return [theme, setTheme] as const;
};
