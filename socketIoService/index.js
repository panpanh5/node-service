const koa = require('koa');
const app = new koa();
const Router = require('koa-router')
const router = new Router()
const static = new require('koa-staic')
app.use(static(__dirname + './static'))
const views = new require('koa-views')
app.use(views(__dirname + './views'))
const server = require('http').createServer(app.callback())
const io = require("socket.io")(server);
// 建立连接
io.on('connection', (socket) => {
    socket.on(() => {
        
    })
    
})
app.use(router.routes());
app.listen(7777, () => {
    console.log('服务器已开启!')
})