import { Navigate } from "react-router-dom";
import useAuth from "../redux/features/useAuth";
import Spinner from "./Spinner"; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) return <Spinner />; 

  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
