require.config({
  baseUrl:"js",
  paths:{
    jquery:"lib/jquery-3.3.1.min",//由于jq源码导致，我们的名字必须是jquery
    serverce : "../serverce"
  }
})

define(["jquery","saleman/index"],function($,salemanIndex){
  $(".aside").on("click",".aside-item",function(){
      let attr = $(this).attr("data-id")
      if(attr=="saleman"){  
        //如果是销售员，我们去请求销售员的数据
        salemanIndex()
      }else if(attr == "car"){
        //如果进入到这里面肯定是要请求车的数据
      }else if(attr == "supplier"){
        //如果是供应商，肯定是要请求供应商的数据

      }
      //当前选择项的样式
      $(this).addClass("active").siblings().removeClass("active")
  })
  //默认显示的是一个
  //trigger(type,fn)-->用来触发指定type的执行的函数
  $(".main .aside-item:eq(0)").trigger("click")
  $(".main .aside-item:eq(0)").addClass("active")
})