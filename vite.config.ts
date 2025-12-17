import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  base: '/Portfolio/', // GitHub Pages base path
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure proper asset paths
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].js',
        entryFileNames: 'assets/[name].js'
      }
    }
  }
})
