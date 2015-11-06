var pet = {
	words: '...',
	speak:function(say){
		console.log(say+ ' '+this.words)
	}
}

// pet.speak('Speak')
var dog = {
	words:'wang'
}
pet.speak.call(dog, 'Speak')


// 原型对象prototype可以这么理解，是该类的实例对象的模板
// 通过这个可以让类的实力拥有相同的功能
String.prototype.say = function(){
	document.write(this);
}
"test".say();

var str = 'adfasfewfawe';
var a ={};
for(var i=0;i<str.length;i++){
	if(!a[str.charAt(i)]){
		a.[str.charAt(i)]=1;
	}
	else{
		a[str.charAt(i)]++;
	}
};
var Max =0 ;
var Index = '';
for(var i in a){
	if(a[i] > Max){
		Max = a[i];
		Index =i;
	}

}
console.alert(Max+':'+Index);


function Person(name){
	this.name = name;
}
Person.prototype.show = function(){
	alert(this.name);
}
function Worker(name,job){
	Person.apply(this,arguments);
	this.job = job;
}
for (var i in Person)


function test(str){
	alert(this.name + " " +str);
}
var object = new Object();
object.name = 'xxx';
test.call(object,"zhang")
// apply传递的是数组