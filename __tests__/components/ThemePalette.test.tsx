import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ThemeAside from "@/components/ThemeSelector/ThemeAside/ThemeAside";

// Mock applyTheme side-effect helpers
jest.mock("@/lib/applyTheme", () => ({
  setThemeAttribute: jest.fn(),
  removeThemeAttribute: jest.fn(),
  saveThemeId: jest.fn(),
  loadSavedThemeId: jest.fn(() => null)
}));

// Mock next/navigation usePathname used by Navbar
jest.mock("next/navigation", () => ({ usePathname: () => "/" }));

import * as lib from "@/lib/applyTheme";

describe("Theme interaction", () => {
  beforeEach(() => jest.clearAllMocks());

  it("applies theme when palette is clicked", async () => {
    render(<ThemeAside />);

    // open the drawer via the navbar theme button
    const themeToggle = screen.getByLabelText(/Theme settings/i);
    fireEvent.click(themeToggle);

    // wait for a palette title to appear (Welcome Theme exists in ColorThemes)
    const title = await screen.findByText("Welcome Theme");

    // the title's previous sibling is the palette button
    const paletteButton = title.previousElementSibling as HTMLButtonElement | null;
    expect(paletteButton).toBeTruthy();
    if (!paletteButton) return;

    fireEvent.click(paletteButton);

    await waitFor(() => {
      expect(lib.setThemeAttribute).toHaveBeenCalledWith("welcome");
      expect(lib.saveThemeId).toHaveBeenCalledWith("welcome");
    });
  });
});
