import { Navigate } from "react-router-dom";
import useAuth from "../redux/features/useAuth"; // Custom hook to check authentication status
import Spinner from "./Spinner"; // Spinner component to show loading state

const PublicRoute = ({ children }) => {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) {
    return <Spinner />; // Show a loading spinner while auth check happens
  }

  // If user is logged in, redirect to homepage
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If not logged in, show the public route (like Login/Register)
  return children;
};

export default PublicRoute;
