import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['three', 'stats.js'],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})