const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const baseConfig = require('./webpack.config.base.js');

const config = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    // serverのルートパスを設定する
    publicPath: '/',
  },
  devServer: {
    contentBase: 'dist',
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    inline: true,
    overlay: true,
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new WebpackBuildNotifierPlugin({
      suppressSuccess: true,
      suppressWarning: true,
    }),
  ],
});

config.module.rules.push({
  test: /\.css$/,
  use: [
    'css-hot-loader',
    MiniCssExtractPlugin.loader,
    'css-loader',
  ],
});

config.module.rules.push({
  test: /\.(sass|scss)$/,
  use: [
    'css-hot-loader',
    // CSSをextractする
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        // 0 => no loaders (default);
        // 1 => postcss-loader;
        // 2 => postcss-loader, sass-loader
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        plugins: (loader) => [
          autoprefixer(),
          new IconfontWebpackPlugin(loader),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
    // ファイルを置かないとエラーになるので一旦とる
    // {
    //   loader: 'sass-resources-loader',
    //   options: {
    //     sourceMap: true,
    //     resources: [path.resolve('./src/css/resources/*.scss')],
    //   },
    // },
  ],
});

const ip = require('ip');
console.log(`External: http://${ip.address()}:${config.devServer.port}`);

module.exports = config;
