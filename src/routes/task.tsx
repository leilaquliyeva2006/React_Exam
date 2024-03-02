import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getTask } from "../tasks";
import { TaskType } from "../components/Task";

type TaskLoaderData = {
  task: TaskType | null;
};

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<TaskLoaderData> {
  const task = await getTask(params.taskId);
  return { task };
}

function Task() {
  const { task } = useLoaderData() as TaskLoaderData;

  return (
    <div id="task">
      <div>
        <h1>{task?.title ? <>{task?.title}</> : <i>No Title</i>}</h1>
        <p>
          {task?.description ? <>{task?.description}</> : <i>No Description</i>}
        </p>
      </div>
    </div>
  );
}

export default Task;
