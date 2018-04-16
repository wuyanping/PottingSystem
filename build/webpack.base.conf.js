const webpack = require('webpack')
const path = require('path')
const clean = require('clean-webpack-plugin')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')

const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf.js')

const isProd = process.env.NODE_ENV === 'production'
// console.log('env11: ' + process.env.NODE_ENV + '-------------------------------------' )

function resolve(...dir) {
    return path.join(__dirname, '..', ...dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src')], // 指定检查的目录
    options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
        formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
    }
})

module.exports = {
    // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和加载器(loader)
    context: path.resolve(__dirname, '../'),

    entry: {
        app: './src/main.js',
    },

    output: {
        //打包后的文件存放的地方
        path: config.build.assetsRoot,
    
        //打包后输出文件的文件名
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },

    // 文件解析: 主要设置模块如何被解析
    resolve: {
        // require查找module的话从这里开始查找            
        modules: [
            'node_modules',
            resolve('src'),
            resolve('static')
        ],

        // 自动解析确定的拓展名, require模块可以省略不写后缀名
        extensions: ['.js', '.css',".scss", '.vue', '.json'],

        //创建import或require的别名, 后续直接 require('style') 即可
        alias: {
            'vue$': 'vue/dist/vue',
            'projectRoot': resolve(),
            COMPONENTS : resolve('src', 'assets', 'js', 'components'),
            ROUTER : resolve('src', 'assets', 'js', 'router'),
            SASS : resolve('src', 'assets', 'sass') // @import引入的好像不行
        }
    },

    // 模块解析
    module: {
        rules: [
            config.dev.useEslint ? createLintingRule() : {},
            
            {
                test: /\.vue$/,                     // vue文件后缀
                use: [
                    {
                        loader: 'vue-loader',       // 使用vue-loader处理
                        options: vueLoaderConfig    // options是对vue-loader做的额外选项配置
                    }
                ]
            },

            {
                test: /\.css$/,
                use: isProd ?
                    extractTextWebpackPlugin.extract({
                        fallback: 'style-loader',                               // 编译后用什么loader来提取css文件
                        use:[ 'css-loader', 'postcss-loader' ]  // 指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
                    })
                :
                    [
                        { loader: "style-loader" },
                        { loader: "css-loader" },
                        { loader: "postcss-loader" }
                    ]
            },

            {
                test: /\.scss$/i,
                use: isProd ?
                    extractTextWebpackPlugin.extract({
                        fallback: 'style-loader',
                        use: [ 'css-loader', 'sass-loader', 'postcss-loader' ]
                    })
                : 
                    [
                        { loader: "style-loader" },
                        { loader: "css-loader" },
                        { loader: "sass-loader" },
                        { loader: "postcss-loader" }
                    ]
            },

            {
                test: /\.sass$/i,
                use: isProd ?
                    extractTextWebpackPlugin.extract({
                        fallback: 'style-loader',
                        use: [ 'css-loader', 'sass-loader', 'postcss-loader' ]
                    })
                : 
                    [
                        { loader: "style-loader" },
                        { loader: "css-loader" },
                        { loader: "sass-loader" },
                        { loader: "postcss-loader" }
                    ]
            },

            // webpack会自动调用.babelrc里的babel配置选项）
            // 使用 es6 语法 babel-loader babel-preset-es2015 babel-core
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                //不打包node_modules里面的模块
                exclude: /node_modules/
            },

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    }
}
