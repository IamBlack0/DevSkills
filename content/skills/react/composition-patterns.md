---
title: React Composition Patterns
name: vercel-composition-patterns
description: React composition patterns that scale. Avoid boolean prop proliferation by using compound components, lifting state, and composing internals. Includes React 19 API changes.
tags: [react, composition, compound-components, architecture, vercel]
source: https://github.com/vercel-labs/agent-skills/tree/main/skills/composition-patterns
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# React Composition Patterns

Composition patterns for building flexible, maintainable React components. Avoid boolean prop proliferation by using compound components, lifting state, and composing internals. These patterns make codebases easier for both humans and AI agents to work with as they scale.

## When to Apply

Reference these guidelines when:

- Refactoring components with many boolean props
- Building reusable component libraries
- Designing flexible component APIs
- Reviewing component architecture
- Working with compound components or context providers

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Component Architecture | HIGH | `architecture-` |
| 2 | State Management | MEDIUM | `state-` |
| 3 | Implementation Patterns | MEDIUM | `patterns-` |
| 4 | React 19 APIs | MEDIUM | `react19-` |

## Quick Reference

### 1. Component Architecture (HIGH)

- `architecture-avoid-boolean-props` — Don't add boolean props to customize behavior; use composition
- `architecture-compound-components` — Structure complex components with shared context

### 2. State Management (MEDIUM)

- `state-decouple-implementation` — Provider is the only place that knows how state is managed
- `state-context-interface` — Define generic interface with state, actions, meta for dependency injection
- `state-lift-state` — Move state into provider components for sibling access

### 3. Implementation Patterns (MEDIUM)

- `patterns-explicit-variants` — Create explicit variant components instead of boolean modes
- `patterns-children-over-render-props` — Use children for composition instead of renderX props

### 4. React 19 APIs (MEDIUM)

> React 19+ only. Skip this section if using React 18 or earlier.

- `react19-no-forwardref` — Don't use `forwardRef`; use `use()` instead of `useContext()`

## Core Principle

Boolean props signal a design problem. When you find yourself adding `isLoading`, `hasError`, `isDisabled`, `isExpanded` — stop. These are composition opportunities in disguise.

Instead of:
```
<Card loading error disabled />
```

Use compound components:
```
<Card>
  <Card.Header />
  <Card.Body>
    <Card.Loading />
    <Card.Error />
  </Card.Body>
</Card>
```

The compound pattern lets consumers compose behavior without the component needing to anticipate every variation.
