import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@mui/x-data-grid')) return 'mui-datagrid'
          if (id.includes('@mui/material') || id.includes('@mui/icons-material') || id.includes('@emotion')) return 'mui'
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
