import crypto from "node:crypto";

export type Task = {
  id: string;
  task: string;
  date: number;
};

export class TaskRepository {
  private tasks: Task[];
  private static instance;

  public constructor() {
    this.tasks = [];
  }

  public static singleton(): TaskRepository {
    if (TaskRepository.instance == null) {
      TaskRepository.instance = new TaskRepository();
    }

    return TaskRepository.instance;
  }

  public add(task: string): Task {
    const newTask = {
      id: crypto.randomUUID(),
      task,
      date: Date.now(),
    };

    this.tasks.push(newTask);

    return newTask;
  }

  public delete(id: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  public getAll(): Task[] {
    return this.tasks;
  }
}
