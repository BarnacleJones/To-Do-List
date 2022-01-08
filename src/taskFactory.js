import { addTaskToDOM } from './updateTaskDOM';

const taskFactory = (taskNumber) => {
  const tasktitle = document.getElementById('title').value;
  const description = document.getElementById('Description').value;
  const duedate = document.getElementById('due').value;
  const taskpriority = document.getElementById('priority').value;
  const thistaskNumber = taskNumber;

  function changePriority() {
    if (taskpriority === 'high') { taskpriority === 'low'; } else if (taskpriority === 'low') { taskpriority === 'high'; }
  }

  // function for when tasks have been removed

  function populateTasks(index) {
    addTaskToDOM(tasktitle, description, duedate, taskpriority, index);
  }

  return { thistaskNumber, populateTasks, changePriority };
};

export { taskFactory };
