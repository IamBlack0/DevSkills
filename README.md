# DevSkills

One command. Your AI agent skills and MCP servers, curated.

```
npx devskills
```

Browse and install a curated catalog of skills and MCP servers directly from your terminal. Skills install into your project and are read automatically by most AI agents. MCPs include their source repository so you can verify them before installing anything.

## How it works

1. Run `npx devskills` in any directory
2. Select **Skills** to browse by technology, or **MCPs** to discover agent tools
3. Install a skill → it lands in `.agents/skills/` (universal) and optionally in your specific agent's folder
4. Install an MCP → it writes the config directly to your client (Claude Code, Cursor, or Windsurf)

No config needed.

## Skills

| Technology | Available |
|------------|-----------|
| React | Composition Patterns, Best Practices |
| Next.js | Best Practices (Next.js 15+) |
| TypeScript | Advanced Types |
| Node.js | Backend Patterns, Best Practices |
| Python | Development Patterns |
| Claude Code | Agent Development, Frontend Design |

## MCPs

| Name | Description |
|------|-------------|
| Context7 | Up-to-date library docs inside your agent |
| Fetch | Fetch any URL as text or markdown |
| Filesystem | Controlled local filesystem access |
| GitHub | Interact with repos, issues, and PRs |
| Memory | Persistent memory via knowledge graph |
| Playwright | Browser automation for agents |

Everything in the catalog is free and open-source. No paid services, no mandatory API keys.

## Requirements

Node.js >= 18

## License

Apache 2.0
