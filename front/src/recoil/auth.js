import { atom, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

//유저id (uid)
export const userIdState = atom({
  key: "userIdState",
  default: "",
});

//유저 email (진짜 아이디)
export const userEmailState = atom({
  key: "userEmailState",
  default: "",
});

//로컬에 저장된 유저 토큰 (isAuth)
export const userTokenState = atom({
  key: "userTokenState",
  default: localStorage.getItem("ACCESS_TOKEN"),
});

export const userState = atom({
  key: "userState",
  default: { id: "", token: localStorage.getItem("ACCESS_TOKEN"), email: "" },
  effects_UNSTABLE: [persistAtom],
});

export const oneDayDiary = selectorFamily({
  key: "diary/dateread",
  get: date => async () => {
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

    return fetch(
      `http://localhost:8080/uriharu/diary/dateread/${date}`,
      options
    )
      .then(res => res.json())
      .then(data => data.data);
  },
});
