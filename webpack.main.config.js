const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { rules, alias } = require('./webpack.rules');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  resolve: { alias },
  module: {
    rules,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets'),
          to: path.resolve(__dirname, '.webpack/assets')
        },
      ],
    }),
  ]
};
