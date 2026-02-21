import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeDrawer from "@/components/ThemeSelector/ThemeDrawer/ThemeDrawer";

jest.mock("@/lib/applyTheme", () => ({
  applyTheme: jest.fn(),
  loadSavedThemeId: jest.fn(() => null)
}));

// Mock framer-motion to render children synchronously in tests
jest.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  motion: { div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div> }
}));

// Mock the internal carousel component to avoid DOM scroll behaviors in tests
const mockScrollToActive = jest.fn();
jest.mock("@/components/ThemeSelector/ThemeCarousel/ThemeDrawerCarousel", () => {
  const React = require("react");
  return React.forwardRef((props: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({
      scrollLeft: jest.fn(),
      scrollRight: jest.fn(),
      scrollToActive: mockScrollToActive
    }));
    return <div data-testid="theme-drawer-carousel">mock-carousel</div>;
  });
});

// Mock the UpArrowIcon to a simple element
jest.mock("@/components/Icons/UpArrowIcon", () => {
  return function DummyUpArrow() {
    return <span>^</span>;
  };
});

describe("ThemeDrawer", () => {
  const mockOnClose = jest.fn();
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render when open", () => {
    render(<ThemeDrawer open={true} onClose={mockOnClose} onSelect={mockOnSelect} active={null} />);

    expect(screen.getByText("Themes")).toBeInTheDocument();
  });

  it("should not render when closed", () => {
    render(<ThemeDrawer open={false} onClose={mockOnClose} onSelect={mockOnSelect} active={null} />);

    expect(screen.queryByText("Themes")).not.toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    render(<ThemeDrawer open={true} onClose={mockOnClose} onSelect={mockOnSelect} active={null} />);

    const closeButton = screen.getByLabelText(/close/i);
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should render the theme carousel when open", () => {
    render(<ThemeDrawer open={true} onClose={mockOnClose} onSelect={mockOnSelect} active={null} />);

    // Verify the mocked carousel is rendered
    expect(screen.getByTestId("theme-drawer-carousel")).toBeInTheDocument();
  });

  it("calls scrollToActive when opened with an active palette", () => {
    jest.useFakeTimers();

    render(<ThemeDrawer open={true} onClose={mockOnClose} onSelect={mockOnSelect} active="welcome" />);

    // advance timers to let the setTimeout in the drawer run
    jest.advanceTimersByTime(100);

    expect(mockScrollToActive).toHaveBeenCalled();

    jest.useRealTimers();
  });
});
