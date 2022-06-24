import { signin } from "../service/ApiService";
import {
  GlobalInput,
  GlobalContainer,
  GlobalButton,
} from "../styles/GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/auth";
import { useCallback, useEffect, useState } from "react";
import theme from "../styles/theme";

function Login() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [getEmailPw, setEmailPw] = useState({ email: "", password: "" }); //아이디비밀번호 Onchange
  const [IsIdPwMatch, setIsIdPwMatch] = useState({ text: "", color: false }); //유효성검사용 텍스트 및 텍스트 색깔

  //아이디&비밀번호 onChange
  const handlerOnChange = useCallback(
    e => {
      const { name, value } = e.target;
      setEmailPw({
        ...getEmailPw,
        [name]: value,
      });
    },
    [getEmailPw]
  );

  //로그인 버튼 눌리기전 유효성 검사
  useEffect(() => {
    //아이디나 비밀번호 입력안됐을 때
    if (getEmailPw.email === "" || getEmailPw.password === "") {
      setIsIdPwMatch({
        text: "아이디와 비밀번호를 입력해주세요.",
        color: false,
      });
      return;
    }
    //아이디, 비밀번호 입력했을 때
    setIsIdPwMatch({
      text: "",
    });
  }, [getEmailPw]);

  //로그인버튼 눌릴 때
  const handleLogin = e => {
    e.preventDefault();

    //apiserver의 signin 함수
    signin({ email: getEmailPw.email, password: getEmailPw.password })
      .then(response => {
        if (response.token) {
          //로컬스토리지에 토큰 저장
          localStorage.setItem("ACCESS_TOKEN", response.token);
          setUser({
            id: response.id,
            email: response.email,
          });
          //토큰 있으면 메인 화면으로 이동
          navigate("/");
        }
      })
      .catch(err => {
        //로그인버튼 눌렸을 때 빈값일 시
        if (getEmailPw.email === "" || getEmailPw.password === "") {
          setIsIdPwMatch({
            text: "아이디와 비밀번호를 입력해주세요.",
            color: false,
          });
          return;
        }
        //아이디와 비밀번호가 일치하지 않을 때
        if (err.error === "Login failed.") {
          setIsIdPwMatch({
            text: "아이디와 비밀번호가 일치하지 않습니다",
            color: true,
          });
        }
      });
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input
        type='text'
        name='email'
        placeholder='아이디'
        onChange={handlerOnChange}
      />
      <Input
        type='password'
        name='password'
        placeholder='비밀번호'
        onChange={handlerOnChange}
      />
      <IsMatch style={{ color: IsIdPwMatch.color ? " red" : "cornflowerblue" }}>
        {IsIdPwMatch.text}
      </IsMatch>
      <Button type='submit' onClick={handleLogin}>
        로그인
      </Button>
      <StyledLink to='/signup'>
        <p>계정이 없으신가요? 회원가입 하기</p>
      </StyledLink>
    </Container>
  );
}

const Container = styled(GlobalContainer)`
  @media ${theme.device.mobile} {
    height: 90vh;
    flex-direction: column;
  }

  @media ${theme.device.desktop} {
    flex-direction: column;
    height: 90vh;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  & > p {
    font-size: 0.8rem;
    color: gray;
    cursor: pointer;
  }

  @media ${theme.device.desktop} {
    & > p {
      font-size: 0.9rem;
    }
  }
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.9rem;

  @media ${theme.device.desktop} {
    font-size: 2rem;
  }
`;

const IsMatch = styled.p`
  font-size: 0.8rem;
  margin: 0.2rem 0;

  @media ${theme.device.desktop} {
    font-size: 0.9rem;
    width: 100%;
    margin: 0.7rem 0;
  }
`;

const Input = styled(GlobalInput)`
  @media ${theme.device.mobile} {
    width: 70vw;
  }

  @media ${theme.device.desktop} {
    width: 30%;
    padding: 0.6rem;
    margin: 0.5rem;
    font-size: 1rem;
  }
`;

const Button = styled(GlobalButton)`
  margin-top: 0.8rem;
  width: 75vw;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.text};

  @media ${theme.device.desktop} {
    width: 31.5%;
    height: 3rem;
    font-size: 1rem;
    /* border-radius: 0.3rem; */
  }
`;
export default Login;
