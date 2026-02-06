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

const fetchItems = async () => {
  const response = await fetch("/api/menu-items", { cache: "no-store" });
  if (!response.ok) {
    return [];
  }
  const data = (await response.json()) as { items?: CustomMenuItem[] };
  return Array.isArray(data.items) ? data.items : [];
};

const getErrorMessage = async (response: Response) => {
  try {
    const data = (await response.json()) as { error?: string };
    if (data?.error) {
      return data.error;
    }
  } catch (error) {
    // ignore parse errors
  }
  return "Bir hata oluştu. Lütfen tekrar deneyin.";
};

const uploadImageIfNeeded = async (imageValue: string) => {
  if (!imageValue.startsWith("data:image")) {
    return imageValue;
  }
  const response = await fetch("/api/uploads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dataUrl: imageValue }),
  });
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
  const data = (await response.json()) as { url?: string };
  if (!data.url) {
    throw new Error("Resim yüklenemedi. Lütfen tekrar deneyin.");
  }
  return data.url;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const sectionImage = useMemo(() => {
    return menuSections.find((section) => section.slug === sectionSlug)?.image;
  }, [sectionSlug]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setIsSubmitting(true);
    const normalizedName = normalizeLocalizedInput(name);
    const normalizedDescription = normalizeLocalizedInput(description);
    const hasName = adminLanguages.some((lang) => !!normalizedName[lang]);
    if (!hasName || !price.trim()) {
      setFormError("Yemek adı ve fiyat alanları zorunludur.");
      setIsSubmitting(false);
      return;
    }
    try {
      const formattedPrice = price.includes("₺") ? price : `${price} ₺`;
      const resolvedImage =
        (await uploadImageIfNeeded(image.trim())) ||
        sectionImage ||
        "/menu/hero.png";
      if (editingId) {
        const response = await fetch("/api/menu-items", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            sectionSlug,
            name: normalizedName,
            description: normalizedDescription,
            price: formattedPrice.trim(),
            image: resolvedImage,
          }),
        });
        if (!response.ok) {
          setFormError(await getErrorMessage(response));
          setIsSubmitting(false);
          return;
        }
        const data = (await response.json()) as { item?: CustomMenuItem };
        if (data.item) {
          setItems((prev) =>
            prev.map((item) => (item.id === editingId ? data.item! : item))
          );
          setFormSuccess("Menü öğesi güncellendi.");
        } else {
          setFormError("Güncelleme başarısız oldu. Lütfen tekrar deneyin.");
          setIsSubmitting(false);
          return;
        }
      } else {
        const response = await fetch("/api/menu-items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sectionSlug,
            name: normalizedName,
            description: normalizedDescription,
            price: formattedPrice.trim(),
            image: resolvedImage,
          }),
        });
        if (!response.ok) {
          setFormError(await getErrorMessage(response));
          setIsSubmitting(false);
          return;
        }
        const data = (await response.json()) as { item?: CustomMenuItem };
        if (data.item) {
          setItems((prev) => [data.item!, ...prev]);
          setFormSuccess("Menü öğesi eklendi.");
        } else {
          setFormError("Ekleme başarısız oldu. Lütfen tekrar deneyin.");
          setIsSubmitting(false);
          return;
        }
      }
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Bir hata oluştu. Lütfen tekrar deneyin."
      );
      setIsSubmitting(false);
      return;
    }
    setName({});
    setDescription({});
    setPrice("");
    setImage("");
    setEditingId(null);
    setIsSubmitting(false);
  };

  const handleRemove = async (id: string) => {
    const response = await fetch(`/api/menu-items?id=${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleClearAll = async () => {
    const response = await fetch("/api/menu-items?all=1", {
      method: "DELETE",
    });
    if (response.ok) {
      setItems([]);
      setEditingId(null);
      setName({});
      setDescription({});
      setPrice("");
      setImage("");
    }
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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === "string") {
        const preview = reader.result;
        setImage(preview);
        setFormError(null);
        try {
          const uploadedUrl = await uploadImageIfNeeded(preview);
          setImage(uploadedUrl);
        } catch (error) {
          setFormError(
            error instanceof Error
              ? error.message
              : "Resim yüklenemedi. Lütfen tekrar deneyin."
          );
        }
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
          {formError && (
            <div className="rounded-2xl border border-rose-200/30 bg-rose-200/10 px-3 py-2 text-[11px] text-rose-100">
              {formError}
            </div>
          )}
          {formSuccess && (
            <div className="rounded-2xl border border-emerald-200/30 bg-emerald-200/10 px-3 py-2 text-[11px] text-emerald-100">
              {formSuccess}
            </div>
          )}
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
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Gönderiliyor..." : editingId ? "Kaydet" : "Ekle"}
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
