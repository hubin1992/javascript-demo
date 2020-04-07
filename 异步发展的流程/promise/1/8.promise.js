// 异步的缺陷
//1. 回调可能会导致代码不好维护，构成回调地狱
//2. 不好捕获错误
//3. 同步 ‘异步请求’ 需要借助计数器
//4. 代码不够优雅

//解决的方法 promise来解决

//Promise 是一个类   new Promsise 天生自带
//Promise 含义：承诺  
//promise 有三个状态 成功态 失败态 (等待态) reject resolve pending
//promise中默认有两个变量 分别是value和reason
//promise还有一个then的方法
//pendding状态只能转换成成功态或者失败态转换完成后不能改变 
//exception” is a value that is thrown using the throw statement：如果直接报错，也要走reject方法
// let Promise = require('./Promise sync')
let promise = new Promise(function(resolve,reject){// 这就是执行器
  //如果这样我们只能转换为一个状态
  setTimeout(()=>{ //如果我们这为异步哪如何处理
    resolve(123) //自带的也是输出123，我们自己写的没有输出
  },1000)
  // reject(456)
  // throw new Error('错误了')
})

// console.log(promise) ;//pending

promise.then((value)=>{
  console.log(value)
},(err)=>{
  console.log(err)
})

