import indexModel from '../models/IndexModel';
import config from '../config/config';

const  indexController =  {
	index(){
		return  async(ctx, next) => {
			const indexM = new indexModel(ctx);
			// const _data = await indexM.getdata()
			ctx.body = await ctx.render('index/pages/index.html',{
				title: 'index-title',
				content: 'this is a demo',
				message: "hello"
			})
		}
	}
}
export
default indexController;