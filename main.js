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
    
        
    if (target === "addTask") showTaskForm();
    else if (target === "closeTask") closeTaskForm();
    else if (target === "addProject") showProjectForm();
    else if (target === "closeProject") closeProjectForm(); 
    else if (target === "submitProject")  (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.createProject)(document.getElementById("projectTitle").value); 
    else if (target === "submitTask")  (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.addTaskToProject)();
    else if (target === "projectTitle") (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.selectProject)(e);
    else if (target === "deleteButton") (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(buttonID);
    else if (target === "projectButton") (0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.deleteProject)(buttonID);
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
/* harmony export */   "deleteTask": () => (/* binding */ deleteTask),
/* harmony export */   "deleteProject": () => (/* binding */ deleteProject)
/* harmony export */ });
/* harmony import */ var _updateProjectDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateProjectDOM */ "./src/updateProjectDOM.js");
/* harmony import */ var _eventlisteners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventlisteners */ "./src/eventlisteners.js");
/* harmony import */ var _taskFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./taskFactory */ "./src/taskFactory.js");




//variables
let allProjectsArray = [];
let currentproject = 0;
let projectArraycounter = 0;
let counter =0;

//creates new project in allprojectsarray, puts it on the page - called from event listeners
function createProject(name){    
    allProjectsArray[projectArraycounter] = projectFactory(name)    
    allProjectsArray[projectArraycounter].putOnPage(counter);
    (0,_eventlisteners__WEBPACK_IMPORTED_MODULE_1__.closeProjectForm)();
    projectArraycounter++;  
    counter++;  
    console.log(counter)
}

//default project is highlighted when project starts
function initialProject(){
    let startingProject = document.getElementById("default");
    startingProject.style.backgroundColor = "lightgray";
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
    document.getElementById(e.target.id).style.backgroundColor = "lightgray";
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

function deleteProject(id){
    //all projects array splice
    allProjectsArray.splice(id, 1);
    let projectArea = document.getElementById("projectList");
    let taskArea = document.getElementById("mainDisplayInner");
    taskArea.innerHTML = "";
    projectArea.innerHTML = "";
    //redraw all elements of array
    counter = 0;
    projectArraycounter--;
    for (let index = 0; index < allProjectsArray.length; index++) {
        
        allProjectsArray[index].putOnPage(counter);     
        counter++;  
        console.log(counter)         
    }
    //make default highlighted
    initialProject();  
}

const projectFactory = (suppliedName) => {
    
    //so i can see whats going on in logs
    let name = suppliedName;

    //create array for this project
    let projectArray = [];

    function putOnPage(counter){        
        (0,_updateProjectDOM__WEBPACK_IMPORTED_MODULE_0__.updateProjectDOM)(suppliedName, counter);
        
        
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
        projectArray.splice(id, 1);        
        taskNumber = projectArray.length;
        allProjectsArray[currentproject].populateChosenProjectDOM(); 
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


function updateProjectDOM(project, counter){
    let projectArea = document.getElementById("projectList");
    let newh2 = document.createElement("div");
    // newh2.innerText = project;
    newh2.innerHTML = `<h3>${project}</h3><button id="${counter}" class="projectButton">Delete</button?`
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvZXZlbnRsaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcHJvamVjdEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdGFza0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlUHJvamVjdERPTS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy91cGRhdGVUYXNrRE9NLmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgc2VsZWN0UHJvamVjdCwgYWRkVGFza1RvUHJvamVjdCwgZGVsZXRlVGFzaywgZGVsZXRlUHJvamVjdH0gZnJvbSBcIi4vcHJvamVjdEZhY3RvcnlcIjtcbi8vIGltcG9ydCB7IGRlbGV0ZVRhc2sgfSBmcm9tIFwiLi9yZW1vdmVUYXNrXCI7XG5cblxuZnVuY3Rpb24gc2hvd1Rhc2tGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtQXJlYVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmhlcml0XCI7fVxuZnVuY3Rpb24gc2hvd1Byb2plY3RGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0Rm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmhlcml0XCI7fVxuZnVuY3Rpb24gY2xvc2VUYXNrRm9ybSgpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybUFyZWFcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO31cbmZ1bmN0aW9uIGNsb3NlUHJvamVjdEZvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9XG5cblxuXG5mdW5jdGlvbiBpbml0aWFsZXZlbnRMaXN0ZW5lcnMoKXtcbi8vZXZlbnQgbGlzdGVuZXJzIGZvciBuYXZpZ2F0aW9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc05hbWU7XG4gICAgY29uc3QgYnV0dG9uSUQgPSBlLnRhcmdldC5pZDtcbiAgICBcbiAgICAgICAgXG4gICAgaWYgKHRhcmdldCA9PT0gXCJhZGRUYXNrXCIpIHNob3dUYXNrRm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJjbG9zZVRhc2tcIikgY2xvc2VUYXNrRm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJhZGRQcm9qZWN0XCIpIHNob3dQcm9qZWN0Rm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJjbG9zZVByb2plY3RcIikgY2xvc2VQcm9qZWN0Rm9ybSgpOyBcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwic3VibWl0UHJvamVjdFwiKSAgY3JlYXRlUHJvamVjdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RUaXRsZVwiKS52YWx1ZSk7IFxuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJzdWJtaXRUYXNrXCIpICBhZGRUYXNrVG9Qcm9qZWN0KCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInByb2plY3RUaXRsZVwiKSBzZWxlY3RQcm9qZWN0KGUpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJkZWxldGVCdXR0b25cIikgZGVsZXRlVGFzayhidXR0b25JRCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInByb2plY3RCdXR0b25cIikgZGVsZXRlUHJvamVjdChidXR0b25JRCk7XG59KVxufVxuZXhwb3J0IHtpbml0aWFsZXZlbnRMaXN0ZW5lcnMsIGNsb3NlVGFza0Zvcm0sIGNsb3NlUHJvamVjdEZvcm19IiwiaW1wb3J0IHsgdXBkYXRlUHJvamVjdERPTSB9IGZyb20gXCIuL3VwZGF0ZVByb2plY3RET01cIjtcbmltcG9ydCB7Y2xvc2VQcm9qZWN0Rm9ybX0gZnJvbSBcIi4vZXZlbnRsaXN0ZW5lcnNcIjtcbmltcG9ydCB7dGFza0ZhY3Rvcnl9IGZyb20gXCIuL3Rhc2tGYWN0b3J5XCI7XG5cbi8vdmFyaWFibGVzXG5sZXQgYWxsUHJvamVjdHNBcnJheSA9IFtdO1xubGV0IGN1cnJlbnRwcm9qZWN0ID0gMDtcbmxldCBwcm9qZWN0QXJyYXljb3VudGVyID0gMDtcbmxldCBjb3VudGVyID0wO1xuXG4vL2NyZWF0ZXMgbmV3IHByb2plY3QgaW4gYWxscHJvamVjdHNhcnJheSwgcHV0cyBpdCBvbiB0aGUgcGFnZSAtIGNhbGxlZCBmcm9tIGV2ZW50IGxpc3RlbmVyc1xuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lKXsgICAgXG4gICAgYWxsUHJvamVjdHNBcnJheVtwcm9qZWN0QXJyYXljb3VudGVyXSA9IHByb2plY3RGYWN0b3J5KG5hbWUpICAgIFxuICAgIGFsbFByb2plY3RzQXJyYXlbcHJvamVjdEFycmF5Y291bnRlcl0ucHV0T25QYWdlKGNvdW50ZXIpO1xuICAgIGNsb3NlUHJvamVjdEZvcm0oKTtcbiAgICBwcm9qZWN0QXJyYXljb3VudGVyKys7ICBcbiAgICBjb3VudGVyKys7ICBcbiAgICBjb25zb2xlLmxvZyhjb3VudGVyKVxufVxuXG4vL2RlZmF1bHQgcHJvamVjdCBpcyBoaWdobGlnaHRlZCB3aGVuIHByb2plY3Qgc3RhcnRzXG5mdW5jdGlvbiBpbml0aWFsUHJvamVjdCgpe1xuICAgIGxldCBzdGFydGluZ1Byb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlZmF1bHRcIik7XG4gICAgc3RhcnRpbmdQcm9qZWN0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmF5XCI7XG59XG5cblxuLy9zZWxlY3RzIHRoZSBwcm9qZWN0IHdoZW4gcHJvamVjdCBuYW1lIGlzIGNsaWNrZWRcbi8vZmlsbHMgdGhlIGFyZWEgd2l0aCBqdXN0IHRhc2tzIG9mIHRoZSBwcm9qZWN0XG5mdW5jdGlvbiBzZWxlY3RQcm9qZWN0KGUpeyAgICBcbiAgICBcbiAgICAvL3RoZSBjb2xvdXIgdG8gY2hhbmdlIHRvIGdyZXkgZm9yIGFsbCBwcm9qZWN0IG5hbWVzXG4gICAgbGV0IGFsbFByb2plY3RFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwcm9qZWN0VGl0bGVcIik7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFsbFByb2plY3RFbGVtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGFsbFByb2plY3RFbGVtZW50c1tpbmRleF07XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmV5XCI7ICAgICAgICBcbiAgICB9XG4gICAgLy9qdXN0IGNvbG91ciBpbiB0aGUgc2VsZWN0ZWQgZWxlbWVudFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGUudGFyZ2V0LmlkKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Z3JheVwiO1xuICAgIC8vZ28gdGhyb3VnaCBhbGwgZWxlbWVudHMgb2YgdGhlIGFycmF5IGhvbGRpbmcgYWxsIHRoZSBwcm9qZWN0c1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUHJvamVjdHNBcnJheS5sZW5ndGg7IGkrKykgXG4gICAgICAgIHsgIC8vaWYgdGhlIG5hbWUgb2YgZWxlbWVudCBhbmQgdGFyZ2V0IElEIGFyZSB0aGUgc2FtZSwgdGhhdCBkZXRlcm1pbmVzIHRoZSBjdXJyZW50IHByb2plY3Qgc2VsZWN0ZWRcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gYWxsUHJvamVjdHNBcnJheVtpXS5uYW1lKSBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY3VycmVudHByb2plY3QgPSBpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAvL3JlZHJhdyBwcm9qZWN0cyBhcnJheSBvbiB0aGUgcGFnZSAgXG4gICAgYWxsUHJvamVjdHNBcnJheVtjdXJyZW50cHJvamVjdF0ucG9wdWxhdGVDaG9zZW5Qcm9qZWN0RE9NKCk7ICAgIFxufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrKGUpe1xuICAgIGFsbFByb2plY3RzQXJyYXlbY3VycmVudHByb2plY3RdLnJlbW92ZVRhc2soZSk7XG59XG5cbi8vYWRkcyBhIHRhc2sgdG8gY3VycmVudCBzZWxlY3RlZCBwcm9qZWN0IC0gY2FsbGVkIGZyb20gZXZlbnQgbGlzdGVuZXJzXG5cbmZ1bmN0aW9uIGFkZFRhc2tUb1Byb2plY3QoKXtcbiAgICBhbGxQcm9qZWN0c0FycmF5W2N1cnJlbnRwcm9qZWN0XS5hZGRUYXNrKCk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoaWQpe1xuICAgIC8vYWxsIHByb2plY3RzIGFycmF5IHNwbGljZVxuICAgIGFsbFByb2plY3RzQXJyYXkuc3BsaWNlKGlkLCAxKTtcbiAgICBsZXQgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RMaXN0XCIpO1xuICAgIGxldCB0YXNrQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkRpc3BsYXlJbm5lclwiKTtcbiAgICB0YXNrQXJlYS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHByb2plY3RBcmVhLmlubmVySFRNTCA9IFwiXCI7XG4gICAgLy9yZWRyYXcgYWxsIGVsZW1lbnRzIG9mIGFycmF5XG4gICAgY291bnRlciA9IDA7XG4gICAgcHJvamVjdEFycmF5Y291bnRlci0tO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhbGxQcm9qZWN0c0FycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBcbiAgICAgICAgYWxsUHJvamVjdHNBcnJheVtpbmRleF0ucHV0T25QYWdlKGNvdW50ZXIpOyAgICAgXG4gICAgICAgIGNvdW50ZXIrKzsgIFxuICAgICAgICBjb25zb2xlLmxvZyhjb3VudGVyKSAgICAgICAgIFxuICAgIH1cbiAgICAvL21ha2UgZGVmYXVsdCBoaWdobGlnaHRlZFxuICAgIGluaXRpYWxQcm9qZWN0KCk7ICBcbn1cblxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAoc3VwcGxpZWROYW1lKSA9PiB7XG4gICAgXG4gICAgLy9zbyBpIGNhbiBzZWUgd2hhdHMgZ29pbmcgb24gaW4gbG9nc1xuICAgIGxldCBuYW1lID0gc3VwcGxpZWROYW1lO1xuXG4gICAgLy9jcmVhdGUgYXJyYXkgZm9yIHRoaXMgcHJvamVjdFxuICAgIGxldCBwcm9qZWN0QXJyYXkgPSBbXTtcblxuICAgIGZ1bmN0aW9uIHB1dE9uUGFnZShjb3VudGVyKXsgICAgICAgIFxuICAgICAgICB1cGRhdGVQcm9qZWN0RE9NKHN1cHBsaWVkTmFtZSwgY291bnRlcik7XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG5cbiAgICBsZXQgdGFzaztcbiAgICBsZXQgdGFza051bWJlciA9IDA7XG4gICAgZnVuY3Rpb24gYWRkVGFzaygpeyAgICAgICAgICAgICAgIFxuICAgICAgICAvLyBjcmVhdGUgdGhlIHRhc2ssIHB1c2ggdG8gYXJyYXlcbiAgICAgICAgdGFzayA9IHRhc2tGYWN0b3J5KHRhc2tOdW1iZXIpO1xuICAgICAgICAvLyB0YXNrLmNyZWF0ZVRhc2soKTtcbiAgICAgICAgdGFzay5wb3B1bGF0ZVRhc2tzRm9yUHJvamVjdCgpO1xuICAgICAgICBwcm9qZWN0QXJyYXkucHVzaCh0YXNrKTsgICBcbiAgICAgICAgY29uc29sZS5sb2codGFzay50aGlzdGFza051bWJlcilcbiAgICAgICAgdGFza051bWJlcisrO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiByZW1vdmVUYXNrKGlkKXtcbiAgICAgICAgcHJvamVjdEFycmF5LnNwbGljZShpZCwgMSk7ICAgICAgICBcbiAgICAgICAgdGFza051bWJlciA9IHByb2plY3RBcnJheS5sZW5ndGg7XG4gICAgICAgIGFsbFByb2plY3RzQXJyYXlbY3VycmVudHByb2plY3RdLnBvcHVsYXRlQ2hvc2VuUHJvamVjdERPTSgpOyBcbiAgICB9XG5cbiAgICAgICAgLy9yZWRyYXcgcHJvamVjdHNEaXNwbGF5IHdpdGggZWxlbWVudHMgb2YgdGhlIHByb2plY3QgZXZlcnkgdGltZSBhIHByb2plY3QgaXMgY2xpY2tlZFxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlQ2hvc2VuUHJvamVjdERPTSgpe1xuICAgICAgICBsZXQgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5EaXNwbGF5SW5uZXJcIik7XG4gICAgICAgIGRpc3BsYXlBcmVhLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwcm9qZWN0QXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcHJvamVjdEFycmF5W2luZGV4XTtcbiAgICAgICAgICAgIGVsZW1lbnQucG9wdWxhdGVUYXNrc0ZvclByb2plY3RBZnRlclJlbW92YWwoaW5kZXgpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgfSAgICBcbiAgICB9XG5cbiAgICByZXR1cm4ge3B1dE9uUGFnZSwgYWRkVGFzaywgbmFtZSwgcHJvamVjdEFycmF5LCBwb3B1bGF0ZUNob3NlblByb2plY3RET00sIHJlbW92ZVRhc2t9XG4gICAgfVxuICAgIFxuXG5cbmV4cG9ydCB7Y3JlYXRlUHJvamVjdCwgcHJvamVjdEZhY3RvcnksIHNlbGVjdFByb2plY3QsIGFkZFRhc2tUb1Byb2plY3QsIGluaXRpYWxQcm9qZWN0LCBkZWxldGVUYXNrLCBkZWxldGVQcm9qZWN0fVxuXG4iLCJpbXBvcnQge2FkZFRhc2tUb0RPTX0gZnJvbSBcIi4vdXBkYXRlVGFza0RPTVwiO1xuXG5cbmNvbnN0IHRhc2tGYWN0b3J5ID0gKHRhc2tOdW1iZXIpID0+e1xuXG4gICAgbGV0IHRhc2t0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIikudmFsdWU7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJEZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgICBsZXQgZHVlZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlXCIpLnZhbHVlO1xuICAgIGxldCB0YXNrcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xuICAgIGxldCB0aGlzdGFza051bWJlciA9IHRhc2tOdW1iZXI7XG4gICAgXG4gICAgXG4gICAgXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVUYXNrc0ZvclByb2plY3QoKXsgICAgICAgIFxuICAgICAgICBhZGRUYXNrVG9ET00odGFza3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlZGF0ZSwgdGFza3ByaW9yaXR5LCB0aGlzdGFza051bWJlcik7IFxuICAgIH1cblxuICAgIFxuICAgIC8vZnVuY3Rpb24gZm9yIHdoZW4gdGFza3MgaGF2ZSBiZWVuIHJlbW92ZWRcbiBcbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVRhc2tzRm9yUHJvamVjdEFmdGVyUmVtb3ZhbChpbmRleCl7ICAgICAgICBcbiAgICAgICAgYWRkVGFza1RvRE9NKHRhc2t0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZWRhdGUsIHRhc2twcmlvcml0eSwgaW5kZXgpO1xuICAgICAgICBjb25zb2xlLmxvZyhpbmRleClcbiAgICB9XG5cbiAgICByZXR1cm57cG9wdWxhdGVUYXNrc0ZvclByb2plY3QsIHRoaXN0YXNrTnVtYmVyLCBwb3B1bGF0ZVRhc2tzRm9yUHJvamVjdEFmdGVyUmVtb3ZhbH1cbn1cblxuZXhwb3J0IHt0YXNrRmFjdG9yeX0iLCIvL3RoaXMgZnVuY3Rpb24gaXMgc29sZWx5IGdldHRpbmcgdGhlIG5hbWUgb2YgdGhlIHByb2plY3QgYW5kIGFkZGluZyBpdCB0byB0aGUgZG9tXG5cblxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdERPTShwcm9qZWN0LCBjb3VudGVyKXtcbiAgICBsZXQgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RMaXN0XCIpO1xuICAgIGxldCBuZXdoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgLy8gbmV3aDIuaW5uZXJUZXh0ID0gcHJvamVjdDtcbiAgICBuZXdoMi5pbm5lckhUTUwgPSBgPGgzPiR7cHJvamVjdH08L2gzPjxidXR0b24gaWQ9XCIke2NvdW50ZXJ9XCIgY2xhc3M9XCJwcm9qZWN0QnV0dG9uXCI+RGVsZXRlPC9idXR0b24/YFxuICAgIG5ld2gyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJvamVjdFRpdGxlXCIpO1xuICAgIG5ld2gyLnNldEF0dHJpYnV0ZShcImlkXCIsIHByb2plY3QpO1xuICAgIHByb2plY3RBcmVhLmFwcGVuZENoaWxkKG5ld2gyKTtcbiAgICBcbn1cblxuXG5leHBvcnQge3VwZGF0ZVByb2plY3RET019IiwiaW1wb3J0IHsgY2xvc2VUYXNrRm9ybSB9IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XG5cbi8vdGhpcyBmdW5jdGlvbiBpcyBnZXR0aW5nIHZhbHVlcyBmcm9tIHRhc2sgZm9ybSBcbi8vYW5kIGFwcGVuZGluZyB0aGUgdGFzayB0byB0aGUgZG9tXG5cbi8vIGxldCB0YXNrTnVtYmVyID0gMDtcblxuZnVuY3Rpb24gYWRkVGFza1RvRE9NKHRhc2t0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZWRhdGUsIHRhc2twcmlvcml0eSwgdGhpc3Rhc2tOdW1iZXIpe1xuICAgIFxuICAgIGxldCB0YXNrQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkRpc3BsYXlJbm5lclwiKTtcbiAgICBsZXQgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICBuZXdEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7dGhpc3Rhc2tOdW1iZXJ9YCk7XG5cbiAgICBuZXdEaXYuaW5uZXJIVE1MID0gXG4gICAgYDxoMz4ke3Rhc2t0aXRsZX08L2gzPlxuICAgIDxwPiR7ZGVzY3JpcHRpb259PC9wPlxuICAgIDxwPkR1ZTogJHtkdWVkYXRlfTwvcD5cbiAgICA8cD5Qcmlvcml0eTogJHt0YXNrcHJpb3JpdHl9PC9wPiAgICBcbiAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlQnV0dG9uXCIgaWQ9XCIke3RoaXN0YXNrTnVtYmVyfVwiPiBEZWxldGUgVGFzayA8L2J1dHRvbj5gXG5cbiAgICB0YXNrQXJlYS5hcHBlbmRDaGlsZChuZXdEaXYpO1xuICAgIFxuICAgIGNsb3NlVGFza0Zvcm0oKTsgIFxuICAgICBcbn1cblxuZXhwb3J0IHthZGRUYXNrVG9ET019IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVQcm9qZWN0LCBpbml0aWFsUHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3RGYWN0b3J5XCI7XG5pbXBvcnQgeyBpbml0aWFsZXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9ldmVudGxpc3RlbmVyc1wiO1xuXG5pbml0aWFsZXZlbnRMaXN0ZW5lcnMoKTtcbmNyZWF0ZVByb2plY3QoXCJkZWZhdWx0XCIpO1xuaW5pdGlhbFByb2plY3QoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==