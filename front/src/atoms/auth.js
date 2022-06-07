import { atom } from "recoil";

//유저정보
export const userState = atom({
  key: "userState",
  default: localStorage.getItem("ID"),
});
