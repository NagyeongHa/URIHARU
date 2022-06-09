import { Navigate } from "react-router-dom";
import { userState } from "../atoms/auth";
import { useRecoilValue } from "recoil";
// import { userIdState } from "../atoms/auth";

const AuthRoute = ({ children }) => {
  // const isAuth = useRecoilValue(userIdState);
  const { token } = useRecoilValue(userState);
  if (!token) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return children;
};

export default AuthRoute;
