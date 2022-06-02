import { signup } from "../service/ApiService";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    const nickname = data.get("nickname");

    //apiserver의 signup 함수
    signup({ email: email, password: password, nickname: nickname }).then(
      response => {
        console.log(response);
        navigate("/login"); //회원 생성되면 로그인 페이지로 이동
      }
    );
  };

  return (
    <div>
      회원가입
      <form onSubmit={handleSubmit}>
        <div>
          <span>닉네임</span>
          <input type='text' name='nickname' />
        </div>
        <div>
          <span>아이디</span>
          <input type='text' name='email' />
        </div>
        <div>
          <span>비밀번호</span>
          <input type='password' name='password' />
        </div>
        <button type='submit'>회원가입하기</button>
      </form>
      <Link to='/login'>이미 계정이 있습니까? 로그인 하세요.</Link>
    </div>
  );
}
export default SignUp;
