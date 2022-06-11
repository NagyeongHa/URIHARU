import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { oneDayDiary, userState } from "../recoil/auth";
import { date } from "../recoil/date";

function DayDiary() {
  const navigate = useNavigate();
  const calendarData = useRecoilValue(date);
  const diary = useRecoilValue(oneDayDiary(calendarData));
  const { id } = useRecoilValue(userState);

  const goModify = () => {
    navigate("/diary/modify");
  };

  return (
    <>
      <Diary>
        <>
          {diary.length > 0 ? (
            diary.map((list, idx) => (
              <div key={idx}>
                <p>제목</p>
                {list.title}
                <p>글쓴이</p>
                {list.nickname}
                <p>내용</p>
                {list.contents}
                <p>작성 날짜</p>
                {list.yyyymmdd}
              </div>
            ))
          ) : (
            <p>작성된 일기가 없습니다</p>
          )}
        </>
        {diary.map((list, idx) =>
          list.writer === id ? (
            <Button key={idx} onClick={goModify}>
              수정하기
            </Button>
          ) : (
            ""
          )
        )}
      </Diary>
    </>
  );
}

const Diary = styled.div`
  text-align: center;
`;

const Button = styled.button`
  border: none;
  font-size: 1rem;
  padding: 0.3rem 0.6rem;
  border-radius: 3rem;
`;
export default DayDiary;
