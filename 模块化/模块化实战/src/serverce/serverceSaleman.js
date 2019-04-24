define([],function($){//模拟后台返回数据，实战中这个就用来做ajax请求的页面
  var salemanList = [
    {name:"哈利",age:108,id:0},
    {name:"马克",age:18,id:1},
    {name:"项羽",age:8,id:2},
  ]
  return {
    getList(){
      return salemanList
    },
    add(name,age){
      salemanList.push({name,age})
    },
    del(name){

    },
    search(name){

    },
    change(id,name,age){
      salemanList.forEach((item)=>{
        if(item.id == id){
          item.name = name
          item.age = age
        }
      })
      console.log(salemanList)
    }
  }
})