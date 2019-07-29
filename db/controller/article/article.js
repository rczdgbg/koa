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
  let res = await articleModel.update({
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
exports.findArticle = async (ctx)=>{
  let res
  if(ctx.query.size){
    res = await articleModel.find({}).limit(ctx.query.size-0).skip(Number(ctx.query.size) * Number(ctx.query.page-1)).exec()
  }else {
    res = await articleModel.find({}).exec()
  }
  
  console.log(res)
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