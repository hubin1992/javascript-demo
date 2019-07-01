
//学习几个api，然后用异步的方法实现删除一个非空目录
//1. 删除空文件夹 --->一次也就删除一个
fs.rmdir(path, callback)
const fs = require("fs");
fs.rmdir("c",function(err){
  console.log("删除空文件夹")
})

//2. 删除文件
fs.unLink(path,cb)
fs.unlink('path/file.txt', (err) => {
  if (err) throw err;
  console.log('文件已删除');
});

//3. 我们要读取到这个目录的内容
// fs.readdir(path[, options], callback(err,files))  options:{encoding,withFileTypes}

// const fs  = require("fs")
// fs.readdir("a",{encoding:"utf8"},function(err,files){//[file获取的是目录中的包含的内容]
//   err? console.log(err) : console.log(files)//[ '3.txt', 'b' ]
// })

//同步删除非空文件夹的实现方法
const fs = require("fs")
const path = require("path")
function rmdir_D_sycn(dir) {
  let dirCont = fs.readdirSync(dir);
  dirCont.forEach(function (item) {
    let curPath = path.join(dir, item)
    let child = fs.statSync(curPath)
    if (child.isDirectory()) {
      console.log("isDirectory")// 由于是同步执行，所以只有当这个里面所有的文件执行完成了才去执行fs.rmdir
      rmdir_D_sycn(curPath)
    } else {
      fs.unlinkSync(curPath)
    }
  })
  console.log("rmdirSync")
  fs.rmdirSync(dir);//最后三次一起执行
}
// rmdir_D_sycn("a")

//异步方式删除非空文件夹
//思路：
//1. 我们首先要转换成state类，来判断他是文件和文件夹，如果是文件我们直接删掉，如果是文件夹我们在继续递归调用自用。
function rmdir_D(dir) {//写了三版的递归压根不好处理，只能考虑用promise来试一下
  return new Promise((resolve, reject) => {

    fs.stat(dir, function (err, stats) {//我理解的是将整个文件夹转换成这个stat类
      if (err) return reject(err)
      if (stats.isDirectory()) {
        fs.readdir(dir, function (err, files) {
          if (err) return reject(err)
          Promise.all(files.map((item) => {// [b,1.html]
            rmdir_D(path.join(dir, item)).then(() => {//当所有的都删除完成后，在去删除自己
              fs.rmdir(dir, resolve)
            });
          }))
        })
      } else {
        fs.unlink(dir, resolve)
      }
    })
  })
}
rmdir_D("c3")