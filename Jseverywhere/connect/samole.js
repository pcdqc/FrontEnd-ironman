var connect = require('connect'),
	time = require('./request-time')
var server =  connect.createServer();
server.use(connect.logger('dev'));

/*实现时间控件*/
server.use(time({ time: 500 }));
//给time赋值为500 不赋值会默认为./request-time的100
/*实现快速响应*/
server.use('/my-images', connect.static('/website/images'))
server.use(function (req, res, next) {
	if('/a' == req.url) {
		res.writeHead(200);
		res.end('Fast!');
	}else{
		next();
	}
});

/*实现模拟的慢速响应*/
server.use(function (req, res, next){
	if('/b' == req.url){
		setTimeout(function (){
			res.writeHead(200);
			res.end('Slow!')
		}, 1000);
	}else{
		next();
	}
})
server.listen(3000)