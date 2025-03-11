import { Navigate } from "react-router-dom";
import { useUser } from "../../context/userProvider";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUser();
  
    if (loading) return null; // Prevent redirect while loading
  
    return user ? children : <Navigate to="/auth" replace />;
  };
export default ProtectedRoute;  
