//generator：生成器
// 特殊符号 * 
// let it  = gener(val) //这个值，对应的是第一个next返回的值
// it.next() 执行器，并且第一个next不用传递任何值，传递了也无效
// 从第二个开始传值，对应着第一个变量
// yid 后面可以用来处理异步
// 生成器的牛逼的地方： 异步的方法，可以用同步来书写，比较吊炸天

// function* gener(start) {
//   let a = yield start
//   let b = yield a
//   let c = yield b
//   return c
// }

// let it = gener(1)
// console.log(it.next())  //{ value: 1, done: false }
// console.log(it.next(2)) //{ value: 2, done: false }
// console.log(it.next(3)) //{ value: 3, done: false }
// console.log(it.next(4)) //{ value: 3, done: false }


//example

let fs = require('mz/fs')
function* read() { //异步流程，同步书写
  let a = yield fs.readFile('./a.txt', 'utf8')
  let b = yield fs.readFile('./' + a, 'utf8')
  return b
}



// let {value,done} = it.next()
// value.then((data)=>{ // 但是这样异步处理的很恶心
//   let {value,done} = it.next(data)
//   value.then((res)=>{
//     console.log(res)
//   })
// })
let it = read()
//node中用 co库 替代上面的流程
// co 直接返回的promise 省掉了我们去处理中间哪一大段
let co = require('co')
co(it).then((res) => {
  console.log(res)
})


//co 库的核心代码

// function co(fn) {
//   return new Promise((resolve, reject) => {
//     //需要借助一个自执行的函数来处理
//     function cycle(val) {
//       let { value, done } = fn.next(val) //这个位置需要一个参数，不然下次怎么执行
//       if (!done) {// 如果done 是false
//         //防止出现undefined
//         Promise.resolve(value).then((data) => {
//           cycle(data)
//         })
//       } else {
//         resolve(value)
//         return
//       }
//     }
//     cycle()
//   })
// }
