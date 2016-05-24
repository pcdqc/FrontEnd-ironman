var fs = require('fs')

var stat = fs.statSync('a.txt')

//atime，mtime，ctime就分别代表了访问时间，修改时间以及创建时间
console.log(stat)
  uTable.queryParams = function (params) {
     var name = $("#userName").val();
     var token = $("#userToken").val();
     var st = $("#status").val();
     return {
         limit: params.limit,
         offset: params.offset,
         userName: name,
         token: token,
         status: st,
         serviceType: 1
     };
 };
