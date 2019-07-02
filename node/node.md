# NODE

### Node简要概述及解决的问题

* node是提供一种简单，高性能的开发工具
* web服务器主要的问题在于并发量
  * 传统的web服务器 java,php,之类的他们都是多线程的，例如来一个客户端请求，他们会开辟一个单独线程来服务，服务完成，如果没有线程池的话，直接挂起，如果有的话，会继续为下一个请求服务，占用内存比较大
  * node他是一个单线程并且非阻塞的 **i/o** 。 他只有一个线程，而且是非阻塞，当来一个请求的时候，他在去数据库找数据的时候，同时还可以接受处理另外的请求，当数据库响应回来数据的时候，他会在去处理第一个请求。他的内存开销比较小。
* node 是单线程，事件驱动，非阻塞 **i/0**的高性能的开发工具
* node由于是基于geogle的v8引擎，所以他的速度非常快。
* node因为是单线程的所以他不会有时间切片的切换时间的影响。同时也不会出传统web的锁的问题

***

### node的特点

##### 1. 为什么js是单线程

* 这是由于js这门语言决定的

  * 浏览器中js和ui是共用一个线程的。例如死循环的时候就显示不了页面

* H5 的web worker并没有改变js单线程的本

  * 他的原理，是在单线程的基础上再去增加附属的线程，来辅助主线程完成任务，而且辅助线程不能操作dom
##### 2. 浏览器模型

* 浏览器是一个多线程的
  * 它里面包含了ui和js线程，他们两个是共用一个线程
  * 事件触发线程
  * 定时器线程
  * 异步http请求的线程。。。。。

##### 3. 任务队列

* 所有的同步任务都在主线程上执行，形成一个执行栈
* 主线程之外还有一个任务队列，只要异步任务有了运行结果，就放到任务队列里面
* 一旦执行栈中同步执行完，就会按照顺序去读取任务队列的任务，然后读取到执行栈里面，进行执行
* 主线程一直在执行上面的三部分

##### 4. nodejs的event loop

![](/Users/hubin/learn-file/js/node/Snipaste_2019-05-09_13-47-28.png)



* v8引擎执行js脚本，
* 解析成功后，调用node Api
* libuv 负责nodeAPI的执行，他将不同的任务分配给不同的线程，以异步的方式将任务执行的结果返回给v8引擎**（同步+线程池来模拟的异步）**
* 引擎反馈给用户

##### 5.同步和异步（关注的是消息通知的方式，取决于被调用者）

* 同步：发出调用后，没有得到调用结果之前，该调用不会返回，一旦调用返回了就是得到了返回值。就是调用者主动的在等待调用结果
* 异步：调用发生后就直接返回了，但是这时候没有结果，等有结果后，被调用者会通过状态，回调或者通知，来处理这个返回的值。

##### 6. 阻塞和非阻塞（程序在等待调用结果时候的状态，取决调用者）

* 阻塞：是指调用结果返回之前，当前线程挂起，调用线程只有在返回结果的时候才会返回，中间不接受任何请求
* 非阻塞：就是发起来了请求，然后该线程接受了请求，但是不挂起，在返回结果之前会继续处理别的请求。

### 控制台

* console.log()
* console.infor()
* console.error()
* console.warn()警告
* console.dir()详细输出
* 求代码运行的时间差
  * console.time("属性名")开始计时
  * console.timeEnd("属性名")结束计时
* 用来追踪代码的调用栈
  * console.trace() 
* **断言—>做单元测试 **
  * Console.assert()

### 核心模块 process

* process 表示当前的进程

##### 常用的属性

* argv —>用来编写脚手架使用

* Process.pwd() 用来显示当前的路径

* process.chdir()用来改变当前路径

  ```js
  process.pwd();//显示当前路径
  process.chdir("..");//这样可以切换到上一级目录
  process.pwd();//返回的就是上一级目录
  ```

* process.nextTick() 把回调函数放在执行栈的尾部

* process.memoryUsage 检测当前内存的使用量

  ```js
  {
    rss: 20332544,   常驻内存
  
    heapTotal: 6537216, 堆内存的总申请量
  
    heapUsed: 3955808, 已经使用的量
  
    external: 8272 外部内存的使用量
  }
  ```



##### process.nextTick()和setImediate()的qubie

* nextTick 把回调函数放到当前执行栈的底部
*  setImmediate 把回调函数放在事件队列的尾部

```js
function read(){
  setImmediate(function(){
    console.log(1)
    setImmediate(function(){
      console.log(2)
      setImmediate(function(){
        console.log(3)
      })
      process.nextTick(function(){
        console.log(0)
      })
    })
  })
}
read();//1 , 2, 0, 3
```

### events

* events 比较重要，因为nodejs是基于事件驱动的

* events的原型上封装了大量的事件的方法

  * 用来绑定事件的函数

    1. on (type,cb)

    2. addListener(type,cb)

  * 用来移除事件的函数

    1. removeListener("type",cb)

    2. off("type",cb)

    3. removeAllListeners("type")

  * 仅仅执行一次的函数

    Once('type',cb)

  * 事件的触发器

    emit(type,argv1,argv2)

  * 关于事件绑定的数量

    1. setMaxListeners

    2. getMaxListeners

  * ```js
    let EventEmitter = require("evetns");
    class Bell extends EventEmitter {
      constructor() {//super必须写在constructor
        super();//继承私有的方法
      }
    }
    et bell = new Bell();
    // console.log(Object.getPrototypeOf(Bell));//EventEmitter
    // console.log(bell.__proto__.__proto__);//EventEmitter
    // console.log(bell.__proto__ == Bell.prototype );//true
    // console.log(Bell.prototype.__proto__);//EventEmitter
    let studentsInClassroom = () => {
      console.log("students in clsssroom")
    }
    
    let teacherInClassroom = ()=>{
      console.log("teacher in clsssroom")
    }
    
    let studentsGoOut = ()=>{
      console.log("students go out")
    }
    //类似于发布订阅模式
    bell.on("ring", studentsInClassroom)
    bell.addListener("ring", teacherInClassroom)
    bell.once("ring", studentsGoOut)
    // bell.off("ring",studentsGoOut)
    bell.removeListener("ring",studentsGoOut)
    bell.emit("ring")//第一次执行，三个都输出
    console.log("====================")
    //bell.emit("ring")//第二次输出，once的没有输出
    console.log(bell.getMaxListeners())
    console.log(bell.setMaxListeners(20))
    console.log("====================")
    console.log(bell.getMaxListeners())
    console.log("====================")
    bell.removeAllListeners()
    bell.emit("ring")
    ```

    

### module

##### 发展历程

1. 闭包，函数作用域
2. sea.js/require.js 
3. es6 module
4. Node.js(common.js)
5. umd(amd+cmd+es6+common.js的组合)

##### common.js好处

1. 封闭功能
2. 封闭作用域
3. 可能解决依赖问题
4. 工作效率更高，重构方便

##### node.js中common.js的解析

1. 在node.js中1个文件就是一个模块
2. 通过require方法，实现模块之间的依赖

##### 模块的分类

###### 4.1  原生模块（打包在node.exe）加载速度最快

1. path
2. fs
3. http
4. util
5. events

###### 4.2 文件模块

 	1. 文件模块（自己写的）===> 硬盘的某个位置上面
     * 后缀名为.js会读入内存然后运行
     * 后缀名为.json的会读入内存，然后用JSON.parse()转换为对象
     * 后缀名.node的文件，会经过编译后的二进制文件，可以直接使用
 	2. 第三方模块（npm 包下载的）
     	* 第三方模块查找的路径默认的是在当前文件的node_module下或者全局的目录下

###### 4.3 模块的加载策略

![require读取模块](/Users/hubin/learn-file/js/node/img/require读取模块.png)

##### module对象的属性

1. id ： 当前的模块的id永远是".",而其他的模块的id是他的绝对路径
2. Filename: 返回的是当前模块的绝对路径
3. Path: 第三方模块的查找路径
4. exports: {}  导出的路径
5. parent：null  是不是被人require了
6. children：[]  是不是require了
7. loaded :false 模块是否加载完成

##### require对象

###### require中常用的属性和方法

1. Require.reslove("path") ;//不引用，只是用来获取绝对路径
2. require.main：其实获取的就是module对象
3. Require.cache:{} 获取的是缓存的模块
4. Requrie.extensions 支持扩展的文件类型

##### 模块的使用

* 内部模块的使用

  ```js
  const fs  = require("fs")
  ```

* 自定义模块的使用

  ```js
  //定义一个模块(文件或者是文件夹)
  //注意：如果是文件夹，想要省略文件夹里面的文件名字我们默认写成a/index.js-->引用的时候require("./a")
  
  //如果是一个文件 a.js
  //第一种抛出的方式
  module.exports = {
    name:"haha",
    fn:function(){}
  } 
  //使用 a.js
  const {name,fn} = require("a")
  
  //第二种抛出方式
  name:"haha"
  function fn(){}
  module.export = {name,fn}
  //使用
  const {name,fn} = require("a")
  
  //第三种抛出方式
  name:"haha"
  function fn(){}
  module.exports.name = name
  module.exports.fn = fn
  //使用
  const obj = require("a")
  obj.name
  obj.fn()
  ```

* 第三方模块的使用

  > 第三方模块使用我们需要先去下载模块
  >
  > ```js
  > 1. npm install jquery  需要下载模块
  > 2. require(jquery) 直接使用
  > ```
  >
  > 注意： 我们在使用第三方模块的时候，最好使用国内的淘宝源，因为速度比较快
  >
  > ```js
  > npm install nrm -g
  > nrm ls
  > nrm use taobao
  > ```
  >
  > 第三方模块的依赖安装
  >
  > ```js
  > //如果是开发时
  > npm install xxx --save-dev   缩写成-D
  > 
  > //如果是运行时
  > npm install xxx --save  缩写成-D
  > ```
  >
  > 

### buffer

##### 什么是字节

* 字节是计算机存储时的一种计量单位，一个字节等于8位二进制数
* 一个位就代表0和1，每个字节是由8个位组成
* 字节是通过网络传输信息的单位
* 一个字节最大的十进制数是255 2^8-1

##### 进制

* 二进制 0b (0-1)
* 八进制 0o (0-7)
* 十六进制0x(0-9a-f)

##### js中进制转换

* 各种进制转换为10进制

  ```js
  //parseInt(num，进制)
  parseInt(10010,2) //18
  
  //手动转换的方法
  0*2^0 = 0
  1*2^1 = 2
  0*2^2 = 0
  0*2^3 = 0
  1*2^4 = 16
  16+0+0+2+0 = 18
  ```

  

* 十进制转换为 各种进制

  ```js
  //num.toString(进制)
  20.toString(2);10100
  
  20%2 = 10 .... 0 
  10%2 = 5 .... 0
  5%2 = 2....1
  2%2 =1 ....0
  1%2 = 0 ....1
  ```

##### 什么是buffer

- buffer 存在缓存区，它是用来处理输入输出数据的一断内存
- js中没有二机制的数据类型，而在处理TCP和文件流的时候，必须要处理二进制事件
- Node.js 提供了一个buffer对象来提供对二进制的数据操作
- 是一个表示固定内存分配的全局对象，也就是说要放到缓存中的字节数要提前确定

##### 如何定义buffer

###### 定义buffer的三种方式

```js
//第一种是我们最常用的
Buffer.alloc(len,default)这个只能确定buffer固定空间的大小

//第二种性能比第一种高，但是不够安全---》因为会有乱七八糟的字符在里面
Buffer.allocUnsafe(len)

//第三种是我们用来定义字符串或者汉字
Buffer.from();//更多用于定义字符串
```



##### Buffer中常用的方法

* fill(num,startIndex,endIndex) 填充

  ```js
  let buffer = Buffer.alloc(6);
  console.log(buffer) //<buffer 00 00 00 00 00 00>
  buffer.fill(3,1,3)
  console.log(buffer)// <buffer 00 03 03 00 00 00>
  ```

* write("字符串",startIndex,endIndex,编码格式)

  ```js
  let buf2 = Buffer.alloc(10)
  buf2.write("afafsdf", 0, 2, "utf8")
  console.log(buf2);//<buffer 61 00 00 00 00 00 00 00 00 00 00>
  ```

* writeInt8(num,index)在指定的位置写入num,限制8位一个字节（It must be >= -128 and <= 127. Received 254）

  ```js
  let buf3 = Buffer.alloc(6)
  buf3.writeInt8(10, 0)
  buf3.writeInt8(12, 1)
  buf3.writeInt8(16, 2)
  console.log(buf3);//<buffer 0a 0c 10 00 00 00>
  ```

* writeInt16BE,writeInt16LE,writeInt32BE,writeInt32LE

  * BE  big endian  --->高位在前，低位在后

  * LE  little endian  --->反之

    ```js
    let buf4 = Buffer.alloc(8)
    buf4.writeInt16BE(258, 0)
    console.log(buf4);//<Buffer 01 02 00 00 00 00 00 00>   高位在前所以正常显示
    buf4.writeInt16LE(259, 2)
    console.log(buf4);//<Buffer 01 02 03 01 00 00 00 00>   高位在后
    let s = buf4.readInt16BE(0);//从索引0 的位置读两个字节
    console.log(s)
    let s1 = buf4.readInt16LE(2)
    console.log(s1)
    ```

* slice(startInex,endIndex)截取

  ```js
  //slice字符串的截取
  let buffer6 = Buffer.alloc(6, 1)
  console.log(buffer6);//<Buffer 01 01 01 01 01 01>
  
  let buf7 = buffer6.slice(0, 3);//返回的是一个<Buffer 01 01 01>这个也是个浅拷贝，共用一个内存地址
  console.log(buf7)
  
  buf7.fill(4)
  console.log(buf7);//<Buffer 04 04 04>
  console.log(buffer6);//<Buffer 04 04 04 01 01 01>
  ```

* toString()

  * 只有用write写的buffer才可以转换成字符串，如果是用writeInt8或者类似的方法，我们转换后都称为了空

* copy-->克隆

  * 语法: 被克隆的buffer对象.clone(源对象，源开始的索引，被克隆开始的索引，被克隆结束的索引)

  ```js
  let buffer11 = Buffer.alloc(6)
  
  let buffer12 = Buffer.from("生如夏花")
  
  console.log(buffer12)//<Buffer e7 94 9f e5 a6 82 e5 a4 8f e8 8a b1>
  
  console.log(buffer11)//<Buffer 00 00 00 00 00 00>
  
  buffer12.copy(buffer11,2,4,7)
  
  console.log(buffer11)//<Buffer 00 00 a6 82 e5 00>
  
  ```

* concat buffer的拼接

  * 语法: Buffer.concat([list],totallength)

  ```js
  let buffer13 = Buffer.from("升入")
  let buffer14 = Buffer.from("夏花")
  // let buffer15 = Buffer.concat([buffer13,buffer14])
  //如果我们设置的totallength不足一个字的字符的时候，他会出现乱码
  let buffer15 = Buffer.concat([buffer13,buffer14],10);//升入夏�
  console.log(buffer15.toString())
  ```

* buf.length; --返回的buf字符串的长度

  ```js
  console.log(buffer15.length);//10
  ```

* isBuffer() —判断是否位buffer对象

  ```js
  console.log(Buffer.isBuffer(buffer15));//true
  ```


### fs

##### 常用的api以及解析

* fs.readFile(path,[options],cb(err, data))
  
  * Path —>路径，我们要注意一个问题当我们使用路径的时候 肯能要配合着path.join(__dirname,path)
  	* Options 这个就比较多我们最常用的参数就是编码格式 utf-8，或者是flag，默认的flag是r
  	* cb(err,data)  返回值
* fs.writeFile(path, data,[options],cb(err))
  
  * Data 写入的数据
* fs.open(path, flag,[mode],cb(err,fd))  打开文件
  
  * Path 是路径
  
  * flag  是类型，例如 w ，r，a
  
  * mode 是用户的权限 默认是ox666 可以可以写
  
  * fd 是在计算机里面的代号—>用阿拉伯数字来表示
  
    * 标准输入  0
  
      ```js
      process.stdin.on('data',(data)=>{
        console.log(data)
      })
      ```
  
    * 标准输出  1
  
      ```js
      console.log()//标准输出
      //相当于
      process.stdout.write('')
      ```
  
    * 错误输出  2
  
      ```js
      console.error('')
      //相当于
      process.stderr.write('')
      ```
  
      

* fs.read(fd,buffer,offset,lenth,postion,cb(err,readBytes,buffer)) 这个是读取部分文件
  * 注意：buffer一次性读取不要超过边界，如果超过边界，会报错
  * fd就是我们open里面的fd
  * buffer 是我们自己来创建的buffer，它是node里面的一个对象，用来存储数据的
  * offset从文件的第几个开始读取
  * len 一共读取几个
  * Postion 是我们从buffer的几个字节开始写入 默认我们一般是null。例如第一次是0-2，那么下次就是3-5
  * cb(err,readBytes,buffer)
    * readBytes —是我们一次读取到的位数
    * buffer和上面的buffer其实是一样的
* fs.write(fd,buffer,offser,len,postion,cb(err,writeBytes,buffer))

```js
//实例
//需求：我们不可能一次性读取整个文件，因为内存大小是固定的，所以我们采取的是读多少写入多少的
//思路：我们用到open打开，然后用一边读取一边写入的方式，多次递归来实现完整的写入
let fs  = require('fs');
let path  = require("path");
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
```

* fs.close(fd,(err))
  * Fd 就是open里面的fd
  * 由于写入的机制，是先写入缓存，然后等到了一定数量，会一起写入内存，所以我们在关闭文件的时候，强制把缓存区的也要写入到
    * fs.fsync(fd,(){ fs.colse(fd,(err)=>{})  })
  
* fs.mkdir(path,cb)

  * 注意这个不可以创建多个文件夹，而且创建的文件夹父目录必须存在

    ```js
    //例如
    fs.mkdir("a/b",function(err)=>{这样会报错，因为a文件夹不存在
             err?console.log(err):console.log("success")
     })
    ```

  * 所以我们要实现这种创建文件夹的方式，必须自己来实现

    ```js
    //利用递归的方式来创建文件夹
    //思路就是拆开一个个的来创建
    fuction mkdir_d(directory){
  let index = 1
      let arr = directoy.split("/");
      // console.log(arr);//[ 'a', 'b', 'c' ]
      !function next(index) {
        //我们首先要判断 "a" 然后 "a/b" 然后 "a/b/c"
        let curPath = arr.slice(0, index).join("/")
        if (index > arr.length) return
        fs.access(curPath, function (err) {
          if (err) {//就说明没有文件，那么我们就需要创建一个
            fs.mkdir(curPath, function (err) {
              err ? console.log(err) : next(++index)
            })
          }else{
            next(++index)
          }
        })
      }(index)
    }
    ```
    

* fs.access(path,[mode],cb) 

  * mode：权限默认的fs.constants.F_Ok(表明文件对调用进程可见。 这对于判断文件是否存在很有用) | fs.constants.R_Ok(表明文件对调用进程可见。 这对于判断文件是否存在很有用) | fs.constants.W_OK(表明调用进程可以写入文件。)

    ```js
    fs.access("./a",fs.constants.F_OK,function(err){
      err? console.log(err) : console.log("有文件")
    })
    ```

    

* fs.rmdir(path,cb)  删除空文件夹

  ```js
  fs.rmdir(path, callback)
  const fs = require("fs");
  fs.rmdir("c",function(err){
    console.log("删除空文件夹")
  })
  ```

* fs.unlink(path,cb) 删除文件

  ```js
  fs.unLink(path,cb)
  fs.unlink('path/file.txt', (err) => {
    if (err) throw err;
    console.log('文件已删除');
  });
  ```

* fs.readdir(path,[ options],cb(err, file))  读取文件夹中的内容

  * File 是一个数组
  * Options:{encoding:utf-8}

* Fs.stat(path,[options],cb(err,stats)) 将其转换为stat类，里面有很多常用的属性，例如isDirectory，

  * stat就是这个文件的详细信息



### path

* 路径拼接

```js
console.log(path.join("a","1.html")) ;//"a/1.html"
```

* ____dirname,___filename 显示绝对路径

```js
console.log(__dirname);///Users/hubin/learn-file/js/node/13.path 显示的是绝对路径

console.log(__filename);//显示的是当前文件的绝对路径

```

* basename(路径,后缀) 显示名字

```js
console.log(path.basename("1.jpg")) //1.jpg 显示的就是名字
```

* extname 显示扩展名字

```js
console.log(path.extname("1.jpg")) //.jpg
```

* parse(string)

```js
console.log(path.parse(__dirname)) 
{ root: '/',

  dir: '/Users/hubin/learn-file/js/node',

  base: '13.path',

  ext: '.path',

  name: '13' }

```

* path.format(obj) 这个obj是固定的方式{root,dir,base}

```js
console.log(path.format({

  root:"/root",

  dir:"a/b/c",

  base:"2.txt"

}));//a/b/c/2.txt像这样的默认是省略root

```

* path.reslove() // path.resolve() 方法将路径或路径片段的序列解析为绝对路径。

  ```js
  console.log(path.resolve());// /Users/hubin/learn-file/js
  console.log(path.resolve(".."))// /Users/hubin/learn-file
  ```

###  流(stream)

##### 流的概念

> 1. 流是一组有序的，有起点和终点的字节数据的传输手段
> 2. 他不关心整体文件，只关心是否从文件中读取到了数据，以及读到数据之后的整理
> 3. 流是一个抽象的接口，被node中很多对象所实现，比如http中req和request

#### 流的工作原理

> 1. 不论是可读流还是可写流都会在内部的缓存区中存储数据，当缓存区中数据满了之后才会去写入
> 2. 可以分别使用的 `writable.writableBuffer` 或 `readable.readableBuffer` 来获取。
> 3. 可缓冲的数据大小取决于传入流构造函数的 `highWaterMark` 选项。 对于普通的流， `highWaterMark` 指定了[字节的总数](http://nodejs.cn/s/K499k3)。 对于对象模式的流， `highWaterMark`指定了对象的总数。
> 4. 一旦内部的可读缓冲的总大小达到 `highWaterMark` 指定的阈值时，流会暂时停止从底层资源读取数据，直到当前缓冲的数据被消费 （也就是说，流会停止调用内部的用于填充可读缓冲的 `readable._read()`）。
> 5. 当调用 [`writable.write(chunk)`](http://nodejs.cn/s/doppiK) 时，数据会被缓冲在可写流中。 当内部的可写缓冲的总大小小于 `highWaterMark` 设置的阈值时，调用 `writable.write()` 会返回 `true`。 一旦内部缓冲的大小达到或超过 `highWaterMark` 时，则会返回 `false`。

#### 可读流

* fs.createReadStream(path,[options])
  * flag：读写位，默认的r
  * encoding：编码格式
  * start 开始的索引
  * end 结束索引（包含结束索引）
  * mode 权限 默认0o666可读可写
  * highWaterMark  流的大小默认是64*1024
* 

