/**
 * Created by hubin on 2018/4/4
 */

var url  =require("url");
//var str = 'http://localhost:8080/index.html?name=1&age=2';

console.log(url.parse(str));

// Url {
//     protocol: 'http:',
//         slashes: true,
//         auth: null,
//         host: 'localhost:8080',
//         port: '8080',
//         hostname: 'localhost',
//         hash: null,
//         search: '?name=1&age=2',
//         query: 'name=1&age=2',
//         href: 'http://localhost:8080/index.html?name=1&age=2'
// }


console.log(url.parse(str,true));//加上ture之后，qurey成为了一个对象，直接给拆分好了
//query: { name: '1', age: '2' },
