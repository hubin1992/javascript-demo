//pipe方法的原理
var fs  = require("fs");
const readable = fs.createReadStream("./1.txt",{encoding:"utf8"})
const writable = fs.createWriteStream("./2.txt",{encoding:"utf8"})


// readable.on("data",(chunk)=>{//开始读取的时候触发
//   //判断是否写满了
//   var flag = writable.write(chunk)
//   if(!flag){
//     //如果满了我们就暂停写入
//     readable.pause()
//   }
// })

// writable.on("drain",()=>{//当写入完成清理完了，会触发drain事件，然后我们再去读取流里面读取
//   console.log("写入流清空完成")
//   readable.pause()
// })

// readable.on("end",function(){
//   writable.end("success")
// })

//pipe 方法的用法
readable.pipe(writable)

//unpipe() 移除管道，其实这个没有多大的意思

