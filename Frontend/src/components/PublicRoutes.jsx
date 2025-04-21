import { Navigate } from "react-router-dom";
import useAuth from "../redux/features/useAuth"; // Custom hook to check authentication status
import Spinner from "./Spinner"; // Spinner component to show loading state\
import { useNavigate } from "react-router-dom"; // Hook to programmatically navigate

const PublicRoute = ({ children }) => {
  const { isAuthenticated, authChecked } = useAuth();
  const navigate = useNavigate(); // Hook to programmatically navigate

  if (!authChecked) {
    return <Spinner />; // Show a loading spinner while auth check happens
  }

  // If user is logged in, redirect to homepage
  if (isAuthenticated) {
    return navigate("/"); // Redirect to homepage or any other route
  }

  // If not logged in, show the public route (like Login/Register)
  return children;
};

export default PublicRoute;
