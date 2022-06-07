import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../service/ApiService";

const AuthRoute = ({ children }) => {
  const isAuth = getCurrentUser();

  return isAuth && isAuth !== null ? children : <Navigate to='/login' />;
};

export default AuthRoute;
