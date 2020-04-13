/*
 * @Author: hubin 
 * @Date: 2020-04-13 11:52:37 
 * @Last Modified by:   hubin 
 * @Last Modified time: 2020-04-13 11:52:37 
 */

//数据劫持的实现
//需求当我们obj改变数据的时候，我们要更新视图
// let obj = {
//   // name: 'hubin',
//   //数据的第二种形式
//   name:{name:'hubin'},
//   age: 18
// }

let arr = [1,2,3]

function update() { //这个相当于视图
  console.log('视图的数据更新了')
}

//对obj进行修改，修改成object.deifned形式,才会更新

function observe(obj) { //拦截器

  for (let key in obj) {
    // 循环所有的数据，修改成合适的
    defineRect(obj, key, obj[key])
  }
}

function defineRect(obj, key, val) { //重新修改的数据
  //深度拦截
  if(typeof val == 'object') observe(val)
  Object.defineProperty(obj, key, {
    get() {
      return val
    },
    set(newValue) {
      if(typeof newValue == 'object'){ //防止我们赋值的时候也是一个对象
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
arr.push(5) //这样是无法进行数据劫持的