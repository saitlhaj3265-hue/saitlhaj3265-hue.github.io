import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Sta3melna ./ bach i-welli i-qra l-assets b-tariqa sahiha f GitHub Pages
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})