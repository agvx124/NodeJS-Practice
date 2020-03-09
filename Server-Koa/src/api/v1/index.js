const Router = require('koa-router');

const usersRouter = require('./users');
const authRouter = require('./auth');
const noticeBoardRouter = require('./noticeBoard');

const v1Router = new Router();

v1Router.use('/users', usersRouter.routes());
v1Router.use('/auth', authRouter.routes());
v1Router.use('/noticeBoard', noticeBoardRouter.routes());

module.exports = v1Router;
