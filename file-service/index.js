const koa = require('koa');
const app = new koa();
const fs = require('fs');
const koaBody = require('koa-body')
const views = require('koa-views')
const static = require('koa-static')
app.use(views(__dirname + '/views'))
app.use(static(__dirname + '/static'))
// 允许接收文件上传
app.use(koaBody({
    multipart: true
}))



app.listen('7777', () => {
    console.log('服务已开启!')
})