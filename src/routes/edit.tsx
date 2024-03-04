
import { redirect, RouteProps } from "react-router-dom";
import { updateTask } from "../tasks";
import { useParams } from "react-router-dom";

type ActionProps = RouteProps & { request: Request };

async function action({ request }: ActionProps) {
  const { taskId } = useParams<{ taskId: string | undefined }>();
  if (taskId === undefined) {
    return redirect("/"); 
  }

  const formData = await request.formData();
  const updates = Object.fromEntries(formData) as Record<string, string>;

  await updateTask(taskId, updates);

  return redirect(`/tasks/${taskId}`);
}



export { action };

