let fs = require('fs');
let path = require('path')
//node中调用回调函数的第一个参数永远是err
//读取文件的时候会牵扯到一个路径的问题，__dirname表示当前环境的文件夹，不然会总是提示找不到

// fs.readFile(path.join(__dirname,"./1.txt"),'utf8',function(err,data){
//   if(err){
//     console.log(err)
//   }else{
//     console.log(data)
//   }
// })

/* 
  回调函数的问题
  1.无法捕获错误 try，catch 不能使用
  2.无法return
  3.回调地狱
*/

//问题1
// function read(filename) {
//   fs.readFile(path.join(__dirname,filename), 'utf8', function(err, data) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(data)
//     }
//   })
// }

// var f = read("./1.txt");//因为是异步，所以没有返回值。
// console.log(f);//undefined;
// //问题2
// //只能捕捉同步的，异步无法捕捉
// try{
//   var f = read("./1.txt")
// }catch(e){
// }
//问题3
//场景-->比如说我们去服务器上读取一个html页面，我们首先要读取模版，然后在去读取数据。
//因为这是串行，所以比较耗时，而且不容易维护。
fs.readFile(path.join(__dirname,"template.txt"),'utf8',function(err,temp){
  fs.readFile(path.join(__dirname,"data.txt"),"utf8",function(err,data){
    console.log(temp +" "+data)
  })
})

//解决回调的性能问题
//1.发布订阅模式--->这样就是异步执行了，最起码不是串行了，就是并行了
//node的核心模块，他是一个类，类上有两个方法，on用来监听，emit用来发射
let Events = require('events');
let event = new Events();
let html = {}
event.on('ready',function(key,value){
  html[key] = value
  //Object.keys()
  if(Object.keys(html).length == 2){
    // console.log(Object.keys(html));//[ 'temp', 'data' ]遍历对象的健，返回的是一个数组
    console.log(html)
  }
})
//自定的事件名称，然后我们传递给自定义事件回调的参数
fs.readFile(path.join(__dirname,"template.txt"),'utf8',function(err,temp){
  event.emit('ready','temp',temp)
})
fs.readFile(path.join(__dirname,"data.txt"),"utf8",function(err,data){
  event.emit('ready','data',data)
})