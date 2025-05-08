import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['gray-matter'],
    exclude: ['framer-motion']
  },
  plugins: [
    react(),
    {
      name: 'markdown',
      transform(code, id) {
        if (id.endsWith('.md?raw')) {
          return {
            code: `export default ${JSON.stringify(code)};`,
            map: null
          }
        }
      }
    }
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'react-vendor': ['react', 'react-dom'],
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom', 'framer-motion']
  },
  server: {
    port: 5173,
    host: true,
    fs: {
      strict: false,
      allow: ['.']
    },
  },
})
