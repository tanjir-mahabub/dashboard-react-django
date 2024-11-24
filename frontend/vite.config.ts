import { defineConfig } from 'vitest/config'; // Import from vitest/config for test config support
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: { // Add the `test` property here for Vitest
    globals: true, // Enables Jest-like global APIs (e.g., `describe`, `it`, `expect`).
    environment: 'jsdom', // Simulates a browser environment.
    setupFiles: './src/test/setup.ts', // Specifies setup files for testing.
    css: true, // Enables CSS handling for TailwindCSS.
  },
});
