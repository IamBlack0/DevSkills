# DevSkills Catalog

This directory contains the curated catalog of skills and MCPs served by the DevSkills CLI and web interface.

All content comes from official or well-maintained open-source repositories. No skill or MCP is invented — each one links to its source.

---

## Skills

Skills are agent instructions in Markdown format. When installed, they live in `.agents/skills/` (universal) or in client-specific folders (`.claude/skills/`, `.cline/skills/`, etc.). Your AI agent reads them automatically.

### react

Skills for React applications, maintained by Vercel Engineering.

| File | Title | Source |
|------|-------|--------|
| `react-best-practices.md` | React Best Practices | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) |
| `composition-patterns.md` | React Composition Patterns | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns) |

### nextjs

Skills for Next.js applications, maintained by Vercel.

| File | Title | Source |
|------|-------|--------|
| `next-best-practices.md` | Next.js Best Practices | [vercel-labs/next-skills](https://github.com/vercel-labs/next-skills/tree/main/skills/next-best-practices) |

### typescript

Skills for TypeScript development.

| File | Title | Source |
|------|-------|--------|
| `typescript-advanced-types.md` | TypeScript Advanced Types | [midudev/autoskills](https://github.com/midudev/autoskills/tree/main/packages/autoskills/skills-registry/typescript-advanced-types) |

### node

Skills for Node.js backend development.

| File | Title | Source |
|------|-------|--------|
| `nodejs-best-practices.md` | Node.js Best Practices | [midudev/autoskills](https://github.com/midudev/autoskills/tree/main/packages/autoskills/skills-registry/nodejs-best-practices) |
| `nodejs-backend-patterns.md` | Node.js Backend Patterns | [midudev/autoskills](https://github.com/midudev/autoskills/tree/main/packages/autoskills/skills-registry/nodejs-backend-patterns) |

### python

Skills for Python development.

| File | Title | Source |
|------|-------|--------|
| `python-patterns.md` | Python Development Patterns | [midudev/autoskills](https://github.com/midudev/autoskills/tree/main/packages/autoskills/skills-registry/python-patterns) |

### claude-code

Official skills from Anthropic for Claude Code agents and plugins.

| File | Title | Source |
|------|-------|--------|
| `frontend-design.md` | Frontend Design | [anthropics/claude-code](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design) |
| `agent-development.md` | Agent Development | [anthropics/claude-code](https://github.com/anthropics/claude-code/tree/main/plugins/plugin-dev) |

---

## MCPs

MCPs are references to external tools that extend what AI agents can do. Each entry includes the source repository so you can verify it before installing anything.

| File | Title | Repo |
|------|-------|------|
| `context7.md` | Context7 | [upstash/context7](https://github.com/upstash/context7) |
| `playwright.md` | Playwright MCP | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) |
| `github.md` | GitHub MCP | [github/github-mcp-server](https://github.com/github/github-mcp-server) |
| `filesystem.md` | Filesystem MCP | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) |
| `brave-search.md` | Brave Search MCP | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) |
| `memory.md` | Memory MCP | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) |

---

## Adding New Skills

To add a skill from an external repository:

```
npx devskills-cli add https://github.com/<owner>/<repo> --skill <skill-name>
```

To add a skill manually, create a `.md` file under the appropriate `skills/<tech>/` folder. The frontmatter must include `title` (or `name`) and `description`. The file will be installed as-is when selected from the CLI.

## Skill Format

```yaml
---
title: My Skill Title
name: my-skill-name
description: What this skill does and when to use it.
tags: [tag1, tag2]
source: https://github.com/owner/repo
license: MIT
---

# My Skill

(Content of the skill — instructions for the AI agent)
```

## MCP Format

```yaml
---
title: My MCP
description: What this MCP does.
repo: https://github.com/owner/repo
url: https://optional-website.com
clients: [claude-code, cursor, vscode]
category: productivity
install: npx my-mcp-server
author: Author Name
stars: 1200
---

(Additional description and configuration details)
```
