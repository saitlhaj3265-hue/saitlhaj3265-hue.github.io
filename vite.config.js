import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Hit rak khdam f repository smitou (username.github.io), 
  // l-base khass ikoun '/' bach l-fichiers i-t-chargew s-hah.
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