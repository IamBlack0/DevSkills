---
title: "Filesystem MCP"
description: "Acceso controlado al sistema de archivos local para leer, escribir y gestionar archivos"
repo: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem"
url: "https://modelcontextprotocol.io"
clients: ["cursor", "claude-code", "vscode", "opencode"]
category: "filesystem"
install: "npx @modelcontextprotocol/server-filesystem"
author: "Anthropic / MCP"
stars: 46000
---

## ¿Qué hace?

Filesystem MCP otorga a tu agente IA acceso controlado al sistema de archivos. Puedes especificar exactamente qué directorios son accesibles, manteniendo el control sobre qué puede leer o modificar el agente.

A diferencia del acceso directo a herramientas de shell, Filesystem MCP proporciona una capa de seguridad que limita el acceso solo a las rutas permitidas.

## Instalación

### Claude Code (solo lectura del proyecto actual)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/ruta/a/tu/proyecto"
      ]
    }
  }
}
```

### Con múltiples directorios

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/user/projects",
        "/home/user/documents"
      ]
    }
  }
}
```

## Herramientas disponibles

| Herramienta | Descripción |
|------------|-------------|
| `read_file` | Leer contenido de un archivo |
| `write_file` | Escribir/crear un archivo |
| `list_directory` | Listar contenido de un directorio |
| `create_directory` | Crear un directorio |
| `move_file` | Mover o renombrar archivo |
| `search_files` | Buscar archivos por patrón |
| `get_file_info` | Metadata de un archivo |

## Compatibilidad

| Cliente | Estado |
|---------|--------|
| Claude Code | ✓ Soportado |
| Cursor | ✓ Soportado |
| VSCode Copilot | ✓ Soportado |
| OpenCode | ✓ Soportado |
