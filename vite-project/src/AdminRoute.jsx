import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./UserContext";

const AdminRoute = () => {
  const { userData } = useUser();

  if (userData === null) {
    return <Navigate to="/not-found" />;
  }

  return userData.email === "admin@gmail.com" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
