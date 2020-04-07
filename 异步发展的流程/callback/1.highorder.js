// 判断类型
//Object.prototype.toStirng.call()
// 普通函数
// function isType(obj,type){// includes 是array中的一个新的方法，返回的是布尔值
//   return Object.prototype.toString.call(obj).includes(type)
// }

// let obj = {}
// console.log(isType(obj,'Object')) ;//true
// console.log(isType(obj,'String')) ;//false

// //如果我们写错了--那么上面就惨兮兮里，所以我们最好用高阶函数来预置参数
// console.log(isType(obj,'Object1'));//false

//==================================================
//高阶函数1， 返回的是一个函数
//柯里化函数来解决问题
//柯里化：就是函数只有一个参数
let type = ['String','Number','Null','Undefined','Boolean','Symbol','Function','Array','Object','RegExp']
let fns = {}
type.forEach((type)=>{//批量生成方法
  fns['is'+type] = isType(type)
})

function isType(type){
  return function(obj){
    return Object.prototype.toString.call(obj).includes(type)
  }
}
let a  = true
console.log(fns.isBoolean(a));//true

