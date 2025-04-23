import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config
export default defineConfig({
    plugins: [
        vue(), // 添加 Vue 插件
    ],
    // server: {
    //     port: 3000, // 开发服务器端口
    // },
    // resolve: {
    //     alias: {
    //         '@': '/src', // 设置路径别名
    //     },
    // },
    // build: {
    //     outDir: 'dist', // 构建输出目录
    //     assetsDir: 'assets', // 静态资源目录
    //     minify: 'terser', // 使用 Terser 压缩代码
    // },
});
