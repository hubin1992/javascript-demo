class MyVue extends EventTarget{
  constructor(options) {
    super()
    this.options = options
    this.renderData()
    this.observe(this.options.data)
  }
  //数据监控
  observe(data) {
    Object.keys(data).forEach((attr) => {//这个位置有个问题，如果我们不如函数来封装起来会出现死循环的现象
      this.difinedReact(data, attr, data[attr])
    })
  }
  difinedReact(data, attr, value) {
    let _this = this
    Object.defineProperty(data, attr, {
      configurable: true,
      enumerable: true,
      get() {
        return value
      },
      set(newv) {
        //创建一个自定义事件
        //给每个属性名，创建一个方法池
        let newEvent = new CustomEvent(attr,{
          detail:newv
        })
        //触发也是在我们修改数据的时候  
        _this.dispatchEvent(newEvent)
        value = newv
        console.log(data)
      }
    })
  }
  //渲染数据
  renderData() {
    let el = document.querySelector(this.options.el)
    this.formatData(el)
  }

  //处理数据
  formatData(childs) {
    let childArr = childs.childNodes
    childArr.forEach((child) => {
      if (child.nodeType == 1) { // 节点
        if (child.childNodes.length >= 1) {//必须下面有节点，如果没有几点
          this.formatData(child)//递归思想，处理多个数据
        }
      } else if (child.nodeType == 3) {
        //我们获取到的是文本，然后我们看一下里面是否有符合我们需要的内容
        let reg = /\{\{\s*(\S+)\s*\}\}/g
        let con = child.textContent;
        if (reg.test(con)) {
          //这个位置是进入页面的第一次渲染
          let $1 = RegExp.$1
          child.textContent = con.replace(reg, this.options.data[$1])
          //同时为了我们第数据同步更新的时候，我们需要在这个条件下绑定一下反射方法
          this.addEventListener($1,function(e){//往事件池里面绑定方法
            let newValue = e.detail
            let oldVale = this.options.data[$1]
            let reg = new RegExp(oldVale,'g');//这个就是为了字符串的匹配
            child.textContent = child.textContent.replace(reg,newValue)
          })
        }
      }
    })
  }
}



// 思路解析
/*
  //1. 我们用正则匹配到，我们页面上的变量，然后拿着对应的变量去找到我们的数据
  //2. 利用我们的自定义事件，然后对没一个变量数据帮上一个事件池，当我们objectDefined的时候，set会触发dispatch，触发dispatchEvent,然后去执行我们事件池子里的方法，完成数据更新
*/