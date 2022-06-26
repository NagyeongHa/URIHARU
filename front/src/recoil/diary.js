import { atom, selector } from "recoil";

//현재 날짜를 연-월-일 형태로 변환
const dateToStringText = date => {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
};

//달력 데이터 값
export const date = atom({
  key: "Selectdate",
  default: dateToStringText(new Date()), //현재시간을 스트링값으로 변환
});

//selector로 날짜별 다이어리 들고오기
export const getDateDiary = selector({
  key: "diary/dateread",
  get: async ({ get }) => {
    const yyyymmdd = get(date); //15번의 date 값을 get 주소의 파라미터로 넣음 => date atom 값이 변경되면 selector도 새롭게 get 해옴
    if (!yyyymmdd) return;

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

    const url = `http://localhost:8080/uriharu/diary/dateread/${yyyymmdd}`;

    try {
      return await fetch(url, options)
        .then(response => response.json())
        .then(data => data.data);
    } catch (error) {
      throw Error("날짜별 다이어리를 들고오지 못했습니다");
    }
  },
});

//DayDiary의 수정버튼(수정페이지로이동) 눌릴 시 해당 게시물의 dno 저장
export const getDno = atom({
  key: "getDno",
  default: "",
});

export const pathnameState = atom({
  key: "pathnameState",
  default: "",
});

export const getDnoDiary = selector({
  key: "diaty/dnoread",
  get: async ({ get }) => {
    const dno = get(getDno);

    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      headers: headers,
      method: "GET",
    };

    if (accessToken && accessToken !== null) {
      headers.append("Authorization", "Bearer " + accessToken);
    }

    const url = `http://localhost:8080/uriharu/diary/read/${dno}`;

    try {
      return await fetch(url, options)
        .then(response => response.json())
        .then(data => data);
    } catch (error) {
      throw Error("Dno별 다이어리를 들고오지 못했습니다");
    }
  },
  cachePolicy_UNSTABLE: {
    // Only store the most recent set of dependencies and their values
    eviction: "most-recent",
  },
});
