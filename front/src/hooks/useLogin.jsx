import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/auth";
import { signin } from "../service/ApiService";

const useLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({ message: "", color: false });
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = form;

  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      setForm({
        ...form,
        [name]: value,
      });
    },
    [form]
  );

  //로그인 버튼 누르기전 로그인 에러메시지 띄우기
  useEffect(() => {
    //아이디나 비밀번호 입력안됐을 때
    if (email === "" || password === "") {
      setError({
        message: "아이디와 비밀번호를 입력해주세요.",
        color: false,
      });
      return;
    }
    //아이디, 비밀번호 입력했을 때
    setError({
      message: "",
    });
  }, [email, password, setError]);

  const onSubmit = e => {
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
          navigate("/");
        }
      })
      .catch(err => {
        // console.log(err.status);
        if (email === "" || password === "") {
          setIsLoading(false);
          setError({
            message: "아이디와 비밀번호를 입력해주세요.",
            color: true,
          });
          return;
        }
        //아이디와 비밀번호가 일치하지 않을 때
        if (err.error === "Login failed." || undefined) {
          setIsLoading(false);
          setError({
            message: "아이디와 비밀번호가 일치하지 않습니다",
            color: true,
          });
          return;
        }
      });
  };
  return { form, error, setError, isLoading, onChange, onSubmit };
};

export default useLogin;
