module.exports = function () {
    return {
        module: {
            rules: [{
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        removeComments: false,
                        collapseWhitespace: false
                    }
                }],
            }]
        }
    }
};
