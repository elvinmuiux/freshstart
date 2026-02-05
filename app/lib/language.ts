export const LANGUAGE_STORAGE_KEY = "freshstart.language";

export const languages = ["en", "tr", "ru", "de"] as const;

export type LanguageKey = (typeof languages)[number];

export const isLanguageKey = (value: string | null): value is LanguageKey =>
  !!value && (languages as readonly string[]).includes(value);
