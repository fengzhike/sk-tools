/**
 *@Description 生产环境Webpack配置项
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlAfterPlugin = require("./htmlafteplugin")
const baseWebpackConfig = require('./webpack.base.js')
const htmlPages = baseWebpackConfig.htmlPages;
const ImageminPlugin = require('imagemin-webpack-plugin').default;
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
        filename: 'assets/scripts/[name].[chunkhash:5].bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        new LiveReloadPlugin({
            appendScriptTag: true
        }),
        new ExtractTextPlugin("assets/styles/[name].[chunkhash:5].css"),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minify: {
                collapseWhitespace: true
            },
            filename: 'assets/scripts/[name].[chunkhash:5].bundle.js'
        }),
        new ImageminPlugin({ 
            test: /\.(jpe?g|png|gif|svg)$/i,
            optipng: {
                optimizationLevel: 9,
            },
        }),
        new StyleLintPlugin({
            files: '**/*.css',
            quiet: true,
            cache: true,
            fix: true
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告  
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            }
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