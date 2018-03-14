let arr = [1, 5, 3]
console.log(selectSort(arr))
function selectSort(arr, item) {
  var lastArr = [],
    len = arr.length;
  while(lastArr.length != len) {
    var tempMax = arr[0];
    for( var i = 1,len = arr.length; i <= len;i++){
      if(arr[i] > tempMax){
        let temp = '';
        temp = tempMax;
        tempMax = arr[i];
        arr[i] = temp
      }
    }
    lastArr.push(tempMax);
  }
  return lastArr
}

function selectionSort(arr){
  var newArr = [];
  for(var i = 0,len = arr.length;i<len;i++){
    let smallest = findSmallest(arr);
    newArr.push(arr.splice(smallest, 1)[0])
    console.log(arr)
  }
  return newArr;
}
function findSmallest(arr) {
  let smallest = arr[0];
  let smallest_index = 0;
  arr.forEach(function(item, index){
    if(item < smallest){
      smallest = item;
      smallest_index = index;
    }
  })
  return smallest_index
}
console.log(selectionSort([3,5,2,8,1]))