# Tailwind + shadcn Design Notes

- shadcn preset provides component primitives and themes. Prefer shadcn components for UI consistency.
- Keep custom styles minimal; use Tailwind utilities and shadcn variants.
- Workflow:
  1. Use shadcn components for forms, buttons, dialogs.
  2. Add small utility classes in `src/styles/globals.css` if needed.
  3. Document any component variants in the file.
- Commands:
  - dev: `npm run dev`
  - build: `npm run build`

# Decisions

- Portfolio will be static - built with app routes and static content.
- Blog list/details are file-based via Contentlayer + Markdown (`content/posts`, `content/projects`) and rendered as static content.
- Any future admin/write workflow is optional and should be planned separately from the static public site architecture.
