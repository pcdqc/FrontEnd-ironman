var net = require('net')

//追踪连接数


//创建服务器
var server = net.createServer(function (conn){
	//handle
	
	console.log('\033[90m   new connection !\033[39m');
	conn.write(
		'\n > welcome to \033[92mnode-chat\033[39m!'+ 	
		'\n > ' + count + 'other people are connected at htis time.'+ 	
		'\n > please write your name and press enter: '
	);
	var count = 0,
		users = {};
	count++;
	conn.setEncoding('utf8');
	var nickname;
	conn.on('data', function (data){
		//删除回车符
		console.log(data)
		data = data.replace('\r\n', '')
		if (!nickname){
			console.log('checked nickname')
			if (users[data]) {
				conn.write('\033[93m> nickname already in use.try again:\033[39m ');
				return;
			}else{
				nickname = data;
				users[nickname] = conn;

				for(var i in users){
					users[i].write('\033[90m> '+ nickname + ' joined the room\033[39m\n');
				}
			}
		}else{
			//否则视为聊天消息
			for(var i in users) {
				if(i!= nickname){
					users[i].write('\033[96m > ' +nickname+ ':\033[39m ' + data +'\n');
				}
			}
		}
	})
	conn.on('close', function(){
		console.log('one user quited!')
		count--;
	})
});

//监听
server.listen(3000, function () {
	console.log('\033[96m   server listenning on * :3000\033[39m');
});