import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useTheme from "@/hooks/useThemeHook";
import * as lib from "@/lib/applyTheme";

// Mock applyTheme and loadSavedThemeId
jest.mock("@/lib/applyTheme", () => ({
  applyTheme: jest.fn(),
  loadSavedThemeId: jest.fn()
}));

function TestComponent() {
  const { theme, themeId, setThemeById, setTheme, clearTheme, themes } = useTheme();

  return (
    <div>
      <span data-testid="theme-id">{themeId ?? "null"}</span>
      <span data-testid="theme-name">{theme?.name ?? "null"}</span>
      <button onClick={() => setThemeById("kiln")}>set-kiln</button>
      <button onClick={() => setTheme(themes[0])}>set-first</button>
      <button onClick={() => clearTheme()}>clear</button>
    </div>
  );
}

describe("useTheme hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("applies saved theme on mount when present", async () => {
    (lib.loadSavedThemeId as jest.Mock).mockReturnValue("gnome");

    render(<TestComponent />);

    await waitFor(() => expect(screen.getByTestId("theme-id").textContent).toBe("gnome"));

    expect(lib.applyTheme).toHaveBeenCalledWith(expect.objectContaining({ id: "gnome" }));
  });

  it("setThemeById updates theme and calls applyTheme", async () => {
    (lib.loadSavedThemeId as jest.Mock).mockReturnValue(null);

    render(<TestComponent />);

    const btn = screen.getByText("set-kiln");
    fireEvent.click(btn);

    await waitFor(() => expect(lib.applyTheme).toHaveBeenCalled());
    expect(lib.applyTheme).toHaveBeenCalledWith(expect.objectContaining({ id: "kiln" }));
    await waitFor(() => expect(screen.getByTestId("theme-id").textContent).toBe("kiln"));
  });
});
