const Router = require('koa-router');
const userCtrl = require('./user.ctrl');

const usersRouter = new Router();

usersRouter.get('/', userCtrl.getUsers);
usersRouter.get('/:id', userCtrl.getUser);
usersRouter.post('/', userCtrl.postUser);
usersRouter.delete('/:id', userCtrl.deleteUser);

module.exports = usersRouter;
