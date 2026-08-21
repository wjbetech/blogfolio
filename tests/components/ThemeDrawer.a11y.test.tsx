import React from "react";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import ThemeDrawer from "@/components/ThemeSelector/ThemeDrawer/ThemeDrawer";

afterEach(() => {
  cleanup();
  // clean any leftover toggles
  const t = document.querySelector("button[aria-label='Theme settings']");
  if (t) t.remove();
});

test("ThemeDrawer provides dialog semantics and labelledby", () => {
  const { getByRole, getByText } = render(
    <ThemeDrawer open={true} onClose={() => {}} onSelect={() => {}} active={null} />
  );

  const dialog = getByRole("dialog");
  expect(dialog).toBeTruthy();
  expect(dialog).toHaveAttribute("aria-modal", "true");

  const title = getByText("Themes");
  expect(title).toBeTruthy();
  expect(title.id).toBe("theme-drawer-title");
});

test("ThemeDrawer calls onClose when Escape is pressed", () => {
  const onClose = jest.fn();
  render(<ThemeDrawer open={true} onClose={onClose} onSelect={() => {}} active={null} />);

  fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
  expect(onClose).toHaveBeenCalled();
});

test("ThemeDrawer focuses close button on open and returns focus to toggle on unmount", async () => {
  // add a toggle button to the document so return-focus can find it
  const toggle = document.createElement("button");
  toggle.setAttribute("aria-label", "Theme settings");
  document.body.appendChild(toggle);

  const { unmount, getByLabelText } = render(
    <ThemeDrawer open={true} onClose={() => {}} onSelect={() => {}} active={null} />
  );

  const closeBtn = getByLabelText("Close theme drawer");
  await waitFor(() => expect(document.activeElement).toBe(closeBtn));

  // unmount triggers cleanup which should return focus to toggle
  unmount();
  await waitFor(() => expect(document.activeElement).toBe(toggle));
});
