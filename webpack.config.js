const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // 配置多入口的（分离自定义与基本库）
    entry: {
    	app: path.resolve(__dirname, 'src/app/main.js'),
    	vendors: path.resolve(__dirname, 'src/vendors/vendors.js')
    },

    output: {
    	filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devtool: 'eval-source-map',

    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "es2015", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
    	new CleanWebpackPlugin(['dist']),
    	new webpack.optimize.ModuleConcatenationPlugin(),
    	new HtmlWebpackPlugin({
		    template: path.resolve(__dirname, 'src/index.html'),
		    filename: 'index.html',
		    inject: 'body'
	  	})
    ],
};