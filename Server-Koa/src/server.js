require('dotenv').config();

const Koa = require('koa');
const Body = require('koa-body')({multipart: true});
const cors = require('koa-cors');
const Http = require('http');

const apiRouter = require('./api');

const app = new Koa();
const server = Http.createServer(app.callback());

app.use(Body);
app.use(cors());
app.use(apiRouter.routes());

server.listen(5000, () => {
    console.log("Server is listening on port 5000");
});


module.exports = server;