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

//달력 데이터 값
export const date = atom({
  key: "Selectdate",
  default: dateToStringText(new Date()),
});
