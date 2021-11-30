import { selectProject } from "./updateProjectArray";

function updateProjectDOM(project){
    let projectArea = document.getElementById("projectsDisplay");
    let newh2 = document.createElement("h2");
    newh2.innerText = project;
    newh2.setAttribute("class", project);
    // newh2.addEventListener("click", selectProject(project))
    projectArea.appendChild(newh2);
}

export {updateProjectDOM}