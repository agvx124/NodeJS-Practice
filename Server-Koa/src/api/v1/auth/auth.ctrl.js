const model = require("../../../model/index");
const token = require("../../../lib/token");
const sha256 = require('sha256');

const {SALT: salt} = process.env;

exports.postLogin = async (ctx) => {
    try {
        const body = ctx.request.body;

        console.log(body.id);
        if (body.id == null || body.pw == null) {
            ctx.status = 400;
            ctx.body = {
                status: 400,
                message: '아이디 또는 비밀번호를 입력하지 않았습니다.'
            }
            return;
        }
    
        let user = await model.user.findOne({
            where: {
                id: body.id
            }
        });
        
        if (user == null || user.pw != sha256(body.pw + salt)) {
            ctx.status = 401;
            ctx.body = {
                status: 401,
                message: '아이디 또는 비밀번호가 일치하지 않습니다.'
            }
            return;
        }
        else {
            ctx.status = 200;
            ctx.body = {
                status: 200,
                message: '로그인에 성공하였습니다.',
                data: {
                    name : user.name,
                    token: token.issueToken(body.id)
                }
            }
            return;
        }
    }
    catch (ex) {
        ctx.status = 500;
        ctx.body = {
            status: 500,
            message: '서버 오류'
        };
        console.log(ex);
    }
}

exports.postRegister = async (ctx) => {
    try {
        const body = ctx.request.body;
        let user = await model.user.findOne({
            where: {
                id: body.id
            }
        });

        if (body.id == null || body.pw == null || body.name == null) {
            ctx.status = 400;
            ctx.body = {
                status: 400,
                message: '입력하지 않은 정보가 있습니다.'
            }
            return;
        }
        else if (user) {
            ctx.status = 409;
            ctx.body = {
                status: 409,
                message: '이미 해당 아이디로 가입된 회원이 있습니다.'
            }
            return;
        }

        model.user.create({
            id: body.id,
            pw: sha256(body.pw + salt),
            name: body.name
        });

        ctx.status = 200;
        ctx.body = {
            status: 200,
            message: '회원가입 성공!',
            data: {
                id: body.id,
                name: body.name
            }
        }


    }
    catch (ex) {
        ctx.status = 500;
        ctx.body = {
            status: 500,
            message: '서버 오류'
        };
        console.log(ex);
    }

}

exports.putPwChange = async (ctx) => {
    try {
        const body = ctx.request.body;

        let user = await model.user.findOne({
            where : {
                id : body.id
            }
        });

        if (body.id == null || body.pw == null || body.pwChange == null) {
            ctx.status = 400;
            ctx.body = {
                status: 400,
                message: '입력하지 않은 정보가 있습니다.'
            }
            return;
        }
        else if (user == null) {
            ctx.status = 404;
            ctx.body = {
                status: 404,
                message: '해당 사용자가 없습니다.'
            }
            return;
        }
        else if (body.pw == body.pwChange) {
            ctx.status = 406;
            ctx.body = {
                status: 406,
                message: '이전 비밀번호와 변경할 비밀번호가 같습니다.'
            }
            return;
        }
    
        model.user.update({
            pw : sha256(body.pwChange + salt)
        }, {
            where : {
                id : body.id
            }
        });

        ctx.status = 200;
        ctx.body = {
            status : 200,
            message: '비밀번호 변경 성공!'
        }

    }
    catch (ex) {
        ctx.status = 500;
        ctx.body = {
            status: 500,
            message: '서버 오류'
        }
        console.log(ex);
    }
}