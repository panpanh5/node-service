const koa = require("koa");
const app = new koa();
const fs = require("fs");
const koaBody = require("koa-body");
const views = require("koa-views");
const static = require("koa-static");
const Router = require("koa-router");
const router = new Router();
app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);
app.use(static(__dirname + "/static"));

router.get("/", async (ctx) => {
  await ctx.render("index");
});

router.post("/admin/addData", (ctx) => {
  console.log(ctx.request.body);
  console.log(ctx.request.files);
  //   判断如果存在uploadFiles文件就不创建
  // 不存在就创建
  if (!fs.existsSync("static/uploadFiles")) {
      fs.mkdirSync('static/uploadFiles')
  }
  fs.writeFileSync('static/uploadFiles/'+ctx.request.files.img.name,
  fs.readFileSync(ctx.request.files.img.path))
//   然后将/uploadFiles+文件名存到数据库中就可以了
  ctx.body = "";
});
// 允许接收文件上传
app.use(
  koaBody({
    multipart: true,
  })
);

app.use(router.routes());
app.listen("7777", () => {
  console.log("服务已开启!");
});
