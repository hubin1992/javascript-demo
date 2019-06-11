//fs 复制文件，为了打到内存合理利用，我们采用读取多少，就写入多少的手法来
//利用position为null自动放到后面的原理
let fs = require("fs")

function read_file(src, targe) {
  const buf = Buffer.alloc(3)
  fs.open(src, "r", 0o666, function (err, readFd) {
    fs.open(targe, "w", 0o666, function (err, writeFd) {
      !function next() {//我们这个位置要读取多次的原因，就是要使整个文件全部读完
        fs.read(readFd, buf, 0, 3, null, function (err, bytesRead, buffer) {
          console.log(buffer.toString())
          if (bytesRead > 0) {//bytesRead 因为我们最后读取的可能会小雨buffer的大小
            fs.write(writeFd, buf, 0, bytesRead, null, next)
          }
        })
      }()
    })
  })
}
read_file("./1.txt", "./3.txt")