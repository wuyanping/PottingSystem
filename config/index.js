'use strict'

const path = require('path')
const env = require('../env.js')
const proxyTableOptions = {
    target: env.app_url,//设置你调用的接口域名和端口号 别忘了加http
	changeOrigin:true
}

module.exports = {
	dev: {
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		// 打包后的文件目录
		assetsRoot: path.resolve(__dirname, '../dist'),
		// 下面是代理表，作用是用来，建一个虚拟api服务器用来代理本机的请求，只能用于开发模式
    	proxyTable: {
    		'/api':{
    			// target:"http://47.93.166.112/BrainPcWeb",//设置你调用的接口域名和端口号 别忘了加http
			    target: env.app_url,//设置你调用的接口域名和端口号 别忘了加http
			    changeOrigin:true,
			    pathRewrite:{
			        '^/api':'/'
			        //这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替 
			        //比如我要‘/api/user/login'即可 会映射到 'http://40.00.100.133:3002/user/login'
			    }
			},
			// pc端
			'/login': proxyTableOptions,
			'/islogin': proxyTableOptions,
			'/logout': proxyTableOptions,
			'/user': proxyTableOptions,
			'/user/**': proxyTableOptions,

			'/pot': proxyTableOptions,
			'/pot/**': proxyTableOptions,

			'/sysman': proxyTableOptions,
			'/sysman/**': proxyTableOptions,

			'/log': proxyTableOptions,
			'/log/**': proxyTableOptions,

			// 移动端
			'/domlogin': proxyTableOptions,
			'/domregister': proxyTableOptions,
			'/ismlogin': proxyTableOptions,
			'/domlogout': proxyTableOptions,

			// 邀请/申请
			'/apply': proxyTableOptions,
			'/apply/**': proxyTableOptions,

			'/storage': proxyTableOptions
			// /Home/Index就会映射到http://localhhost:9494/Home/Index,
			// '/Home' : {
		 //      target: 'http://localhost:9494',
		 //      changeOrigin: true,
		 //    },
    	},

		host: "localhost",
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
	    productionGzip: false,

	    // 下面定义要压缩哪些类型的文件
	    productionGzipExtensions: ['js', 'css']
	}
}