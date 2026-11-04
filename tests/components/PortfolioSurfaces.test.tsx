import React from "react";
import { render, screen, within } from "@testing-library/react";
import StudioHomepage from "@/components/HomeDesigns/StudioHomepage";
import SiteFrame from "@/components/SiteFrame/SiteFrame";
import AstutrPage from "@/app/dev/astutr/page";
import type { BlogCardData, ProjectCardData } from "@/lib/homeCards";

let mockPathname = "/dev/astutr";
jest.mock("next/navigation", () => ({ usePathname: () => mockPathname }));
jest.mock("next/image", () => ({ __esModule: true, default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} /> }));
jest.mock("@/components/ThemeSelector/ThemeAside/ThemeAside", () => ({ __esModule: true, default: () => <button>Theme settings</button> }));

const project = (slug: string): ProjectCardData => ({ slug, title: slug, description: "Project description", image: "", tech: [] });
const post = (n: number): BlogCardData => ({ slug: `post-${n}`, title: `Post ${n}`, publishedAt: "2026-06-01", homeBlurb: `Homepage blurb ${n}`, snippet: "Full excerpt", image: "", readingTime: 2, tags: [] });

it("prioritizes Wordweb, limits the project shelf to six, and uses dedicated homepage blurbs", () => {
  render(<StudioHomepage projects={[project("orbit"), project("wordweb"), ...[1,2,3,4,5,6].map(n => project(`project-${n}`))]} posts={[1,2,3,4].map(post)} />);
  const projects = screen.getByRole("region", { name: "Projects" });
  const links = within(projects).getAllByRole("link");
  expect(links).toHaveLength(7);
  expect(links[1]).toHaveAttribute("href", "/dev/wordweb");
  expect(screen.getByText("Explore meanings")).toBeVisible();
  expect(screen.getByText("Homepage blurb 3")).toBeVisible();
  expect(screen.queryByText("Homepage blurb 4")).not.toBeInTheDocument();
  expect(screen.queryByText("Full excerpt")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "View more articles" })).toHaveAttribute("href", "/blog");
  expect(screen.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "/contact");
});

it("handles an empty project shelf", () => {
  render(<StudioHomepage projects={[]} posts={[]} />);
  expect(screen.queryByRole("region", { name: "Projects" })).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("AI Engineer.");
});

it("falls back to the first available project when Wordweb is absent", () => {
  render(<StudioHomepage projects={[project("other")]} posts={[]} />);
  expect(screen.getByRole("link", { name: "other: Selected project" })).toHaveAttribute("href", "/dev/other");
});

it("marks Projects active on its detail pages and Home only at the root", () => {
  const { rerender } = render(<SiteFrame><p>Page content</p></SiteFrame>);
  expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");
  expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  expect(screen.getByRole("main")).toHaveTextContent("Page content");
  mockPathname = "/";
  rerender(<SiteFrame><p>Home content</p></SiteFrame>);
  expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
  expect(screen.getByRole("link", { name: "Projects" })).not.toHaveAttribute("aria-current");
});

it("provides the detailed work overview and a return route to Projects", () => {
  render(<AstutrPage />);
  expect(screen.getByRole("link", { name: "← Back to Projects" })).toHaveAttribute("href", "/dev");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Engineering at ASTUTR.");
  expect(screen.getByRole("heading", { name: "Clinical & patient data" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Applied AI" })).toBeVisible();
});
