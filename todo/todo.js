document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.querySelector("#task-input");
    const addTaskButton = document.querySelector("#add-task");
    const taskList = document.querySelector("#task-list");
    const todoToggle = document.querySelector("#todo-toggle");
    const todoContainer = document.querySelector("#todo");

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = ""; 

        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.className = task.completed ? "completed" : "";
            taskItem.setAttribute("draggable", "true"); 
            taskItem.setAttribute("data-index", index); 

            const buttonContainer = document.createElement("div");
            buttonContainer.className = "button-container";

            buttonContainer.innerHTML = `
                <button class="complete-task" data-index="${index}">✔</button>
                <button class="delete-task" data-index="${index}">✖</button>
            `;

            taskItem.innerHTML = `<span>${task.text}</span>`;
            taskItem.appendChild(buttonContainer);
            taskList.appendChild(taskItem);

            // Add drag event listeners
            taskItem.addEventListener("dragstart", handleDragStart);
            taskItem.addEventListener("dragover", handleDragOver);
            taskItem.addEventListener("drop", handleDrop);
            taskItem.addEventListener("dragend", handleDragEnd);
        });
    };

    // Drag and Drop Handlers
    let draggedItemIndex = null;

    const handleDragStart = (e) => {
        draggedItemIndex = e.target.getAttribute("data-index");
        e.target.classList.add("dragging");
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Allow dropping
        const target = e.target.closest("li");
        if (target && target !== e.target) {
            target.classList.add("drag-over");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const target = e.target.closest("li");
        if (target) {
            const targetIndex = target.getAttribute("data-index");
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

            // Swap tasks in the array
            const draggedTask = tasks[draggedItemIndex];
            tasks.splice(draggedItemIndex, 1);
            tasks.splice(targetIndex, 0, draggedTask);

            // Save and reload tasks
            saveTasks(tasks);
            loadTasks();
        }
    };

    const handleDragEnd = (e) => {
        e.target.classList.remove("dragging");
        document.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));
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

    // Toggle visibility of the todo container
    todoToggle.addEventListener("click", () => {
        todoContainer.classList.toggle("hidden");
    });

    loadTasks();
});