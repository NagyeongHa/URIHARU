import Calendar from "../components/Calendar";
import DayDiary from "../components/DayDiary";
import styled from "styled-components";
import theme from "../styles/theme";

function Home() {
  return (
    <Container>
      <Calendar />
      <DayDiary />
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  margin-bottom: 4rem;

  @media ${theme.device.desktop} {
    height: auto;
  }
`;

export default Home;
