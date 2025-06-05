"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/shebang-command@2.0.0";
exports.ids = ["vendor-chunks/shebang-command@2.0.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst shebangRegex = __webpack_require__(/*! shebang-regex */ \"(ssr)/./node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js\");\n\nmodule.exports = (string = '') => {\n\tconst match = string.match(shebangRegex);\n\n\tif (!match) {\n\t\treturn null;\n\t}\n\n\tconst [path, argument] = match[0].replace(/#! ?/, '').split(' ');\n\tconst binary = path.split('/').pop();\n\n\tif (binary === 'env') {\n\t\treturn argument;\n\t}\n\n\treturn argument ? `${binary} ${argument}` : binary;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vc2hlYmFuZy1jb21tYW5kQDIuMC4wL25vZGVfbW9kdWxlcy9zaGViYW5nLWNvbW1hbmQvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYixxQkFBcUIsbUJBQU8sQ0FBQyx5R0FBZTs7QUFFNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLFFBQVEsRUFBRSxTQUFTO0FBQ3pDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3BlbmFpbnl0dy8uL25vZGVfbW9kdWxlcy8ucG5wbS9zaGViYW5nLWNvbW1hbmRAMi4wLjAvbm9kZV9tb2R1bGVzL3NoZWJhbmctY29tbWFuZC9pbmRleC5qcz81ODI0Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbmNvbnN0IHNoZWJhbmdSZWdleCA9IHJlcXVpcmUoJ3NoZWJhbmctcmVnZXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoc3RyaW5nID0gJycpID0+IHtcblx0Y29uc3QgbWF0Y2ggPSBzdHJpbmcubWF0Y2goc2hlYmFuZ1JlZ2V4KTtcblxuXHRpZiAoIW1hdGNoKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRjb25zdCBbcGF0aCwgYXJndW1lbnRdID0gbWF0Y2hbMF0ucmVwbGFjZSgvIyEgPy8sICcnKS5zcGxpdCgnICcpO1xuXHRjb25zdCBiaW5hcnkgPSBwYXRoLnNwbGl0KCcvJykucG9wKCk7XG5cblx0aWYgKGJpbmFyeSA9PT0gJ2VudicpIHtcblx0XHRyZXR1cm4gYXJndW1lbnQ7XG5cdH1cblxuXHRyZXR1cm4gYXJndW1lbnQgPyBgJHtiaW5hcnl9ICR7YXJndW1lbnR9YCA6IGJpbmFyeTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js\n");

/***/ })

};
;