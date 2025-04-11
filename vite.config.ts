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
		setupFiles: './setupTests.ts',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'lcov'],
			reportsDirectory: './coverage',
			exclude: ['**/test-utils/**', '**/*.d.ts', 'build/**', 'app/routes.ts', '**/*.config.ts', '.react-router/**'],
		}
	}
});
