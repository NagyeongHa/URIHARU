import { atom } from "recoil";

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

//달력스트링 변환 값
export const yyyymmddState = atom({
  key: "yyyymmddState",
  default: dateToStringText(new Date()), //현재시간을 스트링값으로 변환
});

//달력 클릭한 순수 날짜 값
export const calendarState = atom({
  key: "calendarState",
  default: new Date(),
});

//DayDiary(Home)의 수정버튼(수정페이지로이동) 눌릴 시 해당 게시물의 dno 저장
export const dnoState = atom({
  key: "dnoState",
  default: "",
});

//mypage? home?
export const pathnameState = atom({
  key: "pathnameState",
  default: "",
});
