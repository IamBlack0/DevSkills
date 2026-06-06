---
title: "Fetch MCP"
description: "Obtén el contenido de cualquier URL como texto o markdown directamente en tu agente"
repo: "https://github.com/modelcontextprotocol/servers"
url: "https://modelcontextprotocol.io"
clients: ["cursor", "claude-code", "vscode", "opencode"]
category: "web"
install: "npx @modelcontextprotocol/server-fetch"
author: "Anthropic / MCP"
stars: 46000
---

## ¿Qué hace?

Fetch MCP permite que tu agente IA descargue el contenido de cualquier URL y lo convierta
automáticamente a texto o markdown. Es ideal para leer documentación, páginas de referencia
o cualquier recurso web sin salir de la conversación.

Completamente gratuito — no necesita API key ni registro.

Casos de uso principales:

- Leer documentación oficial de una librería en tiempo real
- Obtener el contenido de un changelog o release notes
- Consultar una referencia de API directamente desde el agente
- Verificar el contenido de una página antes de procesar

## Instalación

### Claude Code

```json
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

### Cursor

```json
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

## Herramientas disponibles

| Herramienta | Descripción |
|------------|-------------|
| `fetch` | Descarga una URL y devuelve el contenido como texto o markdown |

## Opciones

| Opción | Descripción |
|--------|-------------|
| `url` | URL a descargar (requerido) |
| `max_length` | Máximo de caracteres a devolver (por defecto: 5000) |
| `start_index` | Posición desde donde empezar a leer |
| `raw` | Si es `true`, devuelve HTML crudo en lugar de markdown |

## Ejemplo de uso

```
Agente: [Llama a fetch con url="https://docs.astro.build/es/guides/..."]
Resultado: el contenido de la documentación de Astro como markdown limpio
```

## Compatibilidad

| Cliente | Estado |
|---------|--------|
| Claude Code | ✓ Soportado |
| Cursor | ✓ Soportado |
| VSCode Copilot | ✓ Soportado |
| OpenCode | ✓ Soportado |
