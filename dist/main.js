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
        task.createTask();
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

    function createTask(){
    (0,_updateTaskDOM__WEBPACK_IMPORTED_MODULE_0__.addTaskToDOM)()
    }

    function populateTasksForProject(){

        let taskArea = document.getElementById("mainDisplayInner");
        let newDiv = document.createElement("DIV");
        // newDiv.setAttribute("id", `${taskNumber}`);

        newDiv.innerHTML = 
        `<h3>${tasktitle}</h3>
        <p>${description}</p>
        <p>Due: ${duedate}</p>
        <p>Priority: ${taskpriority}</p>`

        taskArea.appendChild(newDiv);     
    }

    return{createTask, populateTasksForProject}


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

function addTaskToDOM(){
    let tasktitle = document.getElementById("title").value;
    let description = document.getElementById("Description").value;
    let duedate = document.getElementById("due").value;
    let taskpriority = document.getElementById("priority").value;
    
    let taskArea = document.getElementById("mainDisplayInner");
    let newDiv = document.createElement("DIV");
    newDiv.setAttribute("id", `${taskNumber}`);

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
(0,_projectFactory__WEBPACK_IMPORTED_MODULE_0__.initialProject)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFpRjs7QUFFakYsd0JBQXdCO0FBQ3hCLDJCQUEyQjtBQUMzQix5QkFBeUI7QUFDekIsNEJBQTRCOzs7O0FBSTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw4REFBYTtBQUN2RCx1Q0FBdUMsaUVBQWdCO0FBQ3ZELHdDQUF3Qyw4REFBYTtBQUNyRCxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QnNEO0FBQ0o7QUFDUjs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlFQUFnQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLG1DQUFtQztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pELFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLG1FQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix5REFBVztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qiw2QkFBNkI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTs7O0FBR3VGOzs7Ozs7Ozs7Ozs7Ozs7OztBQzNGMUM7OztBQUc3Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksNERBQVk7QUFDaEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXOztBQUVuRDtBQUNBLGVBQWUsVUFBVTtBQUN6QixhQUFhLFlBQVk7QUFDekIsa0JBQWtCLFFBQVE7QUFDMUIsdUJBQXVCLGFBQWE7O0FBRXBDO0FBQ0E7O0FBRUEsV0FBVzs7O0FBR1g7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUaUQ7O0FBRWpEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxXQUFXOztBQUU1QztBQUNBLFdBQVcsVUFBVTtBQUNyQixTQUFTLFlBQVk7QUFDckIsY0FBYyxRQUFRO0FBQ3RCLG1CQUFtQixhQUFhOztBQUVoQztBQUNBO0FBQ0EsSUFBSSw4REFBYTs7O0FBR2pCO0FBQ0E7Ozs7Ozs7O1VDN0JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmlFO0FBQ1I7O0FBRXpELHNFQUFxQjtBQUNyQiw4REFBYTtBQUNiLCtEQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvZXZlbnRsaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcHJvamVjdEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdGFza0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlUHJvamVjdERPTS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy91cGRhdGVUYXNrRE9NLmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgc2VsZWN0UHJvamVjdCwgYWRkVGFza1RvUHJvamVjdH0gZnJvbSBcIi4vcHJvamVjdEZhY3RvcnlcIjtcblxuZnVuY3Rpb24gc2hvd1Rhc2tGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtQXJlYVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmhlcml0XCI7fVxuZnVuY3Rpb24gc2hvd1Byb2plY3RGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0Rm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmhlcml0XCI7fVxuZnVuY3Rpb24gY2xvc2VUYXNrRm9ybSgpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybUFyZWFcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO31cbmZ1bmN0aW9uIGNsb3NlUHJvamVjdEZvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9XG5cblxuXG5mdW5jdGlvbiBpbml0aWFsZXZlbnRMaXN0ZW5lcnMoKXtcbi8vZXZlbnQgbGlzdGVuZXJzIGZvciBuYXZpZ2F0aW9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc05hbWU7XG4gICAgICAgIFxuICAgIGlmICh0YXJnZXQgPT09IFwiYWRkVGFza1wiKSBzaG93VGFza0Zvcm0oKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiY2xvc2VUYXNrXCIpIGNsb3NlVGFza0Zvcm0oKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiYWRkUHJvamVjdFwiKSBzaG93UHJvamVjdEZvcm0oKTtcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwiY2xvc2VQcm9qZWN0XCIpIGNsb3NlUHJvamVjdEZvcm0oKTsgXG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInN1Ym1pdFByb2plY3RcIikgIGNyZWF0ZVByb2plY3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0VGl0bGVcIikudmFsdWUpOyBcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwic3VibWl0VGFza1wiKSAgYWRkVGFza1RvUHJvamVjdCgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJwcm9qZWN0VGl0bGVcIikgc2VsZWN0UHJvamVjdChlKTtcbn0pXG59XG5leHBvcnQge2luaXRpYWxldmVudExpc3RlbmVycywgY2xvc2VUYXNrRm9ybSwgY2xvc2VQcm9qZWN0Rm9ybX0iLCJpbXBvcnQgeyB1cGRhdGVQcm9qZWN0RE9NIH0gZnJvbSBcIi4vdXBkYXRlUHJvamVjdERPTVwiO1xuaW1wb3J0IHtjbG9zZVByb2plY3RGb3JtfSBmcm9tIFwiLi9ldmVudGxpc3RlbmVyc1wiO1xuaW1wb3J0IHt0YXNrRmFjdG9yeX0gZnJvbSBcIi4vdGFza0ZhY3RvcnlcIjtcblxuLy92YXJpYWJsZXNcbmxldCBhbGxQcm9qZWN0c0FycmF5ID0gW107XG5sZXQgY3VycmVudHByb2plY3QgPSAwO1xubGV0IHByb2plY3RBcnJheWNvdW50ZXIgPSAwXG5cbi8vY3JlYXRlcyBuZXcgcHJvamVjdCBpbiBhbGxwcm9qZWN0c2FycmF5LCBwdXRzIGl0IG9uIHRoZSBwYWdlIC0gY2FsbGVkIGZyb20gZXZlbnQgbGlzdGVuZXJzXG5mdW5jdGlvbiBjcmVhdGVQcm9qZWN0KG5hbWUpeyAgICBcbiAgICBhbGxQcm9qZWN0c0FycmF5W3Byb2plY3RBcnJheWNvdW50ZXJdID0gcHJvamVjdEZhY3RvcnkobmFtZSkgICAgXG4gICAgYWxsUHJvamVjdHNBcnJheVtwcm9qZWN0QXJyYXljb3VudGVyXS5wdXRPblBhZ2UoKTtcbiAgICBjbG9zZVByb2plY3RGb3JtKCk7ICAgXG4gICAgcHJvamVjdEFycmF5Y291bnRlcisrOyBcbn1cblxuLy9kZWZhdWx0IHByb2plY3QgaXMgaGlnaGxpZ2h0ZWQgd2hlbiBwcm9qZWN0IHN0YXJ0c1xuZnVuY3Rpb24gaW5pdGlhbFByb2plY3QoKXtcbiAgICBsZXQgc3RhcnRpbmdQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWZhdWx0XCIpO1xuICAgIHN0YXJ0aW5nUHJvamVjdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Z3JlZW5cIjtcbn1cblxuXG4vL3NlbGVjdHMgdGhlIHByb2plY3Qgd2hlbiBwcm9qZWN0IG5hbWUgaXMgY2xpY2tlZFxuLy9maWxscyB0aGUgYXJlYSB3aXRoIGp1c3QgdGFza3Mgb2YgdGhlIHByb2plY3RcbmZ1bmN0aW9uIHNlbGVjdFByb2plY3QoZSl7ICAgIFxuXG4gICAgLy90aGUgY29sb3VyIHRvIGNoYW5nZSB0byBncmV5IGZvciBhbGwgcHJvamVjdCBuYW1lc1xuICAgIGxldCBhbGxQcm9qZWN0RWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdFRpdGxlXCIpO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhbGxQcm9qZWN0RWxlbWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhbGxQcm9qZWN0RWxlbWVudHNbaW5kZXhdO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiOyAgICAgICAgXG4gICAgfVxuICAgIC8vanVzdCBjb2xvdXIgaW4gdGhlIHNlbGVjdGVkIGVsZW1lbnRcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyZWVuXCI7XG4gICAgLy9nbyB0aHJvdWdoIGFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXkgaG9sZGluZyBhbGwgdGhlIHByb2plY3RzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxQcm9qZWN0c0FycmF5Lmxlbmd0aDsgaSsrKSBcbiAgICAgICAgeyAgLy9pZiB0aGUgbmFtZSBvZiBlbGVtZW50IGFuZCB0YXJnZXQgSUQgYXJlIHRoZSBzYW1lLCB0aGF0IGRldGVybWluZXMgdGhlIGN1cnJlbnQgcHJvamVjdCBzZWxlY3RlZFxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSBhbGxQcm9qZWN0c0FycmF5W2ldLm5hbWUpIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50cHJvamVjdCA9IGk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIC8vcmVkcmF3IHByb2plY3RzIGFycmF5IG9uIHRoZSBwYWdlICBcbiAgICBhbGxQcm9qZWN0c0FycmF5W2N1cnJlbnRwcm9qZWN0XS5wb3B1bGF0ZUNob3NlblByb2plY3RET00oKTsgICAgXG59XG5cbi8vYWRkcyBhIHRhc2sgdG8gY3VycmVudCBzZWxlY3RlZCBwcm9qZWN0IC0gY2FsbGVkIGZyb20gZXZlbnQgbGlzdGVuZXJzXG5cbmZ1bmN0aW9uIGFkZFRhc2tUb1Byb2plY3QoKXtcbiAgICBhbGxQcm9qZWN0c0FycmF5W2N1cnJlbnRwcm9qZWN0XS5hZGRUYXNrKCk7XG59XG5cbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKHN1cHBsaWVkTmFtZSkgPT4ge1xuICAgIFxuICAgIC8vc28gaSBjYW4gc2VlIHdoYXRzIGdvaW5nIG9uIGluIGxvZ3NcbiAgICBsZXQgbmFtZSA9IHN1cHBsaWVkTmFtZTtcblxuICAgIC8vY3JlYXRlIGFycmF5IGZvciB0aGlzIHByb2plY3RcbiAgICBsZXQgcHJvamVjdEFycmF5ID0gW107XG5cbiAgICBmdW5jdGlvbiBwdXRPblBhZ2UoKXsgICAgICAgIFxuICAgICAgICB1cGRhdGVQcm9qZWN0RE9NKHN1cHBsaWVkTmFtZSk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGFkZFRhc2soKXtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSB0YXNrLCBwdXNoIHRvIGFycmF5XG4gICAgICAgIGNvbnN0IHRhc2sgPSB0YXNrRmFjdG9yeSgpO1xuICAgICAgICB0YXNrLmNyZWF0ZVRhc2soKTtcbiAgICAgICAgcHJvamVjdEFycmF5LnB1c2godGFzayk7ICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdEFycmF5KVxuICAgIH1cblxuICAgICAgICAvL3JlZHJhdyBwcm9qZWN0c0Rpc3BsYXkgd2l0aCBlbGVtZW50cyBvZiB0aGUgcHJvamVjdCBldmVyeSB0aW1lIGEgcHJvamVjdCBpcyBjbGlja2VkXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVDaG9zZW5Qcm9qZWN0RE9NKCl7XG4gICAgICAgIGxldCBkaXNwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkRpc3BsYXlJbm5lclwiKTtcbiAgICAgICAgZGlzcGxheUFyZWEuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHByb2plY3RBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBwcm9qZWN0QXJyYXlbaW5kZXhdO1xuICAgICAgICAgICAgZWxlbWVudC5wb3B1bGF0ZVRhc2tzRm9yUHJvamVjdCgpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIFxuICAgIH1cblxuICAgIHJldHVybiB7cHV0T25QYWdlLCBhZGRUYXNrLCBuYW1lLCBwcm9qZWN0QXJyYXksIHBvcHVsYXRlQ2hvc2VuUHJvamVjdERPTX1cbiAgICB9XG4gICAgXG5cblxuZXhwb3J0IHtjcmVhdGVQcm9qZWN0LCBwcm9qZWN0RmFjdG9yeSwgc2VsZWN0UHJvamVjdCwgYWRkVGFza1RvUHJvamVjdCwgaW5pdGlhbFByb2plY3R9XG5cbiIsImltcG9ydCB7YWRkVGFza1RvRE9NfSBmcm9tIFwiLi91cGRhdGVUYXNrRE9NXCI7XG5cblxuY29uc3QgdGFza0ZhY3RvcnkgPSAoKSA9PntcblxuICAgIGxldCB0YXNrdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpdGxlXCIpLnZhbHVlO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRGVzY3JpcHRpb25cIikudmFsdWU7XG4gICAgbGV0IGR1ZWRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZVwiKS52YWx1ZTtcbiAgICBsZXQgdGFza3ByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2soKXtcbiAgICBhZGRUYXNrVG9ET00oKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVGFza3NGb3JQcm9qZWN0KCl7XG5cbiAgICAgICAgbGV0IHRhc2tBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRGlzcGxheUlubmVyXCIpO1xuICAgICAgICBsZXQgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgLy8gbmV3RGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3Rhc2tOdW1iZXJ9YCk7XG5cbiAgICAgICAgbmV3RGl2LmlubmVySFRNTCA9IFxuICAgICAgICBgPGgzPiR7dGFza3RpdGxlfTwvaDM+XG4gICAgICAgIDxwPiR7ZGVzY3JpcHRpb259PC9wPlxuICAgICAgICA8cD5EdWU6ICR7ZHVlZGF0ZX08L3A+XG4gICAgICAgIDxwPlByaW9yaXR5OiAke3Rhc2twcmlvcml0eX08L3A+YFxuXG4gICAgICAgIHRhc2tBcmVhLmFwcGVuZENoaWxkKG5ld0Rpdik7ICAgICBcbiAgICB9XG5cbiAgICByZXR1cm57Y3JlYXRlVGFzaywgcG9wdWxhdGVUYXNrc0ZvclByb2plY3R9XG5cblxufVxuXG5leHBvcnQge3Rhc2tGYWN0b3J5fSIsIi8vdGhpcyBmdW5jdGlvbiBpcyBzb2xlbHkgZ2V0dGluZyB0aGUgbmFtZSBvZiB0aGUgcHJvamVjdCBhbmQgYWRkaW5nIGl0IHRvIHRoZSBkb21cblxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdERPTShwcm9qZWN0KXtcbiAgICBsZXQgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzRGlzcGxheVwiKTtcbiAgICBsZXQgbmV3aDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgbmV3aDIuaW5uZXJUZXh0ID0gcHJvamVjdDtcbiAgICBuZXdoMi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByb2plY3RUaXRsZVwiKTtcbiAgICBuZXdoMi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBwcm9qZWN0KTtcbiAgICBwcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChuZXdoMik7XG59XG5cbmV4cG9ydCB7dXBkYXRlUHJvamVjdERPTX0iLCJpbXBvcnQgeyBjbG9zZVRhc2tGb3JtIH0gZnJvbSBcIi4vZXZlbnRsaXN0ZW5lcnNcIjtcblxuLy90aGlzIGZ1bmN0aW9uIGlzIGdldHRpbmcgdmFsdWVzIGZyb20gdGFzayBmb3JtIFxuLy9hbmQgYXBwZW5kaW5nIHRoZSB0YXNrIHRvIHRoZSBkb21cblxubGV0IHRhc2tOdW1iZXIgPSAwO1xuXG5mdW5jdGlvbiBhZGRUYXNrVG9ET00oKXtcbiAgICBsZXQgdGFza3RpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aXRsZVwiKS52YWx1ZTtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIkRlc2NyaXB0aW9uXCIpLnZhbHVlO1xuICAgIGxldCBkdWVkYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVcIikudmFsdWU7XG4gICAgbGV0IHRhc2twcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpb3JpdHlcIikudmFsdWU7XG4gICAgXG4gICAgbGV0IHRhc2tBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRGlzcGxheUlubmVyXCIpO1xuICAgIGxldCBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgIG5ld0Rpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHt0YXNrTnVtYmVyfWApO1xuXG4gICAgbmV3RGl2LmlubmVySFRNTCA9IFxuICAgIGA8aDM+JHt0YXNrdGl0bGV9PC9oMz5cbiAgICA8cD4ke2Rlc2NyaXB0aW9ufTwvcD5cbiAgICA8cD5EdWU6ICR7ZHVlZGF0ZX08L3A+XG4gICAgPHA+UHJpb3JpdHk6ICR7dGFza3ByaW9yaXR5fTwvcD5gXG5cbiAgICB0YXNrQXJlYS5hcHBlbmRDaGlsZChuZXdEaXYpO1xuICAgIHRhc2tOdW1iZXIrKztcbiAgICBjbG9zZVRhc2tGb3JtKCk7XG5cblxuICAgIFxufVxuXG5leHBvcnQge2FkZFRhc2tUb0RPTX0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZVByb2plY3QsIGluaXRpYWxQcm9qZWN0IH0gZnJvbSBcIi4vcHJvamVjdEZhY3RvcnlcIjtcbmltcG9ydCB7IGluaXRpYWxldmVudExpc3RlbmVycyB9IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XG5cbmluaXRpYWxldmVudExpc3RlbmVycygpO1xuY3JlYXRlUHJvamVjdChcImRlZmF1bHRcIik7XG5pbml0aWFsUHJvamVjdCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9