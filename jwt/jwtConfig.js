const jwt  = require('jsonwebtoken'); // 用于签发、解析`token`
const secert = 'jwt_secret'
exports.jwt 
exports.secert
exports.jwtKoa  = require('koa-jwt');      // 用于路由权限控制
exports.makeToken = (param)=>{
  return jwt.sign(param, secert, { expiresIn: '4h' })
}
exports.unlessObj = {
  path:[/signUp/,/signIn/,/\//]
}