import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Rutas relativas: funciona igual en GitHub Pages (/Poliminion/), Vercel o Cloudflare
export default defineConfig({
  plugins: [react()],
  base: './',
})
