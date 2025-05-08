import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['gray-matter'],
    exclude: ['framer-motion']
  },
  plugins: [
    react(),
    {
      name: 'markdown-loader',
      resolveId(source) {
        if (source.endsWith('.md?raw')) {
          return source;
        }
        return null;
      },
      async load(id) {
        if (id.endsWith('.md?raw')) {
          const realPath = id.replace('?raw', '');
          const fileContent = await fs.promises.readFile(realPath, 'utf-8');
          return {
            code: `export default ${JSON.stringify(fileContent)};`,
            map: null
          };
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
