
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
|----------|-----------------|----------------|
| **Core** | `express` | Web framework |
| **Security Middleware** | `helmet` | HTTP headers security |
|  | `cors` | Cross-Origin Resource Sharing |
|  | `hpp` | HTTP parameter pollution protection |
|  | `express-rate-limit` | Rate limiting to prevent abuse |
|  | `xss-filters` | Sanitizes user input |
| **Validation** | `zod` | Schema validation for request data |
| **Error Handling** | `http-errors` | Standardized HTTP errors |
| **Logging** | `winston` | General purpose logging library |
|  | `morgan` | Logging for HTTP |
| **Environment** | `dotenv` | Load `.env` config variables |
| **Process Management** | `pm2` | Optional process manager for production |
| **Dev Tools / TypeScript** | `typescript` | TypeScript compiler |
|  | `tsx` | Execute TypeScript |
|  | `nodemon` | Hot-reload dev server |
|  | `tsconfig-paths` | Support TS path aliases |
| **Linting / Formatting** | `eslint` | Code linting |
|  | `@eslint/js` | ESLint JS parser plugin |
|  | `eslint-config-prettier` | Disable ESLint rules that conflict with Prettier |
|  | `eslint-plugin-prettier` | Run Prettier as an ESLint rule |
|  | `prettier` | Code formatting |
| **Git Hooks / Automation** | `husky` | Git hooks (e.g., pre-commit) |
|  | `lint-staged` | Run lint/format only on staged files |
| **Utilities** | `rimraf` | Remove directories/files (used in `build` script) |
|  | `jiti` | Lightweight ESM/CJS loader |
| **Type Definitions** | `@types/express`, `@types/node`, `@types/cors`, `@types/hpp`, `@types/xss-filters` | TypeScript type safety for libraries |
| **Custom Utils** | `catchAsync` (`/src/utils/catchAsync.ts`) | Wrapper to handle async route errors without try/catch |
|  | `xss-clean` (`/src/middlewares/xss-clean`) | Recursive sanitizer for request input |
|  | `ApiError Class` (`/src/utils/ApiError`) | Custom Error class to |

## Structure
```
src/
├── app.ts              # Express app setup (middleware, routes)
├── server.ts           # Server entry point (starts HTTP server)
├── config/             # Environment vars, external service configs
├── controllers/        # Route handlers (business logic coordination)
├── middleware/         # Custom middleware (auth, validation, etc.)
├── models/             # Database models/schemas
├── routes/             # Route definitions
├── services/           # Business logic (database ops, external APIs)
├── utils/              # Helper functions (logger, ApiError, etc.)
└── validations/        # Request validation schemas
```

## Scripts

```json
  "scripts": {
    "build": "rimraf dist && tsc -p ./tsconfig.build.json",
    "pretty": "npx prettier ./src --write",
    "lint": "npx eslint ./src --fix",
    "start": "NODE_ENV=production node dist/server.js",
    "start:dev": "NODE_ENV=development nodemon --watch src --ext ts --exec tsx src/server.ts",
    "start:pm2": "NODE_ENV=production pm2 start dist/server.js --name express-backend",
    "restart:pm2": "NODE_ENV=production pm2 restart express-backend",
    "prepare": "husky install"
  },
  ```

