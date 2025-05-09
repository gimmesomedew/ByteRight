import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    jsxInject: `import React from 'react'`
  },
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
    target: 'esnext',
    minify: 'esbuild',
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        format: 'es',
        generatedCode: {
          constBindings: true
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('react')) {
              return 'react-vendor';
            }
            return 'vendor';
          }
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
