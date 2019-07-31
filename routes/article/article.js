const router = require('koa-router')()
const {createArticle, editArticle,findArticle,findArticleAndTags,createArticleAndTag} = require("../../db/controller/article/article.js")
router.prefix('/article')
router.get('/createArticle', async (ctx, next) => {
  await createArticle(ctx, next)
})

router.get('/editArticle', async (ctx, next) => {
  if(!ctx.query.article_id){
    ctx.body={
      message: "文章id必填",
      code: -1
    }
  }else {
    await editArticle(ctx, next)
  }
  
})

router.get('/findArticle', async (ctx, next) => {
  await findArticle(ctx, next)
})

router.get('/createArticleAndTag', async (ctx, next) => {
  await createArticleAndTag(ctx, next)
})
router.get('/findArticleAndTags', async (ctx, next) => {
  await findArticleAndTags(ctx, next)
})
module.exports = router