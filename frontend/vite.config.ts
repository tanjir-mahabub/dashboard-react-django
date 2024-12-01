import { defineConfig } from 'vitest/config'; 
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: { 
    globals: true, 
    environment: 'jsdom', 
    setupFiles: './src/test/setup.ts', 
    css: true, 
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
