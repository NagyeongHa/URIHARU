import { signup } from "../service/ApiService";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Input, Container, Button } from "../styles/GlobalStyle";

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
        navigate("/login");
        //회원 생성되면 로그인 페이지로 이동
      }
    );
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Title>SignUp</Title>
        <div>
          <Label>닉네임</Label>
          <Input type='text' name='nickname' />
        </div>
        <div>
          <Label>아이디</Label>
          <Input type='text' name='email' />
        </div>
        <div>
          <Label>비밀번호</Label>
          <Input type='password' name='password' />
        </div>
        <div>
          <Label>비밀번호 확인</Label>
          <Input type='password' name='password' />
        </div>
        <Button type='submit'>회원가입하기</Button>
        <StyledLink to='/login'>
          <p>계정이 이미 있으신가요? 로그인 하기</p>
        </StyledLink>
      </form>
    </Container>
  );
}
<<<<<<< HEAD
=======

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  & > p {
    font-size: 0.8rem;
    color: gray;
    cursor: pointer;
  }
`;

const Label = styled.p`
  text-align: start;
  font-size: 0.7rem;
  padding: 0.1rem;
  margin-left: 0.3rem;
`;
>>>>>>> a7b5b50a54f64142b89d4cd2c459c2b2fa6ef460
export default SignUp;
