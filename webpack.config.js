const webpack = require('webpack');

const config = {

	entry: ['babel-polyfill', './src/app.js'],
	output: {
		path: './dist',
		filename: 'app.bundle.js',
	},
	module: {

    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    }],

    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'source-map';

} else {

  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ];
}

module.exports = config;
