import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import Saved from "../Pages/Saved";
import Notification from "../Pages/Notifications";
import Settings from "../Pages/Settings";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import NotFound from "../Pages/NotFound";
import ProtectedRoute from "./Guards/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "feed", element: <ProtectedRoute><Home /></ProtectedRoute> },
     { path: "my-posts", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "community", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "saved", element: <ProtectedRoute><Saved /></ProtectedRoute> },
      { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "notifications", element: <ProtectedRoute><Notification /></ProtectedRoute> },
      { path: "settings", element: <ProtectedRoute><Settings /></ProtectedRoute> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routes;