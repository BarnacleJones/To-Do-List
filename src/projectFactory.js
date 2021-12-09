import { updateProjectDOM } from "./updateProjectDOM";
import {closeProjectForm} from "./eventlisteners";
import {taskFactory} from "./taskFactory";

//variables
let allProjectsArray = [];
let currentproject = 0;
let projectArraycounter = 0;


//creates new project in allprojectsarray, puts it on the page - called from event listeners
function createProject(name){    
    allProjectsArray[projectArraycounter] = projectFactory(name)    
    allProjectsArray[projectArraycounter].putOnPage();
    closeProjectForm();
    projectArraycounter++;
}

//default project is highlighted when project starts
function initialProject(){
    let startingProject = document.getElementById("default");
    startingProject.style.backgroundColor = "lightgreen";
}


//selects the project when project name is clicked
//fills the area with just tasks of the project
function selectProject(e){    

    //the colour to change to grey for all project names
    let allProjectElements = document.getElementsByClassName("projectTitle");
    for (let index = 0; index < allProjectElements.length; index++) {
        const element = allProjectElements[index];
        element.style.backgroundColor = "grey";        
    }
    //just colour in the selected element
    document.getElementById(e.target.id).style.backgroundColor = "lightgreen";
    //go through all elements of the array holding all the projects
    for (let i = 0; i < allProjectsArray.length; i++) 
        {  //if the name of element and target ID are the same, that determines the current project selected
            if (e.target.id === allProjectsArray[i].name) 
                {
                currentproject = i;                
                }
            
        }
        //redraw projects array on the page  
    allProjectsArray[currentproject].populateChosenProjectDOM();    
}

function deleteTask(e){
    allProjectsArray[currentproject].removeTask(e);
}

//adds a task to current selected project - called from event listeners

function addTaskToProject(){
    allProjectsArray[currentproject].addTask();
}

const projectFactory = (suppliedName) => {
    
    //so i can see whats going on in logs
    let name = suppliedName;

    //create array for this project
    let projectArray = [];

    function putOnPage(){        
        updateProjectDOM(suppliedName);
    }

    let task;
    let taskNumber = 0;
    function addTask(){               
        // create the task, push to array
        task = taskFactory(taskNumber);
        // task.createTask();
        task.populateTasksForProject();
        projectArray.push(task);   
        console.log(task.thistaskNumber)
        taskNumber++;
    }
    
    function removeTask(id){
        
        // console.log("working for now but only removing one element and not correct one")
        // console.log(id)
        console.log("when it is spliced, the old button ID's are not relevant...")
        projectArray.splice(id, 1);
        
        taskNumber = projectArray.length;
        allProjectsArray[currentproject].populateChosenProjectDOM();
        console.log(taskNumber)

        //does this make a difference? try with and without - 
        //what if create a new function in task factory for populating the 
        //project on line 91 that restarts a counter - where else is that function called
        // taskNumber = 0;
    }


        //redraw projectsDisplay with elements of the project every time a project is clicked
    function populateChosenProjectDOM(){
        let displayArea = document.getElementById("mainDisplayInner");
        displayArea.innerHTML = "";
        for (let index = 0; index < projectArray.length; index++) {
            const element = projectArray[index];
            element.populateTasksForProjectAfterRemoval(index);                
        }
    
    }

    return {putOnPage, addTask, name, projectArray, populateChosenProjectDOM, removeTask}
    }
    


export {createProject, projectFactory, selectProject, addTaskToProject, initialProject, deleteTask}

