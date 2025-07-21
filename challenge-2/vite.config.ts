import tailwindcss from '@tailwindcss/vite'
import pluginReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

/** @see https://vitejs.dev/config/ */
export default defineConfig({
  plugins: [pluginReact(), tailwindcss(), tsconfigPaths()],
  build: {
    sourcemap: false,
    reportCompressedSize: true,
  },
  css: {
    transformer: 'lightningcss',
  },
  server: {
    port: 2048,
    host: true,
  },
  preview: {
    port: 2048,
    host: true,
  },
})
