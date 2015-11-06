var sc;
while(sc = readline()){
	var out = [];
	var arr = sc.split(' ');
	var length = arr.length;
	while(length>0){
		var num = arr[i];
		function getGens(a){
			var arr = [];
			var n=a/2+1;
			for(var i=2;i<n;i++){
				if(a%i == 0) arr.push(i);
			}
		return arr;
		}
		function getPrimes(a){
			var arr = getGens(a);
			var c = [];
			for(var i=0;i<arr.length;i++){
				var t = getGens(arr[i]);
				if(t.length==0) c.push(arr[i]);
			}
			return c;
		}
		length -= 1;
	}
	print(out.join('\n'))
}