import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ base doit correspondre exactement au nom du repo GitHub Pages
// Si ton repo s'appelle "saitlhaj3265-hue.github.io" → base: '/'
// Si ton repo s'appelle autre chose → base: '/nom-du-repo/'
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    open: true,
  },
})