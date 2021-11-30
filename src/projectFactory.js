//want this to be called when new project is pushed

//create project (get name from document)
//clears main area, populates it with array of tasks for this project

import { selectProject } from "./updateProjectArray";
import { updateProjectDOM } from "./updateProjectDOM";

const projects = () => {
    let projectName = document.getElementById("projectTitle").value;
    //put project on page
    updateProjectDOM(projectName);
    //make array for this new project
    // let projectName = [];
    //update current project for tasks to go under
    // selectProject(projectName)
    }
    

export {projects}