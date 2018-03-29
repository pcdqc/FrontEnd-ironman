(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pageB"],{

/***/ "./src/hoist/pageB.js":
/*!****************************************!*\
  !*** ./src/hoist/pageB.js + 1 modules ***!
  \****************************************/
/*! no exports provided */
/*! ModuleConcatenation bailout: Cannot concat with ./src/hoist/utilA.js */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/hoist/utilA.js
var utilA = __webpack_require__("./src/hoist/utilA.js");

// CONCATENATED MODULE: ./src/hoist/utilB.js
const utilB = 'util B';
function funcB() {
  console.log('func B');
}
// CONCATENATED MODULE: ./src/hoist/pageB.js

uncB();
__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./utilC */ "./src/hoist/utilC.js")).then(function(utilC) {
  console.log(utilC);
})

/***/ }),

/***/ "./src/hoist/utilA.js":
/*!****************************!*\
  !*** ./src/hoist/utilA.js ***!
  \****************************/
/*! exports provided: utilA, funcA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utilA", function() { return utilA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "funcA", function() { return funcA; });
const utilA = 'util A';
function funcA() {
  console.log('func A');
}

/***/ })

},[["./src/hoist/pageB.js","runtime~pageB"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaG9pc3QvdXRpbEIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hvaXN0L3BhZ2VCLmpzIiwid2VicGFjazovLy8uL3NyYy9ob2lzdC91dGlsQS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsQzs7QUNIZ0I7QUFDdUI7QUFDdkM7QUFDQTtBQUNBLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7O0FDSkQ7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJwYWdlQi4wYTU0MWU1OC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCB1dGlsQiA9ICd1dGlsIEInO1xuZXhwb3J0IGZ1bmN0aW9uIGZ1bmNCKCkge1xuICBjb25zb2xlLmxvZygnZnVuYyBCJyk7XG59IiwiaW1wb3J0IHsgdXRpbEEgfSBmcm9tICcuL3V0aWxBJztcbmltcG9ydCB7IHV0aWxCLCBmdW5jQiB9IGZyb20gJy4vdXRpbEInO3VuY0IoKTtcbmltcG9ydCgnLi91dGlsQycpLnRoZW4oZnVuY3Rpb24odXRpbEMpIHtcbiAgY29uc29sZS5sb2codXRpbEMpO1xufSkiLCJleHBvcnQgY29uc3QgdXRpbEEgPSAndXRpbCBBJztcbmV4cG9ydCBmdW5jdGlvbiBmdW5jQSgpIHtcbiAgY29uc29sZS5sb2coJ2Z1bmMgQScpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=