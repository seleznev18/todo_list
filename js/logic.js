import { saveTasks } from "./storage.js";

let tasks = [];
let draggedElement = null;

export function initApp(initialTasks) {
    tasks = initialTasks;
    renderTasks(tasks);
    initForm();
    initControls();
    initDragAndDrop();
}

function initForm() {
    const form = document.getElementById("task-form");
    const inputText = document.getElementById("task-text");
    const inputDate = document.getElementById("task-date");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = inputText.value.trim();
        const date = inputDate.value;

        if (!title || !date) return;

        const task = {
            id: Date.now(),
            title,
            date,
            completed: false
        };

        tasks.push(task);
        saveTasks(tasks);
        renderTasks(tasks);

        form.reset();
    });
}

function initControls() {
    const searchInput = document.getElementById("search-input");
    const statusFilter = document.getElementById("status-filter");
    const sortSelect = document.getElementById("sort-select");

    searchInput.addEventListener("input", updateRender);
    statusFilter.addEventListener("change", updateRender);
    sortSelect.addEventListener("change", updateRender);
}

export function renderTasks(taskArray) {
    const list = document.getElementById("task-list");
    list.innerHTML = "";

    taskArray.forEach(task => {
        const li = createTaskItem(task);
        list.appendChild(li);
    });
}

function createTaskItem(task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;
    li.draggable = true;

    if (task.completed) {
        li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks(tasks);
        renderTasks(tasks);
    });

    const span = document.createElement("span");
    span.textContent = task.title;
    span.addEventListener("dblclick", () => editTask(task.id, span, dateEl));


    const dateEl = document.createElement("time");
    dateEl.textContent = task.date;


    const editBtn = document.createElement("button");
    editBtn.textContent = "✏";
    editBtn.addEventListener("click", () => editTask(task.id, span, dateEl));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks(tasks);
        renderTasks(tasks);
    });

    li.append(checkbox, span, dateEl, editBtn, deleteBtn);

    li.addEventListener("dragstart", (e) => {
        draggedElement = li;
        li.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
    });

    li.addEventListener("dragend", () => {
        draggedElement = null;
        li.classList.remove("dragging");
    });

    li.addEventListener("dragover", (e) => {
        e.preventDefault();
        li.classList.add("over");
    });

    li.addEventListener("dragleave", () => {
        li.classList.remove("over");
    });

    li.addEventListener("drop", () => {
        if (!draggedElement || draggedElement === li) return;

        const fromId = parseInt(draggedElement.dataset.id);
        const toId = parseInt(li.dataset.id);
        const fromIndex = tasks.findIndex(t => t.id === fromId);
        const toIndex = tasks.findIndex(t => t.id === toId);

        tasks.splice(toIndex, 0, tasks.splice(fromIndex, 1)[0]);
        saveTasks(tasks);
        renderTasks(tasks);
    });

    return li;
}

function editTask(id, spanEl, dateEl) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.value = task.title;

    const inputDate = document.createElement("input");
    inputDate.type = "date";
    inputDate.value = task.date;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Сохранить";

    spanEl.replaceWith(inputText);
    dateEl.replaceWith(inputDate);
    inputDate.after(saveBtn);

    saveBtn.addEventListener("click", () => {
        task.title = inputText.value.trim() || task.title;
        task.date = inputDate.value || task.date;
        saveTasks(tasks);
        renderTasks(tasks);
    });
}

function updateRender() {
    const searchValue = document.getElementById("search-input").value.toLowerCase();
    const statusValue = document.getElementById("status-filter").value;
    const sortValue = document.getElementById("sort-select").value;

    let filtered = [...tasks];

    if (searchValue) {
        filtered = filtered.filter(t => t.title.toLowerCase().includes(searchValue));
    }

    if (statusValue === "active") {
        filtered = filtered.filter(t => !t.completed);
    } else if (statusValue === "completed") {
        filtered = filtered.filter(t => t.completed);
    }

    if (sortValue === "asc") {
        filtered.sort((a, b) => a.date.localeCompare(b.date));
    } else if (sortValue === "desc") {
        filtered.sort((a, b) => b.date.localeCompare(a.date));
    }

    renderTasks(filtered);
}


export function initDragAndDrop() {
}
