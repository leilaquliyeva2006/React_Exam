import React from 'react';
import Task from './Task';

import { TaskType } from "src/components/Task";

type TaskListProps = {
    tasks: TaskType[]
};

function TaskList({ tasks }: TaskListProps) {
    return (
        <>
            {tasks?.length ? (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}><Task task={task} /></li>
                    ))}
                </ul>
            ) : (
                <p>No tasks</p>
            )}
        </>
    );
}

export default TaskList;
