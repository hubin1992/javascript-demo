let Promise = require('./Promise-resolution')
// let p1 = new Promise((resolve,reject)=>{
//   resolve(100)
// })

// let promise2 = p1.then((data)=>{
  
// })
// //promise and x refer to the same object, reject promise with a TypeError as the reason.  如果x和promise2 引用的是同一个对象，那么我们返回一个reject，类型错误作为原因
// promise2.then((data)=>{
//   console.log(data)
// },err=>{//TypeError: Chaining cycle detected for promise #<Promise>]
//   console.log(err)
// })

//测试完整版（差了一个穿透）
const fs = require('fs');


let readFile = (url)=>{
  return new Promise((resolve,reject)=>{
    fs.readFile(url,'utf8',(err,data)=>{
      if(err) reject(err)
      resolve(data)
    })
  })
}
let obj ;
readFile('../name.txt').then((data)=>{
  console.log(data)
  return readFile('../age.txt')
},err=>{
  console.log(err)
}).then((data)=>{
  console.log(data)
},err=>{
  console.log(err)
})