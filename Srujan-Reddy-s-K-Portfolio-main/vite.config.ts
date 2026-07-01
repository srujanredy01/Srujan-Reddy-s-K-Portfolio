import { URL, fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          // LeetCode GraphQL CORS proxy (dev only)
          '/leetcode-api': {
            target: 'https://leetcode.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/leetcode-api/, ''),
          },
          // Codolio API proxy (dev only)
          '/codolio-api': {
            target: 'https://codolio.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/codolio-api/, ''),
          },
        },
      },
      plugins: [
        react(),
        tailwindcss(),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // FIX: __dirname is not available in ES modules.
          // Replaced with a modern equivalent using import.meta.url to get the current directory.
          '@': fileURLToPath(new URL('.', import.meta.url)),
        }
      }
    };
});
