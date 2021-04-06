const koa = require("koa");
const app = new koa();
const Router = require("koa-router");
const router = new Router();
const static = require("koa-static");
app.use(static(__dirname + "/static"));
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server,{ cors: true });
io.on("connection", (socket) => {
    console.log('服务端接收到的数据')

});

app.use(router.routes());
server.listen("7777", () => {
  console.log("服务器开启!");
});
