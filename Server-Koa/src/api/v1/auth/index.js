const Router = require('koa-router');
const authCtrl = require('./auth.ctrl');

const authRouter = new Router();

authRouter.post('/login', authCtrl.postLogin);
authRouter.post('/register', authCtrl.postRegister);
authRouter.put('/pwchange', authCtrl.putPwChange);

module.exports = authRouter