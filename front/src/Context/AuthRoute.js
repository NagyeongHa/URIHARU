import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (!token) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return children;
};

export default AuthRoute;
