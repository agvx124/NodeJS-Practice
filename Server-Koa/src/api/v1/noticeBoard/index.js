const Router = require('koa-router');
const noticeBoardCtrl = require('./noticeBoard.ctrl');

const noticeBoardRouter = new Router();

noticeBoardRouter.get('/', noticeBoardCtrl.getNoticeBoard);
noticeBoardRouter.post('/', noticeBoardCtrl.postNoticeBoard);

module.exports = noticeBoardRouter;