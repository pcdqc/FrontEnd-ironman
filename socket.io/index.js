var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket){
	var temp = undefined;
	socket.on('connected', function (e){
		io.emit('chat message', e +' was connected!','')
		console.log(e + 'was connected')
	})
	socket.on('chat message', function (username,msg){
		temp = username;
		io.emit('chat message', username, msg);
	});
	socket.on('disconnect', function (username){
		io.emit('chat message', username+' was disconnected','')
		console.log(temp+' was disconneted');
	})
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});