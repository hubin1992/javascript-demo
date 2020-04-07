
const fs = require('fs');
let Promise = require('./Promise-chained')
fs.readFile('./age.txt', 'utf8', (err, data) => {
  if (err) console.log(err)
  // console.log(data)
  fs.readFile('./name.txt', 'utf8', (err, data) => {
    if (err) console.log(err)
    // console.log(data) ;//胡滨
  })
})

//这就是回调地狱了或者恶魔金字塔了 ，很难维护

//解决的方式，用promise来解决


function readFile(url) {
  return new Promise((reslove, reject) => {
    fs.readFile(url, 'utf8', (err, data) => {
      if (err) reject(err)
      reslove(data)
    })
  })
}

//链式调用解决回调地狱的问题
//1. 如果then 返回的是一个常量，包括(undefined) 那么他将会直接传递给then成功的结果
//2. 同理，如果then中抛出异常，那么他会直接走到下一个then的异常中
//3. 穿透，如果没有错误处理，那么他会继续往下找，找到可以处理的为止，其实处理就是按照就近原则，来处理的，一般来写一个catch来处理，因为catch他不会阻断运行的
//4. then 后面如果返回的是一个promise，那么会采用这个promise的成功或者失败的结果来传递给下一个then里面来处理
//5. 如果返回的是一个失败：
//1）失败的promsie
//2）直接发生错误，报红
let r = readFile('./age1.txt')
// console.log(r) ;//Promise { <pending> }
r.then((data) => {
  // console.log(data) ;//28
  return 1000
  // return readFile('./name.txt')
}, (err) => {
  return 100
}).then((data) => {
  console.log('err'+data)
})

//then must return a promise [3.3].
    //promise 每次在then都是返回一个新的promise，因为这样才可能完成状态的切换，如果返回的this那么，他只能走成功态，或者失败态