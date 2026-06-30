---
title: Python Development Patterns
name: python-patterns
description: Pythonic idioms, PEP 8 standards, type hints, and best practices for building robust, efficient, and maintainable Python applications.
description_es: "Modismos Pythonic, estándares PEP 8, type hints y mejores prácticas para construir aplicaciones Python robustas, eficientes y mantenibles."
tags: [python, patterns, type-hints, best-practices, pep8]
source: https://github.com/midudev/autoskills/tree/main/packages/autoskills/skills-registry/python-patterns
---

# Python Development Patterns

Idiomatic Python patterns and best practices for building robust, efficient, and maintainable applications.

## When to Activate

- Writing new Python code
- Reviewing Python code
- Refactoring existing Python code
- Designing Python packages/modules

## Core Principles

### 1. Readability Counts

Python prioritizes readability. Code should be obvious and easy to understand.

- Use descriptive variable names — not `x`, `tmp`, or single letters
- One statement per line
- Blank lines to separate logical sections
- Docstrings for public functions, classes, and modules

### 2. Explicit is Better Than Implicit

Avoid magic. Be clear about what your code does.

- Import what you use explicitly — no star imports
- Explicit `return` statements
- Named arguments for functions with many parameters

### 3. EAFP — Easier to Ask Forgiveness Than Permission

Python prefers exception handling over checking conditions.

```
# Pythonic
try:
    result = dictionary[key]
except KeyError:
    result = default

# Less Pythonic
if key in dictionary:
    result = dictionary[key]
else:
    result = default
```

## Type Hints

Always use type hints in new code. They serve as documentation and enable static analysis.

- Function parameters and return types
- Class attributes with `ClassVar` and instance attributes
- Use `Optional[T]` for nullable values (or `T | None` in Python 3.10+)
- Use `Union` for multiple types, or the `|` union operator (3.10+)
- `list[str]`, `dict[str, int]`, `tuple[int, ...]` for generics
- `Protocol` for structural subtyping (duck typing with types)

## Data Classes

Use `@dataclass` for value objects and DTOs. Use `@dataclass(frozen=True)` for immutable data.

Prefer dataclasses over plain dicts for structured data — they give you type checking, repr, and equality for free.

## Context Managers

Use `with` statements for resource management. Always. Files, network connections, database transactions, locks.

Implement `__enter__`/`__exit__` for custom resources, or use `contextlib.contextmanager` for generator-based contexts.

## Generators and Iterators

- Use generators for large sequences — they're lazy and memory-efficient
- `yield from` for delegating to sub-generators
- Prefer iteration over index-based loops
- `itertools` for complex iteration patterns

## Error Handling

- Catch specific exceptions — never bare `except:`
- Define custom exception classes for domain errors
- Include context in error messages
- Re-raise with `raise ... from` to preserve the chain

## Testing

- One assertion concept per test
- Test the behavior, not the implementation
- Use `pytest.fixture` for setup/teardown
- Mock at the boundary (external APIs, filesystem, time)
- Property-based testing with `hypothesis` for edge cases

## Performance

- Profile before optimizing (`cProfile`, `line_profiler`)
- List comprehensions faster than equivalent `for` loops
- `collections.Counter` and `collections.defaultdict` over manual counting
- `functools.lru_cache` for pure functions with repeated inputs
- Avoid global variable lookups in tight loops — localize with assignment

## Project Structure

```
mypackage/
  __init__.py        # Public API surface only
  core/              # Core business logic
  adapters/          # External integrations (DB, API, cache)
  models/            # Data models
  utils/             # Pure utilities
  tests/
    unit/
    integration/
  pyproject.toml     # Single config file (PEP 517/518)
```
