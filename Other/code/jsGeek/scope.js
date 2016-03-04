var j=100;
~ 波浪线的作用是把后边的内容当成一个表达式。
~(function test(){
	console.log(j)
})();
// var m=100;
// function test(){
// 	console.log(m);
// }();

var j=100;
function test(){
	console.log('test2'+j)
	var j;
	var k = 1000
	//这里var声明的变量会提前 所以会是undefind


	return  function(){
		return k ;
	}
	//闭包 可能造成内存泄露
}

var t = test()();
console.log(t)

// #JS是函数级作用域。在内部的变量，都可以访问。在外部不能访问