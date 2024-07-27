import { defineConfig } from 'vite';
 // Si estás usando React, ajusta según corresponda

export default defineConfig({
  plugins: [], // O [vue()] si estás usando Vue
  server: {
    proxy: {
      '/upload': {
        target: 'http://localhost:3000', // La URL de tu servidor Node.js
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/upload/, ''),
      },
    },
  },
});
