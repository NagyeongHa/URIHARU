import cloud from "../assets/icon/cloud.png";
import {
  GlobalInput,
  GlobalContainer,
  GlobalButton,
} from "../styles/GlobalStyle";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../styles/theme";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import useLogin from "../hooks/useLogin";

function Login() {
  const { form, error, isLoading, onChange, onSubmit } = useLogin();
  const { email, password } = form;

  return (
    <form onSubmit={onSubmit}>
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
              value={email}
              placeholder='아이디'
              onChange={onChange}
            />
          </InputWrapper>
          <InputWrapper>
            <AiOutlineLock className='icons' />
            <Input
              type='password'
              name='password'
              value={password}
              placeholder='비밀번호'
              onChange={onChange}
            />
          </InputWrapper>
          <Message $color={error.color}>{error.message}</Message>
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

const Container = styled(GlobalContainer)`
  height: 100vh;
  background-color: ${theme.colors.main};

  @media ${theme.device.mobile} {
    box-sizing: border-box;
    width: 100vw;
  }
`;

const Wrapper = styled(GlobalContainer)`
  background-color: white;
  flex-direction: column;
  width: 22rem;
  padding: 3rem 0;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.13);
  border-radius: 12px;

  @media ${theme.device.mobile} {
    background-color: ${theme.colors.main};
    box-shadow: none;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    padding-bottom: 0.7rem;
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
  color: #fff;
  letter-spacing: 0.4em;
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
    left: 2.3rem;
    transform: translateY(-50%);
  }
`;

const Input = styled(GlobalInput)`
  width: 70%;
  height: 1.4rem;
  padding-left: 2.4rem;
  margin: 0.6rem;
  font-size: 1rem;

  @media ${theme.device.mobile} {
    height: 1.7rem;
    margin: 0.5rem;
    padding-left: 3rem;
    font-size: 1.1rem;
    border: none;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
  }
`;

const Message = styled.p`
  font-size: 0.9rem;
  margin: 0.2rem 0;
  color: ${props => (props.$color ? " red" : "#373636")};
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
  color: #fff;
  cursor: ${props => (props.isLoading ? "default" : "pointer")};
  background-color: ${theme.colors.main};

  @media ${theme.device.mobile} {
    border: 2px solid white;
    background-color: ${theme.colors.main};
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04);
    font-weight: 600;
  }
`;
export default Login;
