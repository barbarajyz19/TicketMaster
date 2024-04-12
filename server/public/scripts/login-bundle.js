/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/login.js":
/*!**************************!*\
  !*** ./scripts/login.js ***!
  \**************************/
/***/ (() => {

eval("let userlogin;\nlet userpassword;\n\nconst setup = () => {\n  userlogin = document.getElementById(\"userlogin\");\n  userpassword = document.getElementById(\"userpassword\");\n  document.getElementById(\"login\").addEventListener(\"click\", login);\n};\nwindow.addEventListener(\"DOMContentLoaded\", setup);\n\nconst login = async () => {\n  const userData = { login: userlogin.value, password: userpassword.value };\n  const body = JSON.stringify(userData);\n  const requestOptions = {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: body,\n  };\n  const response = await fetch(`/access/login`, requestOptions);\n  if (response.ok) {\n    const loggedUser = await response.json();\n    if (userData.login === \"admin\" && userData.password === \"admin\")\n      window.location.href = \"/admin\";\n    else {\n      window.location.href = \"/user\";\n    }\n  } else {\n    const error = await response.json();\n    console.log(\"erreur : \", error.message);\n  }\n};\n\n\n//# sourceURL=webpack://client/./scripts/login.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./scripts/login.js"]();
/******/ 	
/******/ })()
;