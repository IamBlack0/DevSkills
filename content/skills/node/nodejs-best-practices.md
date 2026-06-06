---
title: Node.js Best Practices
name: nodejs-best-practices
description: Node.js development principles and decision-making for 2025 — framework selection, async patterns, security, and architecture. Teaches thinking, not copying.
tags: [nodejs, backend, architecture, security, async]
source: https://github.com/midudev/autoskills/tree/main/packages/autoskills/skills-registry/nodejs-best-practices
---

# Node.js Best Practices

Principles and decision-making for Node.js development in 2025. Learn to THINK, not memorize code patterns.

## When to Use

Use this skill when making Node.js architecture decisions, choosing frameworks, designing async patterns, or applying security and deployment best practices.

## 1. Framework Selection (2025)

### Decision Tree

```
What are you building?
|
+-- Edge/Serverless (Cloudflare, Vercel)
|   --> Hono (zero-dependency, ultra-fast cold starts)
|
+-- High Performance API
|   --> Fastify (2-3x faster than Express)
|
+-- Enterprise/Team familiarity
|   --> NestJS (structured, DI, decorators)
|
+-- Legacy/Stable/Maximum ecosystem
|   --> Express (mature, most middleware)
|
+-- Full-stack with frontend
    --> Next.js API Routes or tRPC
```

## 2. Async Patterns

### Error Handling
- Always handle Promise rejections — unhandled rejections crash in Node 15+
- Use `AsyncLocalStorage` for request context without prop drilling
- Prefer `async/await` over callbacks; avoid mixing patterns

### Streams
- Use streams for large data (files, HTTP responses) — don't buffer everything
- `pipeline()` from `node:stream/promises` handles cleanup automatically
- Transform streams for processing: read → transform → write

### Worker Threads
- CPU-intensive tasks (compression, image processing, crypto) belong in workers
- Shared memory with `SharedArrayBuffer` for zero-copy data exchange
- Worker pool pattern for reuse (don't spawn per-request)

## 3. Security Essentials

### Input Validation
- Validate ALL external input at boundaries (HTTP, env vars, files)
- Sanitize before using in SQL queries, shell commands, file paths
- Rate limit all public endpoints — `express-rate-limit` or equivalent

### Dependencies
- Run `npm audit` in CI — fail on high severity
- Use exact versions in production (`--save-exact`)
- Prefer packages with minimal dependency trees

### Secrets
- Never log secrets, tokens, or PII
- Use environment variables — not hardcoded values
- Rotate secrets regularly; use a secrets manager in production

## 4. Performance

### Event Loop
- Never block the event loop with sync I/O or heavy computation
- Profile with `--prof` flag before optimizing
- Use `setImmediate()` to yield to I/O between chunks

### Memory
- Watch for closure leaks in long-lived event listeners
- Use `WeakMap`/`WeakRef` for caches that shouldn't prevent GC
- Stream large datasets instead of loading into memory

### Caching
- HTTP caching headers before adding application-level cache
- Redis for shared cache across instances
- In-process LRU cache for single-instance, read-heavy data

## 5. Architecture Principles

- **Single responsibility** — each module/service has one clear purpose
- **Dependency injection** — pass dependencies in; don't import globals
- **Hexagonal** — core logic separate from infrastructure (DB, HTTP, queues)
- **12-factor** — config from env, stateless processes, disposability
- **Health checks** — `/health` and `/ready` endpoints for orchestration

## 6. Deployment

- Use `cluster` module or PM2 to utilize all CPU cores
- Set `NODE_ENV=production` — enables optimizations in many frameworks
- Configure proper signal handling (`SIGTERM`) for graceful shutdown
- Export metrics: request duration, error rate, event loop lag
