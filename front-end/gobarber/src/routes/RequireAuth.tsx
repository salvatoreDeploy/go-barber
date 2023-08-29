import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/AuthContext";

export function RequireAuth() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;
}
