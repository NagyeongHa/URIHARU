import styled from "styled-components";
import theme from "../styles/theme";

function CommentItem({ comments }) {
  const { nickname, contents, regdate } = comments;

  //2022-07-20T05:25:29 => 2022-07-20 05:25:29 형식으로 변환
  const modifyRegdate = regdate.replace(/T/gi, " ");

  return (
    <>
      <Nickname>{nickname}</Nickname>
      <Contents>{contents}</Contents>
      <Date>{modifyRegdate}</Date>
      <hr />
    </>
  );
}

const Nickname = styled.div`
  text-align: left;
  padding: 0.6rem;
  font-size: 0.8rem;
  font-weight: bold;

  @media ${theme.device.desktop} {
    font-size: 0.9rem;
  }
`;

const Contents = styled.div`
  text-align: left;
  padding: 0.6rem;
  font-size: 1rem;

  @media ${theme.device.desktop} {
    font-size: 1.1rem;
  }
`;

const Date = styled.div`
  text-align: left;
  font-size: 0.7rem;
  padding: 0.2rem 0.6rem;
  color: gray;

  @media ${theme.device.desktop} {
    font-size: 0.8rem;
  }
`;
export default CommentItem;
