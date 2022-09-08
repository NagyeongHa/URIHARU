import Calendar from "../components/home/Calendar";
import DayDiary from "../components/home/DayDiary";
import styled from "styled-components";
import theme from "../styles/theme";
import Turn from "../components/home/Turn";

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
