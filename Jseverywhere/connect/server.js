var http = require('http'),
	fs = require('fs');
var connect = require('connect');
// var server = http.createServer( function (req,res) {
// 	if('GET' == req.method && '/images' == req.url.substr(0,7)
// 							&&'.jpg' == req.url.substr(-4)) {
// 		fs.stat(__dirname + req.url, function (err, stat) {
// 			if(err || !stat.isFile()) {
// 				res.writeHead(404);
// 				res.end('Not Found');
// 				return ;
// 			}
// 			serve(__dirname + req.url, 'application/jpg');
// 		});
// 	}else if('GET' == req.method && '/' == req.url){
// 		serve(__dirname + '/index.html', 'text/html');
// 	}else{
// 		res.writeHead(404);
// 		res.end('Not Found');
// 	}

// 	function serve (path, type) {
// 		res.writeHead(200, { 'Content-Type': type });
// 		fs.createReadStream(path).pipe(res)
// 		/* <==>
// 		fs.createReadStream(path)
// 			.on('data', function(data) {
// 				res.write('data');
// 			})
// 			.on('end', function(){
// 				res.end();
// 			})
// 		*/
// 	}
// });
var server = connect.createServer(function (req,res){
	console.log('%s %s',req.method, req.url)
});
server.use(connect.static(__dirname + '/website'));
console.log(__dirname)
server.listen(3000);
console.log('started! at 3000')