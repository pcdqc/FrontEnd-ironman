let arr = new Array(20).fill(0);
for(let i = 0,len = 20;i < len; i++) {
  arr[i] = Number((Math.random()*100).toFixed(0))
}
console.log(arr);
function quickSort(arr) {
  if(arr.length < 1) return arr;
  let temp = arr[0], //基准变量
    len = arr.length; 
  let left = [],right = [];//分为左右两个数组 左数组小于基准值
  for( let i = 1;i < len; i++){
    if(arr[i] >= temp){
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  return quickSort(left).concat(temp).concat(quickSort(right));
}
console.log(quickSort(arr));