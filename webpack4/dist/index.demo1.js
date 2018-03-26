/* eslint-disable */
(function (modules) { // webpackBootstrap
    // The module cache
    var installedModules = {};
    // The require function
    function __webpack_require__(moduleId) {
      // Check if module is in cache 检查模块是否被加载过
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
     // Create a new module (and put it into the cache) 新建一个模块
     var module = installedModules[moduleId] = {
       i: moduleId,
       l: false,
       exports: {}
     };
     // Execute the module function
     modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
     // Flag the module as loaded
     module.l = true;
     // Return the exports of the module
     return module.exports;
   }
   // expose the modules object (__webpack_modules__)
   __webpack_require__.m = modules;
   // expose the module cache
   __webpack_require__.c = installedModules;
   // define getter function for harmony exports
   __webpack_require__.d = function (exports, name, getter) {
     if (!__webpack_require__.o(exports, name)) {
       Object.defineProperty(exports, name, {
         configurable: false,
         enumerable: true,
         get: getter
       });
     }
   };
   // define __esModule on exports
   __webpack_require__.r = function (exports) {
     Object.defineProperty(exports, '__esModule', {
       value: true
     });
   };
   // getDefaultExport function for compatibility with non-harmony modules
   __webpack_require__.n = function (module) {
     var getter = module && module.__esModule ?
       function getDefault() {
         return module['default'];
       } :
       function getModuleExports() {
         return module;
       };
     __webpack_require__.d(getter, 'a', getter);
     return getter;
   };
   // Object.prototype.hasOwnProperty.call
   __webpack_require__.o = function (object, property) {
     return Object.prototype.hasOwnProperty.call(object, property);
   };
   // __webpack_public_path__
   __webpack_require__.p = "";
   // Load entry module and return exports
   return __webpack_require__(__webpack_require__.s = 0);
 })

 ({

   "./src/single/index.js": (function (module, __webpack_exports__, __webpack_require__) {
     "use strict";
     __webpack_require__.r(__webpack_exports__);
     var _index2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./index2 */ "./src/single/index2.js");
     var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./util */ "./src/single/util.js");


     console.log(_index2__WEBPACK_IMPORTED_MODULE_0__["default"])
     console.log(_util__WEBPACK_IMPORTED_MODULE_1__["default"])

   }),

   "./src/single/index2.js": (function (module, __webpack_exports__, __webpack_require__) {

     "use strict";
     __webpack_require__.r(__webpack_exports__);
     var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./util */ "./src/single/util.js");

     console.log(_util__WEBPACK_IMPORTED_MODULE_0__["default"])
     console.log('---index2.js---')
     __webpack_exports__["default"] = ('index2');

   }),

   "./src/single/util.js": (function (module, __webpack_exports__, __webpack_require__) {

     "use strict";
     __webpack_require__.r(__webpack_exports__);
     __webpack_exports__["default"] = ('Hello Webpack Four');

   }),

   0:
     (function (module, exports, __webpack_require__) {

       module.exports = __webpack_require__("./src/single/index.js");


     })

 });
//  // webpack 2/3
// import("./commonjs").then(exports => {
	
// })
 
// // webpack 4
// import("./commonjs").then({default: exports} => {
	
// })