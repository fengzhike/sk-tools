import Koa from 'koa';
import router from 'koa-simple-router';
import co from 'co';
import path from 'path';
import render from 'koa-swig';
import server from 'koa-static';
import config from './config/config.js';
import log4js from 'log4js';
import InitController from './controllers/InitController';
import errorHandler from './meddleware/errorHandler';

import { createContainer } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';

const app = new Koa();
const logDir = path.join(__dirname, 'logs') //配置目标路径 logs

const container = createContainer();
container.loadModules(['models/*.js']);
app.use(scopePerRequest(container));

app.use(server(config.staticDir));
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls: ['[[', ']]'],
    writeBody: false
}));

log4js.configure({
    appenders: {
        index: {
            type: 'dateFile',
            filename: logDir + '/log4',
            "maxLogSize": 1024,
            "backups":3,
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd.log"
        }
    },
    categories: {
        default: {
            appenders: ['index'],
            level: 'debug'
        }
    }
});
const logger = log4js.getLogger('index');
app.context.logger = logger;
logger.info('server started')
// 初始化所有路由
InitController.init(app, router);
errorHandler.error(app); //处理页面错误的处理句柄
// 初始化所有路由 ctx 上下文顺利传输
// app.use(loadControllers('routes/*.js', { cwd: __dirname }))

app.listen(config.port, () => {
    console.log('Server is start, listening on port %s', config.port);
});
