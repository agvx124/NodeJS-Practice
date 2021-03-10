require('dotenv').config();

const Koa = require('koa');
const Body = require('koa-body')({multipart: true});
const cors = require('koa-cors');
const Http = require('http');

const hostname = "10.80.163.40";
const port = "4000";

const apiRouter = require('./api');

const app = new Koa();
const server = Http.createServer(app.callback());

app.use(Body);
app.use(cors());
app.use(apiRouter.routes());

server.listen(port, hostname, () => {
    console.log("Server is listening on Host - " + hostname + " Port - " + port);
});


module.exports = server;