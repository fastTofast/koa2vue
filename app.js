const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa2-cors");
const index = require("./routes/index");
const article = require("./routes/article");
var crypto = require("crypto");
// error handler
onerror(app);
app.use(
  cors({
    credentials: true
  })
);
// app.use(async (ctx, next) => {
//   // if (ctx.request.header.origin !== ctx.origin && whiteList.includes(ctx.request.header.origin)) {
//   ctx.set("Access-Control-Allow-Origin", "*");
//   ctx.set("Access-Control-Allow-Credentials", true);
//   // }
//   await next();
// });
// app.use(async (ctx, next) => {
//   if (ctx.method === "OPTIONS") {
//     ctx.set("Access-Control-Allow-Methods", "PUT,DELETE,POST,GET");
//     ctx.set("Access-Control-Allow-Headers", ['Content-Type', 'Authorization', 'Accept']);
//     ctx.set("Access-Control-Max-Age", 3600 * 24);
//     ctx.body = "";
//   }
//   await next();
// });
//middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
//是否登录
app.use(async (ctx, next) => {
  if (ctx.url.indexOf("/weibi/service/") != -1) {
    // let cookies=ctx.request.header.cookie;
    // console.log(cookies)
    // if (!cookies) {
    //   ctx.body={code:"E",msg:"请先登录",redirect:'login'}
    //   return;
    // }
    // let getCookie=function(name){
    //   let regStr='(^| )'+name+'=([^;]*)(;|$)'
    //   let regExp=new RegExp(regStr);
    //     var result=cookies.match(regExp)
    //     return result?result[2]:[];
    // }
    let [vuid, vuser, auth] = [
      ctx.cookies.get("vuid"),
      ctx.cookies.get("vuser"),
      ctx.cookies.get("auth")
    ];
    if (!vuid || !vuser || !auth) {
      ctx.body = { code: "-1000", msg: "请先登录", redirect: "login" };
    } else {
      var md5 = crypto.createHash("md5");
      let auth2 = md5.update(vuid + "vuser" + vuser).digest("hex");
      if (auth == auth2) {
        ctx.cookies.set("vuid", vuid, {
          path: "/",
          maxAge: 2 * 60 * 60 * 1000
        });
        ctx.cookies.set("auth", auth, {
          path: "/",
          maxAge: 2 * 60 * 60 * 1000
        });
        ctx.cookies.set("vuser", vuser, {
          path: "/",
          maxAge: 2 * 60 * 60 * 1000
        });
        await next();
      } else {
        ctx.body = {
          code: "E",
          msg: "请先登录",
          redirect: "login",
          toPage: ctx.url
        };
      }
    }
  } else {
    await next();
  }
});
app.use(json());
app.use(logger());
// 将返回的数据处理成统一的结构
app.use(async (ctx, next) => {
  await next();
  const data = ctx.body;
  if (data && !data.code) {
    ctx.body = {
      code: "S",
      data
    };
  }
});
app.use(
  require("koa-static")(__dirname + "/public", {
    setHeaders: function(res, path, stats) {
      //index让它每次都询问服务器是否有更新
      if (path.match(/front\\dist\\index.html/)) {
        console.log("path为index.html界面-------: " + path);
        res.setHeader("Cache-Control", "no-cache");
      } else {
        res.setHeader("Cache-Control", "maxage=604800000");
      }
    }
  })
);

app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes

app.use(index.routes(), index.allowedMethods());
app.use(article.routes(), article.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
  ctx.throw(ctx.response.status);
});

module.exports = app;
