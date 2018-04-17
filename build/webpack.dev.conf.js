'use strict'

const webpack = require('webpack')
const path = require('path')
const clean = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const extractTextWebpackPlugin = require('extract-text-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.conf.js')
const config = require('../config')

function resolve(...dir) {
    return path.join(__dirname, '..', ...dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
    devtool: config.dev.devtool,

    devServer: {
    	contentBase: '../dist',		          // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, 	          // 如果设置为true，所有的跳转将指向index.html
        hot: true,					          // 开启热加载
        inline: true, 				          // 当源文件改变时会自动刷新页面
        host: config.dev.host,
        port: config.dev.port,
        open: config.dev.autoOpenBrowser,     // 自动打开浏览器
        // proxy: config.dev.proxyTable,
        // quiet: true, // necessary for FriendlyErrorsPlugin
    },

    plugins: [
        // 定义环境变量
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),

        //设置全局变量
        new webpack.ProvidePlugin({
            Vue: 'vue',
            'window.Vue': 'vue',

            axios: 'axios'
        }),//直接加载到全局不需要require()

        // 删除dist文件
        // new clean(['dist'], {                       //匹配删除的文件
        //     root: path.resolve(__dirname, '../'),   //根目录
        //     verbose: true                           //开启在控制台输出信息
        // }),

        // 根据模板生成html文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),

        // 提取第三方插件
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'}),

        // 拷贝资源插件
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'), // 定义要拷贝的源目录 
                to: config.dev.assetsSubDirectory,          //  定义要拷贝到的目标目录
                // ignore: ['.*']                              // 忽略拷贝指定的文件
            }
        ]),

        // 热加载
        new webpack.NamedModulesPlugin(),       // 在开发过程
        // new webpack.HashedModuleIdsPlugin(),    // 推荐用于生产环境
        new webpack.HotModuleReplacementPlugin()
    ],
})

module.exports = devWebpackConfig