var crypto = require("crypto");
const Mock = require("mockjs");
async function login(ctx) {
  ctx.cookies.set("vuid", "test", { path: "/", httpOnly: false });
  ctx.cookies.set("auth", "test", { path: "/", httpOnly: false });
  ctx.cookies.set("vuser", "test", { path: "/", httpOnly: false });
  ctx.body = { code: "S", user: user };
}
async function addUser(ctx) {}
async function detail(ctx) {
  let showField = "author tags class creationDate title content";
  //分页查询
  ctx.body = {};
}
async function list(ctx) {
  let showField = "author tags class creationDate title";
  ctx.body = { total: 10, result: [] };
}
async function titleList(ctx) {
  ctx.body = Mock.mock({
    "total|1-30": 10,
    result: []
  });
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
