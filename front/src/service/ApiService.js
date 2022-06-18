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
  return call("/auth/signup", "POST", userDTO);
};

//로그인
export const signin = userDTO => {
  return call("/auth/signin", "POST", userDTO).then(response => {
    if (response.token) {
      console.log("뭐가들었나", response);
      //로컬스토리지에 토큰 저장
      localStorage.setItem(ACCESS_TOKEN, response.token);
      localStorage.setItem("ID", response.id);
      //토큰 있으면 메인 화면으로 이동
      window.location.href = "/";
    }
  });
};

//로그아웃
export const signout = () => {
  localStorage.setItem(ACCESS_TOKEN, null);
  localStorage.setItem("ID", null);
  window.location.href = "/login";
};

//현재 로그인 유저 아이디 가져오기
export const getCurrentUser = () => {
  if (localStorage.getItem("ID")) {
    return localStorage.getItem("ID");
  } else {
    console.log("로그인 아이디 없음");
  }
};

// context root

// localhost:8080/uriharu

// /auth/signup-회원가입

// /auth/signin-로그인

// club/create-클럽추가

// /diary/create-다이어리 일기 추가 post

// /diary/modify- 다이어리 일기 수정 put

// /diary/remove- 다이어리 일기 삭제 delete

// /diary/myread-다이어리 읽기(내가 쓴 일기 리스트) get

// /diary/read/{dno}-다이어리 읽기(dno로 조회-하루치 일기만 출력) get

// ex ) localhost:8080/uriharu/readharu/{hno}
