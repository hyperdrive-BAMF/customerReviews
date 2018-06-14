const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const rootDir = __dirname;
const srcDir = path.join(rootDir, 'client', 'src');
const distDir = path.join(rootDir, 'client', 'dist');

module.exports = {
  entry: path.join(srcDir, 'index.jsx'),
  output: {
    path: distDir,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [path.join(rootDir, 'node_modules'), path.join(rootDir, 'server')],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss']
  },
  plugins: [
    new CleanWebpackPlugin([distDir])
  ]
};
