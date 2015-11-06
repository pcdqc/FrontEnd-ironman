var http = require('http'),
	urls = ['www.baidu.com','www.sina.com','www.163.com'];
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var util = require('util');
var child_process = require('child_process');

function fetchPage(url){
	// if(err) throw err;
	var start = new Date();
	http.get({host:url},function(res){
		// console.log("Got Response from:"+url);
		// console.log("Request took:",new Date -start ,"ms");
	});

}
for(var i=0;i<urls.length;i++){
	fetchPage(urls[i]);
}


var re1=url.parse('http://www.google.com')
// console.log(re1)S
// console.log('\n');
var re2=url.parse('http://www.google.com?page=1',false)
// console.log(re2)

var url1 = url.format({
protocol:'http:',
hostname:'www.baidu.com',
port:'80',
pathname:'/news',
query:{page:1}
});
// console.log(url1)

// url.resolve('http://www.baidu.com','/one')
// url.resolve('http://www.baidu.com/news','http://www.163.com')

var data = path.normalize('/path///../');
// console.log(data)

var data1 = path.basename('foo/strong/basename/index.html' );
var data2 = path.basename('foo/strong/basename/index.html','html');
// console.log(data1)
// console.log(data2)

var result = querystring.stringify({foo:'bar',cool:['xux','yys']});
// console.log(result);
var result1 = querystring.stringify({foo:'bar',cool:['xux','yys']},'*','$');
//第二三个参数 指定默认的分割符和分配符
// console.log(result1)

var end = util.inspect({foo:'bar',cool:'bpb'} );
console.log(end)



//子进程
// var child = child_process.spawn(command);
// child.stdout.on('data',function(data){
// 	console.log(data);
// })
//通过执行命令得到返回结果，我们就可以拿到标准输出流数据了。

// var child_process = require('child_process');
// child_process.exec(command,function(err,stdout,stderr){
// 	console.log(stdout);
// })