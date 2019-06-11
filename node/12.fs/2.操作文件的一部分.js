//当文件特别大的时候，我们需要精确的控制读取的字节数
//fs.open(path,flag,mode,cb(err,fd));
//flag 标志，是读还是写，还是追加
//mode 就是权限，一般是可读写的 0o666
//方法
//读取
let fs = require("fs")
let path = require("path")
fs.open("./1.txt", "r", 0o666, (err, fd) => {
  //fs.read(fd,buffer,offset,length,postion,cb)
  //buffer 是我们要自己创建的内存
  //offset 我们buffer中那个位置开始写入
  //postion 是我们读取的开始索引
  //length 是一共要读取多少个
  let buffer = Buffer.alloc(3)
  // fs.read(fd,buffer,0,3,0,function(err,bit,buffer){//此处的buffer和上面的buffer是一样的
  //   console.log(buffer.toString())//123
  // })

  //如果超出边界，那么会报错
  // fs.read(fd,buffer,2,3,0,function(err,bit,buffer){//此处的buffer和上面的buffer是一样的
  //   console.log(buffer.toString())//The value of "length" is out of range
  // })

})

//写入
//如果是"w",那么他永远是清空，然后重新写入
//如果是"a",那么就是追加
//position 必须是写入的文件夹里面有内容，如果没有会出现乱码
//position 如果不写
fs.open("2.txt", "a", 0o666, function (err,fd) {
  fs.write(fd,Buffer.from("大黑"),0,3,function(err,bitWritten,buffer){
    console.log(err);//是否报错
    console.log(bitWritten);//写入的字节数
    console.log(buffer.toString());//写入的buffer
  })
})





//fd : file dispcriptor 文件描述符 --》其实就是操作系统给的一个数字，来代表这个文件，从0开始
//0 标准输入
// process.stdin.on('data',function(data){
//   console.log(data)
// })
// //1 标准输出 consle.log("hello")
// process.stdout.write('hellow')
// //2 标准错误输出 console.error()
// process.stderr.write("wrong")

