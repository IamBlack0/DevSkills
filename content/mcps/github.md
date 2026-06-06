---
title: "GitHub MCP"
description: "Interactúa con repositorios, issues, PRs y el API de GitHub directamente desde tu agente"
repo: "https://github.com/github/github-mcp-server"
url: "https://github.com/features/copilot"
clients: ["cursor", "claude-code", "vscode", "opencode"]
category: "devtools"
install: "npx @modelcontextprotocol/server-github"
author: "GitHub"
stars: 17000
---

## ¿Qué hace?

GitHub MCP conecta tu agente IA con la API de GitHub, permitiéndole leer y escribir en repositorios, gestionar issues y PRs, buscar código, y ejecutar workflows, todo desde la conversación.

Casos de uso principales:
- Revisar PRs y sugerir cambios directamente
- Crear issues desde una descripción de bug
- Buscar código en repositorios públicos
- Gestionar proyectos y milestones
- Disparar GitHub Actions desde el agente

## Instalación

### Claude Code

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx"
      }
    }
  }
}
```

Genera tu token en: https://github.com/settings/tokens (scopes: `repo`, `read:org`)

## Herramientas disponibles

| Herramienta | Descripción |
|------------|-------------|
| `list_repos` | Listar repositorios |
| `get_file_contents` | Leer archivos de un repo |
| `create_issue` | Crear un issue |
| `create_pull_request` | Crear un PR |
| `search_code` | Buscar código en GitHub |
| `list_commits` | Ver historial de commits |

## Compatibilidad

| Cliente | Estado |
|---------|--------|
| Claude Code | ✓ Soportado |
| Cursor | ✓ Soportado |
| VSCode Copilot | ✓ Soportado |
| OpenCode | ✓ Soportado |
