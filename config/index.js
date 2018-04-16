'use strict'

const path = require('path')
module.exports = {
	dev: {
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		// 下面是代理表，作用是用来，建一个虚拟api服务器用来代理本机的请求，只能用于开发模式
    	proxyTable: {},

		host: 'localhost',
    	port: 8081,
    	// 下面表示是否自定代开浏览器
    	autoOpenBrowser: false,

		// 是否开启eslint检测
		useEslint: true,
		devtool: 'cheap-module-eval-source-map'
	},
	build: {
		assetsSubDirectory: 'static',
		// 下面定义的是静态资源的公开路径，也就是真正的引用路径
    	assetsPublicPath: './',

		// 打包后的文件目录
		assetsRoot: path.resolve(__dirname, '../dist'),
		devtool: '#source-map',

		// 下面是是否在生产环境中压缩代码，如果要压缩必须安装compression-webpack-plugin
	    productionGzip: true,

	    // 下面定义要压缩哪些类型的文件
	    productionGzipExtensions: ['js', 'css']
	}
}