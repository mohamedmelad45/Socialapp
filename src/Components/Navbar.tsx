import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar } from "@heroui/react";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import { HiHome, HiUser, HiChatBubbleLeftRight } from "react-icons/hi2";

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-50 text-blue-700 font-semibold"
      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
  }`;

export default function Navbar() {
  const { token, logout, userData } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <nav
        aria-label="Main navigation"
        className="container mx-auto flex h-20 items-center justify-between px-6"
      >
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-blue-900"
        >
          Route Posts
        </Link>

        {token && (
          <div className="hidden md:flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            <NavLink to="/" end className={navLinkClassName}>
              <HiHome className="text-lg" />
              Feed
            </NavLink>
            <NavLink to="/profile" className={navLinkClassName}>
              <HiUser className="text-lg" />
              Profile
            </NavLink>
            <NavLink to="/notifications" className={navLinkClassName}>
              <HiChatBubbleLeftRight className="text-lg" />
              Notifications
            </NavLink>
          </div>
        )}

        <div className="flex items-center gap-3">
          {token ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 cursor-pointer bg-gray-50 hover:bg-gray-100 py-1.5 px-3 rounded-full border border-gray-200 transition"
              >
                <Avatar size="sm" className="ring-2 ring-blue-100">
                  <Avatar.Image
                    src={userData?.photo}
                    alt={`${userData?.name} Avatar`}
                  />
                  <Avatar.Fallback>{userData?.name?.slice(0, 2).toUpperCase()}</Avatar.Fallback>
                </Avatar>
                <span className="text-sm font-semibold text-gray-800">
                  {userData?.name || "mohamedmelad"}
                </span>
                
                <div className="flex flex-col gap-1 ml-1 w-4">
                  <span className="h-0.5 w-full bg-gray-600 rounded-full"></span>
                  <span className="h-0.5 w-full bg-gray-600 rounded-full"></span>
                  <span className="h-0.5 w-full bg-gray-600 rounded-full"></span>
                </div>
              </div>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white p-2 shadow-xl border border-gray-100 z-50 space-y-1">
                  <button
                    onClick={() => { setIsOpen(false); navigate("/profile"); }}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => { setIsOpen(false); navigate("/settings"); }}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                  >
                    Settings
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={() => { setIsOpen(false); handleLogout(); }}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClassName}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClassName}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}