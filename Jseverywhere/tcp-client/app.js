require('http').createServer(function (req,res){
	res.writeHead(200);
	res.end('Helloworld')
}).listen(3000)
console.log('listen 3000')