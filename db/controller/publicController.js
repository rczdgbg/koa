exports.findMax = function (model, findParams) {
  return new Promise((resolve, reject) => {
    let obj = {}
    obj[findParams] = -1;
    model.find({}).sort(obj).limit(1).exec(function (err, data) {
      console.log(data,"++++++++++++++++++++++++++++++++")
      if (data.length) {
        resolve(data[0][findParams])
      } else if(!err) {
        resolve(0)
      }
    });
  })
}