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

/***/ "./scripts/register.js":
/*!*****************************!*\
  !*** ./scripts/register.js ***!
  \*****************************/
/***/ (() => {

eval("let userlogin;\nlet userpassword;\nlet username;\n\nconst setup = () => {\n  username = document.getElementById(\"username\");\n  userlogin = document.getElementById(\"userlogin\");\n  userpassword = document.getElementById(\"userpassword\");\n  document.getElementById(\"register\").addEventListener(\"click\", () => register(false));\n};\nwindow.addEventListener(\"DOMContentLoaded\", setup);\n\nconst register = async (admin) => {\n  const userData = {\n    name: username.value,\n    login: userlogin.value,\n    password: userpassword.value,\n    admin: admin || false,\n  };\n  if (userData.login === \"admin\" && userData.password === \"admin\"){\n    userData.admin = true;\n  }\n  console.log(`data : ${userData.admin}`);\n  const body = JSON.stringify(userData);\n  const requestOptions = {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: body,\n  };\n  const response = await fetch(`/access/register`, requestOptions);\n  if (response.ok) {\n    const createdUser = await response.json();\n    console.log(`user registered : ${JSON.stringify(createdUser)}`);\n    window.location.href = \"/access/login\";\n  } else {\n    const error = await response.json();\n    console.log(`erreur : ${error.message}`);\n  }\n};\n\nconst adminRegister = () => register(true);\n\n\n//# sourceURL=webpack://client/./scripts/register.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./scripts/register.js"]();
/******/ 	
/******/ })()
;