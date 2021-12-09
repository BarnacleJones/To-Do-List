import {addTaskToDOM} from "./updateTaskDOM";


const taskFactory = () =>{

    let tasktitle = document.getElementById("title").value;
    let description = document.getElementById("Description").value;
    let duedate = document.getElementById("due").value;
    let taskpriority = document.getElementById("priority").value;

    function populateTasksForProject(){

        addTaskToDOM(tasktitle, description, duedate, taskpriority);
    }

    return{populateTasksForProject}


}

export {taskFactory}