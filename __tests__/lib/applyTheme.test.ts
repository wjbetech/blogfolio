import {
  loadSavedThemeId,
  removeThemeAttribute,
  saveThemeId,
  setThemeAttribute
} from "@/lib/applyTheme";

describe("setThemeAttribute", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("sets the data-theme attribute on the document root", () => {
    setThemeAttribute("midnight");

    expect(document.documentElement.getAttribute("data-theme")).toBe("midnight");
  });

  it("overwrites a previously applied theme", () => {
    setThemeAttribute("midnight");
    setThemeAttribute("ulduar");

    expect(document.documentElement.getAttribute("data-theme")).toBe("ulduar");
  });
});

describe("removeThemeAttribute", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("removes the data-theme attribute", () => {
    setThemeAttribute("midnight");

    removeThemeAttribute();

    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });
});

describe("saveThemeId", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("persists a theme id under the legacy site:theme key", () => {
    saveThemeId("kiln");

    expect(localStorage.getItem("site:theme")).toBe("kiln");
  });

  it("clears stored selection for null", () => {
    saveThemeId("kiln");

    saveThemeId(null);

    expect(localStorage.getItem("site:theme")).toBeNull();
  });
});

describe("loadSavedThemeId", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the saved theme id from localStorage", () => {
    localStorage.setItem("site:theme", "saved-theme");
    expect(loadSavedThemeId()).toBe("saved-theme");
  });

  it("returns null if no theme is saved", () => {
    expect(loadSavedThemeId()).toBeNull();
  });
});
