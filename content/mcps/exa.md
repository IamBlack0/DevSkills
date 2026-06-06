---
hidden: true
title: "Exa MCP"
description: "Búsqueda web semántica de alta calidad optimizada para agentes IA"
repo: "https://github.com/exa-labs/exa-mcp-server"
url: "https://exa.ai"
clients: ["cursor", "claude-code", "vscode", "opencode"]
category: "search"
install: "npx exa-mcp-server"
author: "Exa Labs"
stars: 2500
---

## ¿Qué hace?

Exa MCP conecta tu agente IA con Exa, un motor de búsqueda diseñado específicamente para búsquedas semánticas de alta calidad. A diferencia de Google o Bing, Exa devuelve resultados relevantes para consultas técnicas complejas, ideal para investigación y desarrollo.

Casos de uso principales:

- Buscar documentación, librerías o herramientas nuevas
- Investigar competidores, papers o tendencias técnicas
- Verificar información reciente sobre APIs y frameworks
- Encontrar ejemplos de código en repositorios públicos

## Requisitos

Necesitas una API key gratuita de Exa:

1. Regístrate en https://exa.ai
2. El plan gratuito incluye 1.000 búsquedas al mes

## Instalación

### Claude Code

```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "tu-api-key"
      }
    }
  }
}
```

### Cursor

```json
{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "tu-api-key"
      }
    }
  }
}
```

## Herramientas disponibles

| Herramienta | Descripción |
|------------|-------------|
| `web_search` | Búsqueda semántica general |
| `find_similar` | Encontrar páginas similares a una URL |
| `get_contents` | Obtener el contenido completo de URLs |
| `search_and_contents` | Buscar y obtener contenido en un solo paso |

## Compatibilidad

| Cliente | Estado |
|---------|--------|
| Claude Code | ✓ Soportado |
| Cursor | ✓ Soportado |
| VSCode Copilot | ✓ Soportado |
| OpenCode | ✓ Soportado |
