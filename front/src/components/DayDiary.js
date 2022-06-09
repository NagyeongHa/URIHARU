import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userIdState } from "../atoms/auth";

function DayDiary({ date, title, writer, contents, nickname, regdate }) {
  // function DayDiary({ date, dno, title, contents, regdate, moddate }) {
  // const dno = diary.dno;
  // const title = diary.title;
  // const contents = diary.contents;
  // const moddate = diary.moddate;
  // const regdate = diary.regdate;

  const navigate = useNavigate();
  const userId = useRecoilValue(userIdState);
  console.log("글쓴애 ", writer, "로그인한애", userId);
  // const month = date.getMonth();
  console.log("text의 date", date);

  const clickedModify = () => {
    navigate("/diary/modify");
  };
  return (
    <>
      <Diary>
        <p>제목</p>
        {title}
        <p>글쓴이</p>
        {nickname}
        <p>내용</p>
        {contents}
        <p>작성 날짜</p>
        {regdate}
      </Diary>
      {writer === userId ? (
        <button onClick={clickedModify}>수정하기</button>
      ) : (
        ""
      )}
    </>
  );
}

const Diary = styled.div`
  text-align: center;
`;
export default DayDiary;
