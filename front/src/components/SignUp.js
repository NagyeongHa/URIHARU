import { signup } from "../service/ApiService";
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
      alert("회원가입을 축하합니다 :)");
      //회원 생성되면 로그인 페이지로 이동
      navigate("/login");
    }
  };

  return (
    <Container>
      <Title>SignUp</Title>
      <div>
        <Label>닉네임</Label>
        <Input type='text' name='nickname' onChange={onChangeNickname} />
        <IsMatch>{nicknameErr.txt}</IsMatch>
      </div>
      <div>
        <Label>아이디</Label>
        <Input type='text' name='email' onChange={onChangeEmail} />
        <IsMatch>{emailErr.txt}</IsMatch>
      </div>
      <div>
        <Label>비밀번호</Label>
        <Input type='password' name='password' onChange={onChangePassword} />
        <IsMatch>{passwordErr.txt}</IsMatch>
      </div>
      <div>
        <Label>비밀번호 확인</Label>
        <Input
          type='password'
          name='repassword'
          onChange={onchangeRepassword}
        />
        <IsMatch>{rePasswordErr.txt}</IsMatch>
      </div>
      <Button type='submit' onClick={handleSubmit}>
        회원가입하기
      </Button>
      <StyledLink to='/login'>
        <p>계정이 이미 있으신가요? 로그인 하기</p>
      </StyledLink>
    </Container>
  );
}

const Container = styled(GlobalContainer)`
  @media ${theme.device.mobile} {
    height: auto;
    margin: 1.5rem auto;
    flex-direction: column;
  }

  @media ${theme.device.desktop} {
    flex-direction: column;
    width: 70vw;
    /* width: auto; */
    margin-bottom: 3rem;
  }
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 1.5rem auto;

  @media ${theme.device.desktop} {
    font-size: 2rem;
    margin: 4rem auto 2rem auto;
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

const Input = styled(GlobalInput)`
  width: 83vw;
  height: 1.8rem;
  font-size: 1rem;
  padding: 0.6rem;

  @media ${theme.device.desktop} {
    width: 63vw;
    height: 1.7rem;
    padding: 0.6rem;
    margin: 0.5rem;
    font-size: 1rem;
  }

  @media (min-width: 1000px) {
    width: 32vw;
  }
`;

const Label = styled.div`
  text-align: start;
  font-size: 0.9rem;
  padding: 0.1rem;
  margin: 1.1rem 0.5rem 0.1rem 0.4rem;
`;

const IsMatch = styled.div`
  font-size: 0.8rem;
  padding: 0.1rem;
  margin-left: 0.5rem;
  color: red;
  text-align: left;
  word-break: keep-all;
  line-height: 1.2rem;

  @media ${theme.device.desktop} {
    font-size: 0.86rem;
  }
`;

const Button = styled(GlobalButton)`
  margin-top: 1.2rem;
  width: 87vw;
  background-color: ${theme.colors.main};
  color: ${theme.colors.text};
  font-size: 1rem;
  height: 3rem;

  @media ${theme.device.desktop} {
    width: 66.5vw;
    height: 3rem;
    margin-top: 1.7rem;
  }

  @media (min-width: 1000px) {
    width: 33.5vw;
  }
`;

export default SignUp;
