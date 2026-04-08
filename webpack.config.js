const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  // 根据环境变量设置模式
  // 开发模式下，webpack 会监听文件变化，当文件变化时，会自动重新编译。
  // 开发模式下，webpack 会输出更多调试信息。
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,
  // Source Map 配置：开发环境使用 eval-source-map，生产环境禁用（提升性能）
  entry: './src/login/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    clean: true
  },
  //加载器
  module: {
    rules: [
      //当css文件被引入时，使用MiniCssExtractPlugin.loader和css-loader
      {
        test: /\.css$/i,
        use: [process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', "css-loader"]
      },
      //当less文件被引入时，使用MiniCssExtractPlugin.loader和css-loader
      {
        test: /\.less$/i, // i 表示忽略大小写（case-insensitive），即匹配 .less、.LESS、.Less 等扩展名
        use: [process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', "css-loader", "less-loader"]

      },
      {
        // 匹配常见图片格式
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          // 输出的文件路径与名称
          filename: 'assets/[hash][ext][query]',
        }
      }
    ]
  },
  //插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/try1.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new webpack.DefinePlugin({
      // 定义环境变量
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  //优化
  optimization: {
    minimizer: [
      '...',// 保留默认的 JS 压缩
      new CssMinimizerPlugin()
    ]
  },
  //开发服务器配置
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    port: 8080
  },
  resolve: {
    // 配置路径别名，方便引入文件
    alias: {
      '@': __dirname + '/src'
    }
  }
}