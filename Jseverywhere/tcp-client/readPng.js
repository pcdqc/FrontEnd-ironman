var http = require('http');
var fs = require('fs')
http.createServer(function (req,res){
	res.writeHead(200, { 'Content-Type': 'image/png'});
	var stream = fs.createReadStream('image.png').pipe(res);
	/*
	stream.on('data', function (data){
		res.write(data)
	});
	stream.on('end', function (){
		res.end();
	});
	*/

}).listen(3000)