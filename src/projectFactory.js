import { updateProjectDOM } from "./updateProjectDOM";
import {addTaskToDOM} from "./updateTaskDOM";
import {closeProjectForm} from "./eventlisteners"

//array to hold all the projects
let allProjectsArray = [];


//function called when event listener fired, creates new project, pushes project to allprojectsarray, and puts it on the page
function createProject(name){
const project = projectFactory(name)
currentProject = project;
allProjectsArray.push(currentProject)
project.putOnPage();
closeProjectForm();
console.log(allProjectsArray)
}

//this is called when 'new project' is pushed
const projectFactory = (projectName) => {
    
    //create array for this project
    let projectArray = [];

    function putOnPage(){
    //put project on page
    updateProjectDOM(projectName);
    }
    
    function addTask(){
        let tasktitle = document.getElementById("title").value;
        projectArray.push(tasktitle);
        addTaskToDOM()
        console.log(projectArray)
    }

    return {putOnPage, addTask}
    }
    
//global value of what the current project selected is - default value first
let currentProject = projectFactory("default");
allProjectsArray.push(currentProject);
console.log(currentProject)

export {createProject, currentProject, projectFactory}

