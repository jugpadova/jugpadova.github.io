export const searchOptions = {
  indexStrategy: "Prefix match",
  searchSanitiser: "Lower Case",
  indexBy: [
    "rawMarkdownBody",
    "excerpt",
    ["frontmatter", "title"],
    ["frontmatter", "author", "fullname"],
    ["frontmatter", "author", "email"],
    ["frontmatter", "categories", "name"],
    ["frontmatter", "tags", "name"],
  ],
  termFrequency: true,
  removeStopWords: true,
  stemWords: true,
}
