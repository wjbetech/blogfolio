/**
 * Test-time stand-in for the Contentlayer-generated module.
 *
 * The real `contentlayer/generated` directory is produced at build time by
 * `npm run contentlayer:generate` and is gitignored. CI runs `npm test`
 * before `npm run build`, so the generated module does not exist when tests
 * run there.
 *
 * jest.config.js maps `contentlayer/generated` to this file so that runtime
 * imports of the module are always resolvable in tests. Tests that exercise
 * code which reads `allPosts`/`allProjects` at runtime should `jest.mock`
 * this module with fixture data instead of relying on generated content.
 *
 * Type-only imports (`import type { Post } from "contentlayer/generated"`)
 * are erased at runtime and are unaffected by this mapping.
 */
export const allPosts = [];
export const allProjects = [];
