const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.tsx',
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx', '.mjs'],
    mainFields: ['main', 'module'],
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        TEST_USER: JSON.stringify(process.env.TEST_USER),
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/components/index.html',
    }),
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    inline: true,
    port: 9000,
    historyApiFallback: true,
  },
};
