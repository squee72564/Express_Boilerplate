# Express TypeScript Boilerplate

This is a production-ready TypeScript Express boilerplate with security, validation, logging, linting, and development tooling pre-configured.

## Features

- Express web server with TypeScript
- Security middleware: Helmet, CORS, HPP, rate limiting, XSS protection, compression
- Validation with Zod
- Centralized logging with Winston and Morgan
- Environment variable management with dotenv
- Optional process management with PM2
- Pre-configured linting and formatting (ESLint + Prettier)
- Git hooks and pre-commit automation (Husky + lint-staged)
- Fast TypeScript compilation with tsup
- Custom utilities for async route error handling and input sanitization, base Error class etc.

## Dependencies

| Category                   | Library / Utility                         | Purpose / Notes                                        |
| -------------------------- | ----------------------------------------- | ------------------------------------------------------ |
| **Core**                   | `express`                                 | Web framework                                          |
| **ORM / Database**         | `prisma`                                  | Type-safe ORM and query builder                        |
|                            | `@prisma/client`                          | Prisma runtime client                                  |
| **Authentication**         | `better-auth`                             | Lightweight, extensible authentication system          |
| **Security Middleware**    | `helmet`                                  | HTTP headers security                                  |
|                            | `cors`                                    | Cross-Origin Resource Sharing                          |
|                            | `hpp`                                     | HTTP parameter pollution protection                    |
|                            | `express-rate-limit`                      | Rate limiting to prevent abuse                         |
|                            | `xss-filters`                             | Sanitizes user input                                   |
|                            | `compression`                             | Response compression middleware                        |
| **Validation**             | `zod`                                     | Schema validation for request data                     |
| **Error Handling**         | `http-status`                             | HTTP status code constants                             |
| **Logging**                | `winston`                                 | General purpose logging library                        |
|                            | `morgan`                                  | Logging for HTTP requests                              |
| **Environment**            | `dotenv`                                  | Load `.env` configuration variables                    |
|                            | `dotenv-cli`                              | CLI for loading env files                              |
| **Process Management**     | `pm2`                                     | Optional process manager for production                |
| **Dev Tools / TypeScript** | `typescript`                              | TypeScript compiler                                    |
|                            | `tsup`                                    | Fast TypeScript bundler for Node.js                    |
|                            | `nodemon`                                 | Hot-reload dev server                                  |
|                            | `typescript-eslint`                       | TypeScript ESLint parser and rules                     |
| **Linting / Formatting**   | `eslint`                                  | Code linting                                           |
|                            | `@eslint/js`                              | ESLint JS parser plugin                                |
|                            | `globals`                                 | Global identifiers for ESLint                          |
|                            | `eslint-config-prettier`                  | Disable ESLint rules that conflict with Prettier       |
|                            | `eslint-plugin-prettier`                  | Run Prettier as an ESLint rule                         |
|                            | `prettier`                                | Code formatting                                        |
| **Git Hooks / Automation** | `husky`                                   | Git hooks (e.g., pre-commit)                           |
|                            | `lint-staged`                             | Run lint/format only on staged files                   |
| **Utilities**              | `rimraf`                                  | Remove directories/files (used in `build` script)      |
| **Custom Utils**           | `catchAsync` (`/src/utils/catchAsync.ts`) | Wrapper to handle async route errors without try/catch |
|                            | `xss-clean` (`/src/middleware/xss-clean`) | Recursive sanitizer for request input                  |
|                            | `ApiError` (`/src/utils/ApiError.ts`)     | Custom Error class for standardized API errors         |

## Structure

```
src/
├── app.ts              # Express app initialization
├── server.ts           # Server entry point
├── config/             # Environment variables, logging, and request logging setup
├── controllers/        # Business logic — orchestrate request handling logic
├── db/                 # Database files
├── lib/                # Shared libraries
├── middleware/         # Custom middleware
├── models/             # Domain models/ORM schema extensions
├── routes/             # Express route definitions
├── services/           # Services
├── types/              # TypeScript type definitions and declarations
├── utils/              # General-purpose utils
└── validations/        # Schema-based request validation
```

## Scripts

```json
{
  "scripts": {
    "build": "rimraf dist && tsup && cp -r src/db/generated dist/db/generated",
    "pretty": "prettier ./src --write",
    "pretty:check": "prettier ./src --check",
    "lint": "eslint . --fix",
    "lint:check": "eslint .",
    "start": "NODE_ENV=production node dist/server.cjs",
    "start:dev": "NODE_ENV=development nodemon --watch src --ext ts --exec tsx src/server.ts",
    "start:pm2": "NODE_ENV=production pm2 start dist/server.cjs --name express-backend",
    "restart:pm2": "NODE_ENV=production pm2 restart express-backend",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:migrate:deploy": "prisma migrate deploy",
    "prisma:studio": "prisma studio",
    "prisma:push": "prisma db push",
    "docker:dev": "docker compose up -d",
    "docker:dev:logs": "docker compose logs -f postgres",
    "docker:dev:down": "docker compose down",
    "docker:prod": "docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d",
    "docker:prod:logs": "docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f postgres",
    "docker:prod:down": "docker compose -f docker-compose.yml -f docker-compose.prod.yml down",
    "prepare": "husky install"
  }
}
```

## Development

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.development .env.production
   ```

- Change development and production env vars as needed

3. Start the postgres database and pgbouncer:

   ```bash
   pnpm docker:dev
   ```

4. Generate Prisma client:

   ```bash
   pnpm prisma:generate
   ```

5. Run migrations:

   ```bash
   pnpm prisma:migrate
   ```

6. Start development server:
   ```bash
   pnpm start:dev
   ```

## Production

1. Build the application:

   ```bash
   pnpm build
   ```

2. Run migrations:

   ```bash
   pnpm prisma:migrate:deploy
   ```

3. Start with Node:

   ```bash
   pnpm start
   ```

   Or with PM2:

   ```bash
   pnpm start:pm2
   ```

   Or with Docker:

   ```bash
   To Be Added Soon
   ```

### Important: Use Better Auth Client Libraries

While you can make direct HTTP requests to `/auth` endpoints, **it's strongly recommended to use Better Auth's client libraries** for the following reasons:

- **Type Safety**: Full TypeScript support with inferred types from your auth configuration
- **Automatic Session Management**: Handles tokens, cookies, and session refresh automatically
- **Error Handling**: Standardized error responses and states
- **Framework Integration**: Official plugins for React, Vue, Svelte, Next.js, and more

### Client Setup Example

**React/Next.js:**

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // Your API URL
});

// Usage in components
const { signIn, signUp, signOut, session } = authClient;
```

**Vanilla JavaScript:**

```typescript
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

// Make authenticated requests
await authClient.signIn.email({
  email: "user@example.com",
  password: "password123",
});
```

### Available Client Libraries

- `better-auth/react` - React hooks and components
- `better-auth/vue` - Vue composables
- `better-auth/svelte` - Svelte stores
- `better-auth/client` - Vanilla JS/framework-agnostic

For more information, see the [Better Auth documentation](https://www.better-auth.com/docs/basic-usage#client-side).
