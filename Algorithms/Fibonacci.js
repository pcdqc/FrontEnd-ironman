//递归版本
// function fibonacci(n){
//   if (n<=1) return n;
//   return fibonacci(n - 1) + fibonacci(n - 2);
// }
// console.log(fibonacci(10));

//尾递归版本
function fibonacciTrail(n, ac1 =1, ac2 =1){
  if (n <= 1) { return ac1 }; //ac2
  return fibonacciTrail(n - 1, ac2, ac1+ac2)
}
// console.log(fibonacciTrail(10));

//数组数据结构 优化
function fibonacciArray(n){
  let arr = new Array(n+1).fill(null);
  arr[0] = 0;
  arr[1] = 1;
  for(let i = 2;i <= n; i++){
    arr[i] = arr[i-1] + arr[i-2];
  }
  return arr[n];
}
// console.log(fibonacciArray(10))

//将多参数的函数转换成单参数的形式

function fib(n){    
  if(n==1){        
      return 1;
  }
  if(n == 2) {
    return 2
  }
  return fib(n-1)+fib(n-2);
}
console.log(fib(5));
function totalNum(floor){
  var total;    
  if (floor <= 0) {
    return ''
  };    
  if (floor == 1) {
      total = 1;        
      return total;
  }    
  if (floor == 2) {
      total = 2;        
      return total;
  }    
  return totalNum(floor-1) + totalNum(floor-2);
}
console.log(totalNum(5))
//数组结构 2 time
function fibonacciArray(n){
  let arr = new Array(n);
  arr[0] = 1;
  arr[1] = 2;
  for( let i = 2;i <= n ;i++){
    arr[i] = arr[i-1] + arr[i-2]
  }
  return arr[n-1]
}
console.log(fibonacciArray(5))
//优化空间
function fibonacciLessSpace(n){
  let prev = 1,
    middle = 2,
    total = void 0;
  if(n <= 0) return false;
  if(n == 1){
    total = prev;
    return total;
  } else if(n == 2){
    total = middle;
    return total;
  } else {
    for (i = 2; i < n;i++){
      total = prev+middle; //计算出新的第三项的值
      prev = middle; //依次前移 给计算腾出空间
      middle = total;
    }
    return total;
  }
}
console.log(fibonacciLessSpace(5)) //五级台阶有八种走法