const router = require("koa-router")();
router.prefix("/weibi/service");
const articleService = require("../service/articleService");

router.post("/article/publish", async (ctx, next) => {
  await articleService.publish(ctx);
});

router.get("/article/list", async (ctx, next) => {
  await articleService.getArticleList(ctx);
});

router.delete("/article/delete", async (ctx, next) => {
  await articleService.deleteArticle(ctx);
});

router.put("/article/edit", async (ctx, next) => {
  await articleService.editArticle(ctx);
});

router.put("/article/updatePwd", async (ctx, next) => {
  await articleService.updatePwd(ctx);
});

module.exports = router;
