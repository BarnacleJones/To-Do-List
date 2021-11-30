import { closeTaskForm } from "./eventlisteners";

let taskNumber = 0;

function addTask(){
    let tasktitle = document.getElementById("title").value;
    let description = document.getElementById("Description").value;
    let duedate = document.getElementById("due").value;
    let taskpriority = document.getElementById("priority").value;
    
    let taskArea = document.getElementById("mainDisplay");
    let newDiv = document.createElement("DIV");
    newDiv.setAttribute("id", `div${taskNumber}`);

    newDiv.innerHTML = 
    `<h3>${tasktitle}</h3>
    <p>${description}</p>
    <p>Due: ${duedate}</p>
    <p>Priority: ${taskpriority}</p>`

    taskArea.appendChild(newDiv);
    taskNumber++;
    closeTaskForm();
}

export {addTask}