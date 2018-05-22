'use strict'

const webpack = require('webpack')
const path = require('path')
const clean = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')

const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf.js')
const utils = require('./utils')

// 默认打包pc端
const MP = process.env.NODE_MP === 'mobile' ? 'mobile' : 'pc'

const devWebpackConfig = merge(baseWebpackConfig, {
    devtool: config.build.devtool,

    output: {
	    path: config.build.assetsRoot,
    	filename: utils.assetsPath('js/[name].[chunkhash].js'),
    	chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
	},

    plugins: [
    	// 定义环境变量
        new webpack.DefinePlugin({
            'process.env': require('../config/prod.env')
        }),

        //设置全局变量
        new webpack.ProvidePlugin({
            Vue: 'vue',
            'window.Vue': 'vue',
            
            axios: 'axios'
        }),//直接加载到全局不需要require()

        // 删除dist文件
        new clean(['dist'], {                       //匹配删除的文件
            root: path.resolve(__dirname, '../'),   //根目录
            verbose: true                           //开启在控制台输出信息
        }),

        // 根据模板生成html文件
        new HtmlWebpackPlugin({
            filename: MP + '.html',
            template: 'index.html'
        }),

        // 提取第三方插件
        // 下面的插件是将打包后的文件中的第三方库文件抽取出来，便于浏览器缓存，提高程序的运行速度
        new webpack.optimize.CommonsChunkPlugin({ 
        	name: 'vendor',
	     	minChunks (module) {
	     	  	// any required modules inside node_modules are extracted to vendor
	     	  	return (
	     	  	  	module.resource &&
	     	  	  	/\.js$/.test(module.resource) &&
	     	  	  	module.resource.indexOf(
	     	  	    	path.join(__dirname, '../node_modules')
	     	  	  	) === 0
	     	  	)
	     	}
        }),

      // 把webpack的runtime代码和module manifest代码提取到manifest文件中，防止修改了代码但是没有修改第三方库文件导致第三方库文件也打包的问题
	    new webpack.optimize.CommonsChunkPlugin({
	      name: 'manifest',
	      chunks: ['vendor']
	    }),

        // 拷贝资源插件
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'), // 定义要拷贝的源目录 
                to: config.dev.assetsSubDirectory,          //  定义要拷贝到的目标目录
                // ignore: ['.*']                              // 忽略拷贝指定的文件
            }
        ]),

        // 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
	    new OptimizeCSSPlugin(),

        // 将样式文件单独打包
        new extractTextWebpackPlugin({
        	filename: utils.assetsPath("css/[name].[chunkhash].css"),
        	allChunks: true
        }),

        new UglifyJsPlugin({
     		uglifyOptions: {
	      	 	compress: {
	      	 	  	warnings: false
	      	 	}
	      	}
	    })
    ],
})

// gzip 压缩
if (config.build.productionGzip) {
  	const CompressionWebpackPlugin = require('compression-webpack-plugin')
	
  	devWebpackConfig.plugins.push(
  	  	new CompressionWebpackPlugin({
  	  	  	asset: '[path].gz[query]',
  	  	  	algorithm: 'gzip',
  	  	  	test: new RegExp(
  	  	  	  	'\\.(' +
  	  	  	  	config.build.productionGzipExtensions.join('|') +
  	  	  	  	')$'
  	  	  	),
  	  	  	threshold: 10240,
  	  	  	minRatio: 0.8
  	  	})
  	)
}

module.exports = devWebpackConfig