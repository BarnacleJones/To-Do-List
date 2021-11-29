function showForm(){
    document.getElementById("formArea").style.display = "inherit";
    // document.getElementById("mainDisplay").style.display = "none";
    console.log("working")
}

function closeForm(){
    document.getElementById("formArea").style.display = "none";
}

function newProjectlistener(){
//event listners for navigation
document.addEventListener("click", (e) => {
    const target = e.target.className;
    if (target === "addProject") showForm();
    if (target === "close") closeForm();
})
}

export {newProjectlistener}