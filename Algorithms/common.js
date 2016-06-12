//随机生成一组1000个数的数组
function randomArr(){
  var arr = [];
  for(var i=0;i<10;i++){
    arr[i]   = parseInt((((Math.random())*10000)+'').substring(0,4))
  }
  return arr;
}

