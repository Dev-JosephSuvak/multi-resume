import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'ClientApp',
  publicDir: 'public',
  build: {
    outDir: '../wwwroot/dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173
  }
})
