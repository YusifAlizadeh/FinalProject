import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./UserContext";

const ProtectedRoute = () => {
  const { userData } = useUser();  

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;