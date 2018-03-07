var start = +new Date();
function foo() {
  setTimeout(function() {
    if((+new Date) - start < 1000) {
      console.log((+new Date) - start)
      foo()
    }
  })
}
export default foo;