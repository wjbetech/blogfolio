import { render, cleanup } from "@testing-library/react";

import PostContent from "@/components/Blog/PostContent";

afterEach(cleanup);

function compiledMdx(markup: string) {
  return `
    return {
      default: function MDXContent({ components = {} }) {
        return React.createElement(React.Fragment, null, ${markup});
      }
    };
  `;
}

describe("PostContent", () => {
  it("renders Markdown lists and fenced code blocks", () => {
    const code = compiledMdx(`
      React.createElement(components.h2, null, "Overview"),
      React.createElement("ul", null,
        React.createElement("li", null, "First item"),
        React.createElement("li", null, "Second item")
      ),
      React.createElement("pre", null,
        React.createElement("code", null, "const answer = 42;")
      )
    `);

    const { container } = render(<PostContent code={code} />);

    expect(container.querySelector("ul")).not.toBeNull();
    expect(container.querySelectorAll("li")).toHaveLength(2);
    expect(container.querySelector("pre code")?.textContent).toContain("const answer = 42;");
    expect(container.querySelector('a[href="#overview"]')).not.toBeNull();
  });

  it("creates unique anchors for repeated headings", () => {
    const code = compiledMdx(`
      React.createElement(components.h2, null, "Overview"),
      React.createElement(components.h2, null, "Overview")
    `);

    const { container } = render(<PostContent code={code} />);

    expect(container.querySelector('a[href="#overview"]')).not.toBeNull();
    expect(container.querySelector('a[href="#overview-2"]')).not.toBeNull();
  });

  it("includes inline element text when creating heading anchors", () => {
    const code = compiledMdx(`
      React.createElement(components.h2, null,
        React.createElement("code", null, "Inline heading")
      )
    `);

    const { container } = render(<PostContent code={code} />);

    expect(container.querySelector('a[href="#inline-heading"]')).not.toBeNull();
  });

  it("maps a body # heading to a level-2 section heading", () => {
    const code = compiledMdx(`
      React.createElement(components.h1, null, "Top Level")
    `);

    const { container } = render(<PostContent code={code} />);

    const h2 = container.querySelector("h2");
    expect(h2).not.toBeNull();
    expect(container.querySelector('a[href="#top-level"]')).not.toBeNull();
  });

  it("preserves inline formatting inside heading markup", () => {
    const code = compiledMdx(`
      React.createElement(components.h2, null,
        React.createElement("em", null, "Emphasised Title")
      )
    `);

    const { container } = render(<PostContent code={code} />);

    const h2 = container.querySelector("h2 em");
    expect(h2).not.toBeNull();
    expect(h2?.textContent).toBe("Emphasised Title");
  });

  it("renders blockquotes and thematic-break dividers via the controlled map", () => {
    const code = compiledMdx(`
      React.createElement(components.blockquote, null, "A quoted line"),
      React.createElement(components.hr, null)
    `);

    const { container } = render(<PostContent code={code} />);

    const quote = container.querySelector("blockquote");
    expect(quote).not.toBeNull();
    expect(quote?.textContent).toBe("A quoted line");
    // B+C hybrid: hr renders as centered * * * divider (div with aria-hidden)
    expect(container.textContent).toContain("* * *");
    expect(container.querySelector('div[aria-hidden="true"]')).not.toBeNull();
  });

  it("distinguishes inline code from fenced code blocks", () => {
    const code = compiledMdx(`
      React.createElement(components.code, null, "inline token"),
      React.createElement(components.pre, null,
        React.createElement(components.code, { className: "language-ts" }, "const x = 1;")
      )
    `);

    const { container } = render(<PostContent code={code} />);

    const inline = container.querySelector("code");
    expect(inline?.className).toContain("bg-bg-200");

    const block = container.querySelector("pre code");
    expect(block?.className).not.toContain("bg-bg-200");
    expect(block?.className).toContain("language-ts");
  });

  it("renders a language-less fenced code block as a block inside pre", () => {
    const code = compiledMdx(`
      React.createElement(components.pre, null,
        React.createElement(components.code, null, "const y = 2;")
      )
    `);

    const { container } = render(<PostContent code={code} />);

    const block = container.querySelector("pre code");
    expect(block).not.toBeNull();
    expect(block?.textContent).toContain("const y = 2;");
  });

  it("renders links with the article link styling", () => {
    const code = compiledMdx(`
      React.createElement(components.a, { href: "https://example.com" }, "Visit")
    `);

    const { container } = render(<PostContent code={code} />);

    const link = container.querySelector("a[href='https://example.com']");
    expect(link).not.toBeNull();
    expect(link?.textContent).toBe("Visit");
  });
});
