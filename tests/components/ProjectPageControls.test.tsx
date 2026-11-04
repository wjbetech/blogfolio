import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import CurrentRoleCard from "@/app/dev/CurrentRoleCard";
import ProjectIndex from "@/app/dev/ProjectIndex";

describe("CurrentRoleCard", () => {
  it("shows responsibilities and links to the detailed work page", () => {
    render(<CurrentRoleCard />);
    expect(screen.getByRole("heading", { level: 1, name: /AI Engineer .* ASTUTR/ })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Software & data" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Infrastructure" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Applied AI" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Find Out More" })).toHaveAttribute("href", "/dev/astutr");
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
