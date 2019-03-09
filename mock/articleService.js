const Model = require("../mongodb/articleDao");
const ArticleModel = Model.ArticleModel;
async function publish(ctx) {
  let params = ctx.request.body;
  params.author = ctx.cookies.get("vuser"); //此处不用判断，之前的中间件以及判断过
  if (params.content && params.content.length > 1024 * 1024) {
    ctx.body = { code: "E", msg: "内容太大，请减小" };
    return;
  }
  let articleDoc = new ArticleModel(params);
  let result = "";
  if (params.author == "test") {
    let condition = {
      author: params.author
    };
    let count = await ArticleModel.count(condition);
    if (count > 10) {
      ctx.body = { code: "E", msg: "Test 账号最多发布10篇笔记" };
    }
  }
  try {
    ctx.body = await articleDoc.save();
  } catch (error) {
    ctx.body = { code: "E", msg: error };
  }
}
async function getArticleList() {
  let params = ctx.request.query;
  let currentPage = Number(params.currentPage);
  let pageSize = Number(params.pageSize);
  let startIndex = pageSize * (currentPage - 1);
  let showField = "author tags class creationDate title articleHeader";
  let condition = {
    author: ctx.cookies.get("vuser")
  };
  //分页查询
  let [result, total] = await Promise.all([
    ArticleModel.find(condition, showField)
      .skip(startIndex)
      .limit(pageSize),
    ArticleModel.count(condition)
  ]).catch(error => {
    throw new Error(error);
  });
  ctx.body = { result, total };
}

async function deleteArticle(ctx) {
  let params = ctx.request.body;
  let author = ctx.cookies.get("vuser");
  try {
    let result = await ArticleModel.remove({ _id: params._id, author: author });
    ctx.body = { code: "S", data: result };
  } catch (error) {
    ctx.body = { code: "E", msg: e };
  }
}
async function editArticle(ctx) {
  let params = ctx.request.body;
  params.author = ctx.cookies.get("vuser");
  try {
    let result = await ArticleModel.update(
      { _id: params._id, author: params.author },
      { $set: params }
    );
    ctx.body = { code: "S", data: result };
  } catch (error) {
    ctx.body = { code: "E", msg: error };
    throw error;
  }
}
module.exports = {
  publish,
  getArticleList,
  deleteArticle,
  editArticle
};
