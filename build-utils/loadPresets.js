const workboxPlugin = require('workbox-webpack-plugin');

module.exports = () => ({
    plugins:[
        new workboxPlugin.InjectManifest({
            swSrc: './src/sw.js'
        })
    ]
})