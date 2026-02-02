// canonical types
// Feature - a new user-visible piece of functionality
// Fix/Bug - a bug fix
// Improvement - enhancement to existing functionality
// Refactor - a code change where pieces of existing functionality are rewritten or restructured without changing its external behavior
// Chore - a change to the build process or auxiliary tools and libraries such as documentation generation
// Removed - a feature or functionality that has been removed
// Test - anything related to testing
// Style - changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
export type ChangeCategory = "Feature" | "Fix" | "Bug" | "Improvement" | "Chore" | "Removed" | "Test" | "Style";

export interface ChangelogEntry {
  date: string; // ISO 8601 date string
  version: string;
  changes: {
    category: ChangeCategory;
    description: string;
  }[];
}
