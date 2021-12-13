const webpack = require('webpack');

const webpackConfig = {
    entry: "./src/js/index.js",

    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/assets/js/"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/,
                options: {
                    compact: true
                }
            },
            {
                test: /\.js$/,
                loader: 'imports-loader?define=>false'
            }
        ]
    },

    resolve: {
        modules: ['./src/js', 'node_modules']
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],

    mode: "development",
    devtool: "source-map"
};

module.exports = webpackConfig;
