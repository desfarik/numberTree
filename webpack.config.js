const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const htmlLoader = require('./webpack/html.loader');

const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build')
};

const common = merge([
    {
        entry: PATHS.source + '/index.js',
        output: {
            path: PATHS.build,
            filename: '[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: PATHS.source + '/index.html'
            })
        ]
    },
    htmlLoader()
]);

module.exports = function(env) {
    if (env === 'production'){
        return merge([
            common,
            extractCSS()
        ]);
    }
    if (env === 'development'){
        return merge([
            common,
            devserver(),
            sass(),
            css()
        ])
    }
};










