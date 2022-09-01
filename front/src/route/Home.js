import Calendar from "../components/Calendar";
import DayDiary from "../components/DayDiary";
import styled from "styled-components";
import theme from "../styles/theme";
import Turn from "../components/Turn";

function Home() {
  return (
    <section>
      <Container>
        <Turn />
        <Calendar />
        <DayDiary />
      </Container>
    </section>
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
