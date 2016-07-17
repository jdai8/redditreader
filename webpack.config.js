module.exports = {
	entry: ['babel-polyfill', './src/app.js'],
	output: {
		path: './dist',
		filename: 'app.bundle.js',
	},
  eslint: {
    fix: true
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
      // {
      //   test:/\.css$/,
      //   exclude: /node_modules/,
      //   loader: 'style-loader!css-loader',
      // }
    ],
  },
  devtool: 'source-map',
}
