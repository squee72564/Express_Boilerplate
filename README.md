# Express TypeScript Boilerplate

This is a production-ready TypeScript Express boilerplate with security, validation, logging, linting, and development tooling pre-configured.

## Features

- Express web server with TypeScript
- Security middleware: Helmet, CORS, HPP, rate limiting, XSS protection
- Validation with Zod
- Centralized logging with Winston
- Environment variable management with dotenv
- Optional process management with PM2
- Pre-configured linting and formatting (ESLint + Prettier)
- Git hooks and pre-commit automation (Husky + lint-staged)
- Custom utilities for async route error handling and input sanitization

## Dependencies

| Category | Library / Utility | Purpose / Notes |
|----------|-----------------|----------------|
| **Core** | `express` | Web framework |
| **Security Middleware** | `helmet` | HTTP headers security |
|  | `cors` | Cross-Origin Resource Sharing |
|  | `hpp` | HTTP parameter pollution protection |
|  | `express-rate-limit` | Rate limiting to prevent abuse |
|  | `xss-filters` | Sanitizes user input (used in `xss-clean` utility) |
| **Validation** | `zod` | Schema validation for request data |
| **Error Handling** | `http-errors` | Standardized HTTP errors |
| **Logging** | `winston` | Logging library for production |
| **Environment** | `dotenv` | Load `.env` config variables |
| **Process Management** | `pm2` | Optional process manager for production |
| **Dev Tools / TypeScript** | `typescript` | TypeScript compiler |
|  | `ts-node` | Execute TypeScript directly in dev |
|  | `ts-node-dev` | Hot-reload dev server |
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

## Scripts

```json
"scripts": {
  "build": "rimraf dist && tsc",
  "pretty": "npx prettier ./src --write",
  "lint": "npx eslint ./src --fix",
  "start": "node dist/server.js",
  "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "start:pm2": "pm2 start dist/server.js --name express-backend",
  "restart:pm2": "pm2 restart express-backend",
  "prepare": "husky install"
}
