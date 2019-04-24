define(['jquery',"serverce/serverceSaleman","require","saleman/index"],function($,serverceSaleman,require){
  return function (){
     var addStr = `
     <form>
      <label for="name">姓名: </label> <input  id="name"/>
      <label for="age">年龄: </label> <input id="age"/>
      <button type="submit">提交</button>
     </form>
     `
     var $addStr = $(addStr)
     $addStr.on("submit",function (e) {
        //防止我们点击立马发送给后台 
       e.preventDefault();
       let name = $(this).find("input[id='name']").val()
       let age = $(this).find("input[id='age']").val()
       serverceSaleman.add(name,age);//添加到原始数据中
      //回到初始页面
      // $(".aside > .aside-item:eq(0)").trigger("click")
      //salemanIndex(); //salemanIndex is not a function-->循环依赖了
      //解决循环依赖的方法
      require("saleman/index")();//引入require模块，完美解决掉
     })

     $(".main .content").html($addStr)
  }
})