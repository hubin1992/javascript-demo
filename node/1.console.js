//标准输出流  代号1
console.log(1)
console.info(2)

//错误输出流 代号2
//错误 & 警告
console.warn(3)
console.error(4)

// > 表示文件重定向
//运行 node 1.console.js > a.log 这样会把我们的标准输出流运行结果写入到a.log中
//运行 node 1.console.js > a.log 2>&1  这样会把我们的运行结果写入到a.log中

//用来判断这段代码运行的时间
//注意 "time和endtime内部的变量必须一致"
console.time("const");
i = 0;
while (i++ , i < 1000) {

}
console.timeEnd("const"); //返回结果const: 0.168ms

//断言
console.assert()//用来做单元测试的

//跟踪代码的调用栈
console.trace()
/* 
Trace
    at Object.<anonymous> (/Users/hubin/learn-file/js/node/01day/tempCodeRunnerFile.js:1:71)
    at Module._compile (internal/modules/cjs/loader.js:701:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:712:10)
    at Module.load (internal/modules/cjs/loader.js:600:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:539:12)
    at Function.Module._load (internal/modules/cjs/loader.js:531:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:754:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:622:3)

*/
//查看对象所有详细属性和方法
console.dir(global)

