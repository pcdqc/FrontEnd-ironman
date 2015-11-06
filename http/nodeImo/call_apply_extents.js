function Pet(words){
	this.words = words;
	this.speak = function(){
		console.log(this.words)
	}
}

function Dog(words){
	Pet.call(this, words)
	//通过call实现了继承
	// Pet.apply(this,arguments)
}

var dog = new Dog('wang')

dog.speak();