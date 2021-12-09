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

// import { deleteTask } from "./removeTask";


function showTaskForm(){document.getElementById("formArea").style.display = "inherit";}
function showProjectForm(){document.getElementById("projectForm").style.display = "inherit";}
function closeTaskForm(){document.getElementById("formArea").style.display = "none";}
function closeProjectForm(){document.getElementById("projectForm").style.display = "none";}



function initialeventListeners(){
//event listeners for navigation
document.addEventListener("click", (e) => {
    const target = e.target.className;
    const buttonID = e.target.id;
    // const buttonID = e;
        
    if (target === "addTask") showTaskForm();
    else if (target === "closeTask") closeTaskForm();
    else if (target === "addProject") showProjectForm();
    else if (target === "closeProject") closeProjectForm(); 
    else if (target === "submitProject")  (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.createProject)(document.getElementById("projectTitle").value); 
    else if (target === "submitTask")  (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.addTaskToProject)();
    else if (target === "projectTitle") (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.selectProject)(e);
    else if (target === "deleteButton") (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(buttonID);
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
/* harmony export */   "initialProject": () => (/* binding */ initialProject),
/* harmony export */   "deleteTask": () => (/* binding */ deleteTask)
/* harmony export */ });
/* harmony import */ var _updateProjectDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateProjectDOM */ "./src/updateProjectDOM.js");
/* harmony import */ var _eventlisteners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventlisteners */ "./src/eventlisteners.js");
/* harmony import */ var _taskFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./taskFactory */ "./src/taskFactory.js");




//variables
let allProjectsArray = [];
let currentproject = 0;
let projectArraycounter = 0;


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

function deleteTask(e){
    allProjectsArray[currentproject].removeTask(e);
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

    let task;
    let taskNumber = 0;
    function addTask(){               
        // create the task, push to array
        task = (0,_taskFactory__WEBPACK_IMPORTED_MODULE_2__.taskFactory)(taskNumber);
        // task.createTask();
        task.populateTasksForProject();
        projectArray.push(task);   
        console.log(task.thistaskNumber)
        taskNumber++;
    }
    
    function removeTask(id){
        
        // console.log("working for now but only removing one element and not correct one")
        // console.log(id)
        console.log("when it is spliced, the old button ID's are not relevant...")
        projectArray.splice(id, 1);
        
        taskNumber = projectArray.length;
        allProjectsArray[currentproject].populateChosenProjectDOM();
        console.log(taskNumber)

        //does this make a difference? try with and without - 
        //what if create a new function in task factory for populating the 
        //project on line 91 that restarts a counter - where else is that function called
        // taskNumber = 0;
    }


        //redraw projectsDisplay with elements of the project every time a project is clicked
    function populateChosenProjectDOM(){
        let displayArea = document.getElementById("mainDisplayInner");
        displayArea.innerHTML = "";
        for (let index = 0; index < projectArray.length; index++) {
            const element = projectArray[index];
            element.populateTasksForProjectAfterRemoval(index);                
        }
    
    }

    return {putOnPage, addTask, name, projectArray, populateChosenProjectDOM, removeTask}
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



const taskFactory = (taskNumber) =>{

    let tasktitle = document.getElementById("title").value;
    let description = document.getElementById("Description").value;
    let duedate = document.getElementById("due").value;
    let taskpriority = document.getElementById("priority").value;
    let thistaskNumber = taskNumber;
    
    
    
    function populateTasksForProject(){
        // taskNumber = 0;
        (0,_updateTaskDOM__WEBPACK_IMPORTED_MODULE_0__.addTaskToDOM)(tasktitle, description, duedate, taskpriority, thistaskNumber);
        
        
    }

    //function for when tasks have been removed
 
    function populateTasksForProjectAfterRemoval(index){        
        (0,_updateTaskDOM__WEBPACK_IMPORTED_MODULE_0__.addTaskToDOM)(tasktitle, description, duedate, taskpriority, index);
        console.log(index)
    }

    return{populateTasksForProject, thistaskNumber, populateTasksForProjectAfterRemoval}
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

// let taskNumber = 0;

function addTaskToDOM(tasktitle, description, duedate, taskpriority, thistaskNumber){
    
    let taskArea = document.getElementById("mainDisplayInner");
    let newDiv = document.createElement("DIV");
    newDiv.setAttribute("id", `${thistaskNumber}`);

    newDiv.innerHTML = 
    `<h3>${tasktitle}</h3>
    <p>${description}</p>
    <p>Due: ${duedate}</p>
    <p>Priority: ${taskpriority}</p>    
    <button class="deleteButton" id="${thistaskNumber}"> Delete Task </button>`

    taskArea.appendChild(newDiv);
    
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUE2RjtBQUM3RixZQUFZLGFBQWE7OztBQUd6Qix3QkFBd0I7QUFDeEIsMkJBQTJCO0FBQzNCLHlCQUF5QjtBQUN6Qiw0QkFBNEI7Ozs7QUFJNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw4REFBYTtBQUN2RCx1Q0FBdUMsaUVBQWdCO0FBQ3ZELHdDQUF3Qyw4REFBYTtBQUNyRCx3Q0FBd0MsMkRBQVU7QUFDbEQsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCc0Q7QUFDSjtBQUNSOztBQUUxQztBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlFQUFnQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLG1DQUFtQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pELFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxtRUFBZ0I7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHlEQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNkJBQTZCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7OztBQUdtRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0SHREOzs7QUFHN0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDREQUFZO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDREQUFZO0FBQ3BCO0FBQ0E7O0FBRUEsV0FBVztBQUNYOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVGlEOztBQUVqRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGVBQWU7O0FBRWhEO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFNBQVMsWUFBWTtBQUNyQixjQUFjLFFBQVE7QUFDdEIsbUJBQW1CLGFBQWE7QUFDaEMsdUNBQXVDLGVBQWU7O0FBRXREO0FBQ0E7QUFDQSxJQUFJLDhEQUFhO0FBQ2pCO0FBQ0E7Ozs7Ozs7O1VDeEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmlFO0FBQ1I7O0FBRXpELHNFQUFxQjtBQUNyQiw4REFBYTtBQUNiLCtEQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvZXZlbnRsaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcHJvamVjdEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdGFza0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlUHJvamVjdERPTS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy91cGRhdGVUYXNrRE9NLmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgc2VsZWN0UHJvamVjdCwgYWRkVGFza1RvUHJvamVjdCwgZGVsZXRlVGFza30gZnJvbSBcIi4vcHJvamVjdEZhY3RvcnlcIjtcbi8vIGltcG9ydCB7IGRlbGV0ZVRhc2sgfSBmcm9tIFwiLi9yZW1vdmVUYXNrXCI7XG5cblxuZnVuY3Rpb24gc2hvd1Rhc2tGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtQXJlYVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmhlcml0XCI7fVxuZnVuY3Rpb24gc2hvd1Byb2plY3RGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0Rm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmhlcml0XCI7fVxuZnVuY3Rpb24gY2xvc2VUYXNrRm9ybSgpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybUFyZWFcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO31cbmZ1bmN0aW9uIGNsb3NlUHJvamVjdEZvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9XG5cblxuXG5mdW5jdGlvbiBpbml0aWFsZXZlbnRMaXN0ZW5lcnMoKXtcbi8vZXZlbnQgbGlzdGVuZXJzIGZvciBuYXZpZ2F0aW9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc05hbWU7XG4gICAgY29uc3QgYnV0dG9uSUQgPSBlLnRhcmdldC5pZDtcbiAgICAvLyBjb25zdCBidXR0b25JRCA9IGU7XG4gICAgICAgIFxuICAgIGlmICh0YXJnZXQgPT09IFwiYWRkVGFza1wiKSBzaG93VGFza0Zvcm0oKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiY2xvc2VUYXNrXCIpIGNsb3NlVGFza0Zvcm0oKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiYWRkUHJvamVjdFwiKSBzaG93UHJvamVjdEZvcm0oKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiY2xvc2VQcm9qZWN0XCIpIGNsb3NlUHJvamVjdEZvcm0oKTsgXG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInN1Ym1pdFByb2plY3RcIikgIGNyZWF0ZVByb2plY3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0VGl0bGVcIikudmFsdWUpOyBcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwic3VibWl0VGFza1wiKSAgYWRkVGFza1RvUHJvamVjdCgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJwcm9qZWN0VGl0bGVcIikgc2VsZWN0UHJvamVjdChlKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiZGVsZXRlQnV0dG9uXCIpIGRlbGV0ZVRhc2soYnV0dG9uSUQpO1xufSlcbn1cbmV4cG9ydCB7aW5pdGlhbGV2ZW50TGlzdGVuZXJzLCBjbG9zZVRhc2tGb3JtLCBjbG9zZVByb2plY3RGb3JtfSIsImltcG9ydCB7IHVwZGF0ZVByb2plY3RET00gfSBmcm9tIFwiLi91cGRhdGVQcm9qZWN0RE9NXCI7XG5pbXBvcnQge2Nsb3NlUHJvamVjdEZvcm19IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XG5pbXBvcnQge3Rhc2tGYWN0b3J5fSBmcm9tIFwiLi90YXNrRmFjdG9yeVwiO1xuXG4vL3ZhcmlhYmxlc1xubGV0IGFsbFByb2plY3RzQXJyYXkgPSBbXTtcbmxldCBjdXJyZW50cHJvamVjdCA9IDA7XG5sZXQgcHJvamVjdEFycmF5Y291bnRlciA9IDA7XG5cblxuLy9jcmVhdGVzIG5ldyBwcm9qZWN0IGluIGFsbHByb2plY3RzYXJyYXksIHB1dHMgaXQgb24gdGhlIHBhZ2UgLSBjYWxsZWQgZnJvbSBldmVudCBsaXN0ZW5lcnNcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSl7ICAgIFxuICAgIGFsbFByb2plY3RzQXJyYXlbcHJvamVjdEFycmF5Y291bnRlcl0gPSBwcm9qZWN0RmFjdG9yeShuYW1lKSAgICBcbiAgICBhbGxQcm9qZWN0c0FycmF5W3Byb2plY3RBcnJheWNvdW50ZXJdLnB1dE9uUGFnZSgpO1xuICAgIGNsb3NlUHJvamVjdEZvcm0oKTtcbiAgICBwcm9qZWN0QXJyYXljb3VudGVyKys7XG59XG5cbi8vZGVmYXVsdCBwcm9qZWN0IGlzIGhpZ2hsaWdodGVkIHdoZW4gcHJvamVjdCBzdGFydHNcbmZ1bmN0aW9uIGluaXRpYWxQcm9qZWN0KCl7XG4gICAgbGV0IHN0YXJ0aW5nUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVmYXVsdFwiKTtcbiAgICBzdGFydGluZ1Byb2plY3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyZWVuXCI7XG59XG5cblxuLy9zZWxlY3RzIHRoZSBwcm9qZWN0IHdoZW4gcHJvamVjdCBuYW1lIGlzIGNsaWNrZWRcbi8vZmlsbHMgdGhlIGFyZWEgd2l0aCBqdXN0IHRhc2tzIG9mIHRoZSBwcm9qZWN0XG5mdW5jdGlvbiBzZWxlY3RQcm9qZWN0KGUpeyAgICBcblxuICAgIC8vdGhlIGNvbG91ciB0byBjaGFuZ2UgdG8gZ3JleSBmb3IgYWxsIHByb2plY3QgbmFtZXNcbiAgICBsZXQgYWxsUHJvamVjdEVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInByb2plY3RUaXRsZVwiKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYWxsUHJvamVjdEVsZW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gYWxsUHJvamVjdEVsZW1lbnRzW2luZGV4XTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIjsgICAgICAgIFxuICAgIH1cbiAgICAvL2p1c3QgY29sb3VyIGluIHRoZSBzZWxlY3RlZCBlbGVtZW50XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmVlblwiO1xuICAgIC8vZ28gdGhyb3VnaCBhbGwgZWxlbWVudHMgb2YgdGhlIGFycmF5IGhvbGRpbmcgYWxsIHRoZSBwcm9qZWN0c1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUHJvamVjdHNBcnJheS5sZW5ndGg7IGkrKykgXG4gICAgICAgIHsgIC8vaWYgdGhlIG5hbWUgb2YgZWxlbWVudCBhbmQgdGFyZ2V0IElEIGFyZSB0aGUgc2FtZSwgdGhhdCBkZXRlcm1pbmVzIHRoZSBjdXJyZW50IHByb2plY3Qgc2VsZWN0ZWRcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gYWxsUHJvamVjdHNBcnJheVtpXS5uYW1lKSBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY3VycmVudHByb2plY3QgPSBpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAvL3JlZHJhdyBwcm9qZWN0cyBhcnJheSBvbiB0aGUgcGFnZSAgXG4gICAgYWxsUHJvamVjdHNBcnJheVtjdXJyZW50cHJvamVjdF0ucG9wdWxhdGVDaG9zZW5Qcm9qZWN0RE9NKCk7ICAgIFxufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrKGUpe1xuICAgIGFsbFByb2plY3RzQXJyYXlbY3VycmVudHByb2plY3RdLnJlbW92ZVRhc2soZSk7XG59XG5cbi8vYWRkcyBhIHRhc2sgdG8gY3VycmVudCBzZWxlY3RlZCBwcm9qZWN0IC0gY2FsbGVkIGZyb20gZXZlbnQgbGlzdGVuZXJzXG5cbmZ1bmN0aW9uIGFkZFRhc2tUb1Byb2plY3QoKXtcbiAgICBhbGxQcm9qZWN0c0FycmF5W2N1cnJlbnRwcm9qZWN0XS5hZGRUYXNrKCk7XG59XG5cbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKHN1cHBsaWVkTmFtZSkgPT4ge1xuICAgIFxuICAgIC8vc28gaSBjYW4gc2VlIHdoYXRzIGdvaW5nIG9uIGluIGxvZ3NcbiAgICBsZXQgbmFtZSA9IHN1cHBsaWVkTmFtZTtcblxuICAgIC8vY3JlYXRlIGFycmF5IGZvciB0aGlzIHByb2plY3RcbiAgICBsZXQgcHJvamVjdEFycmF5ID0gW107XG5cbiAgICBmdW5jdGlvbiBwdXRPblBhZ2UoKXsgICAgICAgIFxuICAgICAgICB1cGRhdGVQcm9qZWN0RE9NKHN1cHBsaWVkTmFtZSk7XG4gICAgfVxuXG4gICAgbGV0IHRhc2s7XG4gICAgbGV0IHRhc2tOdW1iZXIgPSAwO1xuICAgIGZ1bmN0aW9uIGFkZFRhc2soKXsgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gY3JlYXRlIHRoZSB0YXNrLCBwdXNoIHRvIGFycmF5XG4gICAgICAgIHRhc2sgPSB0YXNrRmFjdG9yeSh0YXNrTnVtYmVyKTtcbiAgICAgICAgLy8gdGFzay5jcmVhdGVUYXNrKCk7XG4gICAgICAgIHRhc2sucG9wdWxhdGVUYXNrc0ZvclByb2plY3QoKTtcbiAgICAgICAgcHJvamVjdEFycmF5LnB1c2godGFzayk7ICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHRhc2sudGhpc3Rhc2tOdW1iZXIpXG4gICAgICAgIHRhc2tOdW1iZXIrKztcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gcmVtb3ZlVGFzayhpZCl7XG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIndvcmtpbmcgZm9yIG5vdyBidXQgb25seSByZW1vdmluZyBvbmUgZWxlbWVudCBhbmQgbm90IGNvcnJlY3Qgb25lXCIpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlkKVxuICAgICAgICBjb25zb2xlLmxvZyhcIndoZW4gaXQgaXMgc3BsaWNlZCwgdGhlIG9sZCBidXR0b24gSUQncyBhcmUgbm90IHJlbGV2YW50Li4uXCIpXG4gICAgICAgIHByb2plY3RBcnJheS5zcGxpY2UoaWQsIDEpO1xuICAgICAgICBcbiAgICAgICAgdGFza051bWJlciA9IHByb2plY3RBcnJheS5sZW5ndGg7XG4gICAgICAgIGFsbFByb2plY3RzQXJyYXlbY3VycmVudHByb2plY3RdLnBvcHVsYXRlQ2hvc2VuUHJvamVjdERPTSgpO1xuICAgICAgICBjb25zb2xlLmxvZyh0YXNrTnVtYmVyKVxuXG4gICAgICAgIC8vZG9lcyB0aGlzIG1ha2UgYSBkaWZmZXJlbmNlPyB0cnkgd2l0aCBhbmQgd2l0aG91dCAtIFxuICAgICAgICAvL3doYXQgaWYgY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIGluIHRhc2sgZmFjdG9yeSBmb3IgcG9wdWxhdGluZyB0aGUgXG4gICAgICAgIC8vcHJvamVjdCBvbiBsaW5lIDkxIHRoYXQgcmVzdGFydHMgYSBjb3VudGVyIC0gd2hlcmUgZWxzZSBpcyB0aGF0IGZ1bmN0aW9uIGNhbGxlZFxuICAgICAgICAvLyB0YXNrTnVtYmVyID0gMDtcbiAgICB9XG5cblxuICAgICAgICAvL3JlZHJhdyBwcm9qZWN0c0Rpc3BsYXkgd2l0aCBlbGVtZW50cyBvZiB0aGUgcHJvamVjdCBldmVyeSB0aW1lIGEgcHJvamVjdCBpcyBjbGlja2VkXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVDaG9zZW5Qcm9qZWN0RE9NKCl7XG4gICAgICAgIGxldCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkRpc3BsYXlJbm5lclwiKTtcbiAgICAgICAgZGlzcGxheUFyZWEuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHByb2plY3RBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBwcm9qZWN0QXJyYXlbaW5kZXhdO1xuICAgICAgICAgICAgZWxlbWVudC5wb3B1bGF0ZVRhc2tzRm9yUHJvamVjdEFmdGVyUmVtb3ZhbChpbmRleCk7ICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgXG4gICAgfVxuXG4gICAgcmV0dXJuIHtwdXRPblBhZ2UsIGFkZFRhc2ssIG5hbWUsIHByb2plY3RBcnJheSwgcG9wdWxhdGVDaG9zZW5Qcm9qZWN0RE9NLCByZW1vdmVUYXNrfVxuICAgIH1cbiAgICBcblxuXG5leHBvcnQge2NyZWF0ZVByb2plY3QsIHByb2plY3RGYWN0b3J5LCBzZWxlY3RQcm9qZWN0LCBhZGRUYXNrVG9Qcm9qZWN0LCBpbml0aWFsUHJvamVjdCwgZGVsZXRlVGFza31cblxuIiwiaW1wb3J0IHthZGRUYXNrVG9ET019IGZyb20gXCIuL3VwZGF0ZVRhc2tET01cIjtcblxuXG5jb25zdCB0YXNrRmFjdG9yeSA9ICh0YXNrTnVtYmVyKSA9PntcblxuICAgIGxldCB0YXNrdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpdGxlXCIpLnZhbHVlO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRGVzY3JpcHRpb25cIikudmFsdWU7XG4gICAgbGV0IGR1ZWRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZVwiKS52YWx1ZTtcbiAgICBsZXQgdGFza3ByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcbiAgICBsZXQgdGhpc3Rhc2tOdW1iZXIgPSB0YXNrTnVtYmVyO1xuICAgIFxuICAgIFxuICAgIFxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVGFza3NGb3JQcm9qZWN0KCl7XG4gICAgICAgIC8vIHRhc2tOdW1iZXIgPSAwO1xuICAgICAgICBhZGRUYXNrVG9ET00odGFza3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlZGF0ZSwgdGFza3ByaW9yaXR5LCB0aGlzdGFza051bWJlcik7XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICAvL2Z1bmN0aW9uIGZvciB3aGVuIHRhc2tzIGhhdmUgYmVlbiByZW1vdmVkXG4gXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVUYXNrc0ZvclByb2plY3RBZnRlclJlbW92YWwoaW5kZXgpeyAgICAgICAgXG4gICAgICAgIGFkZFRhc2tUb0RPTSh0YXNrdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVkYXRlLCB0YXNrcHJpb3JpdHksIGluZGV4KTtcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXgpXG4gICAgfVxuXG4gICAgcmV0dXJue3BvcHVsYXRlVGFza3NGb3JQcm9qZWN0LCB0aGlzdGFza051bWJlciwgcG9wdWxhdGVUYXNrc0ZvclByb2plY3RBZnRlclJlbW92YWx9XG59XG5cbmV4cG9ydCB7dGFza0ZhY3Rvcnl9IiwiLy90aGlzIGZ1bmN0aW9uIGlzIHNvbGVseSBnZXR0aW5nIHRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0IGFuZCBhZGRpbmcgaXQgdG8gdGhlIGRvbVxuXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0RE9NKHByb2plY3Qpe1xuICAgIGxldCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdHNEaXNwbGF5XCIpO1xuICAgIGxldCBuZXdoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICBuZXdoMi5pbm5lclRleHQgPSBwcm9qZWN0O1xuICAgIG5ld2gyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJvamVjdFRpdGxlXCIpO1xuICAgIG5ld2gyLnNldEF0dHJpYnV0ZShcImlkXCIsIHByb2plY3QpO1xuICAgIHByb2plY3RBcmVhLmFwcGVuZENoaWxkKG5ld2gyKTtcbn1cblxuZXhwb3J0IHt1cGRhdGVQcm9qZWN0RE9NfSIsImltcG9ydCB7IGNsb3NlVGFza0Zvcm0gfSBmcm9tIFwiLi9ldmVudGxpc3RlbmVyc1wiO1xuXG4vL3RoaXMgZnVuY3Rpb24gaXMgZ2V0dGluZyB2YWx1ZXMgZnJvbSB0YXNrIGZvcm0gXG4vL2FuZCBhcHBlbmRpbmcgdGhlIHRhc2sgdG8gdGhlIGRvbVxuXG4vLyBsZXQgdGFza051bWJlciA9IDA7XG5cbmZ1bmN0aW9uIGFkZFRhc2tUb0RPTSh0YXNrdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVkYXRlLCB0YXNrcHJpb3JpdHksIHRoaXN0YXNrTnVtYmVyKXtcbiAgICBcbiAgICBsZXQgdGFza0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5EaXNwbGF5SW5uZXJcIik7XG4gICAgbGV0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgbmV3RGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3RoaXN0YXNrTnVtYmVyfWApO1xuXG4gICAgbmV3RGl2LmlubmVySFRNTCA9IFxuICAgIGA8aDM+JHt0YXNrdGl0bGV9PC9oMz5cbiAgICA8cD4ke2Rlc2NyaXB0aW9ufTwvcD5cbiAgICA8cD5EdWU6ICR7ZHVlZGF0ZX08L3A+XG4gICAgPHA+UHJpb3JpdHk6ICR7dGFza3ByaW9yaXR5fTwvcD4gICAgXG4gICAgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZUJ1dHRvblwiIGlkPVwiJHt0aGlzdGFza051bWJlcn1cIj4gRGVsZXRlIFRhc2sgPC9idXR0b24+YFxuXG4gICAgdGFza0FyZWEuYXBwZW5kQ2hpbGQobmV3RGl2KTtcbiAgICBcbiAgICBjbG9zZVRhc2tGb3JtKCk7ICBcbiAgICAgXG59XG5cbmV4cG9ydCB7YWRkVGFza1RvRE9NfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgaW5pdGlhbFByb2plY3QgfSBmcm9tIFwiLi9wcm9qZWN0RmFjdG9yeVwiO1xuaW1wb3J0IHsgaW5pdGlhbGV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vZXZlbnRsaXN0ZW5lcnNcIjtcblxuaW5pdGlhbGV2ZW50TGlzdGVuZXJzKCk7XG5jcmVhdGVQcm9qZWN0KFwiZGVmYXVsdFwiKTtcbmluaXRpYWxQcm9qZWN0KCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=