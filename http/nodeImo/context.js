// var pet = {
// 	word:'...',
// 	speak:function(){
// 		console.log(this.words);
// 		console.log(this === pet)
// 	}
// }

// pet.speak()

// function pet(words){
// 	this.words = words;
// 	console.log(this.words)
// 	console.log(this===global)
// }

// pet('$$$')

function Pet(words){
	this.words = words;
	this.speak = function(){
		console.log(this.words);
		console.log(this)
	}
}

var cat = new Pet('Miao')

cat.speak()

// this指向当前函数的拥有者，通常把拥有着叫做执行上下文
// this 只能在函数内部使用

// call需要一个参数列表而apply允许你传递一个参数作为数组
// 更改对象this指向的内容