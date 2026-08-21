import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import useTheme from "@/hooks/useThemeHook";
import * as lib from "@/lib/applyTheme";

// Mock the DOM/storage side-effect helpers
jest.mock("@/lib/applyTheme", () => ({
  setThemeAttribute: jest.fn(),
  removeThemeAttribute: jest.fn(),
  saveThemeId: jest.fn(),
  loadSavedThemeId: jest.fn()
}));

function TestComponent() {
  const { theme, themeId, setThemeById, setTheme, clearTheme, themes } = useTheme();

  return (
    <div>
      <span data-testid="theme-id">{themeId ?? "null"}</span>
      <span data-testid="theme-name">{theme?.name ?? "null"}</span>
      <button onClick={() => setThemeById("kiln")}>set-kiln</button>
      <button onClick={() => setThemeById("bogus-theme")}>set-bogus</button>
      <button onClick={() => setTheme(themes[0])}>set-first</button>
      <button onClick={() => clearTheme()}>clear</button>
    </div>
  );
}

describe("useTheme hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("adopts a valid saved theme on mount and applies its attribute", async () => {
    (lib.loadSavedThemeId as jest.Mock).mockReturnValue("gnome");

    render(<TestComponent />);

    await waitFor(() => expect(screen.getByTestId("theme-id").textContent).toBe("gnome"));
    expect(lib.setThemeAttribute).toHaveBeenCalledWith("gnome");
    expect(lib.saveThemeId).toHaveBeenCalledWith("gnome");
  });

  it("ignores an invalid saved id and clears it", async () => {
    (lib.loadSavedThemeId as jest.Mock).mockReturnValue("deleted-theme");

    render(<TestComponent />);

    await waitFor(() => expect(lib.saveThemeId).toHaveBeenCalledWith(null));
    expect(screen.getByTestId("theme-id").textContent).toBe("welcome");
    expect(lib.setThemeAttribute).not.toHaveBeenCalledWith("deleted-theme");
  });

  it("setThemeById updates theme and applies the attribute", async () => {
    (lib.loadSavedThemeId as jest.Mock).mockReturnValue(null);

    render(<TestComponent />);

    fireEvent.click(screen.getByText("set-kiln"));

    await waitFor(() => expect(screen.getByTestId("theme-id").textContent).toBe("kiln"));
    expect(lib.setThemeAttribute).toHaveBeenCalledWith("kiln");
    expect(lib.saveThemeId).toHaveBeenCalledWith("kiln");
  });

  it("ignores unknown theme ids", async () => {
    (lib.loadSavedThemeId as jest.Mock).mockReturnValue(null);

    render(<TestComponent />);

    fireEvent.click(screen.getByText("set-bogus"));

    expect(screen.getByTestId("theme-id").textContent).toBe("welcome");
  });

  it("clearTheme reverts to the welcome default and clears storage", async () => {
    (lib.loadSavedThemeId as jest.Mock).mockReturnValue(null);

    render(<TestComponent />);

    fireEvent.click(screen.getByText("set-kiln"));
    await waitFor(() => expect(screen.getByTestId("theme-id").textContent).toBe("kiln"));

    fireEvent.click(screen.getByText("clear"));

    await waitFor(() => expect(screen.getByTestId("theme-id").textContent).toBe("welcome"));
    expect(lib.saveThemeId).toHaveBeenCalledWith("welcome");
    expect(lib.setThemeAttribute).toHaveBeenLastCalledWith("welcome");
  });
});
