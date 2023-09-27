import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/authStore";

export const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);

  // Check if the user is authenticated
  console.log(token);
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};