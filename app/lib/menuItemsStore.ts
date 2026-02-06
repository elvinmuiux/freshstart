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

// Use /tmp in serverless environments (AWS Lambda, Vercel, etc.) where /var/task is read-only
// Check if we're in a serverless environment by checking for common indicators
const isServerless =
  process.env.LAMBDA_TASK_ROOT ||
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.cwd().startsWith("/var/task");

// Cache the resolved data file path
let resolvedDataFile: string | null = null;

const getDataFile = async (): Promise<string> => {
  if (resolvedDataFile) {
    return resolvedDataFile;
  }

  // Try primary location first
  const primaryDir = isServerless
    ? path.join("/tmp", "data")
    : path.join(process.cwd(), "data");
  const primaryFile = path.join(primaryDir, "menu-items.json");

  try {
    await fs.mkdir(primaryDir, { recursive: true });
    resolvedDataFile = primaryFile;
    return primaryFile;
  } catch (error) {
    // If primary location fails (read-only), fallback to /tmp
    const errorCode =
      error instanceof Error && "code" in error ? (error.code as string) : null;
    if (errorCode === "EROFS") {
      const fallbackDir = path.join("/tmp", "data");
      const fallbackFile = path.join(fallbackDir, "menu-items.json");
      try {
        await fs.mkdir(fallbackDir, { recursive: true });
        resolvedDataFile = fallbackFile;
        return fallbackFile;
      } catch (fallbackError) {
        throw new Error(
          `Cannot write to filesystem. Tried ${primaryDir} and ${fallbackDir}. Error: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
    throw error;
  }
};

const ensureDataFile = async () => {
  const dataFile = await getDataFile();
  try {
    await fs.access(dataFile);
  } catch (error) {
    await fs.writeFile(dataFile, "[]", "utf8");
  }
};

const readAll = async (): Promise<StoredMenuItem[]> => {
  await ensureDataFile();
  const dataFile = await getDataFile();
  const raw = await fs.readFile(dataFile, "utf8");
  const data = JSON.parse(raw);
  return Array.isArray(data) ? (data as StoredMenuItem[]) : [];
};

const writeAll = async (items: StoredMenuItem[]) => {
  await ensureDataFile();
  const dataFile = await getDataFile();
  await fs.writeFile(dataFile, JSON.stringify(items, null, 2), "utf8");
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
