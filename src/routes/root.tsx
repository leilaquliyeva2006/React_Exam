import { useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { matchSorter } from "match-sorter";
import TaskList from "../components/TaskList";
import { createTask } from "../tasks";
import { useSelector } from "react-redux";
import SearchForm from "../components/forms/SearchForm";

const Root = () => {
  const { q } = useLoaderData() as { q: string };
  const tasks = useSelector((state: any) => state.slice.tasks);
  const [filter, setFilter] = useState("all");
  const tasksByQuery = q
    ? matchSorter(tasks, q, { keys: ["title", "description"] })
    : tasks;
  const navigation = useNavigation();

  const filteredTasks = tasksByQuery.filter((task: any) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "incomplete") {
      return !task.completed;
    }
    return true;
  });

  return (
    <>
      <div id="sidebar">
        <div>
          <SearchForm query={q} />

        </div>
        <nav>
          <button onClick={() => setFilter("all")}>Show All</button>
          <button onClick={() => setFilter("completed")}>Show Completed</button>
          <button onClick={() => setFilter("incomplete")}>
            Show Incomplete
          </button>

          <TaskList tasks={filteredTasks} />
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
};

export async function action(): Promise<Response> {
  const currentTask = await createTask();

  return redirect(`/tasks/${currentTask.id}/edit`);
}
export async function loader({
  request,
}: {
  request: Request;
}): Promise<{ q: string | null }> {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  return { q };
}

export default Root;
