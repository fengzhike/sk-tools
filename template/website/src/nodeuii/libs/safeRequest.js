import axios from 'axios';
import config from '../config/config';
export
default class SafeRequest {
    constructor(ctx, url, data) {
        this.ctx = ctx;
        this.url = url;
        this.data = data;
    }
    request() {
        const options = {
            method: 'post',
            url: config.apiUrl + this.url,
            data: this.data,
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        }
        return new Promise((resolve, reject) => {
            (async() => {
                await axios(options).then(function(result) {
                    const resp = result;
                    // console.log('输出结果', resp);
                    resolve({
                        msg: "success",
                        error_code: 0,
                        result: resp.data
                    });
                }).catch(function(err) {
                    // this.ctx.logger.error(err);
                    reject({
                        msg: "error",
                        error_code: 1,
                        result: err
                    });
                });
            })();
        });
    }
};