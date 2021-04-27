const koa = require('koa');
const app = new koa();
const _ = require('underscore');
const http = require('http').createServer(app)
const io = require('socket.io')(http, { cors: true })
io.on('connection', (socket) => {
    socket.join('room 237', () => {
        let rooms = Objects.keys(socket.rooms);
        console.log(rooms); // [ <socket.id>, 'room 237' ]
    });
    // socket.emit("clientId", { clientId: socket.id });
    // socket.on('chatMessage', (data) => {
    //     console.log(data)
    //     const targetSocket = io.sockets.sockets.get(data.id)
    //     // console.log(targetSocket)
    //     targetSocket.broadcast.emit('send', {
    //         id: socket.id,
    //         message: data.content
    //     })
    // })
    // socket.emit('news', '数据')
})

http.listen('8082', () => {
    console.log('服务开启')
})