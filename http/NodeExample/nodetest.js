 //永远不要传递字符串作为setTimeout的第一个参数！！！记住第一个参数只允许函数，或者匿名函数！
k= function print(g,k){
	console.log(g,k)
}
setTimeout(k,100,6,7);


process.stdin.on('readable',function(){
  var chunk = process.stdin.read();
  if(chunk !== null){
    process.stdout.write('data:' + chunk);
  }
});

process.stdout.on('data',function(data){
	console.log(data);
})
//为stdout注册data事件，我们就可以拿到它输出的内容了

process.stdin.setEncoding('utf-8')
//设置编码