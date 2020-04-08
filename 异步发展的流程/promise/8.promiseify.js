// 这个是将一个方法promsie化 
const fs = require('fs')
// let bluebird = require('bluebird')

// let read = bluebird.promisify(fs.readFile)

// read('异步发展的流程/promise/age.txt','utf8').then(data=>{
//   console.log(data)
// })

//我们是实现一个promiseify

function promisify(cb) {
  return function(){//这个函数相当与read
    return new Promise((resolve,reject)=>{ //由于我们这用的是箭头函数，他没有arguments，所以往上查找
      fs.readFile(...arguments,(err,data)=>{
        if(err) reject(err)
        resolve(data)
      })
    })
  }
}
let read = promisify(fs.readFile)
read('异步发展的流程/promise/age.txt', 'utf8').then(data => {
  console.log(data)
})

//思路解析一下
//promisify 执行返回的是一个函数 read
//red 执行，并且返回了一个promise