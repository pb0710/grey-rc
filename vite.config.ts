import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh()],
	build: {
		lib: {
			entry: resolve(__dirname, 'packages/index.ts'), // 设置入口文件
			name: 'gray-rc', // 起个名字，安装、引入用
			fileName: format => `gray-rc.${format}.js` // 打包后的文件名
		},
		sourcemap: true, // 输出.map文件
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['react', 'react-dom'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM'
				}
			}
		}
	}
})
