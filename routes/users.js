const router = require('koa-router')()
const userController = require("../db/controller/userController.js")
router.prefix('/users')

router.get('/signUp',async function (ctx, next) {
  if(!ctx.query.account){
    ctx.body={
      message: "缺少账号字段",
      code: -1
    }
  }else if (!ctx.query.password){
    ctx.body={
      message: "缺少密码字段",
      code: -1
    }
  }else {
    await userController.userSignUp(ctx, next)
  }
}
)
router.get('/signIn',async function (ctx, next) {
  if(!ctx.query.account){
    ctx.body={
      message: "缺少账号字段",
      code: -1
    }
  }else if (!ctx.query.password) {
    ctx.body={
      message: "缺少密码字段",
      code: -1
    }
  }else{
    await userController.userSignIn(ctx, next)
  }
})
module.exports = router
