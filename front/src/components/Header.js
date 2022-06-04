import "../styles/Header.css";
import logo from "../assets/icon/logo.png";
import { Link } from "react-router-dom";
import { signout } from "../service/ApiService";

function Header() {
  return (
    <div className='header'>
      <Link to='/'>
        <img src={logo} alt='' style={{ width: "2.2rem", padding: "0.5rem" }} />
      </Link>
      <button onClick={signout}>로그아웃</button>
    </div>
  );
}
export default Header;
