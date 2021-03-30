const koa = require("koa");
const app = new koa()
const Router = require("koa-router")
const views = require("koa-views")
const router = new Router()
const data = require('./data')
const fs = require("fs")
const cheerIo = require("cheerio")
// 中间件都要调用一下
app.use(views(__dirname, {
    extension: 'html'
}))
router.get('/', async (ctx, next) => {
    // ctx.body = '你好啊'
    // console.log(data)
    let str = '';
    data.forEach(v => {
        str = str + `<div>${v.title}</div>
        <div>${v.content}</div>
        <div>${v.time}</div>`
    })
    let $ = cheerIo.load(fs.readFileSync("./index.html").toString())
    $('.container').html(str)
    fs.writeFileSync('./index.html', $.html())
    // 也可以成功
    await ctx.render("index.html");
})

//  调用router.routes()来组装匹配好的路由，返回一个合并好的中间件
app.use(router.routes());

app.listen(7777, () => {
    console.log('服务器已启动！')
})