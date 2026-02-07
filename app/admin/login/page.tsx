"use client";

import { useState } from "react";

type LoginResponse = {
  error?: string;
};

const parseResponse = async <T,>(response: Response): Promise<T | null> => {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
};

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await parseResponse<LoginResponse>(response)) || {};
      if (!response.ok) {
        throw new Error(data.error || "Giriş başarısız oldu.");
      }
      const params = new URLSearchParams(window.location.search);
      const nextPath = params.get("next") || "/ekle";
      window.location.href = nextPath;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Giriş başarısız oldu."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1113] text-white">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pb-12 pt-10">
        <header className="space-y-2 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-200/80">
            Admin
          </p>
          <h1 className="text-2xl font-semibold">Giriş</h1>
          <p className="text-[11px] text-slate-200/75">
            Menü yönetimi için giriş yapın.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40"
        >
          {error && (
            <div className="rounded-2xl border border-rose-200/30 bg-rose-200/10 px-3 py-2 text-[11px] text-rose-100">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200/70">
              Email
            </label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
              placeholder="admin@site.com"
              type="email"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200/70">
              Şifre
            </label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
              type="password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Giriş yapılıyor..." : "Giriş yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
