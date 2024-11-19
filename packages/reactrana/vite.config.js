import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [
		vue({
			compilerOptions: {
				isCustomElement: (tag) => true
			}
		}),
		dts({
			tsconfigPath: './tsconfig.node.json'
		})
	],
	build: {
		lib: {
			entry: './src/index.ts',
			name: 'Vuerana',
			fileName: (format) => `vuerana.${format}.js`,
			formats: ['es']
		},
		rollupOptions: {
			external: ['vue', 'larana-js'],
		}
	}
})
