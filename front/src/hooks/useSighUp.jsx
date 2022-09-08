import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkedId, signup } from "../service/apiService";

const useSighUp = () => {
  const [emailState, setEmailState] = useState({
    message: "",
    isValidated: false,
    color: false,
  });

  const [nicknameState, setNicknameState] = useState({
    message: "",
    isValidated: false,
    color: false,
  });

  const [passwordState, setPasswordState] = useState({
    message: "",
    isValidated: false,
    color: false,
  });

  const [rePasswordState, setRePasswordState] = useState({
    message: "",
    isValidated: false,
    color: false,
  });

  const [form, setForm] = useState({
    nickname: "",
    email: "",
    password: "",
    repassword: "",
  });

  const { nickname, email, password } = form;

  const navigate = useNavigate();

  //닉네임 유효성 테스트
  const onChangeNickname = useCallback(
    e => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value,
      });

      //유효성테스트 조건 (한글 , 영어대소문자, 숫자만 1~10글자)
      const regex = /^[가-힣|a-z|A-Z|0-9|]{1,10}$/;

      if (!regex.test(value)) {
        setNicknameState({
          message: "1~10자의 영문, 숫자만 입력 가능합니다.",
          isValidated: false,
          color: true,
        });
        return;
      }
      setNicknameState({
        message: "올바른 닉네임입니다.",
        isValidated: true,
        color: false,
      });
    },
    [form]
  );

  //이메일 유효성 테스트
  const onChangeEmail = useCallback(
    e => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value,
      });

      //유효성테스트 조건 (영어대소문자, 숫자만 5~20글자)
      const regex = /^[A-za-z0-9]{5,20}$/g;

      //아이디중복 체크 (apiservice의 checkedId 함수)
      checkedId({ email: value }).then(response => {
        if (!response && regex.test(value)) {
          setEmailState({
            message: "올바른 아이디입니다.",
            isValidated: true,
            color: false,
          });
          return;
        }

        if (value !== "" && response) {
          setEmailState({
            message: "중복된 아이디입니다.",
            isValidated: false,
            color: true,
          });
          return;
        }

        if (!regex.test(value)) {
          setEmailState({
            message: "5~20자의 영문, 숫자만 입력 가능합니다.",
            isValidated: false,
            color: true,
          });
          return;
        }
      });
    },
    [form]
  );

  //비밀번호 유효성 테스트
  const onChangePassword = useCallback(
    e => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value,
      });

      //유효성테스트 조건 (영어대소문자 숫자 특문 1글자씩 필수 8~16글자)
      const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

      if (!regex.test(value)) {
        setPasswordState({
          message: "8~16자 영문+숫자+특수문자 조합을 입력해주세요.",
          isValidated: false,
          color: true,
        });
        return;
      }
      setPasswordState({
        message: "올바른 비밀번호입니다.",
        isValidated: true,
        color: false,
      });
    },
    [form]
  );

  //비밀번호 확인 유효성 테스트
  const onchangeRepassword = useCallback(
    e => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value,
      });

      if (password !== value) {
        setRePasswordState({
          message: "비밀번호가 일치하지 않습니다",
          isValidated: false,
          color: true,
        });
        return;
      }
      setRePasswordState({
        message: "비밀번호가 일치합니다",
        isValidated: true,
        color: false,
      });
    },
    [form, password]
  );

  //회원가입 버튼 클릭
  const handleSubmit = e => {
    e.preventDefault();

    //유효성 검사가 다 true 일 때
    if (
      nicknameState.isValidated &&
      emailState.isValidated &&
      passwordState.isValidated &&
      rePasswordState.isValidated
    ) {
      //apiservice의 signup 함수
      signup({ email: email, password: password, nickname: nickname });
      alert(`${nickname}님, 회원가입을 축하합니다 :)`);
      navigate("/login");
    }
    alert("모든 항목을 올바르게 입력해주세요.");
  };

  return {
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
  };
};

export default useSighUp;
