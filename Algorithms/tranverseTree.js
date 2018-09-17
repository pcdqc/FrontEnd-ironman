var a = 1 ;
function foo(){
  console.log(a);
  var a = 2;
  console.log(a);
  return function () {
    var a = 3;
    console.log(a);
  }
}
var b = foo();
b();

