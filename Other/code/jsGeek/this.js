//谁调用指向谁
this.m =1000;
var obj = {
	m:100,	
	test:function(){
		console.log(this.m)
		//闭包返回一个函数 （抛出去 ）
		//调用这个function时就是在外部调用的环境中了
		return function(){
			console.log(this.m)
		}
	}
};
// (obj.test()) ();
//里边的这个function指向到了外边 window

var style ={
	color:'green'
}
test();



function test(){
	alert(this.style.color);
}
document.getElementById('test').onclick = test;


function test2(){
	this.a = 1 ;
}
test2.prototype.geta = function(){
	return this.a;
}


var p = new test2;
// console.log(p.geta());

function test3(){
	this.a =1;
}
test3.prototype.a = 100;
var p1 = test3;
// console.log(p1.a)

function setName(obj) {
    obj.name = "Nicholas";
    obj = new Object();
    obj.name = "Greg";
}
var person = new Object();
setName(person);
alert(person.name);//=>"Nicholas"