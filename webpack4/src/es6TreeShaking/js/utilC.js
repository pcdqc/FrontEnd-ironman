const ClassC = function(){} //类方法不会被清除 webpack不对类方法做tree shaking
ClassC.prototype.saySomething = function() {
  console.log('class C')
}
export default ClassC

const classC = function() {}
let tempA = 'class' + 'C';
let tempB;
if(tempA === 'Array') {
  tempB = tempA;
} else {
  tempB = 'classC';
}
tempB.prototype.saySomething = function() {
  console.log('class C');
}
export default classC;

/**
 * webpack 无法保证 prototype 挂载的对象是 classC，
 * 这种代码，静态分析是分析不了的，就算能静态分析代码，
 * 想要正确完全的分析也比较困难。所以 webpack 干脆不处理类方法，
 * 不对类方法进行 tree shaking。
 */

//更多的 tree shaking 的副作用可以查阅：Tree shaking class methods