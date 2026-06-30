---
hidden: true
title: "Brave Search MCP"
description: "Búsqueda web en tiempo real con resultados independientes y sin rastreo"
description_en: "Real-time web search with independent, privacy-focused results and no tracking"
repo: "https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search"
url: "https://search.brave.com"
clients: ["cursor", "claude-code", "vscode", "opencode"]
category: "search"
install: "npx @modelcontextprotocol/server-brave-search"
author: "Anthropic / MCP"
stars: 14200
---

## ¿Qué hace?

Brave Search MCP permite a tu agente IA hacer búsquedas reales en la web, obteniendo información actualizada sin depender de su conocimiento de entrenamiento. Usa el motor de búsqueda de Brave, que es independiente de Google y no rastrea usuarios.

Ideal para:
- Verificar información reciente (noticias, actualizaciones)
- Buscar documentación, paquetes o herramientas nuevas
- Investigar precios, disponibilidad o comparativas actualizadas

## Requisitos

Necesitas una API key de Brave Search (plan gratuito disponible):
https://brave.com/search/api/

## Instalación

### Claude Code

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "BSA_xxxxxxxxxxxx"
      }
    }
  }
}
```

## Herramientas disponibles

| Herramienta | Descripción |
|------------|-------------|
| `brave_web_search` | Búsqueda web general |
| `brave_local_search` | Búsqueda de negocios locales |

## Compatibilidad

| Cliente | Estado |
|---------|--------|
| Claude Code | ✓ Soportado |
| Cursor | ✓ Soportado |
| VSCode Copilot | ✓ Soportado |
| OpenCode | ✓ Soportado |

<!-- EN -->

## What does it do?

Brave Search MCP allows your AI agent to perform real web searches, fetching up-to-date information without relying on its training knowledge. It uses Brave's search engine, which is independent of Google and does not track users.

Ideal for:
- Verifying recent information (news, updates)
- Searching for documentation, packages, or new tools
- Researching up-to-date prices, availability, or comparisons

## Requirements

You need a Brave Search API key (free tier available):
https://brave.com/search/api/

## Installation

### Claude Code

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "BSA_xxxxxxxxxxxx"
      }
    }
  }
}
```

## Available tools

| Tool | Description |
|------|-------------|
| `brave_web_search` | General web search |
| `brave_local_search` | Local business search |
