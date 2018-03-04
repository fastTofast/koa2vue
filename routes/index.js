const router = require('koa-router')()
const Model=require('../mongodb/articeDao')
var crypto = require('crypto');
router.prefix('/koa2vue/publicService')
const UserModel=Model.UserModel;
const ArticleModel=Model.ArticleModel;
//登录
router.post('/login', async (ctx, next) => {
  var params=ctx.request.body;
  console.log(params);
  console.log('-------++++++++++');
  if (!params||!params.userName||!params.password) {
    ctx.body = {code:'E',msg:'密码或账号不能为空'}
  } else {
    var md5 = crypto.createHash('md5'); 
    var result = md5.update("2"+params.password+"b").digest('hex'); 
    let queryParam=({
      userName:params.userName,
      password:result
    })
    console.log(queryParam)
    try {
      let user=await  UserModel.findOne(queryParam);
      console.log(user)
      if(!user){
        ctx.body = {code:'E',msg:'账号或密码错误'}
        return ;
      }
      var md5_v1 = crypto.createHash('md5'); 
      var auth = md5_v1.update(result+'vuser'+params.userName).digest('hex'); 
      ctx.cookies.set('vuid', result,{path:'/',httpOnly:false});
      ctx.cookies.set('auth', auth,{path:'/',httpOnly:false});
      ctx.cookies.set('vuser', params.userName,{path:'/',httpOnly:false});
      ctx.body = {code:'S',user:user};
    } catch (error) {
      ctx.body = {code:'E',msg:error}
      throw error
    }
  }
})
router.put('/logout',async (ctx,next)=>{
  ctx.cookies.set('vuid', '',{path:'/',httpOnly:false,maxAge:0});
  ctx.cookies.set('auth', '',{path:'/',httpOnly:false,maxAge:0});
  ctx.cookies.set('vuser', '',{path:'/',httpOnly:false,maxAge:0});
  ctx.body={code:"S"}
})
//注册
router.post('/addUser',async (ctx,next)=>{
  var params=ctx.request.body;
  console.log(params)
  let [userName,password]=[params.userName,params.password]
  if (!userName||!password) {
    ctx.body = {code:'E',msg:'密码或账号不能为空'}
  } else {
    if(password.length>8){
      ctx.body = {code:'E',msg:'密码太长，最大6个字符'}
      return;
    }
    if(userName.length>6){
      ctx.body = {code:'E',msg:'账号太长，最大8个字符'}
      return;
    }
    let user= await UserModel.findOne({userName:userName});
    if(user){
      ctx.body = {code:'E',msg:'该用户以及存在'}
      return;
    }
    var md5 = crypto.createHash('md5'); 
    var result = md5.update("2"+params.password+"b").digest('hex'); 
    let userModel=new UserModel({
      userName:params.userName,
      password:result
    })
    try {
      let user= await userModel.save();
      var md5_v1 = crypto.createHash('md5'); 
      var auth = md5_v1.update(result+'vuser'+params.userName).digest('hex'); 
      ctx.cookies.set('vuid', result,{path:'/',httpOnly:false});
      ctx.cookies.set('auth', auth,{path:'/',httpOnly:false});
      ctx.cookies.set('vuser', params.userName,{path:'/',httpOnly:false});
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
router.get('/article/list', async (ctx, next)=> {
  let params= ctx.request.query;
  let currentPage=Number(params.currentPage);
  let pageSize=Number(params.pageSize);
  let startIndex=pageSize*(currentPage-1);
  let showField='author tags class creationDate title articleHeader'
  //分页查询
   let [result,total]=await Promise.all([
     ArticleModel.find({},showField).skip(startIndex).limit(pageSize),
     ArticleModel.count()
   ]).catch (error=>{
     throw new Error(error)
   }) 
   ctx.body={total,result}
})
module.exports = router
