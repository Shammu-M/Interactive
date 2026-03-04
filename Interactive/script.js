const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    tasks
        .filter(task => {
            if (filter === "active") return !task.completed;
            if (filter === "completed") return task.completed;
            return true;
        })
        .forEach((task, index) => {
            const li = document.createElement("li");

            li.innerHTML = `
                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>
                <div>
                    <button onclick="toggleTask(${index})">✔</button>
                    <button onclick="deleteTask(${index})">✖</button>
                </div>
            `;

            taskList.appendChild(li);
        });
}

// Add task
addBtn.addEventListener("click", () => {
    if (taskInput.value.trim() === "") return;

    tasks.push({
        text: taskInput.value,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    renderTasks();
});

// Toggle complete
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Filter tasks
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        renderTasks(button.dataset.filter);
    });
});

// Load tasks on start
renderTasks();