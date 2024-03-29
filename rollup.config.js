import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
/**
 * 默认导出一个数组
 * 数组的每一个对象都是一个单独的导出文件配置
 */
export default [
	{
		//  入口文件
		input: 'vue-mini-learn/vue/src/index.ts',
		//  打包出口
		output: [
			// 导出 iife 模式的包
			{
				sourcemap: true,
				// 导出文件地址
				file: './vue-mini-learn/vue/dist/vue.js',
				// 生成包的格式
				format: 'iife',
				// 变量名
				name: 'Vue',
			},
		],
		plugins: [
			typescript({
				sourceMap: true,
			}),
			resolve(),
			commonjs(),
		],
	},
]
