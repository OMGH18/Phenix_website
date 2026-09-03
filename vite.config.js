import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// Le site est servi sur https://<user>.github.io/Phenix_website/
// -> le "base" doit correspondre au nom du dépôt.
// Si tu branches un domaine personnalisé (ex: www.phenix-assainissement.fr),
// remplace simplement par base: '/'
export default defineConfig({
  base: '/Phenix_website/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
  plugins: [tailwindcss()],
})
