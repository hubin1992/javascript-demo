

//mz的使用
let fs = require('mz/fs')
let Promise = require('./Promise')
// console.log(fs)

// fs.readFile('异步发展的流程/promise/age.txt','utf8').then((data)=>{
//   console.log(data) //28
// }) 


//Promise.all(arr) 
//接受参数是一个数组
//返回的也是一个数组
//如果有一个是错误的，那么终止执行
Promise.all1([fs.readFile('异步发展的流程/promise/age.txt', 'utf8'), fs.readFile('异步发展的流程/promise/name.txt', 'utf8'), 1]).then(data => {
  console.log(data)
}, err => {
  console.log(err)
})
Promise.all1([1,23,4]).then(data => {
  console.log(data)
}, err => {
  console.log(err)
})

console.log(Promise)

// Promise.all = function (values) {
//   //all 之后直接可以then，说明返回的是一个promise
//   return new Promise((resolve, reject) => {
//     let result = []
//     let num = 0
//     let processData = function (val, index) {
//       result[index] = val
//       if(++num == values.length){
//         resolve(result)
//       }
//     }
//     //这里面来处理每一个参数
//     values.forEach((val, index) => {// 这里我们考虑的是val可能是一个promise，可能是一个常量
//       if (typeof val == 'function' || (typeof val == 'object' && typeof val != null)) {
//         if (typeof val.then == 'function') {//判断一下是否有then方法
//           let then = val.then //如果有then方法，让then方法执行
//           then.call(val, (y) => { //如果执行成功了
//             processData(y,index)
//           },(r)=>{ // 如果报错直接输出
//             reject(r)
//           })
//         } else { //如果没有then方法，那么可能就是一个普通的的常量
//           processData(val, index)
//         }
//       } else { //如果他不是一个promise，我们需要写一个计数器
//         processData(val, index)
//       }
//     })
//   })

// }