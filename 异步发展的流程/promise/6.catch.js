let Promise = require('./Promise')
let p1 = new Promise((resolve,reject)=>{
  reject(100)
})
p1.catch((err)=>{ //100
  console.log(err)
})


//catch 变体
// p1.then(null,(err)=>{
//   console.log(err)
// })