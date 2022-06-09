// import { useSetRecoilState } from "recoil";
// import { userEmailState } from "../atoms/auth";
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
  return call("/auth/signin", "POST", userDTO);
  // .then(response => {
  //   if (response.token) {
  //     //console.log("뭐가들었나", response);
  //     //로컬스토리지에 토큰 저장
  //     localStorage.setItem(ACCESS_TOKEN, response.token);
  //     localStorage.setItem("ID", response.id);
  //     setUserEmailState(response.email);
  //     //토큰 있으면 메인 화면으로 이동
  //     //window.location.href = "/";
  //   }
  // });
};

//로그아웃
export const signout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem("ID");
  window.location.href = "/login";
};

//현재 로그인 유저 아이디 가져오기
export const isAuth = () => {
  if (localStorage.getItem("ID")) {
    return localStorage.getItem("ID");
  }
  return null;
};

//Get
// export const callGet = (api, method) => {
//   const accessToken = localStorage.getItem("ACCESS_TOKEN");

//   let headers = new Headers({
//     "Content-Type": "application/json",
//   });

//   let options = {
//     method: method,
//     url: API_BASE_URL + api,
//     headers: headers,
//   };

//   if (accessToken && accessToken !== null) {
//     headers.append("Authorization", "Bearer " + accessToken);
//   }

//   return fetch(options.url, options)
//     .then(res => res.stringfy(res))
//     .catch(error => {
//       console.log(error.status);
//       // if (error.status === 403) {
//       //   window.location.href = "/login";
//       // }
//       return Promise.reject(error);
//     });
// };

//Home > DayDiay 메인의 하루 다이어리 가져오기
export const getOneDayDiary = () => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  let headers = new Headers({
    "Content-Type": "application/json",
  });

  let options = {
    method: "get",
    headers: headers,
  };

  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  return fetch("http://localhost:8080/uriharu/diary/read/4", options).then(
    res => res.json()
  );
  // .then(data => console.log(data));
};

// context root

// localhost:8080/uriharu

// /auth/signup-회원가입

// /auth/signin-로그인

// club/create-클럽추가

// /diary/create-다이어리 일기 추가 post

// /diary/modify- 다이어리 일기 수정 put

// /diary/myread-다이어리 읽기(내가 쓴 일기 리스트) get

// /diary/read/{dno}-다이어리 읽기(dno로 조회-하루치 일기만 출력) get

// ex ) localhost:8080/uriharu/readharu/{hno}
