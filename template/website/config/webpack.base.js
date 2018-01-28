/*
 *@Description webpack module、plugins等核心配置文件
 *@Author lihuiwen
 *@Email 1361996625@qq.com
 *@Date 2018-01-13
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const rootPath = path.join(__dirname, '..');
const entryPath = path.join(__dirname, '../src/webapp/views');
const widgetPath = path.join(__dirname, '../src/webapp/widget');

//生产环境&开发环境基础配置项
//js入口文件 entris
const _jsEntris = fs.readdirSync(entryPath).reduce(function(o, filename) {
    if (!/\./.test(filename)) {
        var _fd = entryPath + '/' + filename;
        fs.readdirSync(_fd).map(function(ifilename) {
            (/.entry.(js)$/.test(ifilename)) && (o[ifilename.replace(/.entry.(js)/, '')] = path.join(entryPath, filename, ifilename));
        });
    }
    return o;
}, {});

//自动遍历全部Widget
const widgetPage = fs.readdirSync(widgetPath).reduce(function(o, filename) {
    if (!/\./.test(filename)) {
        const _fd = widgetPath + '/' + filename;
        fs.readdirSync(_fd).map(function(ifilename) {
            (/.html$/.test(ifilename)) && (o[ifilename.replace('.html', '')] = path.join(widgetPath, filename, ifilename));
        });
    }
    return o;
}, {});

// 自动编译views中的模板文件
const htmlChunks = {
    'index-index': ['vendor', 'common', 'index'],
};

const htmlPages = [];
fs.readdirSync(entryPath).map((filename) => {
    let firstDir = path.join(entryPath, filename);
    if (fs.statSync(firstDir).isDirectory()) {
        let pageDir = path.join(firstDir, './pages');
        fs.readdirSync(pageDir).map(htmlFile => {
            let matchName = htmlFile.match(/^(\w+)\.html$/);
            if (matchName) {
                matchName = matchName[1];
                let htmlFileName = matchName;
                matchName = filename + '-' + htmlFileName;
                htmlPages.push({
                    name: htmlFileName,
                    dir: path.join(`${filename}/pages`, htmlFileName),
                    chunks: htmlChunks[matchName],
                });
            }
        });
    }
});

const _entris = Object.assign(_jsEntris);
const _module = {
    rules: [{
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
            emitError: true,
        },
    }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
            loader: 'babel-loader',
            options: {
                presets: [['env',{
                    "modules":false  // tree shaking
                }]]
            }
        }]
    }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'postcss-loader'
            ]
        })
    }]
};
const _resolve = {
    extensions: ['.js']
}
const _devLoaders = _.clone(_module.rules);
const _prodLoaders = _.clone(_module.rules);

_devLoaders.push({
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    loader: 'file-loader?name=assets/images/[name].[ext]'
})
_prodLoaders.push({
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    loader: 'file-loader?name=assets/images/[name].[hash:5].[ext]'
})

const webpackConfig = {
    dev: {
        entry: _entris,
        module: {
            rules: _devLoaders
        },
        resolve: _resolve,
    },
    prod: {
        entry: _entris,
        module: {
            rules: _prodLoaders
        },
        resolve: _resolve
    },
    TemplatePage: widgetPage
};

module.exports = webpackConfig;
module.exports.rootPath = rootPath;
module.exports.htmlPages = htmlPages;