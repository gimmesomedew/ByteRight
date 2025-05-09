import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'
import mdx from '@mdx-js/rollup'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  optimizeDeps: {
    include: ['gray-matter'],
    exclude: ['framer-motion']
  },
  plugins: [
    react({
      babel: {
        presets: [
          ['@babel/preset-react', { runtime: 'automatic' }]
        ]
      }
    }),
    mdx(),
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
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      input: './index.html',
      output: {
        format: 'es',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
        inlineDynamicImports: false
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
