import "../styles/Header.css";
import logo from "../assets/icon/logo.png";
<<<<<<< HEAD
=======
import { Link } from "react-router-dom";
import { signout } from "../service/ApiService";
>>>>>>> origin

function Header() {
  return (
    <div className='header'>
<<<<<<< HEAD
      <img src={logo} alt='' style={{ width: "2.2rem", padding: "0.5rem" }} />
=======
      <Link to='/'>
        <img src={logo} alt='' style={{ width: "2.2rem", padding: "0.5rem" }} />
      </Link>
      <button onClick={signout}>로그아웃</button>
      <Link to='/mypage'>
        <button>My</button>
      </Link>
>>>>>>> origin
    </div>
  );
}
export default Header;
