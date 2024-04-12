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

/***/ "./scripts/admin.js":
/*!**************************!*\
  !*** ./scripts/admin.js ***!
  \**************************/
/***/ (() => {

eval("document.addEventListener(\"DOMContentLoaded\", function () {\n  const showList = document.getElementById(\"all\");\n  const showDescription = document.getElementById(\"descShow\");\n  const nbTickets = document.getElementById(\"nbPlace\");\n  const createShowBtn = document.getElementById(\"add\");\n\n  /**\n  * manages the display of shows\n  */\n  async function displayShows() {\n    const response = await fetch(\"/admin/shows\");\n    console.log(response);\n    if (!response.ok) {\n      console.log(\"erreur récuperation des spectacles\");\n      handleError(await response.json());\n    }\n    const shows = await response.json();\n    console.log(\"shows:\", shows);\n    showList.innerHTML = \"\";\n    shows.forEach((show) => {\n      const infoShow = document.createElement(\"div\");\n      infoShow.id = \"spectacle-info\";\n      infoShow.innerHTML = `\n          <span><span id=\"nameShow\">${show.description}</span> : <b><span id=\"nbPlace\">${show.tickets}</span></b> places </span>\n          <button class=\"cancel\" data-show-id=\"${show._id}\">Annuler</button>\n          <button class=\"edit\" data-show-id=\"${show._id}\">Modifier</button>\n      `;\n      showList.appendChild(infoShow);\n    });\n  }\n\n  /**\n  * manages the creation of a show\n  * @param {string} description - The description of the show\n  * @param {int} tickets - The number of tickets the show has\n  */\n  async function createShow(description, tickets) {\n    const response = await fetch(\"/admin/shows\", {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\",\n      },\n      body: JSON.stringify({ description, tickets }),\n    });\n    if (!response.ok) {\n      console.log(\"erreur création du spectacle\");\n      handleError(await response.json());\n    }\n    const newShow = await response.json();\n    showDescription.value = \"\";\n    nbTickets.value = \"\";\n    console.log(\"spectacle crée\");\n    await displayShows();\n  }\n\n  // handle the creation event\n  createShowBtn.addEventListener(\"click\", function () {\n    const description = showDescription.value.trim();\n    const tickets = parseInt(nbTickets.value);\n    if (description && tickets) {\n      createShow(description, tickets);\n    } else {\n      console.log(\"saisir une description et un nombre de place\");\n    }\n  });\n\n  /**\n  * manages the deletion of a show\n  * @param {ObjectId} showId - The id of the show\n  */\n  async function deleteShow(showId) {\n    const response = await fetch(`/admin/deleteShows/${showId}`, {\n      method: \"DELETE\",\n    });\n    if (!response.ok) {\n      console.log(\"erreur supression du spectacle\");\n      handleError(await response.json());\n    }\n    await displayShows();\n  }\n\n  // handle the deletion of a show\n  showList.addEventListener(\"click\", function (event) {\n    if (event.target.classList.contains(\"cancel\")) {\n      const showId = event.target.dataset.showId;\n      deleteShow(showId);\n    }\n  });\n\n  /**\n  * manages the modification of a show\n  * @param {ObjectId} showId - The id of the show\n  */\n  async function editShow(showId) {\n    const newDesc = prompt(\"Entrez la nouvelle description du spectacle :\");\n    const newTickets = prompt(\"Entrez le nombre de tickets :\");\n\n    const response = await fetch(`/admin/editShows/${showId}`, {\n      method: \"PUT\",\n      headers: {\n        \"Content-Type\": \"application/json\",\n      },\n      body: JSON.stringify({ description: newDesc, tickets: newTickets }),\n    });\n    if (!response.ok) {\n      console.log(\"erreur modification du spectacle\");\n      handleError(await response.json());\n    }\n    await displayShows();\n  }\n\n  // handle the event of modification of a show\n  showList.addEventListener(\"click\", function (event) {\n    if (event.target.classList.contains(\"edit\")) {\n      const showId = event.target.dataset.showId;\n      editShow(showId);\n    }\n  });\n\n  displayShows();\n\n  const handleError = (error) => {\n    if (error.redirectTo) window.location.href = error.redirectTo;\n    else console.log(`erreur : ${error.message}`);\n  };\n\n  const logout = async () => {\n    const requestOptions = {\n      method: \"GET\",\n    };\n    const response = await fetch(`/access/logout`, requestOptions);\n    if (response.ok) {\n      window.location.href = \"/\";\n    }\n  };\n\n  // manage when the admin wants to log out\n  document.getElementById(\"disconnect\").addEventListener(\"click\", logout);\n});\n\n\n//# sourceURL=webpack://client/./scripts/admin.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./scripts/admin.js"]();
/******/ 	
/******/ })()
;