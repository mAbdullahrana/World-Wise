import { useFakeAuthContext } from "../Hooks/useFakeAuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useFakeAuthContext();

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
