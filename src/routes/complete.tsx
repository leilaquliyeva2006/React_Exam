import { ActionFunctionArgs, NavigateFunction } from "react-router-dom";
import { completeTask } from "../tasks";


export async function action({ params }: ActionFunctionArgs): Promise<NavigateFunction> {
    await completeTask(params.taskId);

    return () => `/tasks/${params.taskId}`;
}
