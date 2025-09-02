import { defineConfig } from 'vite';

export default defineConfig({
  base: '/wedding/', // 替换为你的仓库名
  build: {
    outDir: './dist',
    sourcemap: false,
    module: 'system'
  }
});