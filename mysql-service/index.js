const koa = require('koa');
const Router = require('koa-router')
const router = new Router()
const app = new koa();
router.get('', async (ctx) => {
    console.log(ctx)
})


// 调用路由
app.use(router.routes())
app.listen(8081, () => {
    console.log('服务器已启动!')
})