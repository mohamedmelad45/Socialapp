import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./authContext";
import type { IUserData } from "../interfaces/authinterface";
import axios from "axios";
import { baseURL } from "../api/api";
import { toast } from "react-toastify";
export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("Token"));
  const [userData, setUserData] = useState<IUserData | null>(null);

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("Token");
  };

  const login = (token: string, user: IUserData) => {
    setToken(token);
    setUserData(user);
    localStorage.setItem("Token", token);
  };
useEffect(() => {
  if (token === null) return;

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/users/profile-data`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(data.data.user);
      setUserData(data.data.user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        console.log(error);
      }
    }
  };

  fetchUserData();
}, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, logout, login, setUserData, userData }}>
      {children}
    </AuthContext.Provider>
  );
}