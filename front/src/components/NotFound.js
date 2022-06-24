import styled from "styled-components";
import { StyledLink } from "../styles/GlobalStyle";

function NotFound() {
  return (
    <Div>
      <div>올바르지 않은 경로입니다</div>
      <br />
      <br />
      <StyledLink to={"/"}>메인으로 돌아가기</StyledLink>
    </Div>
  );
}

const Div = styled.div`
  margin: 5rem auto;
  text-align: center;
`;

export default NotFound;
