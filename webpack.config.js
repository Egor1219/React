var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var settings = {
	plugins: [new webpack.HotModuleReplacementPlugin(),
	    new ExtractTextPlugin('./assets/css/global.min.css', {
	        allChunks: true
	    })
	],
	module: ["es2015", "react"]
}

module.exports = {
    entry: {
        bundle: "./src/react/App.jsx"
    },
    output: {
   	path: __dirname ,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
               loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                   presets: settings.module
                }
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-raw-loader!autoprefixer!sass-loader')
            }
        ]
    },
    plugins: settings.plugins,
    sassLoader: {
        includePaths: ['src/scss']
    },
    devServer: {
         hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 4000,
        historyApiFallback: true
    }
};
