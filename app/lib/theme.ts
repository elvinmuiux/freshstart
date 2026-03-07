export const THEME_STORAGE_KEY = "freshstart.theme";

export const themes = ["dark", "light"] as const;

export type ThemeKey = (typeof themes)[number];

export const isThemeKey = (value: string | null): value is ThemeKey =>
  !!value && (themes as readonly string[]).includes(value);
