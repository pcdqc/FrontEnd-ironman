import { variableA, foo } from  './js/utilA' //foo未使用，会被清除
import fooB from './js/utilB'   //引入函数fooB 未使用 ，会被清除
import ClassC from './js/utilC';  //引入类ClassC 未被使用 被清除 
console.log(variableA); 