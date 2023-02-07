// Hold Elements
let inputField = document.querySelector(".input");
let addTask = document.querySelector(".add");
let tasksBox = document.querySelector(".tasks");

// Intialize Empty Array To Store Tasks In
let tasksArray = [];

// Get Tasks From LocalStorage
if (localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(localStorage.getItem("tasks"));
  // Show Delete Button
  if (tasksArray.length > 0) {
    document.querySelector(".del-All").style.display = "block";
  }
  getTasks(tasksArray);
}
function getTasks(tasksArray) {
  for (let i = 0; i < tasksArray.length; i++) {
    let taskDiv = document.createElement("div");
    let taskName = document.createElement("span");
    taskName.append(document.createTextNode(tasksArray[i].title));
    taskDiv.append(taskName);
    if (tasksArray[i].completed === true) {
      taskDiv.className = "task done";
    } else {
      taskDiv.className = "task";
    }
    taskDiv.setAttribute("data-id", tasksArray[i].id);
    let delBtn = document.createElement("span");
    delBtn.textContent = "Delete";
    delBtn.className = "del";
    taskDiv.append(delBtn);

    tasksBox.append(taskDiv);
  }
}

// Add Tasks To The Page
addTask.onclick = () => {
  if (inputField.value != "") {
    addTasks();
  }
};
document.onkeyup = (e) => {
  if (inputField.value != "") {
    if (e.key === "Enter") {
      addTasks();
    }
  }
};
function addTasks() {
  // Set Task Properties
  let task = {
    id: Date.now(),
    title: inputField.value,
    completed: false,
  };

  // Store Tasks In An Array
  tasksArray.push(task);

  // Store Tasks In LocalStorage
  localStorage.setItem("tasks", JSON.stringify(tasksArray));

  // Create Task Element
  let taskDiv = document.createElement("div");
  let taskName = document.createElement("span");
  taskName.append(document.createTextNode(task.title));
  taskDiv.append(taskName);
  taskDiv.className = "task";
  taskDiv.setAttribute("data-id", task.id);
  let delBtn = document.createElement("span");
  delBtn.textContent = "Delete";
  delBtn.className = "del";
  taskDiv.append(delBtn);

  tasksBox.append(taskDiv);
  // Show Delete Button
  document.querySelector(".del-All").style.display = "block";
  inputField.value = "";
}

// Events On Tasks
tasksBox.addEventListener("click", (e) => {
  // Delete Task
  if (e.target.className === "del") {
    e.target.parentElement.remove();

    // Update LocalStorage
    tasksArray = tasksArray.filter((ele) => {
      return ele.id != e.target.parentElement.dataset.id;
    });
    // Hide Delete Button
    if (tasksArray.length <= 0) {
      document.querySelector(".del-All").style.display = "none";
    }
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
  // Mark As Copmleted
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");

    // Update LocalStorage
    tasksArray.forEach((ele) => {
      if (ele.id == e.target.dataset.id) {
        ele.completed === false
          ? (ele.completed = true)
          : (ele.completed = false);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
});

// Delete All Tasks
document.querySelector(".del-All").onclick = (e) => {
  // Hide Delete Button
  document.querySelector(".del-All").style.display = "none";
  tasksArray = [];
  tasksBox.innerHTML = "";
  localStorage.setItem("tasks", []);
};
