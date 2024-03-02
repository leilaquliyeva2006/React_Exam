import { matchSorter } from "match-sorter";
import sortBy from "sort-by";


type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  };


  
export async function getTasks(query?: string): Promise<Task[]> {

    let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
  
    if (!tasks) tasks = [];
    if (query) {
      tasks = matchSorter(tasks, query, { keys: ["first", "last"] });
    }
  
    return tasks.sort(sortBy("last", "createdAt"));
  }

  export async function createTask(): Promise<Task> {
    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      title: "No Title",
      description: "No Description",
      completed: false,
    };
    let tasks = await getTasks();
    tasks.unshift(newTask);
    await setTasks(tasks);
    return newTask;
  }

  export async function getTask(id?: string): Promise<Task | null> {
    let tasks = await getTasks();
    let task = tasks.find((task) => task.id === id);
    return task ?? null;
  }
  
  export async function updateTask(
    id: string,
    updates: Partial<Task>
  ): Promise<Task> {
    let tasks = await getTasks();
    let task = tasks.find((task) => task.id === id);
    if (!task) throw new Error("No task found for " + id);
    Object.assign(task, updates);
    await setTasks(tasks);
    return task;
  }
  
  
export async function completeTask(id?: string): Promise<Task> {
    let tasks = await getTasks();
    let task = tasks.find((task) => task.id === id);
    if (!task) throw new Error("No task found for " + id);
    task.completed = !task.completed;
    await setTasks(tasks);
    return task;
  }
  
  export async function destroyTask(id: string): Promise<boolean> {
    let tasks = await getTasks();
    let index = tasks.findIndex((task) => task.id === id);
    if (index > -1) {
      tasks.splice(index, 1);
      await setTasks(tasks);
      return true;
    }
    return false;
  }
  
  function setTasks(tasks: Task[]): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  