import IndexController from './IndexController';
const InitController = {
	init (app,router){
		app.use(router(_ =>{
			_.get('/',IndexController.index())
		}))
	}
}

export default InitController;