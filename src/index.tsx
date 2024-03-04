import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Index from "./routes";
import ErrorPage from "./components/ErrorPage";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import EditTask, { action as editTaskAction } from "./routes/edit";

import Task, { loader as taskLoader } from "./routes/task";
import { action as completeTaskAction } from "./routes/complete";

const container = document.getElementById("root");

if (container === null) throw new Error("You don't have root element");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <div>Unexpected error!</div>,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "tasks/:taskId",
            element: <Task />,
            loader:taskLoader
          },
             {
            path: "tasks/:taskId/edit",
            element: <EditTask />,
            action: editTaskAction,
            loader:taskLoader
          },
          {
            path: "tasks/:taskId/destroy",
          },
          {
            path: "tasks/:taskId/complete",
            action: completeTaskAction,
          },
        ],
      },
    ],
  },
]);

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
