
// Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

// 语法
// Object.defineProperty(obj, prop, descriptor)
// configurable：是否可删除
// enumerable 是否可枚举
// value ：该属性对应的值
// writable：是否可改写

// get  属性访问器
// set
// 注意：如果我们写来get和set 就不能在写value和writable

// obj 是要定义的对象
// prop 要定义或修改的属性的名称
// descriptor 要定义或修改的属性描述符。

// 修改完成后，会自动返回修改好的对象

// 注意：默认情况下，使用 Object.defineProperty() 添加的属性值是不可修改（immutable）的。
//=================================================
// 基本写法
let obj = {}; //必须要先定义一个对象
let a = 100; // 这个位置，我们是用来返回的或者修改的时候用的
Object.defineProperty(obj, 'a', {
  enumerable: true, // 加上这个可以枚举的属性就可以循环
  configurable: true, // 加上这个属性就可以删除来
  // writable:true, //加上这个属性就可以改写来
  // value: 100,

  get() {
    // 属性访问器  -- 如果有属性访问器，就不能写value和writable
    return a;
  },
  set(val) {
    a = val;
  },
});
// 循环
// for(i in obj){ // 这样我们在无法输出obj[i]
//   console.log(obj[i])
// }

// 删除a 的值
// delete obj.a
// console.log(obj) ;// 默认是[a:100]

// 改写a的值
obj.a = 200;
console.log(obj.a); // 默认也是无法改写的
console.log(obj); // { a: [Getter/Setter] }
//=================================================


// 另外一种写法啊 
let obj1 = {
  _a: 100,
  get a() {
    return _a
  },
  set a(val) {
    _a = val
  }
}
console.log(obj1)
obj1.a = 200
console.log(obj1.a)