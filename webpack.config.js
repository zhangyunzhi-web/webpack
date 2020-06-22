const HtmlWebPackPlugin = require('html-webpack-plugin') // 打包html的插件
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin') // uglifyjs的一部分，移除没必要的代码，减少项目大小
const BundleAnalyZerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin //分析器 npm run build  图示大小
// const HappyPack = require('happypack')
// //根据CPU的数量创建线程池
// const happyThreadPool = HappyPack.ThreadPool({
//     size: OscillatorNode.cpus().length
// })


//HMR 热更新
//HappyPack 多进程
//thread-loader  放在线程池worker里面运行
//fast-sass-loader 加快打包.
//DCE无用代码消除
//tree-shaking
module.exports = {
    optimization: {
        minimizer: [new TerserPlugin({
            // 缓存：加快构建速度
            cache: true,
            // parallel:true,//开启多线程进行打包优化
            terserOptions: {
                compress: { // 移除无用的代码
                    unused: true, //没有用的代码会被剔除掉
                    drop_debugger: true,
                    drop_console: true,
                    dead_code: true
                }
            }
        })]
    },
    resolve: {
        extensions: [
            '.wasm', '.mjs', '.js', '.jsx', '.json'
        ]
    },
    entry: path.resolve(__dirname, 'src/index.jsx'),
    module: {
        noParse: /node_module\/(jquery\.js)/, //不解析
        rules: [
            // {
            //     test: /\.js$/,
            //     include: path.resolve('src'),
            //     use: [
            //         'thread-loader' //thread-loader要放在所有loader之前
            //     ]
            // },
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                // include: 要的文件
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: [
                            require.resolve('@babel/preset-react'),
                            [require.resolve('@babel/preset-env', {
                                modules: false
                            })]
                        ],
                        // cacheDirectory: true,   加缓存，默认值false
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new BundleAnalyZerPlugin(),
        // new HappyPack({
        //     id: 'jsx',
        //     threads: happyThreadPool,
        //     //url-loader file-loader 不支持HappyPack
        //     loaders: ['babel-loader']
        // })
    ],
    devServer: {
        port: 3000
    }
}