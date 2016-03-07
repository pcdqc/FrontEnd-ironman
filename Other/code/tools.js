//选取父元素的第几个子节点，代码重构时替换过长的DOM操作语法
function nth(parent, ele, num) {
    var _ele = Array.prototype.slice.call(parent.childNodes), eleArray = [];
    //将父节点的子节点转换成数组_ele
    for (var i = 0, len = _ele.length; i < len; i++) {
        if (_ele[i].nodeType == 1) {
            eleArray.push(_ele[i]);//选取元素节点
        }
    }
    if (arguments.length == 2) {
        if (typeof arguments[1] === "string") {
            _ele = Array.prototype.slice.call(parent.getElementsByTagName(arguments[1]));
            return _ele;
        } else if (typeof arguments[1] === "number") {
            return eleArray[arguments[1]];
        }
    } else {
        _ele = Array.prototype.slice.call(parent.getElementsByTagName(ele));
        return _ele[num];
        //如果参数齐全，则返回第几个某节点
    }
}
var e = window.event;
//检查一个对象是否被包含在我们的触发对象里面
function contains(parentNode, childNode) {
    if (parentNode.contains) {
        return parentNode != childNode && parentNode.contains(childNode);
    } else {
        return !!(parentNode.compareDocumentPosition(childNode) & 16);
    }
}
function getEvent(e) {
    return e || window.event;
}
function checkHover(e, target) {
    if (getEvent(e).type == "mouseover") {
        return !contains(target, getEvent(e).relatedTarget
                || getEvent(e).fromElement)
            && !((getEvent(e).relatedTarget || getEvent(e).fromElement) === target);
    } else {
        return !contains(target, getEvent(e).relatedTarget
                || getEvent(e).toElement)
            && !((getEvent(e).relatedTarget || getEvent(e).toElement) === target);
    }
}

//追加ClassName
function addClass(element,value){
    if(!element.className){
        element.className = value;
    }else{
        newClassName = element.className;
        newClassName += " ";
        newClassName +=value;
        element.className = newClassName;
    }
}

//文档加载完成
 function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
 }

 //元素后添加元素
 function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
 }


 //防止高频调用的debounce函数
 //返回一个函数,that,as long as it continues to be invoked,will not be triggered.
 //the function will be called after it stops being called for N milliseconds.
 //If 'immediate' is passwd,trigger the function on the leading edge,instaed of the trailing
 function debounce(func, wait, immediate){
    var timeout;
    return function(){
        var context = this,args = arguments;
        var later = function(){
            timeout = null;
            if(!immediate) func.apply(context,args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) func.apply(context, args);
    };
 };

 //Usage
 var myEfficientFn = debounce(function(){
    //all the taxing stuff you do
 },250);
 window.addEventListener('resize',myEfficientFn);
 //这个debounce函数在给定的时间间隔内值允许你提供的回调函数执行一次，一次降低它的执行频率。


 //设定时间、频率循环检测函数
 //借助于某个事件的触发。但有时候并没有这样的事件可用，
 // 那我们只能自己写一个函数来每隔一段时间检查一次
 function poll(fn, callback, err, timeout, interval){
    var startTime = (new Date()).getTime();
    var pi = window.setInterval(function(){
        if(Math.floor(((new Date).getTime() - startTime)/1000) <= timeout){
            if(fn()){
                callback();
            }
        }else{
            window.clearInterval(pi);
            err();
        }
    },interval)
 }
 //js时间戳转日期
 function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
} 
 //禁止重复调用，只允许执行一次的once函数
 function once(fn, context){
    var result;
    return function(){
        if(fn){
            result = fn.apply(context || this, arguments);
            fn = null;
            //运行一次后将fn置空
        }
        return result;
    };
 }

 //Usage
 var canOnlyFireOnce = once(function(){
    console.log('Fired!');
 });

 canOnlyFireOnce();
 canOnlyFireOnce();


 //获取一个链接的绝度地址
 var getAbsoluteUrl = (function(){
    var a;
    return function(url){
        if(!a) a=document.createElement('a');
        a.href = url;

        return a.href;
    };
 })();

 //Usage
 getAbsoluteUrl('/yes')


 //判断一个javascript函数是否是系统原生函数 isNative
 ;(function(){
    //Used to resolve the interval '[[Class]]' of values
    var toString = Object.prototype.toString;

    //Used to resolve the decompiled source of functions
    var fnToString = Function.prototype.toString;

    //Used to detect host constructors(safari>4;really typed array specific)
    var reHostCtor = /^\[object.+?Constructor\]$/;

    //Compile regexp using a common native method as a template
    //We chose 'Object#toString ' because there's a good chance it is
    //not being mucked[欺骗] with
    var reNative = RegExp('^'+
        //Coerec 'Object#toString' to a string
        String(toString)
        //Escape any special regexp characters
        .replace(/[.*+?^${}()[\]\/\\]/g,'\\$&')
        //Replace mentions of 'toString ' with '.*?' to keep the template generic.
        //Replace thing like 'for...' to support enviroments like Rhino
        //which add extra info
        //such as method arity.
        .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
        );

    function isNative(value){
        var type = typeof value;
        return type == 'function'
        //use 'function#toString' to bypass the value's own 'toString' method
        //and avoid being faked out
        ? reNative.test(fnToString.call(value))
        //Fallback to a host object check because some enviroments  will represent
        //things like typed arrays as DOM methods which may not conform to the normal native pattern.
        :(value && type == 'object' && reHostCtor.test(toString.call(value))) || false;
    }

    //export however you want

    // module.exports = isNative;

 }());


//Usage
// isNative(alert);
// isNative(myCustomFunction)



// 用Javascript创建新的css规则 insertRule
Sheet = (function(){
    //build style
    var style = document.createElement('style');
    style.setAttribute('media','screen');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);

    //Build and return a single function

    return function(rule){style.sheet.insertRule(rule,style.sheet.cssRules.length);};
})();

//Then call as a function
Sheet(".stats{position:relative;top:0px}");

//判断网页元素是否具有某种属性和样式 matchesSelector
// function matchedSelector(el, selector){
//     var  p = Element.prototype;
//     var  f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector||
//     p.msMatchesSelector || function(s){
//         return [].indexOf.call(document.querySelectorAll(s),this) !== -1;
//     };
//     return f.call(el,selector);
// }

//Usage
// matchedSelector(document.getElementById('mydiv'),'div.someSelector[some-attribute=true]')


/*
[].forEach.call()
//usage
var divs = document.querySelectorAll('div');
[].forEach.call(divs,function(div){
    //do whatever
    div.style.color = 'red';
});

Array.prototype.forEach.call(...);
[1,2,3].forEach(function (num){console.log(num);});
// 上面这句代码中，我们可以访问this对象，也就是[1,2,3],可以看出，这个this是个数组
//.call是一个prototype,javascirpt内置的
//.call使用它的第一个参数替换掉上面说的这个this,也就是你要传入的数组
[1,2,3].forEach.call(["a","b","c"],function (item, i, arr){
    console.log(i+":"+item);
})
*/


//清楚相同的数组
String.prototype.unique = function(){
    var x = this.split(/[\r\n]+/);
    var y ='';
    for(var i=0;i<x.length;i++){
        if(!new RegExp("^"+x.replace(/[^\w]/ig,"\\$1")+"$","igm").test(y)){
            y +=x+'\r\n'
        }
    }
    return y;
}


//暂祖母排序，对美方进行数组排序
function SetSort(){
    var text = K1.value.split(/\r\n/).sort().join("\r\n");//顺序
    var text = K1.value.split(/\r\n/).sort().reverse().join("\r\n");//反序
    K1.value = K1.value != text?text:test;
}

//字符串反序
function IsReverse(text){
    return text.split('').reverse().join('')
}


//resize的操作
// (function(){
//     var fn = function(){
//         var w = document.documentElement ? document.documentElement.clientWidth : 
//     document.body.clientWidth
//             ,r = 1255
//             ,b = Element.extend(document.body)
//             ,className = b.className;
//         if(w<r){
//             //当窗体的宽度小于1255的时候执行相应的操作
//         }else{
//             //当窗体的宽度大于1255的时候执……
//         }
//     }
//     if(window.addEventListener){
//         window.addEventListener('resize',function(){fn();});
//     }else if(window.attachEvent){
//         window.attachEvent('onresize',function(){fn();});
//     }
//     fn();
// })();

//实现utf8解码
function utf8_decode(str_data){
    var tmp_arr = [],i=0,ac=0,c1=0,c2=0,c3=0;
    str_data += '';
    while(i<str_data.length){
        c1 =str_data.charCodeAt(i);
        if(c1<128){
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        }else if(c1 > 191 && c1 <224){
            c2 = str_data.charCodeAt(i+1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31)<<6)|(c2&63));
            i+=2;
        }else{
            c2 = str_data.charCodeAt(i+1);
            c3 = str_data.charCodeAt(i+2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return tmp_arr.join('');
}


//区别数组和对象
var is_array = function (value){
    return value && 
        typeof value === 'object' &&
        value.constructor === Array;
}//在识别从不同的窗口或帧（fram)里构造的数组会失败
var is_array1 = function (value){
    return Object.prototype.toString.apply(value) === ['object Array'];
};

//构造单位矩阵
// js数组通常不会预置值
Array.dim = function (dimension, initial) {
    var a =[], i ;
    for(i=0;i<dimension;i+=1){
        a[i] = initial;
    }
    return a;
}
var myArray = Array.dim(10,0);
console.log(myArray)

Array.matrix = function(m,n, initial) {
    var a,i,j,mat = [];
    for(i=0;i<m;i+=1){
        a=[];
        for(j=0;j<n;j+=1){
            a[j] = initial;
        }
        mat[i] = a;
    }
    return mat
}
var myMatrix = Array.matrix(4,4,0);
document.writeln(myMatrix[3][3]);
Array.identity = function(n){
    var i,mat = Array.matrix(n,n,0);
    for(i=0;i<n;i++){
        mat[i][i] = 1;
    }
    return mat
}
myMatrix = Array.identity(4);
document.writeln(myMatrix[3][3])

//splice(start,deleteCount,item)
//apply(obj,[]);
//push的实现
// Array.method('push', function() {
//     console.log(this)
//     this.splice.apply(
//         this,
//         [this.length,0].
//             concat(Array.prototype.slice.apply(arguments)));
//     return this.length;
// });
//unshift的实现、
// Array.method('unshift', function(){
//     this.splice.apply(this,
//         [0,0].concat(Array.prototype.slice.apply(arguments)));
//     return this.length
// })