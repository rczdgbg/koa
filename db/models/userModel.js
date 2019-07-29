let mongoose = require("mongoose");
console.log(Date.now)
let userSchema = new mongoose.Schema({
    id : { type:Number, required: true },//属性自增ID
    user_name  : { type:String, default:"我就观望观望" },//用户名与账号不同
    account  : { type:String, default:"" },//账号
    password: { type:String, default:"" },// 密码
    token: { type:String, default:"" },// token
    user_create_time : { type:String, default:Date.now },
    head_img: { type:String,default:''}
});
/**
 * 定义模型User
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数User 数据库中的集合名称, 不存在会创建.
let User = mongoose.model('User', userSchema)

module.exports = User