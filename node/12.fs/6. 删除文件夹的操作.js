
//学习几个api，然后用异步的方法实现删除一个非空目录
//1. 删除空文件夹 --->一次也就删除一个
// fs.rmdir(path, callback)
// const fs = require("fs");
// fs.rmdir("c",function(err){
//   console.log("删除空文件夹")
// })

//2. 删除文件
//fs.unLink(path,cb)
// fs.unlink('path/file.txt', (err) => {
//   if (err) throw err;
//   console.log('文件已删除');
// });

//3. 我们要读取到这个目录的内容
// fs.readdir(path[, options], callback(err,files))  options:{encoding,withFileTypes}

// const fs  = require("fs")
// fs.readdir("a",{encoding:"utf8"},function(err,files){//[file获取的是目录中的包含的内容]
//   err? console.log(err) : console.log(files)//[ '3.txt', 'b' ]
// })

//同步删除非空文件夹的实现方法
const fs  = require("fs")
const path = require("path")
function rmdir_D_sycn(dir){
  let dirCont = fs.readdirSync(dir);
  dirCont.forEach(function(item){
      let curPath = path.join(dir,item)
      let child =  fs.statSync(curPath)
      if(child.isDirectory()){
        console.log("isDirectory")// 由于是同步执行，所以只有当这个里面所有的文件执行完成了才去执行fs.rmdir
        rmdir_D_sycn(curPath)
      }else{
        fs.unlinkSync(curPath)
      }
  })
  console.log("rmdirSync")
  fs.rmdirSync(dir);//最后三次一起执行
}
rmdir_D_sycn("a")