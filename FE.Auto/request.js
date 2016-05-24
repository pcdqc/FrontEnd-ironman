var request = require('request');
var fs = require('fs')
request('http://www.163.com', function (error, response, body){
	if(!error && response.statusCode == 200 ){
		fs.writeFile('body.txt', body, 'utf-8',function(){
			console.log('done!')
		})
	}
})