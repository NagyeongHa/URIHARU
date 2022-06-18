import { Link } from "react-router-dom";
import { signout } from "../service/ApiService";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/auth";
import styled from "styled-components";

function Header() {
  const { email } = useRecoilValue(userState);

  //마이페이지는 header 숨기기
  // if (window.location.pathname === "/mypage") return null;
  return (
    <Container>
      <StyledLink to='/'>
        {/* <img src={logo} alt='' style={{ width: "2.2rem", padding: "0.5rem" }} /> */}
        <LogoName>URI,HARU</LogoName>
      </StyledLink>
      {email ? (
        <Wrapper>
          <Link to='/mypage'>
            <Button>{email}님</Button>
          </Link>
          <Button onClick={signout}>로그아웃</Button>
        </Wrapper>
      ) : null}
    </Container>
  );
}
const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 0.6rem;
`;
const LogoName = styled.span`
  color: black;
  font-weight: bold;
`;

const Container = styled.div`
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid gray;
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: space-between;
  & > span {
    padding: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0 0.3rem;
  padding: 0.2rem;
`;

const Button = styled.button`
  padding: 0.2rem;
  background-color: transparent;
  border: none;
  margin-right: 0.3rem;
  &:first-child {
    font-weight: bold;
    /* background-color: beige;
    border-radius: 5rem; */
  }
`;
export default Header;
