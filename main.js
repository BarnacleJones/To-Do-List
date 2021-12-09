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
/* harmony import */ var _removeTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./removeTask */ "./src/removeTask.js");




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
    else if (target === "deleteButton") (0,_removeTask__WEBPACK_IMPORTED_MODULE_1__.deleteTask)(e.target);
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

    function removeTask(e){
        projectArray.pop(e.target.id)
       
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

    return {putOnPage, addTask, name, projectArray, populateChosenProjectDOM, removeTask}
    }
    






/***/ }),

/***/ "./src/removeTask.js":
/*!***************************!*\
  !*** ./src/removeTask.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteTask": () => (/* binding */ deleteTask)
/* harmony export */ });
//this will remove task when completed from the task list and update display
//could separate this in to two - one when its completed, one when its deleted
// import { projectFactory } from "./projectFactory";
// import { taskFactory } from "./taskFactory";

//function to delete task
function deleteTask(e) {
    console.log("works");
    console.log(e)
    
    //what to do..
     
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
    <button class="deleteButton" id="${taskNumber}"> Delete Task </button>`

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bmVycy5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9wcm9qZWN0RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9yZW1vdmVUYXNrLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Rhc2tGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3VwZGF0ZVByb2plY3RET00uanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlVGFza0RPTS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVByb2plY3QsIHNlbGVjdFByb2plY3QsIGFkZFRhc2tUb1Byb2plY3R9IGZyb20gXCIuL3Byb2plY3RGYWN0b3J5XCI7XHJcbmltcG9ydCB7IGRlbGV0ZVRhc2sgfSBmcm9tIFwiLi9yZW1vdmVUYXNrXCI7XHJcblxyXG5cclxuZnVuY3Rpb24gc2hvd1Rhc2tGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtQXJlYVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmhlcml0XCI7fVxyXG5mdW5jdGlvbiBzaG93UHJvamVjdEZvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImluaGVyaXRcIjt9XHJcbmZ1bmN0aW9uIGNsb3NlVGFza0Zvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1BcmVhXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9XHJcbmZ1bmN0aW9uIGNsb3NlUHJvamVjdEZvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxldmVudExpc3RlbmVycygpe1xyXG4vL2V2ZW50IGxpc3RlbmVycyBmb3IgbmF2aWdhdGlvblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0LmNsYXNzTmFtZTtcclxuICAgICAgICBcclxuICAgIGlmICh0YXJnZXQgPT09IFwiYWRkVGFza1wiKSBzaG93VGFza0Zvcm0oKTtcclxuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJjbG9zZVRhc2tcIikgY2xvc2VUYXNrRm9ybSgpO1xyXG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcImFkZFByb2plY3RcIikgc2hvd1Byb2plY3RGb3JtKCk7XHJcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiY2xvc2VQcm9qZWN0XCIpIGNsb3NlUHJvamVjdEZvcm0oKTsgXHJcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwic3VibWl0UHJvamVjdFwiKSAgY3JlYXRlUHJvamVjdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RUaXRsZVwiKS52YWx1ZSk7IFxyXG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInN1Ym1pdFRhc2tcIikgIGFkZFRhc2tUb1Byb2plY3QoKTtcclxuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJwcm9qZWN0VGl0bGVcIikgc2VsZWN0UHJvamVjdChlKTtcclxuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJkZWxldGVCdXR0b25cIikgZGVsZXRlVGFzayhlLnRhcmdldCk7XHJcbn0pXHJcbn1cclxuZXhwb3J0IHtpbml0aWFsZXZlbnRMaXN0ZW5lcnMsIGNsb3NlVGFza0Zvcm0sIGNsb3NlUHJvamVjdEZvcm19IiwiaW1wb3J0IHsgdXBkYXRlUHJvamVjdERPTSB9IGZyb20gXCIuL3VwZGF0ZVByb2plY3RET01cIjtcclxuaW1wb3J0IHtjbG9zZVByb2plY3RGb3JtfSBmcm9tIFwiLi9ldmVudGxpc3RlbmVyc1wiO1xyXG5pbXBvcnQge3Rhc2tGYWN0b3J5fSBmcm9tIFwiLi90YXNrRmFjdG9yeVwiO1xyXG5cclxuLy92YXJpYWJsZXNcclxubGV0IGFsbFByb2plY3RzQXJyYXkgPSBbXTtcclxubGV0IGN1cnJlbnRwcm9qZWN0ID0gMDtcclxubGV0IHByb2plY3RBcnJheWNvdW50ZXIgPSAwXHJcblxyXG4vL2NyZWF0ZXMgbmV3IHByb2plY3QgaW4gYWxscHJvamVjdHNhcnJheSwgcHV0cyBpdCBvbiB0aGUgcGFnZSAtIGNhbGxlZCBmcm9tIGV2ZW50IGxpc3RlbmVyc1xyXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpeyAgICBcclxuICAgIGFsbFByb2plY3RzQXJyYXlbcHJvamVjdEFycmF5Y291bnRlcl0gPSBwcm9qZWN0RmFjdG9yeShuYW1lKSAgICBcclxuICAgIGFsbFByb2plY3RzQXJyYXlbcHJvamVjdEFycmF5Y291bnRlcl0ucHV0T25QYWdlKCk7XHJcbiAgICBjbG9zZVByb2plY3RGb3JtKCk7XHJcbiAgICBwcm9qZWN0QXJyYXljb3VudGVyKys7XHJcbn1cclxuXHJcbi8vZGVmYXVsdCBwcm9qZWN0IGlzIGhpZ2hsaWdodGVkIHdoZW4gcHJvamVjdCBzdGFydHNcclxuZnVuY3Rpb24gaW5pdGlhbFByb2plY3QoKXtcclxuICAgIGxldCBzdGFydGluZ1Byb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlZmF1bHRcIik7XHJcbiAgICBzdGFydGluZ1Byb2plY3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyZWVuXCI7XHJcbn1cclxuXHJcblxyXG4vL3NlbGVjdHMgdGhlIHByb2plY3Qgd2hlbiBwcm9qZWN0IG5hbWUgaXMgY2xpY2tlZFxyXG4vL2ZpbGxzIHRoZSBhcmVhIHdpdGgganVzdCB0YXNrcyBvZiB0aGUgcHJvamVjdFxyXG5mdW5jdGlvbiBzZWxlY3RQcm9qZWN0KGUpeyAgICBcclxuXHJcbiAgICAvL3RoZSBjb2xvdXIgdG8gY2hhbmdlIHRvIGdyZXkgZm9yIGFsbCBwcm9qZWN0IG5hbWVzXHJcbiAgICBsZXQgYWxsUHJvamVjdEVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInByb2plY3RUaXRsZVwiKTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhbGxQcm9qZWN0RWxlbWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGFsbFByb2plY3RFbGVtZW50c1tpbmRleF07XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIjsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgLy9qdXN0IGNvbG91ciBpbiB0aGUgc2VsZWN0ZWQgZWxlbWVudFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmVlblwiO1xyXG4gICAgLy9nbyB0aHJvdWdoIGFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXkgaG9sZGluZyBhbGwgdGhlIHByb2plY3RzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFByb2plY3RzQXJyYXkubGVuZ3RoOyBpKyspIFxyXG4gICAgICAgIHsgIC8vaWYgdGhlIG5hbWUgb2YgZWxlbWVudCBhbmQgdGFyZ2V0IElEIGFyZSB0aGUgc2FtZSwgdGhhdCBkZXRlcm1pbmVzIHRoZSBjdXJyZW50IHByb2plY3Qgc2VsZWN0ZWRcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSBhbGxQcm9qZWN0c0FycmF5W2ldLm5hbWUpIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudHByb2plY3QgPSBpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcmVkcmF3IHByb2plY3RzIGFycmF5IG9uIHRoZSBwYWdlICBcclxuICAgIGFsbFByb2plY3RzQXJyYXlbY3VycmVudHByb2plY3RdLnBvcHVsYXRlQ2hvc2VuUHJvamVjdERPTSgpOyAgICBcclxufVxyXG5cclxuLy9hZGRzIGEgdGFzayB0byBjdXJyZW50IHNlbGVjdGVkIHByb2plY3QgLSBjYWxsZWQgZnJvbSBldmVudCBsaXN0ZW5lcnNcclxuXHJcbmZ1bmN0aW9uIGFkZFRhc2tUb1Byb2plY3QoKXtcclxuICAgIGFsbFByb2plY3RzQXJyYXlbY3VycmVudHByb2plY3RdLmFkZFRhc2soKTtcclxufVxyXG5cclxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAoc3VwcGxpZWROYW1lKSA9PiB7XHJcbiAgICBcclxuICAgIC8vc28gaSBjYW4gc2VlIHdoYXRzIGdvaW5nIG9uIGluIGxvZ3NcclxuICAgIGxldCBuYW1lID0gc3VwcGxpZWROYW1lO1xyXG5cclxuICAgIC8vY3JlYXRlIGFycmF5IGZvciB0aGlzIHByb2plY3RcclxuICAgIGxldCBwcm9qZWN0QXJyYXkgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBwdXRPblBhZ2UoKXsgICAgICAgIFxyXG4gICAgICAgIHVwZGF0ZVByb2plY3RET00oc3VwcGxpZWROYW1lKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gYWRkVGFzaygpe1xyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgdGFzaywgcHVzaCB0byBhcnJheVxyXG4gICAgICAgIGNvbnN0IHRhc2sgPSB0YXNrRmFjdG9yeSgpO1xyXG4gICAgICAgIC8vIHRhc2suY3JlYXRlVGFzaygpO1xyXG4gICAgICAgIHRhc2sucG9wdWxhdGVUYXNrc0ZvclByb2plY3QoKTtcclxuICAgICAgICBwcm9qZWN0QXJyYXkucHVzaCh0YXNrKTsgICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RBcnJheSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVUYXNrKGUpe1xyXG4gICAgICAgIHByb2plY3RBcnJheS5wb3AoZS50YXJnZXQuaWQpXHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAgICAgLy9yZWRyYXcgcHJvamVjdHNEaXNwbGF5IHdpdGggZWxlbWVudHMgb2YgdGhlIHByb2plY3QgZXZlcnkgdGltZSBhIHByb2plY3QgaXMgY2xpY2tlZFxyXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVDaG9zZW5Qcm9qZWN0RE9NKCl7XHJcbiAgICAgICAgbGV0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRGlzcGxheUlubmVyXCIpO1xyXG4gICAgICAgIGRpc3BsYXlBcmVhLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHByb2plY3RBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHByb2plY3RBcnJheVtpbmRleF07XHJcbiAgICAgICAgICAgIGVsZW1lbnQucG9wdWxhdGVUYXNrc0ZvclByb2plY3QoKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtwdXRPblBhZ2UsIGFkZFRhc2ssIG5hbWUsIHByb2plY3RBcnJheSwgcG9wdWxhdGVDaG9zZW5Qcm9qZWN0RE9NLCByZW1vdmVUYXNrfVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG5cclxuZXhwb3J0IHtjcmVhdGVQcm9qZWN0LCBwcm9qZWN0RmFjdG9yeSwgc2VsZWN0UHJvamVjdCwgYWRkVGFza1RvUHJvamVjdCwgaW5pdGlhbFByb2plY3R9XHJcblxyXG4iLCIvL3RoaXMgd2lsbCByZW1vdmUgdGFzayB3aGVuIGNvbXBsZXRlZCBmcm9tIHRoZSB0YXNrIGxpc3QgYW5kIHVwZGF0ZSBkaXNwbGF5XHJcbi8vY291bGQgc2VwYXJhdGUgdGhpcyBpbiB0byB0d28gLSBvbmUgd2hlbiBpdHMgY29tcGxldGVkLCBvbmUgd2hlbiBpdHMgZGVsZXRlZFxyXG4vLyBpbXBvcnQgeyBwcm9qZWN0RmFjdG9yeSB9IGZyb20gXCIuL3Byb2plY3RGYWN0b3J5XCI7XHJcbi8vIGltcG9ydCB7IHRhc2tGYWN0b3J5IH0gZnJvbSBcIi4vdGFza0ZhY3RvcnlcIjtcclxuXHJcbi8vZnVuY3Rpb24gdG8gZGVsZXRlIHRhc2tcclxuZnVuY3Rpb24gZGVsZXRlVGFzayhlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIndvcmtzXCIpO1xyXG4gICAgY29uc29sZS5sb2coZSlcclxuICAgIFxyXG4gICAgLy93aGF0IHRvIGRvLi5cclxuICAgICBcclxufVxyXG5cclxuZXhwb3J0IHtkZWxldGVUYXNrfTsiLCJpbXBvcnQge2FkZFRhc2tUb0RPTX0gZnJvbSBcIi4vdXBkYXRlVGFza0RPTVwiO1xyXG5cclxuXHJcbmNvbnN0IHRhc2tGYWN0b3J5ID0gKCkgPT57XHJcblxyXG4gICAgbGV0IHRhc2t0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIikudmFsdWU7XHJcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkRlc2NyaXB0aW9uXCIpLnZhbHVlO1xyXG4gICAgbGV0IGR1ZWRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZVwiKS52YWx1ZTtcclxuICAgIGxldCB0YXNrcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVGFza3NGb3JQcm9qZWN0KCl7XHJcblxyXG4gICAgICAgIGFkZFRhc2tUb0RPTSh0YXNrdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVkYXRlLCB0YXNrcHJpb3JpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybntwb3B1bGF0ZVRhc2tzRm9yUHJvamVjdH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQge3Rhc2tGYWN0b3J5fSIsIi8vdGhpcyBmdW5jdGlvbiBpcyBzb2xlbHkgZ2V0dGluZyB0aGUgbmFtZSBvZiB0aGUgcHJvamVjdCBhbmQgYWRkaW5nIGl0IHRvIHRoZSBkb21cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVByb2plY3RET00ocHJvamVjdCl7XHJcbiAgICBsZXQgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzRGlzcGxheVwiKTtcclxuICAgIGxldCBuZXdoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgIG5ld2gyLmlubmVyVGV4dCA9IHByb2plY3Q7XHJcbiAgICBuZXdoMi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByb2plY3RUaXRsZVwiKTtcclxuICAgIG5ld2gyLnNldEF0dHJpYnV0ZShcImlkXCIsIHByb2plY3QpO1xyXG4gICAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQobmV3aDIpO1xyXG59XHJcblxyXG5leHBvcnQge3VwZGF0ZVByb2plY3RET019IiwiaW1wb3J0IHsgY2xvc2VUYXNrRm9ybSB9IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XHJcblxyXG4vL3RoaXMgZnVuY3Rpb24gaXMgZ2V0dGluZyB2YWx1ZXMgZnJvbSB0YXNrIGZvcm0gXHJcbi8vYW5kIGFwcGVuZGluZyB0aGUgdGFzayB0byB0aGUgZG9tXHJcblxyXG5sZXQgdGFza051bWJlciA9IDA7XHJcblxyXG5mdW5jdGlvbiBhZGRUYXNrVG9ET00odGFza3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlZGF0ZSwgdGFza3ByaW9yaXR5KXtcclxuICAgIFxyXG4gICAgbGV0IHRhc2tBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRGlzcGxheUlubmVyXCIpO1xyXG4gICAgbGV0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XHJcbiAgICBuZXdEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7dGFza051bWJlcn1gKTtcclxuXHJcbiAgICBuZXdEaXYuaW5uZXJIVE1MID0gXHJcbiAgICBgPGgzPiR7dGFza3RpdGxlfTwvaDM+XHJcbiAgICA8cD4ke2Rlc2NyaXB0aW9ufTwvcD5cclxuICAgIDxwPkR1ZTogJHtkdWVkYXRlfTwvcD5cclxuICAgIDxwPlByaW9yaXR5OiAke3Rhc2twcmlvcml0eX08L3A+ICAgIFxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZUJ1dHRvblwiIGlkPVwiJHt0YXNrTnVtYmVyfVwiPiBEZWxldGUgVGFzayA8L2J1dHRvbj5gXHJcblxyXG4gICAgdGFza0FyZWEuYXBwZW5kQ2hpbGQobmV3RGl2KTtcclxuICAgIHRhc2tOdW1iZXIrKztcclxuICAgIGNsb3NlVGFza0Zvcm0oKTsgICAgXHJcbn1cclxuXHJcbmV4cG9ydCB7YWRkVGFza1RvRE9NfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgaW5pdGlhbFByb2plY3QgfSBmcm9tIFwiLi9wcm9qZWN0RmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBpbml0aWFsZXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9ldmVudGxpc3RlbmVyc1wiO1xyXG5cclxuaW5pdGlhbGV2ZW50TGlzdGVuZXJzKCk7XHJcbmNyZWF0ZVByb2plY3QoXCJkZWZhdWx0XCIpO1xyXG5pbml0aWFsUHJvamVjdCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=