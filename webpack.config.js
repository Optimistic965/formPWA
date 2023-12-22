const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/scripts/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[name].[hash][ext][query]',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        port: 3030,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    }
}