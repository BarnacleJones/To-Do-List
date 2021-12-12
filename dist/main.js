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
       // allProjectsArray[currentproject].projectArray[0].changeTaskPriority();
   }
   else if (value === "low") {       
       div.style.backgroundColor = "orange";
        //this is hacky, arent changing actual values of task so it doesnt stick
       document.getElementById(`priorityArea${id}`).innerText = "Priority: high"
       //need to change the actual tasks priority ???
       // allProjectsArray[currentproject].projectArray[0].changeTaskPriority();
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

    function changeTaskPriority() {
        task.changePriority()
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

    return {putOnPage, addTask, name, projectArray, populateChosenProjectDOM, removeTask, changeTaskPriority}
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
/* harmony import */ var _projectController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectController */ "./src/projectController.js");




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05vRTtBQUNYOztBQUV6RCxzRUFBcUI7QUFDckIsaUVBQWE7QUFDYixrRUFBYyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2NoYW5nZVByaW9yaXR5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2V2ZW50bGlzdGVuZXJzLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Byb2plY3RDb250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3Rhc2tGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL3VwZGF0ZVByb2plY3RET00uanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvdXBkYXRlVGFza0RPTS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vdGhpcyB3aWxsIGNoYW5nZSBwcmlvcml0eSBvZiB0aGUgdGFza1xuLy91cGRhdGUgYSBjb2xvciBkZXBlbmRpbmcgb24gcHJpb3JpdHkgbGV2ZWxcblxuZnVuY3Rpb24gY2hhbmdlUHJpb3JpdHkoaWQsIGRpdm5hbWUsIHZhbHVlKXtcblxuICAgIC8vbmFtZSBpcyB2YWx1ZSBvZiB0aGUgZGl2IGNvbnRhaW5lclxuICAgIGxldCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaXZuYW1lKTtcblxuICAgIFxuICAgaWYgKHZhbHVlID09PSBcImhpZ2hcIikge1xuICAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZWVuXCI7XG4gICAgICAgIC8vdGhpcyBpcyBoYWNreSwgYXJlbnQgY2hhbmdpbmcgYWN0dWFsIHZhbHVlcyBvZiB0YXNrIHNvIGl0IGRvZXNudCBzdGlja1xuICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwcmlvcml0eUFyZWEke2lkfWApLmlubmVyVGV4dCA9IFwiUHJpb3JpdHk6IGxvd1wiO1xuICAgICAgIC8vbmVlZCB0byBjaGFuZ2UgdGhlIGFjdHVhbCB0YXNrcyBwcmlvcml0eSA/Pz9cbiAgICAgICAvLyBhbGxQcm9qZWN0c0FycmF5W2N1cnJlbnRwcm9qZWN0XS5wcm9qZWN0QXJyYXlbMF0uY2hhbmdlVGFza1ByaW9yaXR5KCk7XG4gICB9XG4gICBlbHNlIGlmICh2YWx1ZSA9PT0gXCJsb3dcIikgeyAgICAgICBcbiAgICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJvcmFuZ2VcIjtcbiAgICAgICAgLy90aGlzIGlzIGhhY2t5LCBhcmVudCBjaGFuZ2luZyBhY3R1YWwgdmFsdWVzIG9mIHRhc2sgc28gaXQgZG9lc250IHN0aWNrXG4gICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByaW9yaXR5QXJlYSR7aWR9YCkuaW5uZXJUZXh0ID0gXCJQcmlvcml0eTogaGlnaFwiXG4gICAgICAgLy9uZWVkIHRvIGNoYW5nZSB0aGUgYWN0dWFsIHRhc2tzIHByaW9yaXR5ID8/P1xuICAgICAgIC8vIGFsbFByb2plY3RzQXJyYXlbY3VycmVudHByb2plY3RdLnByb2plY3RBcnJheVswXS5jaGFuZ2VUYXNrUHJpb3JpdHkoKTtcbiAgIH1cbiB9XG5cbmV4cG9ydCB7Y2hhbmdlUHJpb3JpdHl9IiwiaW1wb3J0IHsgY3JlYXRlUHJvamVjdCwgc2VsZWN0UHJvamVjdCwgYWRkVGFza1RvUHJvamVjdCwgZGVsZXRlVGFzaywgZGVsZXRlUHJvamVjdH0gZnJvbSBcIi4vcHJvamVjdENvbnRyb2xsZXJcIjtcbmltcG9ydCB7Y2hhbmdlUHJpb3JpdHl9IGZyb20gXCIuL2NoYW5nZVByaW9yaXR5XCI7XG5cblxuZnVuY3Rpb24gc2hvd1Rhc2tGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtQXJlYVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmhlcml0XCI7fVxuZnVuY3Rpb24gc2hvd1Byb2plY3RGb3JtKCl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0Rm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmhlcml0XCI7fVxuZnVuY3Rpb24gY2xvc2VUYXNrRm9ybSgpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybUFyZWFcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO31cbmZ1bmN0aW9uIGNsb3NlUHJvamVjdEZvcm0oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9XG5cblxuXG5mdW5jdGlvbiBpbml0aWFsZXZlbnRMaXN0ZW5lcnMoKXtcbi8vZXZlbnQgbGlzdGVuZXJzIGZvciBmdW5jdGlvbmFsaXR5XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldC5jbGFzc05hbWU7XG4gICAgY29uc3QgYnV0dG9uSUQgPSBlLnRhcmdldC5pZDsgICBcbiAgICBjb25zdCBuYW1lID0gZS50YXJnZXQubmFtZTsgXG4gICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgXG4gICAgaWYgKHRhcmdldCA9PT0gXCJhZGRUYXNrXCIpIHNob3dUYXNrRm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJjbG9zZVRhc2tcIikgY2xvc2VUYXNrRm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJhZGRQcm9qZWN0XCIpIHNob3dQcm9qZWN0Rm9ybSgpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJjbG9zZVByb2plY3RcIikgY2xvc2VQcm9qZWN0Rm9ybSgpOyBcbiAgICBlbHNlIGlmICh0YXJnZXQgPT09IFwic3VibWl0UHJvamVjdFwiKSAgY3JlYXRlUHJvamVjdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RUaXRsZVwiKS52YWx1ZSk7IFxuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJzdWJtaXRUYXNrXCIpICBhZGRUYXNrVG9Qcm9qZWN0KCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInByb2plY3RUaXRsZVwiKSBzZWxlY3RQcm9qZWN0KGUpO1xuICAgIGVsc2UgaWYgKHRhcmdldCA9PT0gXCJkZWxldGVCdXR0b25cIikgZGVsZXRlVGFzayhidXR0b25JRCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInByb2plY3RCdXR0b25cIikgZGVsZXRlUHJvamVjdChidXR0b25JRCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0ID09PSBcInByaW9yaXR5QnV0dG9uXCIpIGNoYW5nZVByaW9yaXR5KGJ1dHRvbklELCBuYW1lLCB2YWx1ZSlcbiAgICBcbn0pXG5cbn1cbmV4cG9ydCB7aW5pdGlhbGV2ZW50TGlzdGVuZXJzLCBjbG9zZVRhc2tGb3JtLCBjbG9zZVByb2plY3RGb3JtfSIsImltcG9ydCB7IHVwZGF0ZVByb2plY3RET00gfSBmcm9tIFwiLi91cGRhdGVQcm9qZWN0RE9NXCI7XG5pbXBvcnQge2Nsb3NlUHJvamVjdEZvcm19IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XG5pbXBvcnQge3Rhc2tGYWN0b3J5fSBmcm9tIFwiLi90YXNrRmFjdG9yeVwiO1xuXG4vL3ZhcmlhYmxlc1xubGV0IGFsbFByb2plY3RzQXJyYXkgPSBbXTtcbmxldCBjdXJyZW50cHJvamVjdCA9IDA7XG5sZXQgcHJvamVjdEFycmF5Y291bnRlciA9IDA7XG5sZXQgYnV0dG9uQ291bnRlciA9MDtcblxuLy9jcmVhdGVzIG5ldyBwcm9qZWN0IGluIGFsbHByb2plY3RzYXJyYXksIHB1dHMgaXQgb24gdGhlIHBhZ2UgLSBjYWxsZWQgZnJvbSBldmVudCBsaXN0ZW5lcnNcbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSl7ICAgIFxuICAgIGFsbFByb2plY3RzQXJyYXlbcHJvamVjdEFycmF5Y291bnRlcl0gPSBwcm9qZWN0RmFjdG9yeShuYW1lKSAgICBcbiAgICBhbGxQcm9qZWN0c0FycmF5W3Byb2plY3RBcnJheWNvdW50ZXJdLnB1dE9uUGFnZShidXR0b25Db3VudGVyKTtcbiAgICBjbG9zZVByb2plY3RGb3JtKCk7XG4gICAgcHJvamVjdEFycmF5Y291bnRlcisrOyAgXG4gICAgYnV0dG9uQ291bnRlcisrOyAgXG59XG5cbi8vZGVmYXVsdCBwcm9qZWN0IGlzIGhpZ2hsaWdodGVkIHdoZW4gcHJvamVjdCBzdGFydHNcbmZ1bmN0aW9uIGluaXRpYWxQcm9qZWN0KCl7XG4gICAgbGV0IHN0YXJ0aW5nUHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVmYXVsdFwiKTtcbiAgICBzdGFydGluZ1Byb2plY3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyYXlcIjtcbn1cblxuXG4vL3NlbGVjdHMgdGhlIHByb2plY3Qgd2hlbiBwcm9qZWN0IG5hbWUgaXMgY2xpY2tlZFxuLy9maWxscyB0aGUgYXJlYSB3aXRoIGp1c3QgdGFza3Mgb2YgdGhlIHByb2plY3RcbmZ1bmN0aW9uIHNlbGVjdFByb2plY3QoZSl7ICAgIFxuICAgIFxuICAgIC8vdGhlIGNvbG91ciB0byBjaGFuZ2UgdG8gZ3JleSBmb3IgYWxsIHByb2plY3QgbmFtZXNcbiAgICBsZXQgYWxsUHJvamVjdEVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInByb2plY3RUaXRsZVwiKTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYWxsUHJvamVjdEVsZW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gYWxsUHJvamVjdEVsZW1lbnRzW2luZGV4XTtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyZXlcIjsgICAgICAgIFxuICAgIH1cbiAgICAvL2p1c3QgY29sb3VyIGluIHRoZSBzZWxlY3RlZCBlbGVtZW50XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZS50YXJnZXQuaWQpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmF5XCI7XG4gICAgLy9nbyB0aHJvdWdoIGFsbCBlbGVtZW50cyBvZiB0aGUgYXJyYXkgaG9sZGluZyBhbGwgdGhlIHByb2plY3RzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxQcm9qZWN0c0FycmF5Lmxlbmd0aDsgaSsrKSBcbiAgICAgICAgeyAgLy9pZiB0aGUgbmFtZSBvZiBlbGVtZW50IGFuZCB0YXJnZXQgSUQgYXJlIHRoZSBzYW1lLCB0aGF0IGRldGVybWluZXMgdGhlIGN1cnJlbnQgcHJvamVjdCBzZWxlY3RlZFxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSBhbGxQcm9qZWN0c0FycmF5W2ldLm5hbWUpIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50cHJvamVjdCA9IGk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIC8vcmVkcmF3IHRoYXQgcHJvamVjdHMgdGFza3MoYXJyYXkpIG9uIHRoZSBwYWdlICBcbiAgICBhbGxQcm9qZWN0c0FycmF5W2N1cnJlbnRwcm9qZWN0XS5wb3B1bGF0ZUNob3NlblByb2plY3RET00oKTsgICAgXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2soZSl7XG4gICAgYWxsUHJvamVjdHNBcnJheVtjdXJyZW50cHJvamVjdF0ucmVtb3ZlVGFzayhlKTtcbn1cblxuLy9hZGRzIGEgdGFzayB0byBjdXJyZW50IHNlbGVjdGVkIHByb2plY3QgLSBjYWxsZWQgZnJvbSBldmVudCBsaXN0ZW5lcnNcblxuZnVuY3Rpb24gYWRkVGFza1RvUHJvamVjdCgpe1xuICAgIGFsbFByb2plY3RzQXJyYXlbY3VycmVudHByb2plY3RdLmFkZFRhc2soKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpZCl7XG4gICAgLy9hbGwgcHJvamVjdHMgYXJyYXkgc3BsaWNlXG4gICAgYWxsUHJvamVjdHNBcnJheS5zcGxpY2UoaWQsIDEpO1xuICAgIGxldCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdExpc3RcIik7XG4gICAgbGV0IHRhc2tBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRGlzcGxheUlubmVyXCIpO1xuICAgIHRhc2tBcmVhLmlubmVySFRNTCA9IFwiXCI7XG4gICAgcHJvamVjdEFyZWEuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAvL3JlZHJhdyBhbGwgZWxlbWVudHMgb2YgYXJyYXlcbiAgICBidXR0b25Db3VudGVyID0gMDtcbiAgICBwcm9qZWN0QXJyYXljb3VudGVyLS07XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFsbFByb2plY3RzQXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIFxuICAgICAgICBhbGxQcm9qZWN0c0FycmF5W2luZGV4XS5wdXRPblBhZ2UoYnV0dG9uQ291bnRlcik7ICAgICBcbiAgICAgICAgYnV0dG9uQ291bnRlcisrOyAgICAgIFxuICAgIH1cbiAgICAvL21ha2UgZGVmYXVsdCBoaWdobGlnaHRlZFxuICAgIGluaXRpYWxQcm9qZWN0KCk7ICBcbn1cblxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAoc3VwcGxpZWROYW1lKSA9PiB7XG4gICAgXG4gICAgLy9zbyBpIGNhbiBzZWUgd2hhdHMgZ29pbmcgb24gaW4gbG9nc1xuICAgIGxldCBuYW1lID0gc3VwcGxpZWROYW1lO1xuXG4gICAgLy9jcmVhdGUgYXJyYXkgZm9yIHRoaXMgcHJvamVjdFxuICAgIGxldCBwcm9qZWN0QXJyYXkgPSBbXTtcblxuICAgIGZ1bmN0aW9uIHB1dE9uUGFnZShidXR0b25Db3VudGVyKXsgICAgICAgIFxuICAgICAgICB1cGRhdGVQcm9qZWN0RE9NKHN1cHBsaWVkTmFtZSwgYnV0dG9uQ291bnRlcik7ICAgICAgICAgIFxuICAgIH1cbiAgIFxuXG4gICAgbGV0IHRhc2s7XG4gICAgbGV0IHRhc2tOdW1iZXIgPSAwO1xuICAgIGZ1bmN0aW9uIGFkZFRhc2soKXsgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gY3JlYXRlIHRoZSB0YXNrXG4gICAgICAgIHRhc2sgPSB0YXNrRmFjdG9yeSh0YXNrTnVtYmVyKTtcbiAgICAgICAgLy9kcmF3IHRoZSB0YXNrIG91dFxuICAgICAgICB0YXNrLnBvcHVsYXRlVGFza3ModGFza051bWJlcilcbiAgICAgICAgLy9wdXNoIHRvIGFycmF5XG4gICAgICAgIHByb2plY3RBcnJheS5wdXNoKHRhc2spOyAgXG4gICAgICAgIFxuICAgICAgICB0YXNrTnVtYmVyKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hhbmdlVGFza1ByaW9yaXR5KCkge1xuICAgICAgICB0YXNrLmNoYW5nZVByaW9yaXR5KClcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gcmVtb3ZlVGFzayhpZCl7XG4gICAgICAgIHByb2plY3RBcnJheS5zcGxpY2UoaWQsIDEpOyAgICAgICAgXG4gICAgICAgIHRhc2tOdW1iZXIgPSBwcm9qZWN0QXJyYXkubGVuZ3RoO1xuICAgICAgICBhbGxQcm9qZWN0c0FycmF5W2N1cnJlbnRwcm9qZWN0XS5wb3B1bGF0ZUNob3NlblByb2plY3RET00oKTsgXG4gICAgfVxuXG4gICAgICAgIC8vcmVkcmF3IHByb2plY3RzRGlzcGxheSB3aXRoIGVsZW1lbnRzIG9mIHRoZSBwcm9qZWN0IGV2ZXJ5IHRpbWUgYSBwcm9qZWN0IGlzIGNsaWNrZWRcbiAgICBmdW5jdGlvbiBwb3B1bGF0ZUNob3NlblByb2plY3RET00oKXtcbiAgICAgICAgbGV0IGRpc3BsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRGlzcGxheUlubmVyXCIpO1xuICAgICAgICBkaXNwbGF5QXJlYS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHJvamVjdEFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHByb2plY3RBcnJheVtpbmRleF07XG4gICAgICAgICAgICBlbGVtZW50LnBvcHVsYXRlVGFza3MoaW5kZXgpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgfSAgICBcbiAgICB9XG5cbiAgICByZXR1cm4ge3B1dE9uUGFnZSwgYWRkVGFzaywgbmFtZSwgcHJvamVjdEFycmF5LCBwb3B1bGF0ZUNob3NlblByb2plY3RET00sIHJlbW92ZVRhc2ssIGNoYW5nZVRhc2tQcmlvcml0eX1cbiAgICB9XG4gICAgXG5cblxuZXhwb3J0IHtjcmVhdGVQcm9qZWN0LCBwcm9qZWN0RmFjdG9yeSwgc2VsZWN0UHJvamVjdCwgYWRkVGFza1RvUHJvamVjdCwgaW5pdGlhbFByb2plY3QsIGRlbGV0ZVRhc2ssIGRlbGV0ZVByb2plY3QsIGFsbFByb2plY3RzQXJyYXksIGN1cnJlbnRwcm9qZWN0fVxuXG4iLCJpbXBvcnQge2FkZFRhc2tUb0RPTX0gZnJvbSBcIi4vdXBkYXRlVGFza0RPTVwiO1xuXG5cbmNvbnN0IHRhc2tGYWN0b3J5ID0gKHRhc2tOdW1iZXIpID0+e1xuXG4gICAgbGV0IHRhc2t0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIikudmFsdWU7XG4gICAgbGV0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJEZXNjcmlwdGlvblwiKS52YWx1ZTtcbiAgICBsZXQgZHVlZGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlXCIpLnZhbHVlO1xuICAgIGxldCB0YXNrcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW9yaXR5XCIpLnZhbHVlO1xuICAgIGxldCB0aGlzdGFza051bWJlciA9IHRhc2tOdW1iZXI7XG4gICAgXG4gICAgZnVuY3Rpb24gY2hhbmdlUHJpb3JpdHkoKXtcbiAgICAgICAgaWYgKHRhc2twcmlvcml0eSA9PT0gXCJoaWdoXCIpIHt0YXNrcHJpb3JpdHkgPT09IFwibG93XCJ9XG4gICAgICAgIGVsc2UgaWYgKHRhc2twcmlvcml0eSA9PT0gXCJsb3dcIikge3Rhc2twcmlvcml0eSA9PT0gXCJoaWdoXCJ9XG4gICAgfVxuICAgIFxuICAgIFxuICAgIC8vZnVuY3Rpb24gZm9yIHdoZW4gdGFza3MgaGF2ZSBiZWVuIHJlbW92ZWRcbiBcbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVRhc2tzKGluZGV4KXsgICAgICAgIFxuICAgICAgICBhZGRUYXNrVG9ET00odGFza3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlZGF0ZSwgdGFza3ByaW9yaXR5LCBpbmRleCk7ICAgICAgICBcbiAgICB9XG5cbiAgICByZXR1cm57dGhpc3Rhc2tOdW1iZXIsIHBvcHVsYXRlVGFza3MsIGNoYW5nZVByaW9yaXR5fVxufVxuXG5leHBvcnQge3Rhc2tGYWN0b3J5fSIsIi8vdGhpcyBmdW5jdGlvbiBpcyBzb2xlbHkgZ2V0dGluZyB0aGUgbmFtZSBvZiB0aGUgcHJvamVjdCBhbmQgYWRkaW5nIGl0IHRvIHRoZSBkb21cblxuXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0RE9NKHByb2plY3QsIGNvdW50ZXIpe1xuICAgIGxldCBwcm9qZWN0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdExpc3RcIik7XG4gICAgbGV0IG5ld2gyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBuZXdoMi5pbm5lckhUTUwgPSBgPGgzPiR7cHJvamVjdH08L2gzPjxidXR0b24gaWQ9XCIke2NvdW50ZXJ9XCIgY2xhc3M9XCJwcm9qZWN0QnV0dG9uXCI+RGVsZXRlPC9idXR0b24/YFxuICAgIG5ld2gyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJvamVjdFRpdGxlXCIpO1xuICAgIG5ld2gyLnNldEF0dHJpYnV0ZShcImlkXCIsIHByb2plY3QpO1xuICAgIHByb2plY3RBcmVhLmFwcGVuZENoaWxkKG5ld2gyKTsgICAgXG59XG5cblxuZXhwb3J0IHt1cGRhdGVQcm9qZWN0RE9NfSIsImltcG9ydCB7IGNsb3NlVGFza0Zvcm0gfSBmcm9tIFwiLi9ldmVudGxpc3RlbmVyc1wiO1xuaW1wb3J0IHsgYWxsUHJvamVjdHNBcnJheSwgY3VycmVudHByb2plY3QsIHByb2plY3RGYWN0b3J5IH0gZnJvbSBcIi4vcHJvamVjdENvbnRyb2xsZXJcIjtcblxuXG4vL3RoaXMgZnVuY3Rpb24gaXMgZ2V0dGluZyB2YWx1ZXMgZnJvbSB0YXNrIGZvcm0gXG4vL2FuZCBhcHBlbmRpbmcgdGhlIHRhc2sgdG8gdGhlIGRvbVxuXG5mdW5jdGlvbiBhZGRUYXNrVG9ET00odGFza3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlZGF0ZSwgdGFza3ByaW9yaXR5LCB0aGlzdGFza051bWJlcil7XG4gICAgXG4gICAgbGV0IHRhc2tBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluRGlzcGxheUlubmVyXCIpO1xuICAgIGxldCBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgIG5ld0Rpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZGl2JHt0aGlzdGFza051bWJlcn1gKTtcbiAgICBcbiAgICAgIFxuXG4gICAgaWYgKHRhc2twcmlvcml0eSA9PT0gXCJoaWdoXCIpIHtcbiAgICAgICAgXG4gICAgICAgIG5ld0Rpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIm9yYW5nZVwiXG4gICAgfVxuICAgIGVsc2UgaWYgKHRhc2twcmlvcml0eSA9PT0gXCJsb3dcIil7XG4gICAgICAgIFxuICAgICAgICBuZXdEaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJncmVlblwiXG4gICAgfVxuXG4gICAgbmV3RGl2LmlubmVySFRNTCA9IFxuICAgIGA8aDM+JHt0YXNrdGl0bGV9PC9oMz5cbiAgICA8cD4ke2Rlc2NyaXB0aW9ufTwvcD5cbiAgICA8cD5EdWU6ICR7ZHVlZGF0ZX08L3A+XG4gICAgPHAgaWQ9XCJwcmlvcml0eUFyZWEke3RoaXN0YXNrTnVtYmVyfVwiPlByaW9yaXR5OiAke3Rhc2twcmlvcml0eX08L3A+XG4gICAgPGJ1dHRvbiBjbGFzcz1cInByaW9yaXR5QnV0dG9uXCIgaWQ9XCIke3RoaXN0YXNrTnVtYmVyfVwiIG5hbWU9XCJkaXYke3RoaXN0YXNrTnVtYmVyfVwiIHZhbHVlPVwiJHt0YXNrcHJpb3JpdHl9XCI+Q2hhbmdlIFByaW9yaXR5PC9idXR0b24+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZUJ1dHRvblwiIGlkPVwiJHt0aGlzdGFza051bWJlcn1cIj4gRGVsZXRlIFRhc2sgPC9idXR0b24+YFxuXG4gICAgdGFza0FyZWEuYXBwZW5kQ2hpbGQobmV3RGl2KTtcbiAgICBcbiBcbiAgICBcbiAgICBjbG9zZVRhc2tGb3JtKCk7ICAgICAgIFxufVxuXG5leHBvcnQge2FkZFRhc2tUb0RPTX0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZVByb2plY3QsIGluaXRpYWxQcm9qZWN0IH0gZnJvbSBcIi4vcHJvamVjdENvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGluaXRpYWxldmVudExpc3RlbmVycyB9IGZyb20gXCIuL2V2ZW50bGlzdGVuZXJzXCI7XG5cbmluaXRpYWxldmVudExpc3RlbmVycygpO1xuY3JlYXRlUHJvamVjdChcImRlZmF1bHRcIik7XG5pbml0aWFsUHJvamVjdCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9