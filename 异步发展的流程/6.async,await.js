  //async,await 终结解决方案
  //解决了返回值的问题，可以try，catch，也解决了回调地狱
  // await后面必须跟一个promise
  let fs = require("fs");
  let path = require('path')
  let readFile = filename => {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, filename), 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  async function read() {
    console.log('begin')
    let a = await readFile("./1.txt")
    console.log(a)
    let b = await readFile("../template.txt"); //测试error
    console.log(b);
    let c = await readFile("./data.txt")
    console.log(c);
    return 'end'
  }

  let con = read(); //这个是promise对象所以我们如果想获得返回值需要then一下；

  con.then((data) => {
    console.log(data)
  }, (err) => {
    console.log(err)
  })
  /* 
  begin
1111111111
template
data
end
  */