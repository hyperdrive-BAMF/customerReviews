const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');
const rootDir = __dirname;
const srcDir = path.join(rootDir, 'client', 'src');
const distDir = path.join(rootDir, 'client', 'dist');

module.exports = {
  entry: path.join(srcDir, 'index.js'),
  output: {
    path: distDir,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [path.join(rootDir, 'node_modules'), path.join(rootDir, 'server')],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([distDir])
  ]
};
