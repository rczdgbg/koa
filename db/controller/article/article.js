const {
  articleModel,
  articleAndTagModel,
  tagsModel
} = require('../../models/article/articleModel.js')
const {
  findMax
} = require('../publicController.js')
exports.createArticle = async (ctx) => {
  let maxId = await findMax(articleModel, "article_id");
  let user = new articleModel({
    ...ctx.query,
    article_id: maxId + 1
  })
  let res = await user.save()
  if (!res) {
    ctx.body = {
      message: "文章添加失败" + res,
      code: -1
    }
  } else {
    ctx.body = {
      message: "文章添加成功",
      code: 1
    }
  }
}
exports.editArticle = async (ctx) => {
  let res = await articleModel.updateOne({
    article_id: ctx.query.article_id
  }, {
    $set: ctx.query
  })
  if (!res) {
    ctx.body = {
      message: "文章修改失败" + res,
      code: -1
    }
  } else {
    ctx.body = {
      message: "文章修改成功",
      code: 1
    }
  }
}
// 查找文章
exports.findArticle = async (ctx)=>{
  let res
  if(ctx.query.size){
    res = await articleModel.find({}).limit(ctx.query.size-0).skip(Number(ctx.query.size) * Number(ctx.query.page-1)).exec()
  }else {
    res = await articleModel.find({}).exec()
  }
  if (!res) {
    ctx.body = {
      message: "文章c查询失败" + res,
      code: -1
    }
  } else {
    ctx.body = {
      message: "文章查询成功",
      code: 1,
      data: {
        all: res.length,
        page: ctx.query.page,
        size: ctx.query.size,
        list:res
      }
    }
  }
}
exports.createArticleAndTag = async(ctx)=>{
  let maxId = await findMax(articleAndTagModel, "article_id");
  let exist =  await articleAndTagModel.find(ctx.query);
  if(exist.length){
    ctx.body = {
      message: "文章标签已关联",
      code: -1
    }
  }else {
    let findTag
    findTag = await tagsModel.find({tag_id: ctx.query.tag_id})
    if(findTag.length){
      let articleAndTag = new articleAndTagModel({
        ...ctx.query,
        tag_name: findTag[0].tag_name,
        articleAndTag_id: maxId + 1
      })
      let res = await articleAndTag.save()
      if (!res) {
        ctx.body = {
          message: "文章标签关联失败" + res,
          code: -1
        }
      } else {
        ctx.body = {
          message: "文章标签关联成功",
          code: 1
        }
      }
    }else{
      ctx.body = {
        message: "tag表没有此条数据",
        code: -1
      }
    }
    
  }
 
}
exports.findArticleAndTags= async (ctx)=>{
  let findArticle,arr
  if(ctx.query.size){
    findArticle = await articleModel.find({}).limit(ctx.query.size-0).skip(Number(ctx.query.size) * Number(ctx.query.page-1)).sort({create_time:-1}).exec()
    if(findArticle.length){
       arr =await ergodic(findArticle);
    }
    ctx.body = {
      message: "查询成功",
      code: 1,
      data: {
        all: findArticle.length,
        size: ctx.query.size,
        page: ctx.query.page,
        list: arr
      }
    }
  }else {
    findArticle = await articleModel.find({}).sort({create_time:-1}).exec()
    if(findArticle.length){
      arr =await ergodic(findArticle);
   }
   ctx.body = {
     message: "查询成功",
     code: 1,
     data: {
       all: findArticle.length,
       size: ctx.query.size,
       page: ctx.query.page,
       list: arr
     }
   }
  }
}
 async function ergodic(param) {
   let param2 = JSON.parse(JSON.stringify(param))
   for (let i = 0; i<param.length; i++){
    param2[i].tags = await articleAndTagModel.find({article_id: param[i].article_id}).exec()
   }
    return param2
 }