//aop 面向切片编程，把原来的代码切成片，在中间加上我自己的代码
//装饰器：扩展原有的方法，重写原有的方法

//例如
//需求：say方法，是原先有的一个方法，我们想再say前面加上一个方法，并且这个方法，不影响原来的方法，而且只有在特定的时候才会出现
//原有的方法
function say() {
  console.log('say')
}

//解决1：这种方法肯定不行，这样会影响所有的使用者
function say1() {
  console.log('小嘿嘿')
  console.log('say')
}
//解决2: 面向切片的编程:创造一个独立空间。然后把这个空间里面存上我们默认的函数执行，和我们要扩展的方法，当我们在符合条件的时候去执行这个方法，而且对原来的say方法没有任何影响
Function.prototype._before=function (fn) {  
  return  ()=>{  
    fn()
    this()
  }
}

let fn = say1._before(function () { 
  console.log('小嘿嘿')
 })

fn()



