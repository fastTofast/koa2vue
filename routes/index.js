const router = require('koa-router')()
const Model=require('../mongodb/articeDao')
router.prefix('/publicService')
var crypto = require('crypto');
const UserModel=Model.UserModel;
const ArticleModel=Model.ArticleModel;
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/login', async (ctx, next) => {
  params=ctx.request.body;
  console.log(params);
  if (!params||!params.userName||!params.password) {
    ctx.body = {code:'E',msg:'密码或账号不能为空'}
  } else {
    var md5 = crypto.createHash('md5'); 
    var result = md5.update("2"+params.password+"b").digest('hex'); 
    let userModel=new UserModel({
      userName:params.userName,
      password:result
    })
    try {
      let user= await userModel.save(userModel);
      var md5_v1 = crypto.createHash('md5'); 
      var auth = md5_v1.update(result+'vuser'+params.userName).digest('hex'); 
      ctx.res.setHeader('Set-Cookie',
      [`vuid='${result}'`, `vuser='${params.userName}'`,`auth='${auth}'`]);
      ctx.body = {code:'S',user:user};
    } catch (error) {
      ctx.body = {code:'E',msg:error}
      throw error
    }
  }
})
router.get('/article/detail', async (ctx, next)=> {
  let params= ctx.request.query;
  //分页查询
    let result=await ArticleModel.findById(params._id,'content')
    .catch (error=>{
     throw new Error(error)
   }) 
   ctx.body=result
})
router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
