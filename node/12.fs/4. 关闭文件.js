// 如果我们打开了一个文件，那么肯定要关闭文件，负责他的mode会一直不断增加，而每个计算打开文件数量是有限制的，所以为了避免系统报错，我们要随手关闭文件，释放Fd
//
const fs = require("fs");

fs.open("./1.txt", "r", 0o666, function (err, readFd) {
  //由于我们的读取或者是写入的时候，是先走缓存，然后到一定的体积再去写入内存中，所以我们需要强制把内存的内容一起清理掉，这才是最优的关闭文件的方法
  fs.fsync(readFd,function () {//后面会详细的研究一下
    fs.close(readFd, function () {
      console.log("关闭了")
    })
  })

})