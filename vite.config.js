import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
  base: './', // 替换为你的仓库名
  build: {
    outDir: './dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        map: resolve(__dirname, 'map.html'),
        schedule: resolve(__dirname, 'schedule.html'),
        guestbook: resolve(__dirname, 'guestbook.html')
      }
    }
  }
});