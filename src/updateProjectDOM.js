//this function is solely getting the name of the project and adding it to the dom
let counter =0;

function updateProjectDOM(project){
    let projectArea = document.getElementById("projectList");
    let newh2 = document.createElement("div");
    // newh2.innerText = project;
    newh2.innerHTML = `<h3>${project}</h3><button id="${counter}" class="projectButton">Delete</button?`
    newh2.setAttribute("class", "projectTitle");
    newh2.setAttribute("id", project);
    projectArea.appendChild(newh2);
    counter++;
}


export {updateProjectDOM}