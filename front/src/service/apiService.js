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

  //세션 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN);
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
      // console.log(error.status);
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

//아이디 중복확인
export const checkedId = userDTO => {
  return call("/auth/checkid", "POST", userDTO);
};

//로그인
export const signin = userDTO => {
  return call("/auth/signin", "POST", userDTO);
};

//로그아웃
export const signout = () => {
  sessionStorage.removeItem(ACCESS_TOKEN);
  sessionStorage.removeItem("recoil-persist");
  window.location.href = "/login";
};

//yyyymmdd별 다이어리 조회
export const dateDiary = yyyymmdd => {
  return call(`/diary/dateread/${yyyymmdd}`, "GET").then(
    response => response.data
  );
};

//dno별 다이어리 조회
export const dnoDiary = dno => {
  return `/diary/read/${dno}`;
};

//댓글 조회
export const getComment = dno => {
  return call(`/reply/all/${dno}`, "GET");
};
