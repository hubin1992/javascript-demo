(function () {
  let e = document.createElement("meta")
  e.setAttribute("name", "viewport")
  let t = 1;
  if (navigator.userAgent.match(/Le/)) t = 1
  let a = t ? 1 / t : 1;
  e.setAttribute("content", "width=device-width,initial-scale=1,minimum-scale=" + a + ",maximum-scale=" + a + ",user-scalable=no");
  let head = document.querySelector("head")
  head.appendChild(e)

  //计算html字体的大小
  let width = document.documentElement.offsetWidth,
    fontSize = 100 / 750 * width
  document.querySelector('html').style.fontSize = fontSize + "px"
  window.addEventListener("resize", () => {
    var e = 100 / 750 * document.documentElement.offsetWidth
    document.querySelector("html").style.fontSize = e + "px"
  })
})()