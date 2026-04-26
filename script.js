if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}
//dark mode

let tasks = []; // Array to hold tasks
let input = document.getElementById("taskInput");
let draggedItem = null; //draggable


document.getElementById("addTaskBtn").addEventListener("click", function () {
    //get value from input field
    let taskInput = document.getElementById("taskInput").value.trim();
    //check if Input is empty
    if (!taskInput) return;

    if (tasks.includes(taskInput)) {
        alert("You already added that task!");
        return;
    }

    //add new task to task array
    tasks.push(taskInput);
    document.getElementById("taskInput").value = "";
    displayTasks();
    input.focus();
});


document.getElementById("taskInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        //get value from input field
        let taskInput = document.getElementById("taskInput").value;

        if (taskInput) {

            if (tasks.includes(taskInput)) {
                alert("You already added that task!");
                return;
            }     // prevent adding duplicate tasks


            //add task to array
            tasks.push(taskInput);
            //clear input field
            document.getElementById("taskInput").value = "";
            //render tasks to the list
            displayTasks();
        }
    }

});

function displayTasks() {
    //get the task list element
    let taskList = document.getElementById("taskList");
    //clear the current list
    taskList.innerHTML = "";
    //loop through tasks and create list items
    tasks.forEach((task, index) => {
        //create list item
        let li = document.createElement("li");
        //add styling
        li.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center",
            "taskback",
        );
        li.setAttribute("draggable", true); //draggable
        li.setAttribute("data-index", index); //draggable
        li.addEventListener("dragstart", () => {
            draggedItem = li;
        }); //draggable
        //set the innerHTML of the task list to the new list items
        li.innerHTML = `
<button class="btn btncheck btn-sm me-2" onclick="toggleComplete(this)">Mark As Done</button> 
<!--mark as done button-->
<span class="flex-grow-1">${task}</span>
<button class="btn btncheck btn-sm ms-2" onclick='removeTask(${index})'>☆</button>
`;
        //append the new list items to the task list element
        taskList.appendChild(li);
    });

    updateTaskCounter();
}

//begin of draggable
document.getElementById("taskList").addEventListener("dragover", (e) => {
    e.preventDefault();
});

document.getElementById("taskList").addEventListener("drop", (e) => {
    e.preventDefault();

    let target = e.target.closest("li");
    if (!target || !draggedItem) return;

    let taskList = document.getElementById("taskList");

    let draggedIndex = Number(draggedItem.getAttribute("data-index"));
    let targetIndex = Number(target.getAttribute("data-index"));

    // reorder array safely
    let draggedTask = tasks[draggedIndex];
    tasks.splice(draggedIndex, 1);
    tasks.splice(targetIndex, 0, draggedTask);

    displayTasks();
});
draggedItem = null;
//end of draggable

function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

document.getElementById("clearTasksBtn").addEventListener("click", function () {
    tasks = [];
    displayTasks();
});

function updateTaskCounter() {
    let counter = document.getElementById("taskCounter");
    counter.textContent = `Total Tasks: ${tasks.length}`;

    counter.style.transform = "scale(1.2)";
    setTimeout(() => {
        counter.style.transform = "scale(1)";
    }, 150);
}

function toggleComplete(button) {
    let taskItem = button.parentElement; // this = button → parent = <li>
    taskItem.classList.toggle("completed");
}
//mark as done button

//dark mode toggle
document.getElementById("darkModeBtn").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // optional: save preference
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});