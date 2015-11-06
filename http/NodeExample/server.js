var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');



// http.createServer(function(req,res){
// 	res.writeHead(200,{"Content-Type":"text/plain"});
// 	res.write("it's alive!");
// 	send404(res);
// 	res.end();
// }).listen(8081);
// console.log('it\'s work in 8081')


var server = http.createServer(function(req,res){
	var filePath = false;
	if(req.url == '/'){
		filePath = "public/index.html";
	}else{
		filePath = "public" + req.url;
	}

	var absPath = './'+filePath;
	serverWorking(res,absPath)
})
var port_number = server.listen(process.env.PORT||3000)

function send404(res){
	res.writeHead(404,{"Content-Type":"text/plain"});
	res.write("Error 404: resource not found");
	res.end();
}

function sendPage(res,filePath,fileContents){
	res.writeHead(200,{"Content-Type":mime.lookup(path.basename(filePath))});
	res.end(fileContents);
}

function serverWorking(res,absPath){
	fs.exists(absPath,function(exists){
		if(exists){
			fs.readFile(absPath, function(err, data){
				if(err){
					send404(res);
				}else{
					sendPage(res,absPath,data);
				}
			});
		}else{
			send404(res);
		}
	});
}

server.listen(port_number);