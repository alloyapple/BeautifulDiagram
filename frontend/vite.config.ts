import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Tailwind v4 is handled via postcss plugin in this project.

export default defineConfig({
  base: '/app',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8008',
        changeOrigin: true,
      },
    },
  },
})
