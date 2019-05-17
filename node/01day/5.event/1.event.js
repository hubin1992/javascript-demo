/* 
  events
  1.这个是node的很重要的模块，因为Node是基于事件驱动的
  2. events 模块里面就封装了node里面大量的事件的方法
*/
//从node中引用模块
//  let EventEmitter = require("events");//返回的是一个类
let EventEmitter = require("./2.自定义event");//返回的是一个类
// console.log(EventEmitter.prototype);
// console.log(EventEmitter);
// 常用的方法
/* 
用来绑定事件的函数
1. on 
2. addListener
用来移除事件的函数
1. removeListener
2. off
3. removeAllListeners

仅仅执行一次的函数
1. once()

事件发射器，主动的去触发事件的
1. emit(type,argv1,argv2)

关于事件绑定的数量
1. setMaxListeners
2. getMaxListeners

*/

// 让Bell 来继承EventEmitter里面的所有方法
class Bell extends EventEmitter {
  constructor() {//super必须写在constructor
    super();//继承私有的方法
  }
}
let bell = new Bell();
// console.log(Object.getPrototypeOf(Bell));//EventEmitter
// console.log(bell.__proto__.__proto__);//EventEmitter
// console.log(bell.__proto__ == Bell.prototype );//true
// console.log(Bell.prototype.__proto__);//EventEmitter
let studentsInClassroom = (num) => {
  console.log(`students in clsssroom ${num}`)
}

let teacherInClassroom = (num) => {
  console.log(`teacher in clsssroom ${num}`)
}

let studentsGoOut = () => {
  console.log("students go out")
}
//类似于发布订阅模式
bell.on("ring", studentsInClassroom)
bell.addListener("ring", teacherInClassroom)
bell.once("ring", studentsGoOut)
//bell.removeListener("ring",studentsGoOut)
bell.emit("ring", "301")//第一次执行，三个都输出
bell.emit("ring", "302")//第一次执行，三个都输出
//console.log("====================")
//bell.emit("ring")//第二次输出，once的没有输出
//console.log(bell.getMaxListeners())
// console.log(bell.setMaxListeners(20))
// console.log("====================")
// console.log(bell.getMaxListeners())
// console.log("====================")
// bell.removeAllListeners()
// bell.emit("ring")



