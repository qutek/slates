const webpack = require('webpack');
const { rules, alias } = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  externals: {
    slates: 'slates',
  },
  resolve: { alias },
  module: {
    rules,
  },
  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new webpack.DefinePlugin({
      IS_DEV: 'dev' === process.env.NODE_ENV || false,
    })
  ]
};
