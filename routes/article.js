const router = require('koa-router')()
const Model=require('../mongodb/articeDao')
router.prefix('/koa2vue/service')
const ArticleModel=Model.ArticleModel;
router.post('/article/publish', async (ctx, next)=> {
  let params=ctx.request.body;
  params.author=ctx.cookies.get('vuser');//此处不用判断，之前的中间件以及判断过
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

router.get('/article/list', async (ctx, next)=> {
   let params= ctx.request.query;
   let currentPage=Number(params.currentPage);
   let pageSize=Number(params.pageSize);
   let startIndex=pageSize*(currentPage-1);
   let showField='author tags class creationDate title articleHeader'
   let condition={
     userNmae:ctx.cookies.get('vuser'),
   }
   //分页查询
   let [result,total]=await Promise.all([
     ArticleModel.find(condition,showField).skip(startIndex).limit(pageSize),
     ArticleModel.count()
    ]).catch (error=>{
      throw new Error(error)
    }) 
    console.log(result)
    ctx.body={total,result}
})
router.delete('/article/delete',async (ctx ,next)=>{
  let params=ctx.request.body;
  try {
    let result=await ArticleModel.remove({_id:params._id});
    ctx.body={code:'S',data:result};
  } catch (error) {
    ctx.body={code:'E',msg:e};
  }
})

router.put('/article/edit',async (ctx ,next)=>{
  let params=ctx.request.body;
  try {
    let result=await ArticleModel.update({_id:params._id},params);
    ctx.body={code:'S',data:result};
  } catch (error) {
    ctx.body={code:'E',msg:error};
    throw error
  }
})

module.exports = router
