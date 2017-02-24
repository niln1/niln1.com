const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    home: './home.js',
  },
  output: {
    path: path.resolve(__dirname, './docs'),
    filename: '[name].js',
  },
};
