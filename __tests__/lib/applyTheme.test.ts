import { applyTheme, loadSavedThemeId } from "@/lib/applyTheme";
import { ColorTheme } from "@/app/types/themes";

describe("applyTheme", () => {
  let mockRoot: HTMLElement;

  beforeEach(() => {
    mockRoot = document.documentElement;
    mockRoot.style.cssText = "";
    localStorage.clear();
    document.cookie = "site-theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });

  const mockTheme: ColorTheme = {
    id: "test-theme",
    name: "Test Theme",
    "bg-100": "#ffffff",
    "bg-200": "#f0f0f0",
    "bg-300": "#e0e0e0",
    headline: "#000000",
    paragraph: "#333333",
    button: "#0066cc",
    buttonText: "#ffffff",
    link: "#0066cc",
    "accent-100": "#ff6600",
    "accent-200": "#ff9933",
    "accent-300": "#ffcc66"
  };

  it("should set CSS custom properties on document root", () => {
    applyTheme(mockTheme);

    expect(mockRoot.style.getPropertyValue("--bg-100")).toBe("#ffffff");
    expect(mockRoot.style.getPropertyValue("--bg-200")).toBe("#f0f0f0");
    expect(mockRoot.style.getPropertyValue("--bg-300")).toBe("#e0e0e0");
    expect(mockRoot.style.getPropertyValue("--headline")).toBe("#000000");
    expect(mockRoot.style.getPropertyValue("--paragraph")).toBe("#333333");
    expect(mockRoot.style.getPropertyValue("--button")).toBe("#0066cc");
    expect(mockRoot.style.getPropertyValue("--buttonText")).toBe("#ffffff");
  });

  it("should set accent CSS variables", () => {
    applyTheme(mockTheme);

    expect(mockRoot.style.getPropertyValue("--accent-100")).toBe("#ff6600");
    expect(mockRoot.style.getPropertyValue("--accent-200")).toBe("#ff9933");
    expect(mockRoot.style.getPropertyValue("--accent-300")).toBe("#ffcc66");
  });

  it("should set link color from theme.link", () => {
    applyTheme(mockTheme);
    expect(mockRoot.style.getPropertyValue("--link")).toBe("#0066cc");
  });

  it("should fallback link color to headline if theme.link is undefined", () => {
    const themeWithoutLink = { ...mockTheme };
    delete themeWithoutLink.link;

    applyTheme(themeWithoutLink);
    expect(mockRoot.style.getPropertyValue("--link")).toBe("#000000");
  });

  it("should persist theme id to localStorage", () => {
    applyTheme(mockTheme);
    expect(localStorage.getItem("site:theme")).toBe("test-theme");
  });

  it("should persist theme id to cookie", () => {
    applyTheme(mockTheme);
    expect(document.cookie).toContain("site-theme=test-theme");
  });
});

describe("loadSavedThemeId", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return theme id from localStorage", () => {
    localStorage.setItem("site:theme", "saved-theme");
    expect(loadSavedThemeId()).toBe("saved-theme");
  });

  it("should return null if no theme is saved", () => {
    expect(loadSavedThemeId()).toBeNull();
  });
});
