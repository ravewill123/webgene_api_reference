var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require("webpack");
var argv = require('minimist')(process.argv.slice(2), { boolean:['release', 'mini'] });

module.exports = {
    devtool: argv.mini ? "" : "eval",
    entry: {
        app: ['./src/js/app.ts'],
        otherPage: ['./src/js/otherPage.ts'],
        bannerA: ['./src/js/bannerA.js'],
        bannerB: ['./src/js/bannerB.js']
    },
    externals: {},
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // html-webpack-plugin可以做很細微的操作，可以參考官方文件
        new HtmlWebpackPlugin({
            release: argv.release,
            chunks: ['app'], // 指定對應到的entry為app
            filename: 'Default.html',
            template: './src/Default.html',
            inject: 'body',
            hash: true,
            minify: {
                minifyCSS: argv.mini,
                minifyJS: argv.mini,
                removeComments: argv.mini,
                collapseWhitespace: argv.mini,
                preserveLineBreaks: true
            }
        }),
        new HtmlWebpackPlugin({
            release: argv.release,
            chunks: ['otherPage'], // 指定對應到的entry為otherPage
            filename: 'otherPage.html',
            template: './src/otherPage.html',
            inject: 'body',
            hash: true,
            minify: {
                minifyCSS: argv.mini,
                minifyJS: argv.mini,
                removeComments: argv.mini,
                collapseWhitespace: argv.mini,
                preserveLineBreaks: true
            }
        }),
        new HtmlWebpackPlugin({
            chunks: [],
            filename: 'bannerPage.html',
            template: './src/bannerPage.html',
            minify: {
                minifyCSS: argv.mini,
                minifyJS: argv.mini,
                removeComments: argv.mini,
                collapseWhitespace: argv.mini,
                preserveLineBreaks: true
            }
        }),
        new webpack.DefinePlugin({
            // 將 Environment Variables - 環境變數傳入
            'process.env': JSON.stringify({
                RELEASE: argv.release
            })
        })
    ],
    output: {
        libraryTarget: "umd", // 使用umd模塊可以直接嵌入網頁也可以由RequireJS動態載入
        // path: path.join(__dirname, "build", "1.0.0"),
        path: path.join(__dirname, "build"),
        publicPath: "",
        filename: 'js/[name].js',
        chunkFilename: "js/[name].[hash].js" // require.ensure動態產生的js會依照這規則
    },
    module: {
        noParse: [],
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }]
    },
    resolve: {
        alias: {},
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    }
};