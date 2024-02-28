import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const PrivateRoute = ({ children }) => {
  const  {user}  = useAuth();
 
  if (user) {
    return children; 
  }

  return <Navigate to="/auth" replace />;
};

export default PrivateRoute;
