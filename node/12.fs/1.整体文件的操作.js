/* 
  fs node中操作文件的核心模块
  fs.readFile(path,[options],cb(err,data))-->mode是权限用16位来表示
  fs.writeFIle(path,[options],cb(err))
  
*/
//读取文件
let fs  = require("fs");
let path  = require("path")
// fs.readFile("./1.txt",function(err,data){
//   if(err){
//     console.log(err)
//   }else{
//     console.log(data)
//   }
// })
//这里出现了一个问题，我们直接使用runcode运行代码的时候，一直报错，是由于服务器环境的导致需要修改一下代码
//path.join()是路径的拼接
//__dirname:表示当前文件的路径名
// console.log(__dirname);//Users/hubin/learn-file/js/node/12.fs
// fs.readFile(path.join(__dirname,"./1.txt"),function(err,data){
//   if(err){
//     console.log(err)
//   }else{
//     console.log(data);//<Buffer 31 32 33 34 35 36 37>
//   }
// })
//我们直接这样返回的是一个buffer对象,因为我们的运行机制，是通过内存调用，而nodejs就是通过buffer对象的这个机制，来让内存识别的。

//修改编码的读取格式
//第一种方式--->toString
// fs.readFile(path.join(__dirname,"./1.txt"),function(err,data){
//   if(err){
//     console.log(err)
//   }else{
//     console.log(data.toString());//1234567
//   }
// })
//第二种方式是我们常用的,直接可以在readFile中设置编码格式
fs.readFile(path.join(__dirname,"./1.txt"),{encoding:"utf8",flag:"r"},function(err,data){
  if(err){
    console.log(err)
  }else{
    console.log(data);//123456
  }
})



//=====================================
//写入文件--如果没有默认的是新建，如果有了会覆盖
//fs.writeFile("文件路径",data,[opations],cb(err))--》如果err是null
fs.writeFile(path.join(__dirname,"./2.txt"),"data",{encoding:"utf8"},function(err){
  console.log(err)
})


