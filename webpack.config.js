const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

module.exports = ({mode}) => {
    return {
        mode,
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
            }),
            new CopyWebpackPlugin(
                [{ from: 'src/img', to: 'img/' },
                'src/manifest.webmanifest'],
                { ignore: ['.DS_Store']})
        ]
    };
};