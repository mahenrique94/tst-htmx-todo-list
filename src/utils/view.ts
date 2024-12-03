import { Task } from "../repositories/task";

export const taskListItemUi = (task: Task) => {
  return `<li>${task.task} <button class="secondary" hx-delete="/api/tasks/${task.id}" hx-target="closest li" hx-swap="outerHTML">Delete</button></li>`;
};

export const noTasksListItemUi = () => {
  return '<li id="noTasks">No tasks</li>';
};
