import Calendar from "../components/Calendar";
import DayDiary from "../components/DayDiary";
import styled from "styled-components";
import theme from "../styles/theme";
import Turn from "../components/Turn";
import Comment from "../components/Comment";

function Home() {
  return (
    <Container>
      <Turn />
      <Calendar />
      <DayDiary />
      <Comment />
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  margin-bottom: 4rem;
  text-align: center;

  @media ${theme.device.desktop} {
    height: auto;
    text-align: center;
  }
`;

export default Home;
