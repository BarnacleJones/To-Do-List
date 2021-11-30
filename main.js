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
/* harmony export */   "closeTaskForm": () => (/* binding */ closeTaskForm)
/* harmony export */ });
/* harmony import */ var _projectFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectFactory */ "./src/projectFactory.js");
/* harmony import */ var _taskFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskFactory */ "./src/taskFactory.js");



function showTaskForm(){
    document.getElementById("formArea").style.display = "inherit";  
      
}

function showProjectForm(){
    document.getElementById("projectForm").style.display = "inherit";
}

function closeTaskForm(){
    document.getElementById("formArea").style.display = "none";
}

function closeProjectForm(){
    document.getElementById("projectForm").style.display = "none";
}

function initialeventListeners(){
//event listners for navigation
document.addEventListener("click", (e) => {
    const target = e.target.className;
    if (target === "addTask") showTaskForm();
    else if (target === "closeTask") closeTaskForm();
    else if (target === "addProject") showProjectForm();
    else if (target === "closeProject") closeProjectForm(); 
    else if (target === "submitProject")  (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.projects)();  
    else if (target === "submitTask")  (0,_taskFactory__WEBPACK_IMPORTED_MODULE_1__.newTask)();
})
}

//function for adding event listners to things to remove (eg projects/tasks)
function newEventListener(elementClassName){}



/***/ }),

/***/ "./src/projectFactory.js":
/*!*******************************!*\
  !*** ./src/projectFactory.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projects": () => (/* binding */ projects)
/* harmony export */ });
/* harmony import */ var _updateProjectArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateProjectArray */ "./src/updateProjectArray.js");
/* harmony import */ var _updateProjectDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateProjectDOM */ "./src/updateProjectDOM.js");
//want this to be called when new project is pushed

//create project (get name from document)
//clears main area, populates it with array of tasks for this project




const projects = () => {
    let projectName = document.getElementById("projectTitle").value;
    //put project on page
    (0,_updateProjectDOM__WEBPACK_IMPORTED_MODULE_1__.updateProjectDOM)(projectName);
    //make array for this new project
    // let projectName = [];
    //update current project for tasks to go under
    // selectProject(projectName)
    }
    



/***/ }),

/***/ "./src/taskFactory.js":
/*!****************************!*\
  !*** ./src/taskFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newTask": () => (/* binding */ newTask)
/* harmony export */ });
/* harmony import */ var _updateTaskDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateTaskDOM */ "./src/updateTaskDOM.js");



//this is adding tasks to the dom now
//but it is not doing anything to do with the projects
//want it to allocate the task to the right project
const newTask = () => {
console.log("hi")
//function that will update dom
;(0,_updateTaskDOM__WEBPACK_IMPORTED_MODULE_0__.addTask)();


//  const addTask = () => project.push("test");
}



//want to add task to the dom
//want this to be tied to the current project display array
//default project by default

/***/ }),

/***/ "./src/updateProjectArray.js":
/*!***********************************!*\
  !*** ./src/updateProjectArray.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selectProject": () => (/* binding */ selectProject)
/* harmony export */ });
//want this to be run any time a project name is clicked, changes the array to whatever is clicked
//and fills in the to do area with the tasks in that array


//added as event listner on new project (h2) click

function selectProject(project){
//have this function update main task area with contents of project array

//return the project name to taskfactory
return project;
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
/* harmony import */ var _updateProjectArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateProjectArray */ "./src/updateProjectArray.js");


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
/* harmony export */   "addTask": () => (/* binding */ addTask)
/* harmony export */ });
/* harmony import */ var _eventlisteners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventlisteners */ "./src/eventlisteners.js");


let taskNumber = 0;

function addTask(){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUE0QztBQUNKOztBQUV4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHlEQUFRO0FBQ2xELHVDQUF1QyxxREFBTztBQUM5QyxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENBOztBQUVBO0FBQ0E7O0FBRXFEO0FBQ0M7O0FBRXREO0FBQ0E7QUFDQTtBQUNBLElBQUksbUVBQWdCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQjBDOzs7QUFHMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQU87OztBQUdQO0FBQ0E7O0FBRWdCOztBQUVoQjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1hxRDs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUaUQ7O0FBRWpEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsV0FBVzs7QUFFL0M7QUFDQSxXQUFXLFVBQVU7QUFDckIsU0FBUyxZQUFZO0FBQ3JCLGNBQWMsUUFBUTtBQUN0QixtQkFBbUIsYUFBYTs7QUFFaEM7QUFDQTtBQUNBLElBQUksOERBQWE7QUFDakI7Ozs7Ozs7O1VDdkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNKc0Q7QUFDRzs7QUFFekQsc0VBQXFCO0FBQ3JCLG1FQUFnQixZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvZXZlbnRsaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcHJvamVjdEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdGFza0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlUHJvamVjdEFycmF5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3VwZGF0ZVByb2plY3RET00uanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlVGFza0RPTS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb2plY3RzIH0gZnJvbSBcIi4vcHJvamVjdEZhY3RvcnlcIjtcbmltcG9ydCB7IG5ld1Rhc2sgfSBmcm9tIFwiLi90YXNrRmFjdG9yeVwiO1xuXG5mdW5jdGlvbiBzaG93VGFza0Zvcm0oKXtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1BcmVhXCIpLnN0eWxlLmRpc3BsYXkgPSBcImluaGVyaXRcIjsgIFxuICAgICAgXG59XG5cbmZ1bmN0aW9uIHNob3dQcm9qZWN0Rm9ybSgpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdEZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwiaW5oZXJpdFwiO1xufVxuXG5mdW5jdGlvbiBjbG9zZVRhc2tGb3JtKCl7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtQXJlYVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIGNsb3NlUHJvamVjdEZvcm0oKXtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGV2ZW50TGlzdGVuZXJzKCl7XG4vL2V2ZW50IGxpc3RuZXJzIGZvciBuYXZpZ2F0aW9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc05hbWU7XG4gICAgaWYgKHRhcmdldCA9PT0gXCJhZGRUYXNrXCIpIHNob3dUYXNrRm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJjbG9zZVRhc2tcIikgY2xvc2VUYXNrRm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJhZGRQcm9qZWN0XCIpIHNob3dQcm9qZWN0Rm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJjbG9zZVByb2plY3RcIikgY2xvc2VQcm9qZWN0Rm9ybSgpOyBcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwic3VibWl0UHJvamVjdFwiKSAgcHJvamVjdHMoKTsgIFxuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJzdWJtaXRUYXNrXCIpICBuZXdUYXNrKCk7XG59KVxufVxuXG4vL2Z1bmN0aW9uIGZvciBhZGRpbmcgZXZlbnQgbGlzdG5lcnMgdG8gdGhpbmdzIHRvIHJlbW92ZSAoZWcgcHJvamVjdHMvdGFza3MpXG5mdW5jdGlvbiBuZXdFdmVudExpc3RlbmVyKGVsZW1lbnRDbGFzc05hbWUpe31cblxuZXhwb3J0IHtpbml0aWFsZXZlbnRMaXN0ZW5lcnMsIGNsb3NlVGFza0Zvcm19IiwiLy93YW50IHRoaXMgdG8gYmUgY2FsbGVkIHdoZW4gbmV3IHByb2plY3QgaXMgcHVzaGVkXG5cbi8vY3JlYXRlIHByb2plY3QgKGdldCBuYW1lIGZyb20gZG9jdW1lbnQpXG4vL2NsZWFycyBtYWluIGFyZWEsIHBvcHVsYXRlcyBpdCB3aXRoIGFycmF5IG9mIHRhc2tzIGZvciB0aGlzIHByb2plY3RcblxuaW1wb3J0IHsgc2VsZWN0UHJvamVjdCB9IGZyb20gXCIuL3VwZGF0ZVByb2plY3RBcnJheVwiO1xuaW1wb3J0IHsgdXBkYXRlUHJvamVjdERPTSB9IGZyb20gXCIuL3VwZGF0ZVByb2plY3RET01cIjtcblxuY29uc3QgcHJvamVjdHMgPSAoKSA9PiB7XG4gICAgbGV0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0VGl0bGVcIikudmFsdWU7XG4gICAgLy9wdXQgcHJvamVjdCBvbiBwYWdlXG4gICAgdXBkYXRlUHJvamVjdERPTShwcm9qZWN0TmFtZSk7XG4gICAgLy9tYWtlIGFycmF5IGZvciB0aGlzIG5ldyBwcm9qZWN0XG4gICAgLy8gbGV0IHByb2plY3ROYW1lID0gW107XG4gICAgLy91cGRhdGUgY3VycmVudCBwcm9qZWN0IGZvciB0YXNrcyB0byBnbyB1bmRlclxuICAgIC8vIHNlbGVjdFByb2plY3QocHJvamVjdE5hbWUpXG4gICAgfVxuICAgIFxuXG5leHBvcnQge3Byb2plY3RzfSIsImltcG9ydCB7IGFkZFRhc2sgfSBmcm9tIFwiLi91cGRhdGVUYXNrRE9NXCI7XG5cblxuLy90aGlzIGlzIGFkZGluZyB0YXNrcyB0byB0aGUgZG9tIG5vd1xuLy9idXQgaXQgaXMgbm90IGRvaW5nIGFueXRoaW5nIHRvIGRvIHdpdGggdGhlIHByb2plY3RzXG4vL3dhbnQgaXQgdG8gYWxsb2NhdGUgdGhlIHRhc2sgdG8gdGhlIHJpZ2h0IHByb2plY3RcbmNvbnN0IG5ld1Rhc2sgPSAoKSA9PiB7XG5jb25zb2xlLmxvZyhcImhpXCIpXG4vL2Z1bmN0aW9uIHRoYXQgd2lsbCB1cGRhdGUgZG9tXG5hZGRUYXNrKCk7XG5cblxuLy8gIGNvbnN0IGFkZFRhc2sgPSAoKSA9PiBwcm9qZWN0LnB1c2goXCJ0ZXN0XCIpO1xufVxuXG5leHBvcnQge25ld1Rhc2t9XG5cbi8vd2FudCB0byBhZGQgdGFzayB0byB0aGUgZG9tXG4vL3dhbnQgdGhpcyB0byBiZSB0aWVkIHRvIHRoZSBjdXJyZW50IHByb2plY3QgZGlzcGxheSBhcnJheVxuLy9kZWZhdWx0IHByb2plY3QgYnkgZGVmYXVsdCIsIi8vd2FudCB0aGlzIHRvIGJlIHJ1biBhbnkgdGltZSBhIHByb2plY3QgbmFtZSBpcyBjbGlja2VkLCBjaGFuZ2VzIHRoZSBhcnJheSB0byB3aGF0ZXZlciBpcyBjbGlja2VkXG4vL2FuZCBmaWxscyBpbiB0aGUgdG8gZG8gYXJlYSB3aXRoIHRoZSB0YXNrcyBpbiB0aGF0IGFycmF5XG5cblxuLy9hZGRlZCBhcyBldmVudCBsaXN0bmVyIG9uIG5ldyBwcm9qZWN0IChoMikgY2xpY2tcblxuZnVuY3Rpb24gc2VsZWN0UHJvamVjdChwcm9qZWN0KXtcbi8vaGF2ZSB0aGlzIGZ1bmN0aW9uIHVwZGF0ZSBtYWluIHRhc2sgYXJlYSB3aXRoIGNvbnRlbnRzIG9mIHByb2plY3QgYXJyYXlcblxuLy9yZXR1cm4gdGhlIHByb2plY3QgbmFtZSB0byB0YXNrZmFjdG9yeVxucmV0dXJuIHByb2plY3Q7XG59XG5cbmV4cG9ydCB7c2VsZWN0UHJvamVjdH0iLCJpbXBvcnQgeyBzZWxlY3RQcm9qZWN0IH0gZnJvbSBcIi4vdXBkYXRlUHJvamVjdEFycmF5XCI7XG5cbmZ1bmN0aW9uIHVwZGF0ZVByb2plY3RET00ocHJvamVjdCl7XG4gICAgbGV0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0c0Rpc3BsYXlcIik7XG4gICAgbGV0IG5ld2gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIG5ld2gyLmlubmVyVGV4dCA9IHByb2plY3Q7XG4gICAgbmV3aDIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgcHJvamVjdCk7XG4gICAgLy8gbmV3aDIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGVjdFByb2plY3QocHJvamVjdCkpXG4gICAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQobmV3aDIpO1xufVxuXG5leHBvcnQge3VwZGF0ZVByb2plY3RET019IiwiaW1wb3J0IHsgY2xvc2VUYXNrRm9ybSB9IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XG5cbmxldCB0YXNrTnVtYmVyID0gMDtcblxuZnVuY3Rpb24gYWRkVGFzaygpe1xuICAgIGxldCB0YXNrdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpdGxlXCIpLnZhbHVlO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRGVzY3JpcHRpb25cIikudmFsdWU7XG4gICAgbGV0IGR1ZWRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZVwiKS52YWx1ZTtcbiAgICBsZXQgdGFza3ByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcbiAgICBcbiAgICBsZXQgdGFza0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5EaXNwbGF5XCIpO1xuICAgIGxldCBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgIG5ld0Rpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZGl2JHt0YXNrTnVtYmVyfWApO1xuXG4gICAgbmV3RGl2LmlubmVySFRNTCA9IFxuICAgIGA8aDM+JHt0YXNrdGl0bGV9PC9oMz5cbiAgICA8cD4ke2Rlc2NyaXB0aW9ufTwvcD5cbiAgICA8cD5EdWU6ICR7ZHVlZGF0ZX08L3A+XG4gICAgPHA+UHJpb3JpdHk6ICR7dGFza3ByaW9yaXR5fTwvcD5gXG5cbiAgICB0YXNrQXJlYS5hcHBlbmRDaGlsZChuZXdEaXYpO1xuICAgIHRhc2tOdW1iZXIrKztcbiAgICBjbG9zZVRhc2tGb3JtKCk7XG59XG5cbmV4cG9ydCB7YWRkVGFza30iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuXG5pbXBvcnQgeyB1cGRhdGVQcm9qZWN0RE9NIH0gZnJvbSBcIi4vdXBkYXRlUHJvamVjdERPTVwiO1xuaW1wb3J0IHsgaW5pdGlhbGV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vZXZlbnRsaXN0ZW5lcnNcIjtcblxuaW5pdGlhbGV2ZW50TGlzdGVuZXJzKCk7XG51cGRhdGVQcm9qZWN0RE9NKFwiZGVmYXVsdFwiKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=