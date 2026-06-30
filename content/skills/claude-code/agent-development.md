---
title: Agent Development
name: agent-development
description: Build autonomous agents for Claude Code plugins. Covers agent structure, system prompt design, triggering conditions, frontmatter fields, and best practices.
description_es: "Construye agentes autónomos para plugins de Claude Code. Cubre estructura del agente, diseño del system prompt, condiciones de activación y mejores prácticas."
tags: [claude-code, agents, plugins, autonomous, ai]
source: https://github.com/anthropics/claude-code/tree/main/plugins/plugin-dev
version: 0.1.0
---

# Agent Development for Claude Code Plugins

## Overview

Agents are autonomous subprocesses that handle complex, multi-step tasks independently. Understanding agent structure, triggering conditions, and system prompt design enables creating powerful autonomous capabilities.

Key concepts:
- Agents are FOR autonomous work; commands are FOR user-initiated actions
- Markdown file format with YAML frontmatter
- Triggering via description field with examples
- System prompt defines agent behavior
- Model and color customization

## Agent File Structure

```
---
name: agent-identifier
description: Use this agent when [triggering conditions]. Examples:
  <example>
  Context: [Situation description]
  user: "[User request]"
  assistant: "[How assistant responds]"
  <commentary>[Why this agent triggers]</commentary>
  </example>
model: inherit
color: blue
tools: ["Read", "Write", "Grep"]
---

You are [agent role]...

**Your Core Responsibilities:**
1. [Responsibility 1]
2. [Responsibility 2]
```

## Frontmatter Fields

### name (required)

Agent identifier. Format: lowercase, numbers, hyphens only. 3-50 characters. Must start and end with alphanumeric.

Good: `code-reviewer`, `test-generator`, `api-docs-writer`
Bad: `helper` (generic), `-agent-` (starts/ends with hyphen), `my_agent` (underscores)

### description (required)

Defines when Claude should trigger this agent. This is the most critical field.

Must include:
1. Triggering conditions ("Use this agent when...")
2. Multiple example blocks showing usage
3. Context, user request, and assistant response in each example
4. Commentary explaining why agent triggers

Include 2-4 concrete examples. Show proactive and reactive triggering. Cover different phrasings of the same intent.

### model (required)

- `inherit` — Use same model as parent (recommended)
- `sonnet` — Claude Sonnet (balanced)
- `opus` — Claude Opus (most capable)
- `haiku` — Claude Haiku (fast, cheap)

### color (required)

Visual identifier: `blue`, `cyan`, `green`, `yellow`, `magenta`, `red`

Guidelines:
- Blue/cyan: Analysis, review
- Green: Success-oriented tasks
- Yellow: Caution, validation
- Red: Critical, security
- Magenta: Creative, generation

### tools (optional)

Restrict agent to specific tools. Default: access to all tools.

Common sets:
- Read-only analysis: `["Read", "Grep", "Glob"]`
- Code generation: `["Read", "Write", "Grep"]`
- Testing: `["Read", "Bash", "Grep"]`

## System Prompt Design

The markdown body becomes the agent's system prompt. Write in second person ("You are...", "You will...").

Standard template:
```
You are [role] specializing in [domain].

**Core Responsibilities:**
1. [Primary responsibility]
2. [Secondary responsibility]

**Analysis Process:**
1. [Step one]
2. [Step two]

**Output Format:**
[What to return and how to structure it]

**Edge Cases:**
- [Edge case]: [How to handle]
```

Keep under 10,000 characters. Be specific. Address edge cases.

## Validation Rules

- Identifier: 3-50 chars, lowercase+hyphens, alphanumeric start/end
- Description: 10-5,000 chars, must have triggering conditions + examples
- System prompt: 20-10,000 chars (500-3,000 recommended)

## Agent Organization

```
plugin-name/
  agents/
    analyzer.md
    reviewer.md
    generator.md
```

All `.md` files in `agents/` are auto-discovered. Agents are namespaced automatically.

## Best Practices

DO:
- Include 2-4 concrete examples in description
- Write specific triggering conditions
- Use `inherit` for model unless you have specific needs
- Limit tools to minimum needed (least privilege)
- Write clear, structured system prompts
- Test agent triggering thoroughly

DO NOT:
- Use generic descriptions without examples
- Omit triggering conditions
- Give all agents the same color
- Grant unnecessary tool access
- Write vague system prompts
