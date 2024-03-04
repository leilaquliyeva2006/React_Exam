import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskType } from "./../components/Task";

type TasksState = {
  tasks: TaskType[];
  
}
const initialState: TasksState = {
    tasks: JSON.parse(localStorage.getItem("tasks") ?? "[]"),
  };
  
export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
      addTask: (state, action: PayloadAction<TaskType>) => {
        state.tasks.unshift(action.payload);
      },
      deleteTask: (state, action: PayloadAction<{ id: string }>) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      },
  
      editTask: (state, action: PayloadAction<{ id: string, title?: string, description?: string }>) => {
        const task = state.tasks.find((task) => task.id === action.payload.id);
        if (task) {
          task.title = action.payload.title ?? task.title;
          task.description = action.payload.description ?? task.description;
        }
      },
      completeTask: (state, action: PayloadAction<{ id: string }>) => {
        const task = state.tasks.find((task) => task.id === action.payload.id);
        if (task) task.completed = !task.completed;
      },
    },
  });
  
  export const { addTask, deleteTask, editTask, completeTask } = tasksSlice.actions;
  export default tasksSlice.reducer;
  