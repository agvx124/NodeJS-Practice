const Router = require('koa-router');
const apiRouter = new Router();

const v1Router = require('./v1');

apiRouter.use('/v1', v1Router.routes());

module.exports = apiRouter;