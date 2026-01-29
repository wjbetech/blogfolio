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
- Blog list/details will start with mocked data, later backed by MongoDB + API + Auth.

