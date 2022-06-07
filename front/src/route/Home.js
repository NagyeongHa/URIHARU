import Header from "../components/Header";
import Calendar from "../components/Calendar";
import DayDiary from "../components/DayDiary";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/auth";

function Home() {
  const [getDate, setDate] = useState(""); //Calendar에서 받은 날짜값
  const [getDiary, setDiary] = useState(); //달력에서 날짜 클릭 시 보여줄 당일 다이어리
  const userId = useRecoilValue(userState);

  //하위 Calendar 컴포넌트에서 클릭된 달력 값
  const showClickedDate = date => {
    setDate(date);
  };

  useEffect(() => {
    showClickedDate();
  }, [getDate]);
  console.log("homeDate", getDate);

  //다이어리 글 하루치 불러오기
  useEffect(() => {
    const getOneDayDiary = () => {
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
        `http://localhost:8080/uriharu/diary/read/${getDate}`,
        options
      )
        .then(res => res.json())
        .then(data => setDiary(data));
    };

    getOneDayDiary();
  }, []);

  console.log("로그인한 유저", userId);

  {
    /*
  diary의 아이디와 로그인 유저의 아이디 값 O / 글 작성 X => 글 작성 
  -오늘 자기가 쓰는 날인 것을 어떻게 알지?
  -글 작성이 없다는 것을 어떻게 알지? 디비 read로 들고와서 같은 아이디에 오늘날짜를 비교?
  diary의 아이디와 로그인 유저의 아이디 값 O / 글 작성 O => 글 수정
  -useParams의 id값이 있으면 수정 / 아니면 새 글 작성
  diary의 아이디와 로그인 유저의 아이디 값 X / 글 작성 X => 권한 없음 

diary의 아이디와 로그인 유저의 아이디 값 X / 글 작성 O => 글 읽기 
*/
  }

  return (
    <>
      <Header />
      <Calendar date={showClickedDate} />
      {/* <DayDiary date={getDate} showdiary={diary} />*/}
      {getDiary ? (
        <DayDiary
          dno={getDiary.dno}
          nickname={getDiary.nickname}
          writer={getDiary.writer}
          title={getDiary.title}
          contents={getDiary.contents}
          regdate={getDiary.regdate}
          moddate={getDiary.moddate}
        />
      ) : (
        ""
      )}
    </>
  );
}
export default Home;
