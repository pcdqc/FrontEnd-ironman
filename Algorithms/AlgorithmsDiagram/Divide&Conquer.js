//递归计算数组的和
function add(arr){
  if(arr.length == 0) return 0;
  a0 = arr[0]
  arr.splice(0,1)
  return a0 + add(arr)
}
console.log(add([2,3,4]))
function count(arr){
  if(arr.length == 0) return 0;
  arr.splice(0,1);
  return 1 + count(arr)
}
console.log(count([1,1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,11,1,1,1,1,1,11,1,1,1,1,1,11,1,1,1,1,1,11,1,1,1,1,1,1]))
/*二分查找基线条件 查找的元素等于某个元素
*        递归条件 查找元素大于或小于中间元素的值
*/
