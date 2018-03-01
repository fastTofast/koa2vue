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
    result=await articleDoc.save();
    ctx.body={code:'S'}
  } catch (error) {
    ctx.body={code:'E',msg:'error'}
  }
})

router.get('/list', async (ctx, next)=> {
  let result='';
  try {
    result=await ArticleModel.find(ctx.request.body).limit(8)
    ctx.body=result
  } catch (error) {
    throw new Error(error);
  }
})

router.delete('/delete',async (ctx ,next)=>{
  let params=ctx.request.body;
  console.log(params)
  try {
    let result=await ArticleModel.remove({_id:params._id});
    ctx.body={code:'S',data:result};
  } catch (error) {
    ctx.body={code:'E',msg:e};
  }
})

router.put('/edit',async (ctx ,next)=>{
  let params=ctx.request.body;
  try {
    let result=await ArticleModel.update({_id:params._id},params);
    ctx.body={code:'S',data:result};
  } catch (error) {
    ctx.body={code:'E',msg:e};
  }
})

module.exports = router
