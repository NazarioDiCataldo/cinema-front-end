import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import WebSiteLayout from "./layouts/WebSiteLayout";
import HomePage from "./pages/HomePage";
import ActorsPage from "./pages/ActorsPage";
import SingleActorPage from "./pages/SingleActorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WebSiteLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/actors",
        children: [
          {
            index: true,
            element: <ActorsPage />,
          },
          {
            path: ":id",
            element: <SingleActorPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
