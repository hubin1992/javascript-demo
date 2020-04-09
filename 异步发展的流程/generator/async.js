//example
let fs = require('mz/fs')
async function read() { //异步流程，同步书写
  //同步写法解决异步
  let a = await fs.readFile('./a1.txt', 'utf8')
  // console.log(3)
  let b = await fs.readFile(a, 'utf8')
  return b
}
// Promise.resolve(1).then((data) => {
//   console.log(data)
// })

// console.log('extends')



//注意我们可以用try，catch来捕获错误
// 但是有优先级的问题，如果promsie里面有处理错误的方法，他就走不到catch里面
try {
  read().then(data=>{
    console.log(data)
  },err=>{
    console.log('err'+err)
  })
} catch (e) {
  console.log('catch'e)
}
