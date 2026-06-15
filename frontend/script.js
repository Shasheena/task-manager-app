const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    if (task.completed) {
      taskText.classList.add("completed");
    }

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("task-buttons");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.classList.add("complete-btn");

    completeBtn.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    buttonDiv.appendChild(completeBtn);
    buttonDiv.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(buttonDiv);

    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  tasks.push({
    text: taskText,
    completed: false
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
});

renderTasks();