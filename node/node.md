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
  * 浏览器触发线程
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

* process 表示当前的进

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

##### 从模块外部访问模块内部的变量

```js
//1.js
let name  = "Hroot"
let age = 18
module.export = {
  name,
  age
}
//2.js
let User = require("./1.js")
```

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



















 