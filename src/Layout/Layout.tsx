import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <Navbar />
      <main className="container mx-auto flex w-full flex-1 flex-col px-4 pt-24 pb-12">
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}