import { defineConfig } from 'vitest/config'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

const manualChunkGroups: Record<string, string[]> = {
  vendor: [
    'react',
    'react-dom',
    'react-router-dom',
  ],
  utils: [
    'clsx',
    'tailwind-merge',
    'class-variance-authority',
  ],
  icons: [
    'lucide-react',
  ],
}

const resolveManualChunk = (id: string) =>
  Object.entries(manualChunkGroups).find(([, packageNames]) =>
    packageNames.some((packageName) => id.includes(`/node_modules/${packageName}/`)),
  )?.[0]

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  resolve: {
    alias: { "@": import.meta.dirname + "/src" },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: resolveManualChunk,
      },
    },
  },
});
