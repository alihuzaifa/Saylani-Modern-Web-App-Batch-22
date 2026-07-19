var taskList = document.getElementById('taskList');
// 0 1 2 3
var tasks = []
// console.log(tasks[2]);


function addTask() {
    var userTask = prompt("Enter your task?");
    if (userTask === "") {
        alert("Please fill a value")
    } else {
        tasks.push(userTask);
        displayTasks()
    }
}


function displayTasks() {
    taskList.innerHTML = ""
    for (var i = 0; i < tasks.length; i++) {
        var item = tasks[i];
        // opening tag + item + tag + inndex parameter + closing tag
        taskList.innerHTML += `<li>
          <span class="task">${item}</span>
          <div>
            <button class="delete" onclick="deleteTask(${i})">🗑</button>
            <button class="edit" onclick="editTask(${i})">✏️</button>
          </div>
        </li>`
    }
}

function deleteTask(index) {
    tasks.splice(index, 1)
    displayTasks()
}

function editTask(index) {
    // console.log(index);
    // console.log(tasks[1]);
    // var data = tasks[index];

    var userValue = prompt("Please update your value", tasks[index]);
    tasks.splice(index, 1, userValue);
    displayTasks()
}


// var number = 10;
// number += 20;
// console.log(number);



displayTasks()