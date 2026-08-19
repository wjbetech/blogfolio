import { render } from "@testing-library/react";

import PostContent from "@/components/Blog/PostContent";

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
});
