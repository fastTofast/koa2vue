const router = require('koa-router')()
const ArticleModel=require('../mongodb/articeDao')
router.prefix('/koa2vue/service/article')

router.post('/publish', async (ctx, next)=> {
  let params=ctx.request.body;
  if(params.content&&params.content.length>1024*1024){
    ctx.body={code:'E',msg:'内容太大，请减小'}
    return;
  }
  let articleDoc= new ArticleModel(params);
  let result='';
  try {
    console.log('----------save-----------')
    result=await articleDoc.save();
    console.log('----------save after-----------')
    ctx.body={code:'S'}
  } catch (error) {
    ctx.body={code:'E',msg:'error'}
  }
})

router.get('/list', async (ctx, next)=> {
  let result='';
  let articleDoc= new ArticleModel(ctx.params);
  try {
    result=await articleDoc.find({author:'test'})
    ctx.body=result
  } catch (error) {
    throw new Error(error);
  }
  
})

module.exports = router
