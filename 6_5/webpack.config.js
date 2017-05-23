const { resolve } = require("path");
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

    entry: {
		//polyfills: "babel-polyfill",
        app: "./src/js/scripts.js"
    },

    output: {
        path: resolve(__dirname + "/dist/js/"),
        filename: "[name].js"
    },
	
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
			// sourceMap: false,
            // compress: {
            //     warnings: false
            // },
			// extractComments: true
        })
	],	

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: ["transform-runtime"],
                        presets: ["es2015"]
                    }
                }
            }
        ]
    }

};