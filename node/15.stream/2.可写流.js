// 创建一个可写的流
// 可写流的默认大小是16k
// const fs = require("fs");
// //createWriteStream(path,[options])
// let writable = fs.createWriteStream("./b.txt", {
//   highWaterMark: 3,
//   encoding: "utf8"
// });

//写入数据-->注意写入数据也不是一次性写入的是写入流的缓冲区，然后缓冲区满流之后在一次性写入到指定的文件中。
//当我们写入数据的时候，会有一个返回值，如果返回的是true那么可以继续写入，如果返回的false那么就意味的缓冲区写满流，默认的是写放到内存的缓冲中，等流的缓冲区写入文件后在写入文件
// let state = writable.write("1")
// console.log(state);//true
// state = writable.write("2")
// console.log(state)//true
// state = writable.write("3")
// console.log(state)//false
// state = writable.write("4")
// console.log(state)//fsle

//这个没有触发
// writable.on("close",()=>{
//   console.log("已经写入完成")
// })


//drain事件--->当我们的流的缓存区写满之后，写入文件，这时候流缓存区是空的时候触发
// function write(data, cb) {
//   console.log(writable.write(data))
//   if (!writable.write(data)) {
//     writable.once("drain", cb)
//   } else {
//     process.nextTick(cb)
//   }
// }
// write("1234", () => {
//   console.log('完成写入，可以进行更多的写入');
// })

//end([chunk],[encoding],cb) 方法 表明已没有数据要被写入可写流-->end表示最后写入的数据，如果在调用write会报错
// writable.write("hello")
// writable.end("最后数据")

//finish()事件  调用end事件完成，并且数据写入底层了触发
// writable.on("finish",()=>{
//   console.log("写入完成")
// })

//writable.cork() 强制把所有写入的数据都缓冲到内存中。 当调用 stream.uncork() 或 stream.end() 时，缓冲的数据才会被输出。
//当写入大量小块数据到流时，内部缓冲可能失效，从而导致性能下降， writable.cork() 主要用于避免这种情况。 对于这种情况，实现了 writable._writev() 的流可以用更优的方式对写入的数据进行缓冲。

//writable.uncork()将调用 stream.cork() 后缓冲的所有数据输出到目标。
//当使用 writable.cork() 和 writable.uncork() 来管理流的写入缓冲时，建议使用 process.nextTick() 来延迟调用 writable.uncork()。 通过这种方式，可以对单个 Node.js 事件循环中调用的所有 writable.write() 进行批处理。

// writable.write("写入",{encoding:"utf8"})
// writable.cork()
// writable.write("数据",{encoding:"utf8"})
// writable.cork()
// process.nextTick(()=>{
//   writable.uncork();//执行第一个只会执行写入
//   writable.end("相当于执行了第二个uncork");//执行第一个只会执行写入

// })
//writable.setDefaultEncoding(encoding)
