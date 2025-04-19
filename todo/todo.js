document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.querySelector("#task-input");
    const addTaskButton = document.querySelector("#add-task");
    const taskList = document.querySelector("#task-list");

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = ""; // Clear the list
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.className = task.completed ? "completed" : "";

            const buttonContainer = document.createElement("div");
            buttonContainer.className = "button-container";

            buttonContainer.innerHTML = `
                <button class="complete-task" data-index="${index}">✔</button>
                <button class="delete-task" data-index="${index}">✖</button>
            `;

            taskItem.innerHTML = `<span>${task.text}</span>`;
            taskItem.appendChild(buttonContainer);
            taskList.appendChild(taskItem);
        });
    };

    // Save tasks to localStorage
    const saveTasks = (tasks) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Add a new task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);
        taskInput.value = ""; // Clear input
        loadTasks();
    };

    // Mark a task as complete
    const completeTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        loadTasks();
    };

    // Delete a task
    const deleteTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        saveTasks(tasks);
        loadTasks();
    };

    // Event listeners
    addTaskButton.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });
    addTaskButton.addEventListener("click", addTask);
    taskList.addEventListener("click", (e) => {
        if (e.target.classList.contains("complete-task")) {
            completeTask(e.target.dataset.index);
        } else if (e.target.classList.contains("delete-task")) {
            deleteTask(e.target.dataset.index);
        }
    });

    // Initial load
    loadTasks();
});