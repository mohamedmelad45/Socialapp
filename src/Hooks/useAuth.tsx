import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth Hook Must be used WITHIN AuthContextProvider");
  }
  return context;
}