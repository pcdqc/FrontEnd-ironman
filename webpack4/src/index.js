// import _ from 'lodash'
// import printMe from './print'
// import './style.css'
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}
/*function component() {
  var ele = document.createElement('div');
  var btn = document.createElement('button');
  
  ele.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the Console!';
  btn.onclick = printMe;

  ele.appendChild(btn);
  return ele;
}
document.body.appendChild(component())
*/
// function getComponent(){
//   /**
//    * 动态导入来分离一个chunk
//    * 在注释中使用了 webpackChunkName。这样做会导致我们的 bundle 被命名为 lodash.bundle.js ，
//    * 而不是 [id].bundle.js 。想了解更多关于 webpackChunkName 和其他可用选项，
//    * 请查看 import() 相关文档。
//    * https://doc.webpack-china.org/api/module-methods#import-
//    */
//   return import(/* webpackChunkName: "loadash" */ 'lodash').then(_=>{
//     let element = document.createElement('div');

//     element.innerHTML = _.default.join(['Hello', 'webpack'], ' ');

//     return element;
//   }).catch(error => 'An error occurred while loading the component');
// }

// getComponent().then(component=>{
//   document.body.appendChild(component);
// })

/**
 * async简化getComponent => getComponents
 */
// async function getComponents() {
//   let element = document.createElement('div');

//   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');

//   element.innerHTML = _.default.join(['Hello', 'async Webpack'], '');
//   return element;
// }

// getComponents().then(c=>{
//   document.body.appendChild(c);
// })
  
// function componentWithClick() {
//   let element = document.createElement('div');
//   let button = document.createElement('button');
//   let br = document.createElement('br')

//   button.innerHTML = '123123CLick 1m1111231231e and look at the console!'
//   element.innerHTML = _.join(['Hello', 'async Webpack'], '');
//   element.appendChild(br)
//   element.appendChild(button);

//   button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
//     let print = module.default

//     print();
//   })
//   return element
// }
// document.body.appendChild(componentWithClick())
// if (module.hot) {
//   module.hot.accept('./print.js', function() {
//     console.log('Accepeting the updated printMe module!');
//     printMe();
//   })
// }


import Vue from 'vue'
import App from './app.vue'
import axios from 'axios'
Vue.prototype.axios = axios;
new Vue({
  render: h=> h(App)
}).$mount('#app')

// import { cube } from  './math.js';
// function componentTreeShaking () {
//   var element = document.createElement('pre');
//   element.innerHTML = [
//     'Hello webpack!',
//     '5 cubed is equal11111222 to ' + cube(5)
//   ].join('\n\n');

//   return element;
// }

// document.body.appendChild(componentTreeShaking());