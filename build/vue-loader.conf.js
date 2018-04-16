'use strict'
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'
console.log('env: ' + isProd + '-------------------------------------' )

const VueConfig = {
	// preserveWhitespace: false,
	postcss: [
		require('autoprefixer')({
		  browsers: ['last 3 versions']
		})
	],
	loaders:{
		js: 'babel-loader',
		css: isProd ? extractTextWebpackPlugin.extract({
            use:[ 'css-loader' ],  				// 指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
            fallback: 'vue-style-loader'        // 编译后用什么loader来提取css文件
        }) : ['vue-style-loader!css-loader'] ,

		sass: isProd ? extractTextWebpackPlugin.extract({
			use: [ 'css-loader', 'sass-loader' ],
			fallback: 'vue-style-loader'
		}) : ['vue-style-loader!css-loader!sass-loader'] ,

		scss: isProd ? extractTextWebpackPlugin.extract({
			use: [ 'css-loader', 'sass-loader' ],
			fallback: 'vue-style-loader'
		}) : ['vue-style-loader!css-loader!sass-loader']
	}
}

module.exports = VueConfig
