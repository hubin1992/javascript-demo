/* 
  1. require是同步的
  2. 如果是同步的那么获取的会很慢，但是require他有一个缓存的机制require.cache
  3. 关于require的缓存机制很厉害，因为require他是根据绝对路径来的，所以我们不管什么文件引用其中的一个模块，只要引用过来，他都会缓存起来，然后下次在用的时候，直接走缓存，所以速度会很快
*/

let use = require("./1.js")
//1. 找到模块
//2. 然后会去读取里面的文件
//3. 然后去辨别是什么类型的文件（.js/.json/.node)
//如果是js那就封装成一个函数执行，如果是json文件就用json.parse()转换成对象返回
//4. 然后吧module.exprot 获取到的对象赋值给use

console.log(require.extensions)

  //require中几个常用的属性方法
  // 1. require.reslove 获取文件的绝对路径，但是不引用他
  // 2. require.main 获取当前文件的信息
  /* 
    Module：
      1.  id: "." //模块的id 入口模块的id(使用require的模块)永远为"."
      2.  exports 我们是不是导出了
      3.  parent :我们在什么地方引用过他
      4.  filename: /Users/hubin/learn-file/js/node/01day/8.module/use1.js
      5.  loaded 是否加载完成
      6.  children 是否require其他的文件／在这其实就是1.js
      7.  paths 第三方模块的查找路径
  */
  //3. extensions  扩展文件
  /* 
    { '.js': [Function], '.json': [Function], '.node': [Function] },
    //require寻找文件的机制
    1. 先寻找.js文件
    2. 然后在寻找 .json
    3. 最后才去寻找.node 的二进制的文件
    //因此，我们在引用.js的时候可以省略，但是引用require后面两个的时候，我们最好是带上后缀，因为这样可以提高性能。
  */
 //4. cache:缓存
