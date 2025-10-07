import js from "@eslint/js";
import globals from "globals";
import tseslint, { type Config } from "typescript-eslint";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { prettier: prettierPlugin },
    languageOptions: { globals: globals.browser },
    rules: {
      "prettier/prettier": ["error"],
    },
  },
  prettier,
]) as Config;
