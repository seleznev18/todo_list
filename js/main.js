import { createLayout } from "./ui.js";
import { initApp } from "./logic.js";
import { loadTasks } from "./storage.js";

createLayout();

const tasks = loadTasks();
initApp(tasks);
