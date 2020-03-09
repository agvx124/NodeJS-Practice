const model = require("../../../model/index");

exports.getNoticeBoard = async (ctx) => {
    try {
        const noticeBoard = await model.getNoticeBoard();

        ctx.status = 200;
        ctx.body = {
            status: 200,
            message: '공지사항 목록 조회 성공',
            data: noticeBoard
        };
    }
    catch (ex) {
        ctx.status = 500;
        ctx.body = {
            status: 500,
            message: '서버 오류',
        };

        console.log(ex);
    }
}

exports.postNoticeBoard = async (ctx) => {
    try {
        const body = ctx.request.body;

        if (body.title == null || body.content == null || body.writer == null) {
            ctx.status = 401;
            ctx.body = {
                status: 401,
                message: '입력하지 않은 정보가 있습니다.'
            }
            return;
        }

        model.noticeBoard.create({
            title: body.title,
            content: body.content,
            writer: body.writer
        });

        ctx.status = 200;
        ctx.body = {
            status: 200,
            message: '공지사항 생성 성공',
            data: {
                title: body.title,
                content: body.content,
                writer: body.writer
            }
        }
    } 
    catch (ex) {
        ctx.status = 500;
        ctx.body = {
            status: 500,
            message: '서버 오류'
        };
    }
}