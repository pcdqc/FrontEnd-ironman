 //Parser constructor.
var Parser = function(){

};

//Parses the specified text.
Parser.prototype.parse = function(text){
	 var results =[];

	//Break up the file into parts by ;
	var parts = text.split(';');

	results += parts[0].substring(5);
	
 	for(var i=1;i<parts.length;i++){
 		results+= parts[1] +'\t\n';

 	}
 	return results;
	 
}

//Export the Parser constructor from this module.
module.exports = Parser;