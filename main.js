/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/changePriority.js":
/*!*******************************!*\
  !*** ./src/changePriority.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changePriority": () => (/* binding */ changePriority)
/* harmony export */ });
//this will change priority of the task
//update a color depending on priority level

function changePriority(id, divname, value){

    //name is value of the div container
    let div = document.getElementById(divname);

    
   if (value === "high") {
       div.style.backgroundColor = "green";
        //this is hacky, arent changing actual values of task so it doesnt stick
       document.getElementById(`priorityArea${id}`).innerText = "Priority: low";
       //need to change the actual tasks priority ???
   }
   else if (value === "low") {       
       div.style.backgroundColor = "orange";
        //this is hacky, arent changing actual values of task so it doesnt stick
       document.getElementById(`priorityArea${id}`).innerText = "Priority: high"
       //need to change the actual tasks priority ???
   }
 }



/***/ }),

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
/* harmony import */ var _projectController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectController */ "./src/projectController.js");
/* harmony import */ var _changePriority__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./changePriority */ "./src/changePriority.js");




function showTaskForm(){document.getElementById("formArea").style.display = "inherit";}
function showProjectForm(){document.getElementById("projectForm").style.display = "inherit";}
function closeTaskForm(){document.getElementById("formArea").style.display = "none";}
function closeProjectForm(){document.getElementById("projectForm").style.display = "none";}



function initialeventListeners(){
//event listeners for functionality
document.addEventListener("click", (e) => {
    const target = e.target.className;
    const buttonID = e.target.id;   
    const name = e.target.name; 
    const value = e.target.value;
        
    if (target === "addTask") showTaskForm();
    else if (target === "closeTask") closeTaskForm();
    else if (target === "addProject") showProjectForm();
    else if (target === "closeProject") closeProjectForm(); 
    else if (target === "submitProject")  (0,_projectController__WEBPACK_IMPORTED_MODULE_0__.createProject)(document.getElementById("projectTitle").value); 
    else if (target === "submitTask")  (0,_projectController__WEBPACK_IMPORTED_MODULE_0__.addTaskToProject)();
    else if (target === "projectTitle") (0,_projectController__WEBPACK_IMPORTED_MODULE_0__.selectProject)(e);
    else if (target === "deleteButton") (0,_projectController__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(buttonID);
    else if (target === "projectButton") (0,_projectController__WEBPACK_IMPORTED_MODULE_0__.deleteProject)(buttonID);
    else if (target === "priorityButton") (0,_changePriority__WEBPACK_IMPORTED_MODULE_1__.changePriority)(buttonID, name, value)
    
})

}


/***/ }),

/***/ "./src/projectController.js":
/*!**********************************!*\
  !*** ./src/projectController.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProject": () => (/* binding */ createProject),
/* harmony export */   "projectFactory": () => (/* binding */ projectFactory),
/* harmony export */   "selectProject": () => (/* binding */ selectProject),
/* harmony export */   "addTaskToProject": () => (/* binding */ addTaskToProject),
/* harmony export */   "initialProject": () => (/* binding */ initialProject),
/* harmony export */   "deleteTask": () => (/* binding */ deleteTask),
/* harmony export */   "deleteProject": () => (/* binding */ deleteProject),
/* harmony export */   "allProjectsArray": () => (/* binding */ allProjectsArray),
/* harmony export */   "currentproject": () => (/* binding */ currentproject)
/* harmony export */ });
/* harmony import */ var _updateProjectDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateProjectDOM */ "./src/updateProjectDOM.js");
/* harmony import */ var _eventlisteners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventlisteners */ "./src/eventlisteners.js");
/* harmony import */ var _taskFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./taskFactory */ "./src/taskFactory.js");




//variables
let allProjectsArray = [];
let currentproject = 0;
let projectArraycounter = 0;
let buttonCounter =0;

//creates new project in allprojectsarray, puts it on the page - called from event listeners
function createProject(name){    
    allProjectsArray[projectArraycounter] = projectFactory(name)    
    allProjectsArray[projectArraycounter].putOnPage(buttonCounter);
    (0,_eventlisteners__WEBPACK_IMPORTED_MODULE_1__.closeProjectForm)();
    projectArraycounter++;  
    buttonCounter++;  
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
    //redraw that projects tasks(array) on the page  
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
    buttonCounter = 0;
    projectArraycounter--;
    for (let index = 0; index < allProjectsArray.length; index++) {
        
        allProjectsArray[index].putOnPage(buttonCounter);     
        buttonCounter++;      
    }
    //make default highlighted
    initialProject();  
}

const projectFactory = (suppliedName) => {
    
    //so i can see whats going on in logs
    let name = suppliedName;

    //create array for this project
    let projectArray = [];

    function putOnPage(buttonCounter){        
        (0,_updateProjectDOM__WEBPACK_IMPORTED_MODULE_0__.updateProjectDOM)(suppliedName, buttonCounter);          
    }
   

    let task;
    let taskNumber = 0;
    function addTask(){               
        // create the task
        task = (0,_taskFactory__WEBPACK_IMPORTED_MODULE_2__.taskFactory)(taskNumber);
        //draw the task out
        task.populateTasks(taskNumber)
        //push to array
        projectArray.push(task);  
        
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
            element.populateTasks(index);                
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
    
    function changePriority(){
        if (taskpriority === "high") {taskpriority === "low"}
        else if (taskpriority === "low") {taskpriority === "high"}
    }
    
    
    //function for when tasks have been removed
 
    function populateTasks(index){        
        (0,_updateTaskDOM__WEBPACK_IMPORTED_MODULE_0__.addTaskToDOM)(tasktitle, description, duedate, taskpriority, index);        
    }

    return{thistaskNumber, populateTasks, changePriority}
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

function addTaskToDOM(tasktitle, description, duedate, taskpriority, thistaskNumber){
    
    let taskArea = document.getElementById("mainDisplayInner");
    let newDiv = document.createElement("DIV");
    newDiv.setAttribute("id", `div${thistaskNumber}`);
    
      

    if (taskpriority === "high") {

        newDiv.style.backgroundColor = "orange"
    }
    else if (taskpriority === "low"){

        newDiv.style.backgroundColor = "green"
    }

    newDiv.innerHTML = 
    `<h3>${tasktitle}</h3>
    <p>${description}</p>
    <p>Due: ${duedate}</p>
    <p id="priorityArea${thistaskNumber}">Priority: ${taskpriority}</p>
    <button class="priorityButton" id="${thistaskNumber}" name="div${thistaskNumber}" value="${taskpriority}">Change Priority</button>
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
/* harmony import */ var _projectController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectController */ "./src/projectController.js");
/* harmony import */ var _eventlisteners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventlisteners */ "./src/eventlisteners.js");



(0,_eventlisteners__WEBPACK_IMPORTED_MODULE_1__.initialeventListeners)();
(0,_projectController__WEBPACK_IMPORTED_MODULE_0__.createProject)("default");
(0,_projectController__WEBPACK_IMPORTED_MODULE_0__.initialProject)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTm9FO0FBQ1g7O0FBRXpELHNFQUFxQjtBQUNyQixpRUFBYTtBQUNiLGtFQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvY2hhbmdlUHJpb3JpdHkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvZXZlbnRsaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvcHJvamVjdENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdGFza0ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlUHJvamVjdERPTS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy91cGRhdGVUYXNrRE9NLmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy90aGlzIHdpbGwgY2hhbmdlIHByaW9yaXR5IG9mIHRoZSB0YXNrXG4vL3VwZGF0ZSBhIGNvbG9yIGRlcGVuZGluZyBvbiBwcmlvcml0eSBsZXZlbFxuXG5mdW5jdGlvbiBjaGFuZ2VQcmlvcml0eShpZCwgZGl2bmFtZSwgdmFsdWUpe1xuXG4gICAgLy9uYW1lIGlzIHZhbHVlIG9mIHRoZSBkaXYgY29udGFpbmVyXG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRpdm5hbWUpO1xuXG4gICAgXG4gICBpZiAodmFsdWUgPT09IFwiaGlnaFwiKSB7XG4gICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiZ3JlZW5cIjtcbiAgICAgICAgLy90aGlzIGlzIGhhY2t5LCBhcmVudCBjaGFuZ2luZyBhY3R1YWwgdmFsdWVzIG9mIHRhc2sgc28gaXQgZG9lc250IHN0aWNrXG4gICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByaW9yaXR5QXJlYSR7aWR9YCkuaW5uZXJUZXh0ID0gXCJQcmlvcml0eTogbG93XCI7XG4gICAgICAgLy9uZWVkIHRvIGNoYW5nZSB0aGUgYWN0dWFsIHRhc2tzIHByaW9yaXR5ID8/P1xuICAgfVxuICAgZWxzZSBpZiAodmFsdWUgPT09IFwibG93XCIpIHsgICAgICAgXG4gICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwib3JhbmdlXCI7XG4gICAgICAgIC8vdGhpcyBpcyBoYWNreSwgYXJlbnQgY2hhbmdpbmcgYWN0dWFsIHZhbHVlcyBvZiB0YXNrIHNvIGl0IGRvZXNudCBzdGlja1xuICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwcmlvcml0eUFyZWEke2lkfWApLmlubmVyVGV4dCA9IFwiUHJpb3JpdHk6IGhpZ2hcIlxuICAgICAgIC8vbmVlZCB0byBjaGFuZ2UgdGhlIGFjdHVhbCB0YXNrcyBwcmlvcml0eSA/Pz9cbiAgIH1cbiB9XG5cbmV4cG9ydCB7Y2hhbmdlUHJpb3JpdHl9IiwiaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgc2VsZWN0UHJvamVjdCwgYWRkVGFza1RvUHJvamVjdCwgZGVsZXRlVGFzaywgZGVsZXRlUHJvamVjdH0gZnJvbSBcIi4vcHJvamVjdENvbnRyb2xsZXJcIjtcbmltcG9ydCB7Y2hhbmdlUHJpb3JpdHl9IGZyb20gXCIuL2NoYW5nZVByaW9yaXR5XCI7XG5cblxuZnVuY3Rpb24gc2hvd1Rhc2tGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtQXJlYVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmhlcml0XCI7fVxuZnVuY3Rpb24gc2hvd1Byb2plY3RGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0Rm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmhlcml0XCI7fVxuZnVuY3Rpb24gY2xvc2VUYXNrRm9ybSgpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybUFyZWFcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO31cbmZ1bmN0aW9uIGNsb3NlUHJvamVjdEZvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9XG5cblxuXG5mdW5jdGlvbiBpbml0aWFsZXZlbnRMaXN0ZW5lcnMoKXtcbi8vZXZlbnQgbGlzdGVuZXJzIGZvciBmdW5jdGlvbmFsaXR5XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc05hbWU7XG4gICAgY29uc3QgYnV0dG9uSUQgPSBlLnRhcmdldC5pZDsgICBcbiAgICBjb25zdCBuYW1lID0gZS50YXJnZXQubmFtZTsgXG4gICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgXG4gICAgaWYgKHRhcmdldCA9PT0gXCJhZGRUYXNrXCIpIHNob3dUYXNrRm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJjbG9zZVRhc2tcIikgY2xvc2VUYXNrRm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJhZGRQcm9qZWN0XCIpIHNob3dQcm9qZWN0Rm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJjbG9zZVByb2plY3RcIikgY2xvc2VQcm9qZWN0Rm9ybSgpOyBcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwic3VibWl0UHJvamVjdFwiKSAgY3JlYXRlUHJvamVjdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RUaXRsZVwiKS52YWx1ZSk7IFxuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJzdWJtaXRUYXNrXCIpICBhZGRUYXNrVG9Qcm9qZWN0KCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInByb2plY3RUaXRsZVwiKSBzZWxlY3RQcm9qZWN0KGUpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJkZWxldGVCdXR0b25cIikgZGVsZXRlVGFzayhidXR0b25JRCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInByb2plY3RCdXR0b25cIikgZGVsZXRlUHJvamVjdChidXR0b25JRCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInByaW9yaXR5QnV0dG9uXCIpIGNoYW5nZVByaW9yaXR5KGJ1dHRvbklELCBuYW1lLCB2YWx1ZSlcbiAgICBcbn0pXG5cbn1cbmV4cG9ydCB7aW5pdGlhbGV2ZW50TGlzdGVuZXJzLCBjbG9zZVRhc2tGb3JtLCBjbG9zZVByb2plY3RGb3JtfSIsImltcG9ydCB7IHVwZGF0ZVByb2plY3RET00gfSBmcm9tIFwiLi91cGRhdGVQcm9qZWN0RE9NXCI7XG5pbXBvcnQge2Nsb3NlUHJvamVjdEZvcm19IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XG5pbXBvcnQge3Rhc2tGYWN0b3J5fSBmcm9tIFwiLi90YXNrRmFjdG9yeVwiO1xuXG4vL3ZhcmlhYmxlc1xubGV0IGFsbFByb2plY3RzQXJyYXkgPSBbXTtcbmxldCBjdXJyZW50cHJvamVjdCA9IDA7XG5sZXQgcHJvamVjdEFycmF5Y291bnRlciA9IDA7XG5sZXQgYnV0dG9uQ291bnRlciA9MDtcblxuLy9jcmVhdGVzIG5ldyBwcm9qZWN0IGluIGFsbHByb2plY3RzYXJyYXksIHB1dHMgaXQgb24gdGhlIHBhZ2UgLSBjYWxsZWQgZnJvbSBldmVudCBsaXN0ZW5lcnNcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSl7ICAgIFxuICAgIGFsbFByb2plY3RzQXJyYXlbcHJvamVjdEFycmF5Y291bnRlcl0gPSBwcm9qZWN0RmFjdG9yeShuYW1lKSAgICBcbiAgICBhbGxQcm9qZWN0c0FycmF5W3Byb2plY3RBcnJheWNvdW50ZXJdLnB1dE9uUGFnZShidXR0b25Db3VudGVyKTtcbiAgICBjbG9zZVByb2plY3RGb3JtKCk7XG4gICAgcHJvamVjdEFycmF5Y291bnRlcisrOyAgXG4gICAgYnV0dG9uQ291bnRlcisrOyAgXG59XG5cbi8vZGVmYXVsdCBwcm9qZWN0IGlzIGhpZ2hsaWdodGVkIHdoZW4gcHJvamVjdCBzdGFydHNcbmZ1bmN0aW9uIGluaXRpYWxQcm9qZWN0KCl7XG4gICAgbGV0IHN0YXJ0aW5nUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVmYXVsdFwiKTtcbiAgICBzdGFydGluZ1Byb2plY3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyYXlcIjtcbn1cblxuXG4vL3NlbGVjdHMgdGhlIHByb2plY3Qgd2hlbiBwcm9qZWN0IG5hbWUgaXMgY2xpY2tlZFxuLy9maWxscyB0aGUgYXJlYSB3aXRoIGp1c3QgdGFza3Mgb2YgdGhlIHByb2plY3RcbmZ1bmN0aW9uIHNlbGVjdFByb2plY3QoZSl7ICAgIFxuICAgIFxuICAgIC8vdGhlIGNvbG91ciB0byBjaGFuZ2UgdG8gZ3JleSBmb3IgYWxsIHByb2plY3QgbmFtZXNcbiAgICBsZXQgYWxsUHJvamVjdEVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInByb2plY3RUaXRsZVwiKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYWxsUHJvamVjdEVsZW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gYWxsUHJvamVjdEVsZW1lbnRzW2luZGV4XTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIjsgICAgICAgIFxuICAgIH1cbiAgICAvL2p1c3QgY29sb3VyIGluIHRoZSBzZWxlY3RlZCBlbGVtZW50XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmF5XCI7XG4gICAgLy9nbyB0aHJvdWdoIGFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXkgaG9sZGluZyBhbGwgdGhlIHByb2plY3RzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxQcm9qZWN0c0FycmF5Lmxlbmd0aDsgaSsrKSBcbiAgICAgICAgeyAgLy9pZiB0aGUgbmFtZSBvZiBlbGVtZW50IGFuZCB0YXJnZXQgSUQgYXJlIHRoZSBzYW1lLCB0aGF0IGRldGVybWluZXMgdGhlIGN1cnJlbnQgcHJvamVjdCBzZWxlY3RlZFxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSBhbGxQcm9qZWN0c0FycmF5W2ldLm5hbWUpIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50cHJvamVjdCA9IGk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIC8vcmVkcmF3IHRoYXQgcHJvamVjdHMgdGFza3MoYXJyYXkpIG9uIHRoZSBwYWdlICBcbiAgICBhbGxQcm9qZWN0c0FycmF5W2N1cnJlbnRwcm9qZWN0XS5wb3B1bGF0ZUNob3NlblByb2plY3RET00oKTsgICAgXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2soZSl7XG4gICAgYWxsUHJvamVjdHNBcnJheVtjdXJyZW50cHJvamVjdF0ucmVtb3ZlVGFzayhlKTtcbn1cblxuLy9hZGRzIGEgdGFzayB0byBjdXJyZW50IHNlbGVjdGVkIHByb2plY3QgLSBjYWxsZWQgZnJvbSBldmVudCBsaXN0ZW5lcnNcblxuZnVuY3Rpb24gYWRkVGFza1RvUHJvamVjdCgpe1xuICAgIGFsbFByb2plY3RzQXJyYXlbY3VycmVudHByb2plY3RdLmFkZFRhc2soKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpZCl7XG4gICAgLy9hbGwgcHJvamVjdHMgYXJyYXkgc3BsaWNlXG4gICAgYWxsUHJvamVjdHNBcnJheS5zcGxpY2UoaWQsIDEpO1xuICAgIGxldCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdExpc3RcIik7XG4gICAgbGV0IHRhc2tBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRGlzcGxheUlubmVyXCIpO1xuICAgIHRhc2tBcmVhLmlubmVySFRNTCA9IFwiXCI7XG4gICAgcHJvamVjdEFyZWEuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAvL3JlZHJhdyBhbGwgZWxlbWVudHMgb2YgYXJyYXlcbiAgICBidXR0b25Db3VudGVyID0gMDtcbiAgICBwcm9qZWN0QXJyYXljb3VudGVyLS07XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFsbFByb2plY3RzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIFxuICAgICAgICBhbGxQcm9qZWN0c0FycmF5W2luZGV4XS5wdXRPblBhZ2UoYnV0dG9uQ291bnRlcik7ICAgICBcbiAgICAgICAgYnV0dG9uQ291bnRlcisrOyAgICAgIFxuICAgIH1cbiAgICAvL21ha2UgZGVmYXVsdCBoaWdobGlnaHRlZFxuICAgIGluaXRpYWxQcm9qZWN0KCk7ICBcbn1cblxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAoc3VwcGxpZWROYW1lKSA9PiB7XG4gICAgXG4gICAgLy9zbyBpIGNhbiBzZWUgd2hhdHMgZ29pbmcgb24gaW4gbG9nc1xuICAgIGxldCBuYW1lID0gc3VwcGxpZWROYW1lO1xuXG4gICAgLy9jcmVhdGUgYXJyYXkgZm9yIHRoaXMgcHJvamVjdFxuICAgIGxldCBwcm9qZWN0QXJyYXkgPSBbXTtcblxuICAgIGZ1bmN0aW9uIHB1dE9uUGFnZShidXR0b25Db3VudGVyKXsgICAgICAgIFxuICAgICAgICB1cGRhdGVQcm9qZWN0RE9NKHN1cHBsaWVkTmFtZSwgYnV0dG9uQ291bnRlcik7ICAgICAgICAgIFxuICAgIH1cbiAgIFxuXG4gICAgbGV0IHRhc2s7XG4gICAgbGV0IHRhc2tOdW1iZXIgPSAwO1xuICAgIGZ1bmN0aW9uIGFkZFRhc2soKXsgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gY3JlYXRlIHRoZSB0YXNrXG4gICAgICAgIHRhc2sgPSB0YXNrRmFjdG9yeSh0YXNrTnVtYmVyKTtcbiAgICAgICAgLy9kcmF3IHRoZSB0YXNrIG91dFxuICAgICAgICB0YXNrLnBvcHVsYXRlVGFza3ModGFza051bWJlcilcbiAgICAgICAgLy9wdXNoIHRvIGFycmF5XG4gICAgICAgIHByb2plY3RBcnJheS5wdXNoKHRhc2spOyAgXG4gICAgICAgIFxuICAgICAgICB0YXNrTnVtYmVyKys7XG4gICAgfVxuXG4gICAgXG4gICAgZnVuY3Rpb24gcmVtb3ZlVGFzayhpZCl7XG4gICAgICAgIHByb2plY3RBcnJheS5zcGxpY2UoaWQsIDEpOyAgICAgICAgXG4gICAgICAgIHRhc2tOdW1iZXIgPSBwcm9qZWN0QXJyYXkubGVuZ3RoO1xuICAgICAgICBhbGxQcm9qZWN0c0FycmF5W2N1cnJlbnRwcm9qZWN0XS5wb3B1bGF0ZUNob3NlblByb2plY3RET00oKTsgXG4gICAgfVxuXG4gICAgICAgIC8vcmVkcmF3IHByb2plY3RzRGlzcGxheSB3aXRoIGVsZW1lbnRzIG9mIHRoZSBwcm9qZWN0IGV2ZXJ5IHRpbWUgYSBwcm9qZWN0IGlzIGNsaWNrZWRcbiAgICBmdW5jdGlvbiBwb3B1bGF0ZUNob3NlblByb2plY3RET00oKXtcbiAgICAgICAgbGV0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRGlzcGxheUlubmVyXCIpO1xuICAgICAgICBkaXNwbGF5QXJlYS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHJvamVjdEFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHByb2plY3RBcnJheVtpbmRleF07XG4gICAgICAgICAgICBlbGVtZW50LnBvcHVsYXRlVGFza3MoaW5kZXgpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgfSAgICBcbiAgICB9XG5cbiAgICByZXR1cm4ge3B1dE9uUGFnZSwgYWRkVGFzaywgbmFtZSwgcHJvamVjdEFycmF5LCBwb3B1bGF0ZUNob3NlblByb2plY3RET00sIHJlbW92ZVRhc2t9XG4gICAgfVxuICAgIFxuXG5cbmV4cG9ydCB7Y3JlYXRlUHJvamVjdCwgcHJvamVjdEZhY3RvcnksIHNlbGVjdFByb2plY3QsIGFkZFRhc2tUb1Byb2plY3QsIGluaXRpYWxQcm9qZWN0LCBkZWxldGVUYXNrLCBkZWxldGVQcm9qZWN0LCBhbGxQcm9qZWN0c0FycmF5LCBjdXJyZW50cHJvamVjdH1cblxuIiwiaW1wb3J0IHthZGRUYXNrVG9ET019IGZyb20gXCIuL3VwZGF0ZVRhc2tET01cIjtcblxuXG5jb25zdCB0YXNrRmFjdG9yeSA9ICh0YXNrTnVtYmVyKSA9PntcblxuICAgIGxldCB0YXNrdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpdGxlXCIpLnZhbHVlO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiRGVzY3JpcHRpb25cIikudmFsdWU7XG4gICAgbGV0IGR1ZWRhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1ZVwiKS52YWx1ZTtcbiAgICBsZXQgdGFza3ByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmlvcml0eVwiKS52YWx1ZTtcbiAgICBsZXQgdGhpc3Rhc2tOdW1iZXIgPSB0YXNrTnVtYmVyO1xuICAgIFxuICAgIGZ1bmN0aW9uIGNoYW5nZVByaW9yaXR5KCl7XG4gICAgICAgIGlmICh0YXNrcHJpb3JpdHkgPT09IFwiaGlnaFwiKSB7dGFza3ByaW9yaXR5ID09PSBcImxvd1wifVxuICAgICAgICBlbHNlIGlmICh0YXNrcHJpb3JpdHkgPT09IFwibG93XCIpIHt0YXNrcHJpb3JpdHkgPT09IFwiaGlnaFwifVxuICAgIH1cbiAgICBcbiAgICBcbiAgICAvL2Z1bmN0aW9uIGZvciB3aGVuIHRhc2tzIGhhdmUgYmVlbiByZW1vdmVkXG4gXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVUYXNrcyhpbmRleCl7ICAgICAgICBcbiAgICAgICAgYWRkVGFza1RvRE9NKHRhc2t0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZWRhdGUsIHRhc2twcmlvcml0eSwgaW5kZXgpOyAgICAgICAgXG4gICAgfVxuXG4gICAgcmV0dXJue3RoaXN0YXNrTnVtYmVyLCBwb3B1bGF0ZVRhc2tzLCBjaGFuZ2VQcmlvcml0eX1cbn1cblxuZXhwb3J0IHt0YXNrRmFjdG9yeX0iLCIvL3RoaXMgZnVuY3Rpb24gaXMgc29sZWx5IGdldHRpbmcgdGhlIG5hbWUgb2YgdGhlIHByb2plY3QgYW5kIGFkZGluZyBpdCB0byB0aGUgZG9tXG5cblxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdERPTShwcm9qZWN0LCBjb3VudGVyKXtcbiAgICBsZXQgcHJvamVjdEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RMaXN0XCIpO1xuICAgIGxldCBuZXdoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbmV3aDIuaW5uZXJIVE1MID0gYDxoMz4ke3Byb2plY3R9PC9oMz48YnV0dG9uIGlkPVwiJHtjb3VudGVyfVwiIGNsYXNzPVwicHJvamVjdEJ1dHRvblwiPkRlbGV0ZTwvYnV0dG9uP2BcbiAgICBuZXdoMi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByb2plY3RUaXRsZVwiKTtcbiAgICBuZXdoMi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBwcm9qZWN0KTtcbiAgICBwcm9qZWN0QXJlYS5hcHBlbmRDaGlsZChuZXdoMik7ICAgIFxufVxuXG5cbmV4cG9ydCB7dXBkYXRlUHJvamVjdERPTX0iLCJpbXBvcnQgeyBjbG9zZVRhc2tGb3JtIH0gZnJvbSBcIi4vZXZlbnRsaXN0ZW5lcnNcIjtcblxuXG4vL3RoaXMgZnVuY3Rpb24gaXMgZ2V0dGluZyB2YWx1ZXMgZnJvbSB0YXNrIGZvcm0gXG4vL2FuZCBhcHBlbmRpbmcgdGhlIHRhc2sgdG8gdGhlIGRvbVxuXG5mdW5jdGlvbiBhZGRUYXNrVG9ET00odGFza3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlZGF0ZSwgdGFza3ByaW9yaXR5LCB0aGlzdGFza051bWJlcil7XG4gICAgXG4gICAgbGV0IHRhc2tBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRGlzcGxheUlubmVyXCIpO1xuICAgIGxldCBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgIG5ld0Rpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZGl2JHt0aGlzdGFza051bWJlcn1gKTtcbiAgICBcbiAgICAgIFxuXG4gICAgaWYgKHRhc2twcmlvcml0eSA9PT0gXCJoaWdoXCIpIHtcblxuICAgICAgICBuZXdEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJvcmFuZ2VcIlxuICAgIH1cbiAgICBlbHNlIGlmICh0YXNrcHJpb3JpdHkgPT09IFwibG93XCIpe1xuXG4gICAgICAgIG5ld0Rpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCJcbiAgICB9XG5cbiAgICBuZXdEaXYuaW5uZXJIVE1MID0gXG4gICAgYDxoMz4ke3Rhc2t0aXRsZX08L2gzPlxuICAgIDxwPiR7ZGVzY3JpcHRpb259PC9wPlxuICAgIDxwPkR1ZTogJHtkdWVkYXRlfTwvcD5cbiAgICA8cCBpZD1cInByaW9yaXR5QXJlYSR7dGhpc3Rhc2tOdW1iZXJ9XCI+UHJpb3JpdHk6ICR7dGFza3ByaW9yaXR5fTwvcD5cbiAgICA8YnV0dG9uIGNsYXNzPVwicHJpb3JpdHlCdXR0b25cIiBpZD1cIiR7dGhpc3Rhc2tOdW1iZXJ9XCIgbmFtZT1cImRpdiR7dGhpc3Rhc2tOdW1iZXJ9XCIgdmFsdWU9XCIke3Rhc2twcmlvcml0eX1cIj5DaGFuZ2UgUHJpb3JpdHk8L2J1dHRvbj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlQnV0dG9uXCIgaWQ9XCIke3RoaXN0YXNrTnVtYmVyfVwiPiBEZWxldGUgVGFzayA8L2J1dHRvbj5gXG5cbiAgICB0YXNrQXJlYS5hcHBlbmRDaGlsZChuZXdEaXYpO1xuICAgIFxuIFxuICAgIFxuICAgIGNsb3NlVGFza0Zvcm0oKTsgICAgICAgXG59XG5cbmV4cG9ydCB7YWRkVGFza1RvRE9NfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgaW5pdGlhbFByb2plY3QgfSBmcm9tIFwiLi9wcm9qZWN0Q29udHJvbGxlclwiO1xuaW1wb3J0IHsgaW5pdGlhbGV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vZXZlbnRsaXN0ZW5lcnNcIjtcblxuaW5pdGlhbGV2ZW50TGlzdGVuZXJzKCk7XG5jcmVhdGVQcm9qZWN0KFwiZGVmYXVsdFwiKTtcbmluaXRpYWxQcm9qZWN0KCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=