import {addTaskToDOM} from "./updateTaskDOM";

let taskNumber = 0;
const taskFactory = () =>{

    let tasktitle = document.getElementById("title").value;
    let description = document.getElementById("Description").value;
    let duedate = document.getElementById("due").value;
    let taskpriority = document.getElementById("priority").value;
    taskNumber = taskNumber;
    taskNumber++;
    
    function populateTasksForProject(){
        addTaskToDOM(tasktitle, description, duedate, taskpriority, taskNumber);
    }

    return{populateTasksForProject}
}

export {taskFactory}