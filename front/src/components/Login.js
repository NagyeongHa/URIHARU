import { signin } from "../service/ApiService";
import cloud from "../assets/icon/cloud.png";
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
import "../styles/font.css";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

function Login() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [getEmailPw, setEmailPw] = useState({ email: "", password: "" }); //아이디비밀번호 Onchange
  const [IsIdPwMatch, setIsIdPwMatch] = useState({ text: "", color: false }); //유효성검사용 텍스트 및 텍스트 색깔
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = getEmailPw;
  //아이디&비밀번호 onChange
  const handlerOnChange = useCallback(
    e => {
      setIsLoading(false);
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
    if (email === "" || password === "") {
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
  }, [email, getEmailPw, password]);

  //로그인버튼 클릭 시
  const handleLogin = e => {
    e.preventDefault();
    setIsLoading(true);

    //apiserver의 signin 함수
    signin({ email: email, password: password })
      .then(response => {
        if (response.token) {
          //세션스토리지에 토큰 저장
          sessionStorage.setItem("ACCESS_TOKEN", response.token);
          setUser({
            id: response.id,
            email: response.email,
          });
          //토큰 있으면 메인 화면으로 이동
          navigate("/");
        }
      })
      .catch(err => {
        console.log(err.status);
        if (email === "" || password === "") {
          setIsLoading(false);
          setIsIdPwMatch({
            text: "아이디와 비밀번호를 입력해주세요.",
            color: false,
          });
          return;
        }
        //아이디와 비밀번호가 일치하지 않을 때
        if (err.error === "Login failed." || undefined) {
          setIsLoading(false);
          setIsIdPwMatch({
            text: "아이디와 비밀번호가 일치하지 않습니다",
            color: true,
          });
          return;
        }
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <Container>
        <>
          <img src={cloud} alt='구름' />
          <Title>URIHARU</Title>
        </>
        <Wrapper>
          <InputWrapper>
            <AiOutlineUser className='icons' />
            <Input
              type='text'
              name='email'
              placeholder='아이디'
              onChange={handlerOnChange}
            />
          </InputWrapper>
          <InputWrapper>
            <AiOutlineLock className='icons' />
            <Input
              type='password'
              name='password'
              placeholder='비밀번호'
              onChange={handlerOnChange}
            />
          </InputWrapper>
          <IsMatch style={{ color: IsIdPwMatch.color ? " red" : "#1519a6" }}>
            {IsIdPwMatch.text}
          </IsMatch>

          <Button type='submit' disabled={isLoading} isLoading={isLoading}>
            {isLoading ? "로그인 중" : "로그인"}
          </Button>
        </Wrapper>
        <StyledLink to='/signup'>
          <p>계정이 없으신가요? 회원가입 하기</p>
        </StyledLink>
      </Container>
    </form>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100vh;
  background-color: ${theme.colors.main};

  & > img {
    padding: 0.6rem;
  }

  @media ${theme.device.mobile} {
    box-sizing: border-box;
    width: 100vw;
  }
`;

const Wrapper = styled(GlobalContainer)`
  background-color: white;
  flex-direction: column;
  width: 21rem;
  height: 20rem;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.13);
  border-radius: 7px;

  @media ${theme.device.mobile} {
    background-color: ${theme.colors.main};
    box-shadow: none;
    box-sizing: border-box;
    width: 100%;
    height: auto;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  & > p {
    color: white;
    font-size: 0.8rem;
    cursor: pointer;
  }

  @media ${theme.device.desktop} {
    & > p {
      font-size: 0.9rem;
    }
  }
`;

const Title = styled.div`
  font-family: "SUIT-Thin";
  font-size: 1.3rem;
  font-weight: bold;
  color: #ffff;
  letter-spacing: 0.36em;
  margin: 2.2rem auto 2.5rem auto;

  @media ${theme.device.desktop} {
    font-size: 2rem;
  }

  @media ${theme.device.mobile} {
    margin-bottom: 1.5rem;
    font-size: 1.6rem;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  .icons {
    color: gray;
    height: 1.5rem;
    width: 1.5rem;
    padding: 4px;
    position: absolute;
    box-sizing: border-box;
    top: 50%;
    left: 2rem;
    transform: translateY(-50%);
  }
`;

const Input = styled(GlobalInput)`
  box-sizing: border-box;
  width: 86%;
  height: 3rem;
  padding-left: 2.2rem;
  margin: 0.6rem;
  font-size: 1rem;

  @media ${theme.device.mobile} {
    margin: 0.5rem;
    font-size: 1.1rem;
    border: none;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
  }
`;

const IsMatch = styled.p`
  font-size: 0.9rem;
  margin: 0.2rem 0;

  @media ${theme.device.desktop} {
    font-size: 0.9rem;
    width: 100%;
    margin: 0.7rem 0;
  }
`;

const Button = styled(GlobalButton)`
  width: 86.5%;
  margin-top: 0.8rem;
  font-size: 1rem;
  cursor: ${props => (props.isLoading ? "default" : "pointer")};
  color: ${props => (props.isLoading ? "black" : "white")};
  background-color: ${props => (props.isLoading ? "#d3d3d3" : "#93E0FF")};

  @media ${theme.device.mobile} {
    background-color: #fff;
    color: #000;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.08);
  }
`;
export default Login;
