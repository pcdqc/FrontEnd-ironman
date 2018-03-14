function binarySearch (arr, item) {
  var low = 0,
    high = arr.length - 1;
 
  while(low <= high){
    let mid = Math.floor((low + high) / 2), //floor 向地板取整 向下取整
    guess = arr[mid];
    if(guess == item) {
      return mid
    } else if(guess > item) {
      high = mid -1;
    } else {
      low  = mid + 1;
    }
  }
  return -1;
}
let arr = [1, 3, 5, 7, 9]
console.log(binarySearch(arr,1))
console.log(binarySearch(arr,3))
console.log(binarySearch(arr,11))