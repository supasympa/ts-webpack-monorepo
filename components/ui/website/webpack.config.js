const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	module: {
		rules: [
			{
				test: /\.ts*$/,
				exclude: /node_modules/,
				loader: 'awesome-typescript-loader',

				options: {
					presets: ['env']
				}
			}
		]
	},

	resolve:{
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
		plugins:[new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
	},

	plugins: [
    new CheckerPlugin(),
		new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],

  entry: './src/index.ts',

	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, '../../../dist/ui/website')
	},

	mode: 'production'
};
