const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const baseConfig = require('./webpack.config.base.js');

// ディレクトリを作っておく
const fx = require('mkdir-recursive');
fx.mkdir(path.resolve(__dirname, './dist/templates'), (err) => {
  if (err) {
    console.error(err);
  }
});

const config = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('./dist'),
    // HTMLにinjectionするパスを相対パスで設定する
    publicPath: './',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('staging'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new WebpackBuildNotifierPlugin({
      suppressSuccess: true,
      suppressWarning: true,
    }),
  ],
});

// 本番は別ファイルに出力して、element IDだけセットする
config.module.rules.push({
  resourceQuery: /blockType=html/,
  use: [
    {
      loader: require.resolve('./custom-loaders/dom-injection-loader'),
    },
    {
      loader: 'extract-loader',
    },
    {
      loader: 'html-loader',
    },
  ],
});

config.module.rules.push({
  test: /\.css$/,
  use: [
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
          new IconfontWebpackPlugin(loader),
          autoprefixer({
            browsers: [
              'last 2 version',
              'IE 11',
            ],
          }),
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
    // // ファイルを置かないとエラーになるので一旦とる
    // {
    //   loader: 'sass-resources-loader',
    //   options: {
    //     sourceMap: true,
    //     resources: [path.resolve('./src/css/resources/*.scss')],
    //   },
    // },
  ],
});

module.exports = config;
