// Deprecated re-export — deep Theme module lives at src/lib/theme/
// This file remains for backward compat; new code should import from "@/lib/theme".
export { setThemeAttribute, removeThemeAttribute } from "./theme/dom";
export { saveThemeId, loadSavedThemeId, STORAGE_KEY } from "./theme/storage";
export { THEME_ATTRIBUTE } from "./theme/dom";
