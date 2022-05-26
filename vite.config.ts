import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import visualizer from 'rollup-plugin-visualizer'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		visualizer({
			open: true
		})
	],
	build: {
		lib: {
			formats: ['umd', 'es'],
			entry: resolve(__dirname, 'packages/index.ts'),
			name: 'chunk',
			fileName: format => `chunk.${format}.js`
		},
		sourcemap: false,
		rollupOptions: {
			plugins: [],
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM'
				}
			}
		}
	}
})
