class MyVue {
  constructor(options) {
    this.options = options
    this.renderData()
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
        this.formatData(child)//递归思想，处理多个数据
      } else if (child.nodeType == 3) {
        //我们获取到的是文本，然后我们看一下里面是否有符合我们需要的内容
        let reg = /\{\{\s*(\S+)\s*\}\}/g
        let con = child.textContent;
        if (reg.test(con)) {
          let $1 = RegExp.$1
          child.textContent = con.replace(reg, this.options.data[$1])
        }
      }
    })
  }
}