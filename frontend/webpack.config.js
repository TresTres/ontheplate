const path = require('path');
const HTMLplugin = require('html-webpack-plugin');
const rules = [
	{
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			query: {
				presets: ['@babel/react']
			}
		}
	},
	{
		test: /\.css$/,
		exclude: /node_modules/,
		use: ["style-loader", "css-loader"]
	},
	{
		test: /\.(png|jpg|jpeg|gif|ico)$/,
		exclude: /node_modules/,
		use: ['file-loader?name=[name].[ext]']
	}
];

module.exports = {
	entry: path.join(__dirname, 'src', 'index.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './build'),
		publicPath: '/'
	},
	module: {rules},
	plugins: [
		new HTMLplugin({
			template: './public/index.html',
			filename: './index.html',
		})
	],
	resolve: {
		modules: [__dirname, 'src', 'node_modules'],
		extensions: ['*', '.js', '.jsx']
	},
	devServer: {
		historyApiFallback: true,
		port: 3000
	}
};
