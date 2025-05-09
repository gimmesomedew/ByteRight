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
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      input: {
        main: './index.html'
      },
      output: {
        format: 'es',
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash][extname]',
        manualChunks: undefined
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
