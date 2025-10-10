import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  format: ['cjs'],
  dts: true,
  clean: true,
  splitting: false,
  external: ['@prisma/client'], // Also mark as external
});
