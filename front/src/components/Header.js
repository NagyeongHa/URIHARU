import "../styles/Header.css";
import logo from "../assets/icon/logo.png";

function Header() {
  return (
    <div className='header'>
      <img src={logo} alt='' style={{ width: "2.2rem", padding: "0.5rem" }} />
    </div>
  );
}
export default Header;
