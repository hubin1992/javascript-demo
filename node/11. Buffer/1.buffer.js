//如何定义一个buffer
//Buffer.alloc("num",默认值)--->这样比较消耗性能，因为他先找到内存，然后抹掉，然后在填充
let buf1 = Buffer.alloc(6); //分配一个长度为6个字节的buffer，这样设置会把所有的字节设置为0
console.log(buf1)//<Buffer 00 00 00 00 00 00>
let buf2 = Buffer.alloc(8,2);
console.log(buf2)//<Buffer 02 02 02 02 02 02 02 02>


//===========================

//Buffer.allocUnsafe()看名字就知道是不安全的。但是他是直接开辟的空内存
let buf3 = Buffer.allocUnsafe(8);
console.log(buf3);//<Buffer 01 00 00 00 01 00 00 00>

//Buffer.from()通过字符串的方式
let buf4 = Buffer.from("6")
console.log(buf4);;//<Buffer 36>
buf4  = Buffer.from("22")
console.log(buf4);//<Buffer 32 32>
