const model = require("../../../model/index");

exports.getUsers = async (ctx) => {
    const users = await model.getUser();
    try {
        ctx.status = 200;
        ctx.body = {
            status: 200,
            message: '사용자 목록 조회 성공',
            data: users,
        };
    }
    catch(ex) {
        ctx.status = 500;
        ctx.body = {
            status: 500,
            message: '서버 오류',
        };

        console.log(ex);
    }
};

exports.getUser = async (ctx) => {
    try {
        const id = parseInt(ctx.params.id, 10);
        if (!id) {
            ctx.status = 400;
            ctx.body = {
                status: 400,
                message: 'ID가 입력되지 않았습니다'
            }
            return;
        }
        
        console.log(id);
        let user = await model.user.findOne({
            where : {
                id : id,
            }
        });


        if (!user) {
            ctx.status = 404;
            ctx.body = {
                status: 404,
                message: '입력된 정보가 없습니다.'
            };
            return;
        }
        ctx.status = 200;
        ctx.body = {
            status: 200,
            message: '사용자 목록 조회 성공!',
            data: user
        }
    }
    catch (ex) {
        ctx.status = 500;
        ctx.body = {
            status: 500,
            message: '서버 오류',
        };
    }
};

exports.postUser = async (ctx) => {
    try {
        const users = await model.getUser();
        const body = ctx.request.body;
        console.log(body);

        if(body.name == null) {
            ctx.status = 400;
            ctx.body = {
                status: 400,
                message: '이름이 없습니다.'
            }
            return;
        }

        const id = users.reduce((maxId, user) => {
            return parseInt(user.id) > maxId ? parseInt(user.id) : maxId
        }, 0) + 1;


        const newUser = {
            id : id,
            name: body.name
        };

        model.user.create({
            id: id,
            pw: 'test',
            name: body.name
        });

        ctx.status = 200;
        ctx.body = {
            status: 200,
            message: '사용자 추가 성공!',
            data: newUser
        }
    }
    catch(ex) {
        ctx.status = 500;
        ctx.body = {
            status: 500,
            message: '서버 오류'
        };
    }
};

exports.deleteUser = async (ctx) => {
    try {
        const id = parseInt(ctx.params.id, 10);
        if (!id) {
            ctx.status = 400;
            ctx.body = {
                status: 400,
                message: 'ID가 입력되지 않았습니다'
            }
            return;
        }

        model.user.destroy({
            where: {
                id: id
            }
        }).then(() => {
            
        });

        ctx.status = 200;
        ctx.body = {
            status: 200,
            message: '사용자가 삭제되었습니다.'
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