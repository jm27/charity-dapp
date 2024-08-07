import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
