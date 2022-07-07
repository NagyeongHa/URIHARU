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
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem("recoil-persist");
  window.location.href = "/login";
};

//날짜별 다이어리 가져오기
// export const dateDiary = yyyymmdd => {
//   return call(`/diary/dateread/${yyyymmdd}`, "GET");
// };

export const dateDiary = yyyymmdd => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  const options = {
    headers: headers,
    method: "GET",
  };

  const url = `${API_BASE_URL}/diary/dateread/${yyyymmdd}`;

  try {
    return fetch(url, options)
      .then(response => response.json())
      .then(data => data.data);
  } catch (error) {
    throw Error("날짜별 다이어리를 들고오지 못했습니다");
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

//${API_BASE_URL}/diary/dateread/${yyyymmdd}
// ex ) localhost:8080/uriharu/readharu/{hno}
