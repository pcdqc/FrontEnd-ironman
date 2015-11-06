var PORT = 3000;
var http = require('http');
var url = require('url');
var fs = require('fs');
var mine = require('./mine').types;
var path = require('path');

var server = http.createServer(function(req,res){
	var pathname = url.parse(req.url).pathname;
	// console.log(pathname);
	var realPath = path.join('demoPage',pathname);
	console.log(realPath)
	//console.log(realPath);
	var ext = path.extname(realPath);
	ext = ext? ext.slice(1) :'unknown';
	fs.exists(realPath, function(exists){
		if(!exists){
			res.writeHead(404,{
				'Content-type':'text/palin'
			});

			res.write("This request URL" + pathname + " was not found on this server.");
			res.end();
		}else{
			fs.readFile(realPath,'binary',function(err,file){
				if(err){
					res.writeHead(500,{
						'Content-type':'text/plain'
					});
					res.end(err);
				}else{
					var contentType = mine[ext] ||" text/palin";
					res.writeHead(200,{
						'Content-type':contentType
					});
					res.write(file,"binary");
					res.end();
				}
			});
		}
	});
});
server.listen(PORT);
console.log("server runing at port " + PORT +'.')