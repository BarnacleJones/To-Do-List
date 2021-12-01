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
    else if (target === "submitTask")  _projectFactory__WEBPACK_IMPORTED_MODULE_0__.currentProject.addTask();
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
/* harmony export */   "currentProject": () => (/* binding */ currentProject),
/* harmony export */   "projectFactory": () => (/* binding */ projectFactory)
/* harmony export */ });
/* harmony import */ var _updateProjectDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateProjectDOM */ "./src/updateProjectDOM.js");
/* harmony import */ var _updateTaskDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateTaskDOM */ "./src/updateTaskDOM.js");
/* harmony import */ var _eventlisteners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventlisteners */ "./src/eventlisteners.js");




//array to hold all the projects
let allProjectsArray = [];


//function called when event listener fired, creates new project, pushes project to allprojectsarray, and puts it on the page
function createProject(name){
const project = projectFactory(name)
currentProject = project;
allProjectsArray.push(currentProject)
project.putOnPage();
(0,_eventlisteners__WEBPACK_IMPORTED_MODULE_2__.closeProjectForm)();
console.log(allProjectsArray)
}

//this is called when 'new project' is pushed
const projectFactory = (projectName) => {
    
    //create array for this project
    let projectArray = [];

    function putOnPage(){
    //put project on page
    (0,_updateProjectDOM__WEBPACK_IMPORTED_MODULE_0__.updateProjectDOM)(projectName);
    }
    
    function addTask(){
        let tasktitle = document.getElementById("title").value;
        projectArray.push(tasktitle);
        (0,_updateTaskDOM__WEBPACK_IMPORTED_MODULE_1__.addTaskToDOM)()
        console.log(projectArray)
    }

    return {putOnPage, addTask}
    }
    
//global value of what the current project selected is - default value first
let currentProject = projectFactory("default");
allProjectsArray.push(currentProject);
console.log(currentProject)





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
    newh2.setAttribute("class", project);
    // newh2.addEventListener("click", selectProject(project))
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
    newDiv.setAttribute("id", `div${taskNumber}`);

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
/* harmony import */ var _updateProjectDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateProjectDOM */ "./src/updateProjectDOM.js");
/* harmony import */ var _eventlisteners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventlisteners */ "./src/eventlisteners.js");





(0,_eventlisteners__WEBPACK_IMPORTED_MODULE_1__.initialeventListeners)();
(0,_updateProjectDOM__WEBPACK_IMPORTED_MODULE_0__.updateProjectDOM)("default");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFnRTs7QUFFaEUsd0JBQXdCO0FBQ3hCLDJCQUEyQjtBQUMzQix5QkFBeUI7QUFDekIsNEJBQTRCOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDhEQUFhO0FBQ3ZELHVDQUF1QyxtRUFBc0I7QUFDN0QsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQnNEO0FBQ1Q7QUFDSTs7QUFFakQ7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxtRUFBZ0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNERBQVk7QUFDcEI7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVzRDs7Ozs7Ozs7Ozs7Ozs7OztBQzVDdEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUaUQ7O0FBRWpEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxXQUFXOztBQUUvQztBQUNBLFdBQVcsVUFBVTtBQUNyQixTQUFTLFlBQVk7QUFDckIsY0FBYyxRQUFRO0FBQ3RCLG1CQUFtQixhQUFhOztBQUVoQztBQUNBO0FBQ0EsSUFBSSw4REFBYTtBQUNqQjtBQUNBOzs7Ozs7OztVQzNCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDSnNEO0FBQ0c7O0FBRXpELHNFQUFxQjtBQUNyQixtRUFBZ0IsWSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2V2ZW50bGlzdGVuZXJzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3VwZGF0ZVByb2plY3RET00uanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlVGFza0RPTS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVByb2plY3QsIGN1cnJlbnRQcm9qZWN0fSBmcm9tIFwiLi9wcm9qZWN0RmFjdG9yeVwiO1xuXG5mdW5jdGlvbiBzaG93VGFza0Zvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1BcmVhXCIpLnN0eWxlLmRpc3BsYXkgPSBcImluaGVyaXRcIjt9XG5mdW5jdGlvbiBzaG93UHJvamVjdEZvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImluaGVyaXRcIjt9XG5mdW5jdGlvbiBjbG9zZVRhc2tGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtQXJlYVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7fVxuZnVuY3Rpb24gY2xvc2VQcm9qZWN0Rm9ybSgpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdEZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO31cblxuZnVuY3Rpb24gaW5pdGlhbGV2ZW50TGlzdGVuZXJzKCl7XG4vL2V2ZW50IGxpc3RlbmVycyBmb3IgbmF2aWdhdGlvblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQuY2xhc3NOYW1lO1xuICAgIGlmICh0YXJnZXQgPT09IFwiYWRkVGFza1wiKSBzaG93VGFza0Zvcm0oKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiY2xvc2VUYXNrXCIpIGNsb3NlVGFza0Zvcm0oKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiYWRkUHJvamVjdFwiKSBzaG93UHJvamVjdEZvcm0oKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiY2xvc2VQcm9qZWN0XCIpIGNsb3NlUHJvamVjdEZvcm0oKTsgXG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInN1Ym1pdFByb2plY3RcIikgIGNyZWF0ZVByb2plY3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0VGl0bGVcIikudmFsdWUpOyAgXG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInN1Ym1pdFRhc2tcIikgIGN1cnJlbnRQcm9qZWN0LmFkZFRhc2soKTtcbn0pXG59XG5cbmV4cG9ydCB7aW5pdGlhbGV2ZW50TGlzdGVuZXJzLCBjbG9zZVRhc2tGb3JtLCBjbG9zZVByb2plY3RGb3JtfSIsImltcG9ydCB7IHVwZGF0ZVByb2plY3RET00gfSBmcm9tIFwiLi91cGRhdGVQcm9qZWN0RE9NXCI7XG5pbXBvcnQge2FkZFRhc2tUb0RPTX0gZnJvbSBcIi4vdXBkYXRlVGFza0RPTVwiO1xuaW1wb3J0IHtjbG9zZVByb2plY3RGb3JtfSBmcm9tIFwiLi9ldmVudGxpc3RlbmVyc1wiXG5cbi8vYXJyYXkgdG8gaG9sZCBhbGwgdGhlIHByb2plY3RzXG5sZXQgYWxsUHJvamVjdHNBcnJheSA9IFtdO1xuXG5cbi8vZnVuY3Rpb24gY2FsbGVkIHdoZW4gZXZlbnQgbGlzdGVuZXIgZmlyZWQsIGNyZWF0ZXMgbmV3IHByb2plY3QsIHB1c2hlcyBwcm9qZWN0IHRvIGFsbHByb2plY3RzYXJyYXksIGFuZCBwdXRzIGl0IG9uIHRoZSBwYWdlXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpe1xuY29uc3QgcHJvamVjdCA9IHByb2plY3RGYWN0b3J5KG5hbWUpXG5jdXJyZW50UHJvamVjdCA9IHByb2plY3Q7XG5hbGxQcm9qZWN0c0FycmF5LnB1c2goY3VycmVudFByb2plY3QpXG5wcm9qZWN0LnB1dE9uUGFnZSgpO1xuY2xvc2VQcm9qZWN0Rm9ybSgpO1xuY29uc29sZS5sb2coYWxsUHJvamVjdHNBcnJheSlcbn1cblxuLy90aGlzIGlzIGNhbGxlZCB3aGVuICduZXcgcHJvamVjdCcgaXMgcHVzaGVkXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9IChwcm9qZWN0TmFtZSkgPT4ge1xuICAgIFxuICAgIC8vY3JlYXRlIGFycmF5IGZvciB0aGlzIHByb2plY3RcbiAgICBsZXQgcHJvamVjdEFycmF5ID0gW107XG5cbiAgICBmdW5jdGlvbiBwdXRPblBhZ2UoKXtcbiAgICAvL3B1dCBwcm9qZWN0IG9uIHBhZ2VcbiAgICB1cGRhdGVQcm9qZWN0RE9NKHByb2plY3ROYW1lKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gYWRkVGFzaygpe1xuICAgICAgICBsZXQgdGFza3RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKS52YWx1ZTtcbiAgICAgICAgcHJvamVjdEFycmF5LnB1c2godGFza3RpdGxlKTtcbiAgICAgICAgYWRkVGFza1RvRE9NKClcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdEFycmF5KVxuICAgIH1cblxuICAgIHJldHVybiB7cHV0T25QYWdlLCBhZGRUYXNrfVxuICAgIH1cbiAgICBcbi8vZ2xvYmFsIHZhbHVlIG9mIHdoYXQgdGhlIGN1cnJlbnQgcHJvamVjdCBzZWxlY3RlZCBpcyAtIGRlZmF1bHQgdmFsdWUgZmlyc3RcbmxldCBjdXJyZW50UHJvamVjdCA9IHByb2plY3RGYWN0b3J5KFwiZGVmYXVsdFwiKTtcbmFsbFByb2plY3RzQXJyYXkucHVzaChjdXJyZW50UHJvamVjdCk7XG5jb25zb2xlLmxvZyhjdXJyZW50UHJvamVjdClcblxuZXhwb3J0IHtjcmVhdGVQcm9qZWN0LCBjdXJyZW50UHJvamVjdCwgcHJvamVjdEZhY3Rvcnl9XG5cbiIsIi8vdGhpcyBmdW5jdGlvbiBpcyBzb2xlbHkgZ2V0dGluZyB0aGUgbmFtZSBvZiB0aGUgcHJvamVjdCBhbmQgYWRkaW5nIGl0IHRvIHRoZSBkb21cblxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdERPTShwcm9qZWN0KXtcbiAgICBsZXQgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzRGlzcGxheVwiKTtcbiAgICBsZXQgbmV3aDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgbmV3aDIuaW5uZXJUZXh0ID0gcHJvamVjdDtcbiAgICBuZXdoMi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBwcm9qZWN0KTtcbiAgICAvLyBuZXdoMi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZWN0UHJvamVjdChwcm9qZWN0KSlcbiAgICBwcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChuZXdoMik7XG59XG5cbmV4cG9ydCB7dXBkYXRlUHJvamVjdERPTX0iLCJpbXBvcnQgeyBjbG9zZVRhc2tGb3JtIH0gZnJvbSBcIi4vZXZlbnRsaXN0ZW5lcnNcIjtcblxuLy90aGlzIGZ1bmN0aW9uIGlzIGdldHRpbmcgdmFsdWVzIGZyb20gdGFzayBmb3JtIFxuLy9hbmQgYXBwZW5kaW5nIHRoZSB0YXNrIHRvIHRoZSBkb21cblxubGV0IHRhc2tOdW1iZXIgPSAwO1xuXG5mdW5jdGlvbiBhZGRUYXNrVG9ET00oKXtcbiAgICBsZXQgdGFza3RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKS52YWx1ZTtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkRlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICAgIGxldCBkdWVkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVcIikudmFsdWU7XG4gICAgbGV0IHRhc2twcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XG4gICAgXG4gICAgbGV0IHRhc2tBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRGlzcGxheVwiKTtcbiAgICBsZXQgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICBuZXdEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGRpdiR7dGFza051bWJlcn1gKTtcblxuICAgIG5ld0Rpdi5pbm5lckhUTUwgPSBcbiAgICBgPGgzPiR7dGFza3RpdGxlfTwvaDM+XG4gICAgPHA+JHtkZXNjcmlwdGlvbn08L3A+XG4gICAgPHA+RHVlOiAke2R1ZWRhdGV9PC9wPlxuICAgIDxwPlByaW9yaXR5OiAke3Rhc2twcmlvcml0eX08L3A+YFxuXG4gICAgdGFza0FyZWEuYXBwZW5kQ2hpbGQobmV3RGl2KTtcbiAgICB0YXNrTnVtYmVyKys7XG4gICAgY2xvc2VUYXNrRm9ybSgpO1xuICAgIFxufVxuXG5leHBvcnQge2FkZFRhc2tUb0RPTX0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuXG5pbXBvcnQgeyB1cGRhdGVQcm9qZWN0RE9NIH0gZnJvbSBcIi4vdXBkYXRlUHJvamVjdERPTVwiO1xuaW1wb3J0IHsgaW5pdGlhbGV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vZXZlbnRsaXN0ZW5lcnNcIjtcblxuaW5pdGlhbGV2ZW50TGlzdGVuZXJzKCk7XG51cGRhdGVQcm9qZWN0RE9NKFwiZGVmYXVsdFwiKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=