---
title: Node.js Backend Patterns
name: nodejs-backend-patterns
description: Build production-ready Node.js backend services — middleware patterns, error handling, authentication, database integration, and API design best practices.
description_es: "Construye servicios backend Node.js listos para producción — patrones de middleware, manejo de errores, autenticación, integración de base de datos y diseño de API."
tags: [nodejs, backend, api, express, fastify, patterns]
source: https://github.com/midudev/autoskills/tree/main/packages/autoskills/skills-registry/nodejs-backend-patterns
---

# Node.js Backend Patterns

Guidance for building scalable, maintainable, and production-ready Node.js backend applications.

## When to Use This Skill

- Building REST APIs or GraphQL servers
- Creating microservices with Node.js
- Implementing authentication and authorization
- Designing scalable backend architectures
- Setting up middleware and error handling
- Integrating databases (SQL and NoSQL)
- Building real-time applications with WebSockets
- Implementing background job processing

## 1. Project Structure

```
src/
  routes/          # Route definitions only — no business logic
  controllers/     # Request/response handling
  services/        # Business logic
  repositories/    # Data access layer
  middleware/      # Express/Fastify middleware
  models/          # Data models and schemas
  utils/           # Pure utility functions
  config/          # App configuration
```

Keep each layer thin. Routes call controllers, controllers call services, services call repositories. Nothing skips layers.

## 2. Error Handling

### Centralized Error Handler

All errors funnel through one place. Define custom error classes:

- `ValidationError` (400) — invalid input from user
- `AuthenticationError` (401) — missing or invalid credentials
- `AuthorizationError` (403) — insufficient permissions
- `NotFoundError` (404) — resource doesn't exist
- `ConflictError` (409) — duplicate or state conflict

Return consistent JSON: `{ error: { message, code, details? } }`.

### Async Error Propagation

Wrap async route handlers to catch rejections automatically. Unhandled async errors crash the process in Node 15+.

## 3. Authentication Patterns

### JWT

- Short-lived access tokens (15 min) + long-lived refresh tokens (7 days)
- Store refresh tokens in database for revocation support
- Validate with middleware; attach user to `req.user`
- Never store sensitive data in payload — it's base64, not encrypted

### API Keys

- Hash with SHA-256 before storing (bcrypt is overkill for API keys)
- Show full key only once at creation time
- Implement rate limiting per key
- Log key usage for audit trail

## 4. Validation

- Validate at the boundary (route level), not deep in service code
- Use Zod or Joi schema definitions — colocate with routes
- Return all validation errors at once (not just the first)
- Strip unknown fields to prevent mass assignment

## 5. Database Integration

### Connection Management

- Use connection pools — never open a connection per request
- Set pool size based on DB limits, not server count
- Close pool gracefully on SIGTERM

### Query Patterns

- Repository pattern isolates query logic from business logic
- Parameterized queries everywhere — never string-concatenate user input into SQL
- Transactions for multi-step operations that must be atomic
- Pagination with cursor (keyset) over offset for large datasets

## 6. Middleware Stack (Order Matters)

```
1. Security headers (helmet)
2. CORS
3. Compression
4. Body parsing
5. Rate limiting
6. Request logging
7. Authentication (where needed)
8. Routes
9. 404 handler
10. Error handler
```

## 7. API Design

- Plural nouns for resources: `/users`, `/orders`, `/products`
- Nested routes for relationships: `/users/:id/orders`
- Use HTTP verbs semantically: GET (read), POST (create), PUT/PATCH (update), DELETE
- Return `201` for POST, `204` for DELETE
- Include `X-Request-Id` header in responses for tracing
- Version the API: `/api/v1/` — never break existing consumers

## 8. Real-time with WebSockets

- Authenticate on connection (not per-message)
- Implement heartbeat (ping/pong) to detect dead connections
- Clean up listeners on disconnect to prevent memory leaks
- Use rooms/namespaces to scope broadcasts
