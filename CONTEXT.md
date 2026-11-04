# Blogfolio

Personal website for William East — blog, dev portfolio, and language-services presence. Content is authored as Markdown and compiled at build time via Contentlayer.

## Language

**Theme**:
A named palette of design tokens (bg/headline/paragraph/button/accent) applied via the `data-theme` attribute. Themes are the sole mechanism for visual variation; no ad-hoc colors are introduced where a token exists.
_Avoid_: Skin, color scheme

**Publication**:
The state that determines whether content is public. Only `published` posts and projects are rendered in indexes, navigation, RSS, sitemap, and JSON-LD; `draft` content is excluded centrally via the content seam.
_Avoid_: Published flag, visibility toggle
