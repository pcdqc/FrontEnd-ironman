import { double, trible, changeHTML as change } from './lib2'
var Val = double(5);
console.log(Val);
console.log(trible(3))
change()
.then(function(dom){
  setTimeout(function(){
    dom.innerHTML = 'changed twice';
  },1000);
})