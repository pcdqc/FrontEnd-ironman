// 大：[{item:a,value:1},{item:b,value:2},{item:c,value:3},{item:d,value:4}] 
// 小：[1,3]
// 结果：[{item:a,value:1},{item:c,value:3}]
let a = [{
  item: 'a',
  value: 1
}, {
  item: 'b',
  value: 2
}, {
  item: 'c',
  value: 3
}, {
  item: 'd',
  value: 4
}];
let b = [1,3];
let arrLast = [];
a.map(function(item,index){
  b.map(function(itemB,indexB){
    if(itemB == item.value){
      arrLast.push(item);
    }
  })
  // if(b.indexOf(item.value)!= -1){
  //   arrLast.push(item);
  // }
})
let c = a.filter(function(item,index){
  return b.indexOf(item.value)!= -1
})
console.log(arrLast)
console.log(c);