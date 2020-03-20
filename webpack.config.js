const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const buildDir = "build";

module.exports = {
    entry: "./client/src/index.js",
    output: {
        path: path.join(__dirname, buildDir),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/react',
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:3]',
                              },
                            sourceMap: true,
                        }
                    }
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    devServer: {
        port: 3000,
        open: true,
        proxy: {
            "/api": "http://localhost:8080"
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './client/public/index.html',
            favicon: './client/public/favicon.ico'
        }),
        new NodemonPlugin({
            script: './server/index.js',
            watch: path.resolve('./server'),
        })
    ]
};