import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

const isTesting = process.env.VITEST === 'true'

export default defineConfig({
  plugins: [tailwindcss(), !isTesting && reactRouter(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts'
  }
});
