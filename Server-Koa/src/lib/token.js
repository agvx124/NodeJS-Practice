// require('dotenv').config();

const jwt = require('jsonwebtoken');

const {JWT_SECRET_KEY : jwt_secret} = process.env;

exports.issueToken = (id) => {
    let token = jwt.sign({
        id: id
    },
    jwt_secret, {
        expiresIn: '30m'
    });

    return token;
}