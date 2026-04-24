let tasks = [] // Array to hold tasks
let input = document.getElementById('taskInput');


document.getElementById('addTaskBtn').addEventListener('click', function () {
    //get value from input field
    let taskInput = document.getElementById('taskInput').value

    if (taskInput) {
        //add task to array
        tasks.push(taskInput)
        //clear input field
        document.getElementById('taskInput').value = ''
        //render tasks to the list
        displayTasks()
    }
    input.focus();
})



document.getElementById('taskInput').addEventListener('keydown', (e) => {

    if (e.key === 'Enter') {

        //get value from input field
        let taskInput = document.getElementById('taskInput').value

        if (taskInput) {
            //add task to array
            tasks.push(taskInput)
            //clear input field
            document.getElementById('taskInput').value = ''
            //render tasks to the list
            displayTasks()
        }
    }

})


function displayTasks() {
    //get the task list element
    let taskList = document.getElementById('taskList')
    //clear the current list
    taskList.innerHTML = ''
    //loop through tasks and create list items
    tasks.forEach((task, index) => {
        //create list item
        let li = document.createElement('li')
        //add styling
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'taskback')
        //set the innerHTML of the task list to the new list items
        li.innerHTML = `${task} <button class="btn btncheck btn-sm" onclick='removeTask(${index})'>☆</button>`
        //append the new list items to the task list element
        taskList.appendChild(li)
    })
}

function removeTask(index) {
    tasks.splice(index, 1)
    displayTasks()
}

document.getElementById('clearTasksBtn').addEventListener('click', function () {
    tasks = []
    displayTasks()
})

// document.getElementById('addTaskBtn').addEventListener('click', function () {
//     if (addTaskBtn) return;

//     let input = document.getElementById("taskInput");
//     let guess = input.value();
//     input.value = "";

//     if (guessedLetters.includes(taskInput)) {
//         setMessage("You have already whispered that letter.");
//         return;
//     }
// })
