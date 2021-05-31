import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'

function resolve(dir: string) {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  // 强制预构建插件包
  optimizeDeps: {
    include: ['axios-next']
  },
  // 打包配置
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser' // 混淆器，terser构建后文件体积更小
  }
  // 本地运行配置，及反向代理配置
  // server: {
  //   cors: true, // 默认启用并允许任何源
  //   open: true, // 在服务器启动时自动在浏览器中打开应用程序
  //   //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
  //   proxy: {
  //     '/api': {
  //       target: 'http://192.168.99.223:3000',   //代理接口
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})
