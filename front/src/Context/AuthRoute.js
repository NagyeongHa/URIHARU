import { Navigate } from "react-router-dom";
<<<<<<< HEAD
import { getCurrentUser } from "../service/ApiService";

const AuthRoute = ({ children }) => {
  const isAuth = getCurrentUser();

  return isAuth ? children : <Navigate to='/Login' />;
=======

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (!token) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return children;
>>>>>>> a7b5b50a54f64142b89d4cd2c459c2b2fa6ef460
};

export default AuthRoute;
