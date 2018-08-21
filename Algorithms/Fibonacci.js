//递归版本
function fibonacci(n){
  if (n<=1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(10));

//尾递归版本
function fibonacciTrail(n, ac1 =1, ac2 =1){
  if (n <= 1) { return ac1 }; //ac2
  return fibonacciTrail(n - 1, ac2, ac1+ac2)
}
console.log(fibonacciTrail(10));

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
console.log(fibonacciArray(10))

//将多参数的函数转换成单参数的形式

