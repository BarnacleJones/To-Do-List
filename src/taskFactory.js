import {addTaskToDOM} from "./updateTaskDOM";


const taskFactory = (taskNumber) =>{

    let tasktitle = document.getElementById("title").value;
    let description = document.getElementById("Description").value;
    let duedate = document.getElementById("due").value;
    let taskpriority = document.getElementById("priority").value;
    let thistaskNumber = taskNumber;
    
    
    
    function populateTasksForProject(){
        // taskNumber = 0;
        addTaskToDOM(tasktitle, description, duedate, taskpriority, thistaskNumber);
        
        
    }

    //function for when tasks have been removed
 
    function populateTasksForProjectAfterRemoval(index){        
        addTaskToDOM(tasktitle, description, duedate, taskpriority, index);
        console.log(index)
    }

    return{populateTasksForProject, thistaskNumber, populateTasksForProjectAfterRemoval}
}

export {taskFactory}