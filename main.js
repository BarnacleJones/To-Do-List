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
    else if (target === "submitTask")  (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.addTaskToProject)();
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
/* harmony export */   "selectProject": () => (/* binding */ selectProject),
/* harmony export */   "addTaskToProject": () => (/* binding */ addTaskToProject),
/* harmony export */   "initialProject": () => (/* binding */ initialProject)
/* harmony export */ });
/* harmony import */ var _updateProjectDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateProjectDOM */ "./src/updateProjectDOM.js");
/* harmony import */ var _eventlisteners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventlisteners */ "./src/eventlisteners.js");
/* harmony import */ var _taskFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./taskFactory */ "./src/taskFactory.js");




//variables
let allProjectsArray = [];
let currentproject = 0;
let projectArraycounter = 0
let testVariable = true;
//test to see if git is working on new PC

//creates new project in allprojectsarray, puts it on the page - called from event listeners
function createProject(name){    
    allProjectsArray[projectArraycounter] = projectFactory(name)    
    allProjectsArray[projectArraycounter].putOnPage();
    (0,_eventlisteners__WEBPACK_IMPORTED_MODULE_1__.closeProjectForm)();   
    projectArraycounter++; 
}

//default project is highlighted when project starts
function initialProject(){
    let startingProject = document.getElementById("default");
    startingProject.style.backgroundColor = "lightgreen";
}


//selects the project when project name is clicked
//fills the area with just tasks of the project
function selectProject(e){    

    //the colour to change to grey for all project names
    let allProjectElements = document.getElementsByClassName("projectTitle");
    for (let index = 0; index < allProjectElements.length; index++) {
        const element = allProjectElements[index];
        element.style.backgroundColor = "grey";        
    }
    //just colour in the selected element
    document.getElementById(e.target.id).style.backgroundColor = "lightgreen";
    //go through all elements of the array holding all the projects
    for (let i = 0; i < allProjectsArray.length; i++) 
        {  //if the name of element and target ID are the same, that determines the current project selected
            if (e.target.id === allProjectsArray[i].name) 
                {
                currentproject = i;                
                }
            
        }
        //redraw projects array on the page  
    allProjectsArray[currentproject].populateChosenProjectDOM();    
}

//adds a task to current selected project - called from event listeners

function addTaskToProject(){
    allProjectsArray[currentproject].addTask();
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
        // create the task, push to array
        const task = (0,_taskFactory__WEBPACK_IMPORTED_MODULE_2__.taskFactory)();
        // task.createTask();
        task.populateTasksForProject();
        projectArray.push(task);        
        console.log(projectArray)
    }

        //redraw projectsDisplay with elements of the project every time a project is clicked
    function populateChosenProjectDOM(){
        let displayArea = document.getElementById("mainDisplayInner");
        displayArea.innerHTML = "";
        for (let index = 0; index < projectArray.length; index++) {
            const element = projectArray[index];
            element.populateTasksForProject();                
        }
    
    }

    return {putOnPage, addTask, name, projectArray, populateChosenProjectDOM}
    }
    






/***/ }),

/***/ "./src/taskFactory.js":
/*!****************************!*\
  !*** ./src/taskFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "taskFactory": () => (/* binding */ taskFactory)
/* harmony export */ });
/* harmony import */ var _updateTaskDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateTaskDOM */ "./src/updateTaskDOM.js");



const taskFactory = () =>{

    let tasktitle = document.getElementById("title").value;
    let description = document.getElementById("Description").value;
    let duedate = document.getElementById("due").value;
    let taskpriority = document.getElementById("priority").value;

    function populateTasksForProject(){

        (0,_updateTaskDOM__WEBPACK_IMPORTED_MODULE_0__.addTaskToDOM)(tasktitle, description, duedate, taskpriority);
    }

    return{populateTasksForProject}


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


//this function is getting values from task form 
//and appending the task to the dom

let taskNumber = 0;

function addTaskToDOM(tasktitle, description, duedate, taskpriority){
    
    let taskArea = document.getElementById("mainDisplayInner");
    let newDiv = document.createElement("DIV");
    newDiv.setAttribute("id", `${taskNumber}`);

    newDiv.innerHTML = 
    `<h3>${tasktitle}</h3>
    <p>${description}</p>
    <p>Due: ${duedate}</p>
    <p>Priority: ${taskpriority}</p>
    <button id="deleteButton> Delete Task </button>`

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
(0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.initialProject)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFpRjtBQUNqRjtBQUNBLHdCQUF3QjtBQUN4QiwyQkFBMkI7QUFDM0IseUJBQXlCO0FBQ3pCLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsOERBQWE7QUFDdkQsdUNBQXVDLGlFQUFnQjtBQUN2RCx3Q0FBd0MsOERBQWE7QUFDckQsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJzRDtBQUNKO0FBQ1I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpRUFBZ0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsbUNBQW1DO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw2QkFBNkI7QUFDakQsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtRUFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIseURBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNkJBQTZCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUN1RjtBQUN2Rjs7Ozs7Ozs7Ozs7Ozs7OztBQy9GNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNERBQVk7QUFDcEI7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsV0FBVztBQUM1QztBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFNBQVMsWUFBWTtBQUNyQixjQUFjLFFBQVE7QUFDdEIsbUJBQW1CLGFBQWE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDhEQUFhO0FBQ2pCO0FBQ0E7Ozs7Ozs7VUN4QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOaUU7QUFDUjtBQUN6RDtBQUNBLHNFQUFxQjtBQUNyQiw4REFBYTtBQUNiLCtEQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvZXZlbnRsaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcHJvamVjdEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdGFza0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlUHJvamVjdERPTS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy91cGRhdGVUYXNrRE9NLmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgc2VsZWN0UHJvamVjdCwgYWRkVGFza1RvUHJvamVjdH0gZnJvbSBcIi4vcHJvamVjdEZhY3RvcnlcIjtcclxuXHJcbmZ1bmN0aW9uIHNob3dUYXNrRm9ybSgpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybUFyZWFcIikuc3R5bGUuZGlzcGxheSA9IFwiaW5oZXJpdFwiO31cclxuZnVuY3Rpb24gc2hvd1Byb2plY3RGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0Rm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmhlcml0XCI7fVxyXG5mdW5jdGlvbiBjbG9zZVRhc2tGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtQXJlYVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7fVxyXG5mdW5jdGlvbiBjbG9zZVByb2plY3RGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0Rm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7fVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0aWFsZXZlbnRMaXN0ZW5lcnMoKXtcclxuLy9ldmVudCBsaXN0ZW5lcnMgZm9yIG5hdmlnYXRpb25cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc05hbWU7XHJcbiAgICAgICAgXHJcbiAgICBpZiAodGFyZ2V0ID09PSBcImFkZFRhc2tcIikgc2hvd1Rhc2tGb3JtKCk7XHJcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiY2xvc2VUYXNrXCIpIGNsb3NlVGFza0Zvcm0oKTtcclxuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJhZGRQcm9qZWN0XCIpIHNob3dQcm9qZWN0Rm9ybSgpO1xyXG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcImNsb3NlUHJvamVjdFwiKSBjbG9zZVByb2plY3RGb3JtKCk7IFxyXG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInN1Ym1pdFByb2plY3RcIikgIGNyZWF0ZVByb2plY3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0VGl0bGVcIikudmFsdWUpOyBcclxuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJzdWJtaXRUYXNrXCIpICBhZGRUYXNrVG9Qcm9qZWN0KCk7XHJcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwicHJvamVjdFRpdGxlXCIpIHNlbGVjdFByb2plY3QoZSk7XHJcbn0pXHJcbn1cclxuZXhwb3J0IHtpbml0aWFsZXZlbnRMaXN0ZW5lcnMsIGNsb3NlVGFza0Zvcm0sIGNsb3NlUHJvamVjdEZvcm19IiwiaW1wb3J0IHsgdXBkYXRlUHJvamVjdERPTSB9IGZyb20gXCIuL3VwZGF0ZVByb2plY3RET01cIjtcclxuaW1wb3J0IHtjbG9zZVByb2plY3RGb3JtfSBmcm9tIFwiLi9ldmVudGxpc3RlbmVyc1wiO1xyXG5pbXBvcnQge3Rhc2tGYWN0b3J5fSBmcm9tIFwiLi90YXNrRmFjdG9yeVwiO1xyXG5cclxuLy92YXJpYWJsZXNcclxubGV0IGFsbFByb2plY3RzQXJyYXkgPSBbXTtcclxubGV0IGN1cnJlbnRwcm9qZWN0ID0gMDtcclxubGV0IHByb2plY3RBcnJheWNvdW50ZXIgPSAwXHJcbmxldCB0ZXN0VmFyaWFibGUgPSB0cnVlO1xyXG4vL3Rlc3QgdG8gc2VlIGlmIGdpdCBpcyB3b3JraW5nIG9uIG5ldyBQQ1xyXG5cclxuLy9jcmVhdGVzIG5ldyBwcm9qZWN0IGluIGFsbHByb2plY3RzYXJyYXksIHB1dHMgaXQgb24gdGhlIHBhZ2UgLSBjYWxsZWQgZnJvbSBldmVudCBsaXN0ZW5lcnNcclxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lKXsgICAgXHJcbiAgICBhbGxQcm9qZWN0c0FycmF5W3Byb2plY3RBcnJheWNvdW50ZXJdID0gcHJvamVjdEZhY3RvcnkobmFtZSkgICAgXHJcbiAgICBhbGxQcm9qZWN0c0FycmF5W3Byb2plY3RBcnJheWNvdW50ZXJdLnB1dE9uUGFnZSgpO1xyXG4gICAgY2xvc2VQcm9qZWN0Rm9ybSgpOyAgIFxyXG4gICAgcHJvamVjdEFycmF5Y291bnRlcisrOyBcclxufVxyXG5cclxuLy9kZWZhdWx0IHByb2plY3QgaXMgaGlnaGxpZ2h0ZWQgd2hlbiBwcm9qZWN0IHN0YXJ0c1xyXG5mdW5jdGlvbiBpbml0aWFsUHJvamVjdCgpe1xyXG4gICAgbGV0IHN0YXJ0aW5nUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVmYXVsdFwiKTtcclxuICAgIHN0YXJ0aW5nUHJvamVjdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Z3JlZW5cIjtcclxufVxyXG5cclxuXHJcbi8vc2VsZWN0cyB0aGUgcHJvamVjdCB3aGVuIHByb2plY3QgbmFtZSBpcyBjbGlja2VkXHJcbi8vZmlsbHMgdGhlIGFyZWEgd2l0aCBqdXN0IHRhc2tzIG9mIHRoZSBwcm9qZWN0XHJcbmZ1bmN0aW9uIHNlbGVjdFByb2plY3QoZSl7ICAgIFxyXG5cclxuICAgIC8vdGhlIGNvbG91ciB0byBjaGFuZ2UgdG8gZ3JleSBmb3IgYWxsIHByb2plY3QgbmFtZXNcclxuICAgIGxldCBhbGxQcm9qZWN0RWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdFRpdGxlXCIpO1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFsbFByb2plY3RFbGVtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gYWxsUHJvamVjdEVsZW1lbnRzW2luZGV4XTtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiOyAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvL2p1c3QgY29sb3VyIGluIHRoZSBzZWxlY3RlZCBlbGVtZW50XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyZWVuXCI7XHJcbiAgICAvL2dvIHRocm91Z2ggYWxsIGVsZW1lbnRzIG9mIHRoZSBhcnJheSBob2xkaW5nIGFsbCB0aGUgcHJvamVjdHNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUHJvamVjdHNBcnJheS5sZW5ndGg7IGkrKykgXHJcbiAgICAgICAgeyAgLy9pZiB0aGUgbmFtZSBvZiBlbGVtZW50IGFuZCB0YXJnZXQgSUQgYXJlIHRoZSBzYW1lLCB0aGF0IGRldGVybWluZXMgdGhlIGN1cnJlbnQgcHJvamVjdCBzZWxlY3RlZFxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09IGFsbFByb2plY3RzQXJyYXlbaV0ubmFtZSkgXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50cHJvamVjdCA9IGk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9yZWRyYXcgcHJvamVjdHMgYXJyYXkgb24gdGhlIHBhZ2UgIFxyXG4gICAgYWxsUHJvamVjdHNBcnJheVtjdXJyZW50cHJvamVjdF0ucG9wdWxhdGVDaG9zZW5Qcm9qZWN0RE9NKCk7ICAgIFxyXG59XHJcblxyXG4vL2FkZHMgYSB0YXNrIHRvIGN1cnJlbnQgc2VsZWN0ZWQgcHJvamVjdCAtIGNhbGxlZCBmcm9tIGV2ZW50IGxpc3RlbmVyc1xyXG5cclxuZnVuY3Rpb24gYWRkVGFza1RvUHJvamVjdCgpe1xyXG4gICAgYWxsUHJvamVjdHNBcnJheVtjdXJyZW50cHJvamVjdF0uYWRkVGFzaygpO1xyXG59XHJcblxyXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9IChzdXBwbGllZE5hbWUpID0+IHtcclxuICAgIFxyXG4gICAgLy9zbyBpIGNhbiBzZWUgd2hhdHMgZ29pbmcgb24gaW4gbG9nc1xyXG4gICAgbGV0IG5hbWUgPSBzdXBwbGllZE5hbWU7XHJcblxyXG4gICAgLy9jcmVhdGUgYXJyYXkgZm9yIHRoaXMgcHJvamVjdFxyXG4gICAgbGV0IHByb2plY3RBcnJheSA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHB1dE9uUGFnZSgpeyAgICAgICAgXHJcbiAgICAgICAgdXBkYXRlUHJvamVjdERPTShzdXBwbGllZE5hbWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBhZGRUYXNrKCl7XHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSB0YXNrLCBwdXNoIHRvIGFycmF5XHJcbiAgICAgICAgY29uc3QgdGFzayA9IHRhc2tGYWN0b3J5KCk7XHJcbiAgICAgICAgLy8gdGFzay5jcmVhdGVUYXNrKCk7XHJcbiAgICAgICAgdGFzay5wb3B1bGF0ZVRhc2tzRm9yUHJvamVjdCgpO1xyXG4gICAgICAgIHByb2plY3RBcnJheS5wdXNoKHRhc2spOyAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdEFycmF5KVxyXG4gICAgfVxyXG5cclxuICAgICAgICAvL3JlZHJhdyBwcm9qZWN0c0Rpc3BsYXkgd2l0aCBlbGVtZW50cyBvZiB0aGUgcHJvamVjdCBldmVyeSB0aW1lIGEgcHJvamVjdCBpcyBjbGlja2VkXHJcbiAgICBmdW5jdGlvbiBwb3B1bGF0ZUNob3NlblByb2plY3RET00oKXtcclxuICAgICAgICBsZXQgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5EaXNwbGF5SW5uZXJcIik7XHJcbiAgICAgICAgZGlzcGxheUFyZWEuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHJvamVjdEFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcHJvamVjdEFycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgZWxlbWVudC5wb3B1bGF0ZVRhc2tzRm9yUHJvamVjdCgpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge3B1dE9uUGFnZSwgYWRkVGFzaywgbmFtZSwgcHJvamVjdEFycmF5LCBwb3B1bGF0ZUNob3NlblByb2plY3RET019XHJcbiAgICB9XHJcbiAgICBcclxuXHJcblxyXG5leHBvcnQge2NyZWF0ZVByb2plY3QsIHByb2plY3RGYWN0b3J5LCBzZWxlY3RQcm9qZWN0LCBhZGRUYXNrVG9Qcm9qZWN0LCBpbml0aWFsUHJvamVjdH1cclxuXHJcbiIsImltcG9ydCB7YWRkVGFza1RvRE9NfSBmcm9tIFwiLi91cGRhdGVUYXNrRE9NXCI7XHJcblxyXG5cclxuY29uc3QgdGFza0ZhY3RvcnkgPSAoKSA9PntcclxuXHJcbiAgICBsZXQgdGFza3RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKS52YWx1ZTtcclxuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRGVzY3JpcHRpb25cIikudmFsdWU7XHJcbiAgICBsZXQgZHVlZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlXCIpLnZhbHVlO1xyXG4gICAgbGV0IHRhc2twcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XHJcblxyXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVUYXNrc0ZvclByb2plY3QoKXtcclxuXHJcbiAgICAgICAgYWRkVGFza1RvRE9NKHRhc2t0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZWRhdGUsIHRhc2twcmlvcml0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJue3BvcHVsYXRlVGFza3NGb3JQcm9qZWN0fVxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7dGFza0ZhY3Rvcnl9IiwiLy90aGlzIGZ1bmN0aW9uIGlzIHNvbGVseSBnZXR0aW5nIHRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0IGFuZCBhZGRpbmcgaXQgdG8gdGhlIGRvbVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdERPTShwcm9qZWN0KXtcclxuICAgIGxldCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHNEaXNwbGF5XCIpO1xyXG4gICAgbGV0IG5ld2gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgbmV3aDIuaW5uZXJUZXh0ID0gcHJvamVjdDtcclxuICAgIG5ld2gyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJvamVjdFRpdGxlXCIpO1xyXG4gICAgbmV3aDIuc2V0QXR0cmlidXRlKFwiaWRcIiwgcHJvamVjdCk7XHJcbiAgICBwcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChuZXdoMik7XHJcbn1cclxuXHJcbmV4cG9ydCB7dXBkYXRlUHJvamVjdERPTX0iLCJpbXBvcnQgeyBjbG9zZVRhc2tGb3JtIH0gZnJvbSBcIi4vZXZlbnRsaXN0ZW5lcnNcIjtcclxuXHJcbi8vdGhpcyBmdW5jdGlvbiBpcyBnZXR0aW5nIHZhbHVlcyBmcm9tIHRhc2sgZm9ybSBcclxuLy9hbmQgYXBwZW5kaW5nIHRoZSB0YXNrIHRvIHRoZSBkb21cclxuXHJcbmxldCB0YXNrTnVtYmVyID0gMDtcclxuXHJcbmZ1bmN0aW9uIGFkZFRhc2tUb0RPTSh0YXNrdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVkYXRlLCB0YXNrcHJpb3JpdHkpe1xyXG4gICAgXHJcbiAgICBsZXQgdGFza0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5EaXNwbGF5SW5uZXJcIik7XHJcbiAgICBsZXQgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcclxuICAgIG5ld0Rpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHt0YXNrTnVtYmVyfWApO1xyXG5cclxuICAgIG5ld0Rpdi5pbm5lckhUTUwgPSBcclxuICAgIGA8aDM+JHt0YXNrdGl0bGV9PC9oMz5cclxuICAgIDxwPiR7ZGVzY3JpcHRpb259PC9wPlxyXG4gICAgPHA+RHVlOiAke2R1ZWRhdGV9PC9wPlxyXG4gICAgPHA+UHJpb3JpdHk6ICR7dGFza3ByaW9yaXR5fTwvcD5cclxuICAgIDxidXR0b24gaWQ9XCJkZWxldGVCdXR0b24+IERlbGV0ZSBUYXNrIDwvYnV0dG9uPmBcclxuXHJcbiAgICB0YXNrQXJlYS5hcHBlbmRDaGlsZChuZXdEaXYpO1xyXG4gICAgdGFza051bWJlcisrO1xyXG4gICAgY2xvc2VUYXNrRm9ybSgpOyAgICBcclxufVxyXG5cclxuZXhwb3J0IHthZGRUYXNrVG9ET019IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVQcm9qZWN0LCBpbml0aWFsUHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3RGYWN0b3J5XCI7XHJcbmltcG9ydCB7IGluaXRpYWxldmVudExpc3RlbmVycyB9IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XHJcblxyXG5pbml0aWFsZXZlbnRMaXN0ZW5lcnMoKTtcclxuY3JlYXRlUHJvamVjdChcImRlZmF1bHRcIik7XHJcbmluaXRpYWxQcm9qZWN0KCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==