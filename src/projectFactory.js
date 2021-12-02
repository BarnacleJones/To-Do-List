import { updateProjectDOM } from "./updateProjectDOM";
import {addTaskToDOM} from "./updateTaskDOM";
import {closeProjectForm} from "./eventlisteners";
import {taskFactory} from "./taskFactory";

//variables
let allProjectsArray = [];
let currentproject = 0;
let projectArraycounter = 0

//creates new project in allprojectsarray, puts it on the page
function createProject(name){    
    allProjectsArray[projectArraycounter] = projectFactory(name)    
    allProjectsArray[projectArraycounter].putOnPage();
    closeProjectForm();   
    projectArraycounter++; 
}

//selects the project when project name is clicked
//want it to fill the area with just tasks of the project
function selectProject(e){
    

    //the colour to change to grey for all project names
    let allProjectElements = document.getElementsByClassName("projectTitle");
    for (let index = 0; index < allProjectElements.length; index++) {
        const element = allProjectElements[index];
        element.style.backgroundColor = "grey";        
    }
    //just colour in the selected element
    document.getElementById(e.target.id).style.backgroundColor = "lightgreen";
    //go through all elements of the array
    for (let i = 0; i < allProjectsArray.length; i++) 
        {  //if the name of element and target ID are the same, that determines the current project selected
            if (e.target.id === allProjectsArray[i].name) 
                {
                currentproject = i;
                
                }
            
        }
        //----------------need to redraw projects array on the page here 
        allProjectsArray[currentproject].populateChosenProjectDOM();
    console.log("current project index number is: " + currentproject);
}

//adds a task to current selected project - called from event listeners
//submit task - currentproject.addTask - or something
function addTaskToProject(){
    allProjectsArray[currentproject].addTask();
    console.log(allProjectsArray[currentproject].projectArray)
}

const projectFactory = (suppliedName) => {
    
    //so i can see whats going on in logs
    let name = suppliedName;

    //create array for this project
    let projectArray = [];

    function putOnPage(){        
        updateProjectDOM(suppliedName);
    }
    
    function addTask(){
        // create the task, push to array
        const task = taskFactory();
        task.createTask();
        projectArray.push(task);        
        console.log(projectArray)
    }

        //want this function to redraw projectsDisplay with elements of the project every time a project is clicked
    function populateChosenProjectDOM(){
        let displayArea = document.getElementById("mainDisplayInner");
        displayArea.innerHTML = "";
        for (let index = 0; index < projectArray.length; index++) {
            // const element = projectArray[index];
            //UP TO HERE
            //want to redraw now.....
            
            
        }
        // projectArray.forEach(element => {element.addTaskToDOM()});
    }

    return {putOnPage, addTask, name, projectArray, populateChosenProjectDOM}
    }
    


export {createProject, projectFactory, selectProject, addTaskToProject}

