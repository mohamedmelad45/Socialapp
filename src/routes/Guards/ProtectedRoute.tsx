import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { token } = useAuth();
  
  if (token === null) {
    return <Navigate to="/login" />;
  } else {
    
    return children;
  }
}