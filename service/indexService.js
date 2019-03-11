var crypto = require("crypto");
const Model = require("../mongodb/articleDao");
const UserModel = Model.UserModel;
const ArticleModel = Model.ArticleModel;

async function login(ctx) {
  var params = ctx.request.body;
  console.log(params);
  console.log("-------++++++++++");
  if (!params || !params.userName || !params.password) {
    ctx.body = { code: "E", msg: "密码或账号不能为空" };
  } else {
    var md5 = crypto.createHash("md5");
    var result = md5.update("2" + params.password + "b").digest("hex");
    let queryParam = {
      userName: params.userName,
      password: result
    };
    console.log(queryParam);
    try {
      console.log("---before--");
      let user = await UserModel.findOne(queryParam);
      console.log(user);
      if (!user) {
        ctx.body = { code: "E", msg: "账号密码错误" };
      } else {
        var md5_v1 = crypto.createHash("md5");
        var auth = md5_v1
          .update(result + "vuser" + params.userName)
          .digest("hex");
        let hostname = ctx.hostname + ":8082";
        ctx.cookies.set("vuid", result, { path: "/", httpOnly: false });
        ctx.cookies.set("auth", auth, { path: "/", httpOnly: false });
        ctx.cookies.set("vuser", params.userName, {
          path: "/",
          httpOnly: false
        });
        ctx.body = { code: "S", data: user };
      }
    } catch (error) {
      ctx.body = { code: "E", msg: error };
    }
  }
}
async function addUser(ctx) {
  var params = ctx.request.body;
  console.log(params);
  let [userName, password] = [params.userName, params.password];
  if (!userName || !password) {
    ctx.body = { code: "E", msg: "密码或账号不能为空" };
  } else {
    if (password.length > 8) {
      ctx.body = { code: "E", msg: "密码太长，最大6个字符" };
      return;
    }
    if (userName.length > 6) {
      ctx.body = { code: "E", msg: "账号太长，最大8个字符" };
      return;
    }
    let user = await UserModel.findOne({ userName: userName });
    if (user) {
      ctx.body = { code: "E", msg: "该用户已经存在" };
      return;
    }
    var md5 = crypto.createHash("md5");
    var result = md5.update("2" + params.password + "b").digest("hex");
    let userModel = new UserModel({
      userName: params.userName,
      password: result
    });
    try {
      let user = await userModel.save();
      var md5_v1 = crypto.createHash("md5");
      var auth = md5_v1
        .update(result + "vuser" + params.userName)
        .digest("hex");
      ctx.cookies.set("vuid", result, { path: "/", httpOnly: false });
      ctx.cookies.set("auth", auth, { path: "/", httpOnly: false });
      ctx.cookies.set("vuser", params.userName, { path: "/", httpOnly: false });
      ctx.body = { code: "S", data: user };
    } catch (error) {
      ctx.body = { code: "E", msg: error };
      throw error;
    }
  }
}
async function detail(ctx) {
  let params = ctx.request.query;
  let showField = "author tags kind creationDate title content";
  //分页查询
  let result = await ArticleModel.findById(params._id, showField).catch(
    error => {
      throw new Error(error);
    }
  );
  ctx.body = result;
}
async function list(ctx) {
  let params = ctx.request.query;
  let currentPage = Number(params.currentPage);
  let pageSize = Number(params.pageSize);
  let startIndex = pageSize * (currentPage - 1);
  let showField = "author tags kind content creationDate title";
  //分页查询
  let [result, total] = await Promise.all([
    ArticleModel.find({ shareFlag: true }, showField)
      .skip(startIndex)
      .limit(pageSize),
    ArticleModel.count()
  ]).catch(error => {
    throw new Error(error);
  });
  ctx.body = { total, result };
}
async function titleList(ctx) {
  let params = ctx.request.query;
  console.log(params);
  let showField = "author title";
  try {
    //分页查询
    let data = await ArticleModel.find({ author: params.author }, showField);
    ctx.body = { articleList: data };
  } catch (error) {
    throw new Error(error);
  }
}
async function test(ctx) {
  ctx.body = "Hello";
}
module.exports = {
  login,
  addUser,
  detail,
  list,
  titleList,
  test
};
