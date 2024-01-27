const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/app.js",
	output: {
		path: path.join(__dirname, "/"),
		filename: "js/app.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "."),
		},
		compress: true,
		port: 9000,
	},
};
