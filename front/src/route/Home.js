import Header from "../components/Header";
import Calendar from "../components/Calendar";
import DayDiary from "../components/DayDiary";
import { UserIdContext } from "../App";
import { useEffect, useState, useContext } from "react";
// import { callGet } from "../service/ApiService";
// import { getOneDayDiary } from "../service/ApiService";
//import { callGet } from "../service/ApiService";

function Home() {
  const [getdate, setDate] = useState("");
  // const [dno, setDno] = useState(4);
  const [getdiary, setDiary] = useState(); //text에 보내기 위해 다이어리 글 저장

  //context로 불러온 로그인한 유저 아이디
  const userId = useContext(UserIdContext);

  // console.log(setDno);

  //Calendar 컴포넌트에서 클릭된 달력 값
  const showClickedDate = date => {
    setDate(date);
  };

  useEffect(() => {
    showClickedDate();
  }, [getdate]);
  console.log("homeDate", getdate);

  //getDate 데이터 있으면 날짜 값 분리하기
  if (getdate) {
    const sliceYear = getdate.getFullYear().toString();
    console.log(sliceYear);
  }

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

      return fetch("http://localhost:8080/uriharu/diary/read/14", options)
        .then(res => res.json())
        .then(data => setDiary(data));
    };

    getOneDayDiary();
  }, []);

  console.log("로그인한 유저", userId);
  console.log("다이어리 내용", getdiary);
  //날짜가 같은 다이어리의 dno 가져오기
  //getDate의 날짜와 db의 날짜와 같은 것을 들고옴
  //1날짜를 잘라서 들고옴 2날짜 비교
  // const getDnoByClickedDate = ()=>{

  // }

  // getDiary();
  // console.log("diary", diary);
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
      {/* <DayDiary date={getdate} showdiary={diary} />*/}
      {getdiary ? (
        <DayDiary
          dno={getdiary.dno}
          writer={getdiary.writer}
          title={getdiary.title}
          contents={getdiary.contents}
          regdate={getdiary.regdate}
          moddate={getdiary.moddate}
        />
      ) : (
        ""
      )}
    </>
  );
}
export default Home;
