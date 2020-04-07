const fs = require('fs');

let arr = []
let num = 0

//异步不能用try，catch 来解决错误,所以我们node中回调函数的第一个永远是err
fs.readFile('./name.txt', 'utf8', function (err, data) {
  num++
  fn(data, 1) 
})


fs.readFile('./age.txt', 'utf8', function (err, data) {
  num++
  fn(data, 0)
})

//需求1，如果我们想同时拿到两个异步的数据，放到我们的一个数组中返回给前台

// function fn(data) {//这样就解决了
//   arr.push(data)
//   if(arr.length ==2){
//     console.log(arr)
//   }
// }

//需求2，因为这个是异步的请求，我们不知道是哪一个先执行完成，如果我们始终要保持名字是第一个
//我们可以考虑在回调函数fn(data,index),饭后修改一下fn函数
// function fn(data,index) {
//   arr[index] = data
//   if (arr.length == 2) {
//     console.log(arr)
//   }
// }
//出现了问题:我们如果后面的索引有了数据，那么前面的索引会自动添加为空，如果我们用arr.length作为判断，他会输出两个
/* 
[ <1 empty item>, '胡滨' ]
[ '28', '胡滨' ]
*/

//解决需求2的问题
//问题的解决方式，我们可以考虑一下自定义个index，通过判断index的值来输出
function fn(data,index) {
  arr[index] = data
  if (num == 2) {
    console.log(arr)
  }
}

