const router = require("koa-router")();
// let servicePath = "../service/indexService";
// if (process.argv.indexOf("env=dev") !== -1) {
//   servicePath = "..mock/indexService";
// }
var indexService = require("../service/indexService");
router.prefix("/weibi/publicService");

router.get("/test", async (ctx, next) => {
  console.log("/test");
  await indexService.test(ctx);
});
//登录
router.post("/login", async (ctx, next) => {
  await indexService.login(ctx);
});
router.put("/logout", async (ctx, next) => {
  ctx.cookies.set("vuid", "", { path: "/", httpOnly: false, maxAge: 0 });
  ctx.cookies.set("auth", "", { path: "/", httpOnly: false, maxAge: 0 });
  ctx.cookies.set("vuser", "", { path: "/", httpOnly: false, maxAge: 0 });
  ctx.body = { code: "S" };
});
//注册
router.post("/addUser", async (ctx, next) => {
  await indexService.addUser(ctx);
});
router.get("/article/detail", async (ctx, next) => {
  await indexService.detail(ctx);
});
router.get("/article/list", async (ctx, next) => {
  await indexService.list(ctx);
});
router.get("/article/titleList", async (ctx, next) => {
  await indexService.titleList(ctx);
});

module.exports = router;
