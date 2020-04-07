let Promise = require('./Promise-penetrate')
let p1 = new Promise((resolve, reject) => {
  reject(100)
})
//function(data){  return data } 如果是正确的我们直接这样来穿透就可以拿到数值了
//null,(err)=>{ throw (err) } 处理错误的穿透
p1.then().then().then((y) => {
  console.log(y)
}, (r) => {
  console.log(r)
})