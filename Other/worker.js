var fibonacci = function(n){
	return n<2 ? n : arguments.callee(n-1)
};
self.addEventListener('message',function(event){
	self.postMessage(fibonacci(event.data))
},false);