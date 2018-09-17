var b = 1;
var c = 11;
var a = function () {
  console.log(this.b);
  console.log(this.c);
  console.log(b);
  // console.log(c);
  var b = 100;
  let c = 111;
  return () => {
    console.log(this.b);
    console.log(this.c);
    console.log(b);
    console.log(c);
  }
};
var d = a();
d();