//1.assert
// assert(condition,message)
// assert(a==1, "Disater!a is not 1!")
// assert 的实现













// 2.性能分析
start = new Date().getTime();
for(var n=0;n<maxCount;n++){
	// perform the operation to me measured
}
elapsed = new Date().getTime() - start;
assert(true,"Measured time: " +elapsed);


var log = function(){
	//Modern browsers
	if(typeof console != 'undefined' && typeof console.log== 'function'){
		//opera11
		if(window.opera){
			var i=0;
			while(i<arguments.length){
				console.log('Item ' + (i+1)+ ': ' +arguments[i]);
				i++;
			}
		}
		//all oter modern browsers
		else if ((Array.prototype.slice.call(arguments)).length == 1 && typeof Array.prototype.slice.call(arguments)[0] == 'string') {
			console.log( (Array.prototype.slice.call(arguments)).toString() );
		}
		else{
			console.log( Array.prototype.slice.call(arguments) );
		}
	}
}

function log(){
	try{
		console.log.apply(console, arguments);//尝试使用最常见的犯法记录信息
	}
	catch(e){//捕获日志记录过程中的异常失败
		try{
			opera.postError.apply(opera, arguments);//尝试使用opera方式记录日志
		}
		catch(e){
			alert(Array.prototype.join.call( arguments, " "));//如果都不行，则使用alert函数
		}
	}
}


//构建forEach函数演示函数上下文功能
function forEach(list,callback){
	for(var n=0;n<list.length;n++){
		callback.call(list[n],n)
	}
}
var weapons = ['shuriken','katana','nunchucks'];
forEach(
	weapons,
	function(index){
		assert(this == weapons[index],
			"Got the expected value of" +weapons[index]);
	}
);