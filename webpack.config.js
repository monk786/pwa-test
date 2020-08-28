const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

const modeConfig = env => require(`./build-utils/webpack.${env.mode}.js`)(env);
const loadPresets = require('./build-utils/loadPresets');

module.exports = ({ mode, presets }) => {
    return merge(
        {
            mode,
            plugins: [
                new CleanWebpackPlugin(),
                new webpack.ProgressPlugin(),
                new HtmlWebpackPlugin({
                    filename: 'index.html',
                    template: './src/index.html',
                }),
                new CopyWebpackPlugin({
                   patterns: [
                        { from: 'src/img', to: 'img/',},
                        'src/manifest.webmanifest',
                    ],
                }),
                    
            ]
        },
        modeConfig({ mode }),
        loadPresets({ mode, presets }),
    );
};
