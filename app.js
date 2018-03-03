const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors =require('koa-cors')
const index = require('./routes/index')
const article = require('./routes/article')

// error handler
onerror(app)
app.use(cors());
//middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
//是否登录
app.use(async (ctx,next)=>{
  if (ctx.url.indexOf('/koa2vue/service/')!=-1) {
    let cookies=ctx.request.header.cookie;
    console.log(ctx.request.header)
    let regExp=new RegExp('(^| )vuid=([^;]*)(;|$)')
    let result=cookies?cookies.match(regExp):null;
    if (result&&result[2]) {
      await next();
    } else {
      console.log('--------------'+ctx.url)
      ctx.response.redirect('/koa2vue/front/dist/index.html#/login');
    } 
  } else {
    await next();
  }
})
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public',{
  setHeaders:function(res, path, stats) {
    //index让它每次都询问服务器是否有更新
    if (path.indexOf('front\\dist\\index.html')>0) {
      res.setHeader('Cache-Control','no-cache');
    } else {
      res.setHeader('Cache-Control','maxage=604800000');
    }
  }
}))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes

app.use(index.routes(), index.allowedMethods())
app.use(article.routes(), article.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
