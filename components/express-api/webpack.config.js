const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
    devtool: 'sourcemap',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts*$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',

                options: {
                    presets: ['env']
                }
            }
        ]
    },

    resolve:{
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins:[new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
    },

    plugins: [
        new CheckerPlugin(),
        // new UglifyJSPlugin()
    ],

    entry: './server.ts',

    output: {
        filename: 'index.js',
        chunkFilename: 'index.js',
        path: path.resolve(__dirname, '../../dist/express-api')
    },

    // mode: 'production',
    mode: 'development',

    // externals: ['express'],
    // node:{
    //     fs: 'empty',
    //     net: 'empty'
    // }
};
