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
/* harmony export */   "addTaskToProject": () => (/* binding */ addTaskToProject)
/* harmony export */ });
/* harmony import */ var _updateProjectDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateProjectDOM */ "./src/updateProjectDOM.js");
/* harmony import */ var _updateTaskDOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateTaskDOM */ "./src/updateTaskDOM.js");
/* harmony import */ var _eventlisteners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventlisteners */ "./src/eventlisteners.js");
/* harmony import */ var _taskFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./taskFactory */ "./src/taskFactory.js");





//variables
let allProjectsArray = [];
let currentproject = 0;
let projectArraycounter = 0

//creates new project in allprojectsarray, puts it on the page
function createProject(name){    
    allProjectsArray[projectArraycounter] = projectFactory(name)    
    allProjectsArray[projectArraycounter].putOnPage();
    (0,_eventlisteners__WEBPACK_IMPORTED_MODULE_2__.closeProjectForm)();   
    projectArraycounter++; 
}

//selects the project when project name is clicked
//want it to fill the area with just tasks of the project
function selectProject(e){
    

    //the colour to change to grey for all project names
    let allProjectElements = document.getElementsByClassName("projectTitle");
    for (let index = 0; index < allProjectElements.length; index++) {
        const element = allProjectElements[index];
        element.style.backgroundColor = "grey";        
    }
    //just colour in the selected element
    document.getElementById(e.target.id).style.backgroundColor = "lightgreen";
    //go through all elements of the array
    for (let i = 0; i < allProjectsArray.length; i++) 
        {  //if the name of element and target ID are the same, that determines the current project selected
            if (e.target.id === allProjectsArray[i].name) 
                {
                currentproject = i;
                
                }
            
        }
        //----------------need to redraw projects array on the page here 
        allProjectsArray[currentproject].populateChosenProjectDOM();
    console.log("current project index number is: " + currentproject);
}

//adds a task to current selected project - called from event listeners
//submit task - currentproject.addTask - or something
function addTaskToProject(){
    allProjectsArray[currentproject].addTask();
    console.log(allProjectsArray[currentproject].projectArray)
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
        const task = (0,_taskFactory__WEBPACK_IMPORTED_MODULE_3__.taskFactory)();
        task.createTask();
        projectArray.push(task);        
        console.log(projectArray)
    }

        //want this function to redraw projectsDisplay with elements of the project every time a project is clicked
    function populateChosenProjectDOM(){
        let displayArea = document.getElementById("mainDisplayInner");
        displayArea.innerHTML = "";
        for (let index = 0; index < projectArray.length; index++) {
            // const element = projectArray[index];
            //UP TO HERE
            //want to redraw now.....
            
            
        }
        // projectArray.forEach(element => {element.addTaskToDOM()});
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

   //lets try to make a class for the tasks and tie that in somehow
    //need to create a class for each task, push the actual task object
    //into the project array. then can clear the dom and just addtasktodom by redrawing dom
    //and populating with array items

const taskFactory = () =>{
    //projectArray is the project+array to push the task to
    //will be called by saying 
    //taskFactory(allProjectsArray[0/1/2/whatever].projectArray)

    function createTask(){
    //needs to get all values from the form
    let tasktitle = document.getElementById("title").value;
    let description = document.getElementById("Description").value;
    let duedate = document.getElementById("due").value;
    let taskpriority = document.getElementById("priority").value;
    //wrap them into object
    //add task to dom
    (0,_updateTaskDOM__WEBPACK_IMPORTED_MODULE_0__.addTaskToDOM)()
    }

    return{createTask}


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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFpRjs7QUFFakYsd0JBQXdCO0FBQ3hCLDJCQUEyQjtBQUMzQix5QkFBeUI7QUFDekIsNEJBQTRCOzs7O0FBSTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw4REFBYTtBQUN2RDtBQUNBLHVDQUF1QyxpRUFBZ0I7QUFDdkQsd0NBQXdDLDhEQUFhO0FBQ3JELENBQUM7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QnNEO0FBQ1Q7QUFDSztBQUNSOztBQUUxQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksaUVBQWdCO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixtQ0FBbUM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDZCQUE2QjtBQUNqRCxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFFBQVEsbUVBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHlEQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDZCQUE2QjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsdUJBQXVCO0FBQ25FOztBQUVBLFlBQVk7QUFDWjtBQUNBOzs7QUFHdUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUYxQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSw0REFBWTtBQUNoQjs7QUFFQSxXQUFXOzs7QUFHWDs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWaUQ7O0FBRWpEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxXQUFXOztBQUU1QztBQUNBLFdBQVcsVUFBVTtBQUNyQixTQUFTLFlBQVk7QUFDckIsY0FBYyxRQUFRO0FBQ3RCLG1CQUFtQixhQUFhOztBQUVoQztBQUNBO0FBQ0EsSUFBSSw4REFBYTs7O0FBR2pCO0FBQ0E7Ozs7Ozs7O1VDN0JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmdFO0FBQ1A7O0FBRXpELHNFQUFxQjtBQUNyQiw4REFBYSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2V2ZW50bGlzdGVuZXJzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Rhc2tGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3VwZGF0ZVByb2plY3RET00uanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlVGFza0RPTS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVByb2plY3QsIHNlbGVjdFByb2plY3QsIGFkZFRhc2tUb1Byb2plY3R9IGZyb20gXCIuL3Byb2plY3RGYWN0b3J5XCI7XG5cbmZ1bmN0aW9uIHNob3dUYXNrRm9ybSgpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybUFyZWFcIikuc3R5bGUuZGlzcGxheSA9IFwiaW5oZXJpdFwiO31cbmZ1bmN0aW9uIHNob3dQcm9qZWN0Rm9ybSgpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdEZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwiaW5oZXJpdFwiO31cbmZ1bmN0aW9uIGNsb3NlVGFza0Zvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1BcmVhXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9XG5mdW5jdGlvbiBjbG9zZVByb2plY3RGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0Rm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7fVxuXG5cblxuZnVuY3Rpb24gaW5pdGlhbGV2ZW50TGlzdGVuZXJzKCl7XG4vL2V2ZW50IGxpc3RlbmVycyBmb3IgbmF2aWdhdGlvblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQuY2xhc3NOYW1lO1xuICAgICAgICBcbiAgICBpZiAodGFyZ2V0ID09PSBcImFkZFRhc2tcIikgc2hvd1Rhc2tGb3JtKCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcImNsb3NlVGFza1wiKSBjbG9zZVRhc2tGb3JtKCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcImFkZFByb2plY3RcIikgc2hvd1Byb2plY3RGb3JtKCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcImNsb3NlUHJvamVjdFwiKSBjbG9zZVByb2plY3RGb3JtKCk7IFxuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJzdWJtaXRQcm9qZWN0XCIpICBjcmVhdGVQcm9qZWN0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdFRpdGxlXCIpLnZhbHVlKTsgIFxuICAgIFxuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJzdWJtaXRUYXNrXCIpICBhZGRUYXNrVG9Qcm9qZWN0KCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInByb2plY3RUaXRsZVwiKSBzZWxlY3RQcm9qZWN0KGUpO1xufSlcbn1cblxuZXhwb3J0IHtpbml0aWFsZXZlbnRMaXN0ZW5lcnMsIGNsb3NlVGFza0Zvcm0sIGNsb3NlUHJvamVjdEZvcm19IiwiaW1wb3J0IHsgdXBkYXRlUHJvamVjdERPTSB9IGZyb20gXCIuL3VwZGF0ZVByb2plY3RET01cIjtcbmltcG9ydCB7YWRkVGFza1RvRE9NfSBmcm9tIFwiLi91cGRhdGVUYXNrRE9NXCI7XG5pbXBvcnQge2Nsb3NlUHJvamVjdEZvcm19IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XG5pbXBvcnQge3Rhc2tGYWN0b3J5fSBmcm9tIFwiLi90YXNrRmFjdG9yeVwiO1xuXG4vL3ZhcmlhYmxlc1xubGV0IGFsbFByb2plY3RzQXJyYXkgPSBbXTtcbmxldCBjdXJyZW50cHJvamVjdCA9IDA7XG5sZXQgcHJvamVjdEFycmF5Y291bnRlciA9IDBcblxuLy9jcmVhdGVzIG5ldyBwcm9qZWN0IGluIGFsbHByb2plY3RzYXJyYXksIHB1dHMgaXQgb24gdGhlIHBhZ2VcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSl7ICAgIFxuICAgIGFsbFByb2plY3RzQXJyYXlbcHJvamVjdEFycmF5Y291bnRlcl0gPSBwcm9qZWN0RmFjdG9yeShuYW1lKSAgICBcbiAgICBhbGxQcm9qZWN0c0FycmF5W3Byb2plY3RBcnJheWNvdW50ZXJdLnB1dE9uUGFnZSgpO1xuICAgIGNsb3NlUHJvamVjdEZvcm0oKTsgICBcbiAgICBwcm9qZWN0QXJyYXljb3VudGVyKys7IFxufVxuXG4vL3NlbGVjdHMgdGhlIHByb2plY3Qgd2hlbiBwcm9qZWN0IG5hbWUgaXMgY2xpY2tlZFxuLy93YW50IGl0IHRvIGZpbGwgdGhlIGFyZWEgd2l0aCBqdXN0IHRhc2tzIG9mIHRoZSBwcm9qZWN0XG5mdW5jdGlvbiBzZWxlY3RQcm9qZWN0KGUpe1xuICAgIFxuXG4gICAgLy90aGUgY29sb3VyIHRvIGNoYW5nZSB0byBncmV5IGZvciBhbGwgcHJvamVjdCBuYW1lc1xuICAgIGxldCBhbGxQcm9qZWN0RWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicHJvamVjdFRpdGxlXCIpO1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhbGxQcm9qZWN0RWxlbWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhbGxQcm9qZWN0RWxlbWVudHNbaW5kZXhdO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JleVwiOyAgICAgICAgXG4gICAgfVxuICAgIC8vanVzdCBjb2xvdXIgaW4gdGhlIHNlbGVjdGVkIGVsZW1lbnRcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlLnRhcmdldC5pZCkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyZWVuXCI7XG4gICAgLy9nbyB0aHJvdWdoIGFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFByb2plY3RzQXJyYXkubGVuZ3RoOyBpKyspIFxuICAgICAgICB7ICAvL2lmIHRoZSBuYW1lIG9mIGVsZW1lbnQgYW5kIHRhcmdldCBJRCBhcmUgdGhlIHNhbWUsIHRoYXQgZGV0ZXJtaW5lcyB0aGUgY3VycmVudCBwcm9qZWN0IHNlbGVjdGVkXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT09IGFsbFByb2plY3RzQXJyYXlbaV0ubmFtZSkgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRwcm9qZWN0ID0gaTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS1uZWVkIHRvIHJlZHJhdyBwcm9qZWN0cyBhcnJheSBvbiB0aGUgcGFnZSBoZXJlIFxuICAgICAgICBhbGxQcm9qZWN0c0FycmF5W2N1cnJlbnRwcm9qZWN0XS5wb3B1bGF0ZUNob3NlblByb2plY3RET00oKTtcbiAgICBjb25zb2xlLmxvZyhcImN1cnJlbnQgcHJvamVjdCBpbmRleCBudW1iZXIgaXM6IFwiICsgY3VycmVudHByb2plY3QpO1xufVxuXG4vL2FkZHMgYSB0YXNrIHRvIGN1cnJlbnQgc2VsZWN0ZWQgcHJvamVjdCAtIGNhbGxlZCBmcm9tIGV2ZW50IGxpc3RlbmVyc1xuLy9zdWJtaXQgdGFzayAtIGN1cnJlbnRwcm9qZWN0LmFkZFRhc2sgLSBvciBzb21ldGhpbmdcbmZ1bmN0aW9uIGFkZFRhc2tUb1Byb2plY3QoKXtcbiAgICBhbGxQcm9qZWN0c0FycmF5W2N1cnJlbnRwcm9qZWN0XS5hZGRUYXNrKCk7XG4gICAgY29uc29sZS5sb2coYWxsUHJvamVjdHNBcnJheVtjdXJyZW50cHJvamVjdF0ucHJvamVjdEFycmF5KVxufVxuXG5jb25zdCBwcm9qZWN0RmFjdG9yeSA9IChzdXBwbGllZE5hbWUpID0+IHtcbiAgICBcbiAgICAvL3NvIGkgY2FuIHNlZSB3aGF0cyBnb2luZyBvbiBpbiBsb2dzXG4gICAgbGV0IG5hbWUgPSBzdXBwbGllZE5hbWU7XG5cbiAgICAvL2NyZWF0ZSBhcnJheSBmb3IgdGhpcyBwcm9qZWN0XG4gICAgbGV0IHByb2plY3RBcnJheSA9IFtdO1xuXG4gICAgZnVuY3Rpb24gcHV0T25QYWdlKCl7ICAgICAgICBcbiAgICAgICAgdXBkYXRlUHJvamVjdERPTShzdXBwbGllZE5hbWUpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBhZGRUYXNrKCl7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgdGFzaywgcHVzaCB0byBhcnJheVxuICAgICAgICBjb25zdCB0YXNrID0gdGFza0ZhY3RvcnkoKTtcbiAgICAgICAgdGFzay5jcmVhdGVUYXNrKCk7XG4gICAgICAgIHByb2plY3RBcnJheS5wdXNoKHRhc2spOyAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RBcnJheSlcbiAgICB9XG5cbiAgICAgICAgLy93YW50IHRoaXMgZnVuY3Rpb24gdG8gcmVkcmF3IHByb2plY3RzRGlzcGxheSB3aXRoIGVsZW1lbnRzIG9mIHRoZSBwcm9qZWN0IGV2ZXJ5IHRpbWUgYSBwcm9qZWN0IGlzIGNsaWNrZWRcbiAgICBmdW5jdGlvbiBwb3B1bGF0ZUNob3NlblByb2plY3RET00oKXtcbiAgICAgICAgbGV0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRGlzcGxheUlubmVyXCIpO1xuICAgICAgICBkaXNwbGF5QXJlYS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHJvamVjdEFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgLy8gY29uc3QgZWxlbWVudCA9IHByb2plY3RBcnJheVtpbmRleF07XG4gICAgICAgICAgICAvL1VQIFRPIEhFUkVcbiAgICAgICAgICAgIC8vd2FudCB0byByZWRyYXcgbm93Li4uLi5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLy8gcHJvamVjdEFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7ZWxlbWVudC5hZGRUYXNrVG9ET00oKX0pO1xuICAgIH1cblxuICAgIHJldHVybiB7cHV0T25QYWdlLCBhZGRUYXNrLCBuYW1lLCBwcm9qZWN0QXJyYXksIHBvcHVsYXRlQ2hvc2VuUHJvamVjdERPTX1cbiAgICB9XG4gICAgXG5cblxuZXhwb3J0IHtjcmVhdGVQcm9qZWN0LCBwcm9qZWN0RmFjdG9yeSwgc2VsZWN0UHJvamVjdCwgYWRkVGFza1RvUHJvamVjdH1cblxuIiwiaW1wb3J0IHthZGRUYXNrVG9ET019IGZyb20gXCIuL3VwZGF0ZVRhc2tET01cIjtcbiAgIC8vbGV0cyB0cnkgdG8gbWFrZSBhIGNsYXNzIGZvciB0aGUgdGFza3MgYW5kIHRpZSB0aGF0IGluIHNvbWVob3dcbiAgICAvL25lZWQgdG8gY3JlYXRlIGEgY2xhc3MgZm9yIGVhY2ggdGFzaywgcHVzaCB0aGUgYWN0dWFsIHRhc2sgb2JqZWN0XG4gICAgLy9pbnRvIHRoZSBwcm9qZWN0IGFycmF5LiB0aGVuIGNhbiBjbGVhciB0aGUgZG9tIGFuZCBqdXN0IGFkZHRhc2t0b2RvbSBieSByZWRyYXdpbmcgZG9tXG4gICAgLy9hbmQgcG9wdWxhdGluZyB3aXRoIGFycmF5IGl0ZW1zXG5cbmNvbnN0IHRhc2tGYWN0b3J5ID0gKCkgPT57XG4gICAgLy9wcm9qZWN0QXJyYXkgaXMgdGhlIHByb2plY3QrYXJyYXkgdG8gcHVzaCB0aGUgdGFzayB0b1xuICAgIC8vd2lsbCBiZSBjYWxsZWQgYnkgc2F5aW5nIFxuICAgIC8vdGFza0ZhY3RvcnkoYWxsUHJvamVjdHNBcnJheVswLzEvMi93aGF0ZXZlcl0ucHJvamVjdEFycmF5KVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFzaygpe1xuICAgIC8vbmVlZHMgdG8gZ2V0IGFsbCB2YWx1ZXMgZnJvbSB0aGUgZm9ybVxuICAgIGxldCB0YXNrdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpdGxlXCIpLnZhbHVlO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRGVzY3JpcHRpb25cIikudmFsdWU7XG4gICAgbGV0IGR1ZWRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZVwiKS52YWx1ZTtcbiAgICBsZXQgdGFza3ByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcbiAgICAvL3dyYXAgdGhlbSBpbnRvIG9iamVjdFxuICAgIC8vYWRkIHRhc2sgdG8gZG9tXG4gICAgYWRkVGFza1RvRE9NKClcbiAgICB9XG5cbiAgICByZXR1cm57Y3JlYXRlVGFza31cblxuXG59XG5cbmV4cG9ydCB7dGFza0ZhY3Rvcnl9IiwiLy90aGlzIGZ1bmN0aW9uIGlzIHNvbGVseSBnZXR0aW5nIHRoZSBuYW1lIG9mIHRoZSBwcm9qZWN0IGFuZCBhZGRpbmcgaXQgdG8gdGhlIGRvbVxuXG5cbmZ1bmN0aW9uIHVwZGF0ZVByb2plY3RET00ocHJvamVjdCl7XG4gICAgbGV0IHByb2plY3RBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0c0Rpc3BsYXlcIik7XG4gICAgbGV0IG5ld2gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgIG5ld2gyLmlubmVyVGV4dCA9IHByb2plY3Q7XG4gICAgbmV3aDIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcm9qZWN0VGl0bGVcIik7XG4gICAgbmV3aDIuc2V0QXR0cmlidXRlKFwiaWRcIiwgcHJvamVjdCk7XG4gICAgcHJvamVjdEFyZWEuYXBwZW5kQ2hpbGQobmV3aDIpO1xufVxuXG5cblxuXG5leHBvcnQge3VwZGF0ZVByb2plY3RET019IiwiaW1wb3J0IHsgY2xvc2VUYXNrRm9ybSB9IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XG5cbi8vdGhpcyBmdW5jdGlvbiBpcyBnZXR0aW5nIHZhbHVlcyBmcm9tIHRhc2sgZm9ybSBcbi8vYW5kIGFwcGVuZGluZyB0aGUgdGFzayB0byB0aGUgZG9tXG5cbmxldCB0YXNrTnVtYmVyID0gMDtcblxuZnVuY3Rpb24gYWRkVGFza1RvRE9NKCl7XG4gICAgbGV0IHRhc2t0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIikudmFsdWU7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJEZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgICBsZXQgZHVlZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlXCIpLnZhbHVlO1xuICAgIGxldCB0YXNrcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xuICAgIFxuICAgIGxldCB0YXNrQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbkRpc3BsYXlJbm5lclwiKTtcbiAgICBsZXQgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICBuZXdEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7dGFza051bWJlcn1gKTtcblxuICAgIG5ld0Rpdi5pbm5lckhUTUwgPSBcbiAgICBgPGgzPiR7dGFza3RpdGxlfTwvaDM+XG4gICAgPHA+JHtkZXNjcmlwdGlvbn08L3A+XG4gICAgPHA+RHVlOiAke2R1ZWRhdGV9PC9wPlxuICAgIDxwPlByaW9yaXR5OiAke3Rhc2twcmlvcml0eX08L3A+YFxuXG4gICAgdGFza0FyZWEuYXBwZW5kQ2hpbGQobmV3RGl2KTtcbiAgICB0YXNrTnVtYmVyKys7XG4gICAgY2xvc2VUYXNrRm9ybSgpO1xuXG5cbiAgICBcbn1cblxuZXhwb3J0IHthZGRUYXNrVG9ET019IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVQcm9qZWN0LCBzZWxlY3RQcm9qZWN0IH0gZnJvbSBcIi4vcHJvamVjdEZhY3RvcnlcIjtcbmltcG9ydCB7IGluaXRpYWxldmVudExpc3RlbmVycyB9IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XG5cbmluaXRpYWxldmVudExpc3RlbmVycygpO1xuY3JlYXRlUHJvamVjdChcImRlZmF1bHRcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=