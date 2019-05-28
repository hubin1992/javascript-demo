//Buffer.propetype
//  console.log(Buffer.prototype)
// console.log(Buffer)
//=========================================
let buf1 = Buffer.alloc(6)
//fill(num,startIndex,endIndex) num就是buffer数字_
// buf1.fill(3,1,4);//猜一下 00 03 03 03  00 00
// console.log(buf1);//<Buffer 00 03 03 03 00 00>


//buf1.write("字符串",startIndex,endIndex,编码格式)
buf1.write("珠峰", 0, 6, "utf8")
// console.log(buf1)//<Buffer e7 8f a0 e5 b3 b0>
let buf2 = Buffer.alloc(10)
buf2.write("abcdefjhijklmn", 0, 1, "utf8")
// console.log(buf2)



let buf3 = Buffer.alloc(6)
//在指定的索引位置，写入内容
//writeInt8(num,index)--》指的是8位（It must be >= -128 and <= 127. Received 254）
buf3.writeInt8(10, 0)
buf3.writeInt8(12, 1)
buf3.writeInt8(16, 2)
// console.log(buf3);//<Buffer 0a 0c 10 00 00 00>
//writeInt16BE,writeInt16LE,writeInt32BE,writeInt32LE
//BE  big endian  --->高位在前，低位在后
//LE  little endian  --->反之
let buf4 = Buffer.alloc(8)
buf4.writeInt16BE(258, 0)
console.log(buf4);//<Buffer 01 02 00 00 00 00 00 00>   高位在前所以正常显示
buf4.writeInt16LE(259, 2)
console.log(buf4);//<Buffer 01 02 03 01 00 00 00 00>   高位在后
let s = buf4.readInt16BE(0);//从索引0 的位置读两个字节
console.log(s)
let s1 = buf4.readInt16LE(2)
console.log(s1)

//toString()--->只有用write写的buffer才可以转换成字符串，如果是用writeInt8或者类似的方法，我们转换后都称为了空
console.log("======")
console.log(buf4.toString());

//slice字符串的截取
let buffer6 = Buffer.alloc(6, 1)
console.log(buffer6);//<Buffer 01 01 01 01 01 01>

let buf7 = buffer6.slice(0, 3);//返回的是一个<Buffer 01 01 01>这个也是个浅拷贝，共用一个内存地址
console.log(buf7)

buf7.fill(4)
console.log(buf7);//<Buffer 04 04 04>
console.log(buffer6);//<Buffer 04 04 04 01 01 01>

//小实战使用 string_code模块解决乱码的问题

let buffer8 = Buffer.from("生如夏花")
let buffer9 = buffer8.slice(0, 5)
let buffer10 = buffer8.slice(5)
//原因就是不三不四，因为他获取到的是如的其中一个字节或者2个字节
console.log(buffer9.toString());//生� 
console.log(buffer10.toString());//�夏花
//解决的方法
let { StringDecoder } = require("string_decoder")
let ss = new StringDecoder();
console.log(ss.write(buffer9))//生
console.log(ss.write(buffer10));//如夏花


//copy-->克隆
//语法: 被克隆的buffer对象.clone(源对象，源开始的索引，被克隆开始的索引，被克隆结束的索引)
let buffer11 = Buffer.alloc(6)
let buffer12 = Buffer.from("生如夏花")
console.log(buffer12)
console.log(buffer11)
buffer12.copy(buffer11,2,4,7)
console.log(buffer11)

//concat buffer的拼接
//语法: Buffer.concat([list],totallength)
let buffer13 = Buffer.from("升入")
let buffer14 = Buffer.from("夏花")
// let buffer15 = Buffer.concat([buffer13,buffer14])
//如果我们设置的totallength不足一个字的字符的时候，他会出现乱码
let buffer15 = Buffer.concat([buffer13,buffer14],10);//升入夏�
console.log(buffer15.toString())

//buf.length; --返回的buf字符串的长度
console.log(buffer15.length)

//isBuffer()
console.log("=====")
console.log(Buffer.isBuffer(buffer15));//true




