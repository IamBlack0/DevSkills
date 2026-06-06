# Contributing to DevSkills

First off, thank you for considering contributing to DevSkills. It's people like you that make open source such a great community.

## 1. Where do I go from here?

If you've noticed a bug or have a feature request, please open an issue on GitHub. It's the best way to get things started.

If you want to add a skill or an MCP to the catalog, you can do so directly with a Pull Request — no issue needed for straightforward additions.

## 2. Fork & create a branch

If this is something you think you can fix or add, fork DevSkills and create a branch with a descriptive name.

A good branch name would be (where issue #42 is the ticket you're working on):

```
git checkout -b 42-add-vue-composables-skill
```

Or for a general addition:

```
git checkout -b skill/vue-composables
git checkout -b mcp/supabase
git checkout -b fix/typo-in-readme
```

## 3. Implement your fix or feature

At this point, you're ready to make your changes. Feel free to ask for help on your PR if you get stuck.

**Adding a skill** — create a Markdown file in `content/skills/<technology>/` with this frontmatter:

```md
---
title: "Short, descriptive title"
description: "One sentence explaining what this skill covers"
tags: [tag1, tag2]
---

Content in Markdown.
```

**Adding an MCP** — create a Markdown file in `content/mcps/` with this frontmatter:

```md
---
title: "MCP Name"
description: "One sentence explaining what this MCP does"
repo: "https://github.com/author/repository"
url: "https://official-site.com"
clients: ["claude-code", "cursor", "vscode", "opencode"]
category: "testing"
install: "npx @package/mcp@latest"
author: "Author or company name"
stars: 0
---

Content explaining what it does and how to install it.
```

The `repo` field is required for MCPs and must point to a GitHub repository. The CI will reject entries missing this field.

## 4. Get the style right

Your patch should follow the same conventions as the rest of the project. Please ensure:

- Skill and MCP files use the exact frontmatter fields shown above.
- Content is written in English.
- Code examples inside skills are complete and runnable, not pseudocode.
- MCPs include installation instructions for at least one client.

## 5. Make a Pull Request

Switch back to your main branch and make sure it's up to date with the main repository:

```
git remote add upstream https://github.com/IamBlack0/devskills.git
git checkout main
git pull upstream main
```

Then update your feature branch from your local copy of main and push it:

```
git checkout 42-add-vue-composables-skill
git rebase main
git push --set-upstream origin 42-add-vue-composables-skill
```

Finally, go to GitHub and create a Pull Request on the main repository.

## 6. Keeping your Pull Request updated

If a maintainer asks you to rebase, they're saying that a lot of code has changed and that you need to update your branch so it can be merged cleanly into the main project.

Thank you for contributing.
