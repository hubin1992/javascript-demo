define(["jquery", "serverce/serverceSaleman", "require", "saleman/index"], function ($, serverceSaleman, require) {
  return function (id) {
    let changeStr = `
      <form>
        <label for="name">新的姓名:</label> <input  id="name"/>
        <label for="age">新的年龄:</label> <input  id="age"/>
        <button type="submit" class="btn">确认修改</button>
      </form>
    `
    //转换为jq对象--->仅仅是为了绑定事件
    let $changeStr = $(changeStr)

    $(".main .content").html($changeStr)

    $changeStr.on("submit", function (e) {
      e.preventDefault();
      let name = $(this).find("input[id='name']").val()
      let age = $(this).find("input[id='age']").val()
      //改变数据
      serverceSaleman.change(id, name, age)
      //返回首页，重新获得改变的数据
      require("saleman/index")()
    })


  }
})