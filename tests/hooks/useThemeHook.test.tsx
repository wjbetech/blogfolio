import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useTheme } from "@/lib/theme";

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
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("adopts a valid saved theme on mount and applies its attribute", async () => {
    localStorage.setItem("site:theme", "gnome");

    render(<TestComponent />);

    await waitFor(() => expect(screen.getByTestId("theme-id").textContent).toBe("gnome"));
    expect(document.documentElement.getAttribute("data-theme")).toBe("gnome");
    expect(localStorage.getItem("site:theme")).toBe("gnome");
  });

  it("ignores an invalid saved id and clears it", async () => {
    localStorage.setItem("site:theme", "deleted-theme");

    render(<TestComponent />);

    await waitFor(() => expect(screen.getByTestId("theme-id").textContent).toBe("welcome"));
    // Invalid id is self-healed: storage no longer holds the deleted id
    expect(localStorage.getItem("site:theme")).not.toBe("deleted-theme");
    expect(document.documentElement.getAttribute("data-theme")).not.toBe("deleted-theme");
  });

  it("setThemeById updates theme and applies the attribute", async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText("set-kiln"));

    await waitFor(() => expect(screen.getByTestId("theme-id").textContent).toBe("kiln"));
    expect(document.documentElement.getAttribute("data-theme")).toBe("kiln");
    expect(localStorage.getItem("site:theme")).toBe("kiln");
  });

  it("ignores unknown theme ids", async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText("set-bogus"));

    expect(screen.getByTestId("theme-id").textContent).toBe("welcome");
  });

  it("clearTheme reverts to the welcome default and clears storage", async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText("set-kiln"));
    await waitFor(() => expect(screen.getByTestId("theme-id").textContent).toBe("kiln"));

    fireEvent.click(screen.getByText("clear"));

    await waitFor(() => expect(screen.getByTestId("theme-id").textContent).toBe("welcome"));
    expect(localStorage.getItem("site:theme")).toBe("welcome");
    expect(document.documentElement.getAttribute("data-theme")).toBe("welcome");
  });
});
