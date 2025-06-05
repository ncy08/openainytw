"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/path-key@3.1.1";
exports.ids = ["vendor-chunks/path-key@3.1.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js ***!
  \**************************************************************************/
/***/ ((module) => {

eval("\n\nconst pathKey = (options = {}) => {\n\tconst environment = options.env || process.env;\n\tconst platform = options.platform || process.platform;\n\n\tif (platform !== 'win32') {\n\t\treturn 'PATH';\n\t}\n\n\treturn Object.keys(environment).reverse().find(key => key.toUpperCase() === 'PATH') || 'Path';\n};\n\nmodule.exports = pathKey;\n// TODO: Remove this for the next major release\nmodule.exports[\"default\"] = pathKey;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vcGF0aC1rZXlAMy4xLjEvbm9kZV9tb2R1bGVzL3BhdGgta2V5L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLDZCQUE2QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBc0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcGVuYWlueXR3Ly4vbm9kZV9tb2R1bGVzLy5wbnBtL3BhdGgta2V5QDMuMS4xL25vZGVfbW9kdWxlcy9wYXRoLWtleS9pbmRleC5qcz84MDU2Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0aEtleSA9IChvcHRpb25zID0ge30pID0+IHtcblx0Y29uc3QgZW52aXJvbm1lbnQgPSBvcHRpb25zLmVudiB8fCBwcm9jZXNzLmVudjtcblx0Y29uc3QgcGxhdGZvcm0gPSBvcHRpb25zLnBsYXRmb3JtIHx8IHByb2Nlc3MucGxhdGZvcm07XG5cblx0aWYgKHBsYXRmb3JtICE9PSAnd2luMzInKSB7XG5cdFx0cmV0dXJuICdQQVRIJztcblx0fVxuXG5cdHJldHVybiBPYmplY3Qua2V5cyhlbnZpcm9ubWVudCkucmV2ZXJzZSgpLmZpbmQoa2V5ID0+IGtleS50b1VwcGVyQ2FzZSgpID09PSAnUEFUSCcpIHx8ICdQYXRoJztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aEtleTtcbi8vIFRPRE86IFJlbW92ZSB0aGlzIGZvciB0aGUgbmV4dCBtYWpvciByZWxlYXNlXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gcGF0aEtleTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js\n");

/***/ })

};
;