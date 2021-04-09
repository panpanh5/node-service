const koa = require('koa');
const app = new koa();
const Router = require('koa-router');
const cors = require('koa2-cors')
const body = require('koa-body')
const static = require('koa-static')
const fs = require('fs')
const router = new Router();
router.get('/testXhr', (ctx) => {
    ctx.body = {
        code: '0',
        msg: '成功!'
    }
})

app.use(static(__dirname + '/static'))
router.post('/addFile', (ctx) => {
    let file = ctx.request.files.file
    if (!fs.existsSync('static/uploadFiles')) {
        // 如果不存在就创建该文件夹
        fs.mkdirSync('static/uploadFiles')
    }
    fs.writeFileSync('static/uploadFiles/' + file.name)
    console.log('/uploadFiles/' + file.name);
    ctx.body = {
        code: '0',
        msg: '成功!'
    }
})


app.use(body({
    multipart: true
}))
app.use(cors())
app.use(router.routes());
app.listen(7777, () => {
    console.log('服务器开启!')
})