var http =require('http');
var qs = require('querystring')

var search = process.argv.slice(2).join(' ').trim()
if(!search.length){
	return console.log('\n   Usage: node tweets<search term>\n');
}
console.log('\n    searching for: \033[96m'+ search+'\033[39m\n')
http.request({
	host: 'api.twitter.com/1.1',
	path: '/search/tweets.json?q=?' + qs.stringify({q: search})
}, function (res){
	console.log(res)
	var body = '';
	res.setEncoding('utf8');
	res.on('data', function (chunk){
		body += chunk;
	});
	console.log(body)
	res.on('error', function(){
		console.log('error')
	})
	res.on('end', function(){
		var obj = JSON.parse(body);
		obj.results.forEach(function (tweet){
			console.log('    \033[90m' + tweet.text + '\033[39m');
			console.log('    \033[94m' + tweet.from_user + '\033[39m');
			console.log('--');
		});
	});
}).end()
















/*
function send(theName){
		http.request({
		host: '127.0.0.1',
		port: 3000,
		url: '/',
		method: 'POST',
		headers: {   
		    'Content-Type':'application/x-www-form-urlencoded',
	    } 
	},function (res){
		res.setEncoding('utf8');
		res.on('end', function (){
			console.log('  \n We got: \033[96m'+ body +'\033[39m\n');
			process.stdout.write('    \n your name:');
		});
	}).end(qs.stringify({name: theName}));
}
process.stdout.write('\n     your name:');
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (name){
	send(name.replace('\n', ''));

});
*/