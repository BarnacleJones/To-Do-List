import {addTaskToDOM} from "./updateTaskDOM";
   //lets try to make a class for the tasks and tie that in somehow
    //need to create a class for each task, push the actual task object
    //into the project array. then can clear the dom and just addtasktodom by redrawing dom
    //and populating with array items

const taskFactory = () =>{
    //projectArray is the project+array to push the task to
    //will be called by saying 
    //taskFactory(allProjectsArray[0/1/2/whatever].projectArray)

    function createTask(){
    //needs to get all values from the form
    let tasktitle = document.getElementById("title").value;
    let description = document.getElementById("Description").value;
    let duedate = document.getElementById("due").value;
    let taskpriority = document.getElementById("priority").value;
    //wrap them into object
    //add task to dom
    addTaskToDOM()
    }

    return{createTask}


}

export {taskFactory}