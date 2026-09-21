import { getTheme, getAllThemes, getThemeCss, buildThemeCss } from "@/lib/theme";
import { ColorThemes } from "@/lib/theme/palettes";

describe("Theme deep module — public seam", () => {
  it("getAllThemes returns all palettes without leaking mutation", () => {
    const all = getAllThemes();
    expect(all.length).toBe(ColorThemes.length);
    expect(all[0].id).toBe("welcome");
    // caller mutation must not affect implementation
    all.pop();
    expect(getAllThemes().length).toBe(ColorThemes.length);
  });

  it("getTheme returns the correct palette or undefined", () => {
    expect(getTheme("welcome")?.name).toBe("Welcome Theme");
    expect(getTheme("kiln")?.["bg-100"]).toBe("#2a2522");
    expect(getTheme("bogus-theme")).toBeUndefined();
  });

  it("getThemeCss generates one :root block plus one per theme", () => {
    const css = getThemeCss();
    expect(css).toMatch(/^\:root\{/);
    // each theme id appears as [data-theme="..."]
    for (const t of ColorThemes) {
      expect(css).toContain(`[data-theme="${t.id}"]`);
    }
    // verify fallback chain for palette-border is present
    expect(css).toContain("--palette-border:");
    expect(css).toContain("--link:");
  });

  it("buildThemeCss is a deprecated alias for getThemeCss", () => {
    expect(buildThemeCss()).toBe(getThemeCss());
  });

  it("getThemeCss mirrors welcome as :root fallback", () => {
    const css = getThemeCss();
    const welcome = ColorThemes.find((t) => t.id === "welcome")!;
    // :root should contain welcome's bg-100
    expect(css).toContain(`--bg-100:${welcome["bg-100"]}`);
  });
});
