import React from 'react';
import { Form, useNavigate, useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editTask }  from '../../redux/slice';;

function EditForm() {
    const dispatch = useDispatch();
    const { task } = useLoaderData() as { task: { id: string; title: string; description: string } };
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updated = Object.fromEntries(formData) as { title: string; description: string };

        dispatch(
            editTask({
                id: task.id,
                title: updated.title,
                description: updated.description,
            })
        );
    };

    return (
        <>
            <Form method="post" id="task-form" onSubmit={handleSubmit}>
                <p>
                    <span>Title: </span>
                    <input
                        placeholder="Title"
                        aria-label="Title"
                        type="text"
                        name="title"
                        defaultValue={task.title}
                        maxLength={16}
                    />
                    <br />
                    <span>Description: </span>
                    <br />
                    <textarea
                        placeholder="Description"
                        aria-label="Description"
                        name="description"
                        defaultValue={task.description}
                    
                    ></textarea>
                </p>
                <p>
                    <button type="submit">Save</button>
                    <button
                        type="button"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Cancel
                    </button>
                </p>
            </Form>
        </>
    );
}

export default EditForm;
