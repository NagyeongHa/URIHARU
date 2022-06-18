import Calendar from "../components/Calendar";
import DayDiary from "../components/DayDiary";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { date } from "../recoil/diary";

function Home() {
  const clickeddate = useRecoilValue(date);
  return (
    <Container>
      <Calendar />
      <StyledLink to='diary/create'>{clickeddate} 일에 글쓰기</StyledLink>
      <DayDiary />
    </Container>
  );
}
const Container = styled.div`
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  border-radius: 0.3rem;
  border: none;
  width: 75%;
  padding: 10px;
  margin: 0 auto;
  touch-action: auto;
  background-color: rgb(253, 245, 232);
  margin-bottom: 6px;
  margin-top: 10px;
  text-decoration: none;
  color: black;
  justify-content: center;
  align-content: center;
  display: flex;
  flex-wrap: wrap;
`;
export default Home;
