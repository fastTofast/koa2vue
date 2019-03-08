const router = require("koa-router")();
router.prefix("/weibi/service");
const articleService = require("../service/articleService");

router.post("/article/publish", async (ctx, next) => {
  articleService.publish(ctx);
});

router.get("/article/list", async (ctx, next) => {
  articleService.getArticleList(ctx);
});

router.delete("/article/delete", async (ctx, next) => {
  articleService.deleteArticle(ctx);
});

router.put("/article/edit", async (ctx, next) => {
  articleService.editArticle(ctx);
});

module.exports = router;
