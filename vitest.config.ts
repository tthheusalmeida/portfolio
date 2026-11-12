import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  // tsconfig keeps "jsx: preserve" for Next, so tests need their own setting.
  esbuild: { jsx: "automatic" },
  test: { include: ["tests/**/*.test.{ts,tsx}"] },
});
