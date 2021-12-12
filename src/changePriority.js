//this will change priority of the task
//update a color depending on priority level

function changePriority(id, divname, value){

    //name is value of the div container
    let div = document.getElementById(divname);

    
   if (value === "high") {
       div.style.backgroundColor = "green";
        //this is hacky, arent changing actual values of task so it doesnt stick
       document.getElementById(`priorityArea${id}`).innerText = "Priority: low";
       //need to change the actual tasks priority ???
       // allProjectsArray[currentproject].projectArray[0].changeTaskPriority();
   }
   else if (value === "low") {       
       div.style.backgroundColor = "orange";
        //this is hacky, arent changing actual values of task so it doesnt stick
       document.getElementById(`priorityArea${id}`).innerText = "Priority: high"
       //need to change the actual tasks priority ???
       // allProjectsArray[currentproject].projectArray[0].changeTaskPriority();
   }
 }

export {changePriority}