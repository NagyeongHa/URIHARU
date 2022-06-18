import Calendar from "../components/Calendar";
import DayDiary from "../components/DayDiary";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Home() {
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
      <StyledLink to='diary/create'>글쓰러</StyledLink>
      <DayDiary />
    </>
  );

  
}
const StyledLink = styled(Link)`
border-radius: 0.3rem;
border: none;
width: 75%;
padding: 10px;
margin: 0 auto;
touch-action: auto;
background-color: rgb(253, 245, 232);
margin-bottom:6px;
margin-top:10px;
text-decoration: none;
color: black;
justify-content: center;
  align-content: center;
  display: flex;
  flex-wrap: wrap;

  
`;
export default Home;
