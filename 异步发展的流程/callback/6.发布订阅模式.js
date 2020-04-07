//发布订阅模式--promise /redux 

// 发布 和 订阅两个没有什么关系，例如我们订牛奶，公司是发布者，我们是订阅者，但是送货确实配送员来送
// 发布 --- 中间件 --- 订阅


const fs = require('fs')


class Event {
  constructor() {
    this.cbs = []
    this.reslut = []
  }
  on(callback) {//订阅（电话订牛奶的人）
    this.cbs.push(callback)
  }
  emit(data) {//发布(公司接受订单)
    this.reslut.push(data)
    this.cbs.forEach(cb => cb(this.reslut))
  }
}

let subScr = new Event()

subScr.on(function (arr) { 
  if (arr.length == 2) {
    console.log(arr)
  }
})
subScr.on(function (arr) {
  if (arr.length == 1) {
    console.log(arr)
  }
})


fs.readFile('./age.txt', 'utf8', (err, data) => {//请求完成,发布出去
  //公司客服接到订单啊，然后发给库方
  subScr.emit(data)
})
fs.readFile('./name.txt', 'utf8', (err, data) => {//请求完成,发布出去
  subScr.emit(data)
})