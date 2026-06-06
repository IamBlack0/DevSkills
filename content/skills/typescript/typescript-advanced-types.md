---
title: TypeScript Advanced Types
name: typescript-advanced-types
description: Master TypeScript's advanced type system — generics, conditional types, mapped types, template literals, and utility types for building type-safe applications.
tags: [typescript, types, generics, type-safety]
source: https://github.com/midudev/autoskills/tree/main/packages/autoskills/skills-registry/typescript-advanced-types
---

# TypeScript Advanced Types

Comprehensive guidance for mastering TypeScript's advanced type system including generics, conditional types, mapped types, template literal types, and utility types for building robust, type-safe applications.

## When to Use This Skill

- Building type-safe libraries or frameworks
- Creating reusable generic components
- Implementing complex type inference logic
- Designing type-safe API clients
- Building form validation systems
- Creating strongly-typed configuration objects
- Implementing type-safe state management
- Migrating JavaScript codebases to TypeScript

## Core Concepts

### 1. Generics

Create reusable, type-flexible components while maintaining type safety.

Constraints limit which types can be passed to a generic:
- Use `extends` to constrain type parameters
- Multiple type parameters handle relationships between inputs/outputs
- Default type parameters reduce boilerplate at call sites

### 2. Conditional Types

Types that evaluate differently based on a condition:

```
T extends U ? X : Y
```

- `NonNullable<T>` — removes null/undefined from T
- `ReturnType<T>` — extracts return type of a function
- `Parameters<T>` — extracts parameter types as a tuple
- `infer` — captures types within conditional branches

### 3. Mapped Types

Transform existing types by iterating over their keys:

- `Readonly<T>` — makes all properties readonly
- `Partial<T>` — makes all properties optional
- `Required<T>` — makes all properties required
- `Pick<T, K>` — creates type with subset of properties
- `Omit<T, K>` — creates type without specified properties
- `Record<K, V>` — creates object type with specific key/value types

### 4. Template Literal Types

Construct string types using template literal syntax:

```typescript
type EventName = `on${Capitalize<string>}`;
type CSSProperty = `${string}-${string}`;
```

Useful for:
- Typed event names
- CSS property paths
- API route construction
- Validation message keys

### 5. Discriminated Unions

Pattern for type-safe state machines:

```typescript
type Result<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }
  | { status: 'loading' };
```

Narrowing with discriminant field gives exhaustive type checking.

### 6. Utility Type Patterns

Common utility type implementations:

- `DeepPartial<T>` — recursively optional properties
- `DeepReadonly<T>` — recursively readonly properties
- `Awaited<T>` — unwrap Promise type
- `FlattenArray<T>` — extract array element type
- `UnionToIntersection<U>` — convert union to intersection

## Best Practices

- Prefer `unknown` over `any` — forces type narrowing before use
- Use `satisfies` operator to validate without widening types
- Avoid type assertions (`as`) — prefer type guards instead
- Use `const` assertions for literal type inference
- Prefer interface for public API shapes, type for complex computations
- Use `readonly` arrays (`ReadonlyArray<T>`) when mutation is unintended
