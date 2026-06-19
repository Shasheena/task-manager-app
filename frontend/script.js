const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const API_URL = "http://localhost:5000/api/tasks";

async function fetchTasks() {
const response = await fetch(API_URL);
const tasks = await response.json();

renderTasks(tasks);
}

function renderTasks(tasks) {
taskList.innerHTML = "";

tasks.forEach(task => {
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

completeBtn.addEventListener("click", async () => {
  await fetch(`${API_URL}/${task._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      completed: !task.completed
    })
  });

  fetchTasks();
});

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "✖";
deleteBtn.classList.add("delete-btn");

deleteBtn.addEventListener("click", async () => {
  await fetch(`${API_URL}/${task._id}`, {
    method: "DELETE"
  });

  fetchTasks();
});

buttonDiv.appendChild(completeBtn);
buttonDiv.appendChild(deleteBtn);

li.appendChild(taskText);
li.appendChild(buttonDiv);

taskList.appendChild(li);


});
}

addTaskBtn.addEventListener("click", async () => {
const taskText = taskInput.value.trim();

if (!taskText) return;

await fetch(API_URL, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
text: taskText
})
});

taskInput.value = "";

fetchTasks();
});

fetchTasks();
