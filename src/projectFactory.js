import { updateProjectDOM } from "./updateProjectDOM";

//array to hold all the projects
let allProjectsArray = [];

//global value of what the current project selected is
let currentProject = "default";

//this is called when 'new project' is pushed
const projects = (projectName) => {
    

    //put project on page
    updateProjectDOM(projectName);

    //make array for this new project
    // projectName = [];

    //push that to the global project array
    allProjectsArray.push([projectName])

    //update current project for tasks to go under
    currentProject = projectName;
    console.log("projectname array: " + projectName) //showing empty
    console.log("current project is "+currentProject) //showing empty
    console.log("all projects array: " + allProjectsArray) //showing empty

    }
    //clears main area, populates it with array of tasks for this project


//want this to be run any time a project name is clicked, changes the array to whatever is clicked
//and fills in the to do area with the tasks in that array

function selectProject(project){
    //have this function update main task area with contents of project array    
    //return the project name to taskfactory
    return project;
    }
    

export {projects, currentProject}