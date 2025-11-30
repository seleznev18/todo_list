export function createLayout() {
    const main = document.createElement("main");

    const title = document.createElement("h1");
    title.textContent = "ToDo List";

    const form = document.createElement("form");
    form.id = "task-form";

    const inputText = document.createElement("input");
    inputText.type = "text";
    inputText.placeholder = "Введите задачу";
    inputText.id = "task-text";
    inputText.required = true;

    const inputDate = document.createElement("input");
    inputDate.type = "date";
    inputDate.id = "task-date";
    inputDate.required = true;

    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.textContent = "Добавить";

    form.append(inputText, inputDate, addButton);

    const controls = document.createElement("div");
    controls.className = "controls";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Поиск";
    searchInput.id = "search-input";

    const statusFilter = document.createElement("select");
    statusFilter.id = "status-filter";

    const filterAll = document.createElement("option");
    filterAll.value = "all";
    filterAll.textContent = "Все";

    const filterActive = document.createElement("option");
    filterActive.value = "active";
    filterActive.textContent = "Невыполненные";

    const filterCompleted = document.createElement("option");
    filterCompleted.value = "completed";
    filterCompleted.textContent = "Выполненные";

    statusFilter.append(filterAll, filterActive, filterCompleted);

    const sortSelect = document.createElement("select");
    sortSelect.id = "sort-select";

    const sortDefault = document.createElement("option");
    sortDefault.value = "default";
    sortDefault.textContent = "Без сортировки";

    const sortDateAsc = document.createElement("option");
    sortDateAsc.value = "asc";
    sortDateAsc.textContent = "По дате ↑";

    const sortDateDesc = document.createElement("option");
    sortDateDesc.value = "desc";
    sortDateDesc.textContent = "По дате ↓";

    sortSelect.append(sortDefault, sortDateAsc, sortDateDesc);

    controls.append(searchInput, statusFilter, sortSelect);

    const taskList = document.createElement("ul");
    taskList.id = "task-list";

    main.append(title, form, controls, taskList);
    document.body.appendChild(main);
}
