var path  = require('path'),
    HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
  entry: {
    app:  './src/js/app.ts',
    otherPage: './src/js/otherPage.ts'
  },
  externals: {},
  plugins: [
    // html-webpack-plugin可以做很細微的操作，可以參考官方文件
    new HtmlWebpackPlugin(
    {
        release: process.env.RELEASE === "1",
        chunks: ['app'], // 指定對應到的entry為app
        filename : 'Default.html',
        template : './src/Default.html',
        inject: 'body',
        hash: true,
        minify: {
          minifyCSS: true,
          minifyJS: false,
          removeComments: true,
          collapseWhitespace: true, preserveLineBreaks:true
        }
    }),
    new HtmlWebpackPlugin(
    {
        release: process.env.RELEASE === "1",
        chunks: ['otherPage'], // 指定對應到的entry為otherPage
        filename : 'otherPage.html',
        template : './src/otherPage.html',
        inject: 'body',
        hash: true,
        minify: {
          minifyCSS: true,
          minifyJS: false,
          removeComments: true,
          collapseWhitespace: true, preserveLineBreaks:true
        }
    })
  ],
  output: {
    // path: path.join(__dirname, "build", "1.0.0"),
    path: path.join(__dirname, "build"),
    publicPath: "",
    filename: 'js/[name].js',
    chunkFilename: "js/[name].[hash].js"  // require.ensure動態產生的js會依照這規則
  },
  module: {
    noParse: [],
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  resolve: {
    alias: {},
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  }
};