let fs = require('mz/fs')



//race(arr) 看谁跑的快
//和all差不多的意思
//返回的直接可以执行then，就是返回的是一个promise
Promise.race([fs.readFile('异步发展的流程/promise/name.txt','utf8'),fs.readFile('异步发展的流程/promise/age1.txt','utf8')]).then((data) => {
  console.log(data)
})

Promise.race = function (values) {
  return new Promise((resolve, reject) => {
    values.forEach((val) => {
      if (typeof val === 'function' || (typeof val == 'object' && typeof val != null)) {
        let x = val.then
        if (typeof x == 'function') {
          x.then(val, (v) => {
            resolve(v)
            return
          }, r => {
            reject(r)
            return
          })
        } else {
          resolve(val)
          return
        }
      } else {
        resolve(val)
        return
      }
    })
  })
}