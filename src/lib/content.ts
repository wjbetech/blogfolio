type PublishableContent = {
  status: string;
};

export function isPublishedContent(content: PublishableContent) {
  return content.status.trim() === "published";
}

export function filterPublishedContent<T extends PublishableContent>(items: readonly T[]) {
  return items.filter(isPublishedContent);
}

export function getPublishedPosts<T extends PublishableContent>(posts: readonly T[]) {
  return filterPublishedContent(posts);
}

export function getPublishedProjects<T extends PublishableContent>(projects: readonly T[]) {
  return filterPublishedContent(projects);
}
