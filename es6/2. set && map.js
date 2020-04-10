//set(arr) 类似于数组，成员都是唯一的,没有重复的值 

//作用1 数组去重复

let arr = [1, 2, 3, 4, 51, 3, 2]
let newArr = new Set(arr)
// console.log(newArr)//Set { 1, 2, 3, 4, 51 }
// 转换成数组
// console.log([...newArr])//[ 1, 2, 3, 4, 51 ]

//set上常用的方法
//size 相当于lenth
// console.log(newArr.size) //5

//add() --- 往末尾添加一个新的数值
// console.log(newArr.add(0));//Set { 1, 2, 3, 4, 51, 0 } 增加数值

//clear() --- 清空map
// newArr.clear()
// console.log(newArr);//Set {}

//has() -- 查找，返回的是布尔值
// console.log(newArr.has(0))


//entries() //直接循环出所有的数值 [index,value]
// console.log(newArr.entries())

//keys() --》 循环出所有的索引值
// console.log(newArr.keys())

//values()
// console.log(newArr.values())

//symbol.iterator()  --- 有这个借口，意味这可以用for of 来便利，他可以直接替代values()

// for(v of newArr){
//   console.log(v)
// }

//set 实际应用

//求并集
//求差集
//求交集

let arr1 = [1, 2, 3, 4, 5, 1]
let arr2 = [3, 5, 7, 8, 9, 3]

function unionSet() { //并集
  let newArr = new Set([...arr1, ...arr2])
  return [...newArr]
}
unionSet()

function difference() {//差集合
  let newArr1 = [...new Set(arr1)] 
  let newArr2 = new Set(arr2)
  return newArr1.filter((v) => { //过滤，符合条件的出来，返回的是一个新数组
    return !(newArr2.has(v)) //这个判断的条件是，必须arr1中而arr2中没有
  })
}
difference()

function interSection(){
  let newArr1 = [...new Set(arr1)] 
  let newArr2 = new Set(arr2)
  return newArr1.filter((v) => {
    return (newArr2.has(v)) 
  })
}
console.log(interSection()) 

