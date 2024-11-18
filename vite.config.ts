import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://15.207.44.219:8082',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix from the request URL
      },
    },
  },
});
