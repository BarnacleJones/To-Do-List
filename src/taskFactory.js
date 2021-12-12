import {addTaskToDOM} from "./updateTaskDOM";


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
        addTaskToDOM(tasktitle, description, duedate, taskpriority, index);        
    }

    return{thistaskNumber, populateTasks, changePriority}
}

export {taskFactory}