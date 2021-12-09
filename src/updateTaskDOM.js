import { closeTaskForm } from "./eventlisteners";

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
    closeTaskForm();    
}

export {addTaskToDOM}