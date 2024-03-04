import React from "react";
import { Form } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask }  from '../../redux/slice';
import { destroyTask } from "../../tasks";
import { useNavigate } from "react-router-dom";
import { TaskType } from "../Task";


type DeleteFormProps = {
    task: TaskType;
};

const DeleteForm = ({ task }: DeleteFormProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(deleteTask({ id: task.id }));
        await destroyTask(task.id);
        navigate('/');
    };

    return (
        <>
            <Form method="post" action={`tasks/${task.id}/destroy`}>
                <button onClick={handleDeleteClick} type="submit">
                    Delete
                </button>
            </Form>
        </>
    );
};

export default DeleteForm;
