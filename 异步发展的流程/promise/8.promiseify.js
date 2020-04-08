// 这个是将一个方法promsie化 
const fs = require('fs')
let bluebird = require('bluebird')

let read = bluebird.promisify(fs.readFile)

read('./name.txt','utf8').then(data=>{
  console.log(data)
})