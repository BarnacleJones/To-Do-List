import { updateProjectDOM } from './updateProjectDOM';
import { closeProjectForm } from './eventlisteners';
import { taskFactory } from './taskFactory';

// variables
const allProjectsArray = [];
let currentproject = 0;
let projectArraycounter = 0;
let buttonCounter = 0;

// creates new project in allprojectsarray, puts it on the page - called from event listeners
function createProject(name) {
  allProjectsArray[projectArraycounter] = projectFactory(name);
  allProjectsArray[projectArraycounter].putOnPage(buttonCounter);
  closeProjectForm();
  projectArraycounter++;
  buttonCounter++;
}

// default project is highlighted when project starts
function initialProject() {
  const startingProject = document.getElementById('default');
  startingProject.style.backgroundColor = 'lightgray';
}

// selects the project when project name is clicked
// fills the area with just tasks of the project
function selectProject(e) {
  // the colour to change to grey for all project names
  const allProjectElements = document.getElementsByClassName('projectTitle');
  for (let index = 0; index < allProjectElements.length; index++) {
    const element = allProjectElements[index];
    element.style.backgroundColor = 'grey';
  }
  // just colour in the selected element
  document.getElementById(e.target.id).style.backgroundColor = 'lightgray';
  // go through all elements of the array holding all the projects
  for (let i = 0; i < allProjectsArray.length; i++) { // if the name of element and target ID are the same, that determines the current project selected
    if (e.target.id === allProjectsArray[i].name) {
      currentproject = i;
    }
  }
  // redraw that projects tasks(array) on the page
  allProjectsArray[currentproject].populateChosenProjectDOM();
}

function deleteTask(e) {
  allProjectsArray[currentproject].removeTask(e);
}

// adds a task to current selected project - called from event listeners

function addTaskToProject() {
  allProjectsArray[currentproject].addTask();
}

function deleteProject(id) {
  // all projects array splice
  allProjectsArray.splice(id, 1);
  const projectArea = document.getElementById('projectList');
  const taskArea = document.getElementById('mainDisplayInner');
  taskArea.innerHTML = '';
  projectArea.innerHTML = '';
  // redraw all elements of array
  buttonCounter = 0;
  projectArraycounter--;
  for (let index = 0; index < allProjectsArray.length; index++) {
    allProjectsArray[index].putOnPage(buttonCounter);
    buttonCounter++;
  }
  // make default highlighted
  initialProject();
}

const projectFactory = (suppliedName) => {
  // so i can see whats going on in logs
  const name = suppliedName;

  // create array for this project
  const projectArray = [];

  function putOnPage(buttonCounter) {
    updateProjectDOM(suppliedName, buttonCounter);
  }

  let task;
  let taskNumber = 0;
  function addTask() {
    // create the task
    task = taskFactory(taskNumber);
    // draw the task out
    task.populateTasks(taskNumber);
    // push to array
    projectArray.push(task);

    taskNumber++;
  }

  function changeTaskPriority() {
    task.changePriority();
  }

  function removeTask(id) {
    projectArray.splice(id, 1);
    taskNumber = projectArray.length;
    allProjectsArray[currentproject].populateChosenProjectDOM();
  }

  // redraw projectsDisplay with elements of the project every time a project is clicked
  function populateChosenProjectDOM() {
    const displayArea = document.getElementById('mainDisplayInner');
    displayArea.innerHTML = '';
    for (let index = 0; index < projectArray.length; index++) {
      const element = projectArray[index];
      element.populateTasks(index);
    }
  }

  return {
    putOnPage, addTask, name, projectArray, populateChosenProjectDOM, removeTask, changeTaskPriority,
  };
};

export {
  createProject, projectFactory, selectProject, addTaskToProject, initialProject, deleteTask, deleteProject, allProjectsArray, currentproject,
};
