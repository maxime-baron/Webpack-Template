const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: path.resolve(__dirname, '../src/index.js'),
    output:
    {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins:
        [
            //Copier le new HtmlWebpackPlugin pour ajouter des pages
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/index.html'),
                minify: true
            }),
            new MiniCssExtractPlugin(),
            new CopyWebpackPlugin(
            {
                patterns:
                [
                    { from: 'static' }
                ]
            }
            ),
        ],
    module:
    {
        rules:
            [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use:
                        [
                            'babel-loader'
                        ]
                },
                {
                    test: /\.css$/,
                    use:
                        [
                            MiniCssExtractPlugin.loader,
                            'css-loader'
                        ]
                },
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    type: 'asset/resource',
                    generator:
                    {
                        filename: 'assets/images/[hash][ext]'
                    }
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    type: 'asset/resource',
                    generator:
                    {
                        filename: 'assets/fonts/[hash][ext]'
                    }
                },
                {
                    test: /\.html?$/,
                    use:
                        [
                            'html-loader'
                        ]
                },
                {
                    test: /\.styl$/,
                    use:
                        [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'stylus-loader'
                        ]
                }
            ]
    }
}