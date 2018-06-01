const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',

      options: {
        presets: ['env']
      }
    }]
  },

  plugins: [new UglifyJSPlugin()],
  entry: './lib/index',

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    alias: {
      "@foo/bar": "./bar",
      "@foo/baz": "./baz"
    }
  },

  mode: 'production'
};
