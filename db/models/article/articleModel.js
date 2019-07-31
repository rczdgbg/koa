let mongoose = require("mongoose");
//文章表
let articleSchema = new mongoose.Schema({
  article_id : { type:Number, required: true,ref: "articleAndTagSchema" },//文章id
  article_title  : { type:String, default:"我是文章标题" },//文章标题
  article_about  : { type:String, default:"我是文章概要" },//文章标题
  article_content  : { type:String, default:"我是文章内容" },//文章内容
  article_view_times  : { type:Number, default: 0 },//文章浏览次数
  article_img  : { type:String, default:"我是图片" },//文章图片
  article_maker_id  : { type:Number, default: 1 },//作者id
  create_time  : { type:String, default:Date.now }, // 文章创建时间
});

//文章标签关联表
let articleAndTagSchema = new mongoose.Schema({
  articleAndTag_id: {type:Number, required: true},
  article_id : { type:Number, required: true },//文章id
  tag_id  : { type:Number, required: true,ref:"tagSchema" },//标签id
  tag_name  : { type:String,  default:"我是标签标名字" },//标签名字
});
// 标签表
let tagSchema = new mongoose.Schema({
  tag_id : { type:Number, required: true },//标签id
  tag_name  : { type:String,  default:"我是标签标名字" },//标签名字
});




/**
 * 定义模型User
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数User 数据库中的集合名称, 不存在会创建.
exports.articleModel = mongoose.model('article', articleSchema)
exports.articleAndTagModel = mongoose.model('articleAndTag', articleAndTagSchema)
exports.tagsModel = mongoose.model('tags', tagSchema)
