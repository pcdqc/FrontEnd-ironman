var http = require('http');
var fs = require('fs')
http.createServer(function (req, res) {
  var str = req.url;
  str = str.slice(str.lastIndexOf('=')+1)
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var json = `${str}({'name':'message from server'})`
  res.end(json);
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
