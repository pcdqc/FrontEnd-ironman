var Parser = require('./parsePath.js'); //将系统变量转为每行一个值输出

var fs = require('fs');

//Read the contents of the file into memory.

fs.readFile('a.txt',function(err,logData){
	if(err) throw err;

	var text = logData.toString();

	var parser = new Parser();

	// console.log(parser.parse(text));
	var results = parser.parse(text);
	fs.writeFile('b.txt',results,function(err){
		if(err) throw err;
		console.log('done!')
	})
});