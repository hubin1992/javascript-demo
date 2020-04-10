
// let 不可以重复声明   
// let a = 1;
// let a = 2;
// Identifier 'a' has already been declared



//不存在变量提升
// console.log(a) ;//Cannot access 'a' before initialization
// let a = 1
// let 会存在自己的作用域，他不属于全局
// for(var i = 0;i<10;i++){
//   setTimeout(() => {
//     console.log(i) ;//此处输出的是10
//   }, 0);
// }


//修改
// for(let i = 0;i<10;i++){  // let 配合大括号，形成一个作用域
//   setTimeout(() => {
//     console.log(i) ;// 
//   }, 0);
// }

//const  常量不可以改变，但是如果是对象，可以改变里面的属性

// const a = 1;
// a =2; //Assignment to constant variable.

const obj = {a:1}
obj.a = 2
console.log(obj)

