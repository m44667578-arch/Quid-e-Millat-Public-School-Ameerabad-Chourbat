// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Single default export — do not add another export default anywhere in this file.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})

