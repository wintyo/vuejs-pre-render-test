const path = require('path');
const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    index: [path.resolve(__dirname, './src/typescripts/entry.ts')],
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      // tsxはTypeScriptでサポートしていないので、ES6に変換してからBabelでトランスパイルする
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsxSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        oneOf: [
          // vueから呼ばれる場合
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          // その他（htmlWebpackPluginからとか）
          {
            use: [{
              loader: 'pug-loader',
              options: {
                pretty: true,
              },
            }],
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'materials/',
              publicPath: (url) => './materials/' + url,
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: (url) => './fonts/' + url,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src/typescripts/'),
      materials: path.resolve(__dirname, './src/materials/'),
      '~font-icons': path.resolve(__dirname, './src/font-icons/'),
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/pug/index.pug'),
      hash: true,
      inject: true,
    }),
    new StyleLintPlugin({
      configFile: path.resolve(__dirname, '.stylelintrc.yml'),
      files: ['**/*.scss', '**/*.vue'],
    }),
    new VueLoaderPlugin(),
  ],
};
