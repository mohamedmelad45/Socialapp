import { Button } from "@heroui/react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes";
import { ToastContainer, Bounce } from "react-toastify";
//@ts-ignore
 import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./context/AuthContextProvider";

export default function App() {
  return (
<div data-theme="dark" className="min-h-screen bg-background text-foreground">
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <AuthContextProvider>
        <RouterProvider router={routes} />
      </AuthContextProvider>
    </div>
  );
}