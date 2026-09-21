import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ThemeAside from "@/components/ThemeSelector/ThemeAside/ThemeAside";

// Mock next/navigation usePathname used by Navbar
jest.mock("next/navigation", () => ({ usePathname: () => "/" }));

describe("Theme interaction", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    jest.clearAllMocks();
  });

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
      expect(document.documentElement.getAttribute("data-theme")).toBe("welcome");
      expect(localStorage.getItem("site:theme")).toBe("welcome");
    });
  });
});
