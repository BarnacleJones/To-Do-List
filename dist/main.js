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
    // const buttonID = e.target.id;
    const buttonID = e;
        
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
    function addTask(){
        // create the task, push to array
        task = (0,_taskFactory__WEBPACK_IMPORTED_MODULE_2__.taskFactory)();
        // task.createTask();
        task.populateTasksForProject();
        projectArray.push(task);   
    }
    
    function removeTask(id){
        console.log("working for now but only removing one element and not correct one")
        console.log(id)
        projectArray.splice(id, 1);
        allProjectsArray[currentproject].populateChosenProjectDOM();
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


let taskNumber = 0;
const taskFactory = () =>{

    let tasktitle = document.getElementById("title").value;
    let description = document.getElementById("Description").value;
    let duedate = document.getElementById("due").value;
    let taskpriority = document.getElementById("priority").value;
    taskNumber = taskNumber;
    taskNumber++;
    
    function populateTasksForProject(){
        (0,_updateTaskDOM__WEBPACK_IMPORTED_MODULE_0__.addTaskToDOM)(tasktitle, description, duedate, taskpriority, taskNumber);
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

// let taskNumber = 0;

function addTaskToDOM(tasktitle, description, duedate, taskpriority, taskNumber){
    
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
    // taskNumber++;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUE2RjtBQUM3RixZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QiwyQkFBMkI7QUFDM0IseUJBQXlCO0FBQ3pCLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDhEQUFhO0FBQ3ZELHVDQUF1QyxpRUFBZ0I7QUFDdkQsd0NBQXdDLDhEQUFhO0FBQ3JELHdDQUF3QywyREFBVTtBQUNsRCxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JzRDtBQUNKO0FBQ1I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksaUVBQWdCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1DQUFtQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pELFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxtRUFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUseURBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qiw2QkFBNkI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ21HO0FBQ25HOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUc2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDREQUFZO0FBQ3BCO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsV0FBVztBQUM1QztBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFNBQVMsWUFBWTtBQUNyQixjQUFjLFFBQVE7QUFDdEIsbUJBQW1CLGFBQWE7QUFDaEMsdUNBQXVDLFdBQVc7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsSUFBSSw4REFBYTtBQUNqQjtBQUNBOzs7Ozs7O1VDeEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmlFO0FBQ1I7QUFDekQ7QUFDQSxzRUFBcUI7QUFDckIsOERBQWE7QUFDYiwrREFBYyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2V2ZW50bGlzdGVuZXJzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Rhc2tGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3VwZGF0ZVByb2plY3RET00uanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlVGFza0RPTS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVByb2plY3QsIHNlbGVjdFByb2plY3QsIGFkZFRhc2tUb1Byb2plY3QsIGRlbGV0ZVRhc2t9IGZyb20gXCIuL3Byb2plY3RGYWN0b3J5XCI7XHJcbi8vIGltcG9ydCB7IGRlbGV0ZVRhc2sgfSBmcm9tIFwiLi9yZW1vdmVUYXNrXCI7XHJcblxyXG5cclxuZnVuY3Rpb24gc2hvd1Rhc2tGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtQXJlYVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmhlcml0XCI7fVxyXG5mdW5jdGlvbiBzaG93UHJvamVjdEZvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImluaGVyaXRcIjt9XHJcbmZ1bmN0aW9uIGNsb3NlVGFza0Zvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1BcmVhXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9XHJcbmZ1bmN0aW9uIGNsb3NlUHJvamVjdEZvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxldmVudExpc3RlbmVycygpe1xyXG4vL2V2ZW50IGxpc3RlbmVycyBmb3IgbmF2aWdhdGlvblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0LmNsYXNzTmFtZTtcclxuICAgIC8vIGNvbnN0IGJ1dHRvbklEID0gZS50YXJnZXQuaWQ7XHJcbiAgICBjb25zdCBidXR0b25JRCA9IGU7XHJcbiAgICAgICAgXHJcbiAgICBpZiAodGFyZ2V0ID09PSBcImFkZFRhc2tcIikgc2hvd1Rhc2tGb3JtKCk7XHJcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiY2xvc2VUYXNrXCIpIGNsb3NlVGFza0Zvcm0oKTtcclxuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJhZGRQcm9qZWN0XCIpIHNob3dQcm9qZWN0Rm9ybSgpO1xyXG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcImNsb3NlUHJvamVjdFwiKSBjbG9zZVByb2plY3RGb3JtKCk7IFxyXG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInN1Ym1pdFByb2plY3RcIikgIGNyZWF0ZVByb2plY3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0VGl0bGVcIikudmFsdWUpOyBcclxuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJzdWJtaXRUYXNrXCIpICBhZGRUYXNrVG9Qcm9qZWN0KCk7XHJcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwicHJvamVjdFRpdGxlXCIpIHNlbGVjdFByb2plY3QoZSk7XHJcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiZGVsZXRlQnV0dG9uXCIpIGRlbGV0ZVRhc2soYnV0dG9uSUQpO1xyXG59KVxyXG59XHJcbmV4cG9ydCB7aW5pdGlhbGV2ZW50TGlzdGVuZXJzLCBjbG9zZVRhc2tGb3JtLCBjbG9zZVByb2plY3RGb3JtfSIsImltcG9ydCB7IHVwZGF0ZVByb2plY3RET00gfSBmcm9tIFwiLi91cGRhdGVQcm9qZWN0RE9NXCI7XHJcbmltcG9ydCB7Y2xvc2VQcm9qZWN0Rm9ybX0gZnJvbSBcIi4vZXZlbnRsaXN0ZW5lcnNcIjtcclxuaW1wb3J0IHt0YXNrRmFjdG9yeX0gZnJvbSBcIi4vdGFza0ZhY3RvcnlcIjtcclxuXHJcbi8vdmFyaWFibGVzXHJcbmxldCBhbGxQcm9qZWN0c0FycmF5ID0gW107XHJcbmxldCBjdXJyZW50cHJvamVjdCA9IDA7XHJcbmxldCBwcm9qZWN0QXJyYXljb3VudGVyID0gMDtcclxuXHJcblxyXG4vL2NyZWF0ZXMgbmV3IHByb2plY3QgaW4gYWxscHJvamVjdHNhcnJheSwgcHV0cyBpdCBvbiB0aGUgcGFnZSAtIGNhbGxlZCBmcm9tIGV2ZW50IGxpc3RlbmVyc1xyXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpeyAgICBcclxuICAgIGFsbFByb2plY3RzQXJyYXlbcHJvamVjdEFycmF5Y291bnRlcl0gPSBwcm9qZWN0RmFjdG9yeShuYW1lKSAgICBcclxuICAgIGFsbFByb2plY3RzQXJyYXlbcHJvamVjdEFycmF5Y291bnRlcl0ucHV0T25QYWdlKCk7XHJcbiAgICBjbG9zZVByb2plY3RGb3JtKCk7XHJcbiAgICBwcm9qZWN0QXJyYXljb3VudGVyKys7XHJcbn1cclxuXHJcbi8vZGVmYXVsdCBwcm9qZWN0IGlzIGhpZ2hsaWdodGVkIHdoZW4gcHJvamVjdCBzdGFydHNcclxuZnVuY3Rpb24gaW5pdGlhbFByb2plY3QoKXtcclxuICAgIGxldCBzdGFydGluZ1Byb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlZmF1bHRcIik7XHJcbiAgICBzdGFydGluZ1Byb2plY3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyZWVuXCI7XHJcbn1cclxuXHJcblxyXG4vL3NlbGVjdHMgdGhlIHByb2plY3Qgd2hlbiBwcm9qZWN0IG5hbWUgaXMgY2xpY2tlZFxyXG4vL2ZpbGxzIHRoZSBhcmVhIHdpdGgganVzdCB0YXNrcyBvZiB0aGUgcHJvamVjdFxyXG5mdW5jdGlvbiBzZWxlY3RQcm9qZWN0KGUpeyAgICBcclxuXHJcbiAgICAvL3RoZSBjb2xvdXIgdG8gY2hhbmdlIHRvIGdyZXkgZm9yIGFsbCBwcm9qZWN0IG5hbWVzXHJcbiAgICBsZXQgYWxsUHJvamVjdEVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInByb2plY3RUaXRsZVwiKTtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhbGxQcm9qZWN0RWxlbWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGFsbFByb2plY3RFbGVtZW50c1tpbmRleF07XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIjsgICAgICAgIFxyXG4gICAgfVxyXG4gICAgLy9qdXN0IGNvbG91ciBpbiB0aGUgc2VsZWN0ZWQgZWxlbWVudFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmVlblwiO1xyXG4gICAgLy9nbyB0aHJvdWdoIGFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXkgaG9sZGluZyBhbGwgdGhlIHByb2plY3RzXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFByb2plY3RzQXJyYXkubGVuZ3RoOyBpKyspIFxyXG4gICAgICAgIHsgIC8vaWYgdGhlIG5hbWUgb2YgZWxlbWVudCBhbmQgdGFyZ2V0IElEIGFyZSB0aGUgc2FtZSwgdGhhdCBkZXRlcm1pbmVzIHRoZSBjdXJyZW50IHByb2plY3Qgc2VsZWN0ZWRcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSBhbGxQcm9qZWN0c0FycmF5W2ldLm5hbWUpIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudHByb2plY3QgPSBpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcmVkcmF3IHByb2plY3RzIGFycmF5IG9uIHRoZSBwYWdlICBcclxuICAgIGFsbFByb2plY3RzQXJyYXlbY3VycmVudHByb2plY3RdLnBvcHVsYXRlQ2hvc2VuUHJvamVjdERPTSgpOyAgICBcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlVGFzayhlKXtcclxuICAgIGFsbFByb2plY3RzQXJyYXlbY3VycmVudHByb2plY3RdLnJlbW92ZVRhc2soZSk7XHJcbn1cclxuXHJcbi8vYWRkcyBhIHRhc2sgdG8gY3VycmVudCBzZWxlY3RlZCBwcm9qZWN0IC0gY2FsbGVkIGZyb20gZXZlbnQgbGlzdGVuZXJzXHJcblxyXG5mdW5jdGlvbiBhZGRUYXNrVG9Qcm9qZWN0KCl7XHJcbiAgICBhbGxQcm9qZWN0c0FycmF5W2N1cnJlbnRwcm9qZWN0XS5hZGRUYXNrKCk7XHJcbn1cclxuXHJcbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKHN1cHBsaWVkTmFtZSkgPT4ge1xyXG4gICAgXHJcbiAgICAvL3NvIGkgY2FuIHNlZSB3aGF0cyBnb2luZyBvbiBpbiBsb2dzXHJcbiAgICBsZXQgbmFtZSA9IHN1cHBsaWVkTmFtZTtcclxuXHJcbiAgICAvL2NyZWF0ZSBhcnJheSBmb3IgdGhpcyBwcm9qZWN0XHJcbiAgICBsZXQgcHJvamVjdEFycmF5ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gcHV0T25QYWdlKCl7ICAgICAgICBcclxuICAgICAgICB1cGRhdGVQcm9qZWN0RE9NKHN1cHBsaWVkTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRhc2s7XHJcbiAgICBmdW5jdGlvbiBhZGRUYXNrKCl7XHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSB0YXNrLCBwdXNoIHRvIGFycmF5XHJcbiAgICAgICAgdGFzayA9IHRhc2tGYWN0b3J5KCk7XHJcbiAgICAgICAgLy8gdGFzay5jcmVhdGVUYXNrKCk7XHJcbiAgICAgICAgdGFzay5wb3B1bGF0ZVRhc2tzRm9yUHJvamVjdCgpO1xyXG4gICAgICAgIHByb2plY3RBcnJheS5wdXNoKHRhc2spOyAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiByZW1vdmVUYXNrKGlkKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIndvcmtpbmcgZm9yIG5vdyBidXQgb25seSByZW1vdmluZyBvbmUgZWxlbWVudCBhbmQgbm90IGNvcnJlY3Qgb25lXCIpXHJcbiAgICAgICAgY29uc29sZS5sb2coaWQpXHJcbiAgICAgICAgcHJvamVjdEFycmF5LnNwbGljZShpZCwgMSk7XHJcbiAgICAgICAgYWxsUHJvamVjdHNBcnJheVtjdXJyZW50cHJvamVjdF0ucG9wdWxhdGVDaG9zZW5Qcm9qZWN0RE9NKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgICAgICAvL3JlZHJhdyBwcm9qZWN0c0Rpc3BsYXkgd2l0aCBlbGVtZW50cyBvZiB0aGUgcHJvamVjdCBldmVyeSB0aW1lIGEgcHJvamVjdCBpcyBjbGlja2VkXHJcbiAgICBmdW5jdGlvbiBwb3B1bGF0ZUNob3NlblByb2plY3RET00oKXtcclxuICAgICAgICBsZXQgZGlzcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5EaXNwbGF5SW5uZXJcIik7XHJcbiAgICAgICAgZGlzcGxheUFyZWEuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHJvamVjdEFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gcHJvamVjdEFycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgZWxlbWVudC5wb3B1bGF0ZVRhc2tzRm9yUHJvamVjdCgpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge3B1dE9uUGFnZSwgYWRkVGFzaywgbmFtZSwgcHJvamVjdEFycmF5LCBwb3B1bGF0ZUNob3NlblByb2plY3RET00sIHJlbW92ZVRhc2t9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcblxyXG5leHBvcnQge2NyZWF0ZVByb2plY3QsIHByb2plY3RGYWN0b3J5LCBzZWxlY3RQcm9qZWN0LCBhZGRUYXNrVG9Qcm9qZWN0LCBpbml0aWFsUHJvamVjdCwgZGVsZXRlVGFza31cclxuXHJcbiIsImltcG9ydCB7YWRkVGFza1RvRE9NfSBmcm9tIFwiLi91cGRhdGVUYXNrRE9NXCI7XHJcblxyXG5sZXQgdGFza051bWJlciA9IDA7XHJcbmNvbnN0IHRhc2tGYWN0b3J5ID0gKCkgPT57XHJcblxyXG4gICAgbGV0IHRhc2t0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIikudmFsdWU7XHJcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkRlc2NyaXB0aW9uXCIpLnZhbHVlO1xyXG4gICAgbGV0IGR1ZWRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZVwiKS52YWx1ZTtcclxuICAgIGxldCB0YXNrcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xyXG4gICAgdGFza051bWJlciA9IHRhc2tOdW1iZXI7XHJcbiAgICB0YXNrTnVtYmVyKys7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVGFza3NGb3JQcm9qZWN0KCl7XHJcbiAgICAgICAgYWRkVGFza1RvRE9NKHRhc2t0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZWRhdGUsIHRhc2twcmlvcml0eSwgdGFza051bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJue3BvcHVsYXRlVGFza3NGb3JQcm9qZWN0fVxyXG59XHJcblxyXG5leHBvcnQge3Rhc2tGYWN0b3J5fSIsIi8vdGhpcyBmdW5jdGlvbiBpcyBzb2xlbHkgZ2V0dGluZyB0aGUgbmFtZSBvZiB0aGUgcHJvamVjdCBhbmQgYWRkaW5nIGl0IHRvIHRoZSBkb21cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVByb2plY3RET00ocHJvamVjdCl7XHJcbiAgICBsZXQgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzRGlzcGxheVwiKTtcclxuICAgIGxldCBuZXdoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgIG5ld2gyLmlubmVyVGV4dCA9IHByb2plY3Q7XHJcbiAgICBuZXdoMi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByb2plY3RUaXRsZVwiKTtcclxuICAgIG5ld2gyLnNldEF0dHJpYnV0ZShcImlkXCIsIHByb2plY3QpO1xyXG4gICAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQobmV3aDIpO1xyXG59XHJcblxyXG5leHBvcnQge3VwZGF0ZVByb2plY3RET019IiwiaW1wb3J0IHsgY2xvc2VUYXNrRm9ybSB9IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XHJcblxyXG4vL3RoaXMgZnVuY3Rpb24gaXMgZ2V0dGluZyB2YWx1ZXMgZnJvbSB0YXNrIGZvcm0gXHJcbi8vYW5kIGFwcGVuZGluZyB0aGUgdGFzayB0byB0aGUgZG9tXHJcblxyXG4vLyBsZXQgdGFza051bWJlciA9IDA7XHJcblxyXG5mdW5jdGlvbiBhZGRUYXNrVG9ET00odGFza3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlZGF0ZSwgdGFza3ByaW9yaXR5LCB0YXNrTnVtYmVyKXtcclxuICAgIFxyXG4gICAgbGV0IHRhc2tBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRGlzcGxheUlubmVyXCIpO1xyXG4gICAgbGV0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XHJcbiAgICBuZXdEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7dGFza051bWJlcn1gKTtcclxuXHJcbiAgICBuZXdEaXYuaW5uZXJIVE1MID0gXHJcbiAgICBgPGgzPiR7dGFza3RpdGxlfTwvaDM+XHJcbiAgICA8cD4ke2Rlc2NyaXB0aW9ufTwvcD5cclxuICAgIDxwPkR1ZTogJHtkdWVkYXRlfTwvcD5cclxuICAgIDxwPlByaW9yaXR5OiAke3Rhc2twcmlvcml0eX08L3A+ICAgIFxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZUJ1dHRvblwiIGlkPVwiJHt0YXNrTnVtYmVyfVwiPiBEZWxldGUgVGFzayA8L2J1dHRvbj5gXHJcblxyXG4gICAgdGFza0FyZWEuYXBwZW5kQ2hpbGQobmV3RGl2KTtcclxuICAgIC8vIHRhc2tOdW1iZXIrKztcclxuICAgIGNsb3NlVGFza0Zvcm0oKTsgICAgXHJcbn1cclxuXHJcbmV4cG9ydCB7YWRkVGFza1RvRE9NfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgaW5pdGlhbFByb2plY3QgfSBmcm9tIFwiLi9wcm9qZWN0RmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBpbml0aWFsZXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9ldmVudGxpc3RlbmVyc1wiO1xyXG5cclxuaW5pdGlhbGV2ZW50TGlzdGVuZXJzKCk7XHJcbmNyZWF0ZVByb2plY3QoXCJkZWZhdWx0XCIpO1xyXG5pbml0aWFsUHJvamVjdCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=