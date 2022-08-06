import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "./theme";

export const GlobalInput = styled.input`
  height: 1.5rem;
  padding: 0.8rem;
  border-radius: 10rem;
  border: 0.5px solid gray;
  font: inherit;
  letter-spacing: 0.05em;
`;

//로그인 / 회원가입 Container
export const GlobalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  flex-direction: column;

  /* 구름 로고 */
  & > img {
    padding: 0.6rem;
  }
`;

//회원가입 / 로그인 버튼
export const GlobalButton = styled.button`
  height: 3.3rem;
  padding: 0.3rem;
  margin: 0.3rem;
  border-radius: 10rem;
  border: none;
  cursor: pointer;
  font: inherit;
  letter-spacing: 0.08em;
`;

//다이어리 버튼
export const Button = styled.button`
  font-family: inherit;
  border: none;
  border-radius: 15rem;
  background-color: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  letter-spacing: 0.06em;

  @media ${theme.device.mobile} {
    width: 70vw;
    touch-action: auto;
    padding: 0.6rem 1rem;
    margin: 0.7rem auto;
    font-size: 1rem;
  }

  @media (min-width: ${theme.size.min_tablet}) {
    padding: 0.77rem 3.2rem;
    margin: 0 1.4rem;
  }
`;

export const StyledLink = styled(Link)`
  font-family: inherit;
  border: none;
  border-radius: 15rem;
  touch-action: auto;
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  text-align: center;
  cursor: pointer;

  @media ${theme.device.mobile} {
    width: 61vw;
    touch-action: auto;
    padding: 0.6rem 1rem;
    margin: 0 auto;
    font-size: 1rem;
  }
  @media (min-width: ${theme.size.min_tablet}) {
    padding: 0.7rem 3.2rem;
    margin: 0 1.4rem;
    cursor: pointer;
  }
`;
