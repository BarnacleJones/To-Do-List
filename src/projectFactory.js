import { updateProjectDOM } from "./updateProjectDOM";
import {addTaskToDOM} from "./updateTaskDOM";
import {closeProjectForm} from "./eventlisteners"

//array to hold all the projects
let allProjectsArray = [];

//global value for creating new projects based on name field
let projectName;

//function called when event listener fired, creates new project, pushes project to allprojectsarray, and puts it on the page
function createProject(name){
    
    projectName = projectFactory(name)    
    allProjectsArray.push(projectName)
    projectName.putOnPage();
    console.log("new project created, called "+projectName.name)
    closeProjectForm();    
}

let currentproject = "default";
function selectProject(e){
    console.log(e.target.id);
    currentproject = e.target.id;
    console.log("current project is now: " + currentproject)
    // projectName = currentproject;
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
        //just pushing title for now. Will need to push whole object for removing..somehow
        let tasktitle = document.getElementById("title").value;
        projectArray.push(tasktitle);
        addTaskToDOM()
    }

    return {putOnPage, addTask, name}
    }
    


export {createProject, projectFactory, projectName, selectProject, currentproject}

