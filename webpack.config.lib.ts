const webpack = require('webpack');
const path = require('path');

module.exports = () => {
    const config = {
        entry: {
            'material-shapes-svg': './build/src/index.ts',
            'material-shapes-svg.min': './build/src/index.ts',
        },
        output: {
            path: path.resolve(__dirname, './bundles'),
            filename: '[name].js',
            libraryTarget: 'umd',
            library: 'material-shapes-svg'
        },
        resolve: {
            extensions: ['.ts', '.js', '.scss'],
        },
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
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                sourceMap: true
            })
        ]
    };
    return config;
}