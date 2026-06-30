---
title: "Playwright MCP"
description: "Automatización de navegadores para agentes IA — navega, hace clic, toma screenshots"
description_en: "Browser automation for AI agents — navigate, click elements, take screenshots"
repo: "https://github.com/microsoft/playwright-mcp"
url: "https://playwright.dev"
clients: ["cursor", "claude-code", "vscode", "opencode"]
category: "testing"
install: "npx @playwright/mcp@latest"
author: "Microsoft"
stars: 13000
---

## ¿Qué hace?

Playwright MCP permite que tu agente IA controle un navegador real. Puede navegar a URLs, hacer clic en elementos, rellenar formularios, tomar screenshots y extraer contenido de páginas web.

Casos de uso principales:
- Testing de aplicaciones web con instrucciones en lenguaje natural
- Scraping controlado con lógica compleja
- Automatización de tareas repetitivas en el navegador
- Verificación visual de cambios en la UI

## Instalación

### Claude Code

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

### Con navegador visible (modo headed)

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--headless=false"]
    }
  }
}
```

## Herramientas disponibles

| Herramienta | Descripción |
|------------|-------------|
| `browser_navigate` | Navegar a una URL |
| `browser_click` | Hacer clic en un elemento |
| `browser_type` | Escribir texto en un input |
| `browser_screenshot` | Capturar pantalla |
| `browser_evaluate` | Ejecutar JavaScript |
| `browser_get_text` | Extraer texto de la página |

## Compatibilidad

| Cliente | Estado |
|---------|--------|
| Claude Code | ✓ Soportado |
| Cursor | ✓ Soportado |
| VSCode Copilot | ✓ Soportado |
| OpenCode | ✓ Soportado |

<!-- EN -->

## What does it do?

Playwright MCP allows your AI agent to control a real browser. It can navigate to URLs, click elements, fill out forms, take screenshots, and extract content from web pages.

Main use cases:
- Testing web applications with natural language instructions
- Controlled scraping with complex logic
- Automation of repetitive browser tasks
- Visual verification of UI changes

## Installation

### Claude Code

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

### With visible browser (headed mode)

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--headless=false"]
    }
  }
}
```

## Compatibility

| Client | Status |
|--------|--------|
| Claude Code | ✓ Supported |
| Cursor | ✓ Supported |
