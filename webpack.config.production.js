const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const IconfontWebpackPlugin = require('iconfont-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PrerenderSPAPlugin = require('prerender-spa-plugin');

// モジュールサイズをブラウザで確認するかのフラグ
const isAnalyze = process.env.ANALYZE_ENV === 'analyze';

const baseConfig = require('./webpack.config.base.js');

const BASE_URL = '/vuejs-pre-render-test';

const config = merge(baseConfig, {
  mode: 'production',  // ビルドモード：'development': ミニファイなし, 'production': ミニファイあり
  // devtool: 'inline-source-map',  // ソースマップつけたい場合
  output: {
    path: path.resolve(__dirname, `./dist/${BASE_URL}`),
    publicPath: `${BASE_URL}/`,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      outputDir: path.join(__dirname, `dist/${BASE_URL}`),
      indexPath: path.join(__dirname, `dist/${BASE_URL}/index.html`),
      // routesはindexPathを起点にするのでBASE_URLはつけない
      routes: ['/', '/test', '/page/1', '/page/2'],
      renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
        renderAfterDocumentEvent: 'custom-render-trigger',
        // renderAfterTime: 5000,
        // 設定するとエラーになってしまう
        // headless: false,
      }),
    }),
    isAnalyze ? new BundleAnalyzerPlugin() : null,
  ].filter((plugin) => !!plugin),
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
    // CSSをextractする
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        // 0 => no loaders (default);
        // 1 => postcss-loader;
        // 2 => postcss-loader, sass-loader
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: (loader) => [
          new IconfontWebpackPlugin(loader),
          autoprefixer(),
          cssnano(),
        ],
      },
    },
    {
      loader: 'sass-loader',
    },
    // ファイルを置かないとエラーになるので一旦とる
    // {
    //   loader: 'sass-resources-loader',
    //   options: {
    //     resources: [path.resolve('./src/css/resources/*.scss')],
    //   },
    // },
  ],
});

module.exports = config;
