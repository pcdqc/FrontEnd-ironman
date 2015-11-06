var globalVariable = 'This is global variable'

function globalFunction(){
	var localVariable = 'This is localVariable';
	console.log('Visilt global/local variable')
	console.log(globalVariable);
	console.log(localVariable);

	function localFunction(){
		
	}
}
globalFunction();