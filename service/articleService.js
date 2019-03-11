const Model = require("../mongodb/articleDao");
const ObjectId = require("mongodb").ObjectID;
const ArticleModel = Model.ArticleModel;
const UserModel = Model.UserModel;
async function publish(ctx) {
  let params = ctx.request.body;
  params.author = ctx.cookies.get("vuser"); //此处不用判断，之前的中间件以及判断过
  if (params.content && params.content.length > 1024 * 1024) {
    ctx.body = { code: "E", msg: "内容太大，请减小" };
    return;
  }
  params.creationDate = new Date().toLocaleString();
  params.lastUpdateDate = new Date().toLocaleString();
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

async function updatePwd(ctx) {
  let params = ctx.request.body;
  params.userName = ctx.cookies.get("vuser"); //此处不用判断，之前的中间件以及判断过
  try {
    let result = await UserModel.update(
      { userName: params.userName },
      { $set: params }
    );
    if (result.ok>0) {
      ctx.body = { code: "S", data: "成功" };
    }else{
      ctx.body = { code: "E", data: "更新失败" };
    }
  } catch (error) {
    ctx.body = { code: "E", msg: error };
  }
}

async function getArticleList(ctx) {
  let params = ctx.request.query;
  let currentPage = Number(params.currentPage);
  let pageSize = Number(params.pageSize);
  let startIndex = pageSize * (currentPage - 1);
  let showField = "author tags kind creationDate title content";
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
    let result = await ArticleModel.deleteOne({
      _id: ObjectId(params.id),
      author: author
    });
    ctx.body = { code: "S", data: result };
  } catch (error) {
    ctx.body = { code: "E", msg: error };
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
  updatePwd,
  editArticle
};
