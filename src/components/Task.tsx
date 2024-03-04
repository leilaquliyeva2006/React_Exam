import { Form, NavLink, useFetcher } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { completeTask }  from '../redux/slice';
import DeleteForm from './forms/DeleteForm';

export type TaskType = {
    id: string;
    title: string;
    completed: boolean;
    description :string | undefined;
};

function Task({ task }: { task: TaskType }) {
    return (
        <>
            <CheckBox task={task} />
            <NavLink to={`tasks/${task.id}`}>
                {task.title ? <>{task.title}</> : <i>No Title</i>}
                {''}
            </NavLink>
            <Form action={`tasks/${task.id}/edit`}>
                <button type="submit">Edit</button>
            </Form>
            <DeleteForm task={task} />
        </>
    );
}

function CheckBox({ task }: { task: TaskType }) {
    const fetcher = useFetcher();
    const dispatch = useDispatch();
    let isCompleted = task.completed;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(completeTask({ id: task.id }));
    };

    return (
        <fetcher.Form method="post" action={`tasks/${task.id}/complete`}>
            <button
                name="isCompleted"
                value={isCompleted ? 'true' : 'false'}
                onClick={handleClick}
            >
                {isCompleted ? '▣' : '▢'}
            </button>
        </fetcher.Form>
    );
}

export default Task;
