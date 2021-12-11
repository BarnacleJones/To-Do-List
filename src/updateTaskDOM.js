import { closeTaskForm } from "./eventlisteners";

//this function is getting values from task form 
//and appending the task to the dom

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
    
    closeTaskForm();       
}

export {addTaskToDOM}