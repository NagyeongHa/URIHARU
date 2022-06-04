import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIdContext } from "../App";

function DayDiary({ date, title, writer, contents, nickname }) {
  // function DayDiary({ date, dno, title, contents, regdate, moddate }) {
  // const dno = diary.dno;
  // const title = diary.title;
  // const contents = diary.contents;
  // const moddate = diary.moddate;
  // const regdate = diary.regdate;

  const navigate = useNavigate();
  const userId = useContext(UserIdContext);
  console.log("글쓴애", writer, "로그인한 애", userId);

  // const month = date.getMonth();
  console.log("text의 date", date);

  const clickedModify = () => {
    navigate("/diary/modify");
  };
  return (
    <>
      <div>
        <Link to='/diary/create'>글쓰러</Link>
      </div>
      <div>
        <p>제목</p>
        {title}
        <p>글쓴이</p>
        {nickname}
        <p>내용</p>
        {contents}
      </div>
      {writer === userId ? (
        <button onClick={clickedModify}>수정하기</button>
      ) : (
        ""
      )}
    </>
  );
}
export default DayDiary;
