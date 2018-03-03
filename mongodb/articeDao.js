const mongoose=require('mongoose')
const dbConfig={
    TNS:'mongodb://localhost:27017/',
    password:'',
    user:''
}
mongoose.connect(dbConfig.TNS+'koa2vue');
let Schema=mongoose.Schema;
let articleSchema=new Schema({
    author:String,
    tags:Array,
    class:String,
    content:String,
    creationDate:String,
    title:String,
    articleHeader:String
})
const ArticleModel=mongoose.model('article',articleSchema);

let userSchema=new Schema({
    userName:String,
    password:String
})
const UserModel=mongoose.model('user',userSchema);

module.exports= {ArticleModel,UserModel}