---
title: "Context7 MCP"
description: "Documentación actualizada de cualquier librería directamente en el contexto de tu agente IA"
repo: "https://github.com/upstash/context7"
url: "https://context7.com"
clients: ["cursor", "claude-code", "vscode", "opencode"]
category: "documentation"
install: "npx -y @upstash/context7-mcp@latest"
author: "Upstash"
stars: 56900
---

## ¿Qué hace?

Context7 MCP resuelve uno de los problemas más comunes al trabajar con agentes IA: la documentación desactualizada. En lugar de que tu agente responda basándose en su conocimiento de entrenamiento (que puede tener meses o años de antigüedad), Context7 inyecta documentación real y actualizada directamente en el contexto.

Por ejemplo, si preguntas _"¿Cómo configuro autenticación en Next.js 15?"_, Context7 primero obtiene la documentación oficial más reciente de Next.js y luego la incluye en la respuesta del agente.

## Instalación

### Claude Code

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

### Cursor

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

## Uso

Una vez instalado, simplemente menciona `use context7` en tu prompt:

```
¿Cómo uso useFormState en React 19? use context7
```

El agente automáticamente consultará la documentación más reciente de React antes de responder.

## Compatibilidad

| Cliente | Estado |
|---------|--------|
| Claude Code | ✓ Soportado |
| Cursor | ✓ Soportado |
| VSCode Copilot | ✓ Soportado |
| OpenCode | ✓ Soportado |
