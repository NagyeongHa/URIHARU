import { atom, selectorFamily } from "recoil";
export const getDno = atom({
  key: "getDno",
  default: "",
});

//메인의 날짜별 들고오기
export const getDateDiary = selectorFamily({
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

//dno별 다이어리 들고오기
export const getDnoDiary = selectorFamily({
  key: "diary/dnoread",
  get: dno => async () => {
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

    return fetch(`http://localhost:8080/uriharu/diary/read/${dno}`, options)
      .then(res => res.json())
      .then(data => data.data);
  },
});
