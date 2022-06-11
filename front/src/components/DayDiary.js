import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../recoil/auth";
import { date } from "../recoil/date";
import { getDateDiary, getDno } from "../recoil/diary";

function DayDiary() {
  const navigate = useNavigate();
  const calendarData = useRecoilValue(date);
  const diary = useRecoilValue(getDateDiary(calendarData));
  const { id } = useRecoilValue(userState);
  const setDno = useSetRecoilState(getDno);

  //수정화면으로
  const goModify = dno => {
    setDno(dno);
    navigate(`/diary/modify`);
  };

  return (
    <>
      <Diary>
        <>
          {diary.length > 0 ? (
            diary.map((list, idx) => (
              <div key={idx}>
                <div>
                  <p>제목</p>
                  {list.title}
                  <p>글쓴이</p>
                  {list.nickname}
                  <p>내용</p>
                  {list.contents}
                  <p>작성 날짜</p>
                  {list.yyyymmdd}
                  {list.writer === id ? (
                    <div>
                      <Button onClick={() => goModify(list.dno)}>
                        수정하기
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>작성된 일기가 없습니다</p>
          )}
        </>
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
