//load the fs(filesystem) module

var fs = require('fs');

//Read the contents of the file into memory
fs.readFile('test.txt',function(err,logData){

	//if an error occured, throwing it will
	//display the exception and end our app.
	if(err) throw err;

	//logData is a buffer,convert to string
	var text = logData.toString();

	var results ={};

	//Break up the file into lines.
	var lines = text.split('\n');
	lines.forEach(function(line){
		var parts = line.split(' ');
		var letter = parts[1];
	 
		var count = parseInt(parts[2]);

		if(!results[letter]){
			results[letter] = 0;
		}

		results[letter] += parseInt(count);
	});

	console.log(results);
})

//Node.js典型的模式是使用异步回调。基本上，你告诉
// Node.js要做的事，它执行后便会调用你的函数（回调函数）。
// 这事因为Node是单线程的。在你等待回调函数执行
// 过程中,Node课继续执行其他事物，不必被阻塞
// 知道该请求完毕。