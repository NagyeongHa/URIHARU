import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../recoil/auth";
//import { date } from "../recoil/date";
import { getDno } from "../recoil/diary";

function DayDiary({ dateTest }) {
  const navigate = useNavigate();
  //const calendarData = useRecoilValue(date);
  // const diary = useRecoilValue(getDateDiary(calendarData));
  const { id } = useRecoilValue(userState);
  const setDno = useSetRecoilState(getDno);
  const [diary, setDiary] = useState({});
  console.log("클릭한 날짜", dateTest);
  //수정화면으로
  const goModify = dno => {
    setDno(dno);
    navigate(`/diary/modify`);
  };

  useEffect(() => {
    const getDateDiary = () => {
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
        `http://localhost:8080/uriharu/diary/dateread/${dateTest}`,
        options
      )
        .then(res => res.json())
        .then(data => setDiary(data.data));
    };

    getDateDiary();
  }, [dateTest]);
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
