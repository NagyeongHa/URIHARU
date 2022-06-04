import { signin } from "../service/ApiService";
import { Link } from "react-router-dom";

function Login() {
  const handleLogin = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    //apiserver의 signin 함수
    signin({ email: email, password: password });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type='text' name='email' placeholder='아이디' />
        <input type='password' name='password' placeholder='비밀번호' />
        <button type='submit'>로그인</button>
      </form>
      <Link to='/signup' variant='body2'>
        계정이 없습니까? 여기서 가입 하세요.
      </Link>
    </div>
  );
}
export default Login;
