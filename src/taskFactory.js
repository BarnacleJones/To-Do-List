import {addTaskToDOM} from "./updateTaskDOM";


const taskFactory = () =>{

    let tasktitle = document.getElementById("title").value;
    let description = document.getElementById("Description").value;
    let duedate = document.getElementById("due").value;
    let taskpriority = document.getElementById("priority").value;

    function createTask(){
    //needs to get all values from the form

    //wrap them into object
    //add task to dom
    addTaskToDOM()
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

export {taskFactory}