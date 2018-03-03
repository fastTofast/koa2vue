const router = require('koa-router')()
const Model=require('../mongodb/articeDao')
var crypto = require('crypto');
const UserModel=Model.UserModel;
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/koa2/login', async (ctx, next) => {
  params=ctx.request.body;
  if (!params||!params.userName||params.password) {
    ctx.body = {code:'E',msg:'密码或账号不能为空'}
  } else {
    var md5 = crypto.createHash('md5'); 
    var result = md5.update("2"+params.password+"b").digest('hex'); 
    let userModel=new UserModel({
      userName:params.userName,
      password:result
    })
    console.log(result);
    try {
     let user= await userModel.save(userModel);
     var auth = md5.update(result+'user'+userName).digest('hex'); 
     ctx.res.setHeader('Set-Cookie', 
      ['vuid='+result, 'uuser='+userName,'auth='+auth]);
     ctx.body = {code:'S',user:user};
    } catch (error) {
      ctx.body = {code:'E',msg:error}
    }
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
