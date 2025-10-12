import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { splitVendorChunkPlugin } from 'vite'
import { resolve } from 'path'
import viteImagemin from 'vite-plugin-imagemin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    splitVendorChunkPlugin(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
        progressive: true,
      },
      pngquant: {
        quality: [0.7, 0.8],
        speed: 4,
      },
      webp: {
        quality: 75,
        method: 6,
      },
      svgo: {
        multipass: true,
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'minifyStyles',
            active: true,
          },
          {
            name: 'removeMetadata',
            active: true,
          },
          {
            name: 'removeUselessStrokeAndFill',
            active: true,
          },
          {
            name: 'reusePaths',
            active: true,
          },
          {
            name: 'removeEmptyAttrs',
            active: true,
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'styled-components', '@headlessui/react', '@heroicons/react'],
          'date-vendor': ['react-date-range', 'react-datepicker'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          'animation-vendor': ['aos', 'react-intersection-observer', 'react-countup'],
          'icons-vendor': ['react-icons', 'lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})

