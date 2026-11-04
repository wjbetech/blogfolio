// Interior adapter for theme persistence. The storage key and localStorage
// access live here — one place to change the key or the backend.
export const STORAGE_KEY = "site:theme";

export function loadSavedThemeId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function saveThemeId(id: string | null): void {
  try {
    if (id === null) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, id);
    }
  } catch (error) {
    console.error("saveThemeId localStorage error", error);
  }
}

// Interior seam for tests: in-memory adapter behind the same interface.
// Not part of the public seam — tests can import directly.
export type StorageAdapter = {
  load(): string | null;
  save(id: string | null): void;
};

export function createMemoryStorage(initial: string | null = null): StorageAdapter {
  let value = initial;
  return {
    load: () => value,
    save: (id) => {
      value = id;
    }
  };
}
