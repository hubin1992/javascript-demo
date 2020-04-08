let Promise = require('./Promise')



Promise.resolve(100).then((data)=>{
  console.log(data)
})

// new Promise((resolve,reject)=>{
//   resolve(100)
// }).then(data=>{
//   console.log(data)
// })