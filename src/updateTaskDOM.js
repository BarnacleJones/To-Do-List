import { closeTaskForm } from './eventlisteners';
import { allProjectsArray, currentproject, projectFactory } from './projectController';

// this function is getting values from task form
// and appending the task to the dom

function addTaskToDOM(tasktitle, description, duedate, taskpriority, thistaskNumber) {
  const taskArea = document.getElementById('mainDisplayInner');
  const newDiv = document.createElement('DIV');
  newDiv.setAttribute('id', `div${thistaskNumber}`);

  if (taskpriority === 'high') {
    newDiv.style.backgroundColor = 'orange';
  } else if (taskpriority === 'low') {
    newDiv.style.backgroundColor = 'green';
  }

  newDiv.innerHTML = `<h3>${tasktitle}</h3>
    <p>${description}</p>
    <p>Due: ${duedate}</p>
    <p id="priorityArea${thistaskNumber}">Priority: ${taskpriority}</p>
    <button class="priorityButton" id="${thistaskNumber}" name="div${thistaskNumber}" value="${taskpriority}">Change Priority</button>
    <button class="deleteButton" id="${thistaskNumber}"> Delete Task </button>`;

  taskArea.appendChild(newDiv);

  closeTaskForm();
}

export { addTaskToDOM };
