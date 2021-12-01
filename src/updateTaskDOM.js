import { closeTaskForm } from "./eventlisteners";
import {currentproject} from "./projectFactory"

//this function is getting values from task form 
//and appending the task to the dom

let taskNumber = 0;

function addTaskToDOM(){
    let tasktitle = document.getElementById("title").value;
    let description = document.getElementById("Description").value;
    let duedate = document.getElementById("due").value;
    let taskpriority = document.getElementById("priority").value;
    
    let taskArea = document.getElementById("mainDisplay");
    let newDiv = document.createElement("DIV");
    newDiv.setAttribute("id", `${currentproject+taskNumber}`);

    newDiv.innerHTML = 
    `<h3>${tasktitle}</h3>
    <p>${description}</p>
    <p>Due: ${duedate}</p>
    <p>Priority: ${taskpriority}</p>`

    taskArea.appendChild(newDiv);
    taskNumber++;
    closeTaskForm();
    
}

export {addTaskToDOM}