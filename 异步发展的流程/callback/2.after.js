//after loadsh库里面的一个放啊放
//作用：执行固定次数后，来执行回调函数

function after(num, cb) {
  //首先我们要判断cb是不是一个函数
  if (!Object.prototype.toString.call(cb).includes('Function')) {
    throw new Error('cb is not a function')
  }
  return function () {
    //--num 是先减
    if (--num <= 0) {//第一次执行的时候num3 第二次num2  第三次是1
      cb()
    }
  }
}

//after 执行返回的就是一个函数，而我们fn执行就相当于返回的函数执行
let fn = after(3, function () {
  console.log('after')
})

fn()
// fn() //如果我们注释掉这个那么cb就不会执行
fn()//这一次之后才会输出after