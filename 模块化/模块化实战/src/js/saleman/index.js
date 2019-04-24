define(["jquery","serverce/serverceSaleman","saleman/add","saleman/change"],function($,serverceSaleman,salemanAdd,salemanChange){
  //serverceSaleman --->是我们请求的数据文件例如ajax
  var data  = serverceSaleman.getList()
  var newData = data.map(item=>{//返回的是一个数组
    return `<tr><td>${item.name}</td><td>${item.age}</td></tr>`
  }).join("")
  return function (){
    //在这个文件中我们首先要拼接销售员的列表
    //然后添加到content中去
    var str = `
      <div>
        <div>操作:
          <button>查询</button>
          <button class="add">增加</button>
        </div>
      </div>
      <table cellpadding="30px" border="1px solid #ccc">
        <thead>
          <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>修改</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(item=>{//返回的是一个数组
            return `<tr data-id=${item.id}><td>${item.name}</td><td>${item.age}</td><td><button class="change">编辑</button></td></tr>`
          }).join("")}
        </tbody>
      </table>
    `
    //给add绑定事件
    var $str = $(str);
    // console.log($str);//[div, text, table]
    $str.on("click",".add",function(){
      salemanAdd()
    })
    $str.on("click",".change",function(){
      let dataId = $(this).parents("tr").attr("data-id")
      salemanChange(dataId)
    })
    //添加到页面中去
    $(".main .content").html($str)
  }
})