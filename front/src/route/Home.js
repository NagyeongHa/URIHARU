// import Header from "../components/Header";
import Calendar from "../components/Calendar";
import DayDiary from "../components/DayDiary";
// import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { oneDayDiary, userState } from "../recoil/auth";
import { Link } from "react-router-dom";
import { date } from "../recoil/date";

function Home() {
  const getDate = useRecoilValue(date); //Calendar에서 받은 날짜값
  // const [getDiary, setDiary] = useState(); //달력에서 날짜 클릭 시 보여줄 당일 다이어리
  const diaryData = useRecoilValue(oneDayDiary(getDate));
  const { id, email } = useRecoilValue(userState);
  console.log("로그인한 유저", id, email);
  console.log("diarySelector", diaryData);

  // 하위 Calendar 컴포넌트에서 클릭된 달력 값
  // const showClickedDate = date => {
  //   setDate(date);
  // };

  // useEffect(() => {
  //   showClickedDate();
  // }, []);

  console.log("getDate", getDate);
  // console.log("getDiary", getDiary);
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
      <Calendar />
      <DayDiary />
      <Link to='diary/create'>글쓰러</Link>
    </>
  );
}
export default Home;
