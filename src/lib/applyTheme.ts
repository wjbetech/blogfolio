export function setThemeAttribute(id: string): void {
  try {
    document.documentElement.setAttribute("data-theme", id);
  } catch (error) {
    console.error("setThemeAttribute error", error);
  }
}

export function removeThemeAttribute(): void {
  try {
    document.documentElement.removeAttribute("data-theme");
  } catch (error) {
    console.error("removeThemeAttribute error", error);
  }
}

export function saveThemeId(id: string | null): void {
  try {
    if (id === null) {
      localStorage.removeItem("site:theme");
    } else {
      localStorage.setItem("site:theme", id);
    }
  } catch (error) {
    console.error("saveThemeId localStorage error", error);
  }
}

export function loadSavedThemeId(): string | null {
  try {
    return localStorage.getItem("site:theme");
  } catch {
    return null;
  }
}
