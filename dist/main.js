/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/eventlisteners.js":
/*!*******************************!*\
  !*** ./src/eventlisteners.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initialeventListeners": () => (/* binding */ initialeventListeners),
/* harmony export */   "closeTaskForm": () => (/* binding */ closeTaskForm),
/* harmony export */   "closeProjectForm": () => (/* binding */ closeProjectForm)
/* harmony export */ });
/* harmony import */ var _projectFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectFactory */ "./src/projectFactory.js");


function showTaskForm(){document.getElementById("formArea").style.display = "inherit";}
function showProjectForm(){document.getElementById("projectForm").style.display = "inherit";}
function closeTaskForm(){document.getElementById("formArea").style.display = "none";}
function closeProjectForm(){document.getElementById("projectForm").style.display = "none";}



function initialeventListeners(){
//event listeners for navigation
document.addEventListener("click", (e) => {
    const target = e.target.className;
        
    if (target === "addTask") showTaskForm();
    else if (target === "closeTask") closeTaskForm();
    else if (target === "addProject") showProjectForm();
    else if (target === "closeProject") closeProjectForm(); 
    else if (target === "submitProject")  (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.createProject)(document.getElementById("projectTitle").value);  
    else if (target === "submitTask")  _projectFactory__WEBPACK_IMPORTED_MODULE_0__.projectName.addTask();
    else if (target === "projectTitle") (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.selectProject)(e);
})
}



/***/ }),

/***/ "./src/projectFactory.js":
/*!*******************************!*\
  !*** ./src/projectFactory.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProject": () => (/* binding */ createProject),
/* harmony export */   "projectFactory": () => (/* binding */ projectFactory),
/* harmony export */   "projectName": () => (/* binding */ projectName),
/* harmony export */   "selectProject": () => (/* binding */ selectProject),
/* harmony export */   "currentproject": () => (/* binding */ currentproject)
/* harmony export */ });
/* harmony import */ var _updateProjectDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateProjectDOM */ "./src/updateProjectDOM.js");
/* harmony import */ var _updateTaskDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateTaskDOM */ "./src/updateTaskDOM.js");
/* harmony import */ var _eventlisteners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventlisteners */ "./src/eventlisteners.js");




//array to hold all the projects
let allProjectsArray = [];

//global value for creating new projects based on name field
let projectName;

//function called when event listener fired, creates new project, pushes project to allprojectsarray, and puts it on the page
function createProject(name){
    
    projectName = projectFactory(name)    
    allProjectsArray.push(projectName)
    projectName.putOnPage();
    console.log("new project created, called "+projectName.name)
    ;(0,_eventlisteners__WEBPACK_IMPORTED_MODULE_2__.closeProjectForm)();    
}

let currentproject = "default";
function selectProject(e){
    console.log(e.target.id);
    currentproject = e.target.id;
    console.log("current project is now: " + currentproject)
    // projectName = currentproject;
}

const projectFactory = (suppliedName) => {
    
    //so i can see whats going on in logs
    let name = suppliedName;

    //create array for this project
    let projectArray = [];

    function putOnPage(){        
        (0,_updateProjectDOM__WEBPACK_IMPORTED_MODULE_0__.updateProjectDOM)(suppliedName);
    }
    
    function addTask(){
        //just pushing title for now. Will need to push whole object for removing..somehow
        let tasktitle = document.getElementById("title").value;
        projectArray.push(tasktitle);
        (0,_updateTaskDOM__WEBPACK_IMPORTED_MODULE_1__.addTaskToDOM)()
    }

    return {putOnPage, addTask, name}
    }
    






/***/ }),

/***/ "./src/updateProjectDOM.js":
/*!*********************************!*\
  !*** ./src/updateProjectDOM.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateProjectDOM": () => (/* binding */ updateProjectDOM)
/* harmony export */ });
//this function is solely getting the name of the project and adding it to the dom

function updateProjectDOM(project){
    let projectArea = document.getElementById("projectsDisplay");
    let newh2 = document.createElement("h2");
    newh2.innerText = project;
    newh2.setAttribute("class", "projectTitle");
    newh2.setAttribute("id", project);
    projectArea.appendChild(newh2);
}



/***/ }),

/***/ "./src/updateTaskDOM.js":
/*!******************************!*\
  !*** ./src/updateTaskDOM.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTaskToDOM": () => (/* binding */ addTaskToDOM)
/* harmony export */ });
/* harmony import */ var _eventlisteners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventlisteners */ "./src/eventlisteners.js");
/* harmony import */ var _projectFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectFactory */ "./src/projectFactory.js");



//this function is getting values from task form 
//and appending the task to the dom

let taskNumber = 0;

function addTaskToDOM(){
    let tasktitle = document.getElementById("title").value;
    let description = document.getElementById("Description").value;
    let duedate = document.getElementById("due").value;
    let taskpriority = document.getElementById("priority").value;
    
    let taskArea = document.getElementById("mainDisplay");
    let newDiv = document.createElement("DIV");
    newDiv.setAttribute("id", `${_projectFactory__WEBPACK_IMPORTED_MODULE_1__.currentproject+taskNumber}`);

    newDiv.innerHTML = 
    `<h3>${tasktitle}</h3>
    <p>${description}</p>
    <p>Due: ${duedate}</p>
    <p>Priority: ${taskpriority}</p>`

    taskArea.appendChild(newDiv);
    taskNumber++;
    (0,_eventlisteners__WEBPACK_IMPORTED_MODULE_0__.closeTaskForm)();
    
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _projectFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectFactory */ "./src/projectFactory.js");
/* harmony import */ var _eventlisteners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventlisteners */ "./src/eventlisteners.js");





(0,_eventlisteners__WEBPACK_IMPORTED_MODULE_1__.initialeventListeners)();
(0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.createProject)("default");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUE0RTs7QUFFNUUsd0JBQXdCO0FBQ3hCLDJCQUEyQjtBQUMzQix5QkFBeUI7QUFDekIsNEJBQTRCOzs7O0FBSTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw4REFBYTtBQUN2RCx1Q0FBdUMsZ0VBQW1CO0FBQzFELHdDQUF3Qyw4REFBYTtBQUNyRCxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJzRDtBQUNUO0FBQ0k7O0FBRWpEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksa0VBQWdCO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLG1FQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDREQUFZO0FBQ3BCOztBQUVBLFlBQVk7QUFDWjtBQUNBOzs7QUFHa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRGxGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RpRDtBQUNGOztBQUUvQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsMkRBQWMsWUFBWTs7QUFFM0Q7QUFDQSxXQUFXLFVBQVU7QUFDckIsU0FBUyxZQUFZO0FBQ3JCLGNBQWMsUUFBUTtBQUN0QixtQkFBbUIsYUFBYTs7QUFFaEM7QUFDQTtBQUNBLElBQUksOERBQWE7QUFDakI7QUFDQTs7Ozs7Ozs7VUM1QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ0ppRDtBQUNROztBQUV6RCxzRUFBcUI7QUFDckIsOERBQWEsWSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2V2ZW50bGlzdGVuZXJzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3VwZGF0ZVByb2plY3RET00uanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlVGFza0RPTS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVByb2plY3QsIHByb2plY3ROYW1lLCBzZWxlY3RQcm9qZWN0fSBmcm9tIFwiLi9wcm9qZWN0RmFjdG9yeVwiO1xuXG5mdW5jdGlvbiBzaG93VGFza0Zvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1BcmVhXCIpLnN0eWxlLmRpc3BsYXkgPSBcImluaGVyaXRcIjt9XG5mdW5jdGlvbiBzaG93UHJvamVjdEZvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImluaGVyaXRcIjt9XG5mdW5jdGlvbiBjbG9zZVRhc2tGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtQXJlYVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7fVxuZnVuY3Rpb24gY2xvc2VQcm9qZWN0Rm9ybSgpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdEZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO31cblxuXG5cbmZ1bmN0aW9uIGluaXRpYWxldmVudExpc3RlbmVycygpe1xuLy9ldmVudCBsaXN0ZW5lcnMgZm9yIG5hdmlnYXRpb25cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0LmNsYXNzTmFtZTtcbiAgICAgICAgXG4gICAgaWYgKHRhcmdldCA9PT0gXCJhZGRUYXNrXCIpIHNob3dUYXNrRm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJjbG9zZVRhc2tcIikgY2xvc2VUYXNrRm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJhZGRQcm9qZWN0XCIpIHNob3dQcm9qZWN0Rm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJjbG9zZVByb2plY3RcIikgY2xvc2VQcm9qZWN0Rm9ybSgpOyBcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwic3VibWl0UHJvamVjdFwiKSAgY3JlYXRlUHJvamVjdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RUaXRsZVwiKS52YWx1ZSk7ICBcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwic3VibWl0VGFza1wiKSAgcHJvamVjdE5hbWUuYWRkVGFzaygpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJwcm9qZWN0VGl0bGVcIikgc2VsZWN0UHJvamVjdChlKTtcbn0pXG59XG5cbmV4cG9ydCB7aW5pdGlhbGV2ZW50TGlzdGVuZXJzLCBjbG9zZVRhc2tGb3JtLCBjbG9zZVByb2plY3RGb3JtfSIsImltcG9ydCB7IHVwZGF0ZVByb2plY3RET00gfSBmcm9tIFwiLi91cGRhdGVQcm9qZWN0RE9NXCI7XG5pbXBvcnQge2FkZFRhc2tUb0RPTX0gZnJvbSBcIi4vdXBkYXRlVGFza0RPTVwiO1xuaW1wb3J0IHtjbG9zZVByb2plY3RGb3JtfSBmcm9tIFwiLi9ldmVudGxpc3RlbmVyc1wiXG5cbi8vYXJyYXkgdG8gaG9sZCBhbGwgdGhlIHByb2plY3RzXG5sZXQgYWxsUHJvamVjdHNBcnJheSA9IFtdO1xuXG4vL2dsb2JhbCB2YWx1ZSBmb3IgY3JlYXRpbmcgbmV3IHByb2plY3RzIGJhc2VkIG9uIG5hbWUgZmllbGRcbmxldCBwcm9qZWN0TmFtZTtcblxuLy9mdW5jdGlvbiBjYWxsZWQgd2hlbiBldmVudCBsaXN0ZW5lciBmaXJlZCwgY3JlYXRlcyBuZXcgcHJvamVjdCwgcHVzaGVzIHByb2plY3QgdG8gYWxscHJvamVjdHNhcnJheSwgYW5kIHB1dHMgaXQgb24gdGhlIHBhZ2VcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSl7XG4gICAgXG4gICAgcHJvamVjdE5hbWUgPSBwcm9qZWN0RmFjdG9yeShuYW1lKSAgICBcbiAgICBhbGxQcm9qZWN0c0FycmF5LnB1c2gocHJvamVjdE5hbWUpXG4gICAgcHJvamVjdE5hbWUucHV0T25QYWdlKCk7XG4gICAgY29uc29sZS5sb2coXCJuZXcgcHJvamVjdCBjcmVhdGVkLCBjYWxsZWQgXCIrcHJvamVjdE5hbWUubmFtZSlcbiAgICBjbG9zZVByb2plY3RGb3JtKCk7ICAgIFxufVxuXG5sZXQgY3VycmVudHByb2plY3QgPSBcImRlZmF1bHRcIjtcbmZ1bmN0aW9uIHNlbGVjdFByb2plY3QoZSl7XG4gICAgY29uc29sZS5sb2coZS50YXJnZXQuaWQpO1xuICAgIGN1cnJlbnRwcm9qZWN0ID0gZS50YXJnZXQuaWQ7XG4gICAgY29uc29sZS5sb2coXCJjdXJyZW50IHByb2plY3QgaXMgbm93OiBcIiArIGN1cnJlbnRwcm9qZWN0KVxuICAgIC8vIHByb2plY3ROYW1lID0gY3VycmVudHByb2plY3Q7XG59XG5cbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKHN1cHBsaWVkTmFtZSkgPT4ge1xuICAgIFxuICAgIC8vc28gaSBjYW4gc2VlIHdoYXRzIGdvaW5nIG9uIGluIGxvZ3NcbiAgICBsZXQgbmFtZSA9IHN1cHBsaWVkTmFtZTtcblxuICAgIC8vY3JlYXRlIGFycmF5IGZvciB0aGlzIHByb2plY3RcbiAgICBsZXQgcHJvamVjdEFycmF5ID0gW107XG5cbiAgICBmdW5jdGlvbiBwdXRPblBhZ2UoKXsgICAgICAgIFxuICAgICAgICB1cGRhdGVQcm9qZWN0RE9NKHN1cHBsaWVkTmFtZSk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGFkZFRhc2soKXtcbiAgICAgICAgLy9qdXN0IHB1c2hpbmcgdGl0bGUgZm9yIG5vdy4gV2lsbCBuZWVkIHRvIHB1c2ggd2hvbGUgb2JqZWN0IGZvciByZW1vdmluZy4uc29tZWhvd1xuICAgICAgICBsZXQgdGFza3RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKS52YWx1ZTtcbiAgICAgICAgcHJvamVjdEFycmF5LnB1c2godGFza3RpdGxlKTtcbiAgICAgICAgYWRkVGFza1RvRE9NKClcbiAgICB9XG5cbiAgICByZXR1cm4ge3B1dE9uUGFnZSwgYWRkVGFzaywgbmFtZX1cbiAgICB9XG4gICAgXG5cblxuZXhwb3J0IHtjcmVhdGVQcm9qZWN0LCBwcm9qZWN0RmFjdG9yeSwgcHJvamVjdE5hbWUsIHNlbGVjdFByb2plY3QsIGN1cnJlbnRwcm9qZWN0fVxuXG4iLCIvL3RoaXMgZnVuY3Rpb24gaXMgc29sZWx5IGdldHRpbmcgdGhlIG5hbWUgb2YgdGhlIHByb2plY3QgYW5kIGFkZGluZyBpdCB0byB0aGUgZG9tXG5cbmZ1bmN0aW9uIHVwZGF0ZVByb2plY3RET00ocHJvamVjdCl7XG4gICAgbGV0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0c0Rpc3BsYXlcIik7XG4gICAgbGV0IG5ld2gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIG5ld2gyLmlubmVyVGV4dCA9IHByb2plY3Q7XG4gICAgbmV3aDIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcm9qZWN0VGl0bGVcIik7XG4gICAgbmV3aDIuc2V0QXR0cmlidXRlKFwiaWRcIiwgcHJvamVjdCk7XG4gICAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQobmV3aDIpO1xufVxuXG5leHBvcnQge3VwZGF0ZVByb2plY3RET019IiwiaW1wb3J0IHsgY2xvc2VUYXNrRm9ybSB9IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XG5pbXBvcnQge2N1cnJlbnRwcm9qZWN0fSBmcm9tIFwiLi9wcm9qZWN0RmFjdG9yeVwiXG5cbi8vdGhpcyBmdW5jdGlvbiBpcyBnZXR0aW5nIHZhbHVlcyBmcm9tIHRhc2sgZm9ybSBcbi8vYW5kIGFwcGVuZGluZyB0aGUgdGFzayB0byB0aGUgZG9tXG5cbmxldCB0YXNrTnVtYmVyID0gMDtcblxuZnVuY3Rpb24gYWRkVGFza1RvRE9NKCl7XG4gICAgbGV0IHRhc2t0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIikudmFsdWU7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJEZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgICBsZXQgZHVlZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlXCIpLnZhbHVlO1xuICAgIGxldCB0YXNrcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xuICAgIFxuICAgIGxldCB0YXNrQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkRpc3BsYXlcIik7XG4gICAgbGV0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgbmV3RGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2N1cnJlbnRwcm9qZWN0K3Rhc2tOdW1iZXJ9YCk7XG5cbiAgICBuZXdEaXYuaW5uZXJIVE1MID0gXG4gICAgYDxoMz4ke3Rhc2t0aXRsZX08L2gzPlxuICAgIDxwPiR7ZGVzY3JpcHRpb259PC9wPlxuICAgIDxwPkR1ZTogJHtkdWVkYXRlfTwvcD5cbiAgICA8cD5Qcmlvcml0eTogJHt0YXNrcHJpb3JpdHl9PC9wPmBcblxuICAgIHRhc2tBcmVhLmFwcGVuZENoaWxkKG5ld0Rpdik7XG4gICAgdGFza051bWJlcisrO1xuICAgIGNsb3NlVGFza0Zvcm0oKTtcbiAgICBcbn1cblxuZXhwb3J0IHthZGRUYXNrVG9ET019IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJcblxuaW1wb3J0IHsgY3JlYXRlUHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3RGYWN0b3J5XCI7XG5pbXBvcnQgeyBpbml0aWFsZXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9ldmVudGxpc3RlbmVyc1wiO1xuXG5pbml0aWFsZXZlbnRMaXN0ZW5lcnMoKTtcbmNyZWF0ZVByb2plY3QoXCJkZWZhdWx0XCIpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==