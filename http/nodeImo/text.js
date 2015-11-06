var sc;
while(sc = readline()){
	var out = [];
	var arr = sc.split(' ');
	n = parseInt(arr[0]);
	for(var i=0;i<=n;i++){
		var sum=0;
		for( var j=1;j<=4;j++){
			sum += arr[i*n+j];
			while(j==1 || j==2){
				if(arr[i*n+j]<60)
					out.push('fail');
			}
			while(j==3 || j==4){
				if(arr[i*n+j]<90)
					out.push('fail')
			}
		}
		if(sum<310)
			out.push('fail')
		else if(sum>350)
			out.push('gongfei')
		else
			out.push('zifei')
	}
	print(out.join('\n'))
}