document.getElementById("add-task").addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", loadTasks)

// On page load Load all tasks
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || []);
  tasks.forEach((task) => addTaskToDom(task));
}

// Add Task
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value;
  console.log(taskText);

  if (taskText.trim().length > 0) {
    addTaskToDom(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = "";
    debugger;
  }
  
}

// Add Task to DOM
function addTaskToDom(task) {
  const taskList = document.getElementById("task-list");

  // create li element
  const li = document.createElement("li");
  li.textContent = task;
  li.classList.add("mb-3");
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // create delete btn element
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent triggering the click event on the li
    taskList.removeChild(li);
    removeTaskFromLocalStorage(task);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save task to local storage
function saveTaskToLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from local storage
function removeTaskFromLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
