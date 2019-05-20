/* 
  global 全局对象
  window里面也有全局对象，但是不能直接访问，浏览器里面的访问的global是通过window实现的
  1. global的变量是全局变量
  2. 所有的全局变量都是global的属性
*/

// 我们常用的属性
console.log(global);
//1. process 当前进程
//5.  stdout: [Getter],stderr: [Getter],stdin: [Getter]
//6. kill
//7. Buffer
/*
  clearImmediate: [Function: clearImmediate],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setImmediate:
   { [Function: setImmediate] [Symbol(util.promisify.custom)]: [Function] },
  setInterval: [Function: setInterval],
  setTimeout:
   { [Function: setTimeout] [Symbol(util.promisify.custom)]: [Function] } }

*/
