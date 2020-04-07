const fs = require('fs');

function after(num, cb) {//利用after函数,简化了我们回调
  let arr = []
  return function (r, err,index) {//处理错误
    if (err) {
      throw new Error(err)
    }
    arr[index] = r
    if (--num == 0) {
      cb(arr)
    }
  }

}

fs.readFile('./age.txt', 'utf8', (err, data) => {
  newFn(data, err, 1)
})
fs.readFile('./name.txt', 'utf8', (err, data) => {
  newFn(data, err, 0)
})

let newFn = after(2, function (arr) {
  console.log(arr)
})