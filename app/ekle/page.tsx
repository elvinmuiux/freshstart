"use client";

import { useEffect, useMemo, useState } from "react";
import { menuSections } from "../menu/sections";
import { languages, type LanguageKey } from "../lib/language";

type CustomMenuItem = {
  id: string;
  sectionSlug: string;
  name: Partial<Record<LanguageKey, string>>;
  description: Partial<Record<LanguageKey, string>>;
  price: string;
  image: string;
};

const STORAGE_KEY = "freshstart.menuItems";

const adminLanguages: LanguageKey[] = ["tr"];

const normalizeLocalizedInput = (
  input: Partial<Record<LanguageKey, string>>
) => {
  const next: Partial<Record<LanguageKey, string>> = {};
  adminLanguages.forEach((lang) => {
    const value = input[lang]?.trim();
    if (value) {
      next[lang] = value;
    }
  });
  return next;
};

const getFirstAvailable = (
  input: Partial<Record<LanguageKey, string>>,
  fallback: string
) => {
  for (const lang of languages) {
    const value = input[lang];
    if (value) {
      return value;
    }
  }
  return fallback;
};

const loadItems = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }
  try {
    const parsed = JSON.parse(stored) as CustomMenuItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map((item) => {
      const name =
        typeof item.name === "string" ? { tr: item.name } : item.name || {};
      const description =
        typeof item.description === "string"
          ? { tr: item.description }
          : item.description || {};
      return {
        ...item,
        name,
        description,
      };
    });
  } catch {
    return [];
  }
};

export default function AdminAddPage() {
  const [items, setItems] = useState<CustomMenuItem[]>([]);
  const [sectionSlug, setSectionSlug] = useState("kahvalti");
  const [name, setName] = useState<Partial<Record<LanguageKey, string>>>({});
  const [description, setDescription] = useState<
    Partial<Record<LanguageKey, string>>
  >({});
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setItems(loadItems());
  }, []);

  const sectionImage = useMemo(() => {
    return menuSections.find((section) => section.slug === sectionSlug)?.image;
  }, [sectionSlug]);

  const saveItems = (nextItems: CustomMenuItem[]) => {
    setItems(nextItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedName = normalizeLocalizedInput(name);
    const normalizedDescription = normalizeLocalizedInput(description);
    const hasName = adminLanguages.some((lang) => !!normalizedName[lang]);
    if (!hasName || !price.trim()) {
      return;
    }
    const formattedPrice = price.includes("₺") ? price : `${price} ₺`;
    if (editingId) {
      const nextItems = items.map((item) =>
        item.id === editingId
          ? {
              ...item,
              sectionSlug,
              name: normalizedName,
              description: normalizedDescription,
              price: formattedPrice.trim(),
              image: image.trim() || sectionImage || "/menu/hero.png",
            }
          : item
      );
      saveItems(nextItems);
    } else {
      const newItem: CustomMenuItem = {
        id: `${Date.now()}`,
        sectionSlug,
        name: normalizedName,
        description: normalizedDescription,
        price: formattedPrice.trim(),
        image: image.trim() || sectionImage || "/menu/hero.png",
      };
      const nextItems = [newItem, ...items];
      saveItems(nextItems);
    }
    setName({});
    setDescription({});
    setPrice("");
    setImage("");
    setEditingId(null);
  };

  const handleRemove = (id: string) => {
    const nextItems = items.filter((item) => item.id !== id);
    saveItems(nextItems);
  };

  const handleClearAll = () => {
    saveItems([]);
    setEditingId(null);
    setName({});
    setDescription({});
    setPrice("");
    setImage("");
  };

  const handleEdit = (item: CustomMenuItem) => {
    setEditingId(item.id);
    setSectionSlug(item.sectionSlug);
    setName({
      tr: item.name?.tr ?? getFirstAvailable(item.name || {}, ""),
    });
    setDescription({
      tr: item.description?.tr ?? getFirstAvailable(item.description || {}, ""),
    });
    setPrice(item.price.replace("₺", "").trim());
    setImage(item.image);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName({});
    setDescription({});
    setPrice("");
    setImage("");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#0c1113] text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pb-12 pt-8">
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
            Admin
          </p>
          <h1 className="text-2xl font-semibold">Menü Ekle</h1>
          <p className="text-[11px] text-slate-200/75">
            Yeni yemek ekleyin ve menüde gösterin.
          </p>
          </div>
          <a
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
            href="/"
          >
            <span className="text-sm">←</span>
            Ana sayfa
          </a>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40"
        >
          {editingId && (
            <div className="rounded-2xl border border-amber-200/30 bg-amber-200/10 px-3 py-2 text-[11px] text-amber-100">
              Düzenleme modunda.
              <button
                type="button"
                onClick={handleCancelEdit}
                className="ml-2 text-[11px] font-semibold text-amber-100 underline"
              >
                İptal
              </button>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200/70">
              Bölüm
            </label>
            <select
              value={sectionSlug}
              onChange={(event) => setSectionSlug(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
            >
              {menuSections.map((section) => (
                <option key={section.slug} value={section.slug}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200/70">
              Yemek Adı
            </label>
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                Türkçe
              </span>
              <input
                value={name.tr || ""}
                onChange={(event) =>
                  setName({
                    tr: event.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                placeholder="Örn: Granola Bowl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200/70">
              Açıklama
            </label>
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                Türkçe
              </span>
              <input
                value={description.tr || ""}
                onChange={(event) =>
                  setDescription({
                    tr: event.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                placeholder="Kısa açıklama"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200/70">
                Fiyat (₺)
              </label>
              <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                placeholder="Örn: 180"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200/70">
                Görsel URL (opsiyonel)
              </label>
              <input
                value={image}
                onChange={(event) => setImage(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                placeholder="/menu/hero.png"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-xs font-semibold text-white/90">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              Resim yükle
            </label>
            {image && (
              <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <img
                  src={image}
                  alt="Önizleme"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400"
          >
            {editingId ? "Kaydet" : "Ekle"}
          </button>
        </form>

        <section className="space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
            Son eklenenler
          </p>
          {items.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="w-full rounded-2xl border border-rose-200/30 bg-rose-200/10 px-4 py-2 text-[11px] font-semibold text-rose-200/90"
            >
              Tüm eklenenleri sil
            </button>
          )}
          {items.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[11px] text-slate-200/70">
              Henüz eklenen yemek yok.
            </div>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
            >
              <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-black/40">
                <img
                  src={item.image}
                    alt={getFirstAvailable(item.name, "Menu")}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">
                    {getFirstAvailable(item.name, "—")}
                </p>
                <p className="text-[11px] text-slate-200/70">
                  {item.price} ·{" "}
                    {getFirstAvailable(item.description, "Açıklama yok")}
                </p>
              </div>
              <div className="flex flex-col gap-2 text-right">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="text-[11px] font-semibold text-emerald-200/80"
                >
                  Düzenle
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="text-[11px] font-semibold text-rose-200/80"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
