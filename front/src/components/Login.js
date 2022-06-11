import { signin } from "../service/ApiService";
import { Input, Container, Button } from "../styles/GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/auth";

function Login() {
  const navigate = useNavigate();
  // const setUserEmailState = useSetRecoilState(userEmailState);
  // const setUserIdState = useSetRecoilState(userIdState);
  // const setUserTokenState = useSetRecoilState(userTokenState);
  const setUser = useSetRecoilState(userState);

  const handleLogin = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    //apiserver의 signin 함수
    signin({ email: email, password: password }).then(response => {
      if (response.token) {
        //로컬스토리지에 토큰 저장
        localStorage.setItem("ACCESS_TOKEN", response.token);
        // setUserTokenState(response.token);
        // setUserEmailState(response.email);
        setUser({
          id: response.id,
          email: response.email,
          token: response.token,
        });
        //토큰 있으면 메인 화면으로 이동
        navigate("/");
      }
    });
  };
  return (
    <Container>
      <form onSubmit={handleLogin}>
        <Title>Login</Title>
        <Input type='text' name='email' placeholder='아이디' />
        <Input type='password' name='password' placeholder='비밀번호' />
        <Button type='submit'>로그인</Button>
        <StyledLink to='/signup'>
          <p>계정이 없으신가요? 회원가입 하기</p>
        </StyledLink>
      </form>
    </Container>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  & > p {
    font-size: 0.8rem;
    color: gray;
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;
export default Login;
