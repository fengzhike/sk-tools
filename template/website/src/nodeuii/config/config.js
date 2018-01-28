import _ from 'lodash';
import local from './local';
import path from 'path';

const server = {
    //端口号配置
    "port": 80,
    "apiUrl": "http://localhost:3000",
    "getTest":"/test"
};
let config = {
    //开发环境
    "env": process.env.NODE_ENV,
    //模板所在的目录
    "viewDir": path.join(__dirname, '..', 'views'),
    //静态文件所在的目录
    "staticDir": path.join(__dirname, '..'),
};
if (config.env == 'production') {
    config = _.extend(config, server)
} else {
    config = _.extend(config, local)
}

export default config;