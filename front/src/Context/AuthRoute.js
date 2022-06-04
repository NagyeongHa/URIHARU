import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../service/ApiService";

const AuthRoute = ({ children }) => {
  const isAuth = getCurrentUser();

  return isAuth ? children : <Navigate to='/Login' />;
};

export default AuthRoute;
