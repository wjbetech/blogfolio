// Interior adapter for theme DOM. The attribute name lives here — callers
// never need to know it.
export const THEME_ATTRIBUTE = "data-theme";

export function setThemeAttribute(id: string): void {
  try {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, id);
  } catch (error) {
    console.error("setThemeAttribute error", error);
  }
}

export function removeThemeAttribute(): void {
  try {
    document.documentElement.removeAttribute(THEME_ATTRIBUTE);
  } catch (error) {
    console.error("removeThemeAttribute error", error);
  }
}

// Interior seam for tests / future adapters.
export type DomAdapter = {
  set(id: string): void;
  remove(): void;
  get(): string | null;
};

export function createMemoryDom(initial: string | null = null): DomAdapter {
  let value = initial;
  return {
    set: (id) => {
      value = id;
    },
    remove: () => {
      value = null;
    },
    get: () => value
  };
}
