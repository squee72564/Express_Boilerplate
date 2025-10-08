
# Express TypeScript Boilerplate

This is a production-ready TypeScript Express boilerplate with security, validation, logging, linting, and development tooling pre-configured.

## Features

- Express web server with TypeScript
- Security middleware: Helmet, CORS, HPP, rate limiting, XSS protection
- Validation with Zod
- Centralized logging with Winston and Morgan
- Environment variable management with dotenv
- Optional process management with PM2
- Pre-configured linting and formatting (ESLint + Prettier)
- Git hooks and pre-commit automation (Husky + lint-staged)
- Custom utilities for async route error handling and input sanitization, base Error class ect.

## Dependencies

| Category | Library / Utility | Purpose / Notes |
|----------|------------------|----------------|
| **Core** | `express` | Web framework |
| **ORM / Database** | `prisma` | Type-safe ORM and query builder |
| **Authentication** | `better-auth` | Lightweight, extensible authentication system |
| **Security Middleware** | `helmet` | HTTP headers security |
|  | `cors` | Cross-Origin Resource Sharing |
|  | `hpp` | HTTP parameter pollution protection |
|  | `express-rate-limit` | Rate limiting to prevent abuse |
|  | `xss-filters` | Sanitizes user input |
| **Validation** | `zod` | Schema validation for request data |
| **Error Handling** | `http-errors` | Standardized HTTP errors |
| **Logging** | `winston` | General purpose logging library |
|  | `morgan` | Logging for HTTP requests |
| **Environment** | `dotenv` | Load `.env` configuration variables |
| **Process Management** | `pm2` | Optional process manager for production |
| **Dev Tools / TypeScript** | `typescript` | TypeScript compiler |
|  | `tsx` | Execute TypeScript directly (ESM-compatible) |
|  | `nodemon` | Hot-reload dev server |
|  | `tsconfig-paths` | Support for TypeScript path aliases |
| **Linting / Formatting** | `eslint` | Code linting |
|  | `@eslint/js` | ESLint JS parser plugin |
|  | `eslint-config-prettier` | Disable ESLint rules that conflict with Prettier |
|  | `eslint-plugin-prettier` | Run Prettier as an ESLint rule |
|  | `prettier` | Code formatting |
| **Git Hooks / Automation** | `husky` | Git hooks (e.g., pre-commit) |
|  | `lint-staged` | Run lint/format only on staged files |
| **Utilities** | `rimraf` | Remove directories/files (used in `build` script) |
|  | `jiti` | Lightweight ESM/CJS loader |
| **Custom Utils** | `catchAsync` (`/src/utils/catchAsync.ts`) | Wrapper to handle async route errors without try/catch |
|  | `xss-clean` (`/src/middleware/xss-clean`) | Recursive sanitizer for request input |
|  | `ApiError` (`/src/utils/ApiError.ts`) | Custom Error class for standardized API errors |

## Structure
```
src/
├── app.ts              # Express app initialization
├── server.ts           # Server entry point
├── config/             # Environment variables, logging, and request logging setup
├── controllers/        # Route controllers — orchestrate request handling logic
├── db/                 # Database files (generated prisma client here)
├── lib/                # Shared libraries
├── middleware/         # Custom middleware
├── models/             # Domain models/ORM schema extensions
├── routes/             # Express route definitions
├── services/           # Business logic and integrations with external systems
├── utils/              # General-purpose utils
└── validations/        # Schema-based request validation
```

## Scripts

```json
  "scripts": {
    "build": "rimraf dist && tsc -p ./tsconfig.build.json",
    "pretty": "npx prettier ./src --write",
    "pretty:check": "npx prettier ./src --check",
    "lint": "npx eslint . --fix",
    "lint:check": "npx eslint .",
    "start": "NODE_ENV=production node dist/server.js",
    "start:dev": "NODE_ENV=development nodemon --watch src --ext ts --exec tsx src/server.ts",
    "start:pm2": "NODE_ENV=production pm2 start dist/server.js --name express-backend",
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
  },
  ```

