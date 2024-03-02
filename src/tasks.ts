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
  