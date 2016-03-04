String.method('deentityify',function(){
	//字符实体表。它映射字符实体的名字到对应的字符

	var entity = {
		qout:'"',
		lt:'<',
		gt:'>'
	};

	//返回denentityify方法

	return function(){
		return this.replace(/$([^&;]+)/,
			function(a,b){
				var r = entity[b];
				return typeof r === 'string' ? r : a;
			});
	};
}());
//使用（）立刻调用我们刚刚构造出来的函数，这个调用创建出来并返回的函数才是deentityify方法

//cury柯里化
Function.method('curry',function(){
	var args =arguments,that = this;
	return function(){
		return that.apply(null,args.concat(arguments));
	}
})//arguments并非数组，所以不能使用concat方法
Function.method('curry',function(){
	var slice = Array.prototype.slice,
	//slice.apply()
	// Function.apply(obj,args)方法能接收两个参数

 //    obj：这个对象将代替Function类里this对象

 //    args：这个是数组，它将作为参数传给Function（args-->arguments）
	args = slice.apply(arguments),
	that = this;
	return that.apply(null,args.concat(slice.apply(arguments)));
})


//记忆  优化
var fibonaccci = function(){
	var memo = [0,1];
	var fib = function(n){
		var result == memo[n];
		if(typeof  result !== 'number'){
			result = fib(n-1) +fib(n-2);
			memo[n] =reuslt;
		}
		return result;
	};
	return fib;
}();

//memoizer函数取得一个初始的memo数组和formula函数
//它返回一个管理memo储存和在需要时调用formula函数的 recur函数
var memoizer = function(memo, formula){
	var recur = function(n){
		var result = memo[n];
		if(typeof result !== 'number'){
			result = formula(recur,n);
			memo[n] = result;
		}
		return result;
	}
	return recur;
};

//fibonacci
var fibonacci = memoizer([0,1],function(recur,n){
	return recur[n-1]+recur[n-2];
});

通过设计这种产生    另外一个函数的函数          ,极大减少了我们的工作量


var factorial = memoizer([1,1],function(){
	return n*recur(n-1)
})



//inherit
Function.method('new',function(){
	//创建一个对象，它继承自构造器函数的原型对象
	var that = Object.create(this.prototype);
	//调用构造器函数，绑定-this-到新对象上
	var other = this.apply(that,arguments);
	//如果它的返回值不是一个对象，就返回该新对象
	return (typeof other === 'object' && other) || that;
});

var Mammal = function(name){
	this.name = name;
}
Mammal.prototype.get_name = function(){
	return this.name;
};
Mammal.prototype.says = function(){
	return this.saying || '';
};
//构造一个实例
var myMmmal = new Mammal('Herb ths Mammal');
var name = myMmmal.get_name()
//现在我们可以构造另一个伪类来继承Mammal，这是通过定义它的constructor
// 函数并替换他的prototype为一个Mammal实例来实现的
var Cat = function(name){
	this.name = name;
	this.saying = 'meow';

}
//替换Cat.prototype为一个新的Mammal实例
Cat.prototype = new Mammal();
Cat.prototype.purr = function(n){
	var i,s='';
	for(var i=0;i<n;i++){
		if(s){
			s += '-';
		}
		s+='r';
	}
	return s;
};
Cat.prototype.get_name = function(){
	return this.says() + ' ' +this.name +' '+this.says;
}


伪类模式本意是想向面向对象模式靠拢，但它看起来格格不入。我们可以隐藏一些丑陋的喜酒，
通过method方法来定义一个inherits方法来实现
Function.method('inherits',function(parent){
	this.prototype = new Parent();
	return this;
})
我们的inherits和method方法都返回this,这样允许我们可以采用级联的形式编程


var myMmmal = {
	name:'Herb the Mammal',
	get_name:function(){
		return this.name;
	}
	,say:function(){
		return this.saying||'';
	}
};

//create方法
if(typeof Object.beget !== 'function'){
	Object.create = function(o){
		var F = function(){};
		F.prototype = o;
		return new F();
	};
}
// var anoher_stooge = Object.create(stooge)
