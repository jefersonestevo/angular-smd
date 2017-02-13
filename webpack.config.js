var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require('path');
var _root = path.resolve(__dirname, '.');
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}
exports.root = root;

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor-3thparty': './src/vendor-3thparty.ts',
        'vendor-ng': './src/vendor-angular.ts',
        'app': './src/main.ts'
    },
    resolve: {
        extensions: ['', '.js', '.ts', '.scss']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'babel-loader?presets[]=es2015!awesome-typescript-loader!angular2-template-loader'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets_[name].[hash].[ext]'
            },
            {
                test: /\.scss$/,
                exclude: root('src'),
                loader: 'style!css!sass?sourceMap'
            },
            {
                test: /\.scss$/,
                include: root('src'),
                loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
            },
            {
                test: /\.css$/,
                exclude: root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: root('src', 'app'),
                loader: 'raw'
            }
        ]
    },
    devtool: 'eval-source-map',
    output: {
        path: root('dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor-ng', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'VERSION': new Date().getTime()
            }
        })
    ],
    devServer: {
        compress: true,
        historyApiFallback: true,
        stats: 'minimal',
        port: 9000,
        watchOptions: {
            aggregateTimeout: 2000,
            poll: 2000
        }
    }
};


