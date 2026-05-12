import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', 
  
  build: {
    // Hadchi k-i-khlli l-build ikoun nqi l GitHub Pages
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    // Ila knti k-t-khdem b jQuery m3a React, hadchi k-i-sa3ed f l-dev
    open: true,
  }
})