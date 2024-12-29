import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../apps/dashboard";
import { Editor } from "../apps/editor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/editor/:novellId",
    element: <Editor />,
  },
  {
    path: "/editor/:novellId/:chapterId",
    element: <Editor />,
  },
]);
