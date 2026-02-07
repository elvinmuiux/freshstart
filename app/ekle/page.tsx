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
  sortOrder?: number;
};

type PendingMenuItem = {
  tempId: string;
  sectionSlug: string;
  name: Partial<Record<LanguageKey, string>>;
  description: Partial<Record<LanguageKey, string>>;
  price: string;
  image: string;
  sortOrder?: number;
};

const adminLanguages: LanguageKey[] = ["tr", "en", "ru", "de"];

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
    const data = (await parseResponse<{ error?: string }>(response)) || {};
    return { items: [] as CustomMenuItem[], error: data.error };
  }
  const data = (await response.json()) as { items?: CustomMenuItem[] };
  return { items: Array.isArray(data.items) ? data.items : [], error: undefined };
};

const parseResponse = async <T,>(response: Response): Promise<T | null> => {
  try {
    return (await response.json()) as T;
  } catch (error) {
    return null;
  }
};

const getErrorMessage = (data: { error?: string } | null) => {
  if (data?.error) {
    return data.error;
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
  const data =
    (await parseResponse<{ url?: string; error?: string }>(response)) || {};
  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }
  if (!data.url) {
    throw new Error("Resim yüklenemedi. Lütfen tekrar deneyin.");
  }
  return data.url;
};

export default function AdminAddPage() {
  const [items, setItems] = useState<CustomMenuItem[]>([]);
  const [pendingItems, setPendingItems] = useState<PendingMenuItem[]>([]);
  const [sectionSlug, setSectionSlug] = useState("kahvalti");
  const [name, setName] = useState<Partial<Record<LanguageKey, string>>>({});
  const [description, setDescription] = useState<
    Partial<Record<LanguageKey, string>>
  >({});
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBulkSubmitting, setIsBulkSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [supabaseWarning, setSupabaseWarning] = useState<string | null>(null);

  useEffect(() => {
    fetchItems().then(({ items, error }) => {
      setItems(items);
      if (error) {
        setSupabaseWarning(error);
      }
    });
  }, []);

  const sectionImage = useMemo(() => {
    return menuSections.find((section) => section.slug === sectionSlug)?.image;
  }, [sectionSlug]);

  const buildPayload = async () => {
    const normalizedName = normalizeLocalizedInput(name);
    const normalizedDescription = normalizeLocalizedInput(description);
    const hasName = adminLanguages.some((lang) => !!normalizedName[lang]);
    if (!hasName || !price.trim()) {
      setFormError("Yemek adı ve fiyat alanları zorunludur.");
      return null;
    }
    const formattedPrice = price.includes("₺") ? price : `${price} ₺`;
    const parsedSortOrder = Number.parseInt(sortOrder || "0", 10);
    const resolvedImage =
      (await uploadImageIfNeeded(image.trim())) ||
      sectionImage ||
      "/menu/hero.png";
    return {
      sectionSlug,
      name: normalizedName,
      description: normalizedDescription,
      price: formattedPrice.trim(),
      image: resolvedImage,
      sortOrder: Number.isNaN(parsedSortOrder) ? 0 : parsedSortOrder,
    };
  };

  const submitNewItem = async (payload: {
    sectionSlug: string;
    name: Partial<Record<LanguageKey, string>>;
    description: Partial<Record<LanguageKey, string>>;
    price: string;
    image: string;
    sortOrder?: number;
  }) => {
    const response = await fetch("/api/menu-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data =
      (await parseResponse<{ item?: CustomMenuItem; error?: string }>(
        response
      )) || {};
    if (!response.ok || !data.item) {
      throw new Error(
        !response.ok
          ? getErrorMessage(data)
          : "Ekleme başarısız oldu. Lütfen tekrar deneyin."
      );
    }
    return data.item;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setIsSubmitting(true);
    try {
      const payload = await buildPayload();
      if (!payload) {
        setIsSubmitting(false);
        return;
      }
      if (editingId) {
        const response = await fetch("/api/menu-items", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingId,
            ...payload,
          }),
        });
        const data =
          (await parseResponse<{ item?: CustomMenuItem; error?: string }>(
            response
          )) || {};
        if (!response.ok) {
          setFormError(getErrorMessage(data));
          setIsSubmitting(false);
          return;
        }
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
        const item = await submitNewItem(payload);
        setItems((prev) => [item, ...prev]);
        setFormSuccess("Menü öğesi eklendi.");
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
    setSortOrder("0");
    setEditingId(null);
    setIsSubmitting(false);
  };

  const handleQueueAdd = async () => {
    if (editingId) {
      setFormError("Düzenleme modunda sıra ekleyemezsiniz.");
      return;
    }
    setFormError(null);
    setFormSuccess(null);
    setIsSubmitting(true);
    try {
      const payload = await buildPayload();
      if (!payload) {
        setIsSubmitting(false);
        return;
      }
      setPendingItems((prev) => [
        {
          tempId: crypto.randomUUID(),
          ...payload,
        },
        ...prev,
      ]);
      setFormSuccess("Ürün sıraya eklendi.");
      setName({});
      setDescription({});
      setPrice("");
      setImage("");
      setSortOrder("0");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkSubmit = async () => {
    if (pendingItems.length === 0) {
      return;
    }
    setFormError(null);
    setFormSuccess(null);
    setIsBulkSubmitting(true);
    try {
      const created: CustomMenuItem[] = [];
      for (const pending of pendingItems) {
        const item = await submitNewItem({
          sectionSlug: pending.sectionSlug,
          name: pending.name,
          description: pending.description,
          price: pending.price,
          image: pending.image,
        });
        created.push(item);
      }
      setItems((prev) => [...created, ...prev]);
      setPendingItems([]);
      setFormSuccess("Tüm ürünler eklendi.");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Toplu ekleme sırasında hata oluştu."
      );
    } finally {
      setIsBulkSubmitting(false);
    }
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
      setSortOrder("0");
    }
  };

  const handleEdit = (item: CustomMenuItem) => {
    setEditingId(item.id);
    setSectionSlug(item.sectionSlug);
    setName({
      tr: item.name?.tr ?? getFirstAvailable(item.name || {}, ""),
      en: item.name?.en ?? "",
      ru: item.name?.ru ?? "",
      de: item.name?.de ?? "",
    });
    setDescription({
      tr: item.description?.tr ?? getFirstAvailable(item.description || {}, ""),
      en: item.description?.en ?? "",
      ru: item.description?.ru ?? "",
      de: item.description?.de ?? "",
    });
    setPrice(item.price.replace("₺", "").trim());
    setImage(item.image);
    setSortOrder(String(item.sortOrder ?? 0));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName({});
    setDescription({});
    setPrice("");
    setImage("");
    setSortOrder("0");
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);
    setFormError(null);
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });
      const data =
        (await parseResponse<{ url?: string; error?: string }>(response)) || {};
      if (!response.ok) {
        throw new Error(getErrorMessage(data));
      }
      if (!data.url) {
        throw new Error("Resim yüklenemedi. Lütfen tekrar deneyin.");
      }
      setImage(data.url);
      URL.revokeObjectURL(previewUrl);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Resim yüklenemedi. Lütfen tekrar deneyin."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1113] text-white">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pb-12 pt-8">
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
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              window.location.href = "/admin/login";
            }}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/90 transition hover:bg-white/20"
          >
            Çıkış yap
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40"
        >
          {supabaseWarning && (
            <div className="rounded-2xl border border-amber-200/30 bg-amber-200/10 px-3 py-2 text-[11px] text-amber-100">
              {supabaseWarning} `.env` içinde `SUPABASE_URL` ve
              `SUPABASE_SERVICE_ROLE_KEY` değerlerini kontrol edin ve dev
              sunucuyu yeniden başlatın.
            </div>
          )}
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
                    ...name,
                    tr: event.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                placeholder="Örn: Granola Bowl"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                English
              </span>
              <input
                value={name.en || ""}
                onChange={(event) =>
                  setName({
                    ...name,
                    en: event.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                placeholder="e.g. Granola Bowl"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                Русский
              </span>
              <input
                value={name.ru || ""}
                onChange={(event) =>
                  setName({
                    ...name,
                    ru: event.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                placeholder="Напр: Granola Bowl"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                Deutsch
              </span>
              <input
                value={name.de || ""}
                onChange={(event) =>
                  setName({
                    ...name,
                    de: event.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                placeholder="z.B. Granola Bowl"
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
                    ...description,
                    tr: event.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                placeholder="Kısa açıklama"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                English
              </span>
              <input
                value={description.en || ""}
                onChange={(event) =>
                  setDescription({
                    ...description,
                    en: event.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                placeholder="Short description"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                Русский
              </span>
              <input
                value={description.ru || ""}
                onChange={(event) =>
                  setDescription({
                    ...description,
                    ru: event.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                placeholder="Короткое описание"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                Deutsch
              </span>
              <input
                value={description.de || ""}
                onChange={(event) =>
                  setDescription({
                    ...description,
                    de: event.target.value,
                  })
                }
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                placeholder="Kurze Beschreibung"
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

          <div className="space-y-2">
            <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200/70">
              Sıralama (0 = varsayılan)
            </label>
            <input
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
              placeholder="0"
            />
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
            disabled={isSubmitting || isUploading}
            className="w-full rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting || isUploading
              ? "Gönderiliyor..."
              : editingId
                ? "Kaydet"
                : "Ekle"}
          </button>
          {!editingId && (
            <button
              type="button"
              onClick={handleQueueAdd}
              disabled={isSubmitting || isUploading}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Sıraya ekle
            </button>
          )}
        </form>
        {pendingItems.length > 0 && (
          <section className="space-y-3 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
                Sıradaki ürünler ({pendingItems.length})
              </p>
              <button
                type="button"
                onClick={handleBulkSubmit}
                disabled={isBulkSubmitting}
                className="rounded-full bg-emerald-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isBulkSubmitting ? "Ekleniyor..." : "Hepsini Ekle"}
              </button>
            </div>
            <div className="space-y-2">
              {pendingItems.map((item) => (
                <div
                  key={item.tempId}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-3 py-3"
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
                      {item.price} · {item.sectionSlug} · {item.sortOrder ?? 0}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setPendingItems((prev) =>
                        prev.filter((entry) => entry.tempId !== item.tempId)
                      )
                    }
                    className="text-[11px] font-semibold text-rose-200/80"
                  >
                    Kaldır
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

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
                  {item.price} · {item.sortOrder ?? 0} ·{" "}
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
