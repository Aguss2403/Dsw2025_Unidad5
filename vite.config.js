import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_BACKEND_URL || 'https://localhost:7138/';

  return defineConfig({
    server: {
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      mkcert(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
    },
  });
};
