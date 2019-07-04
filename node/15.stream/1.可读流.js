//创建一个可读流

let fs = require("fs");
// fs.createReadStream(path,[options])
/* 
flags <string> 参阅支持的文件系统标志。默认值: 'r'。
encoding <string> 默认值: null。
fd <integer> 默认值: null。 读写模式
mode <integer> 默认值: 0o666。 权限
autoClose <boolean> 默认值: true。
start <integer> 开始索引
end <integer> 默认值: Infinity。 结束索引
highWaterMark <integer> 默认值: 64 * 1024。 读取流的大小
*/
let readable = fs.createReadStream("./a.txt", {
  highWaterMark: 3,
  //如果我们不设置默认的返回的是buffer
  encoding: "utf8"
});
console.log(readable)

readable.on("data", (chunk) => {
  console.log(chunk)
  //暂停读取
  readable.pause()
  console.log("2秒后恢复执行")
  setTimeout(function () {
    //恢复执行
    readable.resume()
  }, 2000)
})

//如果报错
readable.on("error", (err) => {
  console.log(err)
})


readable.on("end", function (chunk) {
  console.log("读取完了")
})

readable.on("close", () => {
  console.log("文件已经关闭")
})


//readable事件  --> 当流中有数据可供读取时触发一次，当到达流数据的尽头时， 'readable' 事件也会触发，但是在 'end' 事件之前触发。



