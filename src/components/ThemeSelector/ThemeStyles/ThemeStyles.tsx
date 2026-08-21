import { buildThemeCss } from "@/lib/themeStyles";

/**
 * Server-rendered stylesheet containing every theme as a [data-theme] block,
 * generated from themes.ts. Rendered at the top of <body> so the CSS is
 * parsed before any content paints; the pre-paint script flips the attribute
 * before this point, so the saved theme applies with no flash.
 */
export default function ThemeStyles() {
  return (
    <style
      data-theme-styles=""
      dangerouslySetInnerHTML={{ __html: buildThemeCss() }}
    />
  );
}
