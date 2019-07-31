const userModel = require('../models/userModel.js')
const {jwt,secert, makeToken} = require('../../jwt/jwtConfig.js')
const {findMax} = require('./publicController.js')

exports.userSignUp = async (ctx) => {
  let userAccount = await findUser({
    account: ctx.query.account
  });
  if (userAccount.length) {
    ctx.body = {
      message: "用户已存在",
      code: -1,
    }
  } else {
    let maxId = await findMax(userModel, "id")
    if (typeof maxId === "number") {
      let user = new userModel({
        ...ctx.query,
        id: maxId + 1
      })
      let res = await user.save()
      if (!res) {
        ctx.body = {
          message: "注册失败" + res,
          code: -1
        }
      } else {
        ctx.body = {
          message: "注册成功",
          code: 1
        }
      }
    } else {
      new Error("错误")
    }
  }
}
exports.userSignIn = async (ctx)=>{
  let loginUser = await findUser(ctx.query)
  if(loginUser.length){
    let token = makeToken(ctx.query);
    // 更新用户token
    await userModel.updateOne(ctx.query, {
      $set: {
          token: token
      }
  })
    ctx.body = {
      message: "登陆成功！",
      token,
      code: 1
    }
  }else {
    ctx.body = {
      message: "账号不存在或者密码不正确！",
      code: -1
    }
  }
}

async function findUser(findParams) {
  return await userModel.find(findParams)
}