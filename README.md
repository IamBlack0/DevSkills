# DevSkills

A curated catalog of agent skills and MCP servers for developers. Browse from your terminal or from the web at [IamBlack0.github.io/devskills](https://IamBlack0.github.io/devskills).

A **skill** is a code pattern, prompt, or technique you can copy directly into your project or agent context. An **MCP** is a reference to an external tool that extends what your AI agent can do — each one links to its source repository so you can verify it before installing anything.

The entire catalog is free and open-source. No paid MCPs, no mandatory API keys.

## Terminal

```
npx devskills
```

Navigate with arrow keys. Select a technology, select a skill, and install it directly into your project. Skills are always installed to `.agents/skills/` (read automatically by most AI agents). You can also install to specific clients: Claude Code, Cursor, Roo Code, Cline, Continue, Junie, Kiro, or GitHub Copilot.

To install a skill from any GitHub repository:

```
npx devskills add https://github.com/<owner>/<repo> --skill <name>
```

To install MCPs directly into your AI client, select any MCP and choose "Install MCP". Supports Claude Code (project or global), Cursor, and Windsurf.

No internet connection required for the local catalog. The `add` command does require a connection.

## Web

Browse the full catalog at [IamBlack0.github.io/devskills](https://IamBlack0.github.io/devskills). The interface mirrors a code editor — file tree on the left, content on the right, search palette with `Ctrl+K`. Every MCP shows its source repository prominently.

## Catalog

**Available skills:**

| Technology | Skills |
|------------|--------|
| React | Composition Patterns, Best Practices (Vercel) |
| Next.js | Best Practices (Next.js 15+) |
| TypeScript | Advanced Types |
| Node.js | Backend Patterns, Best Practices |
| Python | Development Patterns |
| Claude Code | Agent Development, Frontend Design |

**Available MCPs:**

| MCP | Repo | Description |
|-----|------|-------------|
| Context7 | [upstash/context7](https://github.com/upstash/context7) | Up-to-date library docs inside your agent |
| Fetch | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | Fetch any URL as text or markdown |
| Filesystem | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | Controlled local filesystem access |
| GitHub | [github/github-mcp-server](https://github.com/github/github-mcp-server) | Interact with repos, issues, and PRs |
| Memory | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | Persistent memory via knowledge graph |
| Playwright | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | Browser automation for agents |

See [content/README.md](./content/README.md) for the full catalog with source links.

## License

Apache License 2.0. Free to use in any project, including commercial. See the [LICENSE](./LICENSE) file.
