/*
 * @Author: hubin 
 * @Date: 2020-04-13 11:52:37 
 * @Last Modified by: hubin
 * @Last Modified time: 2020-04-13 19:27:48
 */

//数据劫持的实现
//需求当我们obj改变数据的时候，我们要更新视图
// let obj = {
//   // name: 'hubin',
//   //数据的第二种形式
//   name:{name:'hubin'},
//   age: 18
// }

let arr = [1, 2, 3]


//数组的操作
let ArrMethod = ['push', 'pop', 'shift', 'unshift', 'splice', 'slice', 'sort', 'concat']
//这里面存放着是所有数组中的方法
let newProto = Object.create(Array.prototype)// newProto.__prtoto__ = Array.prototype
ArrMethod.forEach((method) => {
  //写method中的方法，同时还不影响数组原油方法的执行
  newProto[method] = function () {
    //更新视图的数据
    update()
    //并且可以执行原来的方法
    //这个位置牵扯到一个this的问题，要注意，因为如果用call来执行this的指向是Array.prototype,而不是arr本身
    Array.prototype[method].call(this,...arguments)
  // let old = Array.prototype[method]
  // old.call(this,...arguments)
  }
})
function update() { //这个相当于视图
  console.log('视图的数据更新了')
}

//对obj进行修改，修改成object.deifned形式,才会更新

function observe(obj) { //拦截器
  //因为我们需要对数组进行一个判断
  if (Array.isArray(obj)) { //这里面默认改变来我们数组执行的时候的查找方法的圆形 
    
    return obj.__proto__ = newProto 
  }
  if (typeof obj !== 'object') return obj
  for (let key in obj) {
    // 循环所有的数据，修改成合适的
    defineRect(obj, key, obj[key])
  }
}

function defineRect(obj, key, val) { //重新修改的数据
  //深度拦截
  if (typeof val == 'object') observe(val)
  Object.defineProperty(obj, key, {
    get() {
      return val
    },
    set(newValue) {
      if (typeof newValue == 'object') { //防止我们赋值的时候也是一个对象
        observe(newValue)
      }
      //更改数据，并且执行
      update()
      val = newValue
    }
  })
}

observe(arr) //数据的修改
// obj.name ='小黑'
// obj.name.name ='小黑'
//如果我们在修改数据的时候，我们自定以了一个数据，是深度数据
// obj.age = {num:10}
// obj.age.num = 100


//=====================================


//这里我们要做另外一种可能，就是数据可能是个数组
// arr[1] = 0  //这样是可以数据更新的
// arr.push(5) //这样是无法进行数据劫持的
arr.push(5)
console.log(arr)
//这里可以运用面向切片的思想来处理

// let ArrMethod = ['push', 'pop', 'shift', 'unshift', 'splice', 'slice', 'sort', 'concat']
// //这里面存放着是所有数组中的方法
// let prtoto = Array.prototype
// ArrMethod.forEach((method) => {
//   //写method中的方法，同时还不影响数组原油方法的执行
//   prtoto.method = function () {
//     //更新视图的数据
//     update()
//     //并且可以执行原来的方法
//     Array.prototype[method](...arguments)
//   }
// })
