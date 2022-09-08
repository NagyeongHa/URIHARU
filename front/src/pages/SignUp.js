import cloud from "../assets/icon/cloud.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  GlobalInput,
  GlobalContainer,
  GlobalButton,
} from "../styles/GlobalStyle";
import theme from "../styles/theme";
import useSighUp from "../hooks/useSighUp";

function SignUp() {
  const {
    emailState,
    nicknameState,
    passwordState,
    rePasswordState,
    form,
    onChangeNickname,
    onChangeEmail,
    onChangePassword,
    onchangeRepassword,
    handleSubmit,
  } = useSighUp();

  const { nickname, email, password } = form;

  return (
    <Container>
      <>
        <img src={cloud} alt='구름' />
        <Title>URIHARU</Title>
      </>
      <Wrapper>
        <InputWrapper>
          <Label>아이디</Label>
          <Input
            type='text'
            name='email'
            value={email}
            onChange={onChangeEmail}
            placeholder='5~20자의 영문, 숫자'
          />
          <Message $color={emailState.color}>{emailState.message}</Message>
        </InputWrapper>
        <InputWrapper>
          <Label>닉네임</Label>
          <Input
            type='text'
            name='nickname'
            value={nickname}
            onChange={onChangeNickname}
            placeholder='1~10자의 영문, 한글, 숫자'
          />
          <Message $color={nicknameState.color}>
            {nicknameState.message}
          </Message>
        </InputWrapper>
        <InputWrapper>
          <Label>비밀번호</Label>
          <Input
            type='password'
            name='password'
            value={password}
            onChange={onChangePassword}
            placeholder='8~16자 영문+숫자+특수문자 조합'
          />
          <Message $color={passwordState.color}>
            {passwordState.message}
          </Message>
        </InputWrapper>
        <InputWrapper>
          <Label>비밀번호 확인</Label>
          <Input
            type='password'
            name='repassword'
            onChange={onchangeRepassword}
          />
          <Message $color={rePasswordState.color}>
            {rePasswordState.message}
          </Message>
        </InputWrapper>
        <Button type='submit' onClick={handleSubmit}>
          회원가입하기
        </Button>
      </Wrapper>
      <StyledLink to='/login'>
        <p>계정이 이미 있으신가요? 로그인 하기</p>
      </StyledLink>
    </Container>
  );
}

const Container = styled(GlobalContainer)`
  height: 100vh;
  background-color: ${theme.colors.main};
  padding: 9rem 0;

  @media ${theme.device.mobile} {
    width: 100vw;
  }
`;

const Wrapper = styled(GlobalContainer)`
  background-color: white;
  width: 27rem;
  height: auto;
  padding: 1.7rem 0.6rem;
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

const Title = styled.div`
  font-family: "SUIT-Thin";
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

const StyledLink = styled(Link)`
  text-decoration: none;
  & > p {
    font-size: 0.8rem;
    color: #fff;
    cursor: pointer;
  }

  @media ${theme.device.desktop} {
    & > p {
      font-size: 0.9rem;
    }
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  margin: 0.7rem auto;

  @media ${theme.device.mobile} {
    margin: 0.5rem 0;
  }
`;

const Input = styled(GlobalInput)`
  width: 85%;
  height: 1.4rem;
  margin: 0.6rem;
  font-size: 1rem;

  @media ${theme.device.mobile} {
    margin: 0.5rem;
    font-size: 1.1rem;
    border: none;
    border-radius: 10rem;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.08);
  }
`;

const Label = styled.div`
  text-align: start;
  font-size: 0.9rem;
  margin: 0.5rem 0 0.1rem 1.8rem;

  @media ${theme.device.mobile} {
    margin: 0.5rem 0 0.1rem 1.2rem;
    color: #fff;
    font-weight: 600;
  }
`;

const Message = styled.div`
  font-size: 0.8rem;
  padding: 0.1rem;
  margin-left: 1.7rem;
  color: ${props => (props.$color ? "red" : "#373636")};
  text-align: left;
  word-break: keep-all;
  line-height: 1.2rem;

  @media ${theme.device.desktop} {
    font-size: 0.86rem;
  }
`;

const Button = styled(GlobalButton)`
  margin-top: 0.8rem;
  width: 93%;
  background-color: ${theme.colors.main};
  color: ${theme.colors.text};
  font-size: 1rem;
  height: 3rem;

  @media ${theme.device.desktop} {
    height: 3.2rem;
    margin-top: 1.5rem;
  }

  @media ${theme.device.mobile} {
    border: 2px solid white;
    background-color: ${theme.colors.main};
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.04);
    margin-top: 1.2rem;
    font-weight: 600;
  }
`;

export default SignUp;
