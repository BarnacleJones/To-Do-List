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
    projectArea.innerHTML = "";
    //redraw all elements of array
    counter = 0;
    projectArraycounter--;
    for (let index = 0; index < allProjectsArray.length; index++) {
        allProjectsArray[index].putOnPage(counter);       
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
        counter++;
        return counter;
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
let counter =0;

function updateProjectDOM(project){
    let projectArea = document.getElementById("projectList");
    let newh2 = document.createElement("div");
    // newh2.innerText = project;
    newh2.innerHTML = `<h3>${project}</h3><button id="${counter}" class="projectButton">Delete</button?`
    newh2.setAttribute("class", "projectTitle");
    newh2.setAttribute("id", project);
    projectArea.appendChild(newh2);
    counter++;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cGFjazovL3RvZG9saXN0Ly4vc3JjL2V2ZW50bGlzdGVuZXJzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Rhc2tGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3VwZGF0ZVByb2plY3RET00uanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlVGFza0RPTS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVByb2plY3QsIHNlbGVjdFByb2plY3QsIGFkZFRhc2tUb1Byb2plY3QsIGRlbGV0ZVRhc2ssIGRlbGV0ZVByb2plY3R9IGZyb20gXCIuL3Byb2plY3RGYWN0b3J5XCI7XG4vLyBpbXBvcnQgeyBkZWxldGVUYXNrIH0gZnJvbSBcIi4vcmVtb3ZlVGFza1wiO1xuXG5cbmZ1bmN0aW9uIHNob3dUYXNrRm9ybSgpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybUFyZWFcIikuc3R5bGUuZGlzcGxheSA9IFwiaW5oZXJpdFwiO31cbmZ1bmN0aW9uIHNob3dQcm9qZWN0Rm9ybSgpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdEZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwiaW5oZXJpdFwiO31cbmZ1bmN0aW9uIGNsb3NlVGFza0Zvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1BcmVhXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9XG5mdW5jdGlvbiBjbG9zZVByb2plY3RGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0Rm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7fVxuXG5cblxuZnVuY3Rpb24gaW5pdGlhbGV2ZW50TGlzdGVuZXJzKCl7XG4vL2V2ZW50IGxpc3RlbmVycyBmb3IgbmF2aWdhdGlvblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQuY2xhc3NOYW1lO1xuICAgIGNvbnN0IGJ1dHRvbklEID0gZS50YXJnZXQuaWQ7XG4gICAgXG4gICAgICAgIFxuICAgIGlmICh0YXJnZXQgPT09IFwiYWRkVGFza1wiKSBzaG93VGFza0Zvcm0oKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiY2xvc2VUYXNrXCIpIGNsb3NlVGFza0Zvcm0oKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiYWRkUHJvamVjdFwiKSBzaG93UHJvamVjdEZvcm0oKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiY2xvc2VQcm9qZWN0XCIpIGNsb3NlUHJvamVjdEZvcm0oKTsgXG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInN1Ym1pdFByb2plY3RcIikgIGNyZWF0ZVByb2plY3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0VGl0bGVcIikudmFsdWUpOyBcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwic3VibWl0VGFza1wiKSAgYWRkVGFza1RvUHJvamVjdCgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJwcm9qZWN0VGl0bGVcIikgc2VsZWN0UHJvamVjdChlKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiZGVsZXRlQnV0dG9uXCIpIGRlbGV0ZVRhc2soYnV0dG9uSUQpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJwcm9qZWN0QnV0dG9uXCIpIGRlbGV0ZVByb2plY3QoYnV0dG9uSUQpO1xufSlcbn1cbmV4cG9ydCB7aW5pdGlhbGV2ZW50TGlzdGVuZXJzLCBjbG9zZVRhc2tGb3JtLCBjbG9zZVByb2plY3RGb3JtfSIsImltcG9ydCB7IHVwZGF0ZVByb2plY3RET00gfSBmcm9tIFwiLi91cGRhdGVQcm9qZWN0RE9NXCI7XG5pbXBvcnQge2Nsb3NlUHJvamVjdEZvcm19IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XG5pbXBvcnQge3Rhc2tGYWN0b3J5fSBmcm9tIFwiLi90YXNrRmFjdG9yeVwiO1xuXG4vL3ZhcmlhYmxlc1xubGV0IGFsbFByb2plY3RzQXJyYXkgPSBbXTtcbmxldCBjdXJyZW50cHJvamVjdCA9IDA7XG5sZXQgcHJvamVjdEFycmF5Y291bnRlciA9IDA7XG5sZXQgY291bnRlciA9MDtcblxuLy9jcmVhdGVzIG5ldyBwcm9qZWN0IGluIGFsbHByb2plY3RzYXJyYXksIHB1dHMgaXQgb24gdGhlIHBhZ2UgLSBjYWxsZWQgZnJvbSBldmVudCBsaXN0ZW5lcnNcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSl7ICAgIFxuICAgIGFsbFByb2plY3RzQXJyYXlbcHJvamVjdEFycmF5Y291bnRlcl0gPSBwcm9qZWN0RmFjdG9yeShuYW1lKSAgICBcbiAgICBhbGxQcm9qZWN0c0FycmF5W3Byb2plY3RBcnJheWNvdW50ZXJdLnB1dE9uUGFnZShjb3VudGVyKTtcbiAgICBjbG9zZVByb2plY3RGb3JtKCk7XG4gICAgcHJvamVjdEFycmF5Y291bnRlcisrOyAgICBcbiAgICBjb25zb2xlLmxvZyhjb3VudGVyKVxufVxuXG4vL2RlZmF1bHQgcHJvamVjdCBpcyBoaWdobGlnaHRlZCB3aGVuIHByb2plY3Qgc3RhcnRzXG5mdW5jdGlvbiBpbml0aWFsUHJvamVjdCgpe1xuICAgIGxldCBzdGFydGluZ1Byb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlZmF1bHRcIik7XG4gICAgc3RhcnRpbmdQcm9qZWN0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmF5XCI7XG59XG5cblxuLy9zZWxlY3RzIHRoZSBwcm9qZWN0IHdoZW4gcHJvamVjdCBuYW1lIGlzIGNsaWNrZWRcbi8vZmlsbHMgdGhlIGFyZWEgd2l0aCBqdXN0IHRhc2tzIG9mIHRoZSBwcm9qZWN0XG5mdW5jdGlvbiBzZWxlY3RQcm9qZWN0KGUpeyAgICBcblxuICAgIC8vdGhlIGNvbG91ciB0byBjaGFuZ2UgdG8gZ3JleSBmb3IgYWxsIHByb2plY3QgbmFtZXNcbiAgICBsZXQgYWxsUHJvamVjdEVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInByb2plY3RUaXRsZVwiKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYWxsUHJvamVjdEVsZW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gYWxsUHJvamVjdEVsZW1lbnRzW2luZGV4XTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIjsgICAgICAgIFxuICAgIH1cbiAgICAvL2p1c3QgY29sb3VyIGluIHRoZSBzZWxlY3RlZCBlbGVtZW50XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmF5XCI7XG4gICAgLy9nbyB0aHJvdWdoIGFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXkgaG9sZGluZyBhbGwgdGhlIHByb2plY3RzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxQcm9qZWN0c0FycmF5Lmxlbmd0aDsgaSsrKSBcbiAgICAgICAgeyAgLy9pZiB0aGUgbmFtZSBvZiBlbGVtZW50IGFuZCB0YXJnZXQgSUQgYXJlIHRoZSBzYW1lLCB0aGF0IGRldGVybWluZXMgdGhlIGN1cnJlbnQgcHJvamVjdCBzZWxlY3RlZFxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSBhbGxQcm9qZWN0c0FycmF5W2ldLm5hbWUpIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50cHJvamVjdCA9IGk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIC8vcmVkcmF3IHByb2plY3RzIGFycmF5IG9uIHRoZSBwYWdlICBcbiAgICBhbGxQcm9qZWN0c0FycmF5W2N1cnJlbnRwcm9qZWN0XS5wb3B1bGF0ZUNob3NlblByb2plY3RET00oKTsgICAgXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2soZSl7XG4gICAgYWxsUHJvamVjdHNBcnJheVtjdXJyZW50cHJvamVjdF0ucmVtb3ZlVGFzayhlKTtcbn1cblxuLy9hZGRzIGEgdGFzayB0byBjdXJyZW50IHNlbGVjdGVkIHByb2plY3QgLSBjYWxsZWQgZnJvbSBldmVudCBsaXN0ZW5lcnNcblxuZnVuY3Rpb24gYWRkVGFza1RvUHJvamVjdCgpe1xuICAgIGFsbFByb2plY3RzQXJyYXlbY3VycmVudHByb2plY3RdLmFkZFRhc2soKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpZCl7XG4gICAgXG4gICAgLy9hbGwgcHJvamVjdHMgYXJyYXkgc3BsaWNlXG4gICAgYWxsUHJvamVjdHNBcnJheS5zcGxpY2UoaWQsIDEpO1xuICAgIGxldCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdExpc3RcIik7XG4gICAgcHJvamVjdEFyZWEuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAvL3JlZHJhdyBhbGwgZWxlbWVudHMgb2YgYXJyYXlcbiAgICBjb3VudGVyID0gMDtcbiAgICBwcm9qZWN0QXJyYXljb3VudGVyLS07XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFsbFByb2plY3RzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGFsbFByb2plY3RzQXJyYXlbaW5kZXhdLnB1dE9uUGFnZShjb3VudGVyKTsgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKGNvdW50ZXIpICAgICAgICAgXG4gICAgfVxuICAgIC8vbWFrZSBkZWZhdWx0IGhpZ2hsaWdodGVkXG4gICAgaW5pdGlhbFByb2plY3QoKTsgIFxuXG4gICAgXG59XG5cbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKHN1cHBsaWVkTmFtZSkgPT4ge1xuICAgIFxuICAgIC8vc28gaSBjYW4gc2VlIHdoYXRzIGdvaW5nIG9uIGluIGxvZ3NcbiAgICBsZXQgbmFtZSA9IHN1cHBsaWVkTmFtZTtcblxuICAgIC8vY3JlYXRlIGFycmF5IGZvciB0aGlzIHByb2plY3RcbiAgICBsZXQgcHJvamVjdEFycmF5ID0gW107XG5cbiAgICBmdW5jdGlvbiBwdXRPblBhZ2UoY291bnRlcil7ICAgICAgICBcbiAgICAgICAgdXBkYXRlUHJvamVjdERPTShzdXBwbGllZE5hbWUsIGNvdW50ZXIpO1xuICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIHJldHVybiBjb3VudGVyO1xuICAgIH1cblxuICAgIGxldCB0YXNrO1xuICAgIGxldCB0YXNrTnVtYmVyID0gMDtcbiAgICBmdW5jdGlvbiBhZGRUYXNrKCl7ICAgICAgICAgICAgICAgXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgdGFzaywgcHVzaCB0byBhcnJheVxuICAgICAgICB0YXNrID0gdGFza0ZhY3RvcnkodGFza051bWJlcik7XG4gICAgICAgIC8vIHRhc2suY3JlYXRlVGFzaygpO1xuICAgICAgICB0YXNrLnBvcHVsYXRlVGFza3NGb3JQcm9qZWN0KCk7XG4gICAgICAgIHByb2plY3RBcnJheS5wdXNoKHRhc2spOyAgIFxuICAgICAgICBjb25zb2xlLmxvZyh0YXNrLnRoaXN0YXNrTnVtYmVyKVxuICAgICAgICB0YXNrTnVtYmVyKys7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHJlbW92ZVRhc2soaWQpe1xuICAgICAgICBwcm9qZWN0QXJyYXkuc3BsaWNlKGlkLCAxKTsgICAgICAgIFxuICAgICAgICB0YXNrTnVtYmVyID0gcHJvamVjdEFycmF5Lmxlbmd0aDtcbiAgICAgICAgYWxsUHJvamVjdHNBcnJheVtjdXJyZW50cHJvamVjdF0ucG9wdWxhdGVDaG9zZW5Qcm9qZWN0RE9NKCk7IFxuICAgIH1cblxuICAgICAgICAvL3JlZHJhdyBwcm9qZWN0c0Rpc3BsYXkgd2l0aCBlbGVtZW50cyBvZiB0aGUgcHJvamVjdCBldmVyeSB0aW1lIGEgcHJvamVjdCBpcyBjbGlja2VkXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVDaG9zZW5Qcm9qZWN0RE9NKCl7XG4gICAgICAgIGxldCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkRpc3BsYXlJbm5lclwiKTtcbiAgICAgICAgZGlzcGxheUFyZWEuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHByb2plY3RBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBwcm9qZWN0QXJyYXlbaW5kZXhdO1xuICAgICAgICAgICAgZWxlbWVudC5wb3B1bGF0ZVRhc2tzRm9yUHJvamVjdEFmdGVyUmVtb3ZhbChpbmRleCk7ICAgICAgICAgICAgICAgIFxuICAgICAgICB9ICAgIFxuICAgIH1cblxuICAgIHJldHVybiB7cHV0T25QYWdlLCBhZGRUYXNrLCBuYW1lLCBwcm9qZWN0QXJyYXksIHBvcHVsYXRlQ2hvc2VuUHJvamVjdERPTSwgcmVtb3ZlVGFza31cbiAgICB9XG4gICAgXG5cblxuZXhwb3J0IHtjcmVhdGVQcm9qZWN0LCBwcm9qZWN0RmFjdG9yeSwgc2VsZWN0UHJvamVjdCwgYWRkVGFza1RvUHJvamVjdCwgaW5pdGlhbFByb2plY3QsIGRlbGV0ZVRhc2ssIGRlbGV0ZVByb2plY3R9XG5cbiIsImltcG9ydCB7YWRkVGFza1RvRE9NfSBmcm9tIFwiLi91cGRhdGVUYXNrRE9NXCI7XG5cblxuY29uc3QgdGFza0ZhY3RvcnkgPSAodGFza051bWJlcikgPT57XG5cbiAgICBsZXQgdGFza3RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKS52YWx1ZTtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkRlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICAgIGxldCBkdWVkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVcIikudmFsdWU7XG4gICAgbGV0IHRhc2twcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XG4gICAgbGV0IHRoaXN0YXNrTnVtYmVyID0gdGFza051bWJlcjtcbiAgICBcbiAgICBcbiAgICBcbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVRhc2tzRm9yUHJvamVjdCgpeyAgICAgICAgXG4gICAgICAgIGFkZFRhc2tUb0RPTSh0YXNrdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVkYXRlLCB0YXNrcHJpb3JpdHksIHRoaXN0YXNrTnVtYmVyKTsgXG4gICAgfVxuXG4gICAgXG4gICAgLy9mdW5jdGlvbiBmb3Igd2hlbiB0YXNrcyBoYXZlIGJlZW4gcmVtb3ZlZFxuIFxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVGFza3NGb3JQcm9qZWN0QWZ0ZXJSZW1vdmFsKGluZGV4KXsgICAgICAgIFxuICAgICAgICBhZGRUYXNrVG9ET00odGFza3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlZGF0ZSwgdGFza3ByaW9yaXR5LCBpbmRleCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4KVxuICAgIH1cblxuICAgIHJldHVybntwb3B1bGF0ZVRhc2tzRm9yUHJvamVjdCwgdGhpc3Rhc2tOdW1iZXIsIHBvcHVsYXRlVGFza3NGb3JQcm9qZWN0QWZ0ZXJSZW1vdmFsfVxufVxuXG5leHBvcnQge3Rhc2tGYWN0b3J5fSIsIi8vdGhpcyBmdW5jdGlvbiBpcyBzb2xlbHkgZ2V0dGluZyB0aGUgbmFtZSBvZiB0aGUgcHJvamVjdCBhbmQgYWRkaW5nIGl0IHRvIHRoZSBkb21cbmxldCBjb3VudGVyID0wO1xuXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0RE9NKHByb2plY3Qpe1xuICAgIGxldCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdExpc3RcIik7XG4gICAgbGV0IG5ld2gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvLyBuZXdoMi5pbm5lclRleHQgPSBwcm9qZWN0O1xuICAgIG5ld2gyLmlubmVySFRNTCA9IGA8aDM+JHtwcm9qZWN0fTwvaDM+PGJ1dHRvbiBpZD1cIiR7Y291bnRlcn1cIiBjbGFzcz1cInByb2plY3RCdXR0b25cIj5EZWxldGU8L2J1dHRvbj9gXG4gICAgbmV3aDIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcm9qZWN0VGl0bGVcIik7XG4gICAgbmV3aDIuc2V0QXR0cmlidXRlKFwiaWRcIiwgcHJvamVjdCk7XG4gICAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQobmV3aDIpO1xuICAgIGNvdW50ZXIrKztcbn1cblxuXG5leHBvcnQge3VwZGF0ZVByb2plY3RET019IiwiaW1wb3J0IHsgY2xvc2VUYXNrRm9ybSB9IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XG5cbi8vdGhpcyBmdW5jdGlvbiBpcyBnZXR0aW5nIHZhbHVlcyBmcm9tIHRhc2sgZm9ybSBcbi8vYW5kIGFwcGVuZGluZyB0aGUgdGFzayB0byB0aGUgZG9tXG5cbi8vIGxldCB0YXNrTnVtYmVyID0gMDtcblxuZnVuY3Rpb24gYWRkVGFza1RvRE9NKHRhc2t0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZWRhdGUsIHRhc2twcmlvcml0eSwgdGhpc3Rhc2tOdW1iZXIpe1xuICAgIFxuICAgIGxldCB0YXNrQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkRpc3BsYXlJbm5lclwiKTtcbiAgICBsZXQgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICBuZXdEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7dGhpc3Rhc2tOdW1iZXJ9YCk7XG5cbiAgICBuZXdEaXYuaW5uZXJIVE1MID0gXG4gICAgYDxoMz4ke3Rhc2t0aXRsZX08L2gzPlxuICAgIDxwPiR7ZGVzY3JpcHRpb259PC9wPlxuICAgIDxwPkR1ZTogJHtkdWVkYXRlfTwvcD5cbiAgICA8cD5Qcmlvcml0eTogJHt0YXNrcHJpb3JpdHl9PC9wPiAgICBcbiAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlQnV0dG9uXCIgaWQ9XCIke3RoaXN0YXNrTnVtYmVyfVwiPiBEZWxldGUgVGFzayA8L2J1dHRvbj5gXG5cbiAgICB0YXNrQXJlYS5hcHBlbmRDaGlsZChuZXdEaXYpO1xuICAgIFxuICAgIGNsb3NlVGFza0Zvcm0oKTsgIFxuICAgICBcbn1cblxuZXhwb3J0IHthZGRUYXNrVG9ET019IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVQcm9qZWN0LCBpbml0aWFsUHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3RGYWN0b3J5XCI7XG5pbXBvcnQgeyBpbml0aWFsZXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9ldmVudGxpc3RlbmVyc1wiO1xuXG5pbml0aWFsZXZlbnRMaXN0ZW5lcnMoKTtcbmNyZWF0ZVByb2plY3QoXCJkZWZhdWx0XCIpO1xuaW5pdGlhbFByb2plY3QoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==