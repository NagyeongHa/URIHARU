import { API_BASE_URL } from "../config";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export const call = (api, method, request) => {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    options.body = JSON.stringify(request);
  }

  //로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  //fetch 함수
  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch(error => {
      console.log(error.status);
      if (error.status === 403) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    });
};

//회원가입
export const signup = userDTO => {
  return call("/auth/signup", "post", userDTO);
};

//로그인
export const signin = userDTO => {
  return call("/auth/signin", "post", userDTO).then(response => {
    if (response.token) {
      //로컬스토리지에 토큰 저장
      localStorage.setItem(ACCESS_TOKEN, response.token);
      //토큰 있으면 메인 화면으로 이동
      window.location.href = "/";
    }
  });
};
// context root

// localhost:8080/uriharu

// /auth/signup-회원가입

// /auth/signin-로그인

// club/create-클럽추가

// /diary/create-다이어리 일기 추가 post

// /diary/modify/{dno}- 다이어리 일기 수정 put

// /diary/myread-다이어리 읽기(내가 쓴 일기 리스트) get

// /diary/read/{dno}-다이어리 읽기(dno로 조회-하루치 일기만 출력) get

// ex ) localhost:8080/uriharu/readharu/{hno}
