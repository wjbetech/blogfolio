// canonical types
// Feature - a new user-visible piece of functionality
// Bug - a bug fix
// Refactor - a code change where pieces of existing functionality are rewritten or restructured without changing its external behavior
// Chore - a change to the build process or auxiliary tools and libraries such as documentation generation
// Removed - a feature or functionality that has been removed
// Test - anything related to testing
// Style - changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)w
export type ChangelogCategory = "Feature" | "Bug" | "Chore" | "Removed" | "Test" | "Style";

// versioning follows semver.org and exists in /docs too
export interface ChangelogEntry {
  date: string; // ISO 8601 date string
  version: string;
  changes: {
    category: ChangelogCategory;
    description: string;
  }[];
}
