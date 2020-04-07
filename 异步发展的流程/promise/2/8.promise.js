
let promise = new Promise(function(resolve,reject){// 这就是执行器
  //如果这样我们只能转换为一个状态
  setTimeout(()=>{ //如果我们这为异步哪如何处理
    resolve(123) //自带的也是输出123，我们自己写的没有输出
  },1000)
})

// console.log(promise) ;//pending

promise.then((value)=>{
  console.log(value)
},(err)=>{
  console.log(err)
})

