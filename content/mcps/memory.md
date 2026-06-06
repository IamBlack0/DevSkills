---
title: "Memory MCP"
description: "Memoria persistente para tu agente IA basada en un knowledge graph local"
repo: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory"
url: "https://modelcontextprotocol.io"
clients: ["cursor", "claude-code", "vscode", "opencode"]
category: "memory"
install: "npx @modelcontextprotocol/server-memory"
author: "Anthropic / MCP"
stars: 46000
---

## ¿Qué hace?

Memory MCP da a tu agente IA memoria persistente entre conversaciones. Almacena entidades, relaciones y observaciones en un knowledge graph local (un archivo JSON en tu máquina). El agente puede guardar y recuperar información sobre personas, proyectos, preferencias y cualquier cosa que quieras que recuerde.

A diferencia de las notas en el sistema de prompts, Memory MCP permite una memoria estructurada y consultable que persiste entre sesiones.

## Instalación

### Claude Code

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

El knowledge graph se guarda en `~/.mcp-memory/memory.json` por defecto.

## Herramientas disponibles

| Herramienta | Descripción |
|------------|-------------|
| `create_entities` | Crear nuevas entidades en el grafo |
| `create_relations` | Establecer relaciones entre entidades |
| `add_observations` | Añadir observaciones a entidades existentes |
| `search_nodes` | Buscar entidades por texto |
| `open_nodes` | Obtener detalles de entidades específicas |
| `delete_entities` | Eliminar entidades del grafo |

## Ejemplo de uso

```
Usuario: Recuerda que el proyecto X usa PostgreSQL 16 y está en producción en AWS us-east-1.

Agente: [Guarda entidad "Proyecto X" con observaciones sobre la base de datos y el entorno]

-- En otra conversación --

Usuario: ¿Qué base de datos usa el proyecto X?

Agente: [Consulta el knowledge graph] El proyecto X usa PostgreSQL 16 en producción en AWS us-east-1.
```

## Compatibilidad

| Cliente | Estado |
|---------|--------|
| Claude Code | ✓ Soportado |
| Cursor | ✓ Soportado |
| VSCode Copilot | ✓ Soportado |
| OpenCode | ✓ Soportado |
