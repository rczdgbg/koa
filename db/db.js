let mongoose = require("mongoose");
console.log(process.env.NODE_ENV)
// let db = 'mongodb://127.0.0.1:27017/blog'
let db = "mongodb://localhost:27017/blog"

module.exports = ()=>{
  // mongoose.connect(db);
  mongoose.connect(db, {useNewUrlParser:true}, function(err){

　　if(err){

　　　　console.log('Connection Error:' + err)

　　}else{

　　　　console.log('Connection success!')

　　}

})
  let connectTimes = 1;
  mongoose.connection.on('open', ()=>{
    console.log("连接成功")
  });
  mongoose.connection.on('error', ()=>{
    if(connectTimes<4){
      console.log(`连接失败，正在重连${connectTimes++}次`)
      mongoose.connect(db);
    }else {
      console.log(`连接失败，请检查数据库！`)
    }
  });
}