import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import CurrentRoleCard from "@/app/dev/CurrentRoleCard";
import ProjectIndex from "@/app/dev/ProjectIndex";

describe("CurrentRoleCard", () => {
  it("expands and collapses the role responsibilities accessibly", () => {
    render(<CurrentRoleCard />);

    const toggle = screen.getByRole("button", { name: "Show role details" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Responsibilities")).toBeInTheDocument();

    fireEvent.click(toggle);

    expect(screen.getByRole("button", { name: "Hide role details" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Figma designs into polished, production-ready experiences/)).toBeInTheDocument();
    expect(screen.getByText(/Research and apply AI in day-to-day work/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Hide role details" }));
    expect(screen.getByRole("button", { name: "Show role details" })).toHaveAttribute("aria-expanded", "false");
  });
});

describe("ProjectIndex", () => {
  const originalIntersectionObserver = global.IntersectionObserver;
  let observerCallback: IntersectionObserverCallback | undefined;
  const observed: Element[] = [];

  beforeEach(() => {
    observerCallback = undefined;
    observed.length = 0;

    class MockIntersectionObserver {
      readonly root = null;
      readonly rootMargin = "";
      readonly thresholds: number[] = [];

      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }

      observe = (element: Element) => observed.push(element);
      unobserve = jest.fn();
      disconnect = jest.fn();
      takeRecords = () => [];
    }

    global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    global.IntersectionObserver = originalIntersectionObserver;
  });

  it("marks the visible project as current in the index", () => {
    const projects = [
      { slug: "orbit", title: "orbit." },
      { slug: "wordweb", title: "wordweb." }
    ];

    const { container } = render(
      <>
        <section id="orbit" />
        <section id="wordweb" />
        <ProjectIndex projects={projects} />
      </>
    );

    expect(observed).toEqual([container.querySelector("#orbit"), container.querySelector("#wordweb")]);
    expect(screen.getByRole("link", { name: /orbit\./ })).toHaveAttribute("aria-current", "location");

    const wordwebSection = container.querySelector("#wordweb") as HTMLElement;
    const entry = {
      isIntersecting: true,
      boundingClientRect: { top: 10 } as DOMRectReadOnly,
      target: wordwebSection
    } as unknown as IntersectionObserverEntry;
    act(() => {
      observerCallback?.([entry], {} as IntersectionObserver);
    });

    expect(screen.getByRole("link", { name: /wordweb\./ })).toHaveAttribute("aria-current", "location");
    expect(screen.getByRole("link", { name: /orbit\./ })).not.toHaveAttribute("aria-current");
  });

  it("renders an empty index without creating an observer", () => {
    render(<ProjectIndex projects={[]} />);

    expect(screen.getByRole("navigation", { name: "Project index" })).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(observerCallback).toBeUndefined();
  });
});
