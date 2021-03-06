##ES6 module基础知识:

每一个ES6模块都是一个包含JS代码的文件，模块本质上就是一段脚本，而不是用module关键字定义一个模块，但是模块与脚本还是有两点区别：
* 在ES6模块中，无论你是否加入“use strict;”语句，默认情况下模块都是在严格模式下运行。
* 在模块中你可以使用import和export关键字。
export  
你可以导出所有的最外层函数、类以及var、let或const声明的变量。

`export function foo(){}
export class Foo{};
export Var foo = ‘123’;
export * from ‘loadsh’ <=>
import * from lodash
export loadsh`

**import()提案 实现动态，按需加载，动态模块路径
将组成模块公共API的声明全部导出。
当你运行的模块中包含一条import声明时，首先会加载被导入的模块；然后依赖图的深度优先遍历按顺序执行每一个模块的主体代码；为了避免形成回环，所有已执行的模块都会被忽略。

##ES6 模块遇到 import 命令时，不会去执行模块，而是生成一个只读引用，等用到的时候，才去模块中取值。因为是动态引用，所以不存在缓存的问题。

1. ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
2. ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入
由于 ES6 模块是编译时加载，使得静态分析成为可能

import 命令具有提升效果，会提升到整个模块的头部，首先执行，所以不能把 import 写在表达式里面,如 if语句

广泛使用的模块系统有CommonJS、AMD两种，设计出来的新标准（ES6）可以与这两种模块进行交互。
CommonJS:
用户服务端；只能在运行时确定（第一次运行后每次都返回第一次运行的缓存结果，但是如果相同模块放到不同路径，还是会重新加载这个模块）；
同步加载；模块加载的顺序，按照其在代码中出现的顺序
nodejs module （commonjs）
1.接收参数为：一个模块标识符 require
2.返回： 外部模块输出的API exports(只能为object)
3.每个模块只会被加载执行一次 ，防止出现依赖闭环
4.如何请求模块失败，require函数应抛出一个错误
    模块表示符 var a = require(‘./a’) 出现./ ../则为相对的 否则为顶级的
    * 顶级标识符是概念上的模块命名空间的根。
    * 相对标识符是相对于在其内部调用了 require() 的模块的标识符来进行解析的。
服务端加载直接从硬盘读取文件，属于同步加载（sync），但是浏览器端不能同步去发请求获取文件，所以浏览器端的加载时 异步加载（Async）


ES6 模块与 CommonJS 模块的差异：
CommonJS模块输出的是一个值的拷贝，ES6模块输出的是值的引用。
CommonJS模块是运行时加载，ES6模块是编译时输出接口。

ES6模块是动态引用，并且不会缓存值
ES6 模块在对脚本静态分析的时候，遇到 import 就会生成一个只读引用，等到脚本真正执行的时候，再根据这个只读引用，到被加载的那个模块里取值，所以说 ES6 模块是动态引用。
从依赖中引入的模块变量是一个地址引用，是只读的，可以为它新增属性，可是不能重新赋值。


AMD:（Asynchronous Module Definition）

AMD规范: (require.js curl.js)
浏览器必须异步加载代码，那么模块在定义的时候就必须 指明所依赖的模块，然后 把本模块的代码写在回调函数里。模块的加载也是通过 下载—>回调 这样的过程来进行
AMD 也采用require()语句加载模块，但是不同于ComonJS，它要求两个参数
第一个参数[module]是一个数组，里面的成员就是要加载的模块
第二个参数 callback 则是加载成功后的回调函数
require([moudle], callback)
模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行



在ES6的模块中导入的CommonJS模块和AMD模块都有一个默认的导出，如果你用require()加载这些模块也会得到相同的结果——exports对象。

当你import * 时，导入的其实是一个模块命名空间对象，模块将它的所有属性都导出了


粗略地讲，当你通知JS引擎运行一个模块时，它一定会按照以下四个步骤执行下去：
1. 语法解析：阅读模块源代码，检查语法错误。
2. 加载：递归地加载所有被导入的模块。这也正是没被标准化的部分。
3. 连接：每遇到一个新加载的模块，为其创建作用域并将模块内声明的所有绑定填充到该作用域中，其中包括由其它模块导入的内容。(JS引擎静态分析)
4. 如果你的代码中有import {cake} from "paleo"这样的语句，而此时“paleo”模块并没有导出任何“cake”，你就会触发一个错误。这实在是太糟糕了，你都快要运行模块中的代码了，都是cake惹的祸！
5. 运行时：最终，在每一个新加载的模块体内执行所有语句。此时，导入的过程就已经结束了，所以当执行到达有一行import声明的代码的时候……什么都没发生！


* 你只可以在模块的最外层作用域使用import和export，不可在条件语句中使用，也不能在函数作用域中使用import。
* 所有导出的标识符一定要在源代码中明确地导出它们的名称，你不能通过编写代码遍历一个数组然后用数据驱动的方式导出一堆名称。
* 模块对象被冻结了，所以你无法hack模块对象并为其添加polyfill风格的新特性。
* 一个模块的所有依赖必须在模块代码运行前完全加载、解析并且及早连接，不存在一种通过import来按需懒加载的语法。
* import模块产生的错误没有错误恢复机制。一个app可能囊括了上百个模块，一旦有一个模块无法加载或连接，所有的模块都不会运行，而且你不能在try/catch代码块中捕捉import的错误信息。（上面这些描述的本意是说：系统是静态的，webpack可在编译时为你检测那些错误。）
* 不支持在模块加载依赖前运行其它代码的钩子，这也意味着无法控制模块的依赖加载过程。

使用export default命令，为模块指定默认输出，这样就不需要知道所要加载模块的变量名

浏览器加载ES6模块
<script type="module" src="./foo.js"></script> 异步加载




CMD:（sea.js）
依赖就近
需要用到依赖的时候才声明
AMD CMD异同：
对于依赖的模块AMD是提前执行    CMD是延迟执行(as lazy as possible) （requireJS从2.0起也改成了延迟执行）
            AMD推崇依赖就近  CMD推崇依赖前置



严格模式主要有以下限制。
* 变量必须声明后再使用
* 函数的参数不能有同名属性，否则报错
* 不能使用with语句
* 不能对只读属性赋值，否则报错
* 不能使用前缀 0 表示八进制数，否则报错
* 不能删除不可删除的属性，否则报错
* 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
* eval不会在它的外层作用域引入变量
* eval和arguments不能被重新赋值
* arguments不会自动反映函数参数的变化
* 不能使用arguments.callee
* 不能使用arguments.caller
* 禁止this指向全局对象
* 不能使用fn.caller和fn.arguments获取函数调用的堆栈
* 增加了保留字（比如protected、static和interface）
