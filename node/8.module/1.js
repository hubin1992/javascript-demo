/* 
  //发展历程
  1. 闭包，自执行函数
  2. require.js/sea.js
  3. node.js(common.js)
  4. es6中模块化
  4. umd(amd+cmd+es6+common)

  //在node中，一个文件就是一个私有作用，也称作包，然后他的每一个变量都是私有变量this指向的是当前的包
*/
// console.log(module)
let name = "Hroot"
let age = 17
module.exports = {
  name,
  age
}

  //module的本质还是一个闭包，上面的代码相当于
  // (function () {
  //   let name = "Hroot"
  //   let age = 17
  //   module.exports = {
  //     name,
  //     age
  //   }
  //   return  module.exports
  // })()


