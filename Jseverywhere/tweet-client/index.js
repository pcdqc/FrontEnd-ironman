var http =require('http'),
	qs = require('querystring')

http.createServer(function (req,res){
	var body = '';
	req.on('data', function (chunk){
		body+=chunk;
	})
	req.on('end', function(){
		res.writeHead(200);
		res.end('Done');
		console.log('\n got name: \033[96m'+ qs.parse(body).name +'\033[39m\n');
	});
	 
}).listen(3000);