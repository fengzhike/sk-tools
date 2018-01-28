/**
 *@Description 开发环境Webpack配置项
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlAfterPlugin = require("./htmlafteplugin")
const baseWebpackConfig = require('./webpack.base.js')
const htmlPages = baseWebpackConfig.htmlPages;
const StyleLintPlugin = require('stylelint-webpack-plugin');

// views htmlWebpackPlugin
const htmlPlugins = htmlPages.map(htmlPage => {
    let dirHtml = `${htmlPage.dir}.html`;
    return new HtmlWebpackPlugin({
        template: path.join(baseWebpackConfig.rootPath, './src/webapp/views/', dirHtml),
        inject: false,
        chunks: htmlPage.chunks,
        filename: `./views/${dirHtml}`,
    });
});

const options = {
    output: {
        path: path.join(__dirname, '../build/'),
        publicPath: '/',
        filename: 'assets/scripts/[name].bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'development'
            }
        }),
        new LiveReloadPlugin({
            appendScriptTag: true
        }),
        new ExtractTextPlugin("assets/styles/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'assets/scripts/[name].bundle.js'
        }),
        new StyleLintPlugin({
            files: '**/*.css',
            quiet: true,
            cache: true,
            fix: true
        }),
        new HtmlAfterPlugin(),
        ...htmlPlugins,
    ]
}

const _options = Object.assign(options, baseWebpackConfig.dev);
for (let i in baseWebpackConfig.TemplatePage) {
    _options.plugins.push(
        new HtmlWebpackPlugin({
            template: baseWebpackConfig.TemplatePage[i],
            filename: './widget/' + i + '/' + i + '.html',
            inject: false
        })
    )
};

module.exports = _options;