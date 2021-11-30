import { addTask } from "./updateTaskDOM";
import { currentProject } from "./projectFactory";

//this is adding tasks to the dom now
//but it is not doing anything to do with the projects
//want it to allocate the task to the right project


//have added project as parameter - not doing anything right now
const newTask = (currentProject) => {
   
console.log("hi")
//function that will update dom
//returns task title
//pushes it to current project array??? dont think this will work
currentProject.push(addTask());
console.log(currentProject)

//  const addTask = () => project.push("test");
}

export {newTask}

//want to add task to the dom
//want this to be tied to the current project display array
//default project by default