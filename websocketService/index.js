// 利用websocket通信
// 1.轮询  客户端每0.5秒去请求api看有无新的数据
// 2.sse
// 3.websocket

// websocket
const WebSocketServer = require("ws").Server,
  Wss = new WebSocketServer({ port: 8081 });
Wss.on("connection", function (ws) {
  ws.on("message", function (message) {
    //监听接收的数据
    console.log(message);
  });
  // setInterval(() => {
  let somedata = {
    name: "张三",
    age: 20,
  };
  ws.send(JSON.stringify(somedata));
});
