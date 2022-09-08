import { signup } from "../service/ApiService";
import cloud from "../assets/icon/cloud.png";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  GlobalInput,
  GlobalContainer,
  GlobalButton,
} from "../styles/GlobalStyle";
import { checkedId } from "../service/ApiService";
import { useState } from "react";
import { useCallback } from "react";
import theme from "../styles/theme";

function SignUp() {
  //유효성테스트 텍스트 & 유효성검사 통과 여부,
  const [emailErr, setEmailErr] = useState({ txt: "", isOk: false });
  const [nicknameErr, setNicknameErr] = useState({ txt: "", isOk: false });
  const [passwordErr, setPasswordErr] = useState({ txt: "", isOk: false });
  const [rePasswordErr, setRePasswordErr] = useState({ txt: "", isOk: false });
  const [inputValue, setInputVlaue] = useState({
    nickname: "",
    email: "",
    password: "",
    repassword: "",
  });

  //inputValue 변수 비구조할당
  const { nickname, email, password } = inputValue;

  const navigate = useNavigate();

  //닉네임 유효성 테스트
  const onChangeNickname = useCallback(
    e => {
      const { name, value } = e.target;
      setInputVlaue({
        ...inputValue,
        [name]: value,
      });

      //유효성테스트 조건 (한글 , 영어대소문자, 숫자만 1~10글자)
      const isCheckedNickname = /^[가-힣|a-z|A-Z|0-9|]{1,10}$/;

      if (!isCheckedNickname.test(value)) {
        setNicknameErr({
          txt: "1~10자의 영문 대 소문자, 숫자만 입력 가능합니다.",
          isOk: false,
        });
        return;
      }
      setNicknameErr({ txt: "올바른 닉네임입니다.", isOk: true });
    },
    [inputValue]
  );

  //이메일 유효성 테스트
  const onChangeEmail = useCallback(
    e => {
      const { name, value } = e.target;
      setInputVlaue({
        ...inputValue,
        [name]: value,
      });

      //유효성테스트 조건 (영어대소문자 숫자만 5~20글자)
      const isCheckedEmail = /^[A-za-z0-9]{5,20}$/g;

      //아이디중복 API
      checkedId({ email: value }).then(response => {
        if (!response && isCheckedEmail.test(value)) {
          setEmailErr({ txt: "올바른 아이디입니다.", isOk: true });
          return;
        }

        if (value !== "" && response) {
          setEmailErr({ txt: "중복된 아이디입니다.", isOk: false });
          return;
        }

        if (!isCheckedEmail.test(value)) {
          setEmailErr({
            txt: "5~20자의 영문 대 소문자, 숫자만 입력 가능합니다.",
            isOk: false,
          });
          return;
        }
      });
    },
    [inputValue]
  );

  //비밀번호 유효성 테스트
  const onChangePassword = useCallback(
    e => {
      const { name, value } = e.target;
      setInputVlaue({
        ...inputValue,
        [name]: value,
      });

      //유효성테스트 조건 (영어대소문자 숫자 특문 1글자씩 필수 8~16글자)
      const isCheckedPassword =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

      if (!isCheckedPassword.test(value)) {
        setPasswordErr({
          txt: "8~16자 영문 대 소문자+숫자+특수문자 조합을 입력해주세요.",
          isOk: false,
        });
        return;
      }
      setPasswordErr({ txt: "올바른 비밀번호입니다.", isOk: true });
    },
    [inputValue]
  );

  //비밀번호 확인 유효성 테스트
  const onchangeRepassword = useCallback(
    e => {
      const { name, value } = e.target;
      setInputVlaue({
        ...inputValue,
        [name]: value,
      });

      if (password !== value) {
        setRePasswordErr({ txt: "비밀번호가 일치하지 않습니다", isOk: false });
        return;
      }
      setRePasswordErr({ txt: "비밀번호가 일치합니다", isOk: true });
    },
    [inputValue, password]
  );

  //회원가입 버튼 클릭
  const handleSubmit = e => {
    e.preventDefault();

    //유효성 검사가 다 true 일 때
    if (
      nicknameErr.isOk &&
      emailErr.isOk &&
      passwordErr.isOk &&
      rePasswordErr.isOk
    ) {
      //apiserver의 signup 함수
      signup({ email: email, password: password, nickname: nickname });
      alert(`${nickname}님, 회원가입을 축하합니다 :)`);
      //회원 생성되면 로그인 페이지로 이동
      navigate("/login");
    }
  };

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
            onChange={onChangeEmail}
            placeholder='5~20자의 영문 대 소문자, 숫자'
          />
          <IsMatch>{emailErr.txt}</IsMatch>
        </InputWrapper>
        <InputWrapper>
          <Label>닉네임</Label>
          <Input
            type='text'
            name='nickname'
            onChange={onChangeNickname}
            placeholder='1~10자의 영문 대 소문자, 한글, 숫자'
          />
          <IsMatch>{nicknameErr.txt}</IsMatch>
        </InputWrapper>
        <InputWrapper>
          <Label>비밀번호</Label>
          <Input
            type='password'
            name='password'
            onChange={onChangePassword}
            placeholder='8~16자 영문 대 소문자+숫자+특수문자 조합'
          />
          <IsMatch>{passwordErr.txt}</IsMatch>
        </InputWrapper>
        <InputWrapper>
          <Label>비밀번호 확인</Label>
          <Input
            type='password'
            name='repassword'
            onChange={onchangeRepassword}
          />
          <IsMatch>{rePasswordErr.txt}</IsMatch>
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

const IsMatch = styled.div`
  font-size: 0.8rem;
  padding: 0.1rem;
  margin-left: 1.7rem;
  color: #373636;
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
