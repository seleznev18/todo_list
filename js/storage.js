const STORAGE_KEY = "todo_tasks";

export function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function loadTasks() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (e) {
        console.error("Ошибка чтения localStorage:", e);
        return [];
    }
}
