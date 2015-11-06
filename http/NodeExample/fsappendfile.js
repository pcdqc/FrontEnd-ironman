var fs = require('fs');
var iconv = require('iconv-lite')

fs.readFile("test.txt",function(err,data){
	if(err) throw err;

	var text = data.toString();
	// console.log(data.code)

	// var str = iconv.decode(data,'utf-8');
	// var str1 = iconv.encode(str,'gbk');
	// process.stdout.write(str1)

	// process.stdout.setEncoding('gbk2312');不支持
	var result =[];
	var lines = text.split('\n');

	lines.forEach(function(line){
		var parts = line.split('\t');
		var re = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		var arr = re.exec(parts)
		if(arr!==null && arr!==undefined){
			// console.log(arr)
			fs.appendFile('mail.txt',arr,function(err){
				if (err) throw err;

				console.log('The mail was appended to file!')
			})

		}
		// console.log(time)
	})
	fs.rename('mail.txt','邮箱.txt',function(){
		if(err) throw err;
		console.log('done!')
	})
})
console.log('i\' am done!')