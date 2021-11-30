import { projects } from "./projectFactory";
import { newTask } from "./taskFactory";

function showTaskForm(){
    document.getElementById("formArea").style.display = "inherit";  
      
}

function showProjectForm(){
    document.getElementById("projectForm").style.display = "inherit";
}

function closeTaskForm(){
    document.getElementById("formArea").style.display = "none";
}

function closeProjectForm(){
    document.getElementById("projectForm").style.display = "none";
}

function initialeventListeners(){
//event listners for navigation
document.addEventListener("click", (e) => {
    const target = e.target.className;
    if (target === "addTask") showTaskForm();
    else if (target === "closeTask") closeTaskForm();
    else if (target === "addProject") showProjectForm();
    else if (target === "closeProject") closeProjectForm(); 
    else if (target === "submitProject")  projects();  
    else if (target === "submitTask")  newTask();
})
}

//function for adding event listners to things to remove (eg projects/tasks)
function newEventListener(elementClassName){}

export {initialeventListeners, closeTaskForm}