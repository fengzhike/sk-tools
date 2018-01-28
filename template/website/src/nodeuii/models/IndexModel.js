import config from '../config/config';
import safeRequest from '../libs/safeRequest';
class IndexModel {
    constructor(ctx) {
        this.ctx = ctx;
    }
    getdata() {
        const safeRequestIns = new safeRequest(this.ctx, config.getTest, {});
        return safeRequestIns.request();
    }
}
export default IndexModel;