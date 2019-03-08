const router = require("koa-router")();
var indexService = require("../service/indexService");
router.prefix("/weibi/publicService");

router.get("/test", async (ctx, next) => {
  ctx.body = await indexService.test("HHHHHHHHHHH");
});

//登录
router.post("/login", async (ctx, next) => {
  indexService.login(ctx);
});
router.put("/logout", async (ctx, next) => {
  ctx.cookies.set("vuid", "", { path: "/", httpOnly: false, maxAge: 0 });
  ctx.cookies.set("auth", "", { path: "/", httpOnly: false, maxAge: 0 });
  ctx.cookies.set("vuser", "", { path: "/", httpOnly: false, maxAge: 0 });
  ctx.body = { code: "S" };
});
//注册
router.post("/addUser", async (ctx, next) => {
  indexService.addUser(ctx);
});
router.get("/article/detail", async (ctx, next) => {
  indexService.detail(ctx);
});
router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json"
  };
});
router.get("/article/list", async (ctx, next) => {
  indexService.list(ctx);
});
router.get("/article/titleList", async (ctx, next) => {
  indexService.titleList(ctx);
});

module.exports = router;
