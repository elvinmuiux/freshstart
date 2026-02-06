import { promises as fs } from "fs";
import path from "path";
import type { LanguageKey } from "./language";

type StoredMenuItem = {
  id: string;
  sectionSlug: string;
  name: Partial<Record<LanguageKey, string>>;
  description: Partial<Record<LanguageKey, string>>;
  price: string;
  image: string;
  created_at: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "menu-items.json");

const ensureDataFile = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
};

const readAll = async (): Promise<StoredMenuItem[]> => {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const data = JSON.parse(raw);
  return Array.isArray(data) ? (data as StoredMenuItem[]) : [];
};

const writeAll = async (items: StoredMenuItem[]) => {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
};

export const listMenuItems = async () => {
  const items = await readAll();
  return items.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

export const addMenuItem = async (payload: Omit<StoredMenuItem, "id">) => {
  const items = await readAll();
  const item: StoredMenuItem = {
    id: crypto.randomUUID(),
    ...payload,
  };
  const next = [item, ...items];
  await writeAll(next);
  return item;
};

export const updateMenuItem = async (
  id: string,
  updates: Partial<Omit<StoredMenuItem, "id" | "created_at">>
) => {
  const items = await readAll();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const current = items[index];
  const updated = { ...current, ...updates };
  const next = [...items];
  next[index] = updated;
  await writeAll(next);
  return updated;
};

export const deleteMenuItem = async (id: string) => {
  const items = await readAll();
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) {
    return false;
  }
  await writeAll(next);
  return true;
};

export const clearMenuItems = async () => {
  await writeAll([]);
};
