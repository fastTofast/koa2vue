const mongoose=require('mongoose')
const dbConfig={
    TNS:'mongodb://localhost:27017/',
    password:'',
    user:''
}
mongoose.connect(dbConfig.TNS+'weibi');
let Schema=mongoose.Schema;
let articleSchema=new Schema({
    author:String,
    tags:Array,
    kind:String,
    content:String,
    creationDate:String,
    title:String,
    articleHeader:String,
    lastUpdateDate:String
})
const ArticleModel=mongoose.model('article',articleSchema);

let userSchema=new Schema({
    userName:String,
    password:String
})
const UserModel=mongoose.model('user',userSchema);

module.exports= {ArticleModel,UserModel}