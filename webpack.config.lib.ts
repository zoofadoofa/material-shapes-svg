const webpack = require('webpack');
const path = require('path');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const nodeExternals = require('webpack-node-externals');

module.exports = () => {
    const config = {
        entry: {
            'material-shapes-svg': './src/index.ts',
            'material-shapes-svg.min': './src/index.ts',
        },
        output: {
            path: path.resolve(__dirname, './build/_publish/bundles'),
            filename: '[name].js',
            libraryTarget: 'umd',
            library: 'material-shapes-svg'
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        externals: [
            nodeExternals()
        ],
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test:/\.ts$/,
                    use: [
                        {
                            loader: 'awesome-typescript-loader',
                            options: {
                                configFileName: 'tsconfig.lib.json'
                            }
                        }
                    ],
                    exclude: [
                        /node_modules/
                    ]
                },
                {}
            ]
        },
        plugins: [
            // new webpackBundleAnalyzer(),
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                sourceMap: true
            })
        ]
    };
    return config;
}